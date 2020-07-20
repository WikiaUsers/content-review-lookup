// <source lang="JavaScript">
 
// Cookie accessor functions
 
function setCookie(name, value, expires) {
	var d = new Date();
	d.setDate(d.getDate() + expires);
	document.cookie = name + '=' + escape(value) + ';path=/';
}
 
function getCookie(name) {
	if (document.cookie.length > 0) {
		var start = document.cookie.indexOf(name + '=');
		if (start != -1) { 
			start = start + name.length + 1; 
			var end = document.cookie.indexOf(';', start);
			if (end == -1) {
				end = document.cookie.length;
			}
			return unescape(document.cookie.substring(start, end));
		} 
	}
	return '';
}
 
// END Cookie accessor functions
 
// </source>