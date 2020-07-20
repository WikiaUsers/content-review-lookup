importArticles({
    type: 'script',
    articles: [
        'w:c:dev:ReferencePopups/code.js',
    ]
});

var SocialMediaButtons = { 
        position: "top",
        colorScheme: "color",
        buttonSize: "default",
        wikiTwitterAccount: "LittleMixWiki"
};
importScriptPage('SocialIcons/code.js','dev');


/* Apester Polls */
$(function(){
   var spans = document.getElementsByTagName("span");
   for (var index = 0; index < spans.length; index++) {
      if (spans[index].getAttribute("data-widget-id") && spans[index].getAttribute("class")) {
        outerLoop:
        switch (spans[index].className) {
            case "Roar":
                spans[index].innerHTML = '<iframe style="width: inherit; height: inherit;" src="//renderer.qmerce.com/interaction/' + spans[index].getAttribute("data-widget-id") + '/" frameborder="0" scrolling="no"></iframe>';
                break outerLoop;
            default:
                break outerLoop;
        }
      }
   }
});