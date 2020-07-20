/*
 * Request filling system using popups by Gguigui1, Hulothe, Wyz and Fubuki風吹.
 * Rewritten by Wildream for http://ru.community.wikia.com
 * Original idea and code can be found here: http://communaute.wikia.com/wiki/MediaWiki:Common.js/Requests.js
 * Ukrainian translation by Skyflurry
*/
function showRequestModal(title, form, type) {
    if (wgUserName === null) {
        $.showCustomModal('Будь ласка, увійдіть до облікового запису', '<div>Ви повинні увійти до свого облікового запису, щоб залишити запит.</div>', {
            id: 'NotLoggedIn',
            width: 300,
            buttons: [{
                id: 'loginButton',
                message: 'Увійти',
                defaultButton: true,
                handler: function () {
                    $('#NotLoggedIn').closeModal();
                    window.location.href = wgServer + '/wiki/Special:UserLogin';
                }
            }, {
                message: 'Скасування',
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
                message: 'Створити',
                defaultButton: true
            }, {
                message: 'Додати секцію',
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
                            '<p class="request-field"><b>URL вікі №1:</b> http://<input type="text" style="align:center;height:20px; width:300px" class="request-first" placeholder="Наприклад: uk.dragonage"/>.wikia.com</p>' +
                            '<p class="request-field"><b>URL вікі №2:</b> http://<input type="text" style="align:center;height:20px; width:300px" class="request-second" placeholder="Наприклад: pl.dragonage"/>.wikia.com</p>' +
                        '</div>'
                    );
                    modal_additional_count++;
                }
            }, {
                message: 'Скасування',
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
            url: '/wiki/'+mw.config.get('wgPageName'),
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
                            summary: 'Новий запит',
                            text: text + '\n' + submitData,
                            token: mw.user.tokens.get('editToken'),
                            format: 'json'
                        },
                        dataType: 'json',

                        success: function (data) {
                            if (data && data.edit && data.edit.result == 'Success') {
                                $.showCustomModal('Запит відправлено', '<div>Ваш запит прийнятий. Чекайте відповіді.</div>', {
                                    id: 'RequestSuccess',
                                    width: 300,
                                    buttons: [{
                                        message: 'Добре',
                                        defaultButton: true,
                                        handler: function () {
                                            $('#RequestSuccess').closeModal();
                                            window.location.reload();
                                        }
                                    }]
                                });
                            } else {
                                $.showCustomModal('Помилка', '<div>Під час надсилання запиту сталася помилка. Будь ласка, спробуйте знову.</div>', {
                                    id: 'RequestFailure',
                                    width: 300,
                                    buttons: [{
                                        message: 'Добре',
                                        defaultButton: true,
                                        handler: function () {
                                            $('#RequestFailure').closeModal();
                                            showRequestModal();
                                        }
                                    }, {
                                        message: 'Скасування',
                                        handler: function () {
                                            $('#RequestFailure').closeModal();
                                        }
                                    }]

                                });
                            }
                        }
                    });
                } else {
                    $.showCustomModal('Помилка', '<div>Під час надсилання запиту сталася помилка. Будь ласка, спробуйте знову.</div>', {
                        id: 'RequestFailure',
                        width: 300,
                        buttons: [{
                            message: 'Добре',
                            defaultButton: true,
                            handler: function () {
                                $('#RequestFailure').closeModal();
                                showRequestModal();
                            }
                        }, {
                            message: 'Скасування',
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
    // making sure that user will click «Залишити запит» button instead of edit button
    if ($('#request').length && mw.config.get('wgUserGroups').indexOf('sysop') === -1) {
        $('#WikiaPageHeader .wikia-menu-button').remove();
    }
    switch (mw.config.get('wgTitle')) {
    case 'Запити на міжмовні посилання':
        $('#request').click(function () {
            var requestForm =
                '<form method="" name="" class="WikiaForm">' +
                    '<fieldset>' +
                        '<p style="padding:5px; border:1px solid grey; margin-bottom: 5px;">' +
                            'Будь ласка, заповніть поля цієї картки, щоб залишити запит. Зверніть увагу, що поля, які помічені (<span style="color:red">*</span>), повинні бути заповнені.' +
                        '</p>' +
                        '<p class="request-field must-be-filled">' +
                            '<b>' +
                                '<span style="color:red">*</span>' +
                                'URL вікі №1 :' +
                            '</b> ' +
                            '<span class="unfilled-warning" style="color:red;display:none">Ви повинні заповнити це поле.</span>' +
                            '<br /> ' + 
                            'http://<input type="text" style="align:center;height:20px; width:300px" id="PrimaryWiki" placeholder="Наприклад: uk.dragonage"/>.wikia.com' +
                        '</p>' +
                        '<p class="request-field must-be-filled">' +
                            '<b>' +
                                '<span style="color:red">*</span>' +
                                'URL вікі №2 :' +
                            '</b> ' +
                            '<span class="unfilled-warning" style="color:red;display:none">Ви повинні заповнити це поле.</span>' +
                            '<br /> ' +
                            'http://<input type="text" style="align:center;height:20px; width:300px" id="SecondaryWiki" placeholder="Наприклад: pl.dragonage"/>.wikia.com' +
                        '</p>' +
                        '<div class="request-additional-field" style="display: none; height: 300px; border:1px solid grey; margin-top:5px;">' +
                            '<div style="text-align:center; padding:5px; font-weight: bold; border-bottom: 1px solid grey;">' +
                                'Додаткові секції' +
                                ' <span class="request-limit" style="display: none; color: red;">(перевищено ліміт)</span>' +
                            '</div>' +
                            '<div class="request-additional-section" style="overflow-y: auto; height: 265px;" />' +
                        '</div>' +
                    '</fieldset>' +
                '</form>';

            showRequestModal('Новий запит на створення міжмовних посилань:', requestForm, true);
            $('#submitButton').click(function () {
                var first_wiki = $('#PrimaryWiki').val().toString().replace(/(^https?:..|\.wikia\.com(.+)?$)/g, ''),
                    second_wiki = $('#SecondaryWiki').val().toString().replace(/(^https?:..|\.wikia\.com(.+)?$)/g, ''),
                    requestSubmitData =
                    '== [[w:c:' + first_wiki + '|' + first_wiki + ']] ==\n* Користувач: ' + mw.config.get('wgUserName') + '\n' +
                    '* Створення міжмовних посилань:\n{{InterwikiLink|' + first_wiki + '|' + second_wiki + '}}\n';

                checkAndSubmitFormData(requestSubmitData, true);
            });
        });
        break;
    default:
        //do nothing
        break;
    }
});