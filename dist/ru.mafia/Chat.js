// ####################################### //
// ### Код чата                        ### //
// ### Version 1.1                     ### //
// ####################################### //
/* чат-теги */
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
 
/* Объявления */
chatAnnouncementsAll = true;
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');
 
/* Смайлики */
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
// ####################################### //
// ####################################### //
// ####################################### //