/* Custom username hilite (goodbye intervals!/bringing this back for fixing 'cause Wikia don't like us using "Intervals") */
/* by Cod4 */

/* Listen for new messages and update hilite for each incoming message */
window.mainRoom.socket.bind('chat:add', function(message) {
    var name = getName(message);
    element = $('.Chat').first().find('ul').children().last().find('.username');
    updateHighlight(element, name);
});
 
/* Listen for new user joins and update hilite on the userlist accordingly */
window.mainRoom.socket.bind('join', function(message) {
    var name = getName(message);
    /* Loop around userlist to find appropriate element */
    $('#WikiChatList').find('li.User').each(function() { 
        if ($(this).attr("data-user") == name) {
            updateHighlight($(this).find('span.username'), name);
        }
    });
});
 
/* Listen for user status changes and keep user highlight on the userlist */
window.mainRoom.socket.bind('updateUser', function(message) {
    var name = getName(message);
    if (name == mw.config.get('wgUserName')) {
        updateYourHighlight();
    }
    else {
        $('#WikiChatList').find('li.User').each(function() { 
            if ($(this).attr("data-user") == name) {
                updateHighlight($(this).find('span.username'), name);
            }
        });
    }
});
 
/* Get a username from a chat event to use */
function getName(messageData) {
    var userData = new models.User();
    userData.mport(messageData.data);
    return userData.get('name');
}
 
/* Function to update your highlight at the upper right */
function updateYourHighlight() {
    var headerUserElement = $('#ChatHeader').find('div.User').find('span.username');
    updateHighlight(headerUserElement, mw.config.get('wgUserName'));
}

/* function to add highlight class without needing regex. */
/* add usernames in the same format as necessary. */
function updateHighlight(element, name) {
    switch(name) {
        /* Bureaucrats */
        case 'Killer365':
        case 'Superluigi6':
        case 'Pearl is awsome':
        case 'Sharayna':
            element.addClass('bureaucrat').removeClass('chat-mod');
            break;
        /* Admins */
        case 'AwesomeSteven':
        case 'ThePK':
        case 'LarsMars':
        case 'Vogel100':
        case 'Lilduders':
            element.addClass('admin').removeClass('chat-mod');
            break;
        /*Support Admins
        case 
            element.addClass('supadmin').removeClass('chat-mod');
            break;*/
        /* Bots */
        case 'StevenBot':
        case 'GarnetBot':
        case 'KPehT':
        case 'Polymorphic Sentient Bot':
        case 'SapphireBot':
        case 'Holographic Pearl':
            element.addClass('bot').removeClass('chat-mod');
            break;
        /* VSTF */
        case 'Callofduty4':
        case 'Cyanide3':
        case 'Ajraddatz':
        case 'Yatalu':
        case 'RansomTime':
            element.addClass('vstf').removeClass('chat-mod');
            break;
        /* Chat Mods */
        case 'Poorle':
        case 'JinxBinx':
        case 'Alcana':
        case 'Strong In The Real Way':
        case 'AwesomePeridot':
        case 'Sticks the Badger':
        case '50000cal':
            element.addClass('chatmod').removeClass('chat-mod');
            break;
        /* Rollbackers */
        case 'Perlen297':
        case 'Ylimegirl':
            element.addClass('rollback');
            break;
        /* Moderators */
        case 'Judgekoo':
        case 'Aqualad124':
            element.addClass('moderator');
            break;
    }
}

/* update your username and the existing userlist when you join chat */
updateYourHighlight();
$('#WikiChatList').find('li.User').each(function() { 
    console.log('Updating ' + $(this).attr("data-user"));
    updateHighlight($(this).find('span.username'), $(this).attr("data-user"));
});