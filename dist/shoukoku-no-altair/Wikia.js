importArticles( {
	type: 'script',
	articles: [
		'MediaWiki:Wikia.js/preload.js'		// Template preloads
	]
});

// Randomize wiki logo: http://community.wikia.com/wiki/Thread:578801
$(function() {
	var images = [
      'https://images.wikia.nocookie.net/shoukoku-no-altair/images/b/bb/Wiki-wordmark-mahmut-vol09.png',
      'https://images.wikia.nocookie.net/shoukoku-no-altair/images/9/99/Wiki-wordmark-mahmut-vol16.png',
      'https://images.wikia.nocookie.net/shoukoku-no-altair/images/4/45/Wiki-wordmark-mahmut-vol18.png',
      'https://images.wikia.nocookie.net/shoukoku-no-altair/images/8/83/Wiki-wordmark-zaganos-moon.png',
      'https://images.wikia.nocookie.net/shoukoku-no-altair/images/0/08/Wiki-wordmark-beyazit-escort.png',
      'https://images.wikia.nocookie.net/shoukoku-no-altair/images/3/39/Wiki-wordmark-lucio-waves.png'
    ];
 
	$('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});