// Randomize wiki logo //
$(function() {
	var images = [
		'https://images.wikia.nocookie.net/project-diva/images/f/fe/PjDWiki_Wordmark_Miku.png',
		'https://images.wikia.nocookie.net/project-diva/images/0/06/PjDWiki_Wordmark_Rin.png',
		'https://images.wikia.nocookie.net/project-diva/images/e/e4/PjDWiki_Wordmark_Len.png',
		'https://images.wikia.nocookie.net/project-diva/images/c/c7/PjDWiki_Wordmark_Luka.png',
		'https://images.wikia.nocookie.net/project-diva/images/f/f7/PjDWiki_Wordmark_KAITO.png',
		'https://images.wikia.nocookie.net/project-diva/images/0/0a/PjDWiki_Wordmark_MEIKO.png',
		'https://images.wikia.nocookie.net/project-diva/images/e/e2/PjDWiki_Wordmark_Neru.png',
		'https://images.wikia.nocookie.net/project-diva/images/8/81/PjDWiki_Wordmark_Haku.png',
		'https://images.wikia.nocookie.net/project-diva/images/7/75/PjDWiki_Wordmark_Sakine.png',
		'https://images.wikia.nocookie.net/project-diva/images/1/12/PjDWiki_Wordmark_Teto.png',
		];
		$('.fandom-community-header__image img').attr('src', images[Math.floor(Math.random() * images.length)]);
});