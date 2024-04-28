// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
 
    $(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});

//Licznik na żywo
 
function startTime() {
 var c_target = document.getElementById('CountdownTarget');
 if(c_target != undefined) {
  var dr = Date.parse(c_target.innerHTML);
  var today=new Date();
  var dt=today.getTime();
  /*var h=today.getHours();
  var m=today.getMinutes();*/
  var s=today.getSeconds();
  var d=Math.floor((dr-dt) / 86400000);
  var h1=Math.floor((dr-dt) % 86400000 / 3600000)
  var m1=Math.floor((dr-dt) % 86400000 % 3600000 / 60000)
  var s1=59-s;
 
  /*m=checkTime(m);
  s=checkTime(s);*/
  m1=checkTime(m1);
  s1=checkTime(s1);
  var c_timer = document.getElementById('CountdownTimer');
  if(c_timer != undefined) {
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

}