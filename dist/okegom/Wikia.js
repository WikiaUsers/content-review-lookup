
/* Change the wiki's header randomly */

$(function changeHeader() {
	var header = [
		'https://vignette.wikia.nocookie.net/okegom/images/1/14/Wiki-header-1.png',
		'https://vignette.wikia.nocookie.net/okegom/images/8/8d/Wiki-header-2.png',
		'https://vignette.wikia.nocookie.net/okegom/images/d/dd/Wiki-header-3.png',
		'https://vignette.wikia.nocookie.net/okegom/images/f/fb/Wiki-header-4.png',
		'https://vignette.wikia.nocookie.net/okegom/images/b/b9/Wiki-header-5.png'
	];
	
	var selectedHeader = header[Math.floor(Math.random() * header.length)];
	var headerTarget = document.querySelectorAll(".wds-community-header");
	
	headerTarget[0].style.backgroundImage = 'url(' + selectedHeader + ')';

});

/* Change the Mogeko March prompt text */

// Change the text with the "mm-prompt-text" id based on the current day
// of the month. This will be used in Mogeko March event schedule in the
// What's New? section.

$(function updatePromptText()
{
	var day = new Date().getDate();
	var promptText = "blank";
	switch(day)
	{
		case 1:
			promptText = "Mogeko Castle";
			break;
		case 2:
			promptText = "The Gray Garden";
			break;
		case 3:
			promptText = "Wadanohara and the Great Blue Sea";
			break;
		case 4:
			promptText = "Obsolete Dream";
			break;
		case 5:
			promptText = "Ice Scream";
			break;
		case 6:
			promptText = "Seaside Dispatches";
			break;
		case 7:
			promptText = "Scene/Comic/Art Redraw";
			break;
		case 8:
			promptText = "Favorite God";
			break;
		case 9:
			promptText = "Favorite Devil";
			break;
		case 10:
			promptText = "Favorite Angel";
			break;
		case 11:
			promptText = "Favorite Demon";
			break;
		case 12:
			promptText = "Favorite Human";
			break;
		case 13:
			promptText = "Favorite Animal";
			break;
		case 14:
			promptText = "Favorite Ship";
			break;
		case 15:
			promptText = "Favorite Witch/Wizard";
			break;
		case 16:
			promptText = "Favorite Youkai";
			break;
		case 17:
			promptText = "Favorite Undead";
			break;
		case 18:
			promptText = "Favorite Family";
			break;
		case 19:
			promptText = "Beach Day";
			break;
		case 20:
			promptText = "Maid Outfit";
			break;
		case 21:
			promptText = "Covered in Blood or Paint";
			break;
		case 22:
			promptText = "Lolita Fashion";
			break;
		case 23:
			promptText = "Genderbend";
			break;
		case 24:
			promptText = "Lunch Time";
			break;
		case 25:
			promptText = "Clothes Swap";
			break;
		case 26:
			promptText = "Species Swap";
			break;
		case 27:
			promptText = "Alternate Color Palette";
			break;
		case 28:
			promptText = "Alternate Universe";
			break;
		case 29:
			promptText = "Favorite Deep-Sea Vtuber";
			break;
		case 30:
			promptText = "Funaghost";
			break;
		case 31:
			promptText = "All Time Favorite Character";
			break;
		default:
			promptText = "Unknown";
	}
	
	document.getElementById("mm-prompt-text").innerHTML = promptText;
});


/* Modernize the BackToTop button */
window.BackToTopModern = true;