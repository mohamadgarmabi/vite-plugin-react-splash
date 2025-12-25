'use strict';var react=require('react');var h=a=>{let{theme:e,animation:r,meshColors:o,mode:i="auto"}=a,s=e?.light||{background:"#ffffff",color:"#000000"},t=e?.dark||{background:"#000000",color:"#ffffff"},n="",l="";if(i==="light"?l=`
      #vite-splash-screen { background-color: ${s.background}; color: ${s.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
    `:i==="dark"?l=`
      #vite-splash-screen { background-color: ${t.background}; color: ${t.color}; }
      .splash-logo-light { display: none; }
      .splash-logo-dark { display: block; }
    `:l=`
      #vite-splash-screen { background-color: ${s.background}; color: ${s.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
      @media (prefers-color-scheme: dark) {
        #vite-splash-screen { background-color: ${t.background}; color: ${t.color}; }
        .splash-logo-dark { display: block; }
        .splash-logo-light { display: none; }
      }
    `,r==="pulse"&&(n+=`
      .splash-logo { animation: splash-pulse 2s infinite; }
      @keyframes splash-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `),r==="gradient-mesh"){let c=["#3498db","#9b59b6","#2ecc71"],g=o?.length?o:c,d=["center","20% 30%","80% 70%","40% 80%","70% 20%","10% 60%","90% 40%"],m=g.map((f,u)=>`radial-gradient(circle at ${d[u%d.length]}, ${f} 0%, transparent 50%)`).join(",");n+=`
      #vite-splash-screen::before {
        content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        background: ${m}; z-index: -1; animation: rotate-mesh 20s linear infinite;
        opacity: 0.3; filter: blur(60px);
      }
      @keyframes rotate-mesh { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;}return `
    #vite-splash-screen {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      z-index: 999999; transition: opacity 0.5s, visibility 0.5s;
      font-family: -apple-system, system-ui, sans-serif;
      background-color: ${s.background}; color: ${s.color};
    }
    #vite-splash-screen.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    .splash-logo { width: 120px; height: 120px; margin-bottom: 20px; }
    .splash-logo svg { fill: currentColor; width: 100%; height: 100%; }
    .splash-text { font-size: 1.2rem; font-weight: 500; }
    .splash-version { position: absolute; bottom: 20px; font-size: 0.8rem; opacity: 0.7; }
    ${l}
    ${n}
  `.replace(/\s+/g," ").trim()};function y(){return {hideSplashScreen:react.useCallback(()=>{let e=document.getElementById("vite-splash-screen");e&&(e.classList.add("hidden"),setTimeout(()=>e.remove(),500));},[])}}function x(a){return {name:"vite-plugin-react-splash",transformIndexHtml(e){let r=h(a),{logo:o,text:i,version:s,duration:t=3e3,onlyStandalone:n=false,showOnce:l=false}=a,p=typeof o=="string"?`<div class="splash-logo">${o}</div>`:`<div class="splash-logo splash-logo-light">${o.light}</div><div class="splash-logo splash-logo-dark">${o.dark}</div>`,c=`
<style>${r}</style>
<div id="vite-splash-screen">
${p}
${i?`<div class="splash-text">${i}</div>`:""}
${s?`<div class="splash-version">v${s}</div>`:""}
</div>
<script>
(function(){
  var d=${t},o=${n},s1=${l},s=document.getElementById('vite-splash-screen');
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
</script>`.replace(/>\s+</g,"><").trim();return e.replace("<body>",`<body>${c}`)}}}exports.useSplashScreen=y;exports.viteSplashScreen=x;