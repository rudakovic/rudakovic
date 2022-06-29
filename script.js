function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let posX;
let position;
let screenWidth = screen.width;
document.addEventListener('DOMContentLoaded', (event) = async() => {
    document.getElementById('title').style.setProperty('--position', "50%");
    await sleep(1000);
    document.getElementById('layer').style.transform = 'translateY(-100%)';
})
document.addEventListener('mousemove', (e) => {
    posX = e.clientX;
    position = (posX / screenWidth) * 100;
    document.getElementById('title').style.setProperty('--position', position + "%");
});