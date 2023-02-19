if (document.getElementsByClassName('load-ajax')[0]) {
for (l = 0; l < document.getElementsByClassName('load-ajax').length; l++) {
var e = document.getElementsByClassName('load-ajax');
var gp1 = e[l].getElementsByTagName('p')[0].textContent;
var gp2 = e[l].getElementsByTagName('p')[1].textContent;
var g = gp1 + " " + gp2;
$(".load-ajax").eq(l).load(g);
}
}

if (document.getElementsByClassName('translate')[0]) {
for (l = 0; l < document.getElementsByClassName('translate').length; l++) {
var a = document.getElementsByClassName('translate')[l].textContent;
document.getElementsByClassName('translate')[l].innerHTML = a;
}
}