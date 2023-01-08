/* Any JavaScript here will be loaded for all users on every page load. */
 
 
// Insert username - from runsescape.wikia.com
$(function() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").text(wgUserName);
});

/* WikiActivity.js configuration */
window.rwaOptions = {
    autoInit:   true,//this line is not needed as "true" is already default
    limit:      50,//same here, only needed if a value other than 50 is desired
    namespaces: [
	    0,
	    1,
	    2,
	    3,
	    110,
	    111,
	    500,
	    501
	]
};