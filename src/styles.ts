import { SplashScreenOptions } from './types';

export const generateStyles = (options: SplashScreenOptions) => {
  const { theme, animation, meshColors, backgroundAnimation, textAnimation, mode = 'auto' } = options;
  const light = theme?.light || { background: '#ffffff', color: '#000000' };
  const dark = theme?.dark || { background: '#000000', color: '#ffffff' };

  let extraStyles = '';
  let themeStyles = '';

  if (mode === 'light') {
    themeStyles = `
      #vite-splash-screen { background-color: ${light.background}; color: ${light.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
    `;
  } else if (mode === 'dark') {
    themeStyles = `
      #vite-splash-screen { background-color: ${dark.background}; color: ${dark.color}; }
      .splash-logo-light { display: none; }
      .splash-logo-dark { display: block; }
    `;
  } else {
    // Auto mode: uses prefers-color-scheme
    themeStyles = `
      #vite-splash-screen { background-color: ${light.background}; color: ${light.color}; }
      .splash-logo-light { display: block; }
      .splash-logo-dark { display: none; }
      @media (prefers-color-scheme: dark) {
        #vite-splash-screen { background-color: ${dark.background}; color: ${dark.color}; }
        .splash-logo-dark { display: block; }
        .splash-logo-light { display: none; }
      }
    `;
  }

  themeStyles += `
    #vite-splash-screen.theme-light { background-color: ${light.background} !important; color: ${light.color} !important; }
    #vite-splash-screen.theme-light .splash-logo-light { display: block !important; }
    #vite-splash-screen.theme-light .splash-logo-dark { display: none !important; }

    #vite-splash-screen.theme-dark { background-color: ${dark.background} !important; color: ${dark.color} !important; }
    #vite-splash-screen.theme-dark .splash-logo-dark { display: block !important; }
    #vite-splash-screen.theme-dark .splash-logo-light { display: none !important; }
  `;

  if (animation === 'fade') {
    extraStyles += `
      .splash-logo { animation: splash-fade 2s ease-in-out infinite; }
      @keyframes splash-fade {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
    `;
  }

  if (animation === 'pulse') {
    extraStyles += `
      .splash-logo { animation: splash-pulse 2s infinite; }
      @keyframes splash-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
    `;
  }

  if (animation === 'slide-up') {
    extraStyles += `
      .splash-logo { animation: splash-slide-up 2s ease-in-out infinite; }
      @keyframes splash-slide-up {
        0%, 100% { transform: translateY(0); opacity: 1; }
        50% { transform: translateY(-12px); opacity: 0.9; }
      }
    `;
  }

  if (animation === 'spin') {
    extraStyles += `
      .splash-logo { animation: splash-spin 1.5s linear infinite; }
      @keyframes splash-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
  }

  if (animation === 'bounce') {
    extraStyles += `
      .splash-logo { animation: splash-bounce 1.2s ease-in-out infinite; }
      @keyframes splash-bounce {
        0%, 100% { transform: translateY(0); }
        30% { transform: translateY(-18px); }
        50% { transform: translateY(0); }
        65% { transform: translateY(-8px); }
        80% { transform: translateY(0); }
      }
    `;
  }

  if (animation === 'shimmer') {
    extraStyles += `
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
    `;
  }

  if (animation === 'ripple') {
    extraStyles += `
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
    `;
  }

  if (animation === 'dots') {
    extraStyles += `
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
    `;
  }

  if (animation === 'bars') {
    extraStyles += `
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
    `;
  }

  if (animation === 'spinner') {
    extraStyles += `
      .splash-spinner {
        margin-top: 16px; width: 32px; height: 32px;
        border: 3px solid currentColor; border-radius: 50%;
        border-top-color: transparent; opacity: 0.8;
        animation: splash-spinner 0.8s linear infinite;
      }
      @keyframes splash-spinner { to { transform: rotate(360deg); } }
    `;
  }

  if (animation === 'progress') {
    extraStyles += `
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
    `;
  }

  if (animation === 'gradient-mesh') {
    const defaultMeshColors = ['#3498db', '#9b59b6', '#2ecc71'];
    const colors = meshColors?.length ? meshColors : defaultMeshColors;
    const positions = ['center', '20% 30%', '80% 70%', '40% 80%', '70% 20%', '10% 60%', '90% 40%'];
    
    const meshGradients = colors.map((color, i) => 
      `radial-gradient(circle at ${positions[i % positions.length]}, ${color} 0%, transparent 50%)`
    ).join(',');

    extraStyles += `
      #vite-splash-screen::before {
        content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
        background: ${meshGradients}; z-index: -1; animation: rotate-mesh 20s linear infinite;
        opacity: 0.3; filter: blur(60px);
      }
      @keyframes rotate-mesh { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
  }

  if (backgroundAnimation && backgroundAnimation !== 'none') {
    extraStyles += `
      .splash-bg-layer {
        position: absolute; inset: 0; z-index: -1; pointer-events: none;
      }
    `;
    if (backgroundAnimation === 'pulse') {
      extraStyles += `
        .splash-bg-layer {
          background: inherit; opacity: 0.85;
          animation: bg-pulse 2.5s ease-in-out infinite;
        }
        @keyframes bg-pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `;
    }
    if (backgroundAnimation === 'breath') {
      extraStyles += `
        .splash-bg-layer {
          background: inherit; opacity: 0.9;
          animation: bg-breath 4s ease-in-out infinite;
        }
        @keyframes bg-breath {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
      `;
    }
    if (backgroundAnimation === 'gradient') {
      const lightMix = light.background;
      const darkMix = dark.background;
      extraStyles += `
        .splash-bg-layer {
          background: linear-gradient(135deg, ${lightMix} 0%, ${darkMix} 50%, ${lightMix} 100%);
          background-size: 200% 200%;
          animation: bg-gradient 6s ease infinite;
        }
        @keyframes bg-gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `;
    }
    if (backgroundAnimation === 'wave') {
      const lightMix = light.background;
      const darkMix = dark.background;
      extraStyles += `
        .splash-bg-layer {
          background: linear-gradient(90deg, ${lightMix}, ${darkMix}, ${lightMix}, ${darkMix});
          background-size: 300% 100%;
          animation: bg-wave 4s ease-in-out infinite;
        }
        @keyframes bg-wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `;
    }
  }

  if (textAnimation === 'chars') {
    extraStyles += `
      .splash-text-chars { display: inline-flex; flex-wrap: wrap; justify-content: center; font-size: 1.2rem; font-weight: 500; }
      .splash-char { opacity: 0; animation: splash-char-in 0.4s ease-out forwards; }
      @keyframes splash-char-in {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
  }

  const css = `
    #vite-splash-screen {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      z-index: 999999; transition: opacity 0.5s, visibility 0.5s;
      font-family: -apple-system, system-ui, sans-serif;
      background-color: ${light.background}; color: ${light.color};
    }
    #vite-splash-screen.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
    .splash-logo { width: 120px; height: 120px; margin-bottom: 20px; }
    .splash-logo svg { fill: currentColor; width: 100%; height: 100%; }
    .splash-text { font-size: 1.2rem; font-weight: 500; }
    .splash-version { position: absolute; bottom: 20px; font-size: 0.8rem; opacity: 0.7; }
    ${themeStyles}
    ${extraStyles}
  `;

  return css.replace(/\s+/g, ' ').trim();
};

