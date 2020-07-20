/*
*     Автоматический шаблон защиты
*/

$(function() {
    if ((wgNamespaceNumber !== 0 && wgNamespaceNumber !== 4) || wgTitle == 'Boom Beach Wiki' || $('.ProtTemplate').length) {
        return;
    }
    $.ajax({
        url: mw.config.get('wgServer') + '/api.php?action=query&prop=info&titles='+wgPageName+'&inprop=protection&format=json'
    }).done(function(data) {
        var protection = data.query.pages[wgArticleId].protection[0];
        if (typeof(protection) == 'undefined') {
            return;
        }
        protection = protection.level;
        var text, text2, color;
        if (protection == 'autoconfirmed') {
            text  = '<img src="https://images.wikia.nocookie.net/boom-beach/ru/images/8/85/Text%D0%A7.png" width="440" height="56">';
            text2 = '<img src="https://images.wikia.nocookie.net/boom-beach/ru/images/8/85/War%D1%87.png" width="80" height="80">';
            color = 'rgba(222,222,172,1)';
        } else {
            text  = '<img src="https://images.wikia.nocookie.net/boom-beach/ru/images/c/c4/Text%D0%9F.png" width="440" height="56">';
            text2 = '<img src="https://images.wikia.nocookie.net/boom-beach/ru/images/e/e6/War%D0%BF.png" width="80" height="80">'
            color = 'rgba(222,182,182,1)';
        }
        $('#mw-content-text').prepend(
            '<table style="width:98%; margin:3px auto; background:'+color+'; background:linear-gradient(to bottom, '+color+' 0%,rgba(255,255,255,0) 100%); background:-moz-linear-gradient(top, '+color+' 0%, rgba(255,255,255,0) 100%); background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,'+color+'), color-stop(100%,rgba(255,255,255,0))); background:-o-linear-gradient(top, '+color+' 0%,rgba(255,255,255,0) 100%); background:-ms-linear-gradient(top, '+color+' 0%,rgba(255,255,255,0) 100%)">'+
              '<tr>'+
                '<td style="width:130px"><center><img src="https://images.wikia.nocookie.net/boom-beach/ru/images/8/89/Wiki-wordmark.png" width="120" height="31"></center></td>'+
                '<td><center>'+text+'</center></td>'+
                '<td style="width:90px"><center>'+text2+'</center></td>'+
              '</tr>'+
            '</table>'
        );
    });
});