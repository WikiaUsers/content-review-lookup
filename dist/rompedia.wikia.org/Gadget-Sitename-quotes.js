quotes = [
	['Alea iacta est.', 'Der Würfel ist gefallen.'],
	['Amicus certus in re incerta cernitur.', 'In der Not erkennst du den wahren Freund'],
	['Audiatur et altera pars!', 'Es möge auch die andere Seite gehört werden.']
];
rand = quotes[Math.floor(Math.random() * quotes.length)];
$('.wds-community-header__sitename > a').text('„' + rand[0] + ' […]“').attr({ title: rand[1], 'data-original-title': rand[1] });