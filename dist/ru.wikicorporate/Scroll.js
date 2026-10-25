/**
 * Кнопка быстрой прокрутки вверх/вниз в панели WikiaBar
 */
(() => {
    'use strict';
    if (window.isScrollButtonLoaded) return;
    window.isScrollButtonLoaded = true;

    const initScrollButton = () => {
        const wikiaBar = document.getElementById('WikiaBar');
        if (!wikiaBar || wikiaBar.querySelector('.scroll-button')) return;

        const scrollButton = document.createElement('a');
        scrollButton.href = '#';
        scrollButton.className = 'scroll-button scroll-button--bottom';
        scrollButton.setAttribute('aria-label', 'Прокрутить страницу');
        wikiaBar.appendChild(scrollButton);

        const isPastHalfway = () => {
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const breakY = (docHeight - winHeight) * 0.5;
            return window.scrollY > breakY;
        };

        scrollButton.addEventListener('click', (e) => {
            e.preventDefault();
            const reachHalf = isPastHalfway();
            window.scrollTo({
                top: reachHalf ? 0 : document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        });

        let ticking = false;
        const updateButtonState = () => {
            const reachHalf = isPastHalfway();
            scrollButton.classList.toggle('scroll-button--top', reachHalf);
            scrollButton.classList.toggle('scroll-button--bottom', !reachHalf);
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateButtonState);
                ticking = true;
            }
        }, { passive: true });

        updateButtonState();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollButton);
    } else {
        initScrollButton();
    }
})();