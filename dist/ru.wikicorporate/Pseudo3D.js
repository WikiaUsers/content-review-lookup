/**
 * Скрипт для создания эффекта Pseudo-3D (вращение при перетаскивании)
 */
(() => {
    // WeakMap — это современное и безопасное хранилище. 
    // В нём мы будем держать текущий кадр для каждого конкретного блока (viewport), 
    // не "пачкая" сам HTML-элемент лишними свойствами.
    const viewportStates = new WeakMap();

    // 1. Инициализация всех 3D-блоков на странице
    document.querySelectorAll('.pseudo-3d-viewport').forEach(viewport => {
        const sprite = viewport.querySelector('img');
        if (!sprite) return; // Если картинки нет, просто пропускаем этот блок
        
        // Читаем настройки из атрибутов data-* (например, data-frame-amount="24")
        const frameAmount = parseInt(viewport.dataset.frameAmount, 10) || 24;
        const startFrame = parseInt(viewport.dataset.frameStart, 10) || 0;
        
        // Сохраняем стартовые данные в наше хранилище
        viewportStates.set(viewport, {
            currentFrame: startFrame,
            frameAmount: frameAmount
        });
        
        // Сдвигаем картинку (спрайт) на нужный начальный кадр
        sprite.style.transform = `translateX(-${(startFrame * 100) / frameAmount}%)`;
    });

    // 2. Основная функция обработки мыши или свайпов
    const drag = (e, isTouch = false) => {
        // Находим блок, внутри которого произошло нажатие
        const viewport = e.target.closest('.pseudo-3d-viewport');
        const sprite = viewport?.querySelector('img'); // "?." защитит от ошибки, если img нет
        
        if (!sprite) return;
        
        // Отключаем стандартное поведение (например, выделение картинки синим цветом)
        e.preventDefault();
        
        // Получаем сохраненное состояние для этого блока
        const state = viewportStates.get(viewport) || { currentFrame: 0, frameAmount: 24 };
        
        // Если это сенсорный экран, берем координаты пальца, иначе — мыши
        const startX = isTouch ? e.touches[0].pageX : e.pageX;
        const startFrame = state.currentFrame;
        const frameAmount = state.frameAmount;
        
        // Настройки для фона (Skybox)
        const piItem = window.PseudoSkybox ? viewport.closest('.pi-item') : null;
        const currentBgX = parseFloat(piItem?.style.backgroundPositionX) || 50;
        
        // 3. Логика, которая срабатывает при каждом движении
        const move = ev => {
            const x = isTouch ? ev.touches[0].pageX : ev.pageX;
            const delta = x - startX;
            const speed = window.PseudoSpeed || 10;
            
            // Высчитываем, какой кадр нужно показать сейчас
            let frame = (startFrame - Math.floor(delta / speed)) % frameAmount;
            if (frame < 0) frame += frameAmount; // Зацикливаем вращение, если ушли в минус
            
            // Запоминаем новый кадр и сдвигаем картинку
            state.currentFrame = frame;
            viewportStates.set(viewport, state);
            sprite.style.transform = `translateX(-${(frame * 100) / frameAmount}%)`;
            
            // Если включен фон (Skybox), немного сдвигаем и его для эффекта параллакса
            if (piItem) {
                const skyboxSpeed = window.PseudoSkyboxSpeed || 0.01;
                const newBgX = Math.min(100, Math.max(0, currentBgX - delta * skyboxSpeed));
                piItem.style.backgroundPositionX = `${newBgX}%`;
            }
        };
        
        // 4. Логика, которая срабатывает при отпускании мыши/пальца
        const up = () => {
            // Удаляем слушатели движения, чтобы не тратить ресурсы браузера
            document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', move);
            document.removeEventListener(isTouch ? 'touchend' : 'mouseup', up);
        };
        
        // Привязываем события движения и отпускания ко всему документу
        document.addEventListener(isTouch ? 'touchmove' : 'mousemove', move);
        document.addEventListener(isTouch ? 'touchend' : 'mouseup', up);
    };

    // 5. Регистрируем старт взаимодействия (нажатие кнопки мыши или касание экрана)
    document.addEventListener('mousedown', drag);
    document.addEventListener('touchstart', e => drag(e, true));
})();