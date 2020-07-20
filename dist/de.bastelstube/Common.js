var _api = {
    edittoken: mw.user.tokens.values.editToken,
    watchtoken: mw.user.tokens.values.watchToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    language: mw.config.get('wgUserLanguage')
};
 
date = "~" + "~~" + "~~";
language = wgContentLanguage;

var kategorie_arr = ["Videospiele","TV","Filme","Anime"];
var kategorie_arr_options = "";
for (var i = 0; i < kategorie_arr.length; i++) {
   kategorie_arr_options += '<option>' + kategorie_arr[i] + '</option>';
  }
  
var hilfe_art_arr = ["Wiki-Paten-Antrag – Anfänger", "Wiki-Paten-Antrag – Forgeschritten", "Wiki-Paten-Antrag – Release steht bevor"];
var hilfe_art_arr_options = "";
for (var i = 0; i < hilfe_art_arr.length; i++) {
   hilfe_art_arr_options += '<option>' + hilfe_art_arr[i] + '</option>';
  }
  
var checkbox_default = '<li class="checkbox-li"><label class="checkbox" name="regexreplace1"><input type="checkbox" name="regexreplace1" id="regexreplace1"><span>regexreplace1</span></label></li>';
var checkbox_values = ["Vorlagen: Infoboxen", "Vorlagen: Navboxen", "Vorlagen: Sonstige", "Strukturierung von Artikelseiten", "Strukturierung der Kategoriestruktur", "Grafische Hilfe: Wiki-Logo", "Grafische Hilfe: Wiki-Hintergrund", "Hauptseite: Was kann ich noch besser machen?", "Wiki-Navigation: Was kann ich noch besser machen?", "Welche Werkzeuge stehen mir als Admin zur Verfügung?", "Spezial:Analytics, Spezial:Insights, Discord", "Gibt es Module, die mein Wiki besser machen könnten?", "Hinweise auf das Developers Wiki, ggf. Vorschläge", "Artikel: Welche Artikel müssten überarbeitet werden, damit Besucher länger da bleiben?", "Artikel: Sind meine Artikel portabel?", "Artikel: Gibt es etwas, das dem SEO meines Wikis nicht gut tut?"];
var checkboxes = "";
for (var i = 0; i < checkbox_values.length; i++) {
   checkboxes += checkbox_default.replace(/regexreplace1/g, checkbox_values[i]);
  }
 

var $ = this.jQuery,
    mw = this.mediaWiki;
 
$("span.neuerantragknopf").html('<span class="opener wds-button headerbg" onclick="FormularHauptfunktion()">' + 'Neuer Antrag' + '</span>');
 
function submitAntrag() {
summary = 'Neuer Mentoren-Antrag';
hilfe_kategorie = $("#hilfe_kategorie").val();
text = $("#wikiText").val();
wikikategorie = $("#wikikategorie").val();
url = $("#wikiURL").val();
if (url.indexOf("http") < 0) {
    alert("Bitte gib eine URL ein, die mit http oder https beginnt.");
    window.location = "#wikURL";
    return;
}
urlname = url.replace(/(http:\/\/|https:\/\/)/, '').replace(/\.(fandom|wikia)\.com(.*)/g, '');
if (url.search(/\.com\/de(\/|)/) != -1) urlname = 'de.' + urlname;
_date_timeval = new Date();
_month = "0" + _date_timeval.getMonth();
_day = "0" + _date_timeval.getDay();
_date = _date_timeval.getFullYear() + "-" + _month.slice(-2) + "-" + _day.slice(-2);
destination = "Wiki-Paten-Antrag:" + urlname + "/" + _date;
checkboxes_values_gather = $('.hilfe-checkboxen li input').each(function (){ $(this).val(); });
checkbox_values_rendered = '';
for (var i = 0; i < checkbox_values.length; i++) {
   if (checkboxes_values_gather[i].checked === true ) { checkbox_check = "1" } else { checkbox_check = "0" } 
   checkbox_val_tmp = "|" 
   + checkboxes_values_gather[i].name + "=" 
   + checkbox_check
   + "\n";
   checkbox_values_rendered += checkbox_val_tmp;
  }
if (checkbox_values_rendered.indexOf("1") < 0) {
    alert("Bitte wähle mindestens einen Bereich aus, bei dem du Hilfe benötigst.");
    window.location = "#hilfe-checkboxen";
    return;
}


text = '\n==' + urlname + '==\n{{' + 'Wiki-Paten-Antrag' + '\n|User=[[Benutzer:' + wgUserName + '|' + wgUserName + ']]' + '\n|Bereich=' + hilfe_kategorie + '\n|urlname=' + urlname + '\n|WikiKategorie=' + wikikategorie + '\n|S=2' + '\n|Datum=' + date + '\n|Text=' + text + '\n}}\n{{Wiki-Paten-Hilfebereiche\n'+ checkbox_values_rendered +'}}\n'; 

console.log(text);
//console.log(wgServer + wgScriptPath + '/api.php?action=edit&title=' + encodeURIComponent(destination) +  '&section=new' + '&appendtext=' + encodeURIComponent(text) + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=' + encodeURIComponent(summary));
//alert("test / check console values");

$.post( wgServer + wgScriptPath + '/api.php', {
    action: 'edit',
    title: destination,
    appendtext: text,
    token: _api.edittoken,
    summary: summary
}).done(function() {
    setTimeout( window.location.href =  wgServer + wgScriptPath + "/wiki/" + destination, 500 ); //500
} );

}
 
 /* not working on a regular basis */
