importArticles( {
	type: 'script',
	articles: [
		'MediaWiki:Wikia.js/preload.js'		// Template preloads
	]
});

// Randomize wiki logo: http://community.wikia.com/wiki/Thread:578801
$(function() {
	var images = [
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/8/89/Wiki-wordmark.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/4/49/Wiki-wordmark2.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/2/26/Wiki-wordmark3.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/4/44/Wiki-wordmark4.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/8/83/Wiki-wordmark5.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/1/14/Wiki-wordmark6.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/b/bd/Wiki-wordmark7.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/c/c7/Wiki-wordmark8.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/1/1b/Wiki-wordmark9.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/0/00/Wiki-wordmark10.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/0/08/Wiki-wordmark11.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/a/a5/Wiki-wordmark12.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/6/62/Wiki-wordmark13.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/4/44/Wiki-wordmark14.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/8/83/Wiki-wordmark15.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/7/70/Wiki-wordmark16.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/1/11/Wiki-wordmark17.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/9/9d/Wiki-wordmark18.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/a/ab/Wiki-wordmark19.png',
      'https://images.wikia.nocookie.net/__cb20140129100455/ragnarok8812/images/c/cd/Wiki-wordmark20.png'
	];

	    $(($('h1.wordmark').length ? 'h1.wordmark' : '.wds-community-header__wordmark') + ' a img').attr(
        'src',
        images[Math.floor(Math.random() * images.length)]
    );

});