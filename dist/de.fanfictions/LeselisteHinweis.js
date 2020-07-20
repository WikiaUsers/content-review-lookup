if ($("body").hasClass("ns-112")) {
mobileDevide = "";
if ($("*").hasClass("storyfooter")) {
if ($("body").hasClass("wkMobile")) {
mobileDevide = "<hr>";
}

var leseliste_posButton = $("#postMe").position(); 

if (wgUserName === null) {
$("#storyfooter").before('<div id="notifbox" style="height: auto; width: auto; opacity: 1; z-index: 20000; background: rgb(252, 248, 155); border: 2px solid rgb(243, 218, 139);"><div class="inner" style="padding: 10px;"><b>Füge diese Geschichte deiner Leseliste hinzu!</b> Durch das Hinzufügen der Geschichte zu deiner Leserliste zeigst du den Autoren der Geschichte, dass dir ihre Arbeit gefällt und du gerne mehr sehen möchtest. Wenn du dich anmeldest, kannst du deiner Leseliste Einträge hinzufügen. <a href="http://de.fanfictions.wikia.com/wiki/Spezial:Anmelden?returnto=' + wgPageName + '&type=login">Anmelden »</a><br>Die wikiweite Lese-Rangliste findest du <a href="http://de.fanfictions.wikia.com/wiki/MeerUndMehr:Leseliste">hier</a>.</div></div>');
} else {
$("#storyfooter").before('<div id="notifbox" style="height: auto; width: auto; opacity: 1; z-index: 20000; background: rgb(252, 248, 155); border: 2px solid rgb(243, 218, 139);"><div class="inner" style="padding: 10px;"><b>Füge diese Geschichte deiner Leseliste hinzu!</b>' +
mobileDevide
+' Durch das Hinzufügen der Geschichte zu deiner Leserliste zeigst du den Autoren der Geschichte, dass dir ihre Arbeit gefällt und du gerne mehr sehen möchtest. <br>Deine Leseliste findest du hier: <a href="http://mum.wikia.com/wiki/Benutzer:' + wgUserName + '/Leseliste">Benutzer:' + wgUserName + '/Leseliste</a><br>Die wikiweite Lese-Rangliste findest du <a href="http://de.fanfictions.wikia.com/wiki/MeerUndMehr:Leseliste">hier</a>.' +
mobileDevide
+'</div></div>');
}
}
}
// ?