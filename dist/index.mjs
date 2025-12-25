import {useCallback}from'react';var c=t=>{let{theme:e,animation:n,meshColors:r}=t,s=e?.light||{background:"#ffffff",color:"#000000"},o=e?.dark||{background:"#000000",color:"#ffffff"},i="";if(n==="pulse"&&(i+=`
      .splash-logo { animation: splash-pulse 2s infinite; }
      @keyframes splash-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `),n==="gradient-mesh"){let p=["#3498db","#9b59b6","#2ecc71"],d=r?.length?r:p,l=["center","20% 30%","80% 70%","40% 80%","70% 20%","10% 60%","90% 40%"],h=d.map((m,f)=>`radial-gradient(circle at ${l[f%l.length]}, ${m} 0%, transparent 50%)`).join(",");i+=`
      #vite-splash-screen::before {
        content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        background: ${h}; z-index: -1; animation: rotate-mesh 20s linear infinite;
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
    @media (prefers-color-scheme: dark) {
      #vite-splash-screen { background-color: ${o.background}; color: ${o.color}; }
    }
    ${i}
  `.replace(/\s+/g," ").trim()};function g(){return {hideSplashScreen:useCallback(()=>{let e=document.getElementById("vite-splash-screen");e&&(e.classList.add("hidden"),setTimeout(()=>e.remove(),500));},[])}}function x(t){return {name:"vite-plugin-react-splash",transformIndexHtml(e){let n=c(t),{logo:r,text:s,version:o,duration:i=3e3}=t,a=`
<style>${n}</style>
<div id="vite-splash-screen">
<div class="splash-logo">${r}</div>
${s?`<div class="splash-text">${s}</div>`:""}
${o?`<div class="splash-version">v${o}</div>`:""}
</div>
<script>
(function(){
  var d=${i},s=document.getElementById('vite-splash-screen');
  if(s){setTimeout(function(){
    s.classList.add('hidden');
    setTimeout(function(){s.remove()},500);
  },d)}
})();
</script>`.replace(/>\s+</g,"><").trim();return e.replace("<body>",`<body>${a}`)}}}export{g as useSplashScreen,x as viteSplashScreen};