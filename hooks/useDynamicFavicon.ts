import { useEffect, useRef } from 'react';
import type { AIStatus } from '../types';

const defaultFavicon = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡️</text></svg>";

export const useDynamicFavicon = (status: AIStatus) => {
    const animationFrameId = useRef<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        canvasRef.current = document.createElement('canvas');
        canvasRef.current.width = 64;
        canvasRef.current.height = 64;
        ctxRef.current = canvasRef.current.getContext('2d');
    }, []);

    const drawThinkingFavicon = (angle: number) => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.arc(32, 32, 26, 0, Math.PI * 2);
        ctx.fillStyle = '#22d3ee'; // primary-cyan
        ctx.fill();

        ctx.beginPath();
        ctx.arc(32, 32, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#05020D'; // bg-dark
        ctx.fill();

        ctx.beginPath();
        ctx.arc(32, 32, 23, angle, angle + Math.PI * 1.5);
        ctx.strokeStyle = '#a855f7'; // primary-purple
        ctx.lineWidth = 6;
        ctx.stroke();
        
        const link = document.getElementById('favicon') as HTMLLinkElement;
        if (link) {
            link.href = canvas.toDataURL('image/png');
        }
    };

    const animateFavicon = () => {
        let angle = 0;
        const animate = () => {
            angle += 0.1;
            drawThinkingFavicon(angle);
            animationFrameId.current = requestAnimationFrame(animate);
        };
        animate();
    };

    const stopAnimation = () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
        const link = document.getElementById('favicon') as HTMLLinkElement;
        if (link) {
            link.href = defaultFavicon;
        }
    };

    useEffect(() => {
        if (status === 'thinking' || status === 'generating_quote') {
            animateFavicon();
        } else {
            stopAnimation();
        }

        return () => stopAnimation();
    }, [status]);
};
