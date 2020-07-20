/* Any JavaScript here will be loaded for all users on every page load. */

/* Random logo */
function RandomLogo() 
{
// This function provides a random logo (Monobook) or wordmark (Oasis) to illustrate the wiki

// logo array (Monobook)
	var logoArray = new Array(); 
	logoArray[0] = 'https://images.wikia.nocookie.net/kurokami/images/b/bc/Wiki.png';
	logoArray[1] = 'https://images.wikia.nocookie.net/__cb20111127092614/kurokami/images/a/ad/KuroKami%28BlackGod%29-150x65.png';
	logoArray[2] = 'https://images.wikia.nocookie.net/__cb20111126094013/kurokami/images/3/3b/BlackGod-j-logo-65px-trans.png';
	logoArray[3] = 'https://images.wikia.nocookie.net/__cb20111126094013/kurokami/images/d/dc/BlackGod-j-synchro-symbol-65px-trans.png';
	logoArray[4] = 'https://images.wikia.nocookie.net/__cb20111126094013/kurokami/images/0/0d/Kurokami-symbol-65px-trans.png';
	logoArray[5] = 'https://images.wikia.nocookie.net/kurokami/images/6/6e/BlackGod-theManga-100x65px.png';
	logoArray[6] = 'https://images.wikia.nocookie.net/kurokami/images/5/52/KuroKamiBlackGod-theManga-100x60px.png';
//	logoArray[7] = 'URL IMAGE 8';

// wordmark array (Oasis)
	var wordmarkArray = new Array(); 
//	wordmarkArray[] = 'http://images3.wikia.nocookie.net/__cb20110714065540/kurokami/images/8/89/Wiki-wordmark.png';
	wordmarkArray[0] = 'https://images.wikia.nocookie.net/__cb20111115084056/kurokami/images/d/d8/KuroKami%28BlackGod%29-250x65.png';
	wordmarkArray[1] = 'https://images.wikia.nocookie.net/__cb20111126095113/kurokami/images/8/81/KurokamiBlackGod-trans.png';
	wordmarkArray[2] = 'https://images.wikia.nocookie.net/kurokami/images/e/e6/Kurokami-theAnimation-200x65px.png';
	wordmarkArray[3] = 'https://images.wikia.nocookie.net/kurokami/images/6/6e/BlackGod-theManga-100x65px.png';
	wordmarkArray[4] = 'https://images.wikia.nocookie.net/kurokami/images/5/52/KuroKamiBlackGod-theManga-100x60px.png';
//	wordmarkArray[5] = 'URL IMAGE 7';

// Oasis
	var chosenWordmark = Math.floor(Math.random() * (wordmarkArray.length) );
	$('#WikiHeader > .wordmark.medium.graphic a img').attr('src', wordmarkArray[chosenWordmark]); // Random wordmark in Oasis

// Monobook
	var chosenLogo = Math.floor(Math.random() * (logoArray.length) );
	document.getElementById('p-logo').innerHTML = '<a accesskey="z" title="Home Page [alt-shift-z]" href="/wiki/HOMEPAGE" style="background-image: url(' + logoArray[chosenLogo] + ');"/>'; // Random wordmark in Monobook
}
addOnloadHook(RandomLogo);