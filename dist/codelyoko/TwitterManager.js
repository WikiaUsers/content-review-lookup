$(function(){
   var useTwitter = false;
   var useTwitter2 = false;
   var spans = document.getElementsByTagName("span");
   for (var index = 0; index < spans.length; index++) {
      if (spans[index].getAttribute("data-widget-id")) {
          if (spans[index].getAttribute("class")) {
              if (spans[index].getAttribute("class")=="twitterFeed") {
                useTwitter = true;
                spans[index].innerHTML = '<a class=\"twitter-timeline\" data-widget-id=\"' + spans[index].getAttribute("data-widget-id") + '\"></a>';
              }
              if (spans[index].getAttribute("class")=="twitterFeed2") {
                useTwitter2 = true;
                spans[index].innerHTML = '<a data-height="800" data-theme="dark" class=\"twitter-timeline\" href=\"' + spans[index].getAttribute("data-widget-id") + '\"></a>';
              }
          }
      }
   }
   if (useTwitter===true) {
      !function(d,s,id){ var js, fjs=d.getElementsByTagName(s)[0]; if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
   }
   if (useTwitter2===true) {
      $.getScript("https://platform.twitter.com/widgets.js", function(){
          console.log("");
      });
   }
});