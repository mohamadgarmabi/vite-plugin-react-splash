import { SplashScreenOptions } from './types';

export const generateStyles = (options: SplashScreenOptions) => {
  const { theme, animation, meshColors, mode = 'auto' } = options;
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

  if (animation === 'pulse') {
    extraStyles += `
      .splash-logo { animation: splash-pulse 2s infinite; }
      @keyframes splash-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
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

