
// const modal = document.getElementById("modal");
// const closeBtn = document.querySelector(".modal__close-btn");
// const modalBtns = document.querySelectorAll(".js-modal");

// (() => {
//     if (modalBtns.length > 0) {
//         modalBtns.forEach(el => el.addEventListener("click", onModalBtnClick));
//     }
//     closeBtn.addEventListener("click", onCloseBtnClick);
// })();

// function onModalBtnClick(e) {
//     e.preventDefault();
//     modal.showModal();
//     document.body.classList.toggle("modal-open");
//     document.addEventListener('click', handlerBackdropClick);
// }

// function handlerBackdropClick(e) {
//     if (!e.target.classList.contains('modal__cont') && e.target.classList.contains('aaa')) {
//         modal.close();
//         document.body.classList.toggle("modal-open");
//         document.removeEventListener('click', handlerBackdropClick);
//     }
// }

// function onCloseBtnClick(e) {
//     e.preventDefault();
//     modal.close();
//     document.body.classList.toggle("modal-open");
//     document.removeEventListener('click', handlerBackdropClick);
// }

import MicroModal from 'micromodal';

MicroModal.init({
    // onShow: modal => console.info(`${modal.id} is shown`), // [1]
    // onClose: modal => console.info(`${modal.id} is hidden`), // [2]
    disableFocus: true,
    disableScroll: true, // [6]
    awaitOpenAnimation: true,  // [8]
    awaitCloseAnimation: true,  // [9]
});

