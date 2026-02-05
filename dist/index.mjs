import {useCallback}from'react';var k=p=>{let{theme:c,animation:a,meshColors:e,backgroundAnimation:o,textAnimation:h,mode:d="auto"}=p,t=c?.light||{background:"#ffffff",color:"#000000"},n=c?.dark||{background:"#000000",color:"#ffffff"},s="",l="";if(d==="light"?l=`
      #vite-splash-screen { background-color: ${t.background}; color: ${t.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
    `:d==="dark"?l=`
      #vite-splash-screen { background-color: ${n.background}; color: ${n.color}; }
      .splash-logo-light { display: none; }
      .splash-logo-dark { display: block; }
    `:l=`
      #vite-splash-screen { background-color: ${t.background}; color: ${t.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
      @media (prefers-color-scheme: dark) {
        #vite-splash-screen { background-color: ${n.background}; color: ${n.color}; }
        .splash-logo-dark { display: block; }
        .splash-logo-light { display: none; }
      }
    `,l+=`
    #vite-splash-screen.theme-light { background-color: ${t.background} !important; color: ${t.color} !important; }
    #vite-splash-screen.theme-light .splash-logo-light { display: block !important; }
    #vite-splash-screen.theme-light .splash-logo-dark { display: none !important; }

    #vite-splash-screen.theme-dark { background-color: ${n.background} !important; color: ${n.color} !important; }
    #vite-splash-screen.theme-dark .splash-logo-dark { display: block !important; }
    #vite-splash-screen.theme-dark .splash-logo-light { display: none !important; }
  `,a==="fade"&&(s+=`
      .splash-logo { animation: splash-fade 2s ease-in-out infinite; }
      @keyframes splash-fade {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
    `),a==="pulse"&&(s+=`
      .splash-logo { animation: splash-pulse 2s infinite; }
      @keyframes splash-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `),a==="slide-up"&&(s+=`
      .splash-logo { animation: splash-slide-up 2s ease-in-out infinite; }
      @keyframes splash-slide-up {
        0%, 100% { transform: translateY(0); opacity: 1; }
        50% { transform: translateY(-12px); opacity: 0.9; }
      }
    `),a==="spin"&&(s+=`
      .splash-logo { animation: splash-spin 1.5s linear infinite; }
      @keyframes splash-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `),a==="bounce"&&(s+=`
      .splash-logo { animation: splash-bounce 1.2s ease-in-out infinite; }
      @keyframes splash-bounce {
        0%, 100% { transform: translateY(0); }
        30% { transform: translateY(-18px); }
        50% { transform: translateY(0); }
        65% { transform: translateY(-8px); }
        80% { transform: translateY(0); }
      }
    `),a==="shimmer"&&(s+=`
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
    `),a==="ripple"&&(s+=`
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
    `),a==="dots"&&(s+=`
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
    `),a==="bars"&&(s+=`
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
    `),a==="spinner"&&(s+=`
      .splash-spinner {
        margin-top: 16px; width: 32px; height: 32px;
        border: 3px solid currentColor; border-radius: 50%;
        border-top-color: transparent; opacity: 0.8;
        animation: splash-spinner 0.8s linear infinite;
      }
      @keyframes splash-spinner { to { transform: rotate(360deg); } }
    `),a==="progress"&&(s+=`
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
    `),a==="gradient-mesh"){let i=["#3498db","#9b59b6","#2ecc71"],r=e?.length?e:i,g=["center","20% 30%","80% 70%","40% 80%","70% 20%","10% 60%","90% 40%"],m=r.map((f,u)=>`radial-gradient(circle at ${g[u%g.length]}, ${f} 0%, transparent 50%)`).join(",");s+=`
      #vite-splash-screen::before {
        content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        background: ${m}; z-index: -1; animation: rotate-mesh 20s linear infinite;
        opacity: 0.3; filter: blur(60px);
      }
      @keyframes rotate-mesh { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;}if(o&&o!=="none"){if(s+=`
      .splash-bg-layer {
        position: absolute; inset: 0; z-index: -1; pointer-events: none;
      }
    `,o==="pulse"&&(s+=`
        .splash-bg-layer {
          background: inherit; opacity: 0.85;
          animation: bg-pulse 2.5s ease-in-out infinite;
        }
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `),o==="breath"&&(s+=`
        .splash-bg-layer {
          background: inherit; opacity: 0.9;
          animation: bg-breath 4s ease-in-out infinite;
        }
        @keyframes bg-breath {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
      `),o==="gradient"){let i=t.background,r=n.background;s+=`
        .splash-bg-layer {
          background: linear-gradient(135deg, ${i} 0%, ${r} 50%, ${i} 100%);
          background-size: 200% 200%;
          animation: bg-gradient 6s ease infinite;
        }
        @keyframes bg-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `;}if(o==="wave"){let i=t.background,r=n.background;s+=`
        .splash-bg-layer {
          background: linear-gradient(90deg, ${i}, ${r}, ${i}, ${r});
          background-size: 300% 100%;
          animation: bg-wave 4s ease-in-out infinite;
        }
        @keyframes bg-wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `;}}return h==="chars"&&(s+=`
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
    ${s}
  `.replace(/\s+/g," ").trim()};function S(){let p=useCallback(()=>{let a=document.getElementById("vite-splash-screen");a&&(a.classList.add("hidden"),setTimeout(()=>a.remove(),500));},[]),c=useCallback(a=>{try{a==="auto"?localStorage.removeItem("v-splash-theme"):localStorage.setItem("v-splash-theme",a);let e=document.getElementById("vite-splash-screen");e&&(e.classList.remove("theme-light","theme-dark"),a!=="auto"&&e.classList.add(`theme-${a}`));}catch{}},[]);return {hideSplashScreen:p,setSplashTheme:c}}function L(p){return {name:"vite-plugin-react-splash",transformIndexHtml(c){let a=k(p),{logo:e,text:o,version:h,duration:d=3e3,onlyStandalone:t=false,showOnce:n=false,animation:s,backgroundAnimation:l,textAnimation:y="none",textCharDelay:i=50}=p,r=b=>b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),g=typeof e=="string"?`<div class="splash-logo">${e}</div>`:`<div class="splash-logo splash-logo-light">${e.light}</div><div class="splash-logo splash-logo-dark">${e.dark}</div>`,m=s==="dots"?'<div class="splash-dots"><span></span><span></span><span></span></div>':"",f=s==="bars"?'<div class="splash-bars"><span></span><span></span><span></span><span></span><span></span></div>':"",u=s==="spinner"?'<div class="splash-spinner"></div>':"",x=s==="progress"?'<div class="splash-progress"><div class="splash-progress-bar"></div></div>':"",$=`
<style>${a}</style>
<div id="vite-splash-screen">
${l&&l!=="none"?'<div class="splash-bg-layer"></div>':""}
${g}
${o?y==="chars"?`<div class="splash-text splash-text-chars">${o.split("").map((b,w)=>`<span class="splash-char" style="animation-delay:${w*i}ms">${r(b)}</span>`).join("")}</div>`:`<div class="splash-text">${r(o)}</div>`:""}
${m}
${f}
${u}
${x}
${h?`<div class="splash-version">v${h}</div>`:""}
</div>
<script>
(function(){
  var d=${d},o=${t},s1=${n},s=document.getElementById('vite-splash-screen');
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
</script>`.replace(/>\s+</g,"><").trim();return c.replace("<body>",`<body>${$}`)}}}export{S as useSplashScreen,L as viteSplashScreen};