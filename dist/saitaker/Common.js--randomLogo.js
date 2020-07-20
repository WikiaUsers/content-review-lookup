/* Any JavaScript here will be loaded for all users on every page load. */

/* Random logo */
function RandomLogo() 
{
// This function provides a random logo (Monobook) or wordmark (Oasis) to illustrate the wiki

// logo array (Monobook)
	var logoArray = new Array(); 
	logoArray[0] = 'fullURLhere';

// wordmark array (Oasis)
	var wordmarkArray = new Array(); 
	wordmarkArray[0] = 'https://images.wikia.nocookie.net/saitaker/images/8/89/Wiki-wordmark.png';
	wordmarkArray[1] = 'https://images.wikia.nocookie.net/saitaker/images/1/1b/SaiTaker-j-logo-250x65.png';
	wordmarkArray[2] = 'https://images.wikia.nocookie.net/saitaker/images/9/98/SaiTaker-k-logo-250x65.png';

// Oasis
	var chosenWordmark = Math.floor( Math.random() * wordmarkArray.length );
	$('#WikiHeader > .wordmark.medium.graphic a img').attr('src', wordmarkArray[chosenWordmark]); // Random wordmark in Oasis

// Monobook
	var chosenLogo = Math.floor( Math.random() * logoArray.length );
	document.getElementById('p-logo').innerHTML = '<a accesskey="z" title="Home Page [alt-shift-z]" href="/wiki/HOMEPAGE" style="background-image: url(' + logoArray[chosenLogo] + ');"/>'; // Random wordmark in Monobook
}

addOnloadHook(RandomLogo);