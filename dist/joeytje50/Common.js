if (wgCanonicalSpecialPageName == 'Chat' && skin == 'oasis') alert('Common.js loaded.')

importScriptURI('http://code.highcharts.com/stock/highstock.js');
addOnloadHook(function() {
if (typeof Highcharts != 'undefined') {
	importScriptPage('MediaWiki:Common.js/GEChart.js', 'joeytje50');
}
});

function setCookie( c_name, value, expiredays ) {
	var exdate = new Date();
	exdate.setDate( exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ( ( expiredays === null ) ? "" : ";expires=" + exdate.toGMTString() );
}
 
function getCookie( c_name ) {
	if ( document.cookie.length > 0 ) {
		var c_start = document.cookie.indexOf( c_name + "=" )
		if ( c_start !== -1 ) {
			c_start = c_start + c_name.length + 1; 
			var c_end = document.cookie.indexOf( ";", c_start );
			if ( c_end === -1 ) {
				c_end = document.cookie.length;
			}
			return unescape( document.cookie.substring( c_start, c_end ) );
		} 
	}
	return "";
}

console.log('searchfixloaded');
importScriptPage('User:Joeytje50/searchfix.js','rs');

if (wgUserGroups && wgUserGroups.indexOf('sysop')!=-1) {
importScriptURI('https://svn.wikia-code.com/wikia/trunk/extensions/CheckUser/checkuser.js');
}