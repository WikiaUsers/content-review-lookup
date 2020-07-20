/*
 * Request filling system using popups by Gguigui1, Hulothe, Wyz and Fubuki風吹.
 * Rewritten by Wildream for http://ru.community.wikia.com
 * Original idea and code can be found here: http://communaute.wikia.com/wiki/MediaWiki:Common.js/Requests.js
 *
 */
function showRequestModal(title, form, type) {
    if (wgUserName === null) {
        $.showCustomModal('Пожалуйста, войдите в учётную запись', '<div>Вы должны войти в свою учётную запись, чтобы оставить запрос.</div>', {
            id: 'NotLoggedIn',
            width: 300,
            buttons: [{
                id: 'loginButton',
                message: 'Войти',
                defaultButton: true,
                handler: function () {
                    $('#NotLoggedIn').closeModal();
                    window.location.href = wgServer + '/ru/wiki/Special:UserLogin';
                }
            }, {
                message: 'Отмена',
                handler: function () {
                    $('#NotLoggedIn').closeModal();
                }
            }]
        });
        return false;
    } else {
        var modal_additional_count = 0;
        $.showCustomModal(title, form, {
            id: 'requestForm',
            width: 600,
            buttons: [{
                id: 'submitButton',
                message: 'Создать',
                defaultButton: true
            }, {
                message: 'Добавить секцию',
                id: 'addMore',
                handler: function() {
                    if (modal_additional_count === 9) {
                        $('.request-limit').show();
                        $('#addMore').attr('disabled', true);
                        return;
                    }
                    if ($('.request-additional-field').css('display') === 'none') {
                        $('.request-additional-field').fadeIn(500);
                    }
                    $('.request-additional-section').append(
                        '<div class="request-additional" style="margin: 0 5px; border-bottom: 1px solid grey; padding: 5px; 0">' +
                            '<p class="request-field"><b>URL вики №1 :</b> http://<input type="text" style="align:center;height:20px; width:300px" class="request-first" placeholder="Например : ru.harrypotter"/>.wikia.com</p>' +
                            '<p class="request-field"><b>URL вики №2 :</b> http://<input type="text" style="align:center;height:20px; width:300px" class="request-second" placeholder="Например : pl.harrypotter"/>.wikia.com</p>' +
                        '</div>'
                    );
                    modal_additional_count++;
                }
            }, {
                message: 'Отмена',
                handler: function () {
                    $('#requestForm').closeModal();
                }
            }]
        });
        if (!type) {
            $('#addMore').hide();
        }
    }
}

