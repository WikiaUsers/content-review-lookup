importScriptPage('MediaWiki:LWN.js', 'bastelstube5');
//importScriptPage('MediaWiki:InterwikiBox.js', 'bastelstube5');
importScriptPage('MediaWiki:Mum-advent-local.js', 'bastelstube5');
importScriptPage('MediaWiki:PutWikiUpForAdoption.js', 'bastelstube5');

importScriptPage('MediaWiki:AnimeProgrammRail.js', 'bastelstube5');

// cache #6

if (wgPageName.match(/TV\-Programm/g) && (wgUserGroups.indexOf("bot") > -1 || wgUserGroups.indexOf("helper") > -1 || wgUserGroups.indexOf("staff") > -1 || wgUserGroups.indexOf("sysop") > -1)) { 
if ($('.programmingbar').length) { } else {
$('.anime-tv-heading').before('<button id="toggleProgrammierbar">Programmierbar anzeigen/verstecken</button><div class="programmingbar" style="display: none;"><div class="links" style="float: left; margin-right: 10px; width: 300px;"></div><div class="rechts" style="float: left; margin-left: 1%; max-width: 680px;"><div class="codegenerator" />Generierter Code (aktualisiert sich alle 5 Sekunden): <div class="codeoutput" style="white-space: pre; font-family: monospace; background: #eee; border: 1px dashed #aaa;" /></div><div style="clear: both;"></div></div>');
}

$('#toggleProgrammierbar').click(function(){

	$('.programmingbar').toggle();

});

var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();
var year = d.getFullYear();

$('body').append('<style>.programmingbar > div > div { padding: 10px; }'
+ '.codegenerator div div { width: 150px; float: left; } .codegenerator input { float: left; }'
+ '.codegenerator div.row { margin-bottom: 10px; float: left; width: auto; margin-right: 10px; }'
+ '</style>');

$('.programmingbar .links').html('' 
+ '<div class="wochentag">'
+	'Wochentag wählen: <select>'
+		'<option value="Montags">Montags</option>'
+		'<option value="Dienstags">Dienstags</option>'
+		'<option value="Mittwochs">Mittwochs</option>'
+		'<option value="Donnerstags">Donnerstags</option>'
+		'<option value="Freitags">Freitags</option>'
+		'<option value="Samstags">Samstags</option>'
+		'<option value="Sonntags">Sonntags</option>'
+	'</select>'
+ '</div>'
+ '<div style="border-top: 1px solid #aaa; border-bottom: 1px solid #aaa;">oder</div>'
+ '<div class="datum">'
+	'<input name="tag" /> Tag <br><input name="monat" /> Monat (Zahl) <br><input name="jahr" /> Jahr'
+ '</div>'
+ '<div id="url-generator"><button class="wochentag">Wochentag generieren</button>&nbsp;<button class="datum">Datum generieren</button><br><br>Füge hier den Code ein, den du auf der rechten Seite generierst: <a /></div>'
+ '');

$('input[name="tag"]').val(day);
$('input[name="monat"]').val(month);
$('input[name="jahr"]').val(year);

$('#url-generator .wochentag').click(function() {

	wochentag = $('.wochentag select').attr('value');
	
	$('#url-generator a').text(location.origin + '/wiki/Vorlage:TV-Programm/Code/' + wochentag + '?action=edit');

});

$('#url-generator .datum').click(function() {

	var zieltag = $('input[name="tag"]').val();
	var zielmonat = $('input[name="monat"]').val();
	var zieljahr = $('input[name="jahr"]').val();
	
	if (zieltag < 10) { zieltag = "0" + zieltag[0]; }
	if (zielmonat < 10) { zielmonat = "0" + zielmonat[0]; }

	wunschdatum = zieljahr + '/' + zielmonat + '/' + zieltag; 
	
	$('#url-generator a').text(location.origin + '/wiki/Vorlage:TV-Programm/Code/' + wunschdatum + '?action=edit');

});

$('.programmingbar .rechts .codegenerator').html(''

+ '<div class="row"><div>Thema: </div><input id="thema" value="Sailor Moon"/></div>'
+ '<div class="row"><div>Link zum Wiki/Artikel: </div><input id="wikiurl" value="http://something"/></div>'
+ '<div class="row"><div>Publisher (wo läuft es gerade?): </div><input id="publisher" value="TV-Sender"/></div>'
+ '<div class="row"><div>Datum (um welche Uhrzeit läuft es?): </div><input id="datum" value="0:00"/></div>'
+ '<div class="row"><div>Wochentag(e): </div><input id="wochentag" value="Mo-Fr"/></div>'
+ '<div class="row"><div>Typ (Anime/Film/Highlight): </div><input id="typ" value="Anime"/></div>'
+ '<div class="row"><div>Ausklappen (wenn ja, dann +): </div><input id="ausklappen" value="+"/></div>'
+ '<div class="row"><div>Bestimmte Bilddatei (exakter Name): </div><input id="bildname" value=""/></div>'

+ '<div style="clear: both;" />');

window.setInterval(function(){
	
var thema 		= $('#thema').val();
var wikiurl 	= $('#wikiurl').val();
var publisher 	= $('#publisher').val();
var datum 		= $('#datum').val();
var wochentag 	= $('#wochentag').val();
var typ 		= $('#typ').val();
var ausklappen 	= $('#ausklappen').val();
var bild 	= $('#bildname').val();
	
$('.codegenerator input').after('<div style="clear: both;"></div>');

if (bild !== '') { 

$('.programmingbar .rechts .codeoutput').html('<div style="padding: 10px;">'

+ '{{Aktuelle Anime und Manga/Eintrag/Box'
+ '\n|Thema=' + thema
+ '\n|Wiki-URL=' + wikiurl
+ '\n|Publisher=' + publisher
+ '\n|Datum=' + datum
+ '\n|Wochentag=' + wochentag
+ '\n|Typ=' + typ
+ '\n|Bild=' + bild
+ '\n|uncollapsed=' + ausklappen
+ '\n}}'

+ '</div>');

} else {

$('.programmingbar .rechts .codeoutput').html('<div style="padding: 10px;">'

+ '{{Aktuelle Anime und Manga/Eintrag/Box'
+ '\n|Thema=' + thema
+ '\n|Wiki-URL=' + wikiurl
+ '\n|Publisher=' + publisher
+ '\n|Datum=' + datum
+ '\n|Wochentag=' + wochentag
+ '\n|Typ=' + typ
+ '\n|uncollapsed=' + ausklappen
+ '\n}}'

+ '</div>');

}

}, 5000);

/*

{{Aktuelle Anime und Manga/Eintrag/Box
|Thema=Naruto Shuppuden
|Wiki-URL=http://de.naruto.wikia.com/
|Publisher=ProSieben MAXX
|Datum=15:30
|Wochentag=Mo-Fr
|Typ=Anime
|uncollapsed=+
}}

*/
} else {}