const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 200; // Kamu bisa tambah atau kurangi jumlah bintang
const mouse = {
    x: null,
    y: null,
    radius: 170 // Jarak jangkauan tarikan magnet
};

// Deteksi posisi mouse
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Reset posisi mouse saat keluar layar
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Menyesuaikan ukuran canvas saat jendela browser diubah
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Star {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Ukuran bintang
        
        // Kecepatan gerak acak (sangat pelan)
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        
        // Warna bintang (kuning pucat / putih)
        this.color = `hsl(${Math.random() * 50 + 40}, 100%, 90%)`;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        // Gerakan melayang acak
        this.x += this.vx;
        this.y += this.vy;

        // Pantulan saat menabrak pinggir layar
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // LOGIKA MAGNET
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                // Kalkulasi kekuatan tarikan
                let force = (mouse.radius - distance) / mouse.radius;
                let pullX = (dx / distance) * force * 2;
                let pullY = (dy / distance) * force * 2;
                
                this.x += pullX;
                this.y += pullY;
            }
        }
    }
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

init();
animate();

