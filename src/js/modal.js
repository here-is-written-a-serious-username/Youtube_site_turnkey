
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".modal__close-btn");
const modalBtns = document.querySelectorAll(".js-modal");

(() => {
    if (modalBtns.length > 0) {
        modalBtns.forEach(el => el.addEventListener("click", onModalBtnClick));
    }
    closeBtn.addEventListener("click", onCloseBtnClick);
})();

function onModalBtnClick(e) {
    e.preventDefault();
    modal.showModal();
    document.body.classList.toggle("modal-open");
    document.addEventListener('click', handlerBackdropClick);
}

function handlerBackdropClick(event) {
    if (!event.target.classList.contains('modal__cont') && event.target.classList.contains('aaa')) {
        modal.close();
        document.removeEventListener('click', handlerBackdropClick);
        document.body.classList.toggle("modal-open");
    }
}

function onCloseBtnClick(e) {
    e.preventDefault();
    modal.close();
    document.body.classList.toggle("modal-open");
    document.removeEventListener('click', handlerBackdropClick);
}