// Toggle del menú hamburguesa
const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    menuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('max-h-96');

        if (isOpen) {
            mobileMenu.classList.remove('max-h-96', 'opacity-100', 'scale-y-100');
            mobileMenu.classList.add('max-h-0', 'opacity-0', 'scale-y-95');
        } else {
            mobileMenu.classList.remove('max-h-0', 'opacity-0', 'scale-y-95');
            mobileMenu.classList.add('max-h-96', 'opacity-100', 'scale-y-100');
        }
    });