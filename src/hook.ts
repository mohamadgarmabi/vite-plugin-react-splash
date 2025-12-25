import { useCallback } from 'react';

export function useSplashScreen() {
  const hideSplashScreen = useCallback(() => {
    const s = document.getElementById('vite-splash-screen');
    if (s) {
      s.classList.add('hidden');
      setTimeout(() => s.remove(), 500);
    }
  }, []);

  const setSplashTheme = useCallback((theme: 'light' | 'dark' | 'auto') => {
    try {
      if (theme === 'auto') {
        localStorage.removeItem('v-splash-theme');
      } else {
        localStorage.setItem('v-splash-theme', theme);
      }
      
      // Apply immediately if splash is still visible
      const s = document.getElementById('vite-splash-screen');
      if (s) {
        s.classList.remove('theme-light', 'theme-dark');
        if (theme !== 'auto') s.classList.add(`theme-${theme}`);
      }
    } catch (e) {}
  }, []);

  return { hideSplashScreen, setSplashTheme };
}

