/*Sidebar*/
 
$(function() {
    var newSection = '<section id="activities" class="module"><h2>' +
      '' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text=<bloglist summary="true" summarylength=20 timestamp="true" count=2 ><type>bloglist</type><order>date</order><category>Blog posts</category></bloglist>&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#activities').append(code);
    });
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