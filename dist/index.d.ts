import { Plugin } from 'vite';

type SplashThemeMode = 'light' | 'dark' | 'auto';
type SplashTextAnimation = 'none' | 'chars';
type SplashShowOnceStorage = 'session' | 'local';
type SplashBackgroundAnimation = 'none' | 'pulse' | 'breath' | 'gradient' | 'wave';
type SplashAnimation = 'none' | 'fade' | 'pulse' | 'slide-up' | 'gradient-mesh' | 'spin' | 'bounce' | 'shimmer' | 'ripple' | 'dots' | 'bars' | 'spinner' | 'progress';
type SplashSvgFillTarget = 'fill' | 'stroke' | 'both';
type SplashSvgFillDirection = 'ltr' | 'rtl';
interface SplashThemeColors {
    background: string;
    color: string;
}
interface SplashTheme {
    light: SplashThemeColors;
    dark: SplashThemeColors;
}
interface SplashLogoPair {
    light: string;
    dark: string;
}
type SplashLogo = string | SplashLogoPair;
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
    fontFamily?: string;
    textTransform?: string;
    whiteSpace?: string;
}
interface SplashSvgFillAnimation {
    type: 'sequential-fill';
    direction?: SplashSvgFillDirection;
    stepDelay?: number;
    stepDuration?: number;
    target?: SplashSvgFillTarget;
}
interface SplashScreenOptions {
    logo: SplashLogo;
    duration?: number;
    text?: string;
    textAnimation?: SplashTextAnimation;
    textCharDelay?: number;
    textClassName?: string;
    textStyle?: SplashTextStyle;
    svgAnimation?: SplashSvgFillAnimation;
    bodyAttributes?: Record<string, string>;
    bodyClass?: string | string[];
    version?: string;
    theme?: SplashTheme;
    mode?: SplashThemeMode;
    animation?: SplashAnimation;
    meshColors?: string[];
    backgroundAnimation?: SplashBackgroundAnimation;
    onlyStandalone?: boolean;
    showOnce?: boolean;
    showOnceStorage?: SplashShowOnceStorage;
    showOnAppEnter?: boolean;
    appScope?: string | string[];
    respectReducedMotion?: boolean;
    waitUntilReady?: boolean;
    minDuration?: number;
    progress?: boolean;
}
interface UseSplashScreenResult {
    hideSplashScreen: () => void;
    setSplashTheme: (theme: SplashThemeMode) => void;
    setProgress: (value: number) => void;
}
interface ViteSplashWindowApi {
    __viteSplashRestoreBody?: () => void;
    __viteSplashHide?: () => void;
    __viteSplashSetProgress?: (value: number) => void;
}
interface RuntimeConfig {
    duration: number;
    onlyStandalone: boolean;
    showOnce: boolean;
    showOnceStorage: SplashShowOnceStorage;
    showOnAppEnter: boolean;
    appScopes: string[];
    bodyAttributes: Record<string, string>;
    bodyClasses: string[];
    svgAnimation: SplashSvgFillAnimation | null;
    respectReducedMotion: boolean;
    waitUntilReady: boolean;
    minDuration: number;
    progress: boolean;
}

declare global {
    interface Window {
        __viteSplashRestoreBody?: () => void;
        __viteSplashHide?: () => void;
        __viteSplashSetProgress?: (value: number) => void;
    }
}
declare const useSplashScreen: () => UseSplashScreenResult;

declare const injectCriticalCss: (html: string, styles: string) => string;
declare const injectBodySplash: (html: string, bodyContent: string) => string;
declare const viteSplashScreen: (options: SplashScreenOptions) => Plugin;

export { type RuntimeConfig, type SplashAnimation, type SplashBackgroundAnimation, type SplashLogo, type SplashLogoPair, type SplashScreenOptions, type SplashShowOnceStorage, type SplashSvgFillAnimation, type SplashSvgFillDirection, type SplashSvgFillTarget, type SplashTextAnimation, type SplashTextStyle, type SplashTheme, type SplashThemeColors, type SplashThemeMode, type UseSplashScreenResult, type ViteSplashWindowApi, injectBodySplash, injectCriticalCss, useSplashScreen, viteSplashScreen };
