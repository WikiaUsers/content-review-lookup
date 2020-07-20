//ExtendedContributeButtonOptions - Count of Howard
//09-01-17 - Initial revision

/*
 * This page is retained for historical documentation purposes. Do not submit
 * for review. FANDOM Staff, if this has been submitted, please reject.
 */

;(function($, mw) {
    var mwVariables = mw.config.get([
        'wgArticlePath',
        'wgUserGroups',
        'wgUserLanguage'
    ]);

    var isAdmin = /(sysop)/.test(mwVariables.wgUserGroups.join(' '));
 
    var i18n = {
        'be': {
            blogTitle: 'Дадаць блог',
            mwTitle: 'Дадаць старонку MediaWiki',
            mwModalPlaceholder: 'Імя старонкі (без прэфікса «MediaWiki»)',
            mwModalGo: 'Далей',
            mwModalCancel: 'Скасаванне'
        },
        'en': {
            blogTitle: 'Add a Blog',
            mwTitle: 'Add a MediaWiki page',
            mwModalPlaceholder: 'Page name (minus the MediaWiki part)',
            mwModalGo: 'Go',
            mwModalCancel: 'Cancel'
        },
        'es': {
            blogTitle: 'Añadir un blog',
            mwTitle: 'Añadir una página MediaWiki',
            mwModalPlaceholder: 'Título de la página (sin el prefijo MediaWiki)',
            mwModalGo: 'Ir',
            mwModalCancel: 'Cancelar'
        },
        'pl': {
            blogTitle: 'Dodaj blog',
            mwTitle: 'Dodaj stronę MediaWiki',
            mwModalPlaceholder: 'Nazwa strony (bez prefiksu MediaWiki)',
            mwModalGo: 'Idź',
            mwModalCancel: 'Anuluj'
        },
        'pt-br': {
            blogTitle: 'Adicionar um blog',
            mwTitle: 'Adicionar uma página MediaWiki',
            mwModalPlaceholder: 'Nome da página (sem a parte MediaWiki)',
            mwModalGo: 'Ir',
            mwModalCancel: 'Cancelar'
        },
        'ru': {
            blogTitle: 'Добавить блог',
            mwTitle: 'Добавить страницу MediaWiki',
            mwModalPlaceholder: 'Имя страницы (без префикса «MediaWiki»)',
            mwModalGo: 'Далее',
            mwModalCancel: 'Отмена'
        },
        'uk': {
            blogTitle: 'Додати блог',
            mwTitle: 'Додати сторінку MediaWiki',
            mwModalPlaceholder: 'Ім\'я сторінки (без префікса «MediaWiki»)',
            mwModalGo: 'Далі',
            mwModalCancel: 'Скасування'
        }
    },
    lang = mwVariables.wgUserLanguage,
    textContent = i18n.hasOwnProperty(lang) ? i18n[lang] : i18n.en;
 
    var modalHTML = '\
    <form id="mw-modal-form" class="WikiaForm "> \
        <fieldset> \
            <p>' + textContent.mwTitle + '\
                <br/> \
                <input type="textbox" id="mw-input-value" maxlength="150" placeholder="' + textContent.mwModalPlaceholder + '"/> \
            </p> \
        </fieldset> \
    </form>';
 
    mw.util.addCSS(
        '#mw-input-value {' +
            'height: 30px;' +
            'width: 100%;' +
        '}'
    );
 
    function blog() {
        var blogLi = mw.html.element('li', {
            id: 'blogLi'
        });
 
        var blogA = mw.html.element('a', {
            href: mwVariables.wgArticlePath.replace('$1', 'Special:CreateBlogPage')
        }, textContent.blogTitle);
 
        $(blogLi).appendTo('.WikiHeader .buttons .contribute ul');
        $(blogA).appendTo('#blogLi');
    }
 
    function mwPage() {
        //Will not work for those not in sysop groups
        if (!isAdmin) {
            return;
        }
 
        var mwLi = mw.html.element('li', {
            id: 'mwLi'
        });
 
        var mwA = mw.html.element('a', {
            'data-id': 'mw',
            href: '#'
        }, textContent.mwTitle);
 
        $(mwLi).appendTo('.WikiHeader .buttons .contribute ul');
        $(mwA).appendTo('#mwLi');
 
        $('#mwLi').click(function() {
            $.showCustomModal(textContent.mwTitle, modalHTML, {
                id: 'mw-modal-window',
                width: 500,
                buttons: [{
                    message: textContent.mwModalCancel,
                    handler: function() {
                        $('#mw-modal-window').closeModal();
                    }
                }, {
                    message: textContent.mwModalGo,
                    handler: function() {
                        var inputData = document.getElementById('mw-input-value').value;
                        inputData = mw.util.wikiUrlencode(inputData);
                        window.location = mwVariables.wgArticlePath.replace("$1", "MediaWiki:" + inputData + "?action=edit");
                    }
                }]
            });
        });
    }
    blog();
    mwPage();
})(this.jQuery, this.mediaWiki);