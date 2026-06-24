export interface SplashTextStyle {
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
  marginTop?: string;
  marginBottom?: string;
  opacity?: string | number;
  letterSpacing?: string;
  lineHeight?: string | number;
  textAlign?: 'left' | 'center' | 'right';
  /** Any additional CSS properties (camelCase or kebab-case) */
  [key: string]: string | number | undefined;
}

export interface SplashSvgFillAnimation {
  type: 'sequential-fill';
  /** Fill order: left-to-right (default) or right-to-left */
  direction?: 'ltr' | 'rtl';
  /** Delay in ms before each SVG element starts filling (default 120) */
  stepDelay?: number;
  /** Duration in ms for each element fill transition (default 350) */
  stepDuration?: number;
  /** Animate fill opacity, stroke opacity, or both (default 'fill') */
  target?: 'fill' | 'stroke' | 'both';
}

export interface SplashScreenOptions {
  logo: string | { light: string; dark: string }; // SVG string or URL
  duration?: number; // Duration in milliseconds
  text?: string; // Text to display below the logo
  textAnimation?: 'none' | 'chars'; // Reveal text all at once or character by character
  textCharDelay?: number; // Delay in ms between each character (default 50), used when textAnimation is 'chars'
  textClassName?: string; // Extra CSS class(es) for the description text
  textStyle?: SplashTextStyle; // Inline styles for the description text below the logo
  /** Sequential SVG fill animation (path by path, left-to-right or right-to-left) */
  svgAnimation?: SplashSvgFillAnimation;
  /** Attributes merged onto `<body>` while splash is visible (existing attrs are preserved and restored on hide) */
  bodyAttributes?: Record<string, string>;
  /** Class name(s) added to `<body>` while splash is visible (merged with existing classes) */
  bodyClass?: string | string[];
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
  showOnce?: boolean; // Only show once per storage scope
  showOnceStorage?: 'session' | 'local'; // Keep splash hidden for the current tab session or across browser restarts
  showOnAppEnter?: boolean; // Only show when navigation enters this app from outside its scope
  appScope?: string | string[]; // Path prefix(es) that belong to the current app, e.g. '/dealer'
}
