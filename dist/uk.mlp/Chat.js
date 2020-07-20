// ###################################### //
// ### Код чату Дружба — це диво Вікі ### //
// ### Version 1.4                    ### //
// ###################################### //
/* Шапка чату */
var headline_styles = 'display: inline-block; width: 300px; font-size: 12px; text-align: center; line-height: 14px; padding: 7px 0; font-weight: #006CB0; color: #3A3A3A; position: absolute; right: 160px;';  
var headline_bar = '<div style="' + headline_styles + '">Ласкаво просимо до чату «Дружба — це диво Вікі»!</br><a href="/wiki/Дружба_—_це_диво_Вікі:Правила_чату" target="_blank">Правила</a> — <a href="/wiki/Special:Forum" target="_blank">Форум</a> — <a href="/wiki/MediaWiki:Emoticons" target="_blank">Смайли</a></div>';;
$('.ChatHeader > .wordmark').append(headline_bar);
 
/* Смайли */
// SpeedEmoticon.js
// Code: KORNiUX
// Additional help: Wildream, Set440, rutes community
// Hosted on "KORNiUX's HUGE SANDBOX WIKI"
importStylesheetURI('http://korniux.wikia.com/wiki/SpeedEmoticon/style.css?action=raw&ctype=text/css');
 
$('.ChatWindow .Write').append('<div id="SpeedEmoticon"><img src="https://images.wikia.nocookie.net/central/images/a/ac/Emoticon_laughing.png" style="border: none !important;"/></div>');
$('#SpeedEmoticon').append('<div id="poplist"></div>').mouseenter(function(){
        $('#poplist').css({             
                top: ($('#SpeedEmoticon').offset().top - $('#poplist').height() - 8),
                left: ($('#SpeedEmoticon').offset().left - $('#poplist').width() - 8)
            });
    });
$('#poplist').load('/wiki/MediaWiki:Emoticons?action=render', function(){
    $('#SpeedEmoticon a').each(function() {
        $(this).after('<img src="' + $(this).attr('href') + '"/>');
        $(this).remove();
    });
    $('#poplist img').click(function(){
        var txt = $(this).parent().children('ul').children('li:first-child').text().replace(/\s/g, ''),
            messg = $('.message textarea').val();
        $('.message textarea').val(messg + txt + ' ').focus();
    });
    $('#poplist div').attr('style', '');
    console.log('SpeedEmoticon v1.7')
});
// ###################################### //
// ###################################### //
// ###################################### //