import { Plugin } from 'vite';

interface SplashTextStyle {
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
interface SplashSvgFillAnimation {
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
interface SplashScreenOptions {
    logo: string | {
        light: string;
        dark: string;
    };
    duration?: number;
    text?: string;
    textAnimation?: 'none' | 'chars';
    textCharDelay?: number;
    textClassName?: string;
    textStyle?: SplashTextStyle;
    /** Sequential SVG fill animation (path by path, left-to-right or right-to-left) */
    svgAnimation?: SplashSvgFillAnimation;
    /** Attributes merged onto `<body>` while splash is visible (existing attrs are preserved and restored on hide) */
    bodyAttributes?: Record<string, string>;
    /** Class name(s) added to `<body>` while splash is visible (merged with existing classes) */
    bodyClass?: string | string[];
    version?: string;
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
    mode?: 'light' | 'dark' | 'auto';
    animation?: 'none' | 'fade' | 'pulse' | 'slide-up' | 'gradient-mesh' | 'spin' | 'bounce' | 'shimmer' | 'ripple' | 'dots' | 'bars' | 'spinner' | 'progress';
    meshColors?: string[];
    backgroundAnimation?: 'none' | 'pulse' | 'breath' | 'gradient' | 'wave';
    onlyStandalone?: boolean;
    showOnce?: boolean;
    showOnceStorage?: 'session' | 'local';
    showOnAppEnter?: boolean;
    appScope?: string | string[];
}

declare global {
    interface Window {
        __viteSplashRestoreBody?: () => void;
    }
}
declare function useSplashScreen(): {
    hideSplashScreen: () => void;
    setSplashTheme: (theme: "light" | "dark" | "auto") => void;
};

declare function viteSplashScreen(options: SplashScreenOptions): Plugin;

export { type SplashScreenOptions, type SplashSvgFillAnimation, type SplashTextStyle, useSplashScreen, viteSplashScreen };
