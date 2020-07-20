/* Include Global Anime-Common.js Information */
importScriptURI('http://anime.wikia.com/index.php?title=MediaWiki:Anime-Common.js&action=raw&ctype=text/javascript&dontcountme=s&smaxage=86400&templates=expand');

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]]. Modified by Yyp for use on Bleach Wiki.
 
function preloadUploadDesc() {
if (wgPageName.toLowerCase() != 'special:upload') {
return;
}
 
document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Fair use rationale\r| Description       = \r| Source            = \r| Portion           = \r| Purpose           = \r| Resolution        = \r| Replaceability    = \r| Other Information = \r}}"));
 
}
addOnloadHook (preloadUploadDesc)
 
// ****** END: JavaScript for [[Special:Upload]] ******


/* Code for custom edit buttons (ō, ū characters). */
if (mwCustomEditButtons) {

/*** wrappers *****/
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|reason=",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/e/e1/O_Accent_Button.png",
     "speedTip": "Add the ō character",
     "tagOpen": "ō",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100821183407/bleach/en/images/d/db/U_Accent_Button.png",
     "speedTip": "Add the ū character",
     "tagOpen": "ū",
     "tagClose": "",
     "sampleText": ""};
}

/* Code for auto-adding template to all new blog posts (thanks to User:Monchoman45 @ Central Wikia for this). */
function BlogPreload() {
	var creating = true;
	for(i in location.href.split('&')) {
		if(location.href.split('&')[i].split('=')[0] == 'pageId') {
			creating = false;
		}
	}
	if(wgPageName == 'Special:CreateBlogPage' && creating == true) {
		if(document.getElementById('cke_contents_wpTextbox1') != null) {
			document.getElementById('cke_contents_wpTextbox1').getElementsByTagName('iframe')[0].contentDocument.getElementById('bodyContent').innerHTML = '<p data-rte-fromparser="true"><img data-rte-meta="%7B%22type%22%3A%22double-brackets%22%2C%22lineStart%22%3A%22%22%2C%22title%22%3A%22Template%3ABlogheader%22%2C%22placeholder%22%3A1%2C%22wikitext%22%3A%22%7B%7BTemplate%3ABlogheader%7D%7D%22%7D" class="placeholder placeholder-double-brackets" data-cke-saved-src="https://images.wikia.nocookie.net/__cb35490/common/skins/common/blank.gif" src="https://images.wikia.nocookie.net/__cb35490/common/skins/common/blank.gif" type="double-brackets"></p><p data-rte-fromparser="true" data-rte-empty-lines-before="1"><img data-rte-meta="%7B%22type%22%3A%22comment%22%2C%22wikitext%22%3A%22%3C%21--%20Please%20put%20your%20content%20under%20this%20line.%20--%3E%22%2C%22placeholder%22%3A1%7D" data-rte-instance="177-1852961854d9ce6078620f" class="placeholder placeholder-comment" data-cke-saved-src="https://images.wikia.nocookie.net/__cb35490/common/skins/common/blank.gif" src="https://images.wikia.nocookie.net/__cb35490/common/skins/common/blank.gif" type="comment"></p>';
		}
		else {
			document.getElementById('wpTextbox1').innerHTML = '{{Blogheader}}\n\n<!-- Please place your content under this line. -->';
		}
	}
}

addOnloadHook(BlogPreload);
/*</pre>*/