// Randomize wiki logo: https://community.wikia.com/wiki/Thread:578801 ; credit to VOCALOID Wiki and Community Central
$(function() {
	var images = [
	    'https://images.wikia.nocookie.net/synthv/images/0/06/Wiki-wordmark-aiko.png',
	    'https://images.wikia.nocookie.net/synthv/images/e/e8/Wiki-wordmark-ANRI-Arcane.png',
	    'https://images.wikia.nocookie.net/synthv/images/9/9a/Wiki-wordmark-an-xiao.png',
	    'https://images.wikia.nocookie.net/synthv/images/d/da/Wiki-wordmark-ASTERIAN.png',
	    'https://images.wikia.nocookie.net/synthv/images/b/b5/Wiki-wordmark-Ayame.png',
	    'https://images.wikia.nocookie.net/synthv/images/8/87/Wiki-wordmark-cangqiong.png',
	    'https://images.wikia.nocookie.net/synthv/images/2/22/Wiki-wordmark-cangqiong-svs.png',
	    'https://images.wikia.nocookie.net/synthv/images/8/83/Wiki-wordmark-Cheng-Xiao.png',
	    'https://images.wikia.nocookie.net/synthv/images/2/24/Wiki-wordmark-chiyu.png',
	    'https://images.wikia.nocookie.net/synthv/images/0/05/Wiki-wordmark-chiyu-svs.png',
	    'https://images.wikia.nocookie.net/synthv/images/5/5c/Wiki-wordmark-Cong-Zheng.png',
	    'https://images.wikia.nocookie.net/synthv/images/3/34/Wiki-wordmark-D-Lin.png',
	    'https://images.wikia.nocookie.net/synthv/images/2/2a/Wiki-wordmark-eleanor-forte-sv1.png',
	    'https://images.wikia.nocookie.net/synthv/images/f/f1/Wiki-wordmark-Eleanor-Forte-AI.png',
	    'https://images.wikia.nocookie.net/synthv/images/c/c8/Wiki-wordmark-Eri.png',
	    'https://images.wikia.nocookie.net/synthv/images/4/4c/Wiki-wordmark-felicia.png',
	    'https://images.wikia.nocookie.net/synthv/images/9/94/Wiki-wordmark-feng-yi.png',
	    'https://images.wikia.nocookie.net/synthv/images/b/b5/Wiki-wordmark-frimomen.png',
	    'https://images.wikia.nocookie.net/synthv/images/8/8a/Wiki-wordmark-genbu.png',
	    'https://images.wikia.nocookie.net/synthv/images/1/10/Wiki-wordmark-GUMI.png',
	    'https://images.wikia.nocookie.net/synthv/images/c/c3/Wiki-wordmark-haiyi.png',
	    'https://images.wikia.nocookie.net/synthv/images/f/f3/Wiki-wordmark-haiyi-svs.png',
	    'https://images.wikia.nocookie.net/synthv/images/0/07/Wiki-wordmark-Hanakuna-Chifuyu.png',
	    'https://images.wikia.nocookie.net/synthv/images/9/94/Wiki-wordmark-Haruno-Sora.png',
	    'https://images.wikia.nocookie.net/synthv/images/5/57/Wiki-wordmark-Hayden.png',
	    'https://images.wikia.nocookie.net/synthv/images/0/0b/Wiki-wordmark-hibiki-koto.png',
	    'https://images.wikia.nocookie.net/synthv/images/6/67/Wiki-wordmark-Jin.png',
	    'https://images.wikia.nocookie.net/synthv/images/8/86/Wiki-wordmark-jun.png',
	    'https://images.wikia.nocookie.net/synthv/images/7/74/Wiki-wordmark-Kasane-Teto.png',
	    'https://images.wikia.nocookie.net/synthv/images/9/9b/Wiki-wordmark-Kevin.png',
	    'https://images.wikia.nocookie.net/synthv/images/a/ab/Wiki-wordmark-koharu-rikka.png',
	    'https://images.wikia.nocookie.net/synthv/images/6/69/Wiki-wordmark-kotonoha-akane.png',
	    'https://images.wikia.nocookie.net/synthv/images/c/ca/Wiki-wordmark-kotonoha-aoi.png',
	    'https://images.wikia.nocookie.net/synthv/images/b/b6/Wiki-wordmark-kyomachi-seika.png',
	    'https://images.wikia.nocookie.net/synthv/images/f/f0/Wiki-wordmark-Lin-Lai.png',
	    'https://images.wikia.nocookie.net/synthv/images/e/ea/Wiki-wordmark-ling-wan.png',
	    'https://images.wikia.nocookie.net/synthv/images/5/5b/Wiki-wordmark-Mai.png',
	    'https://images.wikia.nocookie.net/synthv/images/2/23/Wiki-wordmark-Meito.png',
	    'https://images.wikia.nocookie.net/synthv/images/7/78/Wiki-wordmark-miyamai-moca.png',
	    'https://images.wikia.nocookie.net/synthv/images/c/c4/Wiki-wordmark-Mo-chen.png',
	    'https://images.wikia.nocookie.net/synthv/images/3/33/Wiki-wordmark-muxin.png',
	    'https://images.wikia.nocookie.net/synthv/images/3/38/Wiki-wordmark-natalie.png',
	    'https://images.wikia.nocookie.net/synthv/images/a/a0/Wiki-wordmark-natsuki-karin.png',
	    'https://images.wikia.nocookie.net/synthv/images/c/c7/Wiki-wordmark-Ninezero.png',
	    'https://images.wikia.nocookie.net/synthv/images/7/76/Wiki-wordmark-noa.png',
	    'https://images.wikia.nocookie.net/synthv/images/d/dc/Wiki-wordmark-nyl.png',
	    'https://images.wikia.nocookie.net/synthv/images/9/99/Wiki-wordmark-OSCAR.png',
	    'https://images.wikia.nocookie.net/synthv/images/9/95/Wiki-wordmark-otomachi-una.png',
	    'https://images.wikia.nocookie.net/synthv/images/b/bf/Wiki-wordmark-POPY.png',
	    'https://images.wikia.nocookie.net/synthv/images/0/0e/Wiki-wordmark-Qingsu.png',
	    'https://images.wikia.nocookie.net/synthv/images/f/f9/Wiki-wordmark-riku.png',
	    'https://images.wikia.nocookie.net/synthv/images/6/6b/Wiki-wordmark-Ritchy.png',
	    'https://images.wikia.nocookie.net/synthv/images/2/24/Wiki-wordmark-ROSA.png',
	    'https://images.wikia.nocookie.net/synthv/images/9/9f/Wiki-wordmark-ROSE.png',
	    'https://images.wikia.nocookie.net/synthv/images/e/ee/Wiki-wordmark-Ryo.png',
	    'https://images.wikia.nocookie.net/synthv/images/4/40/Wiki-wordmark-saki.png',
	    'https://images.wikia.nocookie.net/synthv/images/e/ee/Wiki-wordmark-Saki-AI.png',
	    'https://images.wikia.nocookie.net/synthv/images/6/65/Wiki-wordmark-SAROS.png',
	    'https://images.wikia.nocookie.net/synthv/images/6/65/Wiki-wordmark-Sheena.png',
	    'https://images.wikia.nocookie.net/synthv/images/8/8b/Wiki-wordmark-shian.png',
	    'https://images.wikia.nocookie.net/synthv/images/4/43/Wiki-wordmark-shian_svs.png',
	    'https://images.wikia.nocookie.net/synthv/images/9/90/Wiki-wordmark-solaria.png',
	    'https://images.wikia.nocookie.net/synthv/images/7/71/Wiki-wordmark-synthv1.png',
	    'https://images.wikia.nocookie.net/synthv/images/1/14/Wiki-wordmark-svs.png',
	    'https://images.wikia.nocookie.net/synthv/images/c/c6/Wiki-wordmark-topaz.png',
	    'https://images.wikia.nocookie.net/synthv/images/f/f9/Wiki-wordmark-Tsuina-chan-Standard.png',
	    'https://images.wikia.nocookie.net/synthv/images/5/50/Wiki-wordmark-Tsuina-chan-AI.png',
	    'https://images.wikia.nocookie.net/synthv/images/7/70/Wiki-wordmark-tsurumaki-maki-eng.png',
	    'https://images.wikia.nocookie.net/synthv/images/5/52/Wiki-wordmark-tsurumaki-maki-jpn.png',
	    'https://images.wikia.nocookie.net/synthv/images/6/66/Wiki-wordmark-weina.png',
	    'https://images.wikia.nocookie.net/synthv/images/1/14/Wiki-wordmark-Wei-Shu.png',
	    'https://images.wikia.nocookie.net/synthv/images/f/fc/Wiki-wordmark-XIA-YU-YAO-2.png',
	    'https://images.wikia.nocookie.net/synthv/images/1/1e/Wiki-wordmark-Xingchen-Infinity.png',
	    'https://images.wikia.nocookie.net/synthv/images/7/70/Wiki-wordmark-xingchen-minus.png',
	    'https://images.wikia.nocookie.net/synthv/images/5/52/Wiki-wordmark-Yongye-Minus.png',
	    'https://images.wikia.nocookie.net/synthv/images/7/7c/Wiki-wordmark-Xuan-Yu.png',
	    'https://images.wikia.nocookie.net/synthv/images/1/1f/Wiki-wordmark-yamine-renri.png',
	    'https://images.wikia.nocookie.net/synthv/images/1/fc/Wiki-wordmark-renri-svs.png',
	    'https://images.wikia.nocookie.net/synthv/images/4/45/Wiki-wordmark-Yi-Xi.png',
	    'https://images.wikia.nocookie.net/synthv/images/f/fc/Wiki-wordmark-yuma.png',
	    'https://images.wikia.nocookie.net/synthv/images/3/3a/Wiki-wordmark-Yun-Quan.png',
	];

	$('.fandom-community-header__image img').attr('src', images[Math.floor(Math.random() * images.length)]);
});