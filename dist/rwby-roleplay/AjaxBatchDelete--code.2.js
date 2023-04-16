// <nowiki>
// jshint multistr: true
/*
* Ajax Batch Delete
* @description Delete listed multiple pages
* Does not need to go to Special:BlankPage to use
* Includes the option to protect after deleting
* Includes the option to grab a whole category's contents
* @author Ozank Cx
*/

mw.loader.using(['mediawiki.api','mediawiki.util'], function() {
    var ug = mw.config.get("wgUserGroups").join(' ');
    if (
        $('#t-bd').length ||
        ug.indexOf('sysop') + ug.indexOf('vstf') + ug.indexOf('staff') + ug.indexOf('helper') + ug.indexOf('content-moderator') === -5
    ) {
        return;
    }
    var token = mw.user.tokens.get('editToken'),
        delay = window.batchDeleteDelay || 1000,
        api = new mw.Api(), i18ndata = {
            en: {
                toolsTitle: 'Batch Delete',
                modalTitle: 'Ajax Batch Delete',
                close: 'Close',
                inputReason: 'Reason for deleting',
                inputProtect: 'Protect for admin only?',
                inputPages: 'Put the name of each page you want to delete on a separate line',
                errorsForm: 'Any errors encountered will appear below',
                addCategoryContents: 'Add category contents',
                initiate: 'Initiate',
                stateReason: 'Please state a reason!',
                endTitle: 'Finished!',
                endMsg: 'Nothing left to do, or next line is blank.',
                enterCategory: 'Please enter the category name (no category prefix)',
                ajaxError: 'AJAX error',
                errorGetContents: 'Failed to get contents of $1: $2',
                errorDelete: 'Failed to delete $1: $2',
                errorProtect: 'Failed to protect $1: $2',
                deleteSuccess: 'Deletion of $1 successful!',
                protectSuccess: 'Protection of $1 successful!'
            },
            be: {
                toolsTitle: 'Выдаленне старонак',
                modalTitle: 'Выдаленне старонак з Ajax',
                close: 'Зачыніць',
                inputReason: 'Прычына выдалення',
                inputProtect: 'Абараніць толькі для адміністратараў?',
                inputPages: 'Устаўце назвы старонак, якія жадаеце выдаліць, кожную на новам радку',
                errorsForm: 'Памылкі, якія адбыліся, будуць адлюстроўвацца ніжэй',
                addCategoryContents: 'Дадаць катэгорыю артыкулаў',
                initiate: 'Выканаць',
                stateReason: 'Калі ласка, пакажыце прычыну!',
                endTitle: 'Завершана!',
                endMsg: 'Нічога не засталося альбо наступная лінія пустая.',
                enterCategory: 'Калі ласка, увядзіце назву катэгорыі (без прэфікса)',
                ajaxError: 'Памылка AJAX',
                errorGetContents: 'Не атрымалася загрузіць артыкулы з $1: $2',
                errorDelete: 'Не атрымалася выдаліць $1: $2',
                errorProtect: 'Не ўдалося абараніць $1: $2',
                deleteSuccess: 'Выдаленне $1 паспяхова!',
                protectSuccess: 'Абарона $1 паспяховая!'
            },
            es: {
                toolsTitle: 'Eliminación en masa',
                modalTitle: 'Ajax Batch Delete',
                close: 'Cerrar',
                inputReason: 'Motivo de eliminación',
                inputProtect: 'Proteger para administradores?',
                inputPages: 'Introduzca el nombre de cada página en una línea diferente',
                errorsForm: 'Cualquier error encontrado aparecerá aquí',
                addCategoryContents: 'Añadir contenido de categoría',
                initiate: 'Iniciar',
                stateReason: 'Por favor, definir un motivo!',
                endTitle: 'Terminado!',
                endMsg: 'Nada más que hacer, o la siguiente línea esta vacia.',
                enterCategory: 'Introducir nombre de categoría (sin sufijo de categoría)',
                ajaxError: 'Error AJAX',
                errorGetContents: 'Error al extraer los contenidos de $1: $2',
                errorDelete: 'Error al eliminar $1: $2',
                errorProtect: 'Error al proteger $1: $2',
                deleteSuccess: 'La eliminación de $1 fue exitosa!',
                protectSuccess: 'La protección de $1 fue exitosa!'
            },
            fr: {
                toolsTitle: 'Batch Delete',
                modalTitle: 'Ajax Batch Delete',
                close: 'Fermer',
                inputReason: 'Motif de Suppression',
                inputProtect: 'Protéger pour les administrateurs uniquement ?',
                inputPages: 'Insérer le nom de chacune des pages que vous souhaitez supprimer sur des lignes différentes',
                errorsForm: 'Les erreurs rencontrées apparaîtront dessous',
                addCategoryContents: 'Ajout du contenu d’une catégorie',
                initiate: 'Démarrer',
                stateReason: 'Ajoutez un motif s’il vous plaît!',
                endTitle: 'Terminé !',
                endMsg: 'Il n’y a plus d’action à effectuer, ou la ligne suivante est vide.',
                enterCategory: 'Entrez le nom d’une catégorie (sans le préfixe catégorie)',
                ajaxError: 'Erreur AJAX',
                errorGetContents: 'A échoué dans l’acquisition du contenu de $1: $2',
                errorDelete: 'A échoué dans la suppression de $1: $2',
                errorProtect: 'A échoué dans la protection de $1: $2',
                deleteSuccess: 'Suppression de $1 réussie !',
                protectSuccess: 'Protection de $1 réussie !'
            },
            ko: {
                toolsTitle: '일괄 삭제',
                modalTitle: 'Ajax 일괄 삭제',
                close: '닫기',
                inputReason: '삭제 이유',
                inputProtect: '관리자만 문서 생성이 가능하도록 보호',
                inputPages: '삭제할 문서를 한 줄에 한 개씩 넣어주세요',
                errorsForm: '도중에 오류가 발생할 경우 아래 칸에 나타납니다',
                addCategoryContents: '분류에 포함된 문서를 추가',
                initiate: '시작',
                stateReason: '삭제 이유를 기입해 주세요!',
                endTitle: '완료!',
                endMsg: '모든 작업이 끝났거나, 다음 줄이 비어 있습니다',
                enterCategory: '분류의 이름을 넣어주세요. (분류:는 붙이지 않습니다.)',
                ajaxError: 'AJAX 오류',
                errorGetContents: '$1: $2의 내용물을 찾을 수 없습니다',
                errorDelete: '$1: $2 문서를 삭제할 수 없습니다',
                errorProtect: '$1: $2 문서를 보호할 수 없습니다',
                deleteSuccess: '$1 문서를 성공적으로 삭제했습니다!',
                protectSuccess: '$1 문서를 성공적으로 보호했습니다!'
            },
            sr: {
                toolsTitle: 'Серијско брисање',
                modalTitle: 'Ajax Серијско Брисање',
                close: 'Затвори',
                inputReason: 'Разлог за брисање',
                inputProtect: 'Заштитити само за администраторе?',
                inputPages: 'Напишите име сваке странице коју желите да обришете на засебној линији',
                errorsForm: 'Све грешке биће исписане испод',
                addCategoryContents: 'Додај чланове категорије',
                initiate: 'Почни',
                stateReason: 'Молимо Вас да дате разлог!',
                endTitle: 'Завршено!',
                endMsg: 'Све је завршено или је следећа линија празна.',
                enterCategory: 'Напишите име категорије (без префикса)',
                ajaxError: 'AJAX грешка',
                errorGetContents: 'Грешка при проналажењу чланова категорије $1: $2',
                errorDelete: 'Грешка при брисању $1: $2',
                errorProtect: 'Грешка при штићењу $1: $2',
                deleteSuccess: 'Брисање $1 успешно!',
                protectSuccess: 'Заштита $1 успешна!'
            },
            'sr-el': {
                toolsTitle: 'Serijsko brisanje',
                modalTitle: 'Ajax Serijsko Brisanje',
                close: 'Zatvori',
                inputReason: 'Razlog za brisanje',
                inputProtect: 'Zaštititi samo za administratore?',
                inputPages: 'Napišite ime svake stranice koju želite da obrišete na zasebnoj liniji',
                errorsForm: 'Sve greške biće ispisane ispod',
                addCategoryContents: 'Dodaj članove kategorije',
                initiate: 'Počni',
                stateReason: 'Molimo Vas da date razlog!',
                endTitle: 'Završeno!',
                endMsg: 'Sve je završeno ili je sledeća linija prazna.',
                enterCategory: 'Napišite ime kategorije (bez prefiksa)',
                ajaxError: 'AJAX greška',
                errorGetContents: 'Greška pri pronalaženju članova kategorije $1: $2',
                errorDelete: 'Greška pri brisanju $1: $2',
                errorProtect: 'Greška pri štićenju $1: $2',
                deleteSuccess: 'Brisanje $1 uspešno!',
                protectSuccess: 'Zaštita $1 uspešna!'
            },
            ru: {
                toolsTitle: 'Удаление страниц',
                modalTitle: 'Удаление страниц с Ajax',
                close: 'Закрыть',
                inputReason: 'Причина удаления',
                inputProtect: 'Защитить только для администраторов?',
                inputPages: 'Вставьте названия страниц, которые желаете удалить, каждое на новой строке',
                errorsForm: 'Произошедшие ошибки будут отображаться ниже',
                addCategoryContents: 'Добавить категорию статей',
                initiate: 'Выполнить',
                stateReason: 'Пожалуйста, укажите причину!',
                endTitle: 'Завершено!',
                endMsg: 'Ничего не осталось либо следующая линия пуста.',
                enterCategory: 'Пожалуйста, введите название категории (без префикса)',
                ajaxError: 'Ошибка AJAX',
                errorGetContents: 'Не удалось загрузить статьи из $1: $2',
                errorDelete: 'Не удалось удалить $1: $2',
                errorProtect: 'Не удалось защитить $1: $2',
                deleteSuccess: 'Удаление $1 успешно!',
                protectSuccess: 'Защита $1 успешна!'
            },
            uk: {
                toolsTitle: 'Видалення сторінок',
                modalTitle: 'Видалення сторінок з Ajax',
                close: 'Закрити',
                inputReason: 'Причина видалення',
                inputProtect: 'Захистити тільки для адміністраторів?',
                inputPages: 'Вставте назви сторінок, які ви бажаєте видалити, кожну на новому рядку',
                errorsForm: 'Помилки, які відбулися, відображатимуться нижче',
                addCategoryContents: 'Додати категорію статей',
                initiate: 'Виконати',
                stateReason: 'Будь ласка, вкажіть причину!',
                endTitle: 'Завершено!',
                endMsg: 'Нічого не залишилося або наступна лінія порожня.',
                enterCategory: 'Будь ласка, введіть назву категорії (без префікса)',
                ajaxError: 'Помилка AJAX',
                errorGetContents: 'Не вдалося завантажити статті з $1: $2',
                errorDelete: 'Не вдалося видалити $1: $2',
                errorProtect: 'Не вдалося захистити $1: $2',
                deleteSuccess: 'Видалення $1 успішно!',
                protectSuccess: 'Захист $1 успішний!'
            },
            pl: {
                toolsTitle: 'Batch Delete',
                modalTitle: 'Ajax Batch Delete',
                close: 'Zamknij',
                inputReason: 'Powód usunięcia',
                inputProtect: 'Zabezpieczyć?',
                inputPages: 'Umieść nazwy stron, które chcesz usunąć w oddzielnych liniach',
                errorsForm: 'Napotkane błędy zostaną wyświetlone poniżej',
                addCategoryContents: 'Dodaj zawartość kategorii',
                initiate: 'Rozpocznij',
                stateReason: 'Proszę podać powód!',
                endTitle: 'Zakończono!',
                endMsg: 'Nic nie zostało usunięte, lub następna linia jest pusta.',
                enterCategory: 'Proszę podać nazwę kategorii (nie jej prefiks)',
                ajaxError: 'Błąd AJAX',
                errorGetContents: 'Nie udało załadować artykułu $1: $2',
                errorDelete: 'Nie udało się usunąć $1: $2',
                errorProtect: 'Nie udało się zabezpieczyć $1: $2',
                deleteSuccess: 'Pomyślnie usunięto $1!',
                protectSuccess: 'Pomyślnie zabezpieczono $1!'  
            }
        },
        lang = mw.config.get('wgUserLanguage'),
        i18n = $.extend(i18ndata.en, i18ndata[lang.split('-')[0]], i18ndata[lang]),
        formHtml =
            ('<form method="" name="" class="WikiaForm ">' +
                '<fieldset>' +
                    '<p>{{inputReason}}:' +
                        '<input type="text" id="delete-reason" value="" />' +
                        '<br/>' +
                        '<label for="protect-check">{{inputProtect}} <input type="checkbox" id="protect-check" /></label>' +
                    '</p>' +
                    '<p>{{inputPages}}.</p>' +
                    '<textarea style="resize: none; height: 20em; width: 100%;" id="text-mass-delete"/>' +
                    '<p>{{errorsForm}}:</p>' +
                    '<div id="text-error-output" style="resize: none; height:10em; width: 100%; color:black; background-color: #ffbfbf; height: 150px; font-weight: bold"></div>' +
                '</fieldset>' +
            '</form>').replace(/{{(\w+)}}/g, function(_, a) { return i18n[a]; });

    // Support for Monobook
    if (mw.config.get('skin') === 'monobook') {
        mw.util.addPortletLink('p-tb', '#', 'Batch Delete', 't-bd');
    } else {
        $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-bd">' + i18n.toolsTitle + '</a></li>');
    }

    $('#t-bd').click(function() {
        $.showCustomModal(i18n.modalTitle, formHtml, {
            id: 'form-mass-delete',
            width: 500,
            buttons: [{
                message: i18n.close,
                handler: function() {
                    $('#form-mass-delete').closeModal();
                }
            }, {
                message: i18n.addCategoryContents,
                defaultButton: true,
                handler: addCategoryContents
            }, {
                id: 'startButton',
                message: i18n.initiate,
                defaultButton: true,
                handler: init
            }]
        });
    });

    function init() {
        var txt = document.getElementById('text-mass-delete'),
            deleteReason = document.getElementById('delete-reason').value,
            pages = txt.value.split('\n'),
            currentPage = pages[0];
        if (!deleteReason) {
            alert(i18n.stateReason);
            return;
        }
        document.getElementById('startButton').setAttribute('disabled', 'disabled');
        if (!currentPage) {
            document.getElementById('startButton').removeAttribute('disabled');
            $.showCustomModal(i18n.endTitle, i18n.endMsg, {
                id: 'mass-delete-complete',
                width: 200,
                buttons: [{
                    message: i18n.close,
                    defaultButton: true,
                    handler: function() {
                        $('#mass-delete-complete').closeModal();
                    }
                }]
            });
        } else {
            process(currentPage, deleteReason);
        }
        pages = pages.slice(1,pages.length);
        txt.value = pages.join('\n');
    }

    function addCategoryContents() {
        var category = prompt(i18n.enterCategory + ':');
        api.get({
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:' + category,
            cmlimit: 5000
        }).done(function(d) {
            if (!d.error) {
                var data = d.query;
	            for (var i in data.categorymembers) {
                    $('#text-mass-delete').append(data.categorymembers[i].title + '\n');
                }
            } else {
                outputError('GetContents', category, d.error.code);
            }
        }).fail(function() {
            outputError('GetContents', category, i18n.ajaxError);
        });
    }

    function outputError(error, param1, param2) {
        $('#text-error-output').append(formatI18n('error' + error, param1, param2) + '<br />');
    }

    function formatI18n(message, param1, param2) {
        return i18n[message].replace('$1', param1).replace('$2', param2);
    }

    function process(page,reason) {
        api.post({
            action: 'delete',
            watchlist: 'nochange',
            title: page,
            reason: reason,
            token: token,
            bot: true
        }).done(function(d) {
            if (!d.error) {
                console.log(formatI18n('deleteSuccess', page));
                if (document.getElementById('protect-check').checked) {
                    api.post({
                        action: 'protect',
                        expiry: 'infinite',
                        protections: 'create=sysop',
                        watchlist: 'nochange',
                        title: page,
                        reason: reason,
                        token: token
                    }).done(function(d) {
                        if (!d.error) {
                            console.log(formatI18n('protectSuccess', page));
                        } else {
                            console.log(formatI18n('errorProtect', page, d.error.code));
                            outputError('Protect', page, d.error.code);
                        }
                    }).fail(function() {
                        console.log(formatI18n('errorProtect', page, i18n.ajaxError));
                        outputError('Protect', page, i18n.ajaxError);
                    });
                }
            } else {
                console.log(formatI18n('errorDelete', page, d.error.code));
                outputError('Delete', page, d.error.code);
            }
        }).fail(function() {
            console.log(formatI18n('errorDelete', page, i18n.ajaxError));
            outputError('Delete', page, i18n.ajaxError);
        });
        setTimeout(init, delay);
    }
});