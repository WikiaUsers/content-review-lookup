//Ersetzt <span class="insertusername"></span> mit dem Benutzername des Lesers
$(function replaceusername() {
    var spantags = document.getElementsByTagName("span");
    for (i=0; i<spantags.length; i++) {
        if (spantags[i].className=="insertusername") {
            if (wgUserName === null) {
                spantags[i].innerHTML="Spieler";
            } else {
                spantags[i].innerHTML=wgUserName;
            }
        }
    }
});