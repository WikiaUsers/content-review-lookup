// Фильтр мата и капса v 0.2, beta
// author: Kopcap94 c Энициклопедии FNaF
$(function() {
    if (wgCanonicalSpecialPageName != 'Chat') {
        return;
    }
 
    blacklist = /([^А-Яа-яA-Za-z0-9]|^)((н(а|и|е)|по)?ху(й|я|е(та)?)|пизд(а(бол)?|ец?)|бля((д|т)ь|я{1,})?|(е|ё)ба(л(о|ьник)|ть)?|у?(ё|е)б(ок|ки|а|ы|у(чий)?|ать|ычь?)|(а|о)хуе(нн?о|ть|ли|сосы?)|(х|к)уйн(ю|я)){1,}([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]{1,})?(?!\S)/ig;
    $('[name="message"]').on('keydown', function(e) {
        if (e.which != 13) {
            return;
        }
 
        var message = $('.message > textarea').val();
 
        if (message.length > 10) {
            var mlength = message.length;
            var uppercase = message.replace(/%..|[^А-ЯA-Z]/g,'').length;
            if (uppercase/mlength > 0.6) {
                $('.message > textarea').val('!: '+message.toLowerCase());
            }
        }
 
        if (message.match(blacklist)) {
            $('.message > textarea').val($('.message > textarea').val().replace(blacklist, ' [censored] '));
        }
    });
});
// Материалы сообщества доступны в соответствии с условиями лицензии CC-BY-SA , если не указано