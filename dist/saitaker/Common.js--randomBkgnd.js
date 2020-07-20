/* Any JavaScript here will be loaded for all users on every page load. */

// Randomly select a background image each time any page is accessed

function RandomBkgnd()
{
// This function provides a random background to illustrate the wiki

// background array
	var bkgndArray = new Array(); 
	bkgndArray[0] = 'fullURLhere';

	var chosenBkgnd = Math.floor( Math.random() * bkgndArray.length );

	$("body").css("background-image",'url(' + bkgndArray[chosenBkgnd] + ')');
//	$("body").css("background-repeat",'repeat');
//	$("body").css("background-position",'left top');
}
addOnloadHook(RandomBkgnd);