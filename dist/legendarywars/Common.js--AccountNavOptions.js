/* <pre> */
/** Add MySandbox to Account Navigation in the Wikia skin **/

$(document).ready(function() {
    if ( skin == 'oasis' )
        $('<li id="MySandbox"><a href="/wiki/Special:Mypage/Sandbox">Sandbox</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
});

$(document).ready(function() {
    if ( skin == 'oasis' && wgUserGroups == null )
        $('<li id="YourSandbox"><a href="/wiki/Special:Mypage/Sandbox">Sandbox</a>  </li>').insertBefore('.sandbox ul li:first-child');
});

/* </pre> */


/* <pre> */
/** Add Mycommon.css to Account Navigation in the Wikia skin **/

$(document).ready(function() {
    if ( skin == 'oasis' )
        $('<li id="Mycommon.css"><a href="/wiki/Special:Mypage/common.css">My CSS</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
});

$(document).ready(function() {
    if ( skin == 'oasis' && wgUserGroups == null )
        $('<li id="Yourcommon.css"><a href="/wiki/Special:Mypage/common.css">My CSS</a>  </li>').insertBefore('.common.css ul li:first-child');
});

/* </pre> */


/* <pre> */
/** Add Mycommon.js to Account Navigation in the Wikia skin **/

$(document).ready(function() {
    if ( skin == 'oasis' )
        $('<li id="Mycommon.js"><a href="/wiki/Special:Mypage/common.js">My JavaScript</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
});

$(document).ready(function() {
    if ( skin == 'oasis' && wgUserGroups == null )
        $('<li id="Yourcommon.js"><a href="/wiki/Special:Mypage/common.js">My JavaScript</a>  </li>').insertBefore('.common.js ul li:first-child');
});

/* </pre> */