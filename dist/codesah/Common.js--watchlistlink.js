/* Add a watchlist link to the Page bar */
function addWatchlist(){
	if (skin == 'monaco' && wgUserName != null){
		var watchLink = document.createElement('a');
		watchLink.setAttribute('href', wgServer+'/wiki/Especial:Seguimiento');
		watchLink.setAttribute('title', 'La lista de páginas que monitoreas en espera de cambios');
		watchLink.innerHTML = 'Mi lista de seguimiento';
		
		var awSpan = document.createElement('span');
		awSpan.setAttribute('id', 'header_mywatchlist');
		awSpan.appendChild(watchLink);
		
		var awTalk = document.getElementById('header_mytalk');
		awTalk.parentNode.insertBefore(awSpan,awTalk.nextSibling);
		awTalk.parentNode.insertBefore(document.createTextNode(' '),awTalk.nextSibling);
	}
}
addOnloadHook(addWatchlist);