// Toggle del menú hamburguesa
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
        
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});