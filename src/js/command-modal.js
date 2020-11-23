const galleryContainer = document.querySelector(".team-link");
const openTeamModalBtn = document.querySelector('.js-open-modal');
const backdropTeamModal = document.querySelector('.js-backdrop');
const body = document.querySelector('body');
const closeBtn = document.querySelector('.js-team-close');



galleryContainer.addEventListener('click', onOpenModal)



// galleryContainer.addEventListener('click', );
// openTeamModalBtn.addEventListener('click', onOpenModal);

function onOpenModal(evt) {
    evt.preventDefault();

    window.addEventListener('keydown', onEscKeyPress);

    closeBtn.addEventListener('click', onCloseModal);
    body.classList.add('show-modal');
}

function onCloseModal() {
    document.body.classList.remove('show-modal');
    closeBtn.removeEventListener('click', onCloseModal);
}



function onEscKeyPress(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }
}

