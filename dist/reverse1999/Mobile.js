/* All JavaScript here will be loaded for users of the mobile site */
mw.loader.load('https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=Countdown/code.js');
mw.loader.load('https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:MultipleFileDelete/code.js');
importArticles({
    type: 'script',
    articles: [
        'u:dev:ReferencePopups/code.js',
        'u:dev:OggPlayer.js',
        'u:dev:Countdown/code.js',
        'u:dev:UploadMultipleFiles.js',
        'u:dev:DiscordIntegrator/code.js',
        'u:dev:DisplayTimer/code.js',
        'u:dev:Tooltips.js',
        'u:dev:MultipleFileDelete/code.js',
        'u:dev:MapsExtended.js'
    ]
});