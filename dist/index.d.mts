import { Plugin } from 'vite';

interface SplashScreenOptions {
    logo: string | {
        light: string;
        dark: string;
    };
    duration?: number;
    text?: string;
    textAnimation?: 'none' | 'chars';
    textCharDelay?: number;
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
}

declare function useSplashScreen(): {
    hideSplashScreen: () => void;
    setSplashTheme: (theme: "light" | "dark" | "auto") => void;
};

declare function viteSplashScreen(options: SplashScreenOptions): Plugin;

export { type SplashScreenOptions, useSplashScreen, viteSplashScreen };
