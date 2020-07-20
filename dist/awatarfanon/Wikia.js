/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */

$(function() {
  var rights = {};
 
  // BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  rights["Matik7"]                   = ["Webmaster", "Administrator Awatar Wiki"];
  rights["TheQuan"]                  = ["Opiekun wiki"];
 
  // END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS
 
  if (typeof rights[wgTitle] != "undefined") {
    // Usunięcie poprzednich opisów grup
    $('.UserProfileMasthead .masthead-info span.group').remove();
 
    for( var i=0, len=rights[wgTitle].length; i < len; i++) {
      // add new rights
$('<span class="tag" style="margin-left: 10px !important">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
    }
  }
});

// Zmiana teł w zależności od pory dnia ~ Gothicpedia
 
$(function () {
	var d = new Date();
	if (d.getHours() < 5) {
		document.body.className += ' BG4';
		document.getElementById('WikiaPage').className += ' BG4-page';
	} else if (d.getHours() < 9) {
		document.body.className += ' BG3';
		document.getElementById('WikiaPage').className += ' BG3-page';
	} else if (d.getHours() < 18) {
		document.body.className += ' BG1';
		document.getElementById('WikiaPage').className += ' BG1-page';
	} else if (d.getHours() < 22) {
		document.body.className += ' BG2';
		document.getElementById('WikiaPage').className += ' BG2-page';
	} else if (d.getHours() < 24) {
		document.body.className += ' BG4';
		document.getElementById('WikiaPage').className += ' BG4-page';
	}
});
 
$('#WikiaPageBackground').append('<div class="WikiaPageBackgroundSub" id="WikiaPageBackgroundSub"></div>');