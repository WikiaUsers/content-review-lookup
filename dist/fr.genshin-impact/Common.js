/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
var charHeader = document.getElementById("character-header");
if(charHeader) {
	charHeader.style.backgroundImage = "url(" + charHeader.dataset.bg + ")";
}