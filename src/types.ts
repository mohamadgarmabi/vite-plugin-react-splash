export interface SplashScreenOptions {
  logo: string | { light: string; dark: string }; // SVG string or URL
  duration?: number; // Duration in milliseconds
  text?: string; // Text to display below the logo
  textAnimation?: 'none' | 'chars'; // Reveal text all at once or character by character
  textCharDelay?: number; // Delay in ms between each character (default 50), used when textAnimation is 'chars'
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
  animation?:
    | 'none'
    | 'fade'
    | 'pulse'
    | 'slide-up'
    | 'gradient-mesh'
    | 'spin'
    | 'bounce'
    | 'shimmer'
    | 'ripple'
    | 'dots'
    | 'bars'
    | 'spinner'
    | 'progress'; // Loading animation
  meshColors?: string[]; // Custom colors for gradient-mesh animation
  backgroundAnimation?:
    | 'none'
    | 'pulse'
    | 'breath'
    | 'gradient'
    | 'wave'; // Background color animation
  onlyStandalone?: boolean; // Only show in PWA standalone mode
  showOnce?: boolean; // Only show once (on first load)
}

