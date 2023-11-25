import { useEffect, useState } from 'react';

const StarrySky = () => {
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const canvas = document.getElementById('starCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            setCanvasDimensions({ width: canvas.width, height: canvas.height });
        };

        resizeCanvas(); // Set initial canvas size

        window.addEventListener('resize', resizeCanvas);

        const stars: { x: number; y: number; radius: number; color: string }[] = [];
        const starCount = 1000;

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                color: 'white'
            });
        }

        let animationFrameId: number;
        let shootingStar: { x: number; y: number; length: number; speed: number; opacity: number } | null = null;

        function drawStars() {
            ctx?.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < starCount; i++) {
                const star = stars[i];
                ctx?.beginPath();
                ctx?.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx!.fillStyle = star.color;
                ctx?.fill();
            }
        }

        function generateShootingStar() {
            if (!shootingStar) {
                shootingStar = {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    length: Math.random() * 50 + 25, // Longer shooting star
                    speed: Math.random() * 2 + 2, // Slower speed
                    opacity: 1 // Initial opacity
                };
            }

            // Draw the shooting star tail
            for (let i = 0; i < shootingStar.length; i++) {
                ctx?.beginPath();
                ctx?.moveTo(shootingStar.x, shootingStar.y);
                ctx?.lineTo(shootingStar.x + i, shootingStar.y - i);
                ctx!.strokeStyle = `rgba(255, 255, 255, ${shootingStar.opacity - i / shootingStar.length})`;
                ctx?.stroke();
            }

            // Update position and opacity
            shootingStar.y += shootingStar.speed;
            shootingStar.x -= shootingStar.speed;

            shootingStar.opacity -= 0.003; // Adjust the fade speed

            // Reset shooting star when it goes out of the canvas or fades out
            if (shootingStar.y + shootingStar.length < 0 || shootingStar.opacity <= 0) {
                shootingStar = null;
            }
        }

        function animateStars() {
            drawStars();

            generateShootingStar(); // Generate a shooting star in each frame

            for (let i = 0; i < starCount; i++) {
                stars[i].y -= 0.05; // Slow down regular stars

                if (stars[i].y < 0) {
                    stars[i].y = canvas.height;
                }
            }

            animationFrameId = requestAnimationFrame(animateStars);
        }

        animateStars();

        // Cleanup function
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            id="starCanvas"
            width={canvasDimensions.width}
            height={canvasDimensions.height}
            style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
        ></canvas>
    );
};

export default StarrySky;
