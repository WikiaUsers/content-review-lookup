/*
 * Request filling system using popups by Gguigui1, Hulothe, Wyz and Fubuki風吹.
 * Slightly rewrited by Wildream for ru.community
 * Original can be found here: http://communaute.wikia.com/wiki/MediaWiki:Common.js/Requests.js
 */
function showRequestModal(title, form) {
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
                    window.location.href = wgServer + '/wiki/Special:UserLogin';
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
        $.showCustomModal(title, form, {
            id: 'requestForm',
            width: 600,
            buttons: [{
                id: 'submitButton',
                message: 'Создать',
                defaultButton: true
            }, {
                message: 'Отмена',
                handler: function () {
                    $('#requestForm').closeModal();
                }
            }]
        });
    }
}

function checkAndSubmitFormData(submitData, summary) {
    var allFieldsAreSet = true;
    $('.unfilled-warning').hide();
    $('.must-be-filled').each(function () {
        if ($(this).next('input').val().length === 0) {
            $(this).find('.unfilled-warning').fadeIn(500);
            allFieldsAreSet = false;
        }
    });
    if (allFieldsAreSet) {
        $('#requestForm').closeModal();

        $.ajax({
            url: mw.util.wikiScript('api'),
            type: 'POST',
            data: {
                action: 'edit',
                title: mw.config.get('wgPageName'),
                section: 'new',
                summary: summary,
                text: submitData,
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
        return false;
    }
}

$(function () {
    switch (mw.config.get('wgTitle')) {
    case 'Викия: Запросы на статус администратора/бюрократа':
        $('#adoption').click(function () {
            var requestForm =
                '<form method="" name="" class="WikiaForm">' +
                '  <fieldset>' +
                '      <p style="padding:5px; border:1px solid grey;">' +
                'Пожалуйста, заполните поля этой карточки, чтобы оставить запрос. Обратите внимание, что поля, помеченные (<span style="color:red">*</span>), обязательны для заполнения.</p><br />' +
                '      <p class="request-field must-be-filled"><b><span style="color:red">*</span>Название вики :</b> <span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span></p><input type="text" style="align:center;height:20px; width:300px" id="Name" placeholder="Например : Гарри Поттер Вики"/>' +
                '      <p class="request-field must-be-filled"><b><span style="color:red">*</span>URL вики :</b> <span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span></p> http://<input type="text" style="align:center;height:20px; width:300px" id="Link" placeholder="Например : ru.harrypotter"/>.wikia.com' +
                '      <p class="request-field must-be-filled"><b><span style="color:red">*</span>Кол-во ваших правок на данной вики :</b> <span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span></p>' +
                '          <input type="text" maxlength="6" style="align:center;height:20px; width:150px" id="NumberOfEdits"/>' +
                '      <p class="request-field must-be-filled"><b><span style="color:red">*</span>Кол-во новых статей, которые вы создали на данной вики :</b> <span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span></p> <input type="text" style="height:20px; width:400px" id="NumberOfArticles" placeholder="Нужно НЕ менее 10 статей"/>' +
                '<p class="request-field"><b>Дополнительная информация :</b></p> <input type="text" style="height:20px; width:400px" id="Comments" placeholder="Любая дополнительная информация о вики или о себе"/>' +
                '  </fieldset>' +
                '</form>';

            showRequestModal('Новый запрос на статус администратора', requestForm);
            $('#submitButton').click(function () {
                var requestSubmitData =
                    '* Вклад участника ' + '[[w:c:' + $('#Link').val().toString() + ':Special:Contributions/' + mw.config.get('wgUserName') + '|' + mw.config.get('wgUserName') +
                    ']]\n' +
                    '* Кол-во правок на вики: ' + $('#NumberOfEdits').val().toString() + '\n' +
                    '* Кол-во новых статей: ' + $('#NumberOfArticles').val().toString() + '\n';
                if ($('#Comments').val()) {
                    requestSubmitData += '* Дополнительная информация : ' + '\'\'\'' + $('#Comments').val().toString() + '\'\'\'' + '\n';
                }
                requestSubmitData += '\~\~\~\~';
                var requestSummary = '[[w:c:' + $('#Link').val().toString() + '|' + $('#Name').val().toString() + ']]';
                checkAndSubmitFormData(requestSubmitData, requestSummary);
            });
        });
        break;
        // more pages coming soon!
    default:
        //do nothing
        break;
    }
});