// Add Twitter timeline to sidebar by King Dragonhoff from boombeach.wikia.com
$(window).load(function() {
     $('.ChatModule').after('<section class="module" id="twittermodule"><a class="twitter-timeline"  href="https://twitter.com/RoyaleWiki" data-widget-id="688424037366788096">Tweets von @RoyaleWiki </a></section>');
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
});