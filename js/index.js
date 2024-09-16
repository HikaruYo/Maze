// Routing



// Function untuk mengganti halaman
document.getElementById('img1').addEventListener("click",changePej)

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