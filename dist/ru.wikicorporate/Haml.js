/**
 * Адаптер Haml.js для Fandom
 * Загружает клиентский компилятор Haml и рендерит шаблоны из HTML-контейнеров
 */
(() => {
    // Защита от двойного выполнения
    if (window.isHamlAdapterLoaded) return;
    window.isHamlAdapterLoaded = true;

    const CONFIG = {
        // Используем проверенный порт clientside-haml-js
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/clientside-haml-js/5.4/haml.min.js',
        wrapperSelector: '.haml-wrapper:not(.haml-loaded)',
        sourceSelector: '.haml-source'
    };

    const loadHamlLibrary = () => {
        return new Promise((resolve, reject) => {
            // Проверяем, не загружена ли уже библиотека
            if (window.haml) return resolve();
            
            const script = document.createElement('script');
            script.src = CONFIG.cdnUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Не удалось загрузить haml.min.js'));
            document.head.appendChild(script);
        });
    };

    const initHamlTemplates = ($content) => {
        const parent = $content ? $content[0] : document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        
        if (wrappers.length === 0) return;

        loadHamlLibrary()
            .then(() => {
                wrappers.forEach(wrapper => {
                    const sourceElement = wrapper.querySelector(CONFIG.sourceSelector);
                    if (!sourceElement) return;

                    // Извлекаем исходный код шаблона с сохранением отступов
                    let hamlCode = sourceElement.textContent || sourceElement.innerText;
                    
                    // Удаляем первую пустую строку (фикс переноса строки внутри <pre>)
                    hamlCode = hamlCode.replace(/^\s*\n/, '');

                    try {
                        // Собираем переменные из data-атрибутов
                        const locals = Object.assign({}, wrapper.dataset);

                        // Компилируем и рендерим HTML.
                        // В clientside-haml-js используется метод compileHaml()
                        const compiledHtml = haml.compileHaml({ source: hamlCode })(locals);

                        // Вставляем результат и помечаем как загруженное
                        wrapper.innerHTML = compiledHtml;
                        wrapper.classList.add('haml-loaded');
                    } catch (error) {
                        console.error('[Haml Adapter] Ошибка компиляции:', error);
                        wrapper.innerHTML = `<div class="fandom-error" style="color: #d82b2b; padding: 10px; border: 1px dashed currentColor;">Ошибка рендера Haml-шаблона. Проверьте отступы в консоли (F12).</div>`;
                    }
                });
            })
            .catch(error => {
                console.error('[Haml Adapter]', error);
            });
    };

    // Подключаем к хуку MediaWiki (для предпросмотра и табберов)
    mw.hook('wikipage.content').add(initHamlTemplates);
})();