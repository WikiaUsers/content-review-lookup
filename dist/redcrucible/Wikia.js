// Adds a Like and Share button below each article
$(document).ready(function(){
    if(wikiaPageType=="article") {
        $( 'body' ).prepend( '<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.0";fjs.parentNode.insertBefore(js, fjs);}(document, '+"'script', 'facebook-jssdk'));</script>")
        $( '#articleCategories' ).after( '<div clear="both" class="notice"><span style="float:right;"><span class="fb-like-box" data-href="https://www.facebook.com/RedCrucibleWiki" data-colorscheme="dark" data-show-faces="false" data-header="true" data-stream="false" data-show-border="true"></span></span><h3 style="color:white;">Like and Share this page</h3><br><div class="fb-like" data-href="http://redcrucible.wikia.com/wiki/' + wgPageName + '" data-layout="button" data-action="like" data-show-faces="false" data-share="true"></div></div>' )
    }
});

// Adds in Gamer ID (Template:Gamer ID)
$( document ).ready(function() {
if($( '#gamerID' )!=null) {
  var gamerID = $( '#gamerID' ).html();
  $( 'ul.details' ).prepend( gamerID );
  $( "div" ).remove( '#gamerID' );
}
});