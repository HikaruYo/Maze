// Routing



// Function untuk mengganti halaman
document.getElementById('playButton').addEventListener("click",changePej)

function changePej(){
    window.location.assign("stage1.html")
}


// Untuk membuat animasi pada tombol play
function changeImage(x, image) {
    if (x == 1) {
        image.src = '/assets/1-bit_UI_byBatuhanK_2-1.png';
    }
    if (x==2) {
        image.src = '/assets/1-bit_UI_byBatuhanK_2.png';
    }
}


// 
function toggleMenu() {
    const menu = document.getElementById('menu');

    if (menu.classList.contains('show')) {
        // Tutup menu
        menu.classList.remove('show');
        
        // Tunggu animasi selesai sebelum mengubah display
        setTimeout(() => {
            menu.style.display = 'none';
        }, 300);
    } else {
        // Tampilkan menu
        menu.style.display = 'block';
        setTimeout(() => {
            menu.classList.add('show');
        }, 10);
    }
}


// Event listener untuk mendeteksi klik di luar menu
document.addEventListener('click', function(event) {
    const menu = document.getElementById('menu');
    const menuIcon = document.querySelector('.OverlayImg');

    // Jika menu sedang terbuka dan klik terjadi di luar menu atau tombol menu
    if (menu.classList.contains('show') && !menu.contains(event.target) && !menuIcon.contains(event.target)) {
        // Tutup menu
        menu.classList.remove('show');
        
        // Tunggu animasi sebelum menyembunyikan dengan display: none
        setTimeout(() => {
            menu.style.display = 'none';
        }, 300);
    }
});