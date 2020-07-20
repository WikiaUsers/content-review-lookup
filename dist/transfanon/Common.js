/* <pre> <nowiki> */
/* <pre>Any JavaScript here will be loaded for all users on every page load. */ 
/** Extra toolbar options ****************************************************** <nowiki> 
  *
  *  Description: UNDOCUMENTED
  *  Maintainers: [[User:MarkS]]?, [[User:Voice of All]], [[User:R. Koot]]
  */
 
 //This is a modified copy of a script by User:MarkS for extra features added by User:Voice of All.
 // This is based on the original code on Wikipedia:Tools/Editing tools
 // To disable this script, add <code>mwCustomEditButtons = [];<code> to [[Special:Mypage/monobook.js]]
 
 if (mwCustomEditButtons) {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Doelpagina"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/c/c9/Button_strike.png",
     "speedTip": "Doorhalen",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Doorgehaald tekst"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/13/Button_enter.png",
     "speedTip": "Enter",
     "tagOpen": "<br />",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/8/80/Button_upper_letter.png",
     "speedTip": "Superscript",
     "tagOpen": "<sup>",
     "tagClose": "</sup>",
     "sampleText": "Superscript tekst"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/7/70/Button_lower_letter.png",
     "speedTip": "Subscript",
     "tagOpen": "<sub>",
     "tagClose": "</sub>",
     "sampleText": "Subscript tekst"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/5/58/Button_small.png",
     "speedTip": "Klein",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Kleine tekst"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/3/34/Button_hide_comment.png",
     "speedTip": "Voeg verborgen commentaar toe",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Commentaar"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/1/12/Button_gallery.png",
     "speedTip": "Voeg een afbeeldingen gallerij toe",
     "tagOpen": "\n<gallery>\n",
     "tagClose": "\n</gallery>",
     "sampleText": "Afbeelding:Voorbeeld.jpg|Tekst1\nAfbeelding:Voorbeeld.jpg|Tekst2"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://upload.wikimedia.org/wikipedia/en/6/60/Button_insert_table.png",
     "speedTip": "Voeg een tabel toe",
     "tagOpen": '{| class="wikitable"\n|-\n',
     "tagClose": "\n|}",
     "sampleText": "! kop 1\n! kop 2\n! kop 3\n|-\n| rij 1, cel 1\n| rij 1, cel 2\n| rij 1, cel 3\n|-\n| rij 2, cel 1\n| rij 2, cel 2\n| rij 2, cel 3"};
 }
 /*</nowiki></pre>*/

/* <pre> <nowiki> */
/** Title rewrite ********************************************************
 * Rewrites the page's title, used by Template:Title
 * By Sikon
 */

function rewriteTitle()
{
   if(typeof(SKIP_TITLE_REWRITE) != 'undefined' && SKIP_TITLE_REWRITE)
       return;

   var titleDiv = document.getElementById('title-meta');

   if(titleDiv == null || titleDiv == undefined)
       return;

   var cloneNode = titleDiv.cloneNode(true);
   var firstHeading = getElementsByClass('firstHeading', document.getElementById('content'), 'h1')[0];
   var node = firstHeading.childNodes[0];

   // new, then old!
   firstHeading.replaceChild(cloneNode, node);
   cloneNode.style.display = "inline";

   var titleAlign = document.getElementById('title-align');
   firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}

addOnloadHook(rewriteTitle, false);

/** Username replace function (template:USERNAME) *******************************
 * Inserts user name into 
 * By Splarka
 */
addOnloadHook(UserNameReplace);

function UserNameReplace() {
if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace) return;
   for(var i=0; UserName = document.getElementsByTagName("span")[i]; i++) {
       if ((document.getElementById('pt-userpage'))&&(UserName.getAttribute('id') == "insertusername")) {
           UserName.innerHTML = wgUserName;
       }
   }
}

// getElementsByClass - http://www.dustindiaz.com/getelementsbyclass/

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
/* </nowiki> </pre> */