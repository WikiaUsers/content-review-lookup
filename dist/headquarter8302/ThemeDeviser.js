// index.ts
(function (window, mw) {
    if (mw.config.get('wgNamespaceNumber') !== 0) return;
    window.dev = window.dev || {};
    if (window.dev.themeDeviser && window.dev.themeDeviser.hasRan) {
        return;
    }
    console.log('[ThemeDeviser] bootstrapping');
    window.dev.themeDeviser = window.dev.themeDeviser || {
        hasRan: true,
        hash: function (str) {
            let hash = 0;
            for (let i = 0, len = str.length; i < len; i++) {
                let chr = str.charCodeAt(i);
                hash = (hash << 5) - hash + chr;
                hash |= 0;
            }
            return Math.abs(hash).toString();
        },
        apply: function (input) {
            const newStyleInject = function (contents) {
                const stylesheet = document.createElement('style');
                stylesheet.setAttribute('data-hash', cssHash);
                stylesheet.classList.add('themedeviser-style');
                stylesheet.innerText = `:root { ${contents} }`;
                return stylesheet;
            };
            let concatCSS = '';
            const cssHash = this.hash(input.toString());
            const existingTDInject = document.querySelector('style[data-hash]');
            for (let i = 0; i < input.length; i++) {
                const varPair = input[i];
                if (
                    !varPair ||
                    !varPair[0].startsWith('--') ||
                    !(
                        varPair[1].includes('url(') &&
                        (varPair[1].includes('static.wikia.nocookie.net') ||
                            varPair[1].includes('data:image'))
                    )
                )
                    continue;
                concatCSS = concatCSS.concat(`${varPair[0]}: ${varPair[1]};`);
            }
            if (
                existingTDInject &&
                existingTDInject.dataset['hash'] === cssHash
            ) {
                return;
            } else if (existingTDInject) {
                existingTDInject.innerText = `:root { ${concatCSS} }`;
            } else {
                window.document.head.appendChild(newStyleInject(concatCSS));
            }
        },
    };
})(window, mediaWiki);