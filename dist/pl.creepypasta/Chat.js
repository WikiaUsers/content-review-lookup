importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importScriptPage("MediaWiki:ChatEditTools/code.js", "dev");

//Zapożyczone z FNaF Wiki
var chatTopic = '<a href="/wiki/Creepypasta_Wiki:Zasady" target="_blank" title="Regulamin">Regulamin</a><br> <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Lista emotikon">Lista emotikon</a>';
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:Right; position:absolute; width:60%; z-index:0; font-size: 13px; color:whitesmoke; font-weight:bold; line-height:1.6; margin-left:90px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
});
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();

/**
 * !mods.js
 *
 * Ping all moderators present in chat
 * @author: [[w:User:Fubuki風吹]]
 */
 
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        var groups = mw.config.get('wgUserGroups').join(' ');
        if ((groups.indexOf('bureaucrat') + groups.indexOf('sysop') + groups.indexOf('chatmoderator') + groups.indexOf('helper') + groups.indexOf('vstf') + groups.indexOf('staff')) > -6) {
            $('.Chat').on('DOMNodeInserted', function(e) {
                var msg = $.parseHTML(e.target.innerHTML)[7];
                if (msg !== void 0 && msg.innerHTML.substr(0, 5) == '!mody') {
                    $('<audio>', {
                        id: 'mod-ping',
                        src: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
                        autoplay: true
                    }).appendTo('body');
                    setTimeout(function() {
                        if ($('#mod-ping').length) $('#mod-ping').remove();
                    }, 1000);
                }
            });
        }
    }
});
//