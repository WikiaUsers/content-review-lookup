/* Blog rail module */
 $(function() {
    var newSection = '<section class="rail-module" id="blog-module"><h2 class="has-icon">' +
      '' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text=<bloglist summary="true" summarylength="10" timestamp="false" count="1"><type>bloglist</type><order>date</order><category>Blog posts</category></bloglist>&format=json', function(data) {
	    var code = data.parse.text['*'];
	    $('section#blog-module').append(code);
    });
    $(".rail-module .blog-listing__comment-count").css("float", "right");
    $(".rail-module .more").css("float", "right");
});

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