import React, { useEffect, useRef, memo } from 'react';

const HeroSection: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number | null>(null);
    const isTabVisible = useRef(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles: Particle[] = [];
        const particleCount = 70;
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        class Particle {
            x: number; y: number; size: number; speedX: number; speedY: number;
            constructor() {
                this.x = Math.random() * (canvas?.width || window.innerWidth);
                this.y = Math.random() * (canvas?.height || window.innerHeight);
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
            }
            update() {
                if (!canvas) return;
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
                this.x += this.speedX;
                this.y += this.speedY;
            }
            draw() {
                if(!ctx) return;
                ctx.fillStyle = 'rgba(200, 220, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const connect = () => {
            if(!ctx) return;
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
                    if (distance < 150) {
                        opacityValue = 1 - (distance / 150);
                        ctx.strokeStyle = `rgba(100, 150, 255, ${opacityValue})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!isTabVisible.current) {
                animationFrameId.current = requestAnimationFrame(animate);
                return;
            }
            if(!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connect();
            animationFrameId.current = requestAnimationFrame(animate);
        };

        const handleVisibilityChange = () => {
            isTabVisible.current = !document.hidden;
        };

        resizeCanvas();
        init();
        animate();

        const handleResize = () => {
          resizeCanvas();
          init();
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <section id="hero" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
            <div className="absolute inset-0 bg-black/20"></div>
            
            <div className="relative z-10 p-6 flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-white animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    Llevamos tu red al <span className="gradient-text">siguiente nivel</span>
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    Te ayudamos a mantener tu red de internet y sistemas empresariales más estables, rápidos y seguros. Soluciones expertas para ISP y PYMES en Colombia.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                    <a href="#services-isp" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30">
                        Nuestros Servicios
                    </a>
                    <a href="#contact" className="w-full sm:w-auto bg-transparent border-2 border-gray-500 text-gray-200 font-bold py-3 px-8 rounded-full hover:bg-white/10 hover:border-white/80 transition-all duration-300">
                        Hablar con un experto
                    </a>
                </div>
            </div>
        </section>
    );
};

export default memo(HeroSection);