import { Plugin } from 'vite';
import { SplashScreenOptions } from './types';
import { generateStyles } from './styles';

export function viteSplashScreen(options: SplashScreenOptions): Plugin {
  return {
    name: 'vite-plugin-react-splash',
    transformIndexHtml(html) {
      const styles = generateStyles(options);
      const { logo, text, version, duration = 3000, onlyStandalone = false, showOnce = false } = options;
      
      const splashHtml = `
<style>${styles}</style>
<div id="vite-splash-screen">
<div class="splash-logo">${logo}</div>
${text ? `<div class="splash-text">${text}</div>` : ''}
${version ? `<div class="splash-version">v${version}</div>` : ''}
</div>
<script>
(function(){
  var d=${duration},o=${onlyStandalone},s1=${showOnce},s=document.getElementById('vite-splash-screen');
  if(s){
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

