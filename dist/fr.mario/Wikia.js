if(mw.config.get('wgUserName')) 
window.DiscordIntegratorConfig = {
        siderail: {
            title: "Serveur Discord",
            id: "311034991960129537"
        }
    };
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Wikia.js/userRightsIcons.js'
    ]
});
 
function elementsToKill()
{
  var videoModule = getElementsByClassName(document, "section", "RelatedVideosModule")[0];
  killElement(videoModule);
}
addOnloadHook(elementsToKill);