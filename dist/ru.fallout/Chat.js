importScriptPage ('MediaWiki:ChatOptions/code/ru.js', 'dev');

/*------------------------------------------------------------------------------*/
/* Окошко со смайликами в чат */
importStylesheetURI('https://korniux.wikia.com/wiki/SpeedEmoticon/style.css?action=raw&ctype=text/css');
 
$('.ChatWindow .Write').append('<div id="SpeedEmoticon"><img src="https://images1.wikia.nocookie.net/central/images/a/ac/Emoticon_laughing.png" style="border: none !important;"/></div>');
$('#SpeedEmoticon').append('<div id="poplist"></div>').mouseenter(function(){
        $('#poplist').css({             
                top: ($('#SpeedEmoticon').offset().top - $('#poplist').height() - 8),
                left: ($('#SpeedEmoticon').offset().left - $('#poplist').width() - 8)
            });
    });
$('#poplist').load('/ru/wiki/MediaWiki:Emoticons?action=render', function(){
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
    console.log('SpeedEmoticon v1.7');
});