/* Any JavaScript here will be loaded for all users on every page load. */

/* Random icon */
function RandomIcon() 
{
// This function provides a random icon to illustrate the wiki
 
// icon array 
	var iconArray = new Array(); 
	iconArray[0] = 'https://images.wikia.nocookie.net/__cb20120516082839/papakiki/images/6/64/Favicon.ico';
	iconArray[1] = 'https://images.wikia.nocookie.net/__cb20120516082361/papakiki/images/2/2a/Papakiki-j-logo-short-trans.ico';
	iconArray[2] = 'https://images.wikia.nocookie.net/__cb20120519070631/papakiki/images/9/94/Papakiki-j-favicon-single.ico';
	iconArray[3] = 'https://images.wikia.nocookie.net/papakiki/images/f/f6/Papakikitb-favicon.ico';
	iconArray[4] = 'https://images.wikia.nocookie.net/papakiki/images/c/c8/Papakikigame-favicon.ico';
 
// random icon choice
	var chosenIcon = Math.floor( Math.random() * iconArray.length );
 
// get current icon
        var icon = $('link[rel="shortcut icon"]'); 
 
// replace icon
        icon.replaceWith(icon.clone().attr('href', iconArray[chosenIcon]));
}
 
addOnloadHook(RandomIcon);