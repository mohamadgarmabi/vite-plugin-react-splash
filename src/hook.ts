import { useCallback } from 'react';

export function useSplashScreen() {
  const hideSplashScreen = useCallback(() => {
    const s = document.getElementById('vite-splash-screen');
    if (s) {
      s.classList.add('hidden');
      setTimeout(() => s.remove(), 500);
    }
  }, []);

  return { hideSplashScreen };
}

