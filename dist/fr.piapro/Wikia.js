// Logo du wiki dynamique: https://community.fandom.com/wiki/Thread:578801 (anglais)
$(function() {
	var images = [
		'https://images.wikia.nocookie.net/piapro-studio/images/0/07/Wikia_Wordmark_Kaito_2.png',
		'https://images.wikia.nocookie.net/piapro-studio/images/5/5b/Wikia_Wordmark_Meiko_2.png',
		'https://images.wikia.nocookie.net/piapro-studio/images/0/06/Wikia_Wordmark_Luka_2.png',
		'https://images.wikia.nocookie.net/piapro-studio/images/b/ba/Wikia_Wordmark_Len_2.png',
		'https://images.wikia.nocookie.net/piapro-studio/images/0/00/Wikia_Wordmark_Rin_2.png',
		'https://images.wikia.nocookie.net/piapro-studio/images/a/a6/Wikia_Wordmark_Miku_2.png',
	];
 
	$('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});