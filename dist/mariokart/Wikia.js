var AutoEd_baseurl = 'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=Wikipedia:AutoEd/';

importScriptURI(AutoEd_baseurl + 'core.js'); //Imports the "framework" script needed to make this function

//Import individual modules for use
importScriptURI(AutoEd_baseurl + 'unicodify.js'); // autoEdUnicodify() converts HTML entities to WikiText
importScriptURI(AutoEd_baseurl + 'isbn.js'); // autoEdISBN() fixes ISBN syntax so that WikiMagic can work
importScriptURI(AutoEd_baseurl + 'wikilinks.js'); // autoEdWikilinks() simplifies and shortens wikilinks where appropriate
importScriptURI(AutoEd_baseurl + 'htmltowikitext.js'); // autoEdHTMLtoWikitext() converts HTML to wikitext
importScriptURI(AutoEd_baseurl + 'headlines.js'); // autoEdHeadlines() fixes common headline errors and renames some headers
importScriptURI(AutoEd_baseurl + 'unicodecontrolchars.js'); // autoEdUnicodeControlChars() converts HTML to wikitext
importScriptURI(AutoEd_baseurl + 'templates.js'); // autoEdTemplates() cleans up templates
importScriptURI(AutoEd_baseurl + 'links.js'); // autoEdLinks() cleans up common link errors

function autoEdFunctions() { //Activates individual modules when "auto ed" tab is clicked
    var txt = document.editform.wpTextbox1;
    txt.value = autoEdUnicodify(txt.value);
    txt.value = autoEdISBN(txt.value);
    txt.value = autoEdWikilinks(txt.value);
    txt.value = autoEdHTMLtoWikitext(txt.value);
    txt.value = autoEdHeadlines(txt.value);
    txt.value = autoEdUnicodeControlChars(txt.value);
    txt.value = autoEdTemplates(txt.value);
    txt.value = autoEdLinks(txt.value);
}