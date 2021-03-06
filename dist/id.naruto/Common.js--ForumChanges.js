/* Make various changes to the new forums */
 
jQuery(function($) {
    "use strict";
 
    // Tag users in the new forums
    // Orginal script (http://dev.wikia.com/wiki/MessageWallUserTags/code.js)
    // by User:RyaNayR (http://dev.wikia.com/wiki/User:RyaNayR)
    // this version by User:UltimateSupreme (http://naruto.wikia.com/wiki/User:UltimateSupreme)
 
    var users = {
        // Tag all bureaucrats
        Dimas_Rizward_H: 'Founder • Bureaucrat',
        Djolbiboy: 'Bureaucrat',
        Ihsan_Kun: 'Bureaucrat',
        Fate_Kage: 'Bureaucrat • Moderator',
 
        // Tag all sysops
        Afif_Brika: 'Sysop',
        Faisal_Ishak: 'Sysop',
         
        // Translators
        Wong_Kentir: 'Sysop • Translator',
 
        // Moderators (active only) - This would need some updating
        
    };
 
    $.each(users, function(name, v) {
        $('<span class="ForumTags"></span>')
            .text('(' + v + ')')
            .insertAfter($('a.subtle[href$="User_talk:' + name.replace(/(["])/g, '\\$1') + '"]'));
    });
 
    // Votes Tally Script
    // Works with [[Templat:VotesTally]]
    var supportNum = $(".support").length - $("div.quote .support").length - $(".SpeechBubble.message-removed .support").length + $(".SpeechBubble.message-removed .quote .support").length - 2,
        neutralNum = $(".neutral-vote").length - $("div.quote .neutral-vote").length - $(".SpeechBubble.message-removed .neutral-vote").length + $(".SpeechBubble.message-removed .quote .neutral-vote").length - 2,
        opposeNum = $(".oppose").length - $("div.quote .oppose").length - $(".SpeechBubble.message-removed .oppose").length + $(".SpeechBubble.message-removed .quote .oppose").length - 2,
        multiplier = 100 / (supportNum + neutralNum + opposeNum);
 
    $("#support_num").text(supportNum + (supportNum == 1 ? " vote" : " votes"));
    $("#neutral_num").text(neutralNum + (neutralNum == 1 ? " vote" : " votes"));
    $("#oppose_num").text(opposeNum + (opposeNum == 1 ? " vote" : " votes"));
 
    $("#support_bar").width(supportNum * multiplier + "%");
    $("#neutral_bar").width(neutralNum * multiplier + "%");
    $("#oppose_bar").width(opposeNum * multiplier + "%");
 
    // Add Edit Button for forum posts
    $('nav .edit-message').each(function() {
        $(this).closest('.buttons').prepend('<button class="secondary"><a href="#" accesskey="a" data-id="0" style="color:inherit; text-decoration:inherit;" class="edit-message">Edit</a></button>');
    });
 
    // Warning notice on the threads.
    $(".new-reply .MiniEditorWrapper").last().before("<small>Before posting, please ensure your reply complies with our <a href='/wiki/Forum policy'>Forum policies</a> and the <a href='http://www.wikia.com/Terms of Use'>Wikia TOU</a>. Posts in violation will be edited or removed.</small>");
 
    // Warning notice when posting new thread.
    $(".ForumNewMessage .heading").after("<small>Before posting a new thread, please check below in case the topic already exists. If it doesn't, create a new thread, but ensure it complies with our <a href='/wiki/Forum policy'>Forum policies</a>.");
 
    // Notice on top of threads to Requests page
    if (mw.config.get('wgNamespaceNumber') === 1201) {
        $("li.SpeechBubble").first().before(
            '<table class="box fillnotice colored bordered innerbordered type-nav cell-align-center sitenotice">' +
            '<td>Ada yang salah dengan topik ini dan butuh bantuan?' +
            '\nPermintaan kepada moderator dapat menuju: <a href="/wiki/Project:Permintaan Forum">halaman permintaan</a></td></table>'
        );
    }
 
});