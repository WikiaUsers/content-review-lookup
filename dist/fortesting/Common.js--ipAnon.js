/* Any JavaScript here will be loaded for all users on every page load. */
// <source lang="JavaScript">

// Convert "A Wikia contributor" in Comments to IP address
// from User:Monchoman45

function AnonIP() {
	var list = document.getElementsByTagName('a');
	for(var i in list) {
		if(list[i].href && list[i].href.indexOf('Special:Contributions/') && list[i].innerHTML == 'A Wikia contributor') {
			list[i].innerHTML = list[i].href.substring(list[i].href.lastIndexOf('/') + 1, list[i].href.length);
		}
	}
}
addOnloadHook(AnonIP);

// END Convert "A Wikia contributor" in Comments to IP address

// </source>