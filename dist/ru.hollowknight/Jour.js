// Журнал-слайдер: точный сдвиг без padding-проблем
(function () {
    function initSlider($content) {
        const containers = $content.find('.hk-journals');
        if (containers.length === 0) return;

        containers.each(function () {
            const $container = $(this);
            const $body = $container.find('.journals-body');
            const $buttonArea = $container.find('.jour-button');

            const $slider = $body.find('.jour-slider').first();
            if ($slider.length === 0) return;

            const $slides = $slider.children('div');
            const totalSlides = $slides.length;
            if (totalSlides === 0) return;

            const $dots = $buttonArea.children('div').toArray().map(el => $(el));

            const $left = $container.find('.jour-left').first();
            const $right = $container.find('.jour-right').first();

            let currentIndex = 0;

            // Убедимся, что каждый слайд занимает 100% ширины .journals-body
            $slides.css('width', '100%');
            $slider.css('width', (totalSlides * 100) + '%');

            function showSlide(index) {
                if (index < 0) index = totalSlides - 1;
                if (index >= totalSlides) index = 0;

                // Двигаем на N * 100% влево
                $slider.css('transform', `translateX(-${index * 100}%)`);

                $dots.forEach(($dot, i) => {
                    if ($dot && i < totalSlides) {
                        $dot.toggleClass('j-bn-active', i === index);
                    }
                });

                currentIndex = index;
            }

            // Инициализация
            showSlide(0);

            // Стрелки
// Стрелки
if ($left.length) {
    $left.off('click.journalSlider').on('click.journalSlider', () => {
        // Блокируем обе стрелки
        $left.addClass('jour-anim');
        $right.addClass('jour-anim');
        showSlide(currentIndex - 1);
        // Разблокируем через 1 секунду
        setTimeout(() => {
            $left.removeClass('jour-anim');
            $right.removeClass('jour-anim');
        }, 400);
    });
}

if ($right.length) {
    $right.off('click.journalSlider').on('click.journalSlider', () => {
        // Блокируем обе стрелки
        $left.addClass('jour-anim');
        $right.addClass('jour-anim');
        showSlide(currentIndex + 1);
        // Разблокируем через 1 секунду
        setTimeout(() => {
            $left.removeClass('jour-anim');
            $right.removeClass('jour-anim');
        }, 400);
    });
}

            // Точки
            $dots.forEach(($dot, i) => {
                if ($dot && i < totalSlides) {
                    $dot.off('click.journalSlider').on('click.journalSlider', () => {
                        showSlide(i);
                    });
                }
            });
        });
    }

    mw.hook('wikipage.content').add(initSlider);

    if (window.jQuery) {
        initSlider($(document));
    }
})();