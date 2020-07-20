;(function($,mw) {
    if (mw.config.get('wgUserGroups').indexOf('autoconfirmed') == -1) {
        return;
    }
    
    var fastRenameForm = 
        '<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;">' +
            '<div style="text-align:center; margin-bottom:5px;">Страница: ' + mw.config.get('wgPageName').replace(/_/g,' ') + '</div>' +
            '<div>Переименовать в: <input class="new_page_name" style="float:right; width:75%;" /></div>' +
            '<div class="rename_result" style="margin-top:5px;"/>' +
        '</fieldset>';
    
    $( '.wds-dropdown__content .wds-list' ).find('#ca-move').parent().after(
        '<li>' +
            '<a class="FastRenamePage" style="color:red; font-weight:bold; cursor:pointer;">Переименовать</a>' +
        '</li>'
    );
    
    $('.FastRenamePage').click(function() {
        $.showCustomModal( 'Быстрое переименование', fastRenameForm, {
            width: 500,
            buttons: [{
                message: 'Готово!',
                handler: function() { 
                    $.post('/ru/api.php', {
                        action: 'move', 
                        from: mw.config.get('wgPageName'), 
                        to: $('.new_page_name').val(), 
                        token: mw.user.tokens.values.editToken, 
                        reason: 'Переименование страницы', 
                        movetalk: '', 
                        movesubpages: '', 
                        ignorewarnings: '',
                        format: 'json'
                    }).done(function(data) {
                        if (typeof data.error === 'undefined') {
                            $('.rename_result').empty().append('<center><span style="color:green;">Успешно!</span></center>');
                        } else {
                            $('.rename_result').empty().append('<center><span style="color:red;">Ого, ошибка!</span></center>');
                        }
                    });
                }
            }]
        });
    });
})(this.jQuery, this.mediaWiki);