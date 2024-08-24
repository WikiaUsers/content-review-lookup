/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

//Ersetzt <span class="insertusername"></span> mit dem Benutzername des Lesers
$(function replaceusername() {
    var spantags = document.getElementsByTagName("span");
    for (i=0; i<spantags.length; i++) {
        if (spantags[i].className=="insertusername") {
            if (wgUserName==null) {
                spantags[i].innerHTML="Beacher";
            } else {
                spantags[i].innerHTML=wgUserName;
            }
        }
    }
});