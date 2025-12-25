import {useCallback}from'react';var h=s=>{let{theme:e,animation:i,meshColors:r}=s,t=e?.light||{background:"#ffffff",color:"#000000"},o=e?.dark||{background:"#000000",color:"#ffffff"},n="";if(i==="pulse"&&(n+=`
      .splash-logo { animation: splash-pulse 2s infinite; }
      @keyframes splash-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `),i==="gradient-mesh"){let a=["#3498db","#9b59b6","#2ecc71"],l=r?.length?r:a,p=["center","20% 30%","80% 70%","40% 80%","70% 20%","10% 60%","90% 40%"],d=l.map((m,f)=>`radial-gradient(circle at ${p[f%p.length]}, ${m} 0%, transparent 50%)`).join(",");n+=`
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
      background-color: ${t.background}; color: ${t.color};
    }
    #vite-splash-screen.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    .splash-logo { width: 120px; height: 120px; margin-bottom: 20px; }
    .splash-logo svg { fill: currentColor; width: 100%; height: 100%; }
    .splash-text { font-size: 1.2rem; font-weight: 500; }
    .splash-version { position: absolute; bottom: 20px; font-size: 0.8rem; opacity: 0.7; }
    @media (prefers-color-scheme: dark) {
      #vite-splash-screen { background-color: ${o.background}; color: ${o.color}; }
    }
    ${n}
  `.replace(/\s+/g," ").trim()};function u(){return {hideSplashScreen:useCallback(()=>{let e=document.getElementById("vite-splash-screen");e&&(e.classList.add("hidden"),setTimeout(()=>e.remove(),500));},[])}}function x(s){return {name:"vite-plugin-react-splash",transformIndexHtml(e){let i=h(s),{logo:r,text:t,version:o,duration:n=3e3,onlyStandalone:c=false,showOnce:a=false}=s,l=`
<style>${i}</style>
<div id="vite-splash-screen">
<div class="splash-logo">${r}</div>
${t?`<div class="splash-text">${t}</div>`:""}
${o?`<div class="splash-version">v${o}</div>`:""}
</div>
<script>
(function(){
  var d=${n},o=${c},s1=${a},s=document.getElementById('vite-splash-screen');
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
</script>`.replace(/>\s+</g,"><").trim();return e.replace("<body>",`<body>${l}`)}}}export{u as useSplashScreen,x as viteSplashScreen};