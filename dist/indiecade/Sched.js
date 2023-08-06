/* [[Schedule (West 2017)]] */
mw.hook('wikipage.content').add(function($content) {
	var embed = $content.find('#sched-embed');
	if (!embed) return;
	embed.setAttribute('href', 'https://indiecadefestival2017.sched.com/');
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://indiecadefestival2017.sched.com/js/embed.js';
	embed.after(script);
});