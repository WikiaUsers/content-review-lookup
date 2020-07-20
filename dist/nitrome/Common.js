/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

/* Spoiler code - hides pages in Category:Spoiler */
window.SpoilerAlert = {
    question: 'This page contains spoilers. Are you sure you want to read it?',
    yes: 'Yes, I am',
    no: 'No, not yet',
 isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    },
    back: true
};

//Imagemap edit link on file pages
importScriptURI('//toolserver.org/~dapete/ime/ime.js');

/* Discord siderail thingy (thanks KA :P) */
window.DiscordIntegratorConfig = {
    siderail: {
        title: "Nitrome Wiki Discord server",
        id: "173557750083747842",
        theme: "light"
    }
};