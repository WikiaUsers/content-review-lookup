/*
 * Request filling system using popups by Gguigui1, Hulothe, Wyz and Fubuki風吹.
 * Modifed by Медведь на востоке for https://figurnoe-katanie.fandom.com
 */

var modal_f = null;
var modal_f_start = null;

function showRequestModal(title, form, type, func) {
	modal_f_start = func;
	if (modal_f === null) {
	    modal_f = new window.dev.modal.Modal({
	        content: form,
	        id: 'requestForm',
	        size: 'medium',
	        title: title,
	        buttons: [
	            {
	                id: 'submitButton',
	                text: 'OK',
	                primary: true,
	                event: 'modal_f_start'
	            }
	        ],
	        events: {
	            modal_f_start: modal_f_start
	        }
	    });
		modal_f.create();
	} else {
		modal_f.setTitle(title);
		modal_f.setContent(form);
	}
    if (!type) {
        $('#addMore').hide();
    }
    modal_f.show();
}

function checkAndSubmitFormData(submitData, type, summaryData) {
    var allFieldsAreSet = true;
    $('.unfilled-warning').hide();
    $('.must-be-filled').each(function () {
        if ($(this).find('input').val().length === 0) {
            $(this).find('.unfilled-warning').fadeIn(500);
            allFieldsAreSet = false;
        }
    });
    if (allFieldsAreSet) {
        modal_f.hide();
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
                            summary: summaryData,
                            text: text + '\n' + submitData,
                            token: mw.user.tokens.get('editToken'),
                            format: 'json'
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data && data.edit && data.edit.result == 'Success') {
								window.location.reload();
                            } else {
                                alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
                            }
                        }
                    });
                } else {
                    alert('Во время отправки запроса произошла ошибка. Пожалуйста, попробуйте снова.');
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
    switch (mw.config.get('wgPageName')) {
    case 'Фигурное_катание_Wiki:К_удалению':
        $('#request').click(function () {
            var requestForm =
                '<form method="" name="" class="WikiaForm">' +
                  '<fieldset>' +
                    '<p style="padding:5px; border:1px solid grey; margin-bottom: 5px;">' +
                        'Пожалуйста, заполните поля этой карточки, чтобы выставить страницу на удаление. Обратите внимание, что поля, помеченные (<span style="color:red">*</span>), обязательны для заполнения.' +
                    '</p>' +
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Название страницы: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" style="align:center;height:20px; width:100%" id="Name"/>' +
                    '</p>'+
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Причина удаления: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" style="align:center;height:20px; width:100%" id="Reason"/>' +
                    '</p>' +
                  '</fieldset>' +
                '</form>';
            showRequestModal('Добавить номинацию на удаление:', requestForm, false, function () {
                var pagename = $('#Name').val().toString();
var reason = $('#Reason').val().toString();
                var requestSubmitData = '== [[:' + pagename + ']] ==\n' + reason + ' ~~\~~\n\n';
                // We need to escape some '~' since MediaWiki wikitext parser replaces it with user signature and breaks the code
                var requestSummary = 'новая номинация на удаление';
                checkAndSubmitFormData(requestSubmitData, false, requestSummary);
            });
        });
        break;
        case 'Фигурное_катание_Wiki:К_переименованию':
        $('#request').click(function () {
            var requestForm =
                '<form method="" name="" class="WikiaForm">' +
                  '<fieldset>' +
                    '<p style="padding:5px; border:1px solid grey; margin-bottom: 5px;">' +
                        'Пожалуйста, заполните поля этой карточки, чтобы выставить страницу на переименование. Обратите внимание, что поля, помеченные (<span style="color:red">*</span>), обязательны для заполнения.' +
                    '</p>' +
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Старое название страницы: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" style="align:center;height:20px; width:100%" id="Name"/>' +
                    '</p>'+
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Новое название страницы: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" style="align:center;height:20px; width:100%" id="Newname"/>' +
                    '</p>'+
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Причина переименования: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" style="align:center;height:20px; width:100%" id="Reason"/>' +
                    '</p>' +
                  '</fieldset>' +
                '</form>';
            showRequestModal('Добавить номинацию на переименование:', requestForm, false, function () {
                var oldname = $('#Name').val().toString();
                var newname = $('#Newname').val().toString();
var reason = $('#Reason').val().toString();
                var requestSubmitData = '== [[:' + oldname + ']] → [[:' + newname + ']] ==\n' + reason + ' ~~\~~\n\n';
                // We need to escape some '~' since MediaWiki wikitext parser replaces it with user signature and breaks the code
                var requestSummary = 'новая номинация на переименование';
                checkAndSubmitFormData(requestSubmitData, false, requestSummary);
            });
        });
        break;
    case 'Фигурное_катание_Wiki:К_восстановлению':
        $('#request').click(function () {
            var requestForm =
                '<form method="" name="" class="WikiaForm">' +
                  '<fieldset>' +
                    '<p style="padding:5px; border:1px solid grey; margin-bottom: 5px;">' +
                        'Пожалуйста, заполните поля этой карточки, чтобы выставить удалённую страницу на восстановление. Обратите внимание, что поля, помеченные (<span style="color:red">*</span>), обязательны для заполнения.' +
                    '</p>' +
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Название страницы: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" style="align:center;height:20px; width:100%" id="Name"/>' +
                    '</p>'+
                    '<p class="request-field must-be-filled" style="margin-bottom: 5px;">' +
                        '<b>' +
                            '<span style="color:red">*</span>' +
                            'Причина восстановления: ' +
                        '</b>' +
                        '<span class="unfilled-warning" style="color:red;display:none">Вы должны заполнить это поле.</span>' +
                        '<input type="text" style="align:center;height:20px; width:100%" id="Reason"/>' +
                    '</p>' +
                  '</fieldset>' +
                '</form>';
            showRequestModal('Добавить номинацию на восстановление:', requestForm, false, function() {
				var pagename = $('#Name').val().toString();
				var reason = $('#Reason').val().toString();
                var requestSubmitData = '== [[:' + pagename + ']] ==\n' + reason + ' ~~\~~\n\n';
                // We need to escape some '~' since MediaWiki wikitext parser replaces it with user signature and breaks the code
                var requestSummary = 'новая номинация на восстановление';
                checkAndSubmitFormData(requestSubmitData, false, requestSummary);
			});
        });
        break;
    default:
        //do nothing
        break;
    }
});