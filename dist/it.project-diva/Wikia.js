importArticles( {
	type: 'script',
	articles: [
		'MediaWiki:Wikia.js/preload.js'		// Template preloads
	]
});

// Randomize wiki logo
$(function() {
    var images = [
      'https://vignette.wikia.nocookie.net/project-diva/images/c/c7/Newwikialogo.png/revision/latest?cb=20180227041041&path-prefix=it',
      'https://vignette.wikia.nocookie.net/project-diva/images/8/8a/Newlogolr.png/revision/latest?cb=20180227042128&path-prefix=it',
      'https://vignette.wikia.nocookie.net/project-diva/images/6/6c/Newwikialogolu.png/revision/latest?cb=20180302030320&path-prefix=it',
      'https://vignette.wikia.nocookie.net/project-diva/images/9/95/Newwikialogok.png/revision/latest?cb=20180302030321&path-prefix=it',
      'https://vignette.wikia.nocookie.net/project-diva/images/2/26/Newwikialogome.png/revision/latest?cb=20180302030321&path-prefix=it'
    ];
    
    $('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});