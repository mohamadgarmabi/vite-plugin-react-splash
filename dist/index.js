'use strict';var react=require('react');var R=e=>e?Object.entries(e).filter(([,r])=>r!==void 0&&r!=="").map(([r,t])=>`${r.replace(/[A-Z]/g,a=>`-${a.toLowerCase()}`)}:${t}`).join(";"):"",$=e=>{let{theme:r,animation:t,meshColors:i,backgroundAnimation:a,textAnimation:l,textStyle:p,svgAnimation:c,mode:m="auto",respectReducedMotion:u=true,progress:g=false}=e,o=r?.light||{background:"#ffffff",color:"#000000"},n=r?.dark||{background:"#000000",color:"#ffffff"},s="",d="";if(m==="light"?d=`
      #vite-splash-screen { background-color: ${o.background}; color: ${o.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
    `:m==="dark"?d=`
      #vite-splash-screen { background-color: ${n.background}; color: ${n.color}; }
      .splash-logo-light { display: none; }
      .splash-logo-dark { display: block; }
    `:d=`
      #vite-splash-screen { background-color: ${o.background}; color: ${o.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
      @media (prefers-color-scheme: dark) {
        #vite-splash-screen { background-color: ${n.background}; color: ${n.color}; }
        .splash-logo-dark { display: block; }
        .splash-logo-light { display: none; }
      }
    `,d+=`
    #vite-splash-screen.theme-light { background-color: ${o.background} !important; color: ${o.color} !important; }
    #vite-splash-screen.theme-light .splash-logo-light { display: block !important; }
    #vite-splash-screen.theme-light .splash-logo-dark { display: none !important; }

    #vite-splash-screen.theme-dark { background-color: ${n.background} !important; color: ${n.color} !important; }
    #vite-splash-screen.theme-dark .splash-logo-dark { display: block !important; }
    #vite-splash-screen.theme-dark .splash-logo-light { display: none !important; }
  `,t==="fade"&&(s+=`
      .splash-logo { animation: splash-fade 2s ease-in-out infinite; }
      @keyframes splash-fade {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
    `),t==="pulse"&&(s+=`
      .splash-logo { animation: splash-pulse 2s infinite; }
      @keyframes splash-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `),t==="slide-up"&&(s+=`
      .splash-logo { animation: splash-slide-up 2s ease-in-out infinite; }
      @keyframes splash-slide-up {
        0%, 100% { transform: translateY(0); opacity: 1; }
        50% { transform: translateY(-12px); opacity: 0.9; }
      }
    `),t==="spin"&&(s+=`
      .splash-logo { animation: splash-spin 1.5s linear infinite; }
      @keyframes splash-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `),t==="bounce"&&(s+=`
      .splash-logo { animation: splash-bounce 1.2s ease-in-out infinite; }
      @keyframes splash-bounce {
        0%, 100% { transform: translateY(0); }
        30% { transform: translateY(-18px); }
        50% { transform: translateY(0); }
        65% { transform: translateY(-8px); }
        80% { transform: translateY(0); }
      }
    `),t==="shimmer"&&(s+=`
      .splash-logo { position: relative; overflow: hidden; }
      .splash-logo::after {
        content: ""; position: absolute; inset: 0;
        background: linear-gradient(
          105deg,
          transparent 0%,
          transparent 40%,
          rgba(255,255,255,0.25) 50%,
          transparent 60%,
          transparent 100%
        );
        background-size: 200% 100%;
        animation: splash-shimmer 2s ease-in-out infinite;
      }
      @keyframes splash-shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `),t==="ripple"&&(s+=`
      #vite-splash-screen::after {
        content: ""; position: absolute; left: 50%; top: 50%;
        width: 80px; height: 80px; margin: -40px 0 0 -40px;
        border: 3px solid currentColor; border-radius: 50%;
        opacity: 0.4; animation: splash-ripple 1.5s ease-out infinite;
      }
      @keyframes splash-ripple {
        0% { transform: scale(0.6); opacity: 0.5; }
        100% { transform: scale(2.2); opacity: 0; }
      }
    `),t==="dots"&&(s+=`
      .splash-dots { display: flex; gap: 8px; margin-top: 16px; }
      .splash-dots span {
        width: 8px; height: 8px; border-radius: 50%;
        background: currentColor; opacity: 0.6;
        animation: splash-dot 1.4s ease-in-out infinite both;
      }
      .splash-dots span:nth-child(1) { animation-delay: 0s; }
      .splash-dots span:nth-child(2) { animation-delay: 0.2s; }
      .splash-dots span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes splash-dot {
        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
        40% { transform: scale(1.2); opacity: 1; }
      }
    `),t==="bars"&&(s+=`
      .splash-bars { display: flex; align-items: flex-end; gap: 6px; height: 28px; margin-top: 16px; }
      .splash-bars span {
        width: 6px; min-height: 8px; border-radius: 3px;
        background: currentColor; opacity: 0.7;
        animation: splash-bar 1.2s ease-in-out infinite both;
      }
      .splash-bars span:nth-child(1) { animation-delay: 0s; }
      .splash-bars span:nth-child(2) { animation-delay: 0.15s; }
      .splash-bars span:nth-child(3) { animation-delay: 0.3s; }
      .splash-bars span:nth-child(4) { animation-delay: 0.45s; }
      .splash-bars span:nth-child(5) { animation-delay: 0.6s; }
      @keyframes splash-bar {
        0%, 100% { transform: scaleY(0.4); }
        50% { transform: scaleY(1); }
      }
    `),t==="spinner"&&(s+=`
      .splash-spinner {
        margin-top: 16px; width: 32px; height: 32px;
        border: 3px solid currentColor; border-radius: 50%;
        border-top-color: transparent; opacity: 0.8;
        animation: splash-spinner 0.8s linear infinite;
      }
      @keyframes splash-spinner { to { transform: rotate(360deg); } }
    `),(g||t==="progress")&&(s+=`
      .splash-progress { margin-top: 16px; width: 120px; height: 4px; border-radius: 2px; background: currentColor; opacity: 0.2; overflow: hidden; }
      .splash-progress-bar {
        height: 100%; width: 100%; border-radius: 2px;
        background: currentColor; opacity: 0.9;
        transform-origin: left center;
        transform: scaleX(0);
        will-change: transform;
        transition: transform 0.2s ease-out;
      }
    `,t==="progress"&&!g&&(s+=`
        .splash-progress-bar {
          animation: splash-progress 1.5s ease-in-out infinite;
          width: 30%;
          transform: none;
        }
        @keyframes splash-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(433%); }
        }
      `)),t==="gradient-mesh"){let h=["#3498db","#9b59b6","#2ecc71"],f=i?.length?i:h,b=["center","20% 30%","80% 70%","40% 80%","70% 20%","10% 60%","90% 40%"],C=f.map((H,M)=>`radial-gradient(circle at ${b[M%b.length]}, ${H} 0%, transparent 50%)`).join(",");s+=`
      #vite-splash-screen::before {
        content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        background: ${C}; z-index: -1; animation: rotate-mesh 20s linear infinite;
        opacity: 0.3; filter: blur(60px);
      }
      @keyframes rotate-mesh { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;}if(a&&a!=="none"){if(s+=`
      .splash-bg-layer {
        position: absolute; inset: 0; z-index: -1; pointer-events: none;
      }
    `,a==="pulse"&&(s+=`
        .splash-bg-layer {
          background: inherit; opacity: 0.85;
          animation: bg-pulse 2.5s ease-in-out infinite;
        }
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `),a==="breath"&&(s+=`
        .splash-bg-layer {
          background: inherit; opacity: 0.9;
          animation: bg-breath 4s ease-in-out infinite;
        }
        @keyframes bg-breath {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
      `),a==="gradient"){let h=o.background,f=n.background;s+=`
        .splash-bg-layer {
          background: linear-gradient(135deg, ${h} 0%, ${f} 50%, ${h} 100%);
          background-size: 200% 200%;
          animation: bg-gradient 6s ease infinite;
        }
        @keyframes bg-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `;}if(a==="wave"){let h=o.background,f=n.background;s+=`
        .splash-bg-layer {
          background: linear-gradient(90deg, ${h}, ${f}, ${h}, ${f});
          background-size: 300% 100%;
          animation: bg-wave 4s ease-in-out infinite;
        }
        @keyframes bg-wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `;}}l==="chars"&&(s+=`
      .splash-text-chars { display: inline-flex; flex-wrap: wrap; justify-content: center; font-size: 1.2rem; font-weight: 500; }
      .splash-char { opacity: 0; animation: splash-char-in 0.4s ease-out forwards; }
      @keyframes splash-char-in {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `);let y=R(p);y&&(s+=`.splash-text { ${y}; }`),c?.type==="sequential-fill"&&(s+=`
      .splash-logo svg [data-splash-fill],
      .splash-logo svg [data-splash-stroke] {
        transition-property: fill-opacity, stroke-opacity;
        transition-timing-function: ease;
      }
    `);let v=c?.type==="sequential-fill"?".splash-logo svg { width: 100%; height: 100%; }":".splash-logo svg { fill: currentColor; width: 100%; height: 100%; }",k=u?`
    @media (prefers-reduced-motion: reduce) {
      #vite-splash-screen, #vite-splash-screen * {
        animation: none !important;
        transition: none !important;
      }
      #vite-splash-screen.hidden {
        transition: opacity 0.01s, visibility 0.01s;
      }
      .splash-char { opacity: 1 !important; transform: none !important; }
    }
    #vite-splash-screen.splash-reduced-motion,
    #vite-splash-screen.splash-reduced-motion * {
      animation: none !important;
    }
    #vite-splash-screen.splash-reduced-motion .splash-char {
      opacity: 1 !important;
      transform: none !important;
    }
  `:"";return `
    #vite-splash-screen {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      z-index: 999999; transition: opacity 0.5s, visibility 0.5s;
      font-family: -apple-system, system-ui, sans-serif;
      background-color: ${o.background}; color: ${o.color};
    }
    #vite-splash-screen.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    .splash-logo { width: 120px; height: 120px; margin-bottom: 20px; }
    ${v}
    .splash-text { font-size: 1.2rem; font-weight: 500; }
    .splash-version { position: absolute; bottom: 20px; font-size: 0.8rem; opacity: 0.7; }
    ${d}
    ${s}
    ${k}
  `.replace(/\s+/g," ").trim()};var A=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),B=e=>{let{logo:r,text:t,version:i,animation:a,backgroundAnimation:l,textAnimation:p="none",textCharDelay:c=50,textClassName:m,svgAnimation:u,progress:g=false}=e,o=g||a==="progress",n=u?" splash-logo-animated":"",s=typeof r=="string"?`<div class="splash-logo${n}">${r}</div>`:`<div class="splash-logo splash-logo-light${n}">${r.light}</div><div class="splash-logo splash-logo-dark${n}">${r.dark}</div>`,d=["splash-text",p==="chars"?"splash-text-chars":"",m||""].filter(Boolean).join(" "),w=a==="dots"?'<div class="splash-dots"><span></span><span></span><span></span></div>':"",y=a==="bars"?'<div class="splash-bars"><span></span><span></span><span></span><span></span><span></span></div>':"",v=a==="spinner"?'<div class="splash-spinner"></div>':"",k=o?'<div class="splash-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="splash-progress-bar" style="transform:scaleX(0)"></div></div>':"",x=l&&l!=="none"?'<div class="splash-bg-layer"></div>':"",h=t?p==="chars"?`<div class="${d}">${t.split("").map((f,b)=>`<span class="splash-char" style="animation-delay:${b*c}ms">${A(f)}</span>`).join("")}</div>`:`<div class="${d}">${A(t)}</div>`:"";return `
