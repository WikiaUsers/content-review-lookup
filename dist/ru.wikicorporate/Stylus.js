/**
 * Адаптер Stylus для Fandom (С поддержкой кросс-вики импорта)
 * Загружает глобальный Модуль:GlobalStylus и локальный Модуль:Stylus, объединяет их и компилирует.
 */
(() => {
    if (window.isStylusAdapterLoaded) return;
    window.isStylusAdapterLoaded = true;

    const CONFIG = {
        localPage: 'Модуль:Stylus',
        centralApiUrl: 'https://wikicorporate.fandom.com/ru/api.php',
        centralPage: 'Модуль:GlobalStylus',
        cdnUrl: 'https://cdnjs.cloudflare.com/ajax/libs/stylus/0.54.8/stylus.min.js',
        styleId: 'fandom-compiled-stylus'
    };

    const loadStylusLibrary = () => {
        return new Promise((resolve, reject) => {
            if (window.stylus) return resolve();
            const script = document.createElement('script');
            script.src = CONFIG.cdnUrl;
            script.onload = resolve;
            script.onerror = () => reject(new Error('Не удалось загрузить stylus.min.js'));
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

    const compileStylus = (rawCode) => {
        return new Promise((resolve, reject) => {
            stylus.render(rawCode, (err, css) => {
                if (err) reject(err);
                else resolve(css);
            });
        });
    };

    const initCompiler = () => {
        loadStylusLibrary()
            .then(() => {
                return Promise.all([
                    fetchSource(CONFIG.centralPage, CONFIG.centralApiUrl),
                    fetchSource(CONFIG.localPage)
                ]);
            })
            .then(([globalCode, localCode]) => {
                const combinedCode = `${globalCode}\n\n${localCode}`;
                if (!combinedCode.trim()) return Promise.reject(new Error('Код Stylus пуст'));
                return compileStylus(combinedCode);
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
                if (error.message !== 'Код Stylus пуст') console.error('[Stylus Adapter]', error);
            });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCompiler);
    } else {
        initCompiler();
    }
})();