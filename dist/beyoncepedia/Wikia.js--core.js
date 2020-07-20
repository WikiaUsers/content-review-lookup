var AutoEd_baseurl = 'http://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=Wikipedia:AutoEd/';
if (location.protocol === 'https:') {
  AutoEd_baseurl = 'https://en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=Wikipedia:AutoEd/';
}

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

//<source lang=javascript>
//This script does not function without additional "helper" modules!
//Please see [[Wikipedia:AutoEd]] for details on use.

//Initiates AutoEd
function autoEdExecute() {
 if(!document.getElementById('wpTextbox1')) return;

 // copy wikEd ([[User:Cacycle/wikEd.js]]) frame to wpTextbox1 textarea
 // for compatibility with WikiEd
 if (typeof wikEdUseWikEd !== 'undefined') {
   if (wikEdUseWikEd === true) {
     WikEdUpdateTextarea();
   }
 }

 //alert/return if autoEdFunctions is not defined
 if( typeof autoEdFunctions === 'undefined' ) {
  alert('AutoEd/core.js: autoEdFunctions is undefined');
  return;
 }

 autoEdFunctions();
 autoEdEditSummary();

 // copy wpTextbox1 textarea back to wikEd frame
 // for compatibility with WikiEd
 if (typeof wikEdUseWikEd !== 'undefined') {
  if (wikEdUseWikEd === true) {
   WikEdUpdateFrame();
  }
 }
}

//Adds Tag to edit summary textbox
function autoEdEditSummary() {
 var txt = document.forms.editform.wpSummary;
 var tag;

 if( typeof autoEdTag === 'undefined' ) {
  tag = 'Cleaned up using [[WP:AutoEd|AutoEd]]';
 } else {
  tag = autoEdTag;
 }

 // Is the tag blank?
 if( tag.match(/[^\s]/) ) {
  // Has it already been tagged?
  if( txt.value.indexOf(tag) == -1 ) {
   // Append a pipe if necessary
   if( txt.value.match(/[^\*\/\s][^\/\s]?\s*$/) ) {
    txt.value += ' | ';
   }
   // Append our tag
   txt.value += tag;
  }
 }

 // Check 'This is a minor edit'
 if( typeof autoEdMinor === 'undefined' || autoEdMinor ) {
  document.forms.editform.wpMinoredit.checked = true;
 }

 // Click 'Show changes'
 if( typeof autoEdClick === 'undefined' || autoEdClick ) {
  document.forms.editform.wpDiff.click();
 }
}

// Add "auto ed" tab and associate with actions
// Make sure the document is ready and our dependencies are loaded
$.when(
 $.ready,
 mw.loader.using(['mediawiki.util'])
).done(function () {
 var $link;

 //Execute AutoEd after call from "view mode"
 if( mw.util.getParamValue('AutoEd') ) {
  autoEdExecute();
 }

 // Set default values for any unset variables
 if( typeof autoEdLinkHover === 'undefined' ) {
  autoEdLinkHover = "Run AutoEd";
 }
 if( typeof autoEdLinkName === 'undefined' ) {
  autoEdLinkName = "auto ed";
 }
 if( typeof autoEdLinkLocation === 'undefined' ) {
  autoEdLinkLocation = "p-cactions";
 }

 // Add the "auto ed" tab
 if( document.getElementById('ca-edit') ) {
  var url = mw.util.wikiGetlink(mw.config.get('wgPageName'), { action: 'edit', AutoEd: 'true' });
  $link = $(mw.util.addPortletLink(
   autoEdLinkLocation,
   url,
   autoEdLinkName,
   'ca-AutoEd',
   autoEdLinkHover,
   '',
   document.getElementById('ca-move')
  ));
  if( typeof document.forms.editform !== 'undefined' ) {
   $link.on('click', function (e) {
    e.preventDefault();
    autoEdExecute();
   });
  }
 }

});

//</source>