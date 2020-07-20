//<pre><nowiki>
//===========================================================
//Original Klick-Kat Funktion stammt von http://kamelopedia.mormo.org/ - lizenziert unter GFDL
//===========================================================
//Diese Seite wird von [[MediaWiki:Common.js]] aus geladen, sobald eine Seite bearbeitet wird
/** fügt Klick-Kat (kat) am Ende des Textes im Editierfensters ein */ 
function add_cat(kat) {
    document.editform.wpTextbox1.value += '\n[[Kategorie:' + kat + ']]';
}
    
/** bastelt die Edittools-Box */
addOnloadHook(function() {
    var kategorieNamen = [
       "Amerikanien",
       "Aquanopolis",
       "Architektur",
       "Aztekenreich",
       "Begriffsklärung",
       "Bösewichte und Fieslinge",
       "Delikatesse",
       "Datum",
       "Dixie Confederation",
       "Erfindung",
       "Erhaben, edel und schön",
       "Essen und Trinken",
       "Explosiv",
       "Feste & Feiertage",
       "Frankreich",
       "Gebäude und Monumente",
       "Geographie",
       "Geschichte",
       "Geschichten und Erzählungen",
       "Gesellschaft",
       "Gut zu wissen"
       "Herrscher",
       "Insel",
       "Kotzbrocken und Ekelpakete",
       "Krieg",
       "Kultur",
       "Kunst",
       "Künstler",
       "Legende",
       "Listen",
       "Militär",
       "Musik",
       "Mysteriöse Kreaturen",
       "Nationalhymne",
       "Naturwissenschaft",
       "Physik",
       "Politiker",
       "Pressedienste",
       "Raumfahrt",
       "Religion",
       "Russland",
       "Sport",
       "Staat",
       "Stadt",
       "Technik",
       "Terrorismus",
       "Tier",
       "Tod, Seuchen und Katastrophen",
       "Ungeklärte Rätsel",
       "Verbrechen & Kriminelles",
       "Volk",
       "White House Diaries",
       "Zeit & Raum",
       "Wissenschaft"     
    ];
        
    function kategorienHTML() {
        var html    = '<span id="clickein"><a href="javascript:einaus(\'kats\',\'clickein\',\'clickaus\')">[anzeigen]</a></span><span id="clickaus" style="Display:none;"><a href="javascript:einaus(\'kats\',\'clickein\',\'clickaus\')">[verbergen]</a></span><span id ="kats" style="display:none;"><br />';
        
        for (var i=0; i<kategorieNamen.length; i++ ) {
            var kat = kategorieNamen[i];
            html += '<a href="javascript:add_cat(\'' + kat + '\')">·&nbsp;' + kat + '</a><br />';
        }
        
        html += '</span><br /><br />';
        return html;
    }
    
    function sonderzeichenHTML() {
        var html = '<b>Vorlagen und Sonderzeichen:</b><br />';
        html += '<span id="sonderein"><a href="javascript:einaus(\'sonder\',\'sonderein\',\'sonderaus\')">[anzeigen]</a></span><span id="sonderaus" style="Display:none;"><a href="javascript:einaus(\'sonder\',\'sonderein\',\'sonderaus\')">[verbergen]</a></span><span id ="sonder" style="display:none;font-family:monospace;font-size:9pt;line-height:1.6em;"><br />';

        // siehe auch addButton() in wikibits.js
        function knopf(tagOpen, tagClose, sampleText, displayedText) {
            // sampleText wird eingefügt falls man nichts markiert hat (z.Z. überall leer)
            html += "<a href=\"javascript:insertTags";
            html += "('"+tagOpen+"','"+tagClose+"','"+sampleText+"');\">";
            html += displayedText;
            html += "</a>&nbsp;";
        }
        
        function zeichen(s) { knopf(s,'','', s); }
        function klammer(tagOpen, tagClose) { knopf(tagOpen, tagClose,'', tagOpen+tagClose); }
        function trenn() { html += '<br />'; }
        function vorlage (v) {knopf ('{{'+v+'}}','','',v+'<br />');}
        
            vorlage('Achtung');       // nur die, die im normalen Betrieb Verwendung finden
            vorlage('Dürftig');
            vorlage('Hai');
            vorlage('Hinweis');
            vorlage('Lachfisch-Zahlenstrahl');
            vorlage('Stichwort');
            vorlage('Toll');
            vorlage('Unfisch');
            vorlage('WKV');
        trenn();                     // ergibt eine leerzeile

            klammer('{{','}}');
        trenn();
            klammer('[[',']]');
        trenn();
            klammer('„','“');
        trenn();
            klammer('‚','‘');
        trenn();
            klammer('«','»');
        trenn();
        trenn();                     // ergibt eine leerzeile

        zeichen('Ä');
        zeichen('ä');
        zeichen('Ö');
        zeichen('ö');
        zeichen('Ü');
        zeichen('ü');
        trenn();

        zeichen('ß');
        zeichen('’');
        zeichen('–');
        zeichen('°');
        zeichen('′');
        zeichen('″');
        trenn();

        zeichen('…');
        zeichen('€');
        zeichen('†');
        zeichen('§');
        zeichen('™');
        zeichen('•');
        trenn();

        zeichen('·');
        zeichen('×');
        zeichen('÷');
        zeichen('±');
        zeichen('−');
        zeichen('‰');
        trenn();

        zeichen('²');
        zeichen('³');
        zeichen('½');
        zeichen('¼');
        zeichen('¾');
        zeichen('‣');
        trenn();

        zeichen('≈');
        zeichen('≠');
        zeichen('≙');
        zeichen('≤');
        zeichen('≥');
        zeichen('∑');
        trenn();

        zeichen('→');
        zeichen('←');
        zeichen('↔');
        zeichen('⇝');
        zeichen('⇒');
        zeichen('⇔');
        trenn();

        zeichen('☛');
        zeichen('†');
        zeichen('☠');
        zeichen('☢');
        zeichen('☣');
        zeichen('☭');
        trenn();

        zeichen('ſ');
        zeichen('Œ');
        zeichen('œ');
        zeichen('Ç');
        zeichen('ç');
        trenn();

        zeichen('İ');
        zeichen('ı');
        zeichen('Ğ');
        zeichen('ğ');
        zeichen('Ş');
        zeichen('ş');
        trenn();

        zeichen('|');
        zeichen('&amp;nbsp;');
        zeichen('~~~~');
        
        html += '</span>';
        return html;
    }
    
    var inhalt = '<i>Klick-und-Rein</i>&nbsp;<a href="/wiki/Hilfe:Edittools" target="_blank" title="Hilfe (in neuem Fenster)"><sup>?</sup></a><br /><br /><b>Kategorien:</b><br />';
    
    inhalt  += kategorienHTML();
    inhalt  += "<br /><br />";
    inhalt  += sonderzeichenHTML();
    inhalt  += "<br /><br />";
        
    var kat_div_2 = document.createElement('div');
    kat_div_2.id = 'kat_div_2';
    kat_div_2.innerHTML += inhalt;
    document.getElementById('editform').insertBefore(kat_div_2, document.getElementById('editpage-copywarn'));
    
    // Leerzeilen am Ende des Artikeltextes entfernen
    document.editform.wpTextbox1.value = document.editform.wpTextbox1.value.replace(/\s+$/, "");
});
//===========================================================
//Original Klick-Kat Funktion stammt von http://kamelopedia.mormo.org/ - lizenziert unter GFDL
//===========================================================
//</nowiki></pre>