function checkAndSubmitFormData(submitData, type) {
    var allFieldsAreSet = true;
    $('.unfilled-warning').hide();
    $('.must-be-filled').each(function () {
        if ($(this).find('input').val().length === 0) {
            $(this).find('.unfilled-warning').fadeIn(500);
            allFieldsAreSet = false;
        }
    });
    if (type) {
        $('.request-additional').each(function() {
            var first = $(this).find('.request-first').val().toString().replace(/(^https?:..|\.wikia\.com(.+)?$)/g, ''),
                second = $(this).find('.request-second').val().toString().replace(/(^https?:..|\.wikia\.com(.+)?$)/g, '');

            if (first.length === 0 || second.length === 0) {
                return;
            }
            submitData += '{{InterwikiLink|' + first + '|' + second + '}}\n';
        });
        submitData += '~~\~~\n';
    }
    if (allFieldsAreSet) {
        $('#requestForm').closeModal();
        // NOTE: There's a reason behind not just using "secion=new" option to create a new request
        $.ajax({
            url: '/ru/wiki/'+mw.config.get('wgPageName'),
            type: 'GET',
            data: {
                action: 'raw',
                nocache: 1,
                allinone: 1
            },
            dataType: 'text',

            success: function (text) {
                if (text) {
                    $.ajax({
                        url: mw.util.wikiScript('api'),
                        type: 'POST',
                        data: {
                            action: 'edit',
                            title: mw.config.get('wgPageName'),
                            summary: 'Новый запрос',
                            text: text + '\n' + submitData,
                            token: mw.user.tokens.get('editToken'),
                            format: 'json'
                        },
                        dataType: 'json',

                        success: function (data) {
                            if (data && data.edit && data.edit.result == 'Success') {
                                $.showCustomModal('Запрос отправлен', '<div>Ваш запрос принят. Ожидайте ответа.</div>', {
                                    id: 'RequestSuccess',
                                    width: 300,
                                    buttons: [{
                                        message: 'ОК',
                                        defaultButton: true,
                                        handler: function () {
                                            $('#RequestSuccess').closeModal();
                                            window.location.reload();
                                        }
                                    }]
                                });
                            } else {
                                $.showCustomModal('Ошибка', '<div>Во время отправки запроса произошла ошибка. Пожалуйста, попробуйте снова.</div>', {
                                    id: 'RequestFailure',
                                    width: 300,
                                    buttons: [{
                                        message: 'ОК',
                                        defaultButton: true,
                                        handler: function () {
                                            $('#RequestFailure').closeModal();
                                            showRequestModal();
                                        }
                                    }, {
                                        message: 'Отмена',
                                        handler: function () {
                                            $('#RequestFailure').closeModal();
                                        }
                                    }]

                                });
                            }
                        }
                    });
                } else {
                    $.showCustomModal('Ошибка', '<div>Во время отправки запроса произошла ошибка. Пожалуйста, попробуйте снова.</div>', {
                        id: 'RequestFailure',
                        width: 300,
                        buttons: [{
                            message: 'ОК',
                            defaultButton: true,
                            handler: function () {
                                $('#RequestFailure').closeModal();
                                showRequestModal();
                            }
                        }, {
                            message: 'Отмена',
                            handler: function () {
                                $('#RequestFailure').closeModal();
                            }
                        }]

                    });
                }
            }
        });

    } else {
        return false;
    }
}

