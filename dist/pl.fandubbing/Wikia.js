/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */

/* Usuwanie nazw przestrzeni z nagłówka strony */

var title = mw.config.get('wgPageName');
var splittedTitle = title.split(':');
var namespace = splittedTitle[0];
var heading = $('#WikiaPageHeader').html();
var headingModifyP = heading.replace('<h1>Piosenka:', '<h1>');
var headingModify = headingModifyP.replace('<h1>Tekst:', '<h1>');
$('#WikiaPageHeader').html(headingModify);

/* Usuwanie nazw przestrzeni z linków w kategoriach */

var content = $('.mw-content-ltr').html();
var newContent = content.replace(/">Piosenka:/g, '">');
var newContentT = newContent.replace(/">Tekst:/g, '">');

if( namespace == "Piosenka" || namespace == "Tekst"){
$('#WikiaPageHeader').append('<h2 >' + namespace + '</h2>');
$('.mw-content-ltr').html(newContentT);
}
if( namespace == "Kategoria" && title.search("(fandubber)") == -1 ){
$('.mw-content-ltr').html(newContentT);
}
/* edytowane przez: Dominiol */