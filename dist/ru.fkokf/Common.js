// Сценарий для замены русской локализации интерфейса вики на предпочтительную
$(function() {
    // Замена «Заглавная» на «Главная»
    function replaceMainPageTitle() {
        var $title = $('.page-header__title#firstHeading');
        if ($title.length && $title.text().trim() === 'Заглавная') {
            $title.text('Главная');
        }
    }
    // Вызываем при загрузке
    replaceMainPageTitle();

    // Замена текста в кнопке «Править профайл» и навигационных ссылках
    function replaceTexts() {
        var $button = $('.user-identity-header__button');
        var $navLinks = $('.user-profile-navigation__link a');

        // Замена «Править профайл» на «Обновить информацию»
        if ($button.length) {
            if ($button.text().trim() === 'Править профайл') {
                $button.text('Обновить информацию');
            }
        }

        // Замена «Стена обсуждения» на «Стена» и «Блог» на «Записи в блоге»
        if ($navLinks.length) {
            $navLinks.each(function() {
                var $this = $(this);
                var linkText = $this.text().trim();

                if (linkText === 'Стена обсуждения') {
                    $this.text('Стена');
                } else if (linkText === 'Блог') {
                    $this.text('Записи в блоге');
                }
            });
        }

        // Останавливаем интервал, когда элементы найдены
        if ($button.length && $navLinks.length) {
            clearInterval(intervalId);
        }
    }

    // Запускаем интервал, чтобы дождаться загрузки элементов
    var intervalId = setInterval(replaceTexts, 50);

    // Единовременная замена текста в #mw-clearyourcache (не через Observer)
    function replaceClearCacheText() {
        var $cacheBlock = $('#mw-clearyourcache');
        if ($cacheBlock.length) {
            // Параграф с «Замечание:» 
            $cacheBlock.find('p').each(function() {
                var $p = $(this);
                var text = $p.html();
                if (text && text.includes('Возможно, после публикации вам придётся очистить кэш')) {
                    // Заменяем нужную часть строки
                    var newText = text.replace(
                        'Возможно, после публикации вам придётся очистить кэш своего браузера, чтобы увидеть изменения.',
                        'возможно после публикации вам придётся очистить кэш своего браузера, чтобы увидеть изменения.'
                    );
                    $p.html(newText);
                }
            });

            // Список с инструкциями
            $cacheBlock.find('li').each(function() {
                var $li = $(this);
                var html = $li.html();

                if (!html) return;

                // Firefox/Safari
                if (html.includes('<strong>Firefox / Safari:</strong>')) {
                    var newHtml = html
                        .replace('Firefox / Safari:', 'Firefox/Safari:')
                        .replace('Удерживая клавишу <em>Shift</em>, нажмите на панели инструментов <em>Обновить</em> либо нажмите <em>Ctrl+F5</em> или <em>Ctrl+R</em> (<em>⌘+R</em> на Mac)',
                                 'удерживая клавишу <em>Shift</em>, нажмите на панели инструментов <em>Обновить</em>, либо нажмите <em>Ctrl + F5</em> или <em>Ctrl + R</em> (<em>⌘ + R</em> на Mac);');
                    $li.html(newHtml);
                }

                // Google Chrome
                if (html.includes('<strong>Google Chrome:</strong>')) {
                    var newHtml = html
                        .replace('Нажмите <em>Ctrl+Shift+R</em> (<em>⌘+Shift+R</em> на Mac)', 'нажмите <em>Ctrl + Shift + R</em> (<em>⌘ + Shift + R</em> на Mac);');
                    $li.html(newHtml);
                }

                // Internet Explorer/Edge
                if (html.includes('<strong>Internet Explorer / Edge:</strong>')) {
                    var newHtml = html
                        .replace('Удерживая <em>Ctrl</em>, нажмите <em>Обновить</em> либо нажмите <em>Ctrl+F5</em>',
                                 'удерживая <em>Ctrl</em>, нажмите <em>Обновить</em>, либо нажмите <em>Ctrl + F5</em>;')
                        .replace('Internet Explorer / Edge:', 'Internet Explorer/Edge:');
                    $li.html(newHtml);
                }

                // Opera
                if (html.includes('<strong>Opera:</strong>')) {
                    var newHtml = html
                        .replace('Нажмите <em>Ctrl+F5</em>', 'нажмите <em>Ctrl + F5</em>');
                    $li.html(newHtml);
                }
            });
        }
    }

    replaceClearCacheText();

    // Замена текста в блоке «.blog-listing.is-empty»
    function replaceBlogListingText() {
        var $blogListing = $('.blog-listing.is-empty');
        if ($blogListing.length) {
            var $paragraphs = $blogListing.find('p');
            $paragraphs.each(function() {
                var $p = $(this);
                var fullText = $p.text().trim();
                // Ищем строку, где упоминается, что можно писать блоги
                if (fullText.includes('Вы можете писать блоги на вики')) {
                    // Создаём новое содержимое
                    var newText = 'Вы можете писать записи, которые попадут в ';
                    var $link = $('<a>')
                        .attr('href', '/wiki/Blog:Recent_posts')
                        .text('блог вики');
                    var afterLinkText = '.';

                    // Очищаем параграф и добавляем новое содержимое
                    $p.empty()
                        .append(newText)
                        .append($link)
                        .append(afterLinkText);
                }
            });
            return true;
        }
        return false;
    }

    // MutationObserver для слежения за динамическими изменениями (как в блоге)
    var observer = new MutationObserver(function(mutations, obs) {
        var replacedBlog = replaceBlogListingText();
        if (replacedBlog) {
            obs.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Сценарий для исправления межъязыковых ссылок с Русскоязычной вики серии Сказочное королевство короля Фроггольда II на Испаноязычную вики игр GKProduction
$(function() {
    'use strict';

    // Настройки языков
    var LANG_MAP = {
        'en': {
            name: 'English',
            baseUrl: 'https://fkokf.fandom.com/wiki/'
        },
        'es': {
            name: 'Español',
            baseUrl: 'https://gkproductiongames.miraheze.org/wiki/'
        }
    };

    // Создание верхнего выпадающего меню языков
    function createHeaderLanguageDropdown() {
        var pageHeader = document.querySelector('.page-header');
        if (!pageHeader) return null;

        var langDiv = document.createElement('div');
        langDiv.className = 'page-header__languages';
        langDiv.innerHTML = '<div class="wds-dropdown">' +
            '<div class="wds-dropdown__toggle" tabindex="0" aria-haspopup="true" aria-expanded="false">' +
                'русский<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" aria-label="Toggle"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>' +
            '</div>' +
            '<div class="wds-dropdown__content">' +
                '<ul class="wds-list wds-is-linked"></ul>' +
            '</div>' +
        '</div>';

        var headerActions = pageHeader.querySelector('.page-header__actions') || pageHeader.querySelector('.page-header__title-wrapper');
        if (headerActions) {
            headerActions.parentNode.insertBefore(langDiv, headerActions);
        } else {
            pageHeader.appendChild(langDiv);
        }

        return langDiv.querySelector('.wds-list');
    }

    // Создание нижнего меню языков (в подвале)
    function createFooterLanguageDropdown() {
        var pageFooter = document.querySelector('.page-footer');
        if (!pageFooter) return null;

        var langPanel = document.createElement('div');
        langPanel.className = 'wds-collapsible-panel page-footer__languages';
        langPanel.setAttribute('aria-label', 'Toggle Languages');
        langPanel.innerHTML = '<header class="wds-collapsible-panel__header" aria-controls="collapsible-content-languages" aria-expanded="true" tabindex="0">' +
            'Languages <svg class="wds-icon wds-icon-small" aria-hidden="true" focusable="false"><use xlink:href="#wds-icons-menu-control-small"></use></svg>' +
        '</header>' +
        '<div class="wds-collapsible-panel__content" id="collapsible-content-languages"></div>';

        var licenseDesc = pageFooter.querySelector('.license-description');
        if (licenseDesc) {
            pageFooter.insertBefore(langPanel, licenseDesc);
        } else {
            pageFooter.appendChild(langPanel);
        }

        return langPanel.querySelector('#collapsible-content-languages');
    }

    // Главная функция обработки ссылок
    function processInterwikiLinks() {
        var contentArea = document.querySelector('.mw-parser-output');
        if (!contentArea) return;

        var redLinks = Array.from(contentArea.querySelectorAll('a.new'));
        if (redLinks.length === 0) return;

        var headerList = document.querySelector('.page-header__languages .wds-list');
        var footerList = document.querySelector('#collapsible-content-languages');

        redLinks.forEach(function(link) {
            var textMatches = link.textContent.trim().match(/^([a-z]{2,3}):\s*(.+)$/i);
            
            if (textMatches) {
                var langCode = textMatches[1].toLowerCase();
                var pageTitle = textMatches[2].trim();

                if (LANG_MAP[langCode]) {
                    var langData = LANG_MAP[langCode];
                    var targetUrl = langData.baseUrl + encodeURIComponent(pageTitle.replace(/ /g, '_'));
                    var trackingLabel = 'lang-' + langCode;

                    // Работа с верхним меню
                    if (!headerList) headerList = createHeaderLanguageDropdown();
                    if (headerList && !headerList.querySelector('a[data-tracking-label="' + trackingLabel + '"]')) {
                        var li = document.createElement('li');
                        var headerA = document.createElement('a');
                        headerA.href = targetUrl;
                        headerA.dataset.trackingLabel = trackingLabel;
                        headerA.textContent = langData.name;
                        
                        li.appendChild(headerA);
                        headerList.appendChild(li);
                    }

                    // Работа с нижним меню
                    if (!footerList) footerList = createFooterLanguageDropdown();
                    if (footerList && !footerList.querySelector('a[data-tracking-label="' + trackingLabel + '"]')) {
                        var footerA = document.createElement('a');
                        footerA.href = targetUrl;
                        footerA.dataset.trackingLabel = trackingLabel;
                        footerA.textContent = langData.name;
                        
                        footerList.appendChild(footerA);
                    }

                    // Удаление красной ссылки со страницы
                    var parentP = link.parentElement;
                    link.remove();

                    // Очистка пустого абзаца
                    if (parentP && parentP.tagName === 'P' && parentP.textContent.trim() === '') {
                        parentP.remove();
                    }
                }
            }
        });
    }

    // Отслеживание изменений на странице для перехвата Fandom SPA (динамическая загрузка без перезагрузки страницы)
    var iwObserver = new MutationObserver(function() {
        if (document.querySelector('.mw-parser-output a.new')) {
            processInterwikiLinks();
        }
    });

    iwObserver.observe(document.body, { childList: true, subtree: true });

    // Запуск сразу на случай, если контент уже отрендерен
    processInterwikiLinks();
});