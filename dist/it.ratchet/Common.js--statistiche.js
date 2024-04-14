// =====================================
//         Statistiche del sito
//======================================
/* Contatore delle visite del sito    */
/* Statistiche dal sito Histats.com   */
/* Codice da RuneScape wiki adattato  */
/* da Leviathan_89 per questa wiki    */
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.LatestPhotosModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='font-weight:bold;'>Visite da<br />Settembre 2011:</td><td style='text-align:right'></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	}
});