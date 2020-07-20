var SocialMediaButtons = { 
	position: "bottom",
	colorScheme: "color",
	buttonSize: "default",
        wikiTwitterAccount: "care2_explain"
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:SocialIcons/code.js',
        'MediaWiki:Wikia.js/userRightsIcons.js'
    ]
});

function elementsToKill()
{
  var videoModule = getElementsByClassName(document, "section", "RelatedVideosModule")[0];
  killElement(videoModule);
}
addOnloadHook(elementsToKill);