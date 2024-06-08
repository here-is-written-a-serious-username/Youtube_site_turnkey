export { resetMobileMenuAndAriaState };

let startY = 0; // для закриття скролом верх

const btnMobilMenu = document.querySelector('.js-toggle-mobil-menu');
const MobilMenu = document.querySelector('#mobil-menu');


btnMobilMenu.addEventListener('click', toggleMenu);
btnMobilMenu.addEventListener('keydown', toggleMenuKeyDown);

window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) {
        addTouchListeners();
        return;
    }
    resetMobileMenuAndAriaState()
    removeTouchListeners();
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


// функції додають і видаляють слухачів скролу вверх по екрану для закриття мобільного меню
function addTouchListeners() {
    window.addEventListener('touchstart', touchStartHandler);
    window.addEventListener('touchmove', touchMoveHandler);
}

function removeTouchListeners() {
    if (touchStartHandler && touchMoveHandler) {
        window.removeEventListener('touchstart', touchStartHandler);
        window.removeEventListener('touchmove', touchMoveHandler);
    }
}

// Відстежуємо початкову точку торкання
function touchStartHandler(event) {
    startY = event.touches[0].clientY;
};

// Відстежуємо рух пальця
function touchMoveHandler(event) {
    let moveY = event.touches[0].clientY;
    if (startY - moveY > 120) { // пікселів - поріг для визначення скролу вверх
        setTimeout(resetMobileMenuAndAriaState, 100);
    }
};