/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
// Zwijanie navboksów, gdy jest więcej niż jeden na stronie
$(function(){
	navboxy = document.getElementsByClassName("navbox"),
	len = navboxy !== null ? navboxy.length : 0,
	x = 0;
	if (len > 1) {
		for(x; x < len; x++) {
			nav = navboxy[x];
			nav.className += " mw-collapsed";
			nav.children[0].className += " mw-collapsible-toggle-collapsed";
			nav.children[1].style.display = "none";
		}
	}
});