/* Any JavaScript here will be loaded for all users on every page load. */
/** Add MySandbox to Account Navigation in the Wikia skin **/
 
$(document).ready(function() {
    $('<li id="MySandbox"><a href="/wiki/Special:MyPage/sandbox">My&nbsp;Sandbox</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
});
 
$(document).ready(function() {
    if (mw.config.get('wgUserGroups') === null)
        $('<li id="YourSandbox"><a href="/wiki/Special:MyPage/sandbox">My&nbsp;Sandbox</a>  </li>').insertBefore('.contribute ul li:first-child');
});