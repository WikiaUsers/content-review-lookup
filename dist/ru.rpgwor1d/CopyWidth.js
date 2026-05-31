/**
 * Копирует ширину элемента #copy_width_from → #copy_width_to
 * внутри каждого контейнера с id="copy_width".
 * Проверка выполняется каждую секунду.
 * Ширина округляется вверх (Math.ceil).
 * Если элемент скрыт, клонируется весь контейнер для точного замера.
 */
(function () {
    'use strict';

    /**
     * Возвращает ceil ширины элемента.
     * Если offsetWidth == 0, клонирует родительский контейнер #copy_width,
     * делает его видимым, измеряет ширину его #copy_width_from и удаляет клон.
     */
    function getElementWidth(el) {
        if (el.offsetWidth > 0) {
            return Math.ceil(el.offsetWidth);
        }

        // Элемент скрыт — ищем контейнер #copy_width
        var container = el.closest('[id="copy_width"]');
        if (!container) {
            // На всякий случай клонируем только сам элемент
            var clone = el.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.visibility = 'hidden';
            clone.style.width = '';
            document.body.appendChild(clone);
            var width = Math.ceil(clone.offsetWidth);
            document.body.removeChild(clone);
            return width;
        }

        // Клонируем весь контейнер
        var cloneContainer = container.cloneNode(true);
        // Делаем клон невидимым, но доступным для измерения
        cloneContainer.style.position = 'absolute';
        cloneContainer.style.visibility = 'hidden';
        cloneContainer.style.display = 'block'; // переопределяем, если оригинал скрыт
        cloneContainer.style.pointerEvents = 'none';
        cloneContainer.style.top = '-9999px';
        cloneContainer.style.left = '-9999px';
        document.body.appendChild(cloneContainer);

        // Ищем внутри клона нужный источник
        var cloneFrom = cloneContainer.querySelector('#copy_width_from');
        var width = cloneFrom ? Math.ceil(cloneFrom.offsetWidth) : 0;

        document.body.removeChild(cloneContainer);
        return width;
    }

    function applyCopyWidth() {
        var containers = document.querySelectorAll('[id="copy_width"]');

        containers.forEach(function (container) {
            var fromEl = container.querySelector('#copy_width_from');
            var toEl = container.querySelector('#copy_width_to');

            if (fromEl && toEl) {
                var width = getElementWidth(fromEl) + 1;
                toEl.style.width = width + 'px';
                toEl.style.opacity = 0.8;
            }
        });
    }

    function startLoop() {
        applyCopyWidth();
        setInterval(applyCopyWidth, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startLoop);
    } else {
        startLoop();
    }
})();