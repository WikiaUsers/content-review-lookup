;(function(mw, $, i18n){
    i18n = $.extend(i18n, {
        en: {
            newMessages: '$count new messages since $time.',
            markAsRead: 'Mark as read'
        }
    });
    
    var newMessages = i18n[mw.config.get('wgUserLanguage')].newMessages || i18n['en'].newMessages,
        markAsRead = i18n[mw.config.get('wgUserLanguage')].markAsRead || i18n['en'].markAsRead;
    
    $(document).ready(function(){
        var $notice = $('<div class="banner-notice notice" />');
    });
})(this.mediaWiki, this.jQuery, this.messagesNotice = this.messagesNotice || {});