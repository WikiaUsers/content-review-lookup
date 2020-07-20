importArticles({
	type: 'script',
	articles: [
        "u:dev:FloatingToc/code.js", /* Floating TOC */
        "u:scripts:Content/SpoilersToggle.js", /* Spoilers by User:Tierre; from Dragon Age Wiki @ w:c:dragonage:Help:Spoilers */
        "MediaWiki:Common.js/slider.js" /* "Slider" header for main page */
	]
});

/* sidebar */
$(document).ready(function() {
    var newSection = '<section id="activities" class="module"><h1>' +
      'What is New?' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Specials}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
});

/* Spoiler alert */
window.SpoilerAlert = {
    isSpoiler: function () {
        return -1 != $.inArray('Spoiler', wgCategories);
    }
};
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:SpoilerAlert/code.js',
    ]
});
 
/*User Tags*/
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};
 
UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the Wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

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