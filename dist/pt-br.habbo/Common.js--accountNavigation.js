/* <pre> */

/** Add MyContributions to Account Navigation in the Wikia skin **/

hookEvent( 'load', addAccLinks );
function addAccLinks () {
    if ( skin == 'oasis' ) {
        $('<li id="MyContribs"><a href="/wiki/Special:MyContributions">Minhas&nbsp;contribuições</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
    }
}

/* </pre> */