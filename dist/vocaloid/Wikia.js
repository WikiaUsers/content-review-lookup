// Randomize wiki logo: http://community.wikia.com/wiki/Thread:578801
$(function() {
	var images = [
		'https://images.wikia.nocookie.net/vocaloid/images/d/db/Wiki-wordmark-galaco2.png',
		'https://images.wikia.nocookie.net/vocaloid/images/5/5c/Wiki-wordmark-mikuv4x.png',
		'https://images.wikia.nocookie.net/vocaloid/images/a/a3/Wiki-wordmark-yukari.png',
		'https://images.wikia.nocookie.net/vocaloid/images/d/d7/Wiki-wordmark-sonika.png',
		'https://images.wikia.nocookie.net/vocaloid/images/3/30/Wiki-wordmark-vy1v4.png',
		'https://images.wikia.nocookie.net/vocaloid/images/3/30/Wiki-wordmark-piko.png',
		'https://images.wikia.nocookie.net/vocaloid/images/2/22/Wiki-wordmark-mew.png',
		'https://images.wikia.nocookie.net/vocaloid/images/c/c8/Wiki-wordmark-seeu.png',
		'https://images.wikia.nocookie.net/vocaloid/images/b/bb/Wiki-wordmark-akiko.png',
		'https://images.wikia.nocookie.net/vocaloid/images/9/99/Wiki-wordmark-oliver.png',
		'https://images.wikia.nocookie.net/vocaloid/images/4/44/Wiki-wordmark-merli.png',
		'https://images.wikia.nocookie.net/vocaloid/images/3/3e/Wiki-wordmark-rionv4.png',
		'https://images.wikia.nocookie.net/vocaloid/images/8/88/Wiki-wordmark-al.png',
		'https://images.wikia.nocookie.net/vocaloid/images/b/b9/Wiki-wordmark-bruno.png',
		'https://images.wikia.nocookie.net/vocaloid/images/d/db/Wiki-wordmark-lily.png',
		'https://images.wikia.nocookie.net/vocaloid/images/3/38/Wiki-wordmark-mayu.png',
		'https://images.wikia.nocookie.net/vocaloid/images/3/38/Wiki-wordmark-ia.png',
		'https://images.wikia.nocookie.net/vocaloid/images/5/54/Wiki-wordmark-nanav4.png',
		'https://images.wikia.nocookie.net/vocaloid/images/5/5a/Wiki-wordmark-575.png',
		'https://images.wikia.nocookie.net/vocaloid/images/2/2f/Wiki-wordmark-maika.png',
		'https://images.wikia.nocookie.net/vocaloid/images/4/46/Wiki-wordmark-lapis.png',
		'https://images.wikia.nocookie.net/vocaloid/images/0/0e/Wiki-wordmark-cul.png',
		'https://images.wikia.nocookie.net/vocaloid/images/d/d7/Wiki-wordmark-zola.png',
		'https://images.wikia.nocookie.net/vocaloid/images/d/d3/Wiki-wordmark-kananon.png',
		'https://images.wikia.nocookie.net/vocaloid/images/d/dd/Wiki-wordmark-meiko.png',
		'https://images.wikia.nocookie.net/vocaloid/images/1/14/Wiki-wordmark-ranav4.png',
		'https://images.wikia.nocookie.net/vocaloid/images/c/c2/Wiki-wordmark-avanna.png',
		'https://images.wikia.nocookie.net/vocaloid/images/6/63/Wiki-wordmark-diva.png',
		'https://images.wikia.nocookie.net/vocaloid/images/a/a1/Wiki-wordmark-ryuto.png',
		'https://images.wikia.nocookie.net/vocaloid/images/5/57/Wiki-wordmark-songman.png',
		'https://images.wikia.nocookie.net/vocaloid/images/6/60/Wiki-wordmark-tianyi-v4.png',
		'https://images.wikia.nocookie.net/vocaloid/images/e/ef/Wiki-wordmark-xingchen.png',
		'https://images.wikia.nocookie.net/vocaloid/images/6/63/Wiki-wordmark-prima.png',
		'https://images.wikia.nocookie.net/vocaloid/images/6/6d/Wiki-wordmark-tonio.png',
		'https://images.wikia.nocookie.net/vocaloid/images/f/f7/Wiki-wordmark-leon-lola.png',
		'https://images.wikia.nocookie.net/vocaloid/images/c/c7/Wiki-wordmark-uni.png',
		'https://images.wikia.nocookie.net/vocaloid/images/3/3f/Wiki-wordmark-una.png',
		'https://images.wikia.nocookie.net/vocaloid/images/9/94/Wiki-wordmark-flower.png',
		'https://images.wikia.nocookie.net/vocaloid/images/9/9c/Wiki-wordmark-lumi.png'
	];

	$('.wds-community-header__wordmark img').attr('src', images[Math.floor(Math.random() * images.length)]);
});

// Discord
window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: '7hjtr6k', // https://dev.fandom.com/wiki/DiscordBanner
    prependToRail: false
};