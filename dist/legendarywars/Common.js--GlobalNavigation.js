/* Add JS buttom to Account Navigation in the Wikia skin */

$(document).ready(function() {
    if ( skin == 'oasis' )
        $( 'FORM#WikiaSearch' ).prepend( '<li id="SWITCH"><a href="http://monsterwars.wikia.com/wiki/' + mw.config.get( 'wgPageName' ) + '" title="Switch to monster wars wiki"><img src="https://images.wikia.nocookie.net/legendarywars/images/b/b8/Switch_Buttom_LW2.png" alt="SWITCH"></a></li>' );

});