/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
$.getScript("https://panzi.github.io/Browser-Ponies/basecfg.js");
$.getScript("https://panzi.github.io/Browser-Ponies/browserponies.js");
(function (cfg) {BrowserPonies.setBaseUrl(cfg.baseurl);BrowserPonies.loadConfig(BrowserPoniesBaseConfig);BrowserPonies.loadConfig(cfg);})({"baseurl":"https://panzi.github.io/Browser-Ponies/","fadeDuration":500,"volume":1,"fps":25,"speed":3,"audioEnabled":false,"showFps":false,"showLoadProgress":false,"speakProbability":0.1,"spawn":{"princess luna":1},"autostart":true});
//Kod na obrazki profilowe z mlp wiki

$(".big-img").click(function () {
  $(this).hide(500, function () {
    $(this).remove();
  });
});


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
 

var tlaOstatniejAktywnosci = {
1: "https://images.wikia.nocookie.net/__cb20140509221557/vengir/pl/images/e/e5/AJ_tlo.png",
2: "https://images.wikia.nocookie.net/__cb20140509221608/vengir/pl/images/b/b4/FS_tlo.png",
3: "https://images.wikia.nocookie.net/__cb20140509232206/vengir/pl/images/f/f0/TS_tlo.png",
4: "https://images.wikia.nocookie.net/__cb20140509232108/vengir/pl/images/4/42/Lun_tlo.png",
5: "https://images.wikia.nocookie.net/__cb20140509232138/vengir/pl/images/c/c6/Rt_tlo.png",
6: "https://images.wikia.nocookie.net/__cb20140509232127/vengir/pl/images/4/4d/RD_tlo.png",
7: "https://images.wikia.nocookie.net/__cb20140509232052/vengir/pl/images/5/5d/Celly_tlo.png",
8: "https://images.wikia.nocookie.net/__cb20140509232147/vengir/pl/images/d/d5/Spike_tlo.png",
9: "https://images.wikia.nocookie.net/__cb20140509232117/vengir/pl/images/9/92/PP_tlo.png",
};


function testObecnosciOA()
{ if (wgWikiaDOMReady==true)
 {
$("#WikiaRecentActivity").attr("style","background: url('" + tlaOstatniejAktywnosci[Math.floor((Math.random() * 9) + 1)] + "') no-repeat right bottom");
$(".Rail .wordmark .wordmark").attr("src", "https://images.wikia.nocookie.net/vengir/pl/images/thumb/b/b3/TECH_-_Logo_-_Zima.png/115px-TECH_-_Logo_-_Zima.png");
clearInterval(testObOA);
 }
}

losoweTloGotowe = false;

$('#WikiaRail').bind('DOMNodeInserted', function(event) {
   if (!losoweTloGotowe) {
      $("#WikiaRecentActivity").attr("style","background: url('" + tlaOstatniejAktywnosci[Math.floor((Math.random() * 9) + 1)] + "') no-repeat right bottom");
      losoweTloGotowe = true;
   }
});