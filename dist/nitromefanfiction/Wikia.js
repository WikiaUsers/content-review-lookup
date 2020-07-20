/* Sister wikis */
/* $( function () {
 
    if ( mw.config.get( 'wgTitle' ) !== 'Sisterwikis' ) {
 
        $.get( '/api.php?action=parse&text={{Sisterwikis}}&format=json', function ( data ) {
            $( '.WikiaRail' ).append( data.parse.text[ '*' ] );
        } );
 
    }
} );
 
/* Social buttons */
 
//http://community.wikia.com/wiki/User_blog:BertH/Showcase_your_community's_content_by_sharing
 
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark"
};
importScriptPage('SocialIcons/code.js','dev');
 
/* Temporary fix for talk page comments bug */
if ($('.wikia-button.comments.secondary').attr('href') == '#WikiaArticleComments' && skin == 'oasis') {
    $(document).ready(function() {
        $('.wikia-button.comments.secondary').attr('href', '/wiki/Talk:' + wgPageName).html($('.wikia-button.comments.secondary').html().replace('Comments', 'Discussion'))
    })
}
/* Auto-refresh wikia activity & recent changes */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:WikiActivity","Special:RecentChanges"];
importScriptPage('AjaxRC/code.js', 'dev');
/*Clock */
importScriptPage('DisplayClock/code.js', 'dev');
/*Clock code ends */

/* Greetings - MW */
importArticles({ type: 'script', articles: [ 'u:dev:WallGreetingButton/code.js', //Adds Wall Greeting Edit Button
] });