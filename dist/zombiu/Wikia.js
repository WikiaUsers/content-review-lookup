// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');
// END Additional UserRights Icons in profile mastheads
importScriptPage ('FloatingToc/code.js', 'dev');
importScriptPage( 'FastDelete/code.js', 'dev' );
importScriptPage('DisableArchiveEdit/code.js', 'dev');
importScriptPage('ArchiveTool/code.js', 'dev');
importScriptPage('BackToTopButton/code.js', 'dev');
importScriptPage('InactiveUsers/code.js', 'dev');
InactiveUsers = { months: 2 };
importArticles({
    type: "script",
    articles: [
        'w:c:dev:ReferencePopups/code.js',
        'w:c:fang:AJAX Auto-refresh/code.js',
        'w:c:dev:RevealAnonIP/code.js',
        'w:c:dev:SignatureCheck/code.js',
        'w:c:dev:DISPLAYTITLE/code.js',
        'w:c:dev:VisualSpellCheck/code.js',
        'w:c:dev:Countdown/code.js'
    ]
});

//Get rid of disgusting popup image uploader, credit to call of duty wiki
$(".upphotos").click(function linkToUploader() {
   window.location.href='http://callofduty.wikia.com/wiki/Special:Upload';
});