$(function () {
    // making sure that user will click "Оставить запрос" button instead of edit button
    if ($('#request').length && mw.config.get('wgUserGroups').indexOf('sysop') === -1) {
        $('#WikiaPageHeader .wikia-menu-button').remove();
    }
    switch (mw.config.get('wgTitle')) {
    case 'Запросы на статус администратора/бюрократа':
        $('#request').click(function () {
            var requestForm =
                '<form method="" name="" class="WikiaForm">' +
                  '<fieldset>' +
                    '<p style="padding:5px; border:1px solid grey; margin-bottom: 5px;">' +
                        'Пожалуйста, заполните поля этой карточки, чтобы оставить запрос. Обратите внимание, что поля, помеченные (<span style="color:red">*</span>), обязательны для заполнения.' +
                    '</p>' +
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Название вики : ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" style="align:center;height:20px; width:300px" id="Name" placeholder="Например : Гарри Поттер Вики"/>' +
                    '</p>'+
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'URL вики : ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        'http://<input type="text" style="align:center;height:20px; width:300px" id="Link" placeholder="Например : harrypotter"/>.fandom.com/ru' +
                    '</p>' +
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Кол-во ваших правок на данной вики : ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" maxlength="6" style="align:center;height:20px; width:150px" id="NumberOfEdits"/>' +
                    '</p>' +
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Кол-во новых статей, которые вы создали на данной вики: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" style="height:20px; width:400px" id="NumberOfArticles" placeholder="Нужно НЕ менее 10 статей"/>' +
                    '</p>' +
                    '<p class="request-field"">' +
                        '<b>Дополнительная информация: </b>' +
                        '<input type="text" style="height:20px; width:100%" id="Comments" placeholder="Любая дополнительная информация о вики или о себе"/>' +
                    '</p>' +
                  '</fieldset>' +
                '</form>';

            showRequestModal('Новый запрос на статус администратора:', requestForm, false);
            $('#submitButton').click(function () {
                var wikiname = $('#Link').val().toString().replace(/(^https?:..|\.(fandom|wikia)\.com(.+)?$)/g, '').toLowerCase(),
                    requestSubmitData =
                    '== [[w:c:ru.' + wikiname + '|' + $('#Name').val().toString() + ']] ==\n' +
                    '* Вклад участника ' + '[[w:c:ru.' + wikiname + ':Special:Contributions/' + mw.config.get('wgUserName') + '|' + mw.config.get('wgUserName') +
                    ']]\n' +
                    '* Кол-во правок на вики: ' + $('#NumberOfEdits').val().toString() + '\n' +
                    '* Кол-во новых статей: ' + $('#NumberOfArticles').val().toString() + '\n';
                if ($('#Comments').val()) {
                    requestSubmitData += '* Дополнительная информация : ' + '\'\'\'' + $('#Comments').val().toString() + '\'\'\'' + '\n';
                }
                // We need to escape some '~' since MediaWiki wikitext parser replaces it with user signature and breaks the code
                requestSubmitData += '~~\~~\n';
                checkAndSubmitFormData(requestSubmitData, false);
            });
        });
        break;
    case 'Запросы на межъязыковые ссылки':
        $('#request').click(function () {
            var requestForm =
                '<form method="" name="" class="WikiaForm">' +
                    '<fieldset>' +
                        '<p style="padding:5px; border:1px solid grey; margin-bottom: 5px;">' +
                            'Пожалуйста, заполните поля этой карточки, чтобы оставить запрос. Обратите внимание, что поля, помеченные (<span style="color:red">*</span>), обязательны для заполнения.' +
                        '</p>' +
                        '<p class="request-field must-be-filled">' +
                            '<b>' +
                                '<span style="color:red">*</span>' +
                                'URL вики №1 :' +
                            '</b> ' +
                            '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                            '<br /> ' + 
                            'http://<input type="text" style="align:center;height:20px; width:300px" id="PrimaryWiki" placeholder="Например : ru.harrypotter"/>.wikia.com' +
                        '</p>' +
                        '<p class="request-field must-be-filled">' +
                            '<b>' +
                                '<span style="color:red">*</span>' +
                                'URL вики №2 :' +
                            '</b> ' +
                            '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                            '<br /> ' +
                            'http://<input type="text" style="align:center;height:20px; width:300px" id="SecondaryWiki" placeholder="Например : pl.harrypotter"/>.wikia.com' +
                        '</p>' +
                        '<div class="request-additional-field" style="display: none; height: 300px; border:1px solid grey; margin-top:5px;">' +
                            '<div style="text-align:center; padding:5px; font-weight: bold; border-bottom: 1px solid grey;">' +
                                'Дополнительные секции' +
                                ' <span class="request-limit" style="display: none; color: red;">(превышен лимит)</span>' +
                            '</div>' +
                            '<div class="request-additional-section" style="overflow-y: auto; height: 265px;" />' +
                        '</div>' +
                    '</fieldset>' +
                '</form>';

            showRequestModal('Новый запрос на создание межъязыковых ссылок:', requestForm, true);
            $('#submitButton').click(function () {
                var first_wiki = $('#PrimaryWiki').val().toString().replace(/(^https?:..|\.wikia\.com(.+)?$)/g, ''),
                    second_wiki = $('#SecondaryWiki').val().toString().replace(/(^https?:..|\.wikia\.com(.+)?$)/g, ''),
                    requestSubmitData =
                    '== [[w:c:' + first_wiki + '|' + first_wiki + ']] ==\n* Участник: ' + mw.config.get('wgUserName') + '\n' +
                    '* Связываемые википроекты:\n{{InterwikiLink|' + first_wiki + '|' + second_wiki + '}}\n';

                checkAndSubmitFormData(requestSubmitData, true);
            });
        });
        break;
    default:
        //do nothing
        break;
    }
});