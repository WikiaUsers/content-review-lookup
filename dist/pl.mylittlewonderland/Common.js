/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

importArticles({
    type: "script",
    articles: [
        "u:dev:InactiveUsers/code.js",
        "u:pl.tes:MediaWiki:AjaxRC.js",
        "u:dev:WallGreetingButton/code.js",
        "u:dev:ReferencePopups/code.js",
        "u:dev:ShowHide/code.js",
            ]
});

 importArticles({
    type: "style",
    articles: [
        "w:c:dev:FontAwesome/code.css"
    ]
});

/*////////////////////////////////////////////////////////////////
Przydatne - user
///////////////////////////////////////////////////////////////*/
///* Bazowany na Frozen Wiki. Dziękuje! *///
 /* {{USERNAME}} */
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

/* Nieaktywni */
InactiveUsers = { text: 'na urlopie' };

/* End of the Nieaktywni replacement */
/*////////////////////////////////////////////////////////////////
Przydatne - wiki
///////////////////////////////////////////////////////////////*/
/* Kod wzięty z Centrum Społeczności, opracowany przez Vengira. http://spolecznosc.wikia.com/wiki/Wątek:16051 */
 
//Licznik na żywo - w trakcie optymalizacji
 
var celeLicznikow = [];
if ($("#CountdownTarget1").html()!=undefined) {
if ($("#LiczbaLicznikow").html()==undefined) {
    celeLicznikow.push(Date.parse($("#CountdownTarget1").html()));
	}
 
for (var i = 0; i < $("#LiczbaLicznikow").html(); i++) { 
    celeLicznikow.push(Date.parse($("#CountdownTarget"+(i+1)).html()));
}
}
function startTime() {
 /*var c_target = document.getElementById('CountdownTarget');
 var c_timer = document.getElementById('CountdownTimer');*/
 if($("#CountdownTarget1") != undefined) {
  var dt=new Date().getTime();
  for (var i=0; i < celeLicznikow.length; i++) {
  var dr = celeLicznikow[i];
  /*var h=today.getHours();
  var m=today.getMinutes();
  var s=today.getSeconds();*/
  var d=Math.floor((dr-dt) / 86400000);
//Teraz następuje sprawdzenie, czy czas do podanej daty już minął i ewentualne zatrzymanie licznika
 if (d<0){
   $("#CountdownTimer"+(i+1)).html('<tr><td>0<br /><span class="CountdownLabel">Dni</span></td><td>0<br /><span class="CountdownLabel">Godzin</span></td><td>00<br /><span  class="CountdownLabel">Minut</span></td><td>00<br /><span class="CountdownLabel">Sekund</span></td>');
  }
//Jeśli czas jeszcze nie minął, to skrypt jest kontynuowany
 else {
  var h1=Math.floor((dr-dt) % 86400000 / 3600000);
  var m1=checkTime(Math.floor((dr-dt) % 86400000 % 3600000 / 60000));
  var s1=checkTime(Math.floor((dr-dt) % 86400000 % 3600000 % 60000 / 1000 ));
 
  /*m=checkTime(m);
  s=checkTime(s);
  m1=checkTime(m1);
  s1=checkTime(s1);*/
 
   $("#CountdownTimer"+(i+1)).html('<tr><td>' + d + '<br /><span class="CountdownLabel">' + liczbaMnoga(d, 'Dzień', 'Dni', 'Dni') + '</span></td>' + '<td>' + h1 + '<br /><span class="CountdownLabel">' + liczbaMnoga(h1, 'Godzinę', 'Godziny', 'Godzin') + '</span></td>' + '<td>' + m1 + '<br /><span  class="CountdownLabel">' + liczbaMnoga(m1, 'Minutę', 'Minuty', 'Minut') + '</span></td>' + '<td>' + s1 + '<br /><span class="CountdownLabel">' + liczbaMnoga(s1, 'Sekundę', 'Sekundy', 'Sekund') + '</span></td>');
   }}
   t=setTimeout('startTime()',500);
 }
}
 
function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}
 
addOnloadHook(startTime);
 
//Skrypt do obliczania poprawnej formy liczby mnogiej autorstwa Vengira, optymalizowany przez Dj mateooshkę
 
function liczbaMnoga(dana,pojedyncza,mnoga1,mnoga2)
{
  if (dana==1)
  {
    return pojedyncza;
  } else if (dana%10>1&&dana%10<5&&(dana%100<12||dana%100>21)) {
    return mnoga1;
  } else {
    return mnoga2;
  }
}
//addOnloadHook(startTime);
 /* End of the Time replacement */

 
// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Nowe_pliki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Nowe_strony"
];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';
/* End of the Autodświeżanie replacement */

// Pliki
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie ale pamiętaj, że pliki bez licencji są usuwane."
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
/* End of the Pliki replacement */

// Licencje
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js"
   ]
});
/* End of the Licencje replacement */