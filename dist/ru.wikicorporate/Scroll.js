(() => {
    'use strict';

    const initScrollButton = () => {
        // Проверяем наличие панели, куда будем добавлять кнопку
        const wikiaBar = document.getElementById('WikiaBar');
        if (!wikiaBar) return;

        // Создаем кнопку на Vanilla JS
        const scrollButton = document.createElement('a');
        scrollButton.className = 'scroll-button scroll-button--bottom';
        wikiaBar.appendChild(scrollButton);

        // Функция проверки позиции (прошли ли мы половину страницы)
        const isPastHalfway = () => {
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const breakY = (docHeight - winHeight) * 0.5;
            
            return window.scrollY > breakY;
        };

        // Обработчик клика (Плавная прокрутка)
        scrollButton.addEventListener('click', (e) => {
            e.preventDefault();
            const reachHalf = isPastHalfway();
            
            window.scrollTo({
                top: reachHalf ? 0 : document.documentElement.scrollHeight,
                behavior: 'smooth' // Нативная плавная анимация браузера
            });
        });

        // Оптимизированный обработчик скролла с requestAnimationFrame
        let ticking = false;
        
        const updateButtonState = () => {
            const reachHalf = isPastHalfway();
            
            // Элегантное переключение классов без длинных if/else
            scrollButton.classList.toggle('scroll-button--top', reachHalf);
            scrollButton.classList.toggle('scroll-button--bottom', !reachHalf);
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateButtonState);
                ticking = true;
            }
        });

        // Первичная проверка на случай, если пользователь обновил страницу где-то внизу
        updateButtonState();
    };

    // Запускаем скрипт только когда DOM полностью готов
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollButton);
    } else {
        initScrollButton();
    }
})();