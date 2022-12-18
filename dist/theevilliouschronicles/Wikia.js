// Additional UserRights Icons in profile mastheads
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

// Randomize wiki logo
$(function() {
    var images = [
      'https://vignette.wikia.nocookie.net/theevilliouschronicles/images/b/b5/BannerLust4.png/revision/latest?cb=20170219070338',
      'https://vignette.wikia.nocookie.net/theevilliouschronicles/images/b/b1/BannerGluttony4.png/revision/latest?cb=20170219070659',
      'https://vignette.wikia.nocookie.net/theevilliouschronicles/images/0/0b/BannerPride4.png/revision/latest?cb=20170219070553',
      'https://vignette.wikia.nocookie.net/theevilliouschronicles/images/1/13/BannerSloth4.png/revision/latest?cb=20170219070340',
      'https://vignette.wikia.nocookie.net/theevilliouschronicles/images/5/51/BannerEnvy4.png/revision/latest?cb=20170219070552',
      'https://vignette.wikia.nocookie.net/theevilliouschronicles/images/6/64/BannerGreed4.png/revision/latest?cb=20170312231002',
      'https://vignette.wikia.nocookie.net/theevilliouschronicles/images/6/67/BannerWrath4.png/revision/latest?cb=20170312231025',
    ];
 
    $('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});

importScriptPage('Content/SpoilersToggle.js', 'scripts');

window.DisplayClockJS = '%2I:%2M:%2S %p %{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w,  %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %2d, %Y (UTC)';
importArticles({
	type: 'script',
	articles: [
		// ...
		'u:dev:DisplayClock/code.js',
		// ...
	]
});

// END Additional UserRights Icons in profile mastheads