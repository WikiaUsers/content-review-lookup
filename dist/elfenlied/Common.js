/*Twitter*/
$(window).load(function() {
    $("#WikiaRail").append('<section class="rail-module twitter-modul"><a class="twitter-timeline" data-theme="dark" href="https://twitter.com/ElfenLiedWiki">Tweets by ElfenLiedWiki</a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></section>');
});

// ||===========|| //
// ||Rollenboxen|| //
// ||===========|| //

var messageWallUserTags = {
    'MidnaChan86': 'Administratorin',
    'TRon69-SAO': 'Administrator',
    'Snake-shake': 'Administrator',
    'GasaiYuno99': 'Administratorin'
    // erst Username  :  Text hinter Username
};
 
(function($) {
    for (var name in messageWallUserTags) {
        $('a.subtle[href$="Nachrichtenseite:' + name + '"]').after('<span style="color:white;background: -moz-linear-gradient(top, #0a0 25%, #070 75%); background: -webkit-linear-gradient(top, #780 25%, #460 75%);border-radius:10px;padding:2px 5px;font-size:9pt;font-weight:bold;vertical-align:top;">' + messageWallUserTags[name] + '</span>');
    }
}(jQuery));

/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 



if(mw.config.get('wgUserName')) {
    window.DiscordIntegratorConfig = {
        siderail: {
            title: "Discord-Server",
            id: "317996124273377280"
        }
    };
}