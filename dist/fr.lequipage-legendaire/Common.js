/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
// Remplacement possible de Rey par Reiku 

var reg = /Rey/i;
var chaine = $('p:contains("Rey")').text();
var result = chaine.replace(reg, "Reiku");
$('p:contains("Rey")').text(result + ' ');

$('span.message:contains("test")').css('color', 'red');