//__NOWYSIWYG__ <source lang="javascript">
//<nowiki>
$(function () {
	'use strict';
	var lng = {
		en: {
			far: 'Find and replace',
			farbuttontext: 'Find and Replace Text',
			farselbuttontext: 'Find and Replace selected Text',
			selectedtext: 'Selected text:',
			findthis: 'Find this:',
			replacewith: 'Replace with:',
			globalm: 'Global matching.',
			casesensitive: 'Case sensitive.',
			enblregex: 'Enable regular expressions', // New, needs translation
			undoedits: 'Undo edits',
			undoinfo: 'All edits, not only replaces',
			collapse: 'Collapse',
			expand: 'Expand',
			lbwarning: 'Warning: pressing Enter key\nwill publish your edits',
			farfound: 'found and replaced.',
			undomsg: 'This will undo all edits, not only text replacements.\r\nAre you sure you want to undo?',
			noselected: 'No selected text.'
		},
		de: {
			far: 'Suchen und Ersetzen',
			farbuttontext: 'Suche und Ersetze Text',
			farselbuttontext: 'Find and Replace selected Text', // New, needs translation
			selectedtext: 'Selected text:', //New, needs translation
			findthis: 'Suche nach:',
			replacewith: 'Ersetze mit:',
			globalm: 'Suche überall',
			casesensitive: 'Groß-/Kleinschreibung beachten.',
			enblregex: 'Enable regular expressions', // New, needs translation
			undoedits: 'Bearbeitungen rückgängig machen',
			undoinfo: 'Alle Bearbeitungen, nicht nur Ersetzungen',
			collapse: 'Einklappen',
			expand: 'Ausklappen',
			lbwarning: 'Achtung: Das Drücken der Eingabetaste\nwird die Bearbeitungen speichern',
			farfound: 'gefunden und ersetzt.',
			undomsg: 'This will undo all edited text, not only text replacements.\r\nAre you sure you want to undo?', // New, needs tranlation.
			noselected: 'No selected text.' // New, needs tranlation.
		},
		es: {
			far: 'Buscar y reemplazar',
			farbuttontext: 'Find and Replace Text', // New, needs tranlation.
			farselbuttontext: 'Find and Replace Selected Text', // New, needs translation
			selectedtext: 'Selected text:', //New, needs translation
			findthis: 'Buscar esto:',
			replacewith: 'Remplazar con:',
			globalm: 'Búsqueda global.', // better translation for "matching"?
			casesensitive: 'Distinción entre mayúsculas y minúsculas.',
			enblregex: 'Enable regular expressions', // New, needs translation
			undoedits: 'Deshacer ediciones',
			undoinfo: 'Todas las ediciones, no solo reemplazos',
			collapse: 'Desplegar',
			expand: 'Ocultar',
			lbwarning: 'Advertencia: presionar la tecla Enter\npublicará tus ediciones',
			farfound: 'encontrados y reemplazados.',
			undomsg: 'This will undo all edited text, not only text replacements.\r\nAre you sure you want to undo?', // New, needs tranlation.
			noselected: 'No selected text.' // New, needs tranlation.
		},
		fr: {
			far: 'Trouver et remplacer',
			farbuttontext: 'Trouver et remplacer le texte',
			farselbuttontext: 'Trouver et remplacer le texte sélectionné',
			selectedtext: 'Texte sélectionné :',
			findthis: 'Trouver ceci :',
			replacewith: 'Et le remplacer avec :',
			globalm: 'Recherche globale.',
			casesensitive: 'Sensible à la casse',
			enblregex: 'Utiliser les expressions régulières',
			undoedits: 'Annuler les modifications',
			undoinfo: 'Toutes, pas seulement les remplacements',
			collapse: 'Masquer',
			expand: 'Afficher',
			lbwarning: 'Attention : appuyer sur la\ntouche Entrée entrainera une\npublication des modifications',
			farfound: 'trouvés et remplacés.',
			undomsg: 'Toutes les modifications seront annulées, pas uniquement les remplacements.\r\nÊtes-vous sûr(e) de vouloir continuer ?',
			noselected: 'Aucun texte sélectionné.'
		},
		it: {
			far: 'Trova e sostituisci',
			farbuttontext: 'Trova e sostituisci il testo',
			farselbuttontext: 'Trova e sostituisci nel testo selezionato',
			selectedtext: 'Testo selezionato:',
			findthis: 'Trova questo:',
			replacewith: 'Sostituisci con:',
			globalm: 'Corrispondenza globale.',
			casesensitive: 'Distinzione maiuscole/minuscole.',
			enblregex: 'Attiva espressioni regolari',
			undoedits: 'Annulla modifiche',
			undoinfo: 'Annulla tutte le modifiche, non solo le sostituzioni',
			collapse: 'Comprimi',
			expand: 'Espandi',
			lbwarning: 'Attenzione: premendo INVIO\npubblicherai le tue modifiche',
			farfound: 'trovati e sostituiti.',
			undomsg: 'Questo annullerà tutte le modifiche, non solo le sostituzioni.\r\nSei sicuro di voler continuare?',
			noselected: 'Nessun testo selezionato.'
		},
		oc: {
			far: 'Trobar e remplaçar',
			farbuttontext: 'Trobar e remplaçar lo tèxt',
			farselbuttontext: 'Trobar e remplaçar lo tèxt seleccionat',
			selectedtext: 'Tèxt seleccionat :',
			findthis: 'Trobar aquò',
			replacewith: 'E lo remplaçar amb :',
			globalm: 'Recèrca globala.',
			casesensitive: 'Sensible a la cassa',
			enblregex: 'Utilisar las expressions regularas',
			undoedits: 'Desfar las edicions',
			undoinfo: 'Totas, pas sonque los remplaçaments',
			collapse: 'Amagar',
			expand: 'Afichar',
			lbwarning: 'Atencion : apiejar sus "Enter" publicarà\nlas edicions',
			farfound: 'trobats e remplaçats.',
			undomsg: 'Aquò desfarà totas las edicions, non pas solament los remplaçaments. Sètz segur(a) de voler contunhar ?',
			noselected: 'Cap de tèxt seleccionat.'
		},
		pl: {
			far: 'Znajdź i zamień',
			farbuttontext: 'Znajdź i zamień tekst',
			farselbuttontext: 'Znajdź i zamień zaznaczony tekst',
			selectedtext: 'Zaznaczony tekst:',
			findthis: 'Znajdź to:',
			replacewith: 'Zamień na:',
			globalm: 'Globalne dopasowanie.',
			casesensitive: 'Wielkość liter.',
			enblregex: 'Włącz wyrażenia regularne',
			undoedits: 'Cofnij edycje',
			undoinfo: 'Wszystkie zmiany, nie tylko zamienione',
			collapse: 'Zwiń',
			expand: 'Rozwiń',
			lbwarning: 'Uwaga: naciskając klawisz Enter \nmożesz opublikować swoją edycję',
			farfound: 'znaleziono i zamieniono.',
			undomsg: 'Wycofuje cały edytowany tekst, nie tylko zamieniony tekst.\r\nCzy na pewno chcesz cofnąć?',
			noselected: 'Brak zaznaczonego tekstu.'
		},
		vi: {
			far: 'Tìm và thay thế',
			farbuttontext: 'Tìm và Thay thế Văn bản',
			farselbuttontext: 'Find and Replace Selected Text', // New, needs translation
			selectedtext: 'Selected text:', //New, needs translation
			findthis: 'Tìm:',
			replacewith: 'Thay với:',
			globalm: 'Khớp toàn bộ.',
			casesensitive: 'Phân biệt hoa thường.',
			enblregex: 'Enable regular expressions', // New, needs translation
			undoedits: 'Hoàn tác chỉnh sửa',
			undoinfo: 'Tất cả thao tác sửa, không chỉ thay thế',
			collapse: 'Thu gọn',
			expand: 'Mở rộng',
			lbwarning: 'Cảnh báo: nhấn phím Chọn (Enter)\nsẽ phát hành bản sửa của bạn.',
			farfound: 'đã tìm thấy và thay thế.',
			undomsg: 'Điều này sẽ hoàn tác tất cả văn bản đã chỉnh sửa, không chỉ văn bản đã thay thế.\r\nBạn có muốn hoàn tác?',
			noselected: 'No selected text.' // New, needs tranlation.
		}
	};
	var st = $.storage.get("FindAndReplace"),
		cvGM = window.cvGlobalMatching || 'checked',
		cvCS = window.cvCaseSensitive || 'unchecked',
		cvRG = window.cvEnableRegex || 'unchecked',
		selectedText = "",
		contengut = document.getElementById("wpTextbox1"),
		debuta,
		fin;
	if(typeof st !== 'object' || st === null) st = {
		sh: false,
		gm: true,
		cs: false
	};
	lng = $.extend(lng.en, lng[mw.config.get('wgContentLanguage')], lng[mw.config.get('wgUserLanguage')]);
	$('.rail-auto-height').prepend('<div class="module far-module"><h3><span>' + lng.far + '</span><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron ' + (st.sh ? 'collapse' : 'expand') + '"></h3><div class="module_content" id="findfielddiv" style="display: ' + (st.sh ? 'block' : 'none') + '; padding-top:5px;"><div>' + lng.findthis + '<div style="padding-top:3px;"><textarea id="find_this" style="margin: 0; width:100%;" rows="4" wrap="off"></textarea></div></div><div style="padding-top:8px;">' + lng.replacewith + '</div><div style="padding-top:3px;"><textarea id="replace_with" style="margin: 0; width:100%;" rows="4" wrap="off" placeholder=""></textarea></div><div style="padding:7px 0px 7px 0px;"><table><tr><td><label><input title="' + lng.globalm + '" type="checkbox" id="globl"' + cvGM + '>' + lng.globalm + '</label></td></tr><tr><td><label><input title="' + lng.casesensitive + '" type="checkbox" id="case_sen"' + cvCS + '>' + lng.casesensitive + '</label></td></tr><tr><td><label><input title="' + lng.enblregex + '" type="checkbox" id="regex_search"' + cvRG + '>' + lng.enblregex + '</label></td></tr><tr><td><span id="far-found"></span></td></tr></table><center><input type="button" value="' + lng.farbuttontext + '" id="find-and-replace"><br><br><input type="button" value="' + lng.farselbuttontext + '" id="find-and-replace-selected"></center><br /><p style="font-size: 120%">' + lng.selectedtext + '</p><br><textarea id="texteselectionne" readonly="" style="width: 100%; height: 80px;"></textarea><br><a href="javascript:void(0)" id="far-undo">' + lng.undoedits + '</a><sup><acronym title="' + lng.undoinfo + '" style="border: none;" class="icone-aide"><img src="https://images.wikia.nocookie.net/__cb20141207003419/harrypotter/fr/images/thumb/6/6c/Icone-aide.png/12px-Icone-aide.png" alt="Icone-aide" class="lzyPlcHld  lzyTrns lzyLoaded" data-image-key="Icone-aide.png" data-image-name="Icone-aide.png" data-src="https://images.wikia.nocookie.net/__cb20141207003419/harrypotter/fr/images/thumb/6/6c/Icone-aide.png/12px-Icone-aide.png" width="12" height="12"></acronym></sup></div></div></div>');
	$(window).resize(function () {
		$('#findfielddiv').height($(window).height() - 250 - $('.module_content').height());
	});
	$(window).trigger('resize');
	$('#find-and-replace').click(function () {
		var searchfor = '',
			searchexp,
			$textarea = $('#wpTextbox1'),
			replacewith = $('#replace_with').val().replace(/\r/gi, ''),
			text = $textarea.val().replace(/\r/gi, ''),
			flagg = 'g',
			flagi = 'i',
			enableregex = 0;

		if($('#globl').prop('checked') === false) {
			flagg = '';
		}
		if($('#case_sen').prop('checked') === true) {
			flagi = '';
		}
		if($('#regex_search').prop('checked') === true) {
			enableregex = 1;
		}
		var flags = flagg + flagi + 'm';
		if(enableregex === 1) {
			searchfor = $('#find_this').val();
		} else {
			searchfor = $('#find_this').val().replace(/\r/gi, '').replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
		}
		searchexp = new RegExp(searchfor, flags);
		var rcount = 0;
		var matched = text.match(searchexp);
		if(matched !== null) {
			rcount = matched.length;
		}
		text = text.replace(searchexp, replacewith);
		$textarea.val(text);
		$('#far-found').text(rcount + ' ' + lng.farfound);
	});

	function getSelectedText() {
		var texte = "";
		if(window.getSelection) {
			texte = window.getSelection().toString();
		} else if(document.selection && document.selection.type != "Control") {
			texte = document.selection.createRange().text;
		}
		if(texte === "") {
			texte = selectedText;
		}
		return texte;
	}
	$('#wpTextbox1').bind('mouseup keyup mouseleave', function () {
		selectedText = getSelectedText();
		debuta = contengut.selectionStart;
		fin = contengut.selectionEnd;
		$('#texteselectionne').text(selectedText);
	});
	$('#find-and-replace-selected').click(function () {
		if(selectedText === "") {
			alert(lng.noselected);
		}
		var searchfor = '',
			searchexp,
			searchexp2,
			letexte,
			selectedText2,
			$textarea = $('#wpTextbox1'),
			replacewith = $('#replace_with').val().replace(/\r/gi, ''),
			text = $textarea.val().replace(/\r/gi, ''),
			flagg = 'g',
			flagi = 'i',
			enableregex = 0;

		if($('#globl').prop('checked') === false) {
			flagg = '';
		}
		if($('#case_sen').prop('checked') === true) {
			flagi = '';
		}
		var flags = flagg + flagi + 'm';
		if(enableregex === 1) {
			searchfor = $('#find_this').val();
		} else {
			searchfor = $('#find_this').val().replace(/\r/gi, '').replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
		}
		searchexp = new RegExp(searchfor, flags);
		selectedText2 = selectedText.replace(/\r/gi, '').replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
		searchexp2 = new RegExp(selectedText2, 'im');
		var rcount = 0;
		var matched = selectedText.match(searchexp);
		if(matched !== null) {
			rcount = matched.length;
		}
		letexte = selectedText.replace(searchexp, replacewith);
		text = text.substring(0, debuta) + letexte + text.substring(fin);
		$textarea.val(text);
		$('#far-found').text(rcount + ' ' + lng.farfound);
		selectedText = letexte;
		$('#texteselectionne').text(selectedText);
	});

	function getOldContent() {
		$("#wpTextbox1").val($("#wpTextbox1").text());
	}
	$('a#far-undo').click(function () {
		if(confirm(lng.undomsg)) getOldContent();
	});
	$(".far-module h3").click(function () {
		var $header = $(this);
		var $content = $header.next();
		var $visible = $content.is(":visible");
		$header.find('span').text(lng.far);
		$header.find(".chevron").addClass($visible ? "expand" : "collapse").removeClass($visible ? "collapse" : "expand");
		$content.stop().slideToggle(500);
	});
	$(window).bind("beforeunload", function () {
		$.storage.set("FindAndReplace", {
			sh: $("#findfielddiv").is(":visible")
		});
	});
});

//</nowiki>
//</source>