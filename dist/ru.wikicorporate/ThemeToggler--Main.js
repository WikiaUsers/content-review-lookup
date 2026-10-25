/* ThemeToggler - Мгновенное переключение светлой и тёмной темы без перезагрузки (ES2024) */
(() => {
    'use strict';

    const initThemeToggler = () => {
        if (mw.config.get('skin') !== 'fandomdesktop' || window.ThemeTogglerLoaded) return;
        window.ThemeTogglerLoaded = true;

        const searchContainer = document.querySelector('#community-navigation .search-container');
        if (!searchContainer || document.querySelector('.theme-toggler')) return;

        const cloudsMarkup = Array.from({ length: 7 }, (_, i) => `<div class="theme-toggler__cloud theme-toggler__cloud--${i + 1}"></div>`).join('');
        const starsMarkup = Array.from({ length: 11 }, (_, i) => `<div class="theme-toggler__star theme-toggler__star--${i + 1}"></div>`).join('');

        const toggleHTML = `
        <div class="theme-toggler">
          <div class="theme-toggler__switch theme-toggler__switch--light">
            <a href="#light" class="theme-toggler__control theme-toggler__control--light" aria-label="Светлая тема"></a>
          </div>
          <div class="theme-toggler__switch theme-toggler__switch--dark">
            <a href="#dark" class="theme-toggler__control theme-toggler__control--dark" aria-label="Тёмная тема"></a>
          </div>
          <div class="theme-toggler__visuals">
            <div class="theme-toggler__satellite">
              <div class="theme-toggler__sun">
                <div class="theme-toggler__moon">
                  <div class="theme-toggler__crater theme-toggler__crater--1"></div>
                  <div class="theme-toggler__crater theme-toggler__crater--2"></div>
                  <div class="theme-toggler__crater theme-toggler__crater--3"></div>
                </div>
              </div>
              <div class="theme-toggler__rays">
                <div class="theme-toggler__ray theme-toggler__ray--1"></div>
                <div class="theme-toggler__ray theme-toggler__ray--2"></div>
                <div class="theme-toggler__ray theme-toggler__ray--3"></div>
              </div>
            </div>
            <div class="theme-toggler__clouds">
              <div class="theme-toggler__cloud-group theme-toggler__cloud-group--1">${cloudsMarkup}</div>
              <div class="theme-toggler__cloud-group theme-toggler__cloud-group--2">${cloudsMarkup}</div>
            </div>
            <div class="theme-toggler__stars">${starsMarkup}</div>
          </div>
        </div>`;

        searchContainer.insertAdjacentHTML('beforebegin', toggleHTML);

        let isToggling = false;

        const toggleWithoutReload = async () => {
            if (isToggling) return;
            isToggling = true;

            try {
                const body = document.body;
                const currentTheme = body.classList.contains('theme-fandomdesktop-light') ? 'light' : 'dark';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';

                const wikiUrl = `${mw.util.wikiScript('wikia')}?controller=ThemeApi&method=themeVariables&variant=${newTheme}&cb=${Date.now()}`;
                const loadUrl = `${mw.util.wikiScript('load')}?modules=ext.fandom.GlobalComponents.GlobalComponentsTheme.${newTheme}.css\%7Cext.fandom.GlobalComponents.GlobalNavigationTheme.${newTheme}.css&only=styles`;

                const [wikiRes, loadRes] = await Promise.all([fetch(wikiUrl), fetch(loadUrl)]);
                if (!wikiRes.ok || !loadRes.ok) {
                    throw new Error('Ошибка сети при загрузке стилей темы');
                }

                const [wikiThemeText, brandThemeText] = await Promise.all([wikiRes.text(), loadRes.text()]);
                const css = wikiThemeText + brandThemeText;

                let styleNode = document.getElementById('ThemeSwitch');
                if (!styleNode) {
                    styleNode = document.createElement('style');
                    styleNode.id = 'ThemeSwitch';
                    document.body.append(styleNode);
                }
                styleNode.textContent = css;

                const fullBackground = document.querySelector('.fandom-community-header__background.fullScreen');
                const bgMatch = wikiThemeText.match(/--theme-body-background-image\s*?:\s*?url\((.*?)\)/);

                if (fullBackground && bgMatch?.[1]) {
                    const bgImage = new Image();
                    bgImage.onload = () => {
                        if (bgImage.naturalWidth > 0) {
                            fullBackground.style.setProperty('--image-ratio', String(bgImage.naturalHeight / bgImage.naturalWidth));
                        }
                    };
                    bgImage.src = bgMatch[1].replaceAll(/['"]/g, '');
                }

                body.setAttribute('data-theme', newTheme);
                body.classList.remove('theme-fandomdesktop-light', 'theme-fandomdesktop-dark');
                body.classList.add(`theme-fandomdesktop-${newTheme}`);

                const logoElement = document.querySelector('.global-top-navigation__fandom-logo use');
                if (logoElement) {
                    logoElement.setAttribute('xlink:href', newTheme === 'light' ? '#wds-brand-fandom-logo' : '#wds-brand-fandom-logo-light');
                }

                mw.config.set('isDarkTheme', newTheme === 'dark');
                document.dispatchEvent(new CustomEvent('themeToggler.toggled', { detail: newTheme }));
            } catch (error) {
                console.error('Критическая ошибка при переключении темы:', error);
            } finally {
                isToggling = false;
            }
        };

        window.toggleWithoutReload = toggleWithoutReload;

        document.querySelectorAll('.theme-toggler__control').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                toggleWithoutReload();
            });
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggler);
    } else {
        initThemeToggler();
    }
})();