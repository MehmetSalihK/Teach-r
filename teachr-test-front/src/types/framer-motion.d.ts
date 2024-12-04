declare module 'framer-motion' {
    import * as React from 'react';

    export interface AnimationControls {
        start: (definition?: any) => Promise<any>;
        stop: () => void;
        set: (definition: any) => void;
    }

    export interface MotionValue<T = any> {
        get: () => T;
        set: (value: T) => void;
        onChange: (callback: (value: T) => void) => () => void;
    }

    export interface MotionProps {
        initial?: any;
        animate?: any;
        exit?: any;
        transition?: any;
        variants?: any;
        style?: React.CSSProperties;
        className?: string;
        [key: string]: any;
    }

    export interface TransformOptions {
        clamp?: boolean;
        from?: number[];
        to?: number[];
    }

    export const motion: {
        [key in keyof JSX.IntrinsicElements]: React.ForwardRefExoticComponent<
            MotionProps & JSX.IntrinsicElements[key]
        >;
    };

    export const AnimatePresence: React.FC<{
        children?: React.ReactNode;
        exitBeforeEnter?: boolean;
        initial?: boolean;
        onExitComplete?: () => void;
    }>;

    export function useAnimation(): AnimationControls;
    export function useMotionValue<T = any>(initial: T): MotionValue<T>;
    export function useTransform<T>(
        value: MotionValue,
        inputRange: number[],
        outputRange: T[],
        options?: TransformOptions
    ): MotionValue<T>;
}
