// ============================================================ // wikiSiteMeter // // Function: Adds a counter from http://www.sitemeter.com/ // ============================================================

$(function() { if(skin == "oasis") { var $sidebar = $('.WikiaPagesOnWikiModule:first');

var comboString = "
</tr>
VISITANTES DESDE EL
1º DE MAYO DE 2012	<a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1276833&counter=26' alt='Contador' border=0 /></a>
";
$sidebar.html($sidebar.html() + comboString); } else if(skin == "monobook") { var $sidebar = $('#p-wikicities-nav');
var comboString = "
Contador
VISITANTES DESDE EL
1º DE MAYO DE 2012
<a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=1276833&counter=26' alt='Contador' border=0 /></a>
";
$sidebar.html($sidebar.html() + comboString); } });