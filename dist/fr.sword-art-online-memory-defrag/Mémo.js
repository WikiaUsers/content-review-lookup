function event() {
var j = new Array( "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche" );
 var d = new Date();
 document.write(j[d.getDay() - 1]);
}