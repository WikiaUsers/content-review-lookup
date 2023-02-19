/* Подтверждение выдачи модерки в чате */
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:GiveChatModPrompt/code.js',
        // ...
    ]
} );


/* !mods */
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!mods/code.js',
        // ...
    ]
} );


/* !kick on Russian (author Fubuki風吹, translate Черный оругец */
/*
 * @author: [[w:User:Fubuki風吹]]
*/
 
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        var groups = mw.config.get('wgUserGroups'),
            absentMessage = window.absentMessage || '<user> не в чате. Невозможно удалить.';
        if (groups.indexOf('sysop') > -1 ||
           groups.indexOf('bureaucrat') > -1 ||
           groups.indexOf('chatmoderator') > -1
           ) {
            $('[name="message"]').keydown(function(e) {
                if (e.which == 13 &&
                   $(this).val().substr(0, 5) == '!kick'
                   ) {
                    var user = $(this).val().substr(6), users = [], last = $('.Chat li').last().attr('data-user');
                    $('.WikiChatList .User').each(function() {
                        users.push($(this).attr('data-user'));
                    });
                    if (users.indexOf(user) == -1) {
                        $('.Chat ul').append('<li id="entry-sp" class="inline-alert">' + absentMessage.replace('<user>', user) + '</li>');
                        if (!last) {
                            $('.inline-alert').last().addClass('continued');
                        }
                    }
                    mainRoom.kick({
                        name: user
                    })
                    $(this).val('');
                }
            });
        }
    }
});
//