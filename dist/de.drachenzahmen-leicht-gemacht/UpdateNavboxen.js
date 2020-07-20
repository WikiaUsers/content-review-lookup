// Buttons erstellen
$('.page-Vorlage_Drachen #WikiaPageHeader').append('<a id="updateNavbox1" class="wikia-button secondary" style="margin-right: 10px;">Updaten</a>');
$('.page-Vorlage_Drachenarten #WikiaPageHeader').append('<a id="updateNavbox2" class="wikia-button secondary" style="margin-right: 10px;">Updaten</a>');

//Vorlage:Drachenarten
$('#updateNavbox2').click(getDataNavbox2);

function setDataKlasse (name) {
    
    var data = [];
    var drachen = setData();
    
    $('#' + name + 'klasseData .CategoryTreeLabel').each(function () {
        var gleich = false;
        for (var i = 0; i < drachen.length; i++) {
            if (drachen[i] === $(this).html().toString()) {
                gleich = true;
                break;
            }
        }
        
        if(!gleich) {
            data.push($(this).html().toString());
        }
    });
    
    return data;
    
}

function getDataNavbox2 () {
    
    var angriffs = setDataKlasse("angriffs"),
        aufspuerer = setDataKlasse("aufspuerer"),
        chaos = setDataKlasse("chaos"),
        gezeiten = setDataKlasse("gezeiten"),
        pfeil = setDataKlasse("pfeil"),
        phantom = setDataKlasse("phantom"),
        wackerstein = setDataKlasse("wackerstein"),
        unbekannt = [];
        sonstige = "|'''Sonstiges'''\n"
            + '| id="sonstigeKlassen" |[[Dracheneier]] • [[Drachenkindergarten|Drachenbabys]] • [[Titanflügler]] • [http://de.drachenzahmen-leicht-gemacht.wikia.com/wiki/Dragons-Aufstieg_von_Berk#Kampfdrachen Kampfdrachen] • [http://de.drachenzahmen-leicht-gemacht.wikia.com/wiki/Dragons-Aufstieg_von_Berk#Exotische_Drachen Exotische Drachen] • [http://de.drachenzahmen-leicht-gemacht.wikia.com/wiki/Dragons-Aufstieg_von_Berk#Brutale_Drachen Brutale Drachen] • [http://de.drachenzahmen-leicht-gemacht.wikia.com/wiki/Dragons-Aufstieg_von_Berk#Junge_Drachen Junge Drachen] • [http://de.drachenzahmen-leicht-gemacht.wikia.com/wiki/Dragons-Aufstieg_von_Berk#Ur-Drachen Ur-Drachen] • [http://de.drachenzahmen-leicht-gemacht.wikia.com/wiki/Dragons-Aufstieg_von_Berk#Verbannte_Drachen Verbannte Drachen]\n';
    
    
    var a = '{|class="Vorlage mw-collapsible mw-collapsed drachenarten"\n!colspan=2 style="border-bottom: none;"|Drachenarten\n|-\n',
        m = setRowKlasse("Angriffs", angriffs)
            + setRowKlasse("Aufspürer", aufspuerer)
            + setRowKlasse("Chaos", chaos)
            + setRowKlasse("Gezeiten", gezeiten)
            + setRowKlasse("Pfeil", pfeil)
            + setRowKlasse("Phantom", phantom)
            + setRowKlasse("Wackerstein", wackerstein);
    
    $('.drachenarten #unbekannteKlasse a').each(function () {
        unbekannt.push($(this).html().toString());
    });
    
    var r = "|'''Unbekannte<br>Klasse'''\n"
            + '| id="unbekannteKlasse" | [['
            + unbekannt.join("]]  • [[")
            + ']]\n|-\n'
            + sonstige,
        e = '|}\n<noinclude>\n<categorytree mode=pages hideroot=on id="angriffsklasseData" style="display: none">Angriffsklasse</categorytree>\n<categorytree mode=pages hideroot=on id="aufspuererklasseData" style="display: none">Aufspürerklasse</categorytree>\n<categorytree mode=pages hideroot=on id="chaosklasseData" style="display: none">Chaosklasse</categorytree>\n<categorytree mode=pages hideroot=on id="gezeitenklasseData" style="display: none">Gezeitenklasse</categorytree>\n<categorytree mode=pages hideroot=on id="pfeilklasseData" style="display: none">Pfeilklasse</categorytree>\n<categorytree mode=pages hideroot=on id="phantomklasseData" style="display: none">Phantomklasse</categorytree>\n<categorytree mode=pages hideroot=on id="wackersteinklasseData" style="display: none">Wackersteinklasse</categorytree>\n<categorytree mode=pages id="drachenData" style="display: none">Drachen (Film)</categorytree>\n[[Kategorie:Infobox-Vorlagen]]\n</noinclude>';
    
    
    alert("Kopiere den folgenden Text! Achtung es wird mehr als nur einmal ein Popup-Fenster kommen! Deshalb wird jetzt schon ein Fenster fürs Bearbeiten bereitgestellt!");
    window.open("http://de.drachenzahmen-leicht-gemacht.wikia.com/wiki/Vorlage:Drachenarten?action=edit", "_blank");
    alert(a);
    alert(m);
    alert(r);
    alert(e);
    alert("Das war es schon! ^^ Vielen Dank für die Aktualiesierung dieser Seite! :D")
    
}

function setRowKlasse (name, arr) {
    var s = '| [[Datei:' + name + 'klasse-icon.png|50px|link=' + name + 'klasse]]\n| [[' 
            + arr.join("]] • [[") + "]]\n|-\n";
    return s;
}


//Vorlage:Drachen

function setData () {
    var data = [];
    $('#drachenData .CategoryTreeLabel').each(function () {
        data.push($(this).html().toString());
    });
    return data;
}

$('#updateNavbox1').click(getDataNavbox1);

function getDataNavbox1 () {
    var drachen = setData();
    var a = '{|class="Vorlage  mw-collapsible mw-collapsed"\n!colspan=2|Drachen\n|-\n| [[',
        m = drachen.join("]] • [["),
        e = ']]\n|}\n<noinclude>\n<categorytree mode=pages id="drachenData" style="display: none">Drachen (Film)</categorytree>\n[[Kategorie:Infobox-Vorlagen]]\n</noinclude>';
    
    alert("Kopiere den folgenden Text! Achtung es wird mehr als nur einmal ein Popup-Fenster kommen! Deshalb wird jetzt schon ein Fenster fürs Bearbeiten bereitgestellt!");
    window.open("http://de.drachenzahmen-leicht-gemacht.wikia.com/wiki/Vorlage:Drachen?action=edit", "_blank");
    alert(a);
    alert(m);
    alert(e);
    alert("Das war es schon! ^^ Vielen Dank für die Aktualiesierung dieser Seite! :D")
}