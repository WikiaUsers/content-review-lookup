/* Any JavaScript here will be loaded for all users on every page load. */

// Randomly select a background image each time any page is accessed

function RandomBkgnd()
{
// This function provides a random background to illustrate the wiki

// background arraw
	var bkgndArray = new Array(); 
	bkgndArray[0] = 'https://images.wikia.nocookie.net/__cb20120519083402/papakiki/images/5/50/Wiki-background';
	bkgndArray[1] = 'https://images.wikia.nocookie.net/__cb20120519073508/papakiki/images/c/c6/Papakiki_bg_O-2-trans.gif';
	bkgndArray[2] = 'https://images.wikia.nocookie.net/__cb20120517104729/papakiki/images/4/42/Papakiki-bg-2-trans-2.gif';
	bkgndArray[3] = 'https://images.wikia.nocookie.net/papakiki/images/d/de/Papakiki-main-bg-trans-flat.gif';
	var chosenBkgnd = Math.floor( Math.random() * bkgndArray.length );

	$("body").css("background-image",'url(' + bkgndArray[chosenBkgnd] + ')');
}

addOnloadHook(RandomBkgnd);