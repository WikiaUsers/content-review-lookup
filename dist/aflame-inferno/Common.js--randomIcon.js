/* Any JavaScript here will be loaded for all users on every page load. */

/* Random icon */
function RandomIcon() 
{
// This function provides a random icon to illustrate the wiki

// icon array 
	var iconArray = new Array(); 
	iconArray[0] = 'https://images.wikia.nocookie.net/aflame-inferno/images/0/09/Wikiacities-Favicon.ico';
	iconArray[1] = 'https://images.wikia.nocookie.net/aflame-inferno/images/c/c1/Wikia-2009-favicon.ico';
	iconArray[2] = 'https://images.wikia.nocookie.net/aflame-inferno/images/3/37/Wikia-2010-favicon.ico';
	iconArray[3] = 'https://images.wikia.nocookie.net/aflame-inferno/images/1/11/Wikia-2011-favicon.ico';
	iconArray[4] = 'https://images.wikia.nocookie.net/aflame-inferno/images/4/46/Wikia-2012-favicon.ico';
	iconArray[5] = 'https://images.wikia.nocookie.net/aflame-inferno/images/1/1d/Wikia-CommunityCentral-Favicon.ico';

// random icon choice
	var chosenIcon = Math.round(Math.random() * (iconArray.length - 1));

// get current icon
        var icon = $('link[rel="shortcut icon"]'); 

// replace icon
        icon.replaceWith(icon.clone().attr('href', iconArray[chosenIcon]));
}

addOnloadHook(RandomIcon);