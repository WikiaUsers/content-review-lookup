/* Any JavaScript here will be loaded for all users on every page load. */

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
$(function substUsername() {
	if( mw.config.get('wgUserName') ) {
		$('.insertusername').text(mw.config.get('wgUserName'));
	}
})

$(function substUsernameTOC() {
	var toc = $('#toc');
	var userpage = $('#pt-userpage');

	if( !userpage || !toc )
		return;

	var username = $('#pt-userpage').children(':first-child').text();
	$('span.toctext:not(:has(*)), span.toctext i', toc).each(function()
	{
		$(this).text($(this).text().replace('<insert name here>', username));
	});
})