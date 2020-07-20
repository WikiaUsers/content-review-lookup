/* Add Switch buttom to Account Navigation in the Wikia skin */

$(document).ready(function() {
    if ( skin == 'oasis' )
        $( '#GlobalNavigation' ).prepend( '<li id="SWITCH"><a href="http://legendarywars.wikia.com/wiki/' + mw.config.get( 'wgPageName' ) + '" title="Switch to legendary wars wiki"><img src="https://images.wikia.nocookie.net/monsterwars/images/5/59/Switch_Buttom_MW2.png" alt="SWITCH"></a></li>' );

});