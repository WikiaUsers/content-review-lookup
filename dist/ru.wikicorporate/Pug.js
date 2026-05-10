/**
 * Адаптер Pug.js для Fandom
 * Загружает клиентский компилятор Pug и рендерит шаблоны из HTML-контейнеров
 */
(() => {
    // Защита от двойного выполнения
    if (window.isPugAdapterLoaded) return;
    window.isPugAdapterLoaded = true;

    const CONFIG = {
        // Используем версию 2.0.3, так как она официально поддерживает компиляцию в браузере
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pug/2.0.3/pug.min.js',
        wrapperSelector: '.pug-wrapper:not(.pug-loaded)',
        sourceSelector: '.pug-source'
    };

    const loadPugLibrary = () => {
        return new Promise((resolve, reject) => {
            // Если библиотека уже загружена, пропускаем
            if (window.pug) return resolve();
            
            const script = document.createElement('script');
            script.src = CONFIG.cdnUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Не удалось загрузить pug.min.js'));
            document.head.appendChild(script);
        });
    };

    const initPugTemplates = ($content) => {
        const parent = $content ? $content[0] : document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        
        if (wrappers.length === 0) return;

        loadPugLibrary()
            .then(() => {
                wrappers.forEach(wrapper => {
                    const sourceElement = wrapper.querySelector(CONFIG.sourceSelector);
                    if (!sourceElement) return;

                    // Извлекаем исходный код шаблона
                    // Используем textContent для сохранения отступов, которые критически важны для Pug
                    let pugCode = sourceElement.textContent || sourceElement.innerText;
                    
                    // Фикс: удаляем первую пустую строку, если шаблон начинается с переноса строки
                    pugCode = pugCode.replace(/^\s*\n/, '');

                    try {
                        // Собираем переменные (locals) из data-атрибутов обертки
                        // Пример: data-title="Хазбин" станет доступно в Pug как #{title}
                        const locals = Object.assign({}, wrapper.dataset);

                        // Компилируем и рендерим HTML
                        const compiledHtml = pug.render(pugCode, locals);

                        // Заменяем содержимое обертки готовым HTML
                        wrapper.innerHTML = compiledHtml;
                        wrapper.classList.add('pug-loaded');
                    } catch (error) {
                        console.error('[Pug Adapter] Ошибка компиляции:', error);
                        wrapper.innerHTML = `<div class="fandom-error" style="color: #d82b2b; padding: 10px; border: 1px solid currentColor;">Ошибка рендера Pug-шаблона. Проверьте отступы в консоли (F12).</div>`;
                    }
                });
            })
            .catch(error => {
                console.error('[Pug Adapter]', error);
            });
    };

    // Подключаем к хуку MediaWiki для совместимости с AJAX (переключение вкладок, предпросмотр)
    mw.hook('wikipage.content').add(initPugTemplates);
})();