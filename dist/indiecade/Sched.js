/* [[Schedule (West 2017)]] */
mw.hook('wikipage.content').add(function($content) {
	$content.find('#sched-embed:not(.loaded)')
		.addClass('loaded')
		.attr('href', 'https://indiecadefestival2017.sched.com')
		.after('<script src="https://indiecadefestival2017.sched.com/js/embed.js" type="text/javascript">');
});