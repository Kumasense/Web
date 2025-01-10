document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.typewriter');
    const cursorElement = document.querySelector('.cursor');
    const text = "Sample";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 150);
        } else {
            cursorElement.classList.add('blinking'); // Add blinking effect to cursor after typing
        }
    }

    typeWriter();
});

window.onload = function() {
    const canvas = document.getElementById('spaceCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const starCount = 500;

    // Star Class for generating stars
    class Star {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * canvas.width;
            this.radius = Math.random() * 1.5;
        }

        update() {
            this.z -= 2;
            if (this.z <= 0) {
                this.reset();
            }
        }

        draw() {
            const x = (this.x - canvas.width / 2) * (canvas.width / this.z) + canvas.width / 2;
            const y = (this.y - canvas.height / 2) * (canvas.width / this.z) + canvas.height / 2;
            const radius = this.radius * (canvas.width / this.z);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }

    // Create a set of stars
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }

    // Animate the stars and keep the background moving
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Apply a slight fade for each frame
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.update();
            star.draw();
        });

        requestAnimationFrame(animate); // Recursively call animate to create the animation loop
    }

    animate();

    // Sonic Boom Effect on click
    window.addEventListener('click', (event) => {
        const sonicBoomX = event.clientX;
        const sonicBoomY = event.clientY;
        let boomRadius = 0;

        function sonicBoom() {
            ctx.beginPath();
            ctx.arc(sonicBoomX, sonicBoomY, boomRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - boomRadius / 100})`;
            ctx.lineWidth = 2;
            ctx.stroke();
            boomRadius += 2;
            if (boomRadius < 100) {
                requestAnimationFrame(sonicBoom); // Continue expanding the sonic boom
            }
        }

        sonicBoom();
    });

    // Adjust the canvas size dynamically on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};