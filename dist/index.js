'use strict';var react=require('react');var I=l=>l?Object.entries(l).filter(([,s])=>s!==void 0&&s!=="").map(([s,t])=>`${s.includes("-")?s:s.replace(/[A-Z]/g,o=>`-${o.toLowerCase()}`)}:${t}`).join(";"):"",$=l=>{let{theme:s,animation:t,meshColors:a,backgroundAnimation:o,textAnimation:f,textStyle:k,svgAnimation:m,mode:u="auto"}=l,i=s?.light||{background:"#ffffff",color:"#000000"},r=s?.dark||{background:"#000000",color:"#ffffff"},e="",n="";if(u==="light"?n=`
      #vite-splash-screen { background-color: ${i.background}; color: ${i.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
    `:u==="dark"?n=`
      #vite-splash-screen { background-color: ${r.background}; color: ${r.color}; }
      .splash-logo-light { display: none; }
      .splash-logo-dark { display: block; }
    `:n=`
      #vite-splash-screen { background-color: ${i.background}; color: ${i.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
      @media (prefers-color-scheme: dark) {
        #vite-splash-screen { background-color: ${r.background}; color: ${r.color}; }
        .splash-logo-dark { display: block; }
        .splash-logo-light { display: none; }
      }
    `,n+=`
    #vite-splash-screen.theme-light { background-color: ${i.background} !important; color: ${i.color} !important; }
    #vite-splash-screen.theme-light .splash-logo-light { display: block !important; }
    #vite-splash-screen.theme-light .splash-logo-dark { display: none !important; }

    #vite-splash-screen.theme-dark { background-color: ${r.background} !important; color: ${r.color} !important; }
    #vite-splash-screen.theme-dark .splash-logo-dark { display: block !important; }
    #vite-splash-screen.theme-dark .splash-logo-light { display: none !important; }
  `,t==="fade"&&(e+=`
      .splash-logo { animation: splash-fade 2s ease-in-out infinite; }
      @keyframes splash-fade {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
    `),t==="pulse"&&(e+=`
      .splash-logo { animation: splash-pulse 2s infinite; }
      @keyframes splash-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `),t==="slide-up"&&(e+=`
      .splash-logo { animation: splash-slide-up 2s ease-in-out infinite; }
      @keyframes splash-slide-up {
        0%, 100% { transform: translateY(0); opacity: 1; }
        50% { transform: translateY(-12px); opacity: 0.9; }
      }
    `),t==="spin"&&(e+=`
      .splash-logo { animation: splash-spin 1.5s linear infinite; }
      @keyframes splash-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `),t==="bounce"&&(e+=`
      .splash-logo { animation: splash-bounce 1.2s ease-in-out infinite; }
      @keyframes splash-bounce {
        0%, 100% { transform: translateY(0); }
        30% { transform: translateY(-18px); }
        50% { transform: translateY(0); }
        65% { transform: translateY(-8px); }
        80% { transform: translateY(0); }
      }
    `),t==="shimmer"&&(e+=`
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
    `),t==="ripple"&&(e+=`
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
    `),t==="dots"&&(e+=`
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
    `),t==="bars"&&(e+=`
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
    `),t==="spinner"&&(e+=`
      .splash-spinner {
        margin-top: 16px; width: 32px; height: 32px;
        border: 3px solid currentColor; border-radius: 50%;
        border-top-color: transparent; opacity: 0.8;
        animation: splash-spinner 0.8s linear infinite;
      }
      @keyframes splash-spinner { to { transform: rotate(360deg); } }
    `),t==="progress"&&(e+=`
      .splash-progress { margin-top: 16px; width: 120px; height: 4px; border-radius: 2px; background: currentColor; opacity: 0.2; overflow: hidden; }
      .splash-progress-bar {
        height: 100%; width: 30%; border-radius: 2px;
        background: currentColor; opacity: 0.9;
        animation: splash-progress 1.5s ease-in-out infinite;
      }
      @keyframes splash-progress {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(433%); }
      }
    `),t==="gradient-mesh"){let p=["#3498db","#9b59b6","#2ecc71"],c=a?.length?a:p,b=["center","20% 30%","80% 70%","40% 80%","70% 20%","10% 60%","90% 40%"],d=c.map((v,g)=>`radial-gradient(circle at ${b[g%b.length]}, ${v} 0%, transparent 50%)`).join(",");e+=`
      #vite-splash-screen::before {
        content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        background: ${d}; z-index: -1; animation: rotate-mesh 20s linear infinite;
        opacity: 0.3; filter: blur(60px);
      }
      @keyframes rotate-mesh { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;}if(o&&o!=="none"){if(e+=`
      .splash-bg-layer {
        position: absolute; inset: 0; z-index: -1; pointer-events: none;
      }
    `,o==="pulse"&&(e+=`
        .splash-bg-layer {
          background: inherit; opacity: 0.85;
          animation: bg-pulse 2.5s ease-in-out infinite;
        }
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `),o==="breath"&&(e+=`
        .splash-bg-layer {
          background: inherit; opacity: 0.9;
          animation: bg-breath 4s ease-in-out infinite;
        }
        @keyframes bg-breath {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
      `),o==="gradient"){let p=i.background,c=r.background;e+=`
        .splash-bg-layer {
          background: linear-gradient(135deg, ${p} 0%, ${c} 50%, ${p} 100%);
          background-size: 200% 200%;
          animation: bg-gradient 6s ease infinite;
        }
        @keyframes bg-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `;}if(o==="wave"){let p=i.background,c=r.background;e+=`
        .splash-bg-layer {
          background: linear-gradient(90deg, ${p}, ${c}, ${p}, ${c});
          background-size: 300% 100%;
          animation: bg-wave 4s ease-in-out infinite;
        }
        @keyframes bg-wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `;}}f==="chars"&&(e+=`
      .splash-text-chars { display: inline-flex; flex-wrap: wrap; justify-content: center; font-size: 1.2rem; font-weight: 500; }
      .splash-char { opacity: 0; animation: splash-char-in 0.4s ease-out forwards; }
      @keyframes splash-char-in {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `);let h=I(k);h&&(e+=`.splash-text { ${h}; }`),m?.type==="sequential-fill"&&(e+=`
      .splash-logo svg [data-splash-fill],
      .splash-logo svg [data-splash-stroke] {
        transition-property: fill-opacity, stroke-opacity;
        transition-timing-function: ease;
      }
    `);let y=m?.type==="sequential-fill"?".splash-logo svg { width: 100%; height: 100%; }":".splash-logo svg { fill: currentColor; width: 100%; height: 100%; }";return `
    #vite-splash-screen {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      z-index: 999999; transition: opacity 0.5s, visibility 0.5s;
      font-family: -apple-system, system-ui, sans-serif;
      background-color: ${i.background}; color: ${i.color};
    }
    #vite-splash-screen.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    .splash-logo { width: 120px; height: 120px; margin-bottom: 20px; }
    ${y}
    .splash-text { font-size: 1.2rem; font-weight: 500; }
    .splash-version { position: absolute; bottom: 20px; font-size: 0.8rem; opacity: 0.7; }
    ${n}
    ${e}
  `.replace(/\s+/g," ").trim()};function z(){let l=react.useCallback(()=>{let t=document.getElementById("vite-splash-screen");t&&(t.classList.add("hidden"),window.__viteSplashRestoreBody?.(),setTimeout(()=>t.remove(),500));},[]),s=react.useCallback(t=>{try{t==="auto"?localStorage.removeItem("v-splash-theme"):localStorage.setItem("v-splash-theme",t);let a=document.getElementById("vite-splash-screen");a&&(a.classList.remove("theme-light","theme-dark"),t!=="auto"&&a.classList.add(`theme-${t}`));}catch{}},[]);return {hideSplashScreen:l,setSplashTheme:s}}function _(l){return {name:"vite-plugin-react-splash",transformIndexHtml(s){let t=$(l),{logo:a,text:o,version:f,duration:k=3e3,onlyStandalone:m=false,showOnce:u=false,showOnceStorage:i="session",showOnAppEnter:r=false,appScope:e,animation:n,backgroundAnimation:h,textAnimation:y="none",textCharDelay:S=50,textClassName:p,svgAnimation:c,bodyAttributes:b,bodyClass:d}=l,v=x=>x.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),g=c?" splash-logo-animated":"",B=typeof a=="string"?`<div class="splash-logo${g}">${a}</div>`:`<div class="splash-logo splash-logo-light${g}">${a.light}</div><div class="splash-logo splash-logo-dark${g}">${a.dark}</div>`,w=["splash-text",y==="chars"?"splash-text-chars":"",p||""].filter(Boolean).join(" "),O=n==="dots"?'<div class="splash-dots"><span></span><span></span><span></span></div>':"",C=n==="bars"?'<div class="splash-bars"><span></span><span></span><span></span><span></span><span></span></div>':"",j=n==="spinner"?'<div class="splash-spinner"></div>':"",F=n==="progress"?'<div class="splash-progress"><div class="splash-progress-bar"></div></div>':"",L=h&&h!=="none"?'<div class="splash-bg-layer"></div>':"",D=Array.isArray(e)?e:e?[e]:[],H=`
<style>${t}</style>
<div id="vite-splash-screen">
${L}
${B}
${o?y==="chars"?`<div class="${w}">${o.split("").map((x,Y)=>`<span class="splash-char" style="animation-delay:${Y*S}ms">${v(x)}</span>`).join("")}</div>`:`<div class="${w}">${v(o)}</div>`:""}
${O}
${C}
${j}
${F}
${f?`<div class="splash-version">v${f}</div>`:""}
</div>
<script>
(function(){
  var d=${k},o=${m},s1=${u},ss=${JSON.stringify(i)},ae=${r},sc=${JSON.stringify(D)},ba=${JSON.stringify(b||{})},bc=${JSON.stringify(Array.isArray(d)?d:d?[d]:[])},sa=${JSON.stringify(c||null)},s=document.getElementById('vite-splash-screen');
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
        var animateFill=target==='fill'||target==='both';
        var animateStroke=target==='stroke'||target==='both';
        if(animateFill){
          item.el.setAttribute('data-splash-fill','true');
          item.el.style.fillOpacity='0';
          item.el.style.transitionDuration=stepDuration+'ms';
        }
        if(animateStroke){
          item.el.setAttribute('data-splash-stroke','true');
          item.el.style.strokeOpacity='0';
          item.el.style.transitionDuration=stepDuration+'ms';
        }
        setTimeout(function(){
          if(animateFill)item.el.style.fillOpacity='1';
          if(animateStroke)item.el.style.strokeOpacity='1';
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
</script>`.replace(/>\s+</g,"><").trim();return s.replace(/<body([^>]*)>/i,`<body$1>${H}`)}}}exports.useSplashScreen=z;exports.viteSplashScreen=_;