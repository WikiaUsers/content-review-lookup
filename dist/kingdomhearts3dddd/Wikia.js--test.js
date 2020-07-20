// This is a proprietary JavaScript page
// created by the admins of Kingdom Hearts
// 3D: Dream Drop Distance Wiki and used 
// for testing purposes only. Please do
// not copy this page without the admin's
// consent.

/**
 * Filtering rights in the comments.
 * Parameters:
 ** users: Represents a user or a group of users to filter.
 ** rights: Represents a user right to add.
 * Available rights:
 ** Bureaucrats
 ** Administrators
 ** Chat Moderators
 ** Content Moderators
 ** Discussion Moderator
 ** Rollbackers
 ** Code Editors
 ** Patrollers
 */

function FilterComments(users, rights){
    var R = {
        'Bureaucrats': {
            rClass: 'bureaucrat',
            tName: 'Bureaucrat'
        },
        'Administrators': {
            rClass: 'admin',
            tName: 'Administrator'
        },
        'Chat Moderators': {
            rClass: 'chatmod',
            tName: 'Chat Moderator'
        },
        'Content Moderators': {
            rClass: 'contmod',
            tName: 'Content Moderator'
        },
        'Discussion Moderator': {
            rClass: 'discmod',
            tName: 'Discussion Moderator'
        },
        'Rollbackers': {
            rClass: 'rollback',
            tName: 'Rollback'
        },
        'Code Editors': {
            rClass: 'codeeditor',
            tName: 'Code Editor'
        },
        'Patrollers': {
            rClass: 'patroller',
            tName: 'Patroller'
        }
    };
    if (users.length && users instanceof Array){
        var B = $('#WikiaArticleComments > div'),
            C = B.find('.SpeechBubble');
        C.each(function(comment){
            var T = $(this),
                W = T.find('.edited-by [href*="/wiki/User:"]');
                if (users.indexOf(W.text()) > -1){
                    T.addClass(R[rights].rClass);
                    T.after(
                        $('<span>')
                        .addClass('comment-tag ' + R[rights].rClass + '-comment-tag')
                        .html(R[rights].tName)
                    );
                }
        });
    }
}

$(document).ready(function(){
    // Bureaucrats
    FilterComments('JjBlueDreamer1|CouncilOrg|Hypercane'.split('|'), 'Bureaucrats');
    // Administrators
    FilterComments('Ultimate Dark Carnage|Mikiu Hatsune|Kamiishiro|CommanderPeepers'.split('|'), 'Administrators');
    
    // Chat Moderators
    FilterComments('Freekingamer|Safaia Mukade|JigokuGernoid|Caring16|Dr.Blaze|DannyOltageBD'.split('|'), 'Chat Moderators');
});