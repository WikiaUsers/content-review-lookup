// Wall-UserTags
var messageWallUserTags = {
    'Angellore': 'Administrator',
    'Medusa78': 'Administratorin',
    'Solaia': 'Administratorin',
    'Law of Royale': 'Wiki-Moderator'
};
 
(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Nachrichtenseite:' + name + '"]').after('<span style="color:#FFFFFF;background:#a7d184;border-radius:1em;padding:1px 5px;margin-left:1px;font-size:85%;font-weight:bold;vertical-align:top;">' + messageWallUserTags[name] + '</span>');
    }
}(jQuery));

if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord-Server",
            id: "295218113618903040"
        }
    };
}