// Сценарий для исправления межъязыковых ссылок с Англоязычной вики серии Сказочное королевство короля Фроггольда II на Испаноязычную вики игр GKProduction
$(function() {
    'use strict';

    // Настройки языков
    var LANG_MAP = {
        'ru': {
            name: 'Русский',
            baseUrl: 'https://fkokf.fandom.com/ru/wiki/'
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
                'English<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" aria-label="Toggle"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>' +
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