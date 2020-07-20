// Đổi tên nhanh
;(function($,mw) {
    if (mw.config.get('wgUserGroups').indexOf('autoconfirmed') == -1) {
        return;
    }
 
    var fastRenameForm = 
        '<fieldset style="border:solid 1px #36759c; margin:0; padding:1em;">' +
            '<div style="text-align:center; margin-bottom:8px;">Đổi Tên Trang: ' + mw.config.get('wgPageName').replace(/_/g,' ') + '</div>' +
            '<div>Nhập tên cần đổi: <input class="new_page_name" style="float:right; width:75%;" /></div>' +
            '<div class="rename_result" style="margin-top:5px;"/>' +
        '</fieldset>';
 
    $('.page-header__contribution-buttons .wds-dropdown').find('a[id="ca-move"]').parent().after(
        '<li>' +
            '<a class="FastRenamePage" style="color:red; font-weight:bold; cursor:pointer;">Đổi tên nhanh</a>' +
        '</li>'
    );
 
    $('.FastRenamePage').click(function() {
        $.showCustomModal( 'Đổi tên nhanh', fastRenameForm, {
            width: 620,
            buttons: [{
                message: 'Xong! (Chỉ click 1 lần)',
                handler: function() { 
                    $.post('/api.php', {
                        action: 'move', 
                        from: mw.config.get('wgPageName'), 
                        to: $('.new_page_name').val(), 
                        token: mw.user.tokens.values.editToken, 
                        reason: 'Đổi tên trang', 
                        movetalk: '', 
                        movesubpages: '', 
                        ignorewarnings: '',
                        format: 'json'
                    }).done(function(data) {
                        if (typeof data.error === 'undefined') {
                            $('.rename_result').empty().append('<center><span style="color:green;">Thành công rồi!</span></center>');
                        } else {
                            $('.rename_result').empty().append('<center><span style="color:red;">Có vấn đề rồi đấy!</span></center>');
                        }
                    });
                }
            }]
        });
    });
})(this.jQuery, this.mediaWiki);