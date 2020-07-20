/* Any JavaScript here will be loaded for all users on every page load. */
function fBox() {
	$('#fbox').append('<iframe src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2FBigHero6BotFight&amp;width&amp;height=290&amp;colorscheme=light&amp;show_faces=true&amp;header=true&amp;stream=false&amp;show_border=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:290px;" allowTransparency="true"></iframe>');

$.getJSON("http://www.telize.com/geoip?callback=?",
  function(json) {
    if (json.continent_code == 'AS') {
      $(".asia").removeClass("hide");
    }
    else
    {
      $(".usa").removeClass("hide");      
    }
  }
);

}
 
$(fBox);

function tBox() {
	$('#tbox').append('<iframe src="//bighero6game.gumi.sg/twitter.php" frameborder="0" show_border=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:310px;" allowTransparency="true"></iframe>');
}
$(tBox);

function iNsta() {
	$('#iNsta').append('<iframe src="//bighero6game.gumi.sg/instagram.php" frameborder="0" show_border=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:310px;" allowTransparency="true"></iframe><a class="linktoinsta" href="http://instagram.com/bh6botfight">@bh6botfight</a>');
}
$(iNsta);
$("#WikiaRail #WikiaSearch").after("<divclass='rcs-container'><table style='margin: 0 auto; width: 100%;' class='bhtable'><tbody><tr><th style='text-align: center;' colspan='3'><span>Facebook</span></th></tr></tbody></table><div id='fbox'></div><table style='margin: 0 auto; width: 100%;' class='bhtable'><tbody><tr><th style='text-align: center;' colspan='3'><span>Follow us on Twitter</span></th></tr></tbody></table><div id='tbox'></div><table style='margin: 0 auto; width: 100%;' class='bhtable'><tbody><tr><th style='text-align: center;' colspan='3'><span>Follow us on Instagram</span></th></tr></tbody></table><div id='iNsta'></div></div>");
$( ".bhtable" ).attr( "cellspacing", "0" );

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AjaxRC/code.js',
    ]
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
});