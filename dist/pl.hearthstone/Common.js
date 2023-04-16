/* Konfiguracja tooltipów */
var tooltips_list = [
    {
        classname: 'card-tooltip',
        parse: '{'+'{k/tooltip|<#card#>}}',
    },
    {
        classname: 'term-tooltip',
        parse: '{'+'{p/<#term#>}}',
    },
];

// AJAXRC
window.ajaxPages = ["Special:RecentChanges","Specjalna:Ostatnie_zmiany"];
window.AjaxRCRefreshText = 'Automatyczne odświeżanie';
window.AjaxRCRefreshHoverText = 'Włącza automatyczne odświeżanie strony';
 
// NIEAKTYWNY UŻYTKOWNIK
window.InactiveUsers = { text: 'nieobecny' };

// PRZYCISK DO POWROTU NA GÓRĘ STRONY
$(function() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>');
});

// BUTTON DYSKUSJI by Wedkarski
$(function() {
    $( "#dyskusje" ).appendTo( ".WikiaPageHeader" );
});

// OSTATNIE ZMIANY W MODULE AKTYWNOŚCI by Szynka013
if ($('#WikiaRail').length) { 
    $('#WikiaRail').bind('DOMNodeInserted.modules', function(event) {
 
	if (!$('#RCLink').size()) 
	  $(".WikiaActivityModule").append('<a href="/Special:RecentChanges" title="Special:RecentChanges" class="more" style="float:left;" id="RCLink">Ostatnie zmiany</a>');
    });
}
 
// OSTRZEŻENIE O BRAKU LICENCJI
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Możesz spróbować ponownie, ale pamiętaj, że pliki bez licencji są usuwane.";
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() === '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true;
		return false;
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});
 
$(".wikia-gallery-item .thumbimage").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
	});
	$(".wikia-gallery-item .image").each(function(i,elem) {
		$(elem).attr('title',$(elem).attr('alt'));
});
 
// LICENCJE by Vuh
var LicenseOptions = {
	'{{Brak licencji}}': 'Grafika bez licencji',
	'{{CC-BY-SA}}': 'Grafika CC-BY-SA',
	'{{Copyright}}': 'Grafika Copyright',
	'{{Fairuse}}': 'Grafika Fairuse',
	'{{PD}}': 'Grafika domeny publicznej',
	'{{Wikimedia}}': 'Grafika Wikimedii',
};

importArticles({
    type: "script",
    articles: [
    "u:pl.tes:MediaWiki:APIQuery.js",
    "u:pl.tes:MediaWiki:Licenses.js"
   ]
});

mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});