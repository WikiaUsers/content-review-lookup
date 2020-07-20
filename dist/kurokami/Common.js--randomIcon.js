/* Any JavaScript here will be loaded for all users on every page load. */

/* Random icon */
function RandomIcon() 
{
// This function provides a random icon to illustrate the wiki

// icon array 
	var iconArray = new Array(); 
	iconArray[0] = 'fullURLhere';
	iconArray[1] = 'fullURLhere';
	iconArray[2] = 'fullURLhere';
	iconArray[3] = 'fullURLhere';

// random icon choice
	var chosenIcon = Math.floor(Math.random() * (iconArray.length) );

// get current icon
        var icon = $('link[rel="shortcut icon"]'); 

// replace icon
        icon.replaceWith(icon.clone().attr('href', iconArray[chosenIcon]));
}

addOnloadHook(RandomIcon);