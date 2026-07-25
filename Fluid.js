// script.js
const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

let astronauts = [];
const numAstronauts = 1; // Berapa banyak astronot yang terdampar?
const astronautImage = new Image();
astronautImage.src = ''; // GANTI INI DENGAN NAMA FILE GAMBAR KAMU

// Set ukuran canvas
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Definisikan Class Astronot
class Astronaut {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Ukuran astronot (pilih ukuran yang sesuai)
        this.width = 100;
        this.height = 100;

        // Kecepatan gerak acak (sangat pelan agar terlihat terdampar)
        // Kecepatan X dan Y berbeda agar gerakannya serong acak
        this.vx = (Math.random() - 0.5) * 0.5; // -0.25 sampai 0.25
        this.vy = (Math.random() - 0.5) * 0.5;

        // Logika Rotasi (Berputar pelan)
        this.angle = Math.random() * Math.PI * 2; // Sudut awal acak
        this.rotationSpeed = (Math.random() - 0.5) * 0.01; // Kecepatan putar pelan

        this.isLoaded = false;
    }

    draw() {
        // Hanya gambar jika gambar astronot sudah selesai dimuat
        if (astronautImage.complete) {
            ctx.save(); // Simpan state canvas saat ini
            
            // Pindahkan titik pusat canvas ke posisi astronot
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            // Putar canvas
            ctx.rotate(this.angle);
            
            // Gambar astronot di titik pusat yang baru
            ctx.drawImage(
                astronautImage, 
                -this.width / 2, // Sesuaikan posisi agar gambar di tengah
                -this.height / 2, 
                this.width, 
                this.height
            );
            
            ctx.restore(); // Kembalikan state canvas ke awal
        }
    }

    update() {
        // Gerakan translasi (pindah posisi)
        this.x += this.vx;
        this.y += this.vy;

        // Gerakan rotasi (berputar)
        this.angle += this.rotationSpeed;

        // Pantulan saat menabrak pinggir layar
        if (this.x < 0 || this.x > canvas.width - this.width) {
            this.vx *= -1;
            this.rotationSpeed *= -1; // Sedikit ubah arah putar saat nabrak
        }
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.vy *= -1;
            this.rotationSpeed *= -1;
        }
    }
}

// Inisialisasi
function init() {
    astronauts = [];
    for (let i = 0; i < numAstronauts; i++) {
        astronauts.push(new Astronaut());
    }
}

// Loop Animasi
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan layar
    
    astronauts.forEach(astro => {
        astro.update();
        astro.draw();
    });
    
    requestAnimationFrame(animate);
}

// Mulai setelah gambar dimuat
astronautImage.onload = () => {
    init();
    animate();
};

// Cadangan: jika gambar gagal dimuat, tetap jalankan init
// agar loop tidak error, tapi gambar tidak muncul.
init();
animate();