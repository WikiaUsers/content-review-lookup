/*
 * @description: Add template quick and easily on page
 * @author: Shodai Tsuchi
 */
// <nowiki>
(function() {
    if (window.QuickTemplateLoaded) {
        return;
    }
    window.QuickTemplateLoaded = true;
    
    var config = mw.config.get([
        'wgContentLanguage',
        'wgUserLanguage',
        'wgPageName'
    ]),
    i18ndata = {
    // --------------------------
    // INTERNATIONALIZATION START
    // --------------------------
        en: {
            title: 'Quick Template',
            placeholder: 'Template name',
            save: 'Save',
            cancel: 'Cancel',
            help: 'Enter the name of the template you want to add into the page',
            summary: 'Adding template',
            success: 'Template successfully added!',
            fail: 'An error occurred while adding the template'
        },
        be: {
            title: 'Хуткі аблон',
            placeholder: 'Назва шаблону',
            save: 'Захаваць',
            cancel: 'Скасаванне',
            help: 'Увядзіце назву шаблону, які вы хочаце дадаць на старонку',
            summary: 'Даданне шаблону',
            success: 'Шаблон паспяхова дададзены!',
            fail: 'Адбылася абмыла пры даданні шаблону'
        },
        pl: {
            title: 'Szybki szablon',
            placeholder: 'Nazwa szablonu',
            save: 'Zapisz',
            cancel: 'Anuluj',
            help: 'Wpisz nazwę szablonu, który chcesz dodać do tej strony.',
            summary: 'Dodanie szablonu',
            success: 'Szablon został dodany!',
            fail: 'Wystąpił błąd podczas dodawania szablonu.'
        },
        ru: {
            title: 'Быстрый шаблон',
            placeholder: 'Название шаблона',
            save: 'Сохранить',
            cancel: 'Отмена',
            help: 'Введите название шаблона, который вы хотите добавить на страницу',
            summary: 'Добавление шаблона',
            success: 'Шаблон успешно добавлен!',
            fail: 'Произошла ошибка при добавлении шаблона'
        },
        sr: {
            title: 'Брз шаблон',
            placeholder: 'Име шаблона',
            save: 'Сачувај',
            cancel: 'Откажи',
            help: 'Унесите име шаблона који желите да додате на страницу',
            summary: 'Додавање шаблона',
            success: 'Шаблон успешно додат!',
            fail: 'Десила се грешка приликом додавања шаблона'
        },
        'sr-el': {
            title: 'Brz šablon',
            placeholder: 'Ime šablona',
            save: 'Sačuvaj',
            cancel: 'Otkaži',
            help: 'Unesite ime šablona koji želite da dodate na stranicu',
            summary: 'Dodavanje šablona',
            success: 'Šablon uspešno dodat!',
            fail: 'Desila se greška prilikom dodavanja šablona'
        },
        tr: {
            title: 'Hızlı Şablon',
            placeholder: 'Şablon adı',
            save: 'Kaydet',
            cancel: 'İptal',
            help: 'Sayfaya eklemek istediğiniz şablonun adını girin',
            summary: 'Şablon ekleme',
            success: 'Şablon başarılıyla eklendi!',
            fail: 'Şablon eklenirken bir hata oluştu'
        },
        uk: {
            title: 'Швидкий шаблон',
            placeholder: 'Назва шаблону',
            save: 'Зберегти',
            cancel: 'Скасування',
            help: 'Введіть назву шаблону, який ви хочете додати сторінку',
            summary: 'Додавання шаблону',
            success: 'Шаблон успішно додано!',
            fail: 'Сталася помилка під час додавання шаблону'
        }
        // --------------------------
        // INTERNATIONALIZATION END
        // --------------------------
    },
    summary = (i18ndata[config.wgContentLanguage] || i18data[config.wgContentLanguage.split('-')[0]] || i18ndata.en).summary,
    i18n = $.extend(i18ndata.en, i18ndata[config.wgUserLanguage.split('-')[0]], i18ndata[config.wgUserLanguage]);
    
    function modal() {
        $.showCustomModal(i18n.title,
            $('<div>', {
                id: 'QuickTemplateForm'
            })
            .append(
                $('<p>', {
                    id: 'QuickTemplateHelp'
                })
                .text(i18n.help)
            )
            .append(
                $('<input>', {
                    id: 'QuickTemplateInput',
                    placeholder: i18n.placeholder
                })
            ).prop('outerHTML'), {
                id: 'QuickTemplateModal',
                width: 450,
                buttons: [{
                    message: i18n.save,
                    defaultButton: true,
                    handler: template
                }, {		 
                    message: i18n.cancel,
                    handler: function () {
                        $('#QuickTemplateModal').closeModal();   
                    }
                }]
        });
    }
    
    function template() {
        new mw.Api().post({
            action: 'edit',
            title: config.wgPageName,
            summary: summary,
            prependtext: '{{' + $('#QuickTemplateInput').val() + '}}',
            token: mw.user.tokens.get('editToken')
        }).done(function(d) {
            if(d.error) {
                new BannerNotification(i18n.fail + ': ' + d.error.code, 'error').show();
            } else {
                new BannerNotification(i18n.success, 'success').show();
                location.reload();
            }
        });
    }
    
    // Add in Toolbar
    function init() {
        mw.util.addCSS(
            '#QuickTemplateInput {' +
                'font-size: 16px;'  +
                'width: 100%;'      +
            '}'
        );
        $('<li>', { id: 'QuickTemplateButton' })
            .append(
                $('<a>')
                    .text(i18n.title)
                    .click(modal)
            )
            .appendTo('#my-tools-menu');
    }
    
    mw.loader.using([
         'mediawiki.api',
         'mediawiki.api'
    ]).then(init);
})();
// </nowiki>