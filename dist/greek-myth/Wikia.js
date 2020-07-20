importArticles({
    type: 'script',
    articles: [
        'u:dev:GiveChatModPrompt/code.js',
        'u:dev:ProfileTags.js'
    ]
});

function elementsToKill()
{
  var videoModule = getElementsByClassName(document, "section", "RelatedVideosModule")[0];
  killElement(videoModule);
}
addOnloadHook(elementsToKill);

$('.references-small').hide();
$('<span class="button onclick="toggleReflist()">Show</span>').insertBefore('.references-small');
 
function toggleReflist() {
$('.references-small').show(950);
}
.reference a:link {display:none;}
.reference a:hover {display:inline;}