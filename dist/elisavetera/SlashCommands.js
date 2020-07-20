// Courtesy of Static Whisper

var commands = {
    // ...
    '/sc': '[[Special:Contact| To contact staff]] <',
    '/sc-name': '[[Special:Contact/rename-account| To change your username]] <',
    '/sc-bug': '[[Special:Contact/bug| To report a bug]] <',
    '/sc-feedback': '[[Special:Contact/feedback| To give feedback]] <',
    '/sc-g': '[[Special:Contact/general| To contact staff about something not listed]] <',
    '/h': '[[Help:Contents| Help Pages]] <',
    '/h-template': '[[Help:Templates| Help with templates]] <',
    '/h-infobox': '[[Help:Infoboxes| Help with infoboxes]] <',
    '/h-tables': '[[Help:Tables| Help with tables]] <',
    '/h-audio': '[[Help:Audio | Help with audio]] <',
    '/h-pjs': '[[Help:Personal_CSS_and_JS| Help with Personal CSS and JS]] <',
    '/h-wt': '[[Help:Wikitext| Help with Wikitext]] <',
    '/s-newwiki': '[[Special:Newwikis| To find a wiki]] <',
    '/s-ur': '[[Special:UserRights| To change a user\'s rights]] <',
    '/s-wa': '[[Special:WikiActivity| WikiActivity]] <',
    '/s-rc': '[[Special:RecentChanges| RecentChanges]] <',
    '/s-logs': '[[Special:Log| Logs]] <',
    '/s-msgs': '[[Special:AllMessages| All System Messages]] <',
    '/s-bl': '[[Special:ChatBanList| Chat Ban List]] <',
    '/em': '[[MediaWiki:Emoticons| Emoticons]] <',
    '/cjs': '[[MediaWiki:Common.js| Common.js]] <',
    '/ccss': '[[MediaWiki:Common.css| Common.css]] <',
    '/chjs': '[[MediaWiki:Chat.js| Chat.js]] <',
    '/my': '[[Special:MyPage| Your page]] <',
    '/my-commoncss': '[[Special:MyPage/common.css| Personal common.css]] <',
    '/my-commonjs': '[[Special:MyPage/common.js| Personal common.js]] <',
    '/my-globalcss': '[[Special:MyPage/global.css| Personal global.css]] <',
    '/my-globaljs': '[[Special:MyPage/global.js| Personal global.js]] <',
    '/my-chatjs': '[[Special:MyPage/chat.js| Personal chat.js]] <',
    '/vstf': '[[w:c:vstf| To report spam or vandalism to VSTF]] <',
    '/vstf-irc': '[[w:c:vstf:VSTF_Wiki:IRC| VSTF IRC Channel]] <',
    '/vstf-pol': '[[w:c:vstf:Policies| Read VSTF Policies]] <',
    '/vstf-wiki': '[[w:c:vstf:Report:wiki| To report a wiki]] <',
    '/tou': '[[w:c:wikia:Terms_of_Use| Terms of Use]] <',
    '/cg': '[[Project:Chat_Guidelines| Chat Guidelines]] <'
};
 
$('textarea[name="message"]').keydown(function(e) {
    if (e.which === 13) {
        for (var command in commands) {
            if (($(this).val().toLowerCase() === command) && ($(this).val().substring(0,1).match(/\//))) {
                e.preventDefault();
                $(this).val(commands[command]);
                $(this).trigger({
                    type: 'keypress',
                    which: 13
                });
            }
        }
    }
});