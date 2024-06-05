export { resetMobileMenuAndAriaState };

let startY = 0; // для закриття скролом верх

const btnMobilMenu = document.querySelector('.js-toggle-mobil-menu');
const MobilMenu = document.querySelector('#mobil-menu');


btnMobilMenu.addEventListener('click', toggleMenu);
btnMobilMenu.addEventListener('keydown', toggleMenuKeyDown);

window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    resetMobileMenuAndAriaState()
});

function toggleMenu() {

    const isMenuOpen = btnMobilMenu.getAttribute('aria-expanded') === 'true' || false;
    btnMobilMenu.setAttribute('aria-expanded', !isMenuOpen);

    document.body.classList.toggle("modal-open");
    MobilMenu.classList.toggle('is-open');
    btnMobilMenu.classList.toggle('btn-active');
}

function toggleMenuKeyDown(event) {
    if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
        toggleMenu();
    }
}

function resetMobileMenuAndAriaState() {
    MobilMenu.classList.remove('is-open');
    document.body.classList.remove("modal-open");
    btnMobilMenu.classList.remove('btn-active');
    btnMobilMenu.setAttribute('aria-expanded', false);
}




// Відстежуємо початкову точку торкання
window.addEventListener('touchstart', function (event) {
    startY = event.touches[0].clientY;
});

// Відстежуємо рух пальця
window.addEventListener('touchmove', function (event) {
    let moveY = event.touches[0].clientY;
    if (startY - moveY > 120) { // пікселів - поріг для визначення скролу вверх
        setTimeout(resetMobileMenuAndAriaState, 100);
    }
});