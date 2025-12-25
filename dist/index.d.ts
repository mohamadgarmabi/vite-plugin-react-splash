import { Plugin } from 'vite';

interface SplashScreenOptions {
    logo: string;
    duration?: number;
    text?: string;
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
    animation?: 'none' | 'fade' | 'pulse' | 'slide-up' | 'gradient-mesh';
    meshColors?: string[];
}

declare function useSplashScreen(): {
    hideSplashScreen: () => void;
};

declare function viteSplashScreen(options: SplashScreenOptions): Plugin;

export { type SplashScreenOptions, useSplashScreen, viteSplashScreen };
