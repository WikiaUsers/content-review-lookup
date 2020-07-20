/*
* CapsFirst
* @author Ozank Cx
*/
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') {
        return;
    }
    $('textarea[name=message]').keydown(function(e) {
        if (e.which === 13) {
            var $this = $(this),
                t = $(this).val();
            if (!/^https?:\/\//.test(t)) {
                $this.val(t.charAt(0).toUpperCase() + t.substring(1));
            }
        }
    });
});