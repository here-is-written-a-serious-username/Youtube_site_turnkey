
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
}

function onCloseBtnClick(e) {
    e.preventDefault();
    modal.close();
}