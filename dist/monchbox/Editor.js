/* 
 * Custom editor proof of concept
 * 
 */

function editorInit() {
	//Unhinge the edit window by making it a document instead of a textarea.
	var pagetext = document.getElementById('wpTextbox1').value.split('<').join('&lt;').split('\n').join('<br>');
	document.getElementById('wpTextbox1').outerHTML = '<iframe tabindex="1" accesskey="," id="wpTextbox1" style="width:100%; height:' + document.getElementById('wpTextbox1').style.height + '; border:1px solid #aaa;"><html><head></head><body></body></html></iframe>';
	window.wind = document.getElementById('wpTextbox1').contentWindow;
	window.doc = wind.document;
	doc.head.innerHTML = '<style type="text/css">body {margin:2px 3px; font-family:monospace; font-size:13px;} a:hover {cursor:pointer;}</style>';
	var script = document.createElement('script');
	script.src = 'http://monchbox.wikia.com/index.php?title=MediaWiki:Editor.js/iframe.js&action=raw&ctype=text/javascript';
	doc.head.appendChild(script); //has to be done this way for the src to register
	doc.body.innerHTML = pagetext;
	doc.designMode = 'on';
}

/* Helper functions */
function urlQuery(quer) {
	for(i in location.href.split('?')) {
		for(j in location.href.split('?')[i].split('&')) {
			if(location.href.split('?')[i].split('&')[j].split('=')[0] == quer) {
				return location.href.split('?')[i].split('&')[j].split('=')[1];
			}
		}
	}
	return '';
}
 
function startsWith(text) {
	for(var i = 0; i < text.length; i++) {
		if(this.charAt(i) != text.charAt(i)) {return false;}
	}
	return true;
}
function endsWith(text) {
	for(var i = 0; i < text.length; i++) {
		if(this.charAt((this.length - 1) - i) != text.charAt((text.length - 1) - i)) {return false;}
	}
	return true;
}
function removeTrailing(char) {
	if(char.length > 1) {char = char.charAt(0);}
	var str = this;
	while(str.charAt(0) == char) {str = str.substring(1, str.length);}
	while(str.charAt(str.length - 1) == char) {str = str.substring(0, str.length - 1);}
	return str;
}
String.prototype.startsWith = startsWith;
String.prototype.endsWith = endsWith;
String.prototype.removeTrailing = removeTrailing;

if(urlQuery('action') == 'edit' && wgPageName.endsWith('.js') == false && wgPageName.endsWith('.css') == false) {addOnloadHook(editorInit);}