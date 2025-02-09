/* Any JavaScript here will be loaded for all users on every page load. */
/* Random Wordmark */
$(function() {
	var images = [
		'https://static.wikia.nocookie.net/project-diva/images/5/55/PjDWiki_Wordmark_Miku_v2.png',
		'https://static.wikia.nocookie.net/project-diva/images/7/70/PjDWiki_Wordmark_Rin_v2.png',
		'https://static.wikia.nocookie.net/project-diva/images/b/b1/PjDWiki_Wordmark_Len_v2.png',
		'https://static.wikia.nocookie.net/project-diva/images/a/aa/PjDWiki_Wordmark_Luka_v2.png',
		'https://static.wikia.nocookie.net/project-diva/images/c/c3/PjDWiki_Wordmark_KAITO_v2.png',
		'https://static.wikia.nocookie.net/project-diva/images/3/38/PjDWiki_Wordmark_MEIKO_v2.png',
		'https://static.wikia.nocookie.net/project-diva/images/a/a2/PjDWiki_Wordmark_Neru_v2.png',
		'https://static.wikia.nocookie.net/project-diva/images/3/3a/PjDWiki_Wordmark_Haku_v2.png',
		'https://static.wikia.nocookie.net/project-diva/images/1/1e/PjDWiki_Wordmark_Sakine_v2.png',
		'https://static.wikia.nocookie.net/project-diva/images/d/db/PjDWiki_Wordmark_Teto_v2.png',
		'https://static.wikia.nocookie.net/project-diva/images/3/37/PjDWiki_Wordmark_GUMI.png',
		'https://static.wikia.nocookie.net/project-diva/images/b/bc/PjDWiki_Wordmark_SnowMiku.png'
		];

	$('.fandom-community-header__image img').attr('src', images[Math.floor(Math.random() * images.length)]);
});