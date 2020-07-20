/* Any JavaScript here will be loaded for all users on every page load. */

if( typeof( CCPEVE ) === 'undefined' ) {
    /* Link was clicked out of game, so we can't really do anything useful */
}
else
{
    CCPEVE.requestTrust( "http://eveincursion.wikia.com/*" );
}

$( document ).ready( function() 
{
    $( document ).on( "click", "a[href^='#channel']", function(e) 
    {
        e.preventDefault();
        if( typeof( CCPEVE ) === 'undefined' ) {
            /* Link was clicked out of game, so we can't really do anything useful */
        }
        else
        {
            CCPEVE.joinChannel( $( this ).attr( "href" ).substring(9).replace("_", " ") );
        }
    });
});