import type { RuntimeConfig, SplashScreenOptions } from './types';

const buildRuntimeScript = (config: RuntimeConfig): string => {
  const {
    duration,
    onlyStandalone,
    showOnce,
    showOnceStorage,
    showOnAppEnter,
    appScopes,
    bodyAttributes,
    bodyClasses,
    svgAnimation,
    respectReducedMotion,
    waitUntilReady,
    minDuration,
    progress,
  } = config;

  return `<script>
(function(){
  var d=${duration},o=${onlyStandalone},s1=${showOnce},ss=${JSON.stringify(showOnceStorage)},ae=${showOnAppEnter},sc=${JSON.stringify(appScopes)},ba=${JSON.stringify(bodyAttributes)},bc=${JSON.stringify(bodyClasses)},sa=${JSON.stringify(svgAnimation)},rm=${respectReducedMotion},wr=${waitUntilReady},md=${minDuration},pg=${progress},s=document.getElementById('vite-splash-screen');
  var bodyBackup=null,shownAt=0,hideScheduled=false,pendingHide=false,fadeTimer=null;
  function prefersReduced(){
    return rm&&window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
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
  function removeCriticalStyle(){
    var st=document.getElementById('vite-splash-critical');
    if(st)st.remove();
  }
  function removeSplash(){
    restoreBodyState();
    removeCriticalStyle();
    if(s)s.remove();
    s=null;
  }
  function startHide(){
    if(!s||hideScheduled)return;
    hideScheduled=true;
    s.classList.add('hidden');
    restoreBodyState();
    fadeTimer=setTimeout(removeSplash,500);
  }
  function requestHide(){
    if(!s||hideScheduled)return;
    var elapsed=Date.now()-shownAt;
    var wait=Math.max(0,md-elapsed);
    if(wait>0){
      pendingHide=true;
      setTimeout(function(){if(pendingHide)startHide();},wait);
      return;
    }
    startHide();
  }
  window.__viteSplashRestoreBody=restoreBodyState;
  window.__viteSplashHide=requestHide;
  window.__viteSplashSetProgress=function(value){
    if(!s)return;
    var n=Number(value);
    if(isNaN(n))return;
    if(n<0)n=0;
    if(n>100)n=100;
    var bar=s.querySelector('.splash-progress-bar');
    var wrap=s.querySelector('.splash-progress');
    if(bar)bar.style.transform='scaleX('+(n/100)+')';
    if(wrap)wrap.setAttribute('aria-valuenow',String(Math.round(n)));
    if(n>=100&&wr)requestHide();
  };
  function getVisibleLogo(root){
    var logos=root.querySelectorAll('.splash-logo');
    for(var i=0;i<logos.length;i+=1){
      if(window.getComputedStyle(logos[i]).display!=='none')return logos[i];
    }
    return logos[0]||null;
  }
  function initSvgFillAnimation(root,config){
    if(!config||config.type!=='sequential-fill'||prefersReduced())return;
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
    shownAt=Date.now();
    applyBodyState();
    if(!prefersReduced())initSvgFillAnimation(s,sa);
    if(prefersReduced())s.classList.add('splash-reduced-motion');
    if(s1) { try { storage.setItem('v-splash-shown', 'true'); } catch (e) {} }
    if(!wr){
      var autoDelay=Math.max(d,md);
      setTimeout(requestHide,autoDelay);
    }
  }
})();
</script>`;
};

const normalizeBodyClasses = (bodyClass?: string | string[]): string[] =>
  Array.isArray(bodyClass) ? bodyClass : bodyClass ? [bodyClass] : [];

const normalizeAppScopes = (appScope?: string | string[]): string[] =>
  Array.isArray(appScope) ? appScope : appScope ? [appScope] : [];

const createRuntimeScript = (options: SplashScreenOptions): string => {
  const {
    duration = 3000,
    onlyStandalone = false,
    showOnce = false,
    showOnceStorage = 'session',
    showOnAppEnter = false,
    appScope,
    bodyAttributes,
    bodyClass,
    svgAnimation,
    respectReducedMotion = true,
    waitUntilReady = false,
    minDuration = 0,
    progress = false,
    animation,
  } = options;

  return buildRuntimeScript({
    duration,
    onlyStandalone,
    showOnce,
    showOnceStorage,
    showOnAppEnter,
    appScopes: normalizeAppScopes(appScope),
    bodyAttributes: bodyAttributes || {},
    bodyClasses: normalizeBodyClasses(bodyClass),
    svgAnimation: svgAnimation || null,
    respectReducedMotion,
    waitUntilReady,
    minDuration,
    progress: progress || animation === 'progress',
  });
};

export { createRuntimeScript };
export type { RuntimeConfig } from './types';
