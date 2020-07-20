/*Javascript for the Wikia skin */
// if youre looking for profile tags it's at
//          MediaWiki:ProfileTags
// save yourself five minutes of struggle next time ye
 
window.InactiveUsers = { months: 4 };
 
window.SpoilerAlert = {
    question: 'This page contains spoilers. Are you sure you want to read it?',
    yes: 'Yes, I am',
    no: 'No, not yet',
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};

// Apre la chat in una nuova scheda anziché in una nuova finestra
 
$("div.chat-join button").remove();
$("div.chat-join").append('<a href="http://animalcrossing.wikia.com/wiki/Special:Chat" target="_blank"><button type="button">Join the Chat</button></a>');
$("#WikiaRail > section.ChatModule.module > div > div.chat-join > button").remove();
$("#WikiaRail > section.ChatModule.module > div > div.chat-join").append('<a href="http://animalcrossing.wikia.com/wiki/Special:Chat" target="_blank"><button type="button" data-msg-id="chat-join-the-chat">Join the Chat</button></a>');