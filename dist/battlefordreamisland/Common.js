/* Any JavaScript here will be loaded for all users on every page load. */

/* Dedicated to [[User:Nadiya2000]] */
addOnloadHook(function () {
    var url = wgServer + wgScriptPath + '/api/v1/User/Details?ids=3427444';
    $.getJSON( url, function( data ) {
        $("span.Cloudy176_edit_count").html(data.items[0].numberofedits);
    } );
});


// Replaces {{USERNAME}} with the name of the user browsing the page
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
// End of the {{USERNAME}} replacement