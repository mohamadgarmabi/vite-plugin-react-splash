'use strict';var react=require('react');var h=t=>{let{theme:s,animation:a,meshColors:e}=t,o=s?.light||{background:"#ffffff",color:"#000000"},i=s?.dark||{background:"#000000",color:"#ffffff"},n="";if(a==="pulse"&&(n+=`
      .splash-logo { animation: splash-pulse 2s infinite; }
      @keyframes splash-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `),a==="gradient-mesh"){let r=["#3498db","#9b59b6","#2ecc71"],c=e?.length?e:r,l=["center","20% 30%","80% 70%","40% 80%","70% 20%","10% 60%","90% 40%"],d=c.map((m,f)=>`radial-gradient(circle at ${l[f%l.length]}, ${m} 0%, transparent 50%)`).join(",");n+=`
      #vite-splash-screen::before {
        content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        background: ${d}; z-index: -1; animation: rotate-mesh 20s linear infinite;
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
    .splash-logo-dark { display: none; }
    .splash-logo-light { display: block; }
    .splash-text { font-size: 1.2rem; font-weight: 500; }
    .splash-version { position: absolute; bottom: 20px; font-size: 0.8rem; opacity: 0.7; }
    @media (prefers-color-scheme: dark) {
      #vite-splash-screen { background-color: ${i.background}; color: ${i.color}; }
      .splash-logo-dark { display: block; }
      .splash-logo-light { display: none; }
    }
    ${n}
  `.replace(/\s+/g," ").trim()};function u(){return {hideSplashScreen:react.useCallback(()=>{let s=document.getElementById("vite-splash-screen");s&&(s.classList.add("hidden"),setTimeout(()=>s.remove(),500));},[])}}function $(t){return {name:"vite-plugin-react-splash",transformIndexHtml(s){let a=h(t),{logo:e,text:o,version:i,duration:n=3e3,onlyStandalone:p=false,showOnce:r=false}=t,c=typeof e=="string"?`<div class="splash-logo">${e}</div>`:`<div class="splash-logo splash-logo-light">${e.light}</div><div class="splash-logo splash-logo-dark">${e.dark}</div>`,l=`
<style>${a}</style>
<div id="vite-splash-screen">
${c}
${o?`<div class="splash-text">${o}</div>`:""}
${i?`<div class="splash-version">v${i}</div>`:""}
</div>
<script>
(function(){
  var d=${n},o=${p},s1=${r},s=document.getElementById('vite-splash-screen');
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
</script>`.replace(/>\s+</g,"><").trim();return s.replace("<body>",`<body>${l}`)}}}exports.useSplashScreen=u;exports.viteSplashScreen=$;