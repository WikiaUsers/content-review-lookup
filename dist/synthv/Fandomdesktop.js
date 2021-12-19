// Randomize wiki logo: http://community.wikia.com/wiki/Thread:578801 ; credit to VOCALOID Wiki and Community Central
$(function() {
	var images = [
	    'https://images.wikia.nocookie.net/synthv/images/0/06/Wiki-wordmark-aiko.png',
	    'https://images.wikia.nocookie.net/synthv/images/b/b5/Wiki-wordmark-anri.png',
	    'https://images.wikia.nocookie.net/synthv/images/8/87/Wiki-wordmark-cangqiong.png',
	    'https://images.wikia.nocookie.net/synthv/images/2/22/Wiki-wordmark-cangqiong-svs.png',
	    'https://images.wikia.nocookie.net/synthv/images/2/24/Wiki-wordmark-chiyu.png',
	    'https://images.wikia.nocookie.net/synthv/images/0/05/Wiki-wordmark-chiyu-svs.png',
	    'https://images.wikia.nocookie.net/synthv/images/2/2a/Wiki-wordmark-eleanor-forte-sv1.png',
	    'https://images.wikia.nocookie.net/synthv/images/f/f1/Wiki-wordmark-Eleanor-Forte-AI.png',
	    'https://images.wikia.nocookie.net/synthv/images/8/8a/Wiki-wordmark-genbu.png',
	    'https://images.wikia.nocookie.net/synthv/images/c/c3/Wiki-wordmark-haiyi.png',
	    'https://images.wikia.nocookie.net/synthv/images/f/f3/Wiki-wordmark-haiyi-svs.png',
	    'https://images.wikia.nocookie.net/synthv/images/a/ab/Wiki-wordmark-koharu-rikka.png',
	    'https://images.wikia.nocookie.net/synthv/images/6/69/Wiki-wordmark-kotonoha-akane.png',
	    'https://images.wikia.nocookie.net/synthv/images/c/ca/Wiki-wordmark-kotonoha-aoi.png',
	    'https://images.wikia.nocookie.net/synthv/images/3/33/Wiki-wordmark-muxin.png',
	    'https://images.wikia.nocookie.net/synthv/images/0/0e/Wiki-wordmark-Qingsu.png',
	    'https://images.wikia.nocookie.net/synthv/images/4/40/Wiki-wordmark-saki.png',
	    'https://images.wikia.nocookie.net/synthv/images/8/8b/Wiki-wordmark-shian.png',
	    'https://images.wikia.nocookie.net/synthv/images/4/43/Wiki-wordmark-shian_svs.png',
	    'https://images.wikia.nocookie.net/synthv/images/7/71/Wiki-wordmark-synthv1.png',
	    'https://images.wikia.nocookie.net/synthv/images/1/14/Wiki-wordmark-svs.png',
	    'https://images.wikia.nocookie.net/synthv/images/f/f9/Wiki-wordmark-Tsuina-chan-Standard.png',
	    'https://images.wikia.nocookie.net/synthv/images/5/50/Wiki-wordmark-Tsuina-chan-AI.png',
	    'https://images.wikia.nocookie.net/synthv/images/7/70/Wiki-wordmark-tsurumaki-maki-eng.png',
	    'https://images.wikia.nocookie.net/synthv/images/5/52/Wiki-wordmark-tsurumaki-maki-jpn.png',
	    'https://images.wikia.nocookie.net/synthv/images/7/70/Wiki-wordmark-xingchen-minus.png',
	    'https://images.wikia.nocookie.net/synthv/images/1/1f/Wiki-wordmark-yamine-renri.png',
	    'https://images.wikia.nocookie.net/synthv/images/1/fc/Wiki-wordmark-renri-svs.png'
	];

	$('.fandom-community-header__image img').attr('src', images[Math.floor(Math.random() * images.length)]);
});