import {useCallback}from'react';var v=p=>{let{theme:c,animation:s,meshColors:e,backgroundAnimation:n,textAnimation:d,mode:m="auto"}=p,t=c?.light||{background:"#ffffff",color:"#000000"},r=c?.dark||{background:"#000000",color:"#ffffff"},a="",l="";if(m==="light"?l=`
      #vite-splash-screen { background-color: ${t.background}; color: ${t.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
    `:m==="dark"?l=`
      #vite-splash-screen { background-color: ${r.background}; color: ${r.color}; }
      .splash-logo-light { display: none; }
      .splash-logo-dark { display: block; }
    `:l=`
      #vite-splash-screen { background-color: ${t.background}; color: ${t.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
      @media (prefers-color-scheme: dark) {
        #vite-splash-screen { background-color: ${r.background}; color: ${r.color}; }
        .splash-logo-dark { display: block; }
        .splash-logo-light { display: none; }
      }
    `,l+=`
    #vite-splash-screen.theme-light { background-color: ${t.background} !important; color: ${t.color} !important; }
    #vite-splash-screen.theme-light .splash-logo-light { display: block !important; }
    #vite-splash-screen.theme-light .splash-logo-dark { display: none !important; }

    #vite-splash-screen.theme-dark { background-color: ${r.background} !important; color: ${r.color} !important; }
    #vite-splash-screen.theme-dark .splash-logo-dark { display: block !important; }
    #vite-splash-screen.theme-dark .splash-logo-light { display: none !important; }
  `,s==="fade"&&(a+=`
      .splash-logo { animation: splash-fade 2s ease-in-out infinite; }
      @keyframes splash-fade {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
    `),s==="pulse"&&(a+=`
      .splash-logo { animation: splash-pulse 2s infinite; }
      @keyframes splash-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `),s==="slide-up"&&(a+=`
      .splash-logo { animation: splash-slide-up 2s ease-in-out infinite; }
      @keyframes splash-slide-up {
        0%, 100% { transform: translateY(0); opacity: 1; }
        50% { transform: translateY(-12px); opacity: 0.9; }
      }
    `),s==="spin"&&(a+=`
      .splash-logo { animation: splash-spin 1.5s linear infinite; }
      @keyframes splash-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `),s==="bounce"&&(a+=`
      .splash-logo { animation: splash-bounce 1.2s ease-in-out infinite; }
      @keyframes splash-bounce {
        0%, 100% { transform: translateY(0); }
        30% { transform: translateY(-18px); }
        50% { transform: translateY(0); }
        65% { transform: translateY(-8px); }
        80% { transform: translateY(0); }
      }
    `),s==="shimmer"&&(a+=`
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
    `),s==="ripple"&&(a+=`
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
    `),s==="dots"&&(a+=`
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
    `),s==="bars"&&(a+=`
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
    `),s==="spinner"&&(a+=`
      .splash-spinner {
        margin-top: 16px; width: 32px; height: 32px;
        border: 3px solid currentColor; border-radius: 50%;
        border-top-color: transparent; opacity: 0.8;
        animation: splash-spinner 0.8s linear infinite;
      }
      @keyframes splash-spinner { to { transform: rotate(360deg); } }
    `),s==="progress"&&(a+=`
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
    `),s==="gradient-mesh"){let o=["#3498db","#9b59b6","#2ecc71"],i=e?.length?e:o,g=["center","20% 30%","80% 70%","40% 80%","70% 20%","10% 60%","90% 40%"],u=i.map((f,y)=>`radial-gradient(circle at ${g[y%g.length]}, ${f} 0%, transparent 50%)`).join(",");a+=`
      #vite-splash-screen::before {
        content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        background: ${u}; z-index: -1; animation: rotate-mesh 20s linear infinite;
        opacity: 0.3; filter: blur(60px);
      }
      @keyframes rotate-mesh { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;}if(n&&n!=="none"){if(a+=`
      .splash-bg-layer {
        position: absolute; inset: 0; z-index: -1; pointer-events: none;
      }
    `,n==="pulse"&&(a+=`
        .splash-bg-layer {
          background: inherit; opacity: 0.85;
          animation: bg-pulse 2.5s ease-in-out infinite;
        }
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `),n==="breath"&&(a+=`
        .splash-bg-layer {
          background: inherit; opacity: 0.9;
          animation: bg-breath 4s ease-in-out infinite;
        }
        @keyframes bg-breath {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
      `),n==="gradient"){let o=t.background,i=r.background;a+=`
        .splash-bg-layer {
          background: linear-gradient(135deg, ${o} 0%, ${i} 50%, ${o} 100%);
          background-size: 200% 200%;
          animation: bg-gradient 6s ease infinite;
        }
        @keyframes bg-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `;}if(n==="wave"){let o=t.background,i=r.background;a+=`
        .splash-bg-layer {
          background: linear-gradient(90deg, ${o}, ${i}, ${o}, ${i});
          background-size: 300% 100%;
          animation: bg-wave 4s ease-in-out infinite;
        }
        @keyframes bg-wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `;}}return d==="chars"&&(a+=`
      .splash-text-chars { display: inline-flex; flex-wrap: wrap; justify-content: center; font-size: 1.2rem; font-weight: 500; }
      .splash-char { opacity: 0; animation: splash-char-in 0.4s ease-out forwards; }
      @keyframes splash-char-in {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `),`
    #vite-splash-screen {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      z-index: 999999; transition: opacity 0.5s, visibility 0.5s;
      font-family: -apple-system, system-ui, sans-serif;
      background-color: ${t.background}; color: ${t.color};
    }
    #vite-splash-screen.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    .splash-logo { width: 120px; height: 120px; margin-bottom: 20px; }
    .splash-logo svg { fill: currentColor; width: 100%; height: 100%; }
    .splash-text { font-size: 1.2rem; font-weight: 500; }
    .splash-version { position: absolute; bottom: 20px; font-size: 0.8rem; opacity: 0.7; }
    ${l}
    ${a}
  `.replace(/\s+/g," ").trim()};function O(){let p=useCallback(()=>{let s=document.getElementById("vite-splash-screen");s&&(s.classList.add("hidden"),setTimeout(()=>s.remove(),500));},[]),c=useCallback(s=>{try{s==="auto"?localStorage.removeItem("v-splash-theme"):localStorage.setItem("v-splash-theme",s);let e=document.getElementById("vite-splash-screen");e&&(e.classList.remove("theme-light","theme-dark"),s!=="auto"&&e.classList.add(`theme-${s}`));}catch{}},[]);return {hideSplashScreen:p,setSplashTheme:c}}function B(p){return {name:"vite-plugin-react-splash",transformIndexHtml(c){let s=v(p),{logo:e,text:n,version:d,duration:m=3e3,onlyStandalone:t=false,showOnce:r=false,showOnceStorage:a="session",showOnAppEnter:l=false,appScope:h,animation:o,backgroundAnimation:i,textAnimation:g="none",textCharDelay:u=50}=p,f=b=>b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),y=typeof e=="string"?`<div class="splash-logo">${e}</div>`:`<div class="splash-logo splash-logo-light">${e.light}</div><div class="splash-logo splash-logo-dark">${e.dark}</div>`,x=o==="dots"?'<div class="splash-dots"><span></span><span></span><span></span></div>':"",w=o==="bars"?'<div class="splash-bars"><span></span><span></span><span></span><span></span><span></span></div>':"",$=o==="spinner"?'<div class="splash-spinner"></div>':"",S=o==="progress"?'<div class="splash-progress"><div class="splash-progress-bar"></div></div>':"",A=i&&i!=="none"?'<div class="splash-bg-layer"></div>':"",C=Array.isArray(h)?h:h?[h]:[],H=`
<style>${s}</style>
<div id="vite-splash-screen">
${A}
${y}
${n?g==="chars"?`<div class="splash-text splash-text-chars">${n.split("").map((b,Y)=>`<span class="splash-char" style="animation-delay:${Y*u}ms">${f(b)}</span>`).join("")}</div>`:`<div class="splash-text">${f(n)}</div>`:""}
${x}
${w}
${$}
${S}
${d?`<div class="splash-version">v${d}</div>`:""}
</div>
<script>
(function(){
  var d=${m},o=${t},s1=${r},ss=${JSON.stringify(a)},ae=${l},sc=${JSON.stringify(C)},s=document.getElementById('vite-splash-screen');
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
      s.remove();
      return;
    }
    if(s1) { try { storage.setItem('v-splash-shown', 'true'); } catch (e) {} }
    setTimeout(function(){
      s.classList.add('hidden');
      setTimeout(function(){s.remove()},500);
    },d);
  }
})();
</script>`.replace(/>\s+</g,"><").trim();return c.replace("<body>",`<body>${H}`)}}}export{O as useSplashScreen,B as viteSplashScreen};