// source modified from https://en.wikipedia.org/w/index.php?title=Wikipedia:AutoEd/core.js&oldid=293169053
//This script does not function without additional "helper" modules!
//Please see [[Wikipedia:AutoEd]] for details on use.
 
//Initiates AutoEd
function autoEdExecute() {
 if(!document.getElementById('wpTextbox1')) return;
 
 // copy wikEd ([[User:Cacycle/wikEd.js]]) frame to wpTextbox1 textarea
 // for compatibility with WikiEd
 if (typeof(wikEdUseWikEd) != 'undefined') {
   if (wikEdUseWikEd === true) {
     WikEdUpdateTextarea();
   }
 }
 
 //alert/return if autoEdFunctions is not defined
 if( typeof( autoEdFunctions ) == 'undefined' ) {
  alert(':wikia:c:dev:AutoEd/core.js: autoEdFunctions is undefined');
  return;
 }
 
 autoEdFunctions();
 autoEdEditSummary();
 
 // copy wpTextbox1 textarea back to wikEd frame
 // for compatibility with WikiEd
 if (typeof(wikEdUseWikEd) != 'undefined') {
  if (wikEdUseWikEd === true) {
   WikEdUpdateFrame();
  }
 }
}
 
//Adds Tag to edit summary textbox
function autoEdEditSummary() {
 var txt = document.forms.editform.wpSummary;
 
 if( typeof( autoEdTag ) == 'undefined' ) {
  //var tag = "Cleaned up using [[WP:AutoEd|AutoEd]]";
  var tag = "Cleaned up using [[:wikia:c:dev:AutoEd/core.js|AutoEd]]";
 } else {
  var tag = autoEdTag;
 }
 
 // Is the tag blank?
 if( tag.match(/[^\s]/) ) {
  // Has it already been tagged?
  if( txt.value.indexOf(tag) == -1 ) {
   // Append a pipe if necessary
   if( txt.value.match(/[^\*\/\s][^\/\s]?\s*$/) ) {
    txt.value += " | ";
   }
   // Append our tag
   txt.value += tag;
  }
 }
 
 // Check 'This is a minor edit'
 if( typeof( autoEdMinor ) == 'undefined' || autoEdMinor ) {
  document.forms.editform.wpMinoredit.checked = true;
 }
 
 // Click 'Show changes'
 if( typeof( autoEdClick ) == 'undefined' || autoEdClick ) {
  document.forms.editform.wpDiff.click();
 }
}
 
//Allows URI to be properly decoded for AutoEd in View Mode 
function autoEdQueryString(p) {
 var re = RegExp('[&?]' + p + '=([^&]*)');
 var matches;
 if (matches = re.exec(document.location)) {
  try {
   return decodeURI(matches[1]);
  } catch (e) {
  }
 }
 return null;
}
 
// Add "auto ed" tab and associate with actions
addOnloadHook(function () {
 
 //Execute AutoEd after call from "view mode"
 if( autoEdQueryString('AutoEd') ) {
  autoEdExecute();
 }
 
 // Set default values for any unset variables
 if( typeof( autoEdLinkHover ) == 'undefined' ) {
  autoEdLinkHover = "Run AutoEd";
 }
 if( typeof( autoEdLinkName ) == 'undefined' ) {
  autoEdLinkName = "auto ed";
 }
 if( typeof( autoEdLinkLocation ) == 'undefined' ) {
  autoEdLinkLocation = "p-cactions";
 }
 
 //Add the "auto ed" tab
 if( typeof( document.forms.editform) != 'undefined' ) {
  addPortletLink( autoEdLinkLocation, 'javascript:autoEdExecute()', autoEdLinkName, 
                 'ca-AutoEd', autoEdLinkHover, '', document.getElementById('ca-move'));
 } else if (wgIsArticle && document.getElementById('ca-edit') && wgAction == "view") {
  var url = wgServer + wgScript + '?title=' + encodeURIComponent(wgPageName) + '&action=edit';
  addPortletLink( autoEdLinkLocation, url + '&AutoEd=true', autoEdLinkName, 
                 'ca-AutoEd', autoEdLinkHover, '', document.getElementById('ca-move'));
 } //End view-mode/edit-mode if
 
});