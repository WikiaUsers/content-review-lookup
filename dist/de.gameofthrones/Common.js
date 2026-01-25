/* JavaScript hier wird für alle Benutzer für jede Seite geladen. */

/*insert Username */

$(function UserNameReplace() {
  if ( typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace )
    return;
  $('span.insertusername').text(wgUserName);
});

window.SpoilerAlert = {
    pages: ["Jon Schnee", "Petyr Baelish"],
    question: 'Diese Seite enthält Spoiler. Möchten Sie sie trotzdem ansehen?',
    yes: 'Aber ja doch',
    no: 'Nein, noch nicht',
    isSpoiler: function () {
        return Boolean($('#spoiler').length);
    }
};

if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord-Server",
            id: "352431613532962818"
        }
    };
}
SpoilerAlert = {
    question: 'Diese Seite enthält aktuelle Spoiler der 7. Staffel. Möchtest Du sie trotzdem ansehen?',
    yes: 'Aber ja doch',
    no: 'Nein, noch nicht',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};