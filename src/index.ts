import { Plugin } from 'vite';
import { SplashScreenOptions } from './types';
import { generateStyles } from './styles';

export function viteSplashScreen(options: SplashScreenOptions): Plugin {
  return {
    name: 'vite-plugin-react-splash',
    transformIndexHtml(html) {
      const styles = generateStyles(options);
      const { logo, text, version, duration = 3000 } = options;
      
      const splashHtml = `
<style>${styles}</style>
<div id="vite-splash-screen">
<div class="splash-logo">${logo}</div>
${text ? `<div class="splash-text">${text}</div>` : ''}
${version ? `<div class="splash-version">v${version}</div>` : ''}
</div>
<script>
(function(){
  var d=${duration},s=document.getElementById('vite-splash-screen');
  if(s){setTimeout(function(){
    s.classList.add('hidden');
    setTimeout(function(){s.remove()},500);
  },d)}
})();
</script>`.replace(/>\s+</g, '><').trim();

      return html.replace('<body>', `<body>${splashHtml}`);
    },
  };
}

export * from './types';
export { useSplashScreen } from './hook';

