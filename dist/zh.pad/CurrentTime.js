setInterval(function(){
var d=new Date();
$("#Now").text(padZero(d.getMonth()+1)+"月"+padZero(d.getDate())+"日 "+padZero(d.getHours())+((d.getSeconds()%2==0)?":":" ")+padZero(d.getMinutes()));
}, 1000);
function padZero(n){if (n<10) return "0"+n; else return n}