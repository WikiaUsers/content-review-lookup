$('table.collapsible').each(function(e) {
  var $t = $(this);
  var $th = $t.find('th');
  var hs = ($t.hasClass('collapsed')) ? 'show' : 'hide';
  $th.append("<span class=\"collapseLink\">[<a href=\"#\">" + hs + "</a>]</span>");
  if($t.hasClass('collapsed')) {
    $t.find('td').parent().hide();
    }
  });
 
$('.collapseLink > a').click(function(e) {
  e.preventDefault();
  collapseTable($(this));
  });
 
collapseTable = function (e) {
  $t = e.closest('table');
  $elems = $t.find('td').parent();
  if($t.hasClass('collapsed')) {
    $elems.show('fast');
    $t.removeClass('collapsed');
    e.html('hide');
    } else {
    $elems.hide('fast');
    $t.addClass('collapsed');
    e.html('show');
    }
  }

importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/imports.js", /* UserTags and AjaxRC */
	]
});

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