var wiki_paten_bereich = "";
$('.wiki-paten-hilfe-beantragen-anfaenger').click(function() { wiki_paten_bereich = "Wiki-Paten-Antrag – Anfänger" });
$('.wiki-paten-hilfe-beantragen-fortgeschritten').click(function() { wiki_paten_bereich = "Wiki-Paten-Antrag – Forgeschritten" });
$('.wiki-paten-hilfe-beantragen-release').click(function() { wiki_paten_bereich = "Wiki-Paten-Antrag – Release steht bevor" });
 
function FormularHauptfunktion()  {
if (wiki_paten_bereich === "") {
    wiki_paten_bereich = "Wiki-Paten-Antrag – Anfänger";
}
    $('#hilfe_kategorie').val(wiki_paten_bereich);

$(".wiki-paten-hilfe-beantragen-anfaenger, .wiki-paten-hilfe-beantragen-fortgeschritten, .wiki-paten-hilfe-beantragen-release").fadeOut();
$(".opener").fadeOut();
            
$("#wikipaten-formular").after('<div id="ampform" style="text-align: left;">' 
+ '<h2>' + 'Antragsformular' + '</h2>'
+ '<b>' + 'URL des Wikis, für welches du einen Mentor möchtest' + '</b>'
+ '<br>'
+ '<input id="wikiURL"></input>'
+ '<br>'
+ '<b>' + 'Wiki-Kategorie' + '</b>'
+ '<br>'
+ '<select id="wikikategorie">'
+ kategorie_arr_options
+ '</select>'
+ '<br>'
+ '<b>' + 'Art der Hilfe, die du brauchst' + '</b>'
+ '<br>'
+ '<select id="hilfe_kategorie">' + hilfe_art_arr_options + '</select>'
+ '<br>'
+ '<div class="release-additional"></div>'
+ '<br>'
+ '<b>Bei was genau brauchst du Hilfe?</b>'
+ '<div id="hilfe-checkboxen" class="hilfe-checkboxen"><ul style="column-count: 3">' + checkboxes + '</ul></div>'
+ '<b>' + 'Ergänzender Text' + '</b>'
+ '<br>'
+ '<textarea id="wikiText"></textarea>'
+ '<br><span id="wikiSubmit" class="wds-button wds-is-squished headerbg" onclick="submitAntrag()">' + 'Abschicken' + '</span>'
+ '</div>');
 
$("#ampform input, #ampform textarea").css("box-sizing", "border-box").css("width", "100%");
$("#ampform .checkbox input").css("box-sizing", "border-box").css("width", "auto");
$("#ampform").append("<style>"
+ "#ampform li { list-style: none; } #ampform ul { margin-left: 0; }"
+ "</style>");
   
   var tag = $("#wikipaten-formular");
            var scrolltop = tag.offset().top-50;
            setTimeout(function() { $('html,body').animate({scrollTop: scrolltop},'slow'), 1000});
}