// ============================================================
// Huumori artikkeleille oma nimiavaruus
//
//  
// Lähde: http://en.wikipedia.org/wiki/User:RockMFR/disambigeditintro.js
// Funktio: Adds EditIntro to all Exchange pages 
//           when "edit this page" link is clicked
// ============================================================

$(document).ready(function() {
	if (wgCanonicalNamespace == "Huumori") {
		$editLinks = $('a#ca-edit,#ca-edit a');
		$editLinks.attr('href', $editLinks.attr('href') + '&editintro=Malline:Huumori');
	}
});

// ============================================================
// End of EDIT-INTRO FIX
// ============================================================