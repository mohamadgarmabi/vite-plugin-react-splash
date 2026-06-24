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
        showOnceStorage = 'session',
        showOnAppEnter = false,
        appScope,
        animation,
        backgroundAnimation,
        textAnimation = 'none',
        textCharDelay = 50,
        textClassName,
        svgAnimation,
        bodyAttributes,
        bodyClass,
      } = options;

      const escapeHtml = (raw: string): string =>
        raw
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');

      const logoAnimatedClass = svgAnimation ? ' splash-logo-animated' : '';
      const logoHtml = typeof logo === 'string'
        ? `<div class="splash-logo${logoAnimatedClass}">${logo}</div>`
        : `<div class="splash-logo splash-logo-light${logoAnimatedClass}">${logo.light}</div><div class="splash-logo splash-logo-dark${logoAnimatedClass}">${logo.dark}</div>`;

      const textClasses = [
        'splash-text',
        textAnimation === 'chars' ? 'splash-text-chars' : '',
        textClassName || '',
      ]
        .filter(Boolean)
        .join(' ');

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
      const appScopes = Array.isArray(appScope)
        ? appScope
        : appScope
          ? [appScope]
          : [];

      const splashHtml = `
<style>${styles}</style>
<div id="vite-splash-screen">
${bgLayerHtml}
${logoHtml}
${text
        ? textAnimation === 'chars'
          ? `<div class="${textClasses}">${text
              .split('')
              .map(
                (char, i) =>
                  `<span class="splash-char" style="animation-delay:${i * textCharDelay}ms">${escapeHtml(char)}</span>`
              )
              .join('')}</div>`
        : `<div class="${textClasses}">${escapeHtml(text)}</div>`
        : ''}
${dotsHtml}
${barsHtml}
${spinnerHtml}
${progressHtml}
${version ? `<div class="splash-version">v${version}</div>` : ''}
</div>
<script>
(function(){
  var d=${duration},o=${onlyStandalone},s1=${showOnce},ss=${JSON.stringify(showOnceStorage)},ae=${showOnAppEnter},sc=${JSON.stringify(appScopes)},ba=${JSON.stringify(bodyAttributes || {})},bc=${JSON.stringify(Array.isArray(bodyClass) ? bodyClass : bodyClass ? [bodyClass] : [])},sa=${JSON.stringify(svgAnimation || null)},s=document.getElementById('vite-splash-screen');
  var bodyBackup=null;
  function applyBodyState(){
    var b=document.body;
    if(!b||(!bc.length&&!Object.keys(ba).length))return;
    bodyBackup={attrs:{},addedClasses:[]};
    for(var i=0;i<bc.length;i+=1){
      var cls=bc[i];
      if(!cls)continue;
      if(!b.classList.contains(cls)){
        b.classList.add(cls);
        bodyBackup.addedClasses.push(cls);
      }
    }
    for(var key in ba){
      if(!Object.prototype.hasOwnProperty.call(ba,key))continue;
      bodyBackup.attrs[key]=b.hasAttribute(key)?b.getAttribute(key):null;
      b.setAttribute(key,ba[key]);
    }
  }
  function restoreBodyState(){
    if(!bodyBackup)return;
    var b=document.body;
    if(!b){bodyBackup=null;return;}
    for(var i=0;i<bodyBackup.addedClasses.length;i+=1){
      b.classList.remove(bodyBackup.addedClasses[i]);
    }
    for(var key in bodyBackup.attrs){
      if(!Object.prototype.hasOwnProperty.call(bodyBackup.attrs,key))continue;
      if(bodyBackup.attrs[key]===null)b.removeAttribute(key);
      else b.setAttribute(key,bodyBackup.attrs[key]);
    }
    bodyBackup=null;
  }
  window.__viteSplashRestoreBody=restoreBodyState;
  function getVisibleLogo(root){
    var logos=root.querySelectorAll('.splash-logo');
    for(var i=0;i<logos.length;i+=1){
      if(window.getComputedStyle(logos[i]).display!=='none')return logos[i];
    }
    return logos[0]||null;
  }
  function initSvgFillAnimation(root,config){
    if(!config||config.type!=='sequential-fill')return;
    var logo=getVisibleLogo(root);
    if(!logo)return;
    var svg=logo.querySelector('svg');
    if(!svg)return;
    var direction=config.direction==='rtl'?'rtl':'ltr';
    var stepDelay=typeof config.stepDelay==='number'?config.stepDelay:120;
    var stepDuration=typeof config.stepDuration==='number'?config.stepDuration:350;
    var target=config.target||'fill';
    var animateFill=target==='fill'||target==='both';
    var animateStroke=target==='stroke'||target==='both';
    var selector='path,circle,rect,ellipse,polygon,polyline,line';
    var elements=Array.prototype.slice.call(svg.querySelectorAll(selector));
    if(!elements.length)return;
    var items=[];
    for(var i=0;i<elements.length;i+=1){
      var el=elements[i];
      var fill=el.getAttribute('fill');
      var stroke=el.getAttribute('stroke');
      var canFill=animateFill&&fill!=='none'&&window.getComputedStyle(el).fill!=='none';
      var canStroke=animateStroke&&!!stroke&&stroke!=='none';
      if(!canFill&&!canStroke)continue;
      var box;
      try{box=el.getBBox();}catch(e){continue;}
      if(!box.width&&!box.height)continue;
      items.push({el:el,x:box.x+box.width/2,canFill:canFill,canStroke:canStroke});
    }
    if(!items.length)return;
    items.sort(function(a,b){return direction==='rtl'?b.x-a.x:a.x-b.x;});
    for(var j=0;j<items.length;j+=1){
      (function(item,index){
        if(item.canFill){
          item.el.setAttribute('data-splash-fill','true');
          item.el.style.fillOpacity='0';
          item.el.style.transitionDuration=stepDuration+'ms';
        }
        if(item.canStroke){
          item.el.setAttribute('data-splash-stroke','true');
          item.el.style.strokeOpacity='0';
          item.el.style.transitionDuration=stepDuration+'ms';
        }
        setTimeout(function(){
          if(item.canFill)item.el.style.fillOpacity='1';
          if(item.canStroke)item.el.style.strokeOpacity='1';
        },index*stepDelay);
      })(items[j],j);
    }
  }
  function removeSplash(){
    restoreBodyState();
    if(s)s.remove();
  }
  if(s){
    var st; try { st = localStorage.getItem('v-splash-theme'); } catch (e) {}
    if (st === 'light' || st === 'dark') s.classList.add('theme-' + st);

    var isPWA = window.matchMedia('(display-mode: standalone)').matches || (window.navigator && window.navigator.standalone);
    var storage = ss === 'local' ? window.localStorage : window.sessionStorage;
    var shown = false;
    var navEntry = window.performance && window.performance.getEntriesByType
      ? window.performance.getEntriesByType('navigation')[0]
      : null;
    var isHistoryNavigation = !!(navEntry && navEntry.type === 'back_forward');
    var inferredScope = (function(pathname){
      if(sc && sc.length) return sc;
      var parts = pathname.split('/').filter(Boolean);
      return parts.length ? ['/' + parts[0]] : ['/'];
    })(window.location.pathname);
    var matchesScope = function(pathname){
      for (var i = 0; i < inferredScope.length; i += 1) {
        var prefix = inferredScope[i];
        if (!prefix) continue;
        if (prefix === '/') return true;
        if (pathname === prefix || pathname.indexOf(prefix + '/') === 0) return true;
      }
      return false;
    };
    var cameFromSameApp = false;
    try {
      if (ae && document.referrer) {
        var referrerUrl = new URL(document.referrer, window.location.href);
        cameFromSameApp = referrerUrl.origin === window.location.origin && matchesScope(referrerUrl.pathname);
      }
    } catch (e) {}
    try { shown = storage.getItem('v-splash-shown'); } catch (e) {}
    if((o && !isPWA) || isHistoryNavigation || (ae && cameFromSameApp) || (s1 && shown)){
      s.style.display='none';
      removeSplash();
      return;
    }
    applyBodyState();
    initSvgFillAnimation(s,sa);
    if(s1) { try { storage.setItem('v-splash-shown', 'true'); } catch (e) {} }
    setTimeout(function(){
      s.classList.add('hidden');
      setTimeout(removeSplash,500);
    },d);
  }
})();
</script>`.replace(/>\s+</g, '><').trim();

      return html.replace(/<body([^>]*)>/i, `<body$1>${splashHtml}`);
    },
  };
}

export * from './types';
export { useSplashScreen } from './hook';
