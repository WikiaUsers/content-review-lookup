/* Any JavaScript here will be loaded for all users on every page load. */

/* Random logo */
function RandomLogo() 
{
// This function provides a random logo (Monobook) or wordmark (Oasis) to illustrate the wiki

// logo array (Monobook)
	var logoArray = new Array(); 
	logoArray[0] = 'https://images.wikia.nocookie.net/__cb20120516081030/papakiki/images/b/bc/Wiki.png';
	logoArray[1] = 'https://images.wikia.nocookie.net/__cb20120516070817/papakiki/images/8/85/Papakiki-logo-square-trans.png';
	logoArray[2] = 'https://images.wikia.nocookie.net/__cb20120516070815/papakiki/images/2/26/Papakiki-j-logo-short-trans.png';

// wordmark array (Oasis)
	var wordmarkArray = new Array(); 
	wordmarkArray[0] = 'https://images.wikia.nocookie.net/__cb20120519083218/papakiki/images/8/89/Wiki-wordmark.png';
	wordmarkArray[1] = 'https://images.wikia.nocookie.net/__cb20120519082732/papakiki/images/7/74/Papakiki-wordmark-2-trans.gif';
	wordmarkArray[2] = 'https://images.wikia.nocookie.net/__cb20120516073734/papakiki/images/3/35/Papakiki-wordmark-trans.png';
	wordmarkArray[3] = 'https://images.wikia.nocookie.net/__cb20120516070816/papakiki/images/2/2d/Papakiki-j-logo-trans.png';
	wordmarkArray[4] = 'https://images.wikia.nocookie.net/__cb20120515112039/papakiki/images/1/15/Papakiki-logo-horizontal-trans.gif';
	wordmarkArray[5] = 'https://images.wikia.nocookie.net/__cb20120515112041/papakiki/images/9/98/Papakiki-logo-trans.gif';
	wordmarkArray[6] = 'https://images.wikia.nocookie.net/papakiki/images/3/3c/Papakiki-bg-main-trans-logo.gif';

// Oasis
	var chosenWordmark = Math.floor( Math.random() * wordmarkArray.length );
	$('#WikiHeader > .wordmark.medium.graphic a img').attr('src', wordmarkArray[chosenWordmark]); // Random wordmark in Oasis

// Monobook
	var chosenLogo = Math.floor( Math.random() * logoArray.length );
	document.getElementById('p-logo').innerHTML = '<a accesskey="z" title="Home Page [alt-shift-z]" href="/wiki/HOMEPAGE" style="background-image: url(' + logoArray[chosenLogo] + ');"/>'; // Random wordmark in Monobook
}

addOnloadHook(RandomLogo);