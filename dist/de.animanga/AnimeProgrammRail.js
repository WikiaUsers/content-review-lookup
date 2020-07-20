
// rail stuff
var wochentag = new Date().getDay();  //0=Sun, 1=Mon, ..., 6=Sat
 
                        setTimeout(function() {
 
        if ($('#WikiaRail section').length > 0) {
 
                $('#WikiaRail section.module:last').after('<section style="margin-bottom: 10px; padding: 0;" class="module" id="animeprogrammrail"><div style="padding: 20px 15px 15px;"><h2>Aktuelles Anime-Programm</h2><a href="/wiki/Project:TV-Programm">Komplettes Programm anzeigen »</a></div><div id="loadprogrammsubpage">Programm wird geladen</div></section>');
 
                $('body').append('<style>#animeprogrammrail #loadprogrammsubpage .flex-container { display: none; }</style>');
 
 
}                        
 
                        setTimeout(function() {                                              
 
switch(wochentag) {
    case 0:
        //sonntag
        $('#loadprogrammsubpage').load('http://de.animanga.wikia.com/wiki/Vorlage:TV-Programm/Code/Sonntags?action=render');
        break;
    case 1:
        //montag
        $('#loadprogrammsubpage').load('http://de.animanga.wikia.com/wiki/Vorlage:TV-Programm/Code/Montags?action=render');
        break;
    case 2:
        //dienstag
        $('#loadprogrammsubpage').load('http://de.animanga.wikia.com/wiki/Vorlage:TV-Programm/Code/Dienstags?action=render');
        break;
    case 3:
        //mittwoch
        $('#loadprogrammsubpage').load('http://de.animanga.wikia.com/wiki/Vorlage:TV-Programm/Code/Mittwochs?action=render');
        break;
    case 4:
        //donnerstag
        $('#loadprogrammsubpage').load('http://de.animanga.wikia.com/wiki/Vorlage:TV-Programm/Code/Donnerstags?action=render');
        break;
    case 5:
        //freitag
        $('#loadprogrammsubpage').load('http://de.animanga.wikia.com/wiki/Vorlage:TV-Programm/Code/Freitags?action=render');
        break;
    case 6:
        //samstag
        $('#loadprogrammsubpage').load('http://de.animanga.wikia.com/wiki/Vorlage:TV-Programm/Code/Samstags?action=render');
        break;        
    default:
        montag
}
 
}, 1000);
 
// end outer settimeout
                                              },500);