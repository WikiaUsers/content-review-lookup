/*<pre><nowiki>*/

importArticles( {
	type: 'script',
	articles: [
		'MediaWiki:Wikia.js/preload.js'			// Template preloads
	]
});

// Randomize wiki logo: http://community.wikia.com/wiki/Thread:578801
$(function() {
	var images = [
		'https://images.wikia.nocookie.net/vocaloid/images/d/db/Wiki-wordmark-galaco2.png',
		'https://images.wikia.nocookie.net/vocaloid/images/6/60/Wiki-wordmark-miku3.png',
		'https://images.wikia.nocookie.net/vocaloid/images/a/a3/Wiki-wordmark-yukari.png',
		'https://images.wikia.nocookie.net/vocaloid/images/d/d7/Wiki-wordmark-sonika.png',
		'https://images.wikia.nocookie.net/vocaloid/images/2/29/Wiki-wordmark-vy1.png',
		'https://images.wikia.nocookie.net/vocaloid/images/3/30/Wiki-wordmark-piko.png',
		'https://images.wikia.nocookie.net/vocaloid/images/b/b5/Wiki-wordmark-tianyi.png',
		'https://images.wikia.nocookie.net/vocaloid/images/2/22/Wiki-wordmark-mew.png',
		'https://images.wikia.nocookie.net/vocaloid/images/c/c8/Wiki-wordmark-seeu.png',
		'https://images.wikia.nocookie.net/vocaloid/images/b/bb/Wiki-wordmark-akiko.png',
		'https://images.wikia.nocookie.net/vocaloid/images/9/99/Wiki-wordmark-oliver.png',
		'https://images.wikia.nocookie.net/vocaloid/images/4/44/Wiki-wordmark-merli.png',
		'https://images.wikia.nocookie.net/vocaloid/images/2/25/Wiki-wordmark-rion.png',
		'https://images.wikia.nocookie.net/vocaloid/images/8/88/Wiki-wordmark-al.png',
		'https://images.wikia.nocookie.net/vocaloid/images/b/b9/Wiki-wordmark-bruno.png',
		'https://images.wikia.nocookie.net/vocaloid/images/d/db/Wiki-wordmark-lily.png',
		'https://images.wikia.nocookie.net/vocaloid/images/3/38/Wiki-wordmark-mayu.png',
		'https://images.wikia.nocookie.net/vocaloid/images/3/38/Wiki-wordmark-ia.png',
		'https://images.wikia.nocookie.net/vocaloid/images/a/a7/Wiki-wordmark-nana.png',
		'https://images.wikia.nocookie.net/vocaloid/images/5/5a/Wiki-wordmark-575.png',
		'https://images.wikia.nocookie.net/vocaloid/images/2/2f/Wiki-wordmark-maika.png',
		'https://images.wikia.nocookie.net/vocaloid/images/4/46/Wiki-wordmark-lapis.png',
		'https://images.wikia.nocookie.net/vocaloid/images/0/0e/Wiki-wordmark-cul.png',
		'https://images.wikia.nocookie.net/vocaloid/images/d/d7/Wiki-wordmark-zola.png',
		'https://images.wikia.nocookie.net/vocaloid/images/d/d3/Wiki-wordmark-kananon.png',
		'https://images.wikia.nocookie.net/vocaloid/images/d/dd/Wiki-wordmark-meiko.png',
		'https://images.wikia.nocookie.net/vocaloid/images/d/d2/Wiki-wordmark-rana.png',
		'https://images.wikia.nocookie.net/vocaloid/images/c/c2/Wiki-wordmark-avanna.png'
	];

	$('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});