//Licznik do premiery Max Payne 3
 
function startTime()
{
var dr = Date.parse("May 15, 2012");
var today=new Date();
var dt=today.getTime();
var h=today.getHours();
var m=today.getMinutes();
var s=today.getSeconds();
var d=Math.floor((dr-dt)/86400000)
var s1=59-s;
var m1=59-m;
var h1=23-h;
 
m=checkTime(m);
s=checkTime(s);
m1=checkTime(m1);
s1=checkTime(s1);
document.getElementById('CountdownTimer').innerHTML = "<tr><td>" + d + "<br><span style=font-size:60%>Dni</span></td>" + "<td>" + h1 + "<br><span style=font-size:60%>Godzin</span></td>" + "<td>" + m1 + "<br><span style=font-size:60%>Minut</span></td>" + "<td>" + s1 + "<br><span style=font-size:60%>Sekund</span></td>";
t=setTimeout('startTime()',500);
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