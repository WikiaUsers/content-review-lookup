/**
 * Адаптер CSS-Doodle для Fandom
 * Загружает библиотеку и конвертирует специальные div-контейнеры в компоненты <css-doodle>
 */
(() => {
    // Защита от двойного выполнения
    if (window.isCssDoodleAdapterLoaded) return;
    window.isCssDoodleAdapterLoaded = true;

    const CONFIG = {
        // Подгружаем стабильную минифицированную версию через cdnjs
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/css-doodle/0.38.4/css-doodle.min.js',
        wrapperSelector: '.css-doodle-wrapper:not(.doodle-loaded)',
        rulesSelector: '.css-doodle-rules'
    };

    const loadDoodleLibrary = () => {
        return new Promise((resolve, reject) => {
            // Если компонент уже зарегистрирован, сразу продолжаем
            if (window.customElements && window.customElements.get('css-doodle')) {
                return resolve();
            }
            const script = document.createElement('script');
            script.src = CONFIG.cdnUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Не удалось загрузить css-doodle.min.js'));
            document.head.appendChild(script);
        });
    };

    const initDoodles = ($content) => {
        // Ищем контейнеры внутри переданного контента (полезно при AJAX)
        const parent = $content ? $content[0] : document;
        const wrappers = parent.querySelectorAll(CONFIG.wrapperSelector);
        
        if (wrappers.length === 0) return;

        loadDoodleLibrary()
            .then(() => {
                wrappers.forEach(wrapper => {
                    const rulesElement = wrapper.querySelector(CONFIG.rulesSelector);
                    if (!rulesElement) return;

                    // Извлекаем код дудла из скрытого тега
                    const rulesText = rulesElement.textContent || rulesElement.innerText;
                    
                    // Создаем веб-компонент
                    const doodle = document.createElement('css-doodle');
                    doodle.innerHTML = rulesText;

                    // Добавляем фишку css-doodle: перерисовка узора по клику
                    doodle.addEventListener('click', () => doodle.update());

                    // Очищаем контейнер и вставляем готовый компонент
                    wrapper.innerHTML = '';
                    wrapper.appendChild(doodle);
                    
                    // Помечаем контейнер, чтобы не обрабатывать его дважды
                    wrapper.classList.add('doodle-loaded');
                });
            })
            .catch(error => {
                console.error('[CSS-Doodle Adapter]', error);
            });
    };

    // Используем хук MediaWiki для инициализации
    mw.hook('wikipage.content').add(initDoodles);
})();