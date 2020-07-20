/* Aus rechtlichen Gruenden wurde die selbst verfeasste Spoilerfunktion (mit Cookie-Speicherung) entfernt und durch den Code von SpoilerArlert ersetzt.

Dokumentation:
http://dev.wikia.com/wiki/SpoilerAlert

Das Entfernen von Objekten und Gestaltung der Warnbos findet ihr im Wikia.css unter Spoiler-Warnbox.
*/

SpoilerAlert = {
    question: 'Achtung Spoiler!<br />' +
       '<img src="https://images.wikia.nocookie.net/__cb20131016220848/shingekinokyojin/de/images/7/7a/Stub_150px.png" style="width:70px;" /><br /><br />' +
       'Du wirst gerade von Spoiler attackiert. Dieses Wiki enthält Informationen aus dem japanischen Manga. Es kann sein, dass die Spannung auf den Manga und Anime verdorben wird. Mehr über Spoiler unter:<br />' +
       '<a href="http://de.shingekinokyojin.wikia.com/wiki/Spoiler">Spoiler ▼</a>',
    yes: 'OK, ich habe die Warnung gelesen',
    no: '',
    isSpoiler: function () {
        var dospoiler = wgCategories.indexOf('Charaktere') || wgCategories.indexOf('Anime') || wgCategories.indexOf('Manga');
        return -1 !== dospoiler;
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');