/* Опции */
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

/* Смайлы. */
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


/* ChatTags */
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');

// Wait until object will be in loaded or in scope.
var checkExist = setInterval(function() {
    if (typeof chatags === 'undefined') {
        return;
    }

    chatags.tags['wd'] = function(s,t) {  
        return (t.charAt(0) === '/') ? 
            s.replace('[/wd]', '</span>') :
            s.replace('[wd]', '<span style="font-family: Wingdings">');
    };
    clearInterval(checkExist);
}, 1000);