<div id="vite-splash-screen">
${x}
${s}
${h}
${w}
${y}
${v}
${k}
${i?`<div class="splash-version">v${i}</div>`:""}
</div>`.replace(/>\s+</g,"><").trim()};var _=e=>{let{duration:r,onlyStandalone:t,showOnce:i,showOnceStorage:a,showOnAppEnter:l,appScopes:p,bodyAttributes:c,bodyClasses:m,svgAnimation:u,respectReducedMotion:g,waitUntilReady:o,minDuration:n,progress:s}=e;return `<script>
(function(){
  var d=${r},o=${t},s1=${i},ss=${JSON.stringify(a)},ae=${l},sc=${JSON.stringify(p)},ba=${JSON.stringify(c)},bc=${JSON.stringify(m)},sa=${JSON.stringify(u)},rm=${g},wr=${o},md=${n},pg=${s},s=document.getElementById('vite-splash-screen');
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
</script>`},j=e=>Array.isArray(e)?e:e?[e]:[],D=e=>Array.isArray(e)?e:e?[e]:[],O=e=>{let{duration:r=3e3,onlyStandalone:t=false,showOnce:i=false,showOnceStorage:a="session",showOnAppEnter:l=false,appScope:p,bodyAttributes:c,bodyClass:m,svgAnimation:u,respectReducedMotion:g=true,waitUntilReady:o=false,minDuration:n=0,progress:s=false,animation:d}=e;return _({duration:r,onlyStandalone:t,showOnce:i,showOnceStorage:a,showOnAppEnter:l,appScopes:D(p),bodyAttributes:c||{},bodyClasses:j(m),svgAnimation:u||null,respectReducedMotion:g,waitUntilReady:o,minDuration:n,progress:s||d==="progress"})};var T=e=>Math.min(100,Math.max(0,e)),q=()=>{let e=react.useCallback(()=>{if(window.__viteSplashHide){window.__viteSplashHide();return}let i=document.getElementById("vite-splash-screen");i&&(i.classList.add("hidden"),window.__viteSplashRestoreBody?.(),setTimeout(()=>{i.remove();},500)),document.getElementById("vite-splash-critical")?.remove();},[]),r=react.useCallback(i=>{try{i==="auto"?localStorage.removeItem("v-splash-theme"):localStorage.setItem("v-splash-theme",i);let a=document.getElementById("vite-splash-screen");if(!a)return;a.classList.remove("theme-light","theme-dark"),i!=="auto"&&a.classList.add(`theme-${i}`);}catch{}},[]),t=react.useCallback(i=>{if(window.__viteSplashSetProgress){window.__viteSplashSetProgress(i);return}let a=document.getElementById("vite-splash-screen");if(!a)return;let l=T(i),p=a.querySelector(".splash-progress-bar"),c=a.querySelector(".splash-progress");p instanceof HTMLElement&&(p.style.transform=`scaleX(${l/100})`),c&&c.setAttribute("aria-valuenow",String(Math.round(l)));},[]);return {hideSplashScreen:e,setSplashTheme:r,setProgress:t}};var L=(e,r)=>{let t=`<style id="vite-splash-critical">${r}</style>`;return /<\/head>/i.test(e)?e.replace(/<\/head>/i,`${t}</head>`):/<html[^>]*>/i.test(e)?e.replace(/<html([^>]*)>/i,`<html$1><head>${t}</head>`):`${t}${e}`},P=(e,r)=>/<body([^>]*)>/i.test(e)?e.replace(/<body([^>]*)>/i,`<body$1>${r}`):`${r}${e}`,J=e=>({name:"vite-plugin-react-splash",transformIndexHtml(r){let t=$(e),i=B(e),a=O(e),l=`${i}${a}`.replace(/>\s+</g,"><").trim(),p=L(r,t);return P(p,l)}});exports.injectBodySplash=P;exports.injectCriticalCss=L;exports.useSplashScreen=q;exports.viteSplashScreen=J;