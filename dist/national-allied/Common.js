/* - - - - - <01. BACK TO TOP> - - - - - */
(function () {
    function initBackToTop() {
        if (document.getElementById('na-back-to-top')) {
            return;
        }

        var button = document.createElement('button');
        var arrow = document.createElement('span');
        var label = document.createElement('span');

        button.id = 'na-back-to-top';
        button.className = 'na-back-to-top';
        button.type = 'button';
        button.setAttribute('aria-label', 'Back to top');
        button.setAttribute('title', 'Back to top');

        arrow.className = 'na-back-to-top__arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '↑';

        label.className = 'na-back-to-top__label';
        label.textContent = 'TOP';

        button.appendChild(arrow);
        button.appendChild(label);
        document.body.appendChild(button);

        function updateButton() {
            if (window.scrollY > 450) {
                button.classList.add('is-visible');
            } else {
                button.classList.remove('is-visible');
            }
        }

        button.addEventListener('click', function () {
            var reducedMotion = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: reducedMotion ? 'auto' : 'smooth'
            });
        });

        window.addEventListener('scroll', updateButton, { passive: true });
        updateButton();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackToTop);
    } else {
        initBackToTop();
    }
}());

/* - - - - - <02. COLLAPSIBLE INITIALIZATION> - - - - - */
(function ($, mw) {
    function initNACollapsibles() {
        mw.loader.using('jquery.makeCollapsible').then(function () {
            $('.mw-collapsible').not('.mw-made-collapsible').makeCollapsible();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNACollapsibles);
    } else {
        initNACollapsibles();
    }
}(jQuery, mediaWiki));