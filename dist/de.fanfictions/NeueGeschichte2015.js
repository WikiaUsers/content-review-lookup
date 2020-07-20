if (wgArticleId === 17541) {
importScriptPage("MediaWiki:ApiKey.js", "de.fanfictions");
$("body").append('<style>#fortlaufende_geschichte_form input, #fortlaufende_geschichte_form textarea { box-sizing: border-box; } .flex-label { order: 1; flex-grow: 0; margin-right: 6px; } .flex-input { order: 2; flex-grow: 1; }</style>');


/*$("#geschichten-entrypoint").html('<button onclick="mum_neueGeschichteBeginnen()">Neue Geschichte beginnen</button>');*/

neueGeschichteFormular = '<div id="neueGeschichteFormular">'
	+ '<div style="">'
		+ '<h2>Name deiner Geschichte</h2>'
		+ '<div><input style="padding: 0 10px; box-sizing: border-box; width: 100%; font-size: 16px; height: 30px;" id="geschichtenname" type="text" placeholder="Gib deiner Geschichte einen Namen!" value="" style="width:100%;"></div>'
	+ '</div>'
	+ '<div id="chooseType">'
		+ '<h2>Wähle die Form deiner Geschichte aus</h2>'
		+ '<form>'
			+ '<input type="radio" name="format" value="einteilig" checked> Einteilige Geschichte (in sich abgeschlossen auf einer einzigen Seite - einfach mal so was schreiben)'
			+ '<br>'
			+ '<input type="radio" name="format" value="mehrteilig"> Mehrteilige Geschichte (fortlaufend - du planst, mehrere Kapitel zu schreiben)'
			+ '</form>'
	+ '</div>'
	+ '<div id="geschichtentext_box">'
		+ '<h2>Gib hier deinen Kapiteltext ein (bis zu 2000 Zeichen beim Erstellen erlaubt - danach mehr)</h2>'
		+ '<div id="successnotearea"></div><textarea style="width: 100%; box-sizing: border-box; height: 200px; font-size: 110%;"></textarea>'
		+ '<div style="float: right;"><button id="saveValues" onclick="submitStory()">Abschicken</button></div><div style="margin-right: 10px; float: right;" id="textarea_characters"><span>0</span>/2000</div>'
	+ '</div>'
+ '</div>';

function checkSubmissionStatus() {
	if (partssubmitted === "url_geschichte_uebersicht,url_geschichte_kapitel1,url_geschichtenbalken,url_autor,url_status,") {
		$("#successnotearea").removeClass("error").addClass("success").addClass("mainpage-box").css("padding", "10px").html('Alles lief wie am Schnürchen! Deine Geschichte ist jetzt verfügbar unter <a href="http://de.fanfictions.wikia.com/wiki/Geschichte:' + name + '" style="text-decoration: underline;">diesem Link</a>.');
	} else {
		$("#successnotearea").removeClass("success").addClass("error").addClass("mainpage-box").css("padding", "10px").html("Hmm... scheint als wäre nicht alles übertragen worden. Klicke nochmal auf > Abschicken < und dann <button onclick='checkSubmissionStatus()'>prüfe nochmal, ob alles übermittelt wurde</button>");
	}
}

function count_textarea() {
$('#geschichtentext_box textarea').keyup(function() {
    characters_entered = $(this).val().length;
    $('#textarea_characters span').text(characters_entered);
});
}

function mum_neueGeschichteBeginnen() {
	$("#geschichten-entrypoint").fadeOut();
	$("#geschichten-entrypoint").after(neueGeschichteFormular);
	
	count_textarea();

	$('input[type=radio][name=format]').change(function() {
        if (this.value == 'mehrteilig') {
			format = $("input[name=format]:checked").val();
			$("#geschichtentext_box h2").text('Gib hier den Text deines ersten Kapitels ein (bis zu 2000 Zeichen beim Erstellen erlaubt - danach mehr)');
        }
        else if (this.value == 'einteilig') {
			format = $("input[name=format]:checked").val();
            $("#geschichtentext_box h2").text("Gib hier deinen Kapiteltext ein (bis zu 2000 Zeichen beim Erstellen erlaubt - danach mehr)");
        }
    });
}

function submitStory() {
name = $("#geschichtenname").val().replace(/^[a-z]/, function(m){ return m.toUpperCase() });
format = $("input[name=format]:checked").val();
text = $("#geschichtentext_box textarea").val();

	geschichte_inhalt = '{{Geschichtenbalken}}\n\n' + text + '\n\n{{Bearbeiter\|1=\n~~' + '~~\n}}';
	mehrteilig_kapitel = geschichte_inhalt;

	onlyCreate = '&createonly=1'
	geschichtenbalken_seite = "Vorlage:Geschichtenbalken/" + name;
	status_seite = "Vorlage:Status/" + name;
	autor_seite = "Vorlage:Autoren/" + name + "/Autor/"
	
	if (format === "einteilig") {
		
		rc_summary = "Neue Kurzgeschichte hinzugefügt";
		
		geschichtenbalken = '{{Geschichten-Info\n<!------------- - - ------------->\n|LastUpdateHack={{{LastUpdateHack|{{REVISIONDAY2}}.{{REVISIONMONTH}}.{{REVISIONYEAR}}}}}\n|Portal={{{Portal|}}}\n|Name=' + name + '\n|Kurzgeschichte=1\n}}<noinclude>{{Geschichten-Info/Autoren-Werkzeugkasten|Kurzgeschichte=1}}[[Kategorie:Angepasste Kurzgeschichtenbalken]]</noinclude>';
		
		url_geschichte_kapitel1 = '';
	
	} else if (format === "mehrteilig") {
	
		rc_summary = "Neue Geschichte gestartet";
		
		geschichtenbalken = '{{Geschichten-Info\n<!------------- - - ------------->\n|LastUpdateHack={{{LastUpdateHack|{{REVISIONDAY2}}.{{REVISIONMONTH}}.{{REVISIONYEAR}}}}}\n|Portal={{{Portal|}}}\n|Name=' + name + '\n}}<noinclude>{{Geschichten-Info/Autoren-Werkzeugkasten}}[[Kategorie:Angepasste Geschichtenbalken]]</noinclude>';
		
		geschichte_inhalt = '{{Geschichtenbalken}}\n\n\{{Neuigkeitenmodul}}\n\n\=\=Handlung\=\=\n{{Beschreibungen/{{PAGENAME}}}}\n\n\=\=Kapitel\=\=\n*{{Kapitel|001}}\n*{{Kapitel|002}}\n*{{Kapitel|003}}\n*{{Kapitel|004}}\n*{{Kapitel|005}}\n\n\=\=Informationen über Charaktere\=\=\n*[[Beispielcharakter]]\n\n{{Bearbeiter\|1=\n~~' + '~~\n}}';
		
	    url_geschichte_kapitel1 = _api.server + '/api.php?action=edit&title=' + encodeURIComponent("Geschichte:" + name + "/001") + '&text=' + encodeURIComponent(mehrteilig_kapitel) + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=' + "Neues Kapitel hinzugefügt" + onlyCreate;
	
	} else {
	
		alert("Bitte wähle eine Geschichtenform aus (u.u. musst du kurz das andere auswählen und dann wieder das was du wolltest)");
		return;
	
	}
	
	/* urls zum übermitteln */
	url_geschichte_uebersicht = _api.server + '/api.php?action=edit&title=' + encodeURIComponent("Geschichte:" + name) + '&text=' + encodeURIComponent(geschichte_inhalt) + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=' + rc_summary + onlyCreate;
	
	url_status = _api.server + '/api.php?action=edit&title=' + encodeURIComponent(status_seite) + '&text=' + encodeURIComponent("neu") + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=Status aktualisiert' + onlyCreate;

	url_autor = _api.server + '/api.php?action=edit&title=' + encodeURIComponent(autor_seite) + '1' + '&text=' + encodeURIComponent(wgUserName) + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=Autor eingetragen' + onlyCreate;
 
	url_geschichtenbalken = _api.server + '/api.php?action=edit&title=' + encodeURIComponent("Vorlage:Geschichtenbalken/" + name) + '&text=' + encodeURIComponent(geschichtenbalken) + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=Geschichtenbalken angelegt' + onlyCreate;
	
	if (format === "einteilig") {
		
		if (url_geschichte_uebersicht.length > 4500) {
			alert("Du hast das Limit für die Geschichte überschritten (die erzeugte URL ist zu lang - insgesamt " + url_geschichte_uebersicht.length + " Zeichen. Kürze sie und füge den Rest ein, nachdem die Geschichte erstellt wurde!");
			return;
		}
	
	} else if (format === "mehrteilig") {
		
		if (url_geschichte_kapitel1.length > 4500) {
			alert("Du hast das Limit für die Geschichte überschritten (die erzeugte URL ist zu lang - insgesamt " + url_geschichte_kapitel1.length + " Zeichen. Kürze sie und füge den Rest ein, nachdem die Geschichte erstellt wurde!");
			return;
		}
	
	} else {
	
		alert("Bitte wähle eine Geschichtenform aus (u.u. musst du kurz das andere auswählen und dann wieder das was du wolltest)");
		return;
	
	}
	
	partssubmitted = '';
	
	/* posten der sachen */
	$.post(url_geschichte_uebersicht, function () {
		partssubmitted += "url_geschichte_uebersicht,"
    })
	setTimeout(function() {
		$.post(url_geschichte_kapitel1, function () {
			partssubmitted += "url_geschichte_kapitel1,"
		});
	}, 1000);
	setTimeout(function() {
		$.post(url_geschichtenbalken, function () {
			partssubmitted += "url_geschichtenbalken,"
		});
	}, 2000);
	setTimeout(function() {
		$.post(url_autor, function () {
			partssubmitted += "url_autor,"
		});
	}, 3000);
	setTimeout(function() {
		$.post(url_status, function () {
			partssubmitted += "url_status,"
		});
	}, 4000);
	// prüfe, ob alles übermittelt wurde
	setTimeout(function () {
		checkSubmissionStatus();
	}, 5000);
}

setTimeout(function() {
mum_neueGeschichteBeginnen();
}, 1000);
}