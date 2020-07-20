//Skrypty zewnętrzne 
importArticles({
    type: 'script',
    articles: [
	"u:pl.acdc:MediaWiki:CategoryGalleryHeader.js",	// Dodatkowy nagłówek w galeriach kategorii
	"u:dev:AjaxRC/code.js",				// Auto-odświeżanie
	"u:dev:ExtendedNavigation/code.js",		// Nawigacja
	"u:dev:LockOldBlogs/code.js",			// Wyłączenie komentowania pod starymi blogami
	"u:dev:RevealAnonIP/code.js",			// Adresy IP dla niezarejestrowanych
	"u:dev:Voice_Dictation/voice.js",               // Wyszukiwanie głosowe
        "MediaWiki:Common.js/userTags.js",              // Plakietki
        ]
});
 
// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];

importScriptPage('AjaxRC/code.js', 'dev');
 
function emptyLicenseAlert(form) {
	var msg = "Licencja pliku nie została wybrana. Jeśli prześlesz plik bez niej, zostaniesz upomniany (w ostateczności zablokowany), a grafika zostanie usunięta"
	if(window.emptyLicenseWarningDelivered) return true;
	if($('#wpLicense').val() == '') {
		alert(msg);
		window.emptyLicenseWarningDelivered = true
		return false
	}
	return true;
}
$('#mw-upload-form').submit(function(e) {return emptyLicenseAlert(this);});

// Rozwijane tabele
importScriptPage('ShowHide/code.js', 'dev');
importScriptPage('DupImageList/code.js', 'dev');

// Wyłączenie komentowania pod starymi blogami
window.LockOldBlogs = {
	expiryDays: 100,
	expiryMessage: "Komentowanie zostało wyłączone, ponieważ nikt nie dodał komentarza do tego wpisu od <expiryDays> dni. W razie potrzeby skontaktuj się z administratorem.",
	nonexpiryCategory: "Niearchiwizowane blogi"
};

// Szablon:Strona główna/gry
$(function () {
	"use strict";
	var contentTable = $("#template-mainpage-content");
	contentTable.find(".template-mainpage-content-games td").click(function () {
		var gameTd = $(this);
		var gameIndex = gameTd.index();
		var gameTr = gameTd.parent().nextAll().eq(gameIndex);
 
		if(gameTr.css("display") != "none")
		{
			gameTr.fadeOut();
			gameTd.find("img").removeClass("checked");
		}
		else
		{
			contentTable.find("img").removeClass("checked");
			gameTd.find("img").addClass("checked");
			contentTable.find("tr.template-mainpage-content-games-content").fadeOut("500").promise().done(function () {
				gameTr.fadeIn();
				var offset = 0;
				var HtmlScrollTop = $("html").scrollTop();
				var gameTdOffsetTop = gameTd.offset().top;
				if(HtmlScrollTop <= gameTdOffsetTop - 2)
					offset = 0;
				else
					offset = 55;
				$('html, body').animate({
					scrollTop: gameTdOffsetTop - offset
				}, 500);
			});
		}

	})
});

// Love And War/zawory
$(function () {
	"use strict";
	var valves = [
	[4, 1, 3],
	[0, 2, 3],
	[1, 5, 4],
	[5, 0, 1],
	[5, 2, 0],
	[3, 4, 2]
	];
	
	$("#gorod-krovi-valves-table td:not(.gorod-krovi-valves-results)").click(function () {
		var column = $(this).parents("table").find("tr td:nth-child(" + ($(this).index() + 1) +")");
		column.removeClass("checked");
		if(1 - $(this).index()) {
			column.next().removeClass("disabled");
			$(this).next().addClass("disabled");
			if($(this).next().hasClass("checked"))
				$(this).next().removeClass("checked");
		}
		else {
			column.prev().removeClass("disabled");
			$(this).prev().addClass("disabled");
			if($(this).prev().hasClass("checked"))
				$(this).prev().removeClass("checked");
		}
		$(this).addClass("checked");
		
		var checkedValves = $("#gorod-krovi-valves-table td.checked");
		
		if(checkedValves.length == 2) {
			var vStart, vCylinder;
			vStart = $("#gorod-krovi-valves-table td:nth-child(1).checked").parent("tr").index() - 1;
			vCylinder = $("#gorod-krovi-valves-table td:nth-child(2).checked").parent("tr").index() - 1;
			
			if(vStart == -1 || vCylinder == -1 || vStart == vCylinder)
				return 0;
			
			var valvesList = [[-1, vStart]];
			findValves(vStart, vCylinder, valvesList);
			
			var vResultsTd = $("#gorod-krovi-valves-table td.gorod-krovi-valves-results");
			vResultsTd.empty();
			
			for(var i = 0; i < 6; i++) {
				var tempText = "";
				var tdIndex = 0;
				var names = $("#gorod-krovi-valves-table td:first-child");
				
				tempText += names.eq(valvesList[i][1]).text();

				if(i < 5)
					tempText += " - " + (valvesList[i + 1][0] + 1);
				else
					tempText += " - Walec kodów";
				
				if(i >= 3)
					tdIndex = 1;
				
				vResultsTd.eq(tdIndex).append($("<p>").text(tempText));
			}
		}
	});
	
	function findValves(start, end, valvesList) {
		for(var i = 0; i < valvesList.length - 1; i++)
			if(start == valvesList[i][1])
				return 0;
		
		if(start == end && valvesList.length == 6)
			return 1;
		else if(valvesList.length == 6)
			return 0;
		
		for(var i = 0; i < 3; i++) {
			valvesList.push([i, valves[start][i]]);
			if(findValves(valves[start][i], end, valvesList))
				return 1;
			valvesList.pop();
		}
	}
});