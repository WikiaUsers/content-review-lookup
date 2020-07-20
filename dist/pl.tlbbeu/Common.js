/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
function delinkMap() {
	var content = document.getElementById('bodyContent');
	var maps = content.getElementsByClassName('delinkmap')
	for(var x = 0; x < maps.length; x++) {
		var areas = maps[x].getElementsByTagName('area');
		for(var y = 0; y < areas.length; y++) {
			areas[y].noHref = true;
			areas[y].removeAttribute('href');
		}
	}
}
addOnloadHook(delinkMap);