// Add Twitter timeline to sidebar by King Dragonhoff from boombeach.wikia.com
$(window).load(function() {
     $('.ChatModule').after('<section class="module" id="twittermodule"><a class="twitter-timeline" href="https://twitter.com/Boom_Beach_Wiki" data-widget-id="449282395200438272">Tweets by @Boom_Beach_Wiki</a></section>');
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
});