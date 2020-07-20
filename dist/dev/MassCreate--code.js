/*
 * MassCreate
 * Creates multiple pages from template or string
 * @author: Count of Howard (https://dev.wikia.com/wiki/User:Count_of_Howard)
 * 01-01-17 - Initial revision
 * 06-01-17 - Optimized program; reduced API calls
 * 05-02-17 - Monobook support, slight aesthetic changes
 * <nowiki>
 */

(function() {
    if ($('#mc-item').length) {
        return;
    }
    //Cache mw variables
    var mwVariables = mw.config.get([
        'wgUserLanguage',
        'wgUserGroups',
        'wgLegalTitleChars'
    ]);

    //Language stuff; remember to leave $1 in your translations
    var i18n = {
        'en': { //English
            itemTitle: 'MassCreate',
            modalTitle1: 'Enter desired content template or string',
            modalTitle2: 'Enter pages',
            modalCancel: 'Cancel',
            modalCreate: 'Create',
            modalClear: 'Clear',
            modalTemplateplaceholder: '{{Template name}}',
            modalPagesplaceholder: 'Example 1\nExample 2\nExample 3',
            modalHeader: 'Notice: To prevent abuse, use of MassCreate is limited to local staff, Fandom Staff, Fandom Helpers, and VSTF. Input values and length are restricted for security reasons, and existing pages will not be overwritten.',
            modalLog: 'MassCreate log',
            modalSuccess: 'Success: $1 successfully created!',
            modalFailure: 'Error: $1 not created. Please try again.',
            modalError: 'Error: Use of some characters is prohibited for security reasons.',
            modalUserRights: 'Error: Incorrect user rights group.',
            modalExists: 'Error: $1 already exists and will not be overwritten.',
            mcSummary: 'Creating from template',
            mcScript: 'script'
        },
        'be': { //Belarusian
            itemTitle: 'MassCreate',
            modalTitle1: 'Увядзіце назву патрэбнага шаблону з кантэнтам ці радок',
            modalTitle2: 'Увядзіце назвы старонак',
            modalCancel: 'Скасаванне',
            modalCreate: 'Стварыць',
            modalClear: 'Ачысціць',
            modalTemplateplaceholder: '{{Назва шаблону}}',
            modalPagesplaceholder: 'Старонка 1\nСтаронка 2\nСтаронка 3',
            modalHeader: 'Нататка: каб пазбегнуць спаму і вандалізму выкарыстанне скрыпту MassCreate абмяжоўваецца адміністрацыяй вікі, супрацоўнікамі Фэндома, памочнікамі і VSTF. Памер і значэнні ўводных выразаў абмежаваны па меркаваннях бяспекі, таму змесціва існых старонак не будзе перазапісана.',
            modalLog: 'Часопіс для MassCreate',
            modalSuccess: '$1 паспяхова створана!',
            modalFailure: 'Абмыла: $1 не было створана. Калі ласка, паспрабуйце яшчэ раз.',
            modalError: 'Абмыла: выкарыстанне некаторых знакаў забаронена па меркаваннях бяспекі.',
            modalUserRights: 'Абмыла: не хапае праў.',
            modalExists: 'Абмыла: $1 ужо існуе і не можа быць перазапісана.',
            mcSummary: 'Стварэнне з шаблону',
            mcScript: 'скрыпт'
        },
        'ru': { //Russian
            itemTitle: 'MassCreate',
            modalTitle1: 'Введите название нужного шаблона с контентом или строку',
            modalTitle2: 'Введите названия страниц',
            modalCancel: 'Отмена',
            modalCreate: 'Создать',
            modalClear: 'Очистить',
            modalTemplateplaceholder: '{{Название шаблона}}',
            modalPagesplaceholder: 'Страница 1\nСтраница 2\nСтраница 3',
            modalHeader: 'Примечание: во избежание спама и вандализма использование скрипта MassCreate ограничивается администрацией вики, сотрудниками Фэндома, помощниками и VSTF. Размер и значения вводимых выражений ограничены по соображениям безопасности, поэтому содержимое существующих страниц не будет перезаписано.',
            modalLog: 'Журнал для MassCreate',
            modalSuccess: '$1 успешно создано!',
            modalFailure: 'Ошибка: $1 не было создано. Пожалуйста, попробуйте ещё раз.',
            modalError: 'Ошибка: использование некоторых символов запрещено по соображениям безопасности.',
            modalUserRights: 'Ошибка: недостаточно прав.',
            modalExists: 'Ошибка: $1 уже существует и не может быть перезаписано.',
            mcSummary: 'Создание из шаблона',
            mcScript: 'скрипт'
        },
        'uk': { //Ukrainian
            itemTitle: 'MassCreate',
            modalTitle1: 'Введіть назву потрібного шаблону з вмістом або рядок',
            modalTitle2: 'Введіть назви сторінок',
            modalCancel: 'Скасування',
            modalCreate: 'Створити',
            modalClear: 'Очистити',
            modalTemplateplaceholder: '{{Назва шаблона}}',
            modalPagesplaceholder: 'Сторінка 1\nСторінка 2\nСторінка 3',
            modalHeader: 'Примітка: щоб уникнути спаму та вандалізму використання скрипта MassCreate обмежується адміністрацією вікі, співробітниками Фендому, помічниками та VSTF. Розмір та значення введених виразів обмежені з міркувань безпеки, тому вміст існуючих сторінок не буде перезаписано.',
            modalLog: 'Журнал для MassCreate',
            modalSuccess: '$1 успішно створено!',
            modalFailure: 'Помилка: $1 не було створено. Будь ласка, спробуйте ще раз.',
            modalError: 'Помилка: використання деяких символів заборонено з міркувань безпеки',
            modalUserRights: 'Помилка: недостатньо прав.',
            modalExists: 'Помилка: $1 вже існує і не може бути перезаписано.',
            mcSummary: 'Створення з шаблону',
            mcScript: 'скрипт'
        }
    },
    lang = i18n[mwVariables.wgUserLanguage] || i18n[mwVariables.wgUserLanguage.split('-')[0]] || i18n.en;

    //Security stuff - This script can cause a lot of damage if abused, so users and input values are restricted
    var userGroups = /(bureaucrat|sysop|content-moderator|rollback|bot|bot-global|content-volunteer|vanguard|global-discussions-moderator|staff|helper|vstf)/.test(mwVariables.wgUserGroups.join(' ')),
        pagesChars = new RegExp('^[' + mwVariables.wgLegalTitleChars + ']*$'),
        templateChars = /^[a-zA-Z0-9-{}:' ]*$/,
        maxchars = 500;

    var modalHTML =
    '<form id="mc-modal-form" class="WikiaForm ">' +
        '<div id="modalHeader">' + lang.modalHeader + '</div>' +
        '<hr>' +
        '<br />' +
        '<fieldset>' +
            '<p>' + lang.modalTitle1 +
                '<br />' +
                '<input type="textbox" id="mc-template-value" maxlength="' + maxchars + '" placeholder="' + lang.modalTemplateplaceholder + '"/>' +
                '<br />' +
            '</p>' +
            '<br />' +
            '<p>' + lang.modalTitle2 +
                '<br />' +
                '<textarea id="mc-pages-value" maxlength="' + maxchars + '" placeholder="' + lang.modalPagesplaceholder + '"/>' +
                '<br />' +
            '</p>' +
        '</fieldset>' +
        '<br />' +
        '<hr>' +
    '</form>' +
    '<p>' + lang.modalLog + '</p>' +
    '<div id="mc-log"></div>';

    //Appends to toolbar and opens modal on click
    function init() {
        //Toolbar items
        var mcItem = mw.html.element('li', {
            class: 'overflow',
            id: 'mc-item'
        }),
        mcItemLink = mw.html.element('a', {
            href: '#'
        }, lang.itemTitle);
                $(mcItem).appendTo('.toolbar .tools');
        $(mcItemLink).appendTo('#mc-item');
        modal();
    }

    function modal() {
        mw.util.addCSS(
            '#mc-template-value {' +
                'height: 30px;' +
                'width: 100%;' +
                'padding: 0;' +
            '}' +
            '#mc-pages-value {' +
                'height: 100px;' +
                'width: 100%;' +
                'padding: 0;' +
                'overflow: scroll;' +
            '}' +
            '#mc-log {' +
                'height: 100px;' +
                'width: 98%;' +
                'border: 1px solid black;' +
                'font-family: monospace;' +
                'background: #fff;' +
                'color: #aeaeae;' +
                'overflow: scroll;' +
                'padding:5px;' +
            '}'
        );
        $('#mc-item').click(function() {
            if ($('mc-modal-window').length) {
                $('#mc-modal-window')[0].remove();
            }
            $.showCustomModal(lang.itemTitle, modalHTML, {
                id: 'mc-modal-window',
                width: 500,
                buttons: [{
                    message: lang.modalCancel,
                    handler: function() {
                        $('#mc-modal-window').closeModal();
                    }
                }, {
                    message: lang.modalClear,
                    handler: function() {
                        $("#mc-modal-form")[0].reset();
                    }
                }, {
                    message: lang.modalCreate,
                    handler: handler
                }]
            });
        });
    }

    //Handles "Create" button click events
    function handler() {
        if (!userGroups) {
            $("#mc-modal-form")[0].reset();
            $('#mc-log').append(lang.modalUserRights + '<br/>');
            return;
        } else {
            //Input values
            var inputTemplate = $('#mc-template-value')[0].value;
            var inputPages = $('#mc-pages-value')[0].value.split(/[\n]+/);

            //Acquiring proper values
            var checkedTemplate = checkTemplate(inputTemplate);
            var checkedPages = checkPages(inputPages);

            //Ensuring pages do not exist, and then creating them
            getData(checkedTemplate, checkedPages, processData);
        }
    }

    //Runs template input against regex
    function checkTemplate(template) {
        if(!templateChars.test(template)) {
            $("#mc-modal-form")[0].reset();
            $('#mc-log').append(lang.modalError + '<br/>');
            return;
        } else {
            return template;
        }
    }

    //Runs pages input against regex, pushing and joining legit values
    function checkPages(pages) {
        var pagesArray = [];
        for (var i = 0; i < pages.length; i++) { //Replaced $.each because for loop is faster
            if(!pagesChars.test(pages[i])) {
                $("#mc-modal-form")[0].reset();
                $('#mc-log').append(lang.modalError + '<br/>');
            } else {
                mw.util.wikiUrlencode(pages[i]);
                pagesArray.push(pages[i]);
            }
        }
        return pagesArray.join('|');
    }

    //Makes a single call to the API to verify pages' existences
    function getData(template, pages, callback) {
        new mw.Api().get({
            action: 'query',
            prop: 'revisions',
            titles: pages
        }).done(function(d) {
            if(!d.error) {
                var data = d.query.pages;
                callback(template, data);
            }
        });
    }

    //Callback function that deals with data
    //Originally this pushed pages into another array that was passed to createPage and looped through again
    function processData(template, data) {
        var pages = [];
        $.each(data, function(index, value) {
            if (value.hasOwnProperty("missing") || value.hasOwnProperty("invalid")) {
                createPage(template, value.title);
            } else {
                $("#mc-modal-form")[0].reset();
                $('#mc-log').append(lang.modalExists.replace('$1', value.title) + '<br/>');
            }
        });
    }

    //Creates the pages that the API says don't exist
    function createPage(template, page) {
        $.ajax({
            type: 'POST',
            url: mw.util.wikiScript('api'),
            dataType: 'json',
            data: {
                action: 'edit',
                minor: true,
                title: page,
                summary: lang.mcSummary + ' ([[w:c:dev:MassCreate|' + lang.mcScript + ']])',
                text: template,
                format: 'json',
                token: mw.user.tokens.get('editToken')
            }
        }).success(function (data) {
            $("#mc-modal-form")[0].reset();
            $('#mc-log').append(lang.modalSuccess.replace('$1', page) + '<br/>');
        }).fail(function (data) {
            $("#mc-modal-form")[0].reset();
            $('#mc-log').append(lang.modalFailure.replace('$1', page) + '<br/>');
        });
    }
    //Do the thing
    init();
})();