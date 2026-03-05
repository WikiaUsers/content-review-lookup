mw.hook("wikipage.content").add(function() {
	$('.page-header__categories').append(
		$('<a/>').addClass('theme-toggler').text('Toggle T:CSS')
	);
});