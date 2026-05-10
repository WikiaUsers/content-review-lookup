/**
 * Адаптер SCSS для Fandom (С поддержкой кросс-вики импорта)
 * Загружает глобальный Модуль:GlobalSCSS и локальный Модуль:SCSS, объединяет их и компилирует.
 */
(() => {
    if (window.isScssAdapterLoaded) return;
    window.isScssAdapterLoaded = true;

    const CONFIG = {
        localPage: 'Модуль:SCSS',
        centralApiUrl: 'https://wikicorporate.fandom.com/ru/api.php',
        centralPage: 'Модуль:GlobalSCSS',
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/sass.js/0.11.1/sass.sync.min.js',
        styleId: 'fandom-compiled-scss'
    };

    const loadScssLibrary = () => {
        return new Promise((resolve, reject) => {
            if (window.Sass) return resolve();
            const script = document.createElement('script');
            script.src = CONFIG.cdnUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Не удалось загрузить sass.sync.min.js'));
            document.head.appendChild(script);
        });
    };

    const fetchSource = (pageTitle, apiUrl = mw.util.wikiScript('api')) => {
        return $.get({
            url: apiUrl,
            crossDomain: true,
            data: {
                action: 'query', prop: 'revisions', titles: pageTitle,
                rvprop: 'content', rvslots: 'main', format: 'json',
                formatversion: 2, origin: '*'
            }
        }).then(data => {
            const pages = data.query && data.query.pages;
            if (!pages || pages.length === 0 || pages[0].missing) return '';
            const match = pages[0].revisions[0].slots.main.content.match(/\[=\[\s*([\s\S]*?)\s*\]=\]/);
            return match ? match[1] : '';
        }).catch(() => '');
    };

    const compileScss = (rawCode) => {
        return new Promise((resolve, reject) => {
            const sass = new Sass();
            sass.compile(rawCode, (result) => {
                if (result.status === 0) {
                    resolve(result.text);
                } else {
                    reject(new Error(`Строка ${result.line}, Колонка ${result.column}: ${result.message}`));
                }
            });
        });
    };

    const initCompiler = () => {
        loadScssLibrary()
            .then(() => {
                return Promise.all([
                    fetchSource(CONFIG.centralPage, CONFIG.centralApiUrl),
                    fetchSource(CONFIG.localPage)
                ]);
            })
            .then(([globalCode, localCode]) => {
                const combinedCode = `${globalCode}\n\n${localCode}`;
                if (!combinedCode.trim()) return Promise.reject(new Error('Код SCSS пуст'));
                return compileScss(combinedCode);
            })
            .then(compiledCss => {
                let styleNode = document.getElementById(CONFIG.styleId);
                if (!styleNode) {
                    styleNode = document.createElement('style');
                    styleNode.id = CONFIG.styleId;
                    document.head.appendChild(styleNode);
                }
                styleNode.textContent = compiledCss;
            })
            .catch(error => {
                if (error.message !== 'Код SCSS пуст') console.error('[SCSS Adapter]', error);
            });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCompiler);
    } else {
        initCompiler();
    }
})();