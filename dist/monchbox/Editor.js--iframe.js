/*
 * File for the iframe in custom editor. See also MediaWiki:Editor.js
 *
 */

function parse() {
	console.log(window);
	console.log(window.getSelection());
	document.body.innerHTML = document.body.innerHTML.split('<br>').join('\n<br>'); //this keeps the breaks where they're supposed to be
	var text = document.body.textContent;
	var newtext = '';
	for(var i = 0; i < text.length; i++) {
		switch(text.charAt(i)) {
			case '[':
				if(text.charAt(i + 1) == '[') {
					var k = text.indexOf(']]', i);
					if(k == -1) {newtext += text.charAt(i); break;}
					var substr = text.substring(i + 2, k);
					if(substr.indexOf('|') != -1) {var link = substr.substring(0, substr.indexOf('|'));}
					else {var link = substr;}
					link = link.split(' ').join('_');
					/*if(link.startsWith('Category:') == true) {} //stuff for dealing with categories
					else if(link.startsWith('File:') == true) {} //stuff for dealing with images
					else {*/
						while(link.charAt(0) == ':') {link = link.substring(1, link.length);}
						if(link.startsWith('w:') == false) {newtext += '<a class="text" href="/wiki/' + link + '">[[' + substr + ']]</a>';}
						else if(link.startsWith('w:c:') == false) {newtext += '<a class="text" href="http://community.wikia.com/wiki/' + link.substring(2, link.length) + '">[[' + substr + ']]</a>';}
						else {
							var domain = link.substring(4, link.length).split(':')[0];
							newtext += '<a class="text" href="http://' + domain + '.wikia.com/wiki/' + link.substring(4 + domain.length + 1, link.length) + '">[[' + substr + ']]</a>';
						}
					//}
					i = k + 1;
				}
				else if(text.substring(i + 1, i + 8).startsWith('http://') == true || text.substring(i + 1, i + 8).startsWith('irc://') == true || text.substring(i + 1, i + 8).startsWith('ftp://') == true) {
					var k = text.indexOf(']', i);
					if(k == -1) {newtext += text.charAt(i); break;}
					var splstr = text.substring(i + 1, k).split(' ');
					newtext += '<a class="external text" href="' + splstr[0] + '">[' + text.substring(i + 1, k) + ']</a>';
					i = k;
				}
				else {newtext += text.charAt(i);}
				break;
			case '{':
				newtext += text.charAt(i);
				break;
			case '<':
				newtext += '&lt;'; //For now, at least. Later, this will parse tags
				break;
			case '\n':
				newtext += '<br>'; //Otherwise it won't display correctly
				break;
			default:
				newtext += text.charAt(i);
				break;
		}
	}
	document.body.innerHTML = newtext;
	for(var i in document.getElementsByTagName('a')) {
		document.getElementsByTagName('a')[i].onclick = function(event) {
			if(!event.shiftKey) {window.open(this.href);}
		}
	}
	document.body.focus();
	if(window.range) {
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(window.range);
	}
	window.range = undefined;
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

parse();
document.onkeyup = parse;
document.onkeydown = function() {
	console.log(window.getSelection());
	if(window.getSelection().type != 'None') {window.range = window.getSelection().getRangeAt(0);}
}