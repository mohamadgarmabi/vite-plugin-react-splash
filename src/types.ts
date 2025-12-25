export interface SplashScreenOptions {
  logo: string | { light: string; dark: string }; // SVG string or URL
  duration?: number; // Duration in milliseconds
  text?: string; // Text to display below the logo
  version?: string; // Version to display at the bottom
  theme?: {
    light: {
      background: string;
      color: string;
    };
    dark: {
      background: string;
      color: string;
    };
  };
  mode?: 'light' | 'dark' | 'auto'; // Manual override or auto-detection (default: 'auto')
  animation?: 'none' | 'fade' | 'pulse' | 'slide-up' | 'gradient-mesh'; // Advanced background animation
  meshColors?: string[]; // Custom colors for gradient-mesh animation
  onlyStandalone?: boolean; // Only show in PWA standalone mode
  showOnce?: boolean; // Only show once (on first load)
}

