import { Plugin } from 'vite';
import { SplashScreenOptions } from './types';
import { generateStyles } from './styles';

export function viteSplashScreen(options: SplashScreenOptions): Plugin {
  return {
    name: 'vite-plugin-react-splash',
    transformIndexHtml(html) {
      const styles = generateStyles(options);
      const {
        logo,
        text,
        version,
        duration = 3000,
        onlyStandalone = false,
        showOnce = false,
        animation,
        backgroundAnimation,
        textAnimation = 'none',
        textCharDelay = 50,
      } = options;

      const escapeHtml = (raw: string): string =>
        raw
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');

      const logoHtml = typeof logo === 'string'
        ? `<div class="splash-logo">${logo}</div>`
        : `<div class="splash-logo splash-logo-light">${logo.light}</div><div class="splash-logo splash-logo-dark">${logo.dark}</div>`;

      const dotsHtml = animation === 'dots'
        ? '<div class="splash-dots"><span></span><span></span><span></span></div>'
        : '';
      const barsHtml = animation === 'bars'
        ? '<div class="splash-bars"><span></span><span></span><span></span><span></span><span></span></div>'
        : '';
      const spinnerHtml = animation === 'spinner'
        ? '<div class="splash-spinner"></div>'
        : '';
      const progressHtml = animation === 'progress'
        ? '<div class="splash-progress"><div class="splash-progress-bar"></div></div>'
        : '';

      const bgLayerHtml = backgroundAnimation && backgroundAnimation !== 'none'
  ? '<div class="splash-bg-layer"></div>'
  : '';

const splashHtml = `
<style>${styles}</style>
<div id="vite-splash-screen">
${bgLayerHtml}
${logoHtml}
${text
        ? textAnimation === 'chars'
          ? `<div class="splash-text splash-text-chars">${text
              .split('')
              .map(
                (char, i) =>
                  `<span class="splash-char" style="animation-delay:${i * textCharDelay}ms">${escapeHtml(char)}</span>`
              )
              .join('')}</div>`
        : `<div class="splash-text">${escapeHtml(text)}</div>`
        : ''}
${dotsHtml}
${barsHtml}
${spinnerHtml}
${progressHtml}
${version ? `<div class="splash-version">v${version}</div>` : ''}
</div>
<script>
(function(){
  var d=${duration},o=${onlyStandalone},s1=${showOnce},s=document.getElementById('vite-splash-screen');
  if(s){
    var st; try { st = localStorage.getItem('v-splash-theme'); } catch (e) {}
    if (st === 'light' || st === 'dark') s.classList.add('theme-' + st);

    var isPWA = window.matchMedia('(display-mode: standalone)').matches || (window.navigator && window.navigator.standalone);
    var shown = false;
    try { shown = localStorage.getItem('v-splash-shown'); } catch (e) {}
    if((o && !isPWA) || (s1 && shown)){
      s.style.display='none';
      s.remove();
      return;
    }
    if(s1) { try { localStorage.setItem('v-splash-shown', 'true'); } catch (e) {} }
    setTimeout(function(){
      s.classList.add('hidden');
      setTimeout(function(){s.remove()},500);
    },d);
  }
})();
</script>`.replace(/>\s+</g, '><').trim();

      return html.replace('<body>', `<body>${splashHtml}`);
    },
  };
}

export * from './types';
export { useSplashScreen } from './hook';

