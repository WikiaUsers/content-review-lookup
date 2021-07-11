/* Kod dla wszystkich skórek by Akodone */
//Działanie szablonu BlogLink
if (mw.config.get('wgUserName')!==null) {
	var userBlogName='Blog użytkownika:' + mw.config.get('wgUserName');
	var userBlogURL=mw.util.getUrl(userBlogName);
	$('.userbloglink a').attr({
		'href':userBlogURL,
		'title':userBlogName
	});
	$('.userbloglink').each(function () {
		if($(this).data('userText')) {
			$(this).find('a').text($(this).data('userText'));
		}
	});
}