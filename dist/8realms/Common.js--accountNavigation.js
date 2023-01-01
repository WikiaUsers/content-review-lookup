/* <pre> */
/** Add MyContributions to Account Navigation in the Wikia skin **/

$(document).ready(function() {
    if ( skin == 'oasis' )
        $('<li id="MyContribs"><a href="/wiki/Special:MyContributions">My&nbsp;contributions</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
});

$(document).ready(function() {
    if ( skin == 'oasis' && wgUserGroups == null )
        $('<li id="YourContributions"><a href="/wiki/Special:MyContributions">My&nbsp;contributions</a>  </li>').insertBefore('.contribute ul li:first-child');
});

/* </pre> */