/* Any JavaScript here will be loaded for all users on every page load. */

/* Random logo */
function RandomLogo() 
{
// This function provides a random logo (Monobook) or wordmark (Oasis) to illustrate the wiki

// logo array (Monobook)
	var logoArray = new Array(); 
	logoArray[0] = '<!-- full URL here -->';
//	logoArray[1] = 'URL IMAGE 2';

// wordmark array (Oasis)
	var wordmarkArray = new Array(); 
	wordmarkArray[0] = '<!-- full URL here -->';
//	wordmarkArray[1] = 'URL IMAGE 2';

// Oasis
	var chosenWordmark = Math.round(Math.random() * (wordmarkArray.length - 1));
	$('#WikiHeader > .wordmark.medium.graphic a img').attr('src', wordmarkArray[chosenWordmark]); // Random wordmark in Oasis

// Monobook
	var chosenLogo = Math.round(Math.random() * (logoArray.length - 1));
	document.getElementById('p-logo').innerHTML = '<a accesskey="z" title="Home Page [alt-shift-z]" href="/wiki/HOMEPAGE" style="background-image: url(' + logoArray[chosenLogo] + ');"/>'; // Random wordmark in Monobook
}

addOnloadHook(RandomLogo);