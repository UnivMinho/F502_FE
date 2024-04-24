document.addEventListener("DOMContentLoaded", function () {
    let accordions = document.querySelectorAll('.card-faq');

    accordions.forEach(function (accordion) {
        let button = accordion.querySelector('[data-toggle="collapse"]');
        let arrow = accordion.querySelector('.bi');

        button.addEventListener('click', function () {
            if (button.getAttribute('aria-expanded') === 'true') {
                arrow.classList.remove('bi-chevron-down');
                arrow.classList.add('bi-chevron-right');
            } else {
                arrow.classList.remove('bi-chevron-right');
                arrow.classList.add('bi-chevron-down');
            }
        });
    });
});