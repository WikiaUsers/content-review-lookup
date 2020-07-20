/* Any JavaScript here will be loaded for all users on every page load. */

/* Random icon */
function RandomIcon() 
{
// This function provides a random icon to illustrate the wiki

// icon array 
	var iconArray = new Array(); 
	iconArray[0] = 'https://images.wikia.nocookie.net/saitaker/images/6/64/Favicon.ico';
	iconArray[1] = 'https://images.wikia.nocookie.net/saitaker/images/b/b9/TakabayashiReiri.ico';
	iconArray[2] = 'https://images.wikia.nocookie.net/saitaker/images/e/eb/NanaseKyou.ico';
	iconArray[3] = 'https://images.wikia.nocookie.net/saitaker/images/2/23/NanaseKyouya.ico';
	iconArray[4] = 'https://images.wikia.nocookie.net/saitaker/images/8/85/SAI.ico';
	iconArray[5] = 'https://images.wikia.nocookie.net/saitaker/images/3/31/SAI-j-name-BW.ico';

// random icon choice
	var chosenIcon = Math.floor(Math.random() * (iconArray.length) );

// get current icon
        var icon = $('link[rel="shortcut icon"]'); 

// replace icon
        icon.replaceWith(icon.clone().attr('href', iconArray[chosenIcon]));
}

addOnloadHook(RandomIcon);