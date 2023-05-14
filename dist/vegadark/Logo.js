/* Random logo PUT THIS CODE IN MEDIAWIKI:MONACO.JS */
function RandomLogo() {
	var logoArray = new Array();
	logoArray[0] = 'http://'; /* Here go all the logos you want to display */
	logoArray[1] = 'http://';
        logoArray[2] = 'http://';
        logoArray[3] = 'http://';
	
	var chosenLogo = Math.round(Math.random() * (logoArray.length - 1));
	document.getElementById('wiki_logo').innerHTML = '<a accesskey="z" title="VegaDark Wiki:Central [alt-shift-z]" href="/wiki/VegaDark_Wiki:Central" style="background-image: url(' + logoArray[chosenLogo] + ');"/>';
}
addOnloadHook(RandomLogo);

/* Change "VegaDark Wiki:Central" and "/VegaDark_Wiki:Central" to link it to your mainpage */