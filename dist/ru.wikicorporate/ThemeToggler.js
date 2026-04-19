const initThemeToggler = () => {
    // Проверка окружения и предотвращение двойной загрузки
    if (mw.config.get('skin') !== 'fandomdesktop' || window.ThemeTogglerLoaded) return;
    window.ThemeTogglerLoaded = true;

    const fullBackground = document.querySelector('.fandom-community-header__background.fullScreen');

    // Находим контейнер поиска
    const searchContainer = document.querySelector('#community-navigation .search-container');
    
    // Внедряем HTML и вешаем события, если контейнер найден
    if (searchContainer) {
        const toggleHTML = `
        <div class="theme-toggler">
          <div class="theme-toggler__switch theme-toggler__switch--light">
            <a href="#light" class="theme-toggler__control theme-toggler__control--light"></a>
          </div>
          <div class="theme-toggler__switch theme-toggler__switch--dark">
            <a href="#dark" class="theme-toggler__control theme-toggler__control--dark"></a>
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
              <div class="theme-toggler__cloud-group theme-toggler__cloud-group--1">
                <div class="theme-toggler__cloud theme-toggler__cloud--1"></div>
                <div class="theme-toggler__cloud theme-toggler__cloud--2"></div>
                <div class="theme-toggler__cloud theme-toggler__cloud--3"></div>
                <div class="theme-toggler__cloud theme-toggler__cloud--4"></div>
                <div class="theme-toggler__cloud theme-toggler__cloud--5"></div>
                <div class="theme-toggler__cloud theme-toggler__cloud--6"></div>
                <div class="theme-toggler__cloud theme-toggler__cloud--7"></div>
              </div>
              <div class="theme-toggler__cloud-group theme-toggler__cloud-group--2">
                <div class="theme-toggler__cloud theme-toggler__cloud--1"></div>
                <div class="theme-toggler__cloud theme-toggler__cloud--2"></div>
                <div class="theme-toggler__cloud theme-toggler__cloud--3"></div>
                <div class="theme-toggler__cloud theme-toggler__cloud--4"></div>
                <div class="theme-toggler__cloud theme-toggler__cloud--5"></div>
                <div class="theme-toggler__cloud theme-toggler__cloud--6"></div>
                <div class="theme-toggler__cloud theme-toggler__cloud--7"></div>
              </div>
            </div>
            <div class="theme-toggler__stars">
              <div class="theme-toggler__star theme-toggler__star--1"></div>
              <div class="theme-toggler__star theme-toggler__star--2"></div>
              <div class="theme-toggler__star theme-toggler__star--3"></div>
              <div class="theme-toggler__star theme-toggler__star--4"></div>
              <div class="theme-toggler__star theme-toggler__star--5"></div>
              <div class="theme-toggler__star theme-toggler__star--6"></div>
              <div class="theme-toggler__star theme-toggler__star--7"></div>
              <div class="theme-toggler__star theme-toggler__star--8"></div>
              <div class="theme-toggler__star theme-toggler__star--9"></div>
              <div class="theme-toggler__star theme-toggler__star--10"></div>
              <div class="theme-toggler__star theme-toggler__star--11"></div>
            </div>
          </div>
        </div>`;
        
        searchContainer.insertAdjacentHTML('beforebegin', toggleHTML);

        const toggleLinks = document.querySelectorAll('.theme-toggler__control');
        toggleLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                toggleWithoutReload();
            });
        });
    }

    const toggleWithoutReload = () => {
        const body = document.body;
        const theme = body.classList.contains('theme-fandomdesktop-light') ? 'light' : 'dark';
        const newTheme = theme === 'light' ? 'dark' : 'light';

        const wikiUrl = `${mw.util.wikiScript('wikia')}?controller=ThemeApi&method=themeVariables&variant=${newTheme}&cb=${Date.now()}`;
        const loadUrl = `${mw.util.wikiScript('load')}?modules=ext.fandom.GlobalComponents.GlobalComponentsTheme.${newTheme}.css%7Cext.fandom.GlobalComponents.GlobalNavigationTheme.${newTheme}.css&only=styles`;

        Promise.all([
            fetch(wikiUrl).then(response => {
                if (!response.ok) throw new Error('Ошибка сети при загрузке wikiUrl');
                return response.text();
            }),
            fetch(loadUrl).then(response => {
                if (!response.ok) throw new Error('Ошибка сети при загрузке loadUrl');
                return response.text();
            })
        ])
        .then(([wikiThemeText, brandThemeText]) => {
            const css = wikiThemeText + brandThemeText;

            let styleNode = document.getElementById('ThemeSwitch');
            if (!styleNode) {
                styleNode = document.createElement('style');
                styleNode.id = 'ThemeSwitch';
                document.body.appendChild(styleNode);
            }
            styleNode.textContent = css;

            if (fullBackground) {
                const bgMatch = wikiThemeText.match(/--theme-body-background-image\s*?:\s*?url\((.*?)\)/);
                if (bgMatch) {
                    const bgImage = new Image();
                    bgImage.onload = () => {
                        fullBackground.style.setProperty('--image-ratio', (bgImage.naturalHeight / bgImage.naturalWidth).toString());
                    };
                    bgImage.src = bgMatch[1];
                }
            }

            body.setAttribute('data-theme', newTheme);
            body.classList.remove('theme-fandomdesktop-light', 'theme-fandomdesktop-dark');
            body.classList.add(`theme-fandomdesktop-${newTheme}`);

            const fandomLogo = newTheme === 'light' ? '#wds-brand-fandom-logo' : '#wds-brand-fandom-logo-light';
            const logoElement = document.querySelector('.global-top-navigation__fandom-logo use');
            if (logoElement) {
                logoElement.setAttribute('xlink:href', fandomLogo);
            }

            mw.config.set('isDarkTheme', !mw.config.get('isDarkTheme'));

            document.dispatchEvent(new CustomEvent('themeToggler.toggled', { 
                detail: newTheme 
            }));
        })
        .catch((error) => {
            console.error('Ошибка при переключении темы:', error);
        });
    };

    window.toggleWithoutReload = toggleWithoutReload;
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggler);
} else {
    initThemeToggler();
}