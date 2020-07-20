/* <pre> */
/** Add MyContributions to Account Navigation in the Wikia skin **/

$(document).ready(function() {
    $('<li id="MyContribs"><a href="/wiki/Especial:MisContribuciones">My&nbsp;contributions</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
});

$(document).ready(function() {
    if (mw.config.get('wgUserGroups') === null)
        $('<li id="YourContributions"><a href="/wiki/Especial:MisContribuciones">Mis&nbsp;contribuciones</a>  </li>').insertBefore('.contribute ul li:first-child');
});

/* </pre> */