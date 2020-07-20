/* Any JavaScript here will be loaded for all users on every page load. */

SpoilerAlert = {
  'class': "Spoiler",
};

batchDeleteDelay = 600;

importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.2.js",
        "u:dev:MediaWiki:AjaxBatchDelete/code.2.js",
        "u:dev:TimedSlider/code.js",
    ]
});

/* Adds a JS button to the Admin Dashboard */
var editURL;
$("#AdminDashboardGeneral .control-section.wiki .controls").prepend('<li class="control" data-tooltip="Customize your wiki with local JS."><a href="/wiki/MediaWiki:Common.js?action=edit" class="set"><span class="representation"><span class="specialjstool"><img src="http://www.freedomjs.org/img/nodejs.png" alt="JS" height="50" width="50"> </span></span>JavaScript</a></li>');

/* Insert the Discord Widget on the <div id="DiscordWidget> and the <span class="DiscWidgetHor"> with a   horizontal aspect */
$("#DiscordWidget .DiscWidgetHor").append('<iframe src="https://discordapp.com/widget?id=99592296034476032&theme=dark" width="716px" height="480px" allowtransparency="true" frameborder="0"></iframe>');

/* Insert the Discord Widget on the <div id="DiscordWidget> and the <span class="DiscWidgetHor"> with a   vertical aspect */
$("#DiscordWidget .DiscWidgetVert").append('<iframe src="https://discordapp.com/widget?id=99592296034476032&theme=dark" width="300px" height="430px" allowtransparency="true" frameborder="0"></iframe>');

/* Insert the Discord Widget on the <div id="DiscordWidget> and the <span class="DiscWidgetHor"> with a   100% size */
$("#DiscordWidget .DiscWidget").append('<iframe src="https://discordapp.com/widget?id=99592296034476032&theme=dark" width="100%" height="100%" allowtransparency="true" frameborder="0"></iframe>');