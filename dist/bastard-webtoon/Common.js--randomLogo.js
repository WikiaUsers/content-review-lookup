/* Any JavaScript here will be loaded for all users on every page load. */

//////////////////////////////////////////////////////////////////////////
////////////////// Adapted from the Kurokami Wiki ////////////////////////
//////////////////////////////////////////////////////////////////////////

/* Random logo */
function RandomLogo() 
{
// This function provides a random logo (Monobook) or wordmark (Oasis) to illustrate the wiki

// logo array (Monobook)
	var logoArray = new Array(); 
	logoArray[0] = 'https://images.wikia.nocookie.net/barstard-webtoon/images/b/bc/Wiki.png';
	logoArray[1] = 'https://images.wikia.nocookie.net/__cb20160317235734/barstard-webtoon/images/7/7e/Bastard-Wiki-wordmark2_%28monobook%29.png';
//	logoArray[2] = 'URL IMAGE 3';

// wordmark array (Oasis)
	var wordmarkArray = new Array(); 
//	wordmarkArray[] = 'http://images4.wikia.nocookie.net/barstard-webtoon/images/8/89/Wiki-wordmark.png';
	wordmarkArray[0] = 'https://images.wikia.nocookie.net/__cb20160317234330/barstard-webtoon/images/1/1c/Bastard-Wiki-wordmark.png';
	wordmarkArray[1] = 'https://images.wikia.nocookie.net/__cb20160317231951/barstard-webtoon/images/b/ba/Bastard-Wiki-wordmark2.png';
//	wordmarkArray[2] = 'URL IMAGE 3';

// Oasis
	var chosenWordmark = Math.floor(Math.random() * (wordmarkArray.length) );
	$('#WikiHeader > .wordmark.medium.graphic a img').attr('src', wordmarkArray[chosenWordmark]); // Random wordmark in Oasis

// Monobook
	var chosenLogo = Math.floor(Math.random() * (logoArray.length) );
	document.getElementById('p-logo').innerHTML = '<a accesskey="z" title="Home Page [alt-shift-z]" href="/wiki/HOMEPAGE" style="background-image: url(' + logoArray[chosenLogo] + ');"/>'; // Random wordmark in Monobook
}
addOnloadHook(RandomLogo);