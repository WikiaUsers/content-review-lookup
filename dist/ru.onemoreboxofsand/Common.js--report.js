;(function($, mw) {
    if (!$('#user_report').length) {
        return;
    }
 
    $('#user_report').append(
        '<div style="text-align: center;">' +
            '<button class="newreport" style="margin:3px auto;">' +
                'Пожаловаться на пользователя' +
            '</button>' +
        '</div>'
    );
 
    var report_form = 
        '<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;">' +
            '<div>' +
                'Участник: ' +
                    '<input class="ReportUser" style="float:right; width:75%; margin:0 5px;" placeholder="Пример: Example" />' +
            '</div>' +
            '<div style="margin-top:5px;">' +
                'Нарушение: ' +
                    '<input class="ReportReason" style="float:right; width:75%; margin:0 5px;" placeholder="Пример: Вандализм"/>' +
            '</div>' +
            '<div style="margin:5px 0;">' +
                'Ссылка: ' +
                    '<input class="ReportLink" style="float:right; width:75%; margin:0 5px;" placeholder="Пример: http://ru.terraria.wikia.com/wiki/Страница_под_атакой"/>' +
            '</div>' +
            '<div>' +
                'Дополнительно: ' +
                    '<input class="ReportMore" style="float:right; width:75%; margin:0 5px;" placeholder="Дополнительная информация от вас"/>' +
            '</div>' +
            '<div id="form_result" style="display:none; margin-top:5px; text-align:center; color:red; font-size:bold;">' +
                'Упс! Что-то пошло не так. Пожалуйста, проверьте консоль (F12) за информацией об ошибке и обратитесь к администратору!' +
            '</div>' +
        '</fieldset>'
    ;
 
    $('.newreport').click(function() {
        $.showCustomModal('Форма заполнения', report_form, {
            id: 'reportForm',
            width: 550,
            buttons: [{
                message: "Пожаловаться",
                handler: function () {
                    var user_name = $('.ReportUser').val();
                    if (user_name === '') {
                        alert('Введите ник участника!');
                        return;
                    }
 
                    var report_link = $('.ReportLink').val().replace(/\s/g, '_');
                    if (report_link.indexOf('http') === -1 && report_link.indexOf('.wikia.com') === -1) {
                        report_link = '[[' + report_link + '|проверить]]';
                    } else if (report_link.indexOf('http') === -1 && report_link.indexOf('.wikia.com') > -1) {
                        report_link = '[http://' + report_link + ' проверить]';
                    } else {
                        report_link = '[' + report_link + ' проверить]';
                    }
 
                    var more_info = (($('.ReportMore').val() !== '') ? $('.ReportMore').val() : 'Пользователь ничего не добавил');   
 
                    text_report = 
                        '*\'\'\'Участник:\'\'\' [[User:' + user_name + '|'  + user_name + ']] <sup><sup> ([[Message wall:'  + user_name + '|стена обсуждения]] | [[Special:Contributions/'  + user_name + '|вклад]] | [[Special:Block/'  + user_name + '|заблокировать]])</sup>\n' +
                        '*\'\'\'Нарушение:\'\'\' ' + $('.ReportReason').val() + '\n' +
                        '*\'\'\'Ссылка:\'\'\' ' + report_link + '\n' +
                        '*\'\'\'Дополнительно:\'\'\' ' + more_info + '\n' +
                        '*\'\'\'Подпись:\'\'\' ~~' + '~~'
                    ;
 
                    $.post('/api.php', {
                        action: 'edit',
                        title: mw.config.get('wgPageName'),
                        section: 'new',
                        sectiontitle: user_name,
                        text: text_report,
                        summary: 'Новая жалоба',
                        token: mw.user.tokens.values.editToken,
                        format: 'json'
                    }, function(d) {
                        if (!d.error) {
                            $("#reportForm").closeModal();
                            location.reload();
                        } else {
                            $('#form_result').show();
                            console.log(
                                '<pre>==== Пожалуйста, скопируйте это администратору ====\n' +
                                '## Название ошибки: ' + d.error.code + '\n' +
                                '## Информация: ' + d.error.info + '\n' +
                                '===================================================</pre>'
                            );
                        }
                    });
                },
 
            }, {
                message: "Отмена",
                handler: function () {
                    $("#reportForm").closeModal();
                }
            }]
        });
 
    });
 
})(this.jQuery, this.mediaWiki);