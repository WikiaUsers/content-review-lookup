(function configurePopups() {
    document.querySelectorAll('.sw-popup').forEach(function (popup) {
        popup.addEventListener('mouseenter', function (event) {
            var content = event.target.querySelector('.sw-popup__content').innerHTML;
            var element = document.createElement('div');
            element.className = 'sw-popup__element';
            element.innerHTML = content;
            event.target.appendChild(element);
        });

        popup.addEventListener('mousemove', function (event) {
            var element = document.querySelector('.sw-popup__element');
            element.style.left = event.clientX + 20 + 'px';
            element.style.top = event.clientY + 20 + 'px';
        });

        popup.addEventListener('mouseleave', function (event) {
            event.target.querySelector('.sw-popup__element').remove();
        });
    });
})();