/* Summary filler
 * From RuneScape Wiki
 */
 
importScriptPage('MediaWiki:Common.js/standardeditsummaries.js', 'runescape');

/* Ref template button in editor; by [[User:Thailog|Thailog]]. */

if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/threeinvestigators/images/0/0c/Ref_template_button.png",
     "speedTip": "Referencing novels",
     "tagOpen": "\<ref name=>{\{cite novel|",
     "tagClose": "|}}</ref>",
     "sampleText": "Name of novel"};
  
}

/* Navigation popups
 * Creates popups when a link is hovered over
 * See w:c:help:MediaWiki:Gadget-popups.js for info & attribution
 */
 
importScriptURI( 'http://help.wikia.com/index.php?title=MediaWiki:Gadget-popups.js&action=raw&ctype=text/javascript' );