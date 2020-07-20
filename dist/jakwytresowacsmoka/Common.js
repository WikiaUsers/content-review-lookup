//===============================================================================
//   Ostrzeżenie o braku licencji dla plików
//===============================================================================


//Licznik na żywo - w trakcie optymalizacji
 
function startTime() {
 var c_target = document.getElementById('CountdownTarget');
 var c_timer = document.getElementById('CountdownTimer');
 if(c_target != undefined) {
  var dr = Date.parse(c_target.innerHTML);
  var today=new Date();
  var dt=today.getTime();
  /*var h=today.getHours();
  var m=today.getMinutes();*/
  var s=today.getSeconds();
  var d=Math.floor((dr-dt) / 86400000);
//Teraz następuje sprawdzenie, czy czas do podanej daty już minął i ewentualne zatrzymanie licznika
 if (d<0){
   c_timer.innerHTML = '<center><tr><td>0<br /><span class="CountdownLabel">Dni</span></td><td>0<br /><span class="CountdownLabel">Godzin</span></td><td>00<br /><span  class="CountdownLabel">Minut</span></td><td>00<br /><span class="CountdownLabel">Sekund</span></td></center>';
  }
//Jeśli czas jeszcze nie minął, to skrypt jest kontynuowany
 else {
  var h1=Math.floor((dr-dt) % 86400000 / 3600000)
  var m1=Math.floor((dr-dt) % 86400000 % 3600000 / 60000)
  var s1=59-s;
 
  /*m=checkTime(m);
  s=checkTime(s);*/
  m1=checkTime(m1);
  s1=checkTime(s1);
 
   c_timer.innerHTML = '<center><tr><td>' + d + '<br /><span class="CountdownLabel">' + liczbaMnoga(d, 'Dzień', 'Dni', 'Dni') + '</span></td>' + '<td>' + h1 + '<br /><span class="CountdownLabel">' + liczbaMnoga(h1, 'Godzinę', 'Godziny', 'Godzin') + '</span></td>' + '<td>' + m1 + '<br /><span  class="CountdownLabel">' + liczbaMnoga(m1, 'Minutę', 'Minuty', 'Minut') + '</span></td>' + '<td>' + s1 + '<br /><span class="CountdownLabel">' + liczbaMnoga(s1, 'Sekundę', 'Sekundy', 'Sekund') + '</span></td></center>';
   t=setTimeout('startTime()',500);
 }
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
addOnloadHook(startTime);

 
$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});

// Licencje do plików 
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:License.js",
	"u:dev:LockForums/code.js",
   ]
});
 
// Licencje
var options = {
    '{{fairuse}}': 'Screeny (zrzuty ekranu) z filmów, serialu lub gier',
	'{{fairuse-inne}}': 'Grafiki filmowe DreamWorks (promocyjne, plakaty, concepty, okładki, zdjęcia zabawek)',
	'{{ilustracje}}': 'Ilustracje do powieści Cressidy Cowell oraz ich okładki',
	'{{copyright}}': 'Fan Art',
	'{{copyright-inne}}': 'plik własnego autorstwa, np. zdjęcia (nie dotyczy Fan Artów)',
	'{{Brak licencji}}': 'Prawa autorskie nieznane',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Screenshot-Web}}': 'Zdjęcie strony internetowej (screenshot)',
	'{{cc-by-3.0}}': 'Licencja CC BY-SA 3.0 (ikonki tylko techniczne!)'
};

// {{USERNAME}}
// Autorzy: Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]], this (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

// Automatyczne odświeżanie 
window.ajaxPages = 
["Special:RecentChanges","Specjalna:Ostatnie_zmiany","Specjalna:Aktywność_na_wiki","Special:WikiActivity"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';
importScriptPage('AjaxRC/code.js', 'dev');