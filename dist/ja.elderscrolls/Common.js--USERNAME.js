//This iteration taken from Wookieepedia.

/* 
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME. 
*/
function substUsername() {
	$('.insertusername').html(wgUserName);
}
 
function substUsernameTOC() {
	var toc = document.getElementById('toc');
	var userpage = document.getElementById('pt-userpage');
 
	if( !userpage || !toc )
		return;
 
	var username = userpage.firstChild.firstChild.nodeValue;
	var elements = getElementsByClass('toctext', toc, 'span');
 
	for( var i = 0; i < elements.length; i++ )
		elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
}