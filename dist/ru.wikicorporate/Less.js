/**
 * Адаптер Less.js для Fandom (С поддержкой кросс-вики импорта)
 * Загружает глобальный Module:GlobalLess и локальный Модуль:Less, объединяет их и компилирует.
 */
(() => {
    if (window.isLessAdapterLoaded) return;
    window.isLessAdapterLoaded = true;

    const CONFIG = {
        localPage: 'Модуль:Less',
        centralApiUrl: 'https://wikicorporate.fandom.com/ru/api.php',
        centralPage: 'Модуль:GlobalLess',
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/4.2.0/less.min.js',
        styleId: 'fandom-compiled-less'
    };

    window.less = { env: 'production', async: true, fileAsync: true, logLevel: 0 };

    const loadLessLibrary = () => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = CONFIG.cdnUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Не удалось загрузить less.js'));
            document.head.appendChild(script);
        });
    };

    const fetchSource = (pageTitle, apiUrl = mw.util.wikiScript('api')) => {
        return $.get({
            url: apiUrl,
            crossDomain: true,
            data: {
                action: 'query',
                prop: 'revisions',
                titles: pageTitle,
                rvprop: 'content',
                rvslots: 'main',
                format: 'json',
                formatversion: 2,
                origin: '*'
            }
        }).then(data => {
            const pages = data.query && data.query.pages;
            if (!pages || pages.length === 0 || pages[0].missing) return '';
            const rawLuaContent = pages[0].revisions[0].slots.main.content;
            const match = rawLuaContent.match(/\[=\[\s*([\s\S]*?)\s*\]=\]/);
            return match ? match[1] : '';
        }).catch(() => ''); // При ошибке возвращаем пустую строку
    };

    const initCompiler = () => {
        loadLessLibrary()
            .then(() => {
                return Promise.all([
                    fetchSource(CONFIG.centralPage, CONFIG.centralApiUrl),
                    fetchSource(CONFIG.localPage)
                ]);
            })
            .then(([globalCode, localCode]) => {
                const combinedCode = `${globalCode}\n\n${localCode}`;
                if (!combinedCode.trim()) return Promise.reject(new Error('Код Less пуст'));
                return less.render(combinedCode);
            })
            .then(compiled => {
                let styleNode = document.getElementById(CONFIG.styleId);
                if (!styleNode) {
                    styleNode = document.createElement('style');
                    styleNode.id = CONFIG.styleId;
                    document.head.appendChild(styleNode);
                }
                styleNode.textContent = compiled.css;
            })
            .catch(error => {
                if (error.message !== 'Код Less пуст') console.error('[Less Adapter]', error);
            });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCompiler);
    } else {
        initCompiler();
    }
})();