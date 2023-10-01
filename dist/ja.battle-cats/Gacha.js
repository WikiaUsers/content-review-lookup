mw.loader.using('mediawiki.api').then(function () {
	if (mw.config.get('wgPageName') == 'ユーザー:SweetDonut0/サンドボックス') {
		// initialize gacha simulator
		$('#gacha-simulator').append('<input type="button" id="gacha-button-roll" value="Roll">');

		// event handling
		$("#gacha-button-roll").click(function () {
			$('#gacha-output').empty();
			$('#gacha-output').append(getRarity());
		});
	}
});

function getRarity() {
	var rand = Math.random();
	if (rand < 0.003) {
		return '<img src="https://static.wikia.nocookie.net/battle-cats/images/9/93/Rarity_text_legend.png/revision/latest?cb=20230923134659" alt="Legend Rare">';
	} else if (rand < 0.053) {
		return '<img src="https://static.wikia.nocookie.net/battle-cats/images/6/6b/Rarity_text_uber.png/revision/latest?cb=20230923134615" alt="Uber Super Rare">';
	} else if (rand < 0.303) {
		return '<img src="https://static.wikia.nocookie.net/battle-cats/images/f/fb/Rarity_text_super.png/revision/latest?cb=20230923134537" alt="Super Rare">';
	} else {
		return '<img src="https://static.wikia.nocookie.net/battle-cats/images/2/25/Rarity_text_rare.png/revision/latest?cb=20230923134423" alt="Rare">';
	}
}