// ✓ Format checked! Intro, ToC, notes, sections, headings, lines, and tabs.

// This is where all the local chat JavaScript is stored.

/*************************************************/
/*************** TABLE OF CONTENTS ***************/
/**************************************************
TABLE OF CONTENTS
MAIN CODE
    IMPORTS
    CONFIGURATIONS

/*************************************************/
/******************* MAIN CODE *******************/
/*************************************************/
// IMPORTS
importArticles({
    type: "script",
    articles: [
        "u:dev:BlinkingTabAlert.js",
        "u:dev:ChatAnnouncements/code.js",
        "u:dev:ChatHacks.js",
        "u:dev:ChatImages/code.js",
        "u:dev:ChatSendButton.js",
        "u:dev:ChatTags/code.js",
        "u:dev:ChatUserPageButton.js",
        "u:dev:EmoticonsWindow/code.js",
        "u:dev:ExtendedPrivateMessaging/code.js",
        "u:dev:IsTyping/code.js",
        "u:dev:Tictactoe/code.js", // Type !ticstart to play
    ]
});

// CONFIGURATIONS
chatAnnouncementsAll = true;
chatAnnouncementsAnonymous = true;
window.ChatHacksNoStar = true;
window.ChatHacksPingSound = "https://rawcdn.githack.com/climbTheStairs/storage/2fabac86ce3bab54e6d9fb0f5edbf91bc8b0ec61/ping.mp3";