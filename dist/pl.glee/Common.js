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
   c_timer.innerHTML = '<tr><td>0<br /><span class="CountdownLabel">Dni</span></td><td>0<br /><span class="CountdownLabel">Godzin</span></td><td>00<br /><span  class="CountdownLabel">Minut</span></td><td>00<br /><span class="CountdownLabel">Sekund</span></td>';
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
 
   c_timer.innerHTML = '<tr><td>' + d + '<br /><span class="CountdownLabel">' + liczbaMnoga(d, 'Dzień', 'Dni', 'Dni') + '</span></td>' + '<td>' + h1 + '<br /><span class="CountdownLabel">' + liczbaMnoga(h1, 'Godzinę', 'Godziny', 'Godzin') + '</span></td>' + '<td>' + m1 + '<br /><span  class="CountdownLabel">' + liczbaMnoga(m1, 'Minutę', 'Minuty', 'Minut') + '</span></td>' + '<td>' + s1 + '<br /><span class="CountdownLabel">' + liczbaMnoga(s1, 'Sekundę', 'Sekundy', 'Sekund') + '</span></td>';
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


<div <div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>> </div>