'use strict';var react=require('react');var d=a=>{let{theme:r,animation:s,meshColors:e,mode:i="auto"}=a,o=r?.light||{background:"#ffffff",color:"#000000"},t=r?.dark||{background:"#000000",color:"#ffffff"},n="",l="";if(i==="light"?l=`
      #vite-splash-screen { background-color: ${o.background}; color: ${o.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
    `:i==="dark"?l=`
      #vite-splash-screen { background-color: ${t.background}; color: ${t.color}; }
      .splash-logo-light { display: none; }
      .splash-logo-dark { display: block; }
    `:l=`
      #vite-splash-screen { background-color: ${o.background}; color: ${o.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
      @media (prefers-color-scheme: dark) {
        #vite-splash-screen { background-color: ${t.background}; color: ${t.color}; }
        .splash-logo-dark { display: block; }
        .splash-logo-light { display: none; }
      }
    `,l+=`
    #vite-splash-screen.theme-light { background-color: ${o.background} !important; color: ${o.color} !important; }
    #vite-splash-screen.theme-light .splash-logo-light { display: block !important; }
    #vite-splash-screen.theme-light .splash-logo-dark { display: none !important; }

    #vite-splash-screen.theme-dark { background-color: ${t.background} !important; color: ${t.color} !important; }
    #vite-splash-screen.theme-dark .splash-logo-dark { display: block !important; }
    #vite-splash-screen.theme-dark .splash-logo-light { display: none !important; }
  `,s==="pulse"&&(n+=`
      .splash-logo { animation: splash-pulse 2s infinite; }
      @keyframes splash-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `),s==="gradient-mesh"){let c=["#3498db","#9b59b6","#2ecc71"],g=e?.length?e:c,p=["center","20% 30%","80% 70%","40% 80%","70% 20%","10% 60%","90% 40%"],f=g.map((v,u)=>`radial-gradient(circle at ${p[u%p.length]}, ${v} 0%, transparent 50%)`).join(",");n+=`
      #vite-splash-screen::before {
        content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        background: ${f}; z-index: -1; animation: rotate-mesh 20s linear infinite;
        opacity: 0.3; filter: blur(60px);
      }
      @keyframes rotate-mesh { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;}return `
    #vite-splash-screen {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      z-index: 999999; transition: opacity 0.5s, visibility 0.5s;
      font-family: -apple-system, system-ui, sans-serif;
      background-color: ${o.background}; color: ${o.color};
    }
    #vite-splash-screen.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    .splash-logo { width: 120px; height: 120px; margin-bottom: 20px; }
    .splash-logo svg { fill: currentColor; width: 100%; height: 100%; }
    .splash-text { font-size: 1.2rem; font-weight: 500; }
    .splash-version { position: absolute; bottom: 20px; font-size: 0.8rem; opacity: 0.7; }
    ${l}
    ${n}
  `.replace(/\s+/g," ").trim()};function y(){let a=react.useCallback(()=>{let s=document.getElementById("vite-splash-screen");s&&(s.classList.add("hidden"),setTimeout(()=>s.remove(),500));},[]),r=react.useCallback(s=>{try{s==="auto"?localStorage.removeItem("v-splash-theme"):localStorage.setItem("v-splash-theme",s);let e=document.getElementById("vite-splash-screen");e&&(e.classList.remove("theme-light","theme-dark"),s!=="auto"&&e.classList.add(`theme-${s}`));}catch{}},[]);return {hideSplashScreen:a,setSplashTheme:r}}function x(a){return {name:"vite-plugin-react-splash",transformIndexHtml(r){let s=d(a),{logo:e,text:i,version:o,duration:t=3e3,onlyStandalone:n=false,showOnce:l=false}=a,h=typeof e=="string"?`<div class="splash-logo">${e}</div>`:`<div class="splash-logo splash-logo-light">${e.light}</div><div class="splash-logo splash-logo-dark">${e.dark}</div>`,c=`
<style>${s}</style>
<div id="vite-splash-screen">
${h}
${i?`<div class="splash-text">${i}</div>`:""}
${o?`<div class="splash-version">v${o}</div>`:""}
</div>
<script>
(function(){
  var d=${t},o=${n},s1=${l},s=document.getElementById('vite-splash-screen');
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
</script>`.replace(/>\s+</g,"><").trim();return r.replace("<body>",`<body>${c}`)}}}exports.useSplashScreen=y;exports.viteSplashScreen=x;