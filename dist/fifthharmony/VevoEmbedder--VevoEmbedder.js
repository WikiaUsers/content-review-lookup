//<syntaxhighlight lang="javascript">
$(function(){
   var spans = document.getElementsByTagName("span");
   for (var index = 0; index < spans.length; index++) {
      if (spans[index].getAttribute("data-widget-id") && spans[index].getAttribute("style") && spans[index].getAttribute("class")) {
          if (spans[index].style.width && spans[index].style.height && spans[index].getAttribute("class")=="VevoVid") {
            spans[index].innerHTML = "<iframe width='" + spans[index].style.width + "' height='" + spans[index].style.height + "' src='http://cache.vevo.com/assets/html/embed.html?video=" + spans[index].getAttribute("data-widget-id") + "&autoplay=0' frameborder='0' allowfullscreen='true'></iframe>";
          }
      }
   }
});
//</syntaxhighlight>