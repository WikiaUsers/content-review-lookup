function refreshPlp() {
	var players = [];
	$('.team-members-player').each(function() {
		var playerId = $(this).attr('data-player-id');
		if (playerId) players.push(playerId);
	});
	console.log(players);
    var players_with_redirect = [];
	where_query = 'Players.OverviewPage="' + players[0] +'"';
	for (let i = 1; i < players.length; i++) {
		where_query = where_query + ' OR Players.OverviewPage="' + players[i] +'"';
	}
	window.cargoQuery({
		tables: "Players, PlayerRedirects",
		fields: "PlayerRedirects.AllName",
		where: where_query,
		join_on: "PlayerRedirects.OverviewPage=Players.OverviewPage",
		group_by: "PlayerRedirects.AllName",
		limit: "9999"
	}).then(function(data) {
		for (let i = 0; i < data.length; i++) {
			players_with_redirect.push(data[i]["AllName"]);
		}
	}).then(function(data) {
		console.log(players_with_redirect);
	}).then(window.startSpinner($('#plpRefresher')))
	.then(window.blankEditAll(players_with_redirect, 10)).then(function(data) {
		console.log('hello');
		window.purgeWithReload(mw.config.get('wgTitle'));
	});
}

$(function() {
	if (! $('#infoboxTeam')) return;
	if ('#plpRefresher') $('#plpRefresher').detach();
	var el = document.createElement('div');
	$(el).html('Refresh PLP!')
		.attr('id', 'plpRefresher')
		.addClass('action-button')
		.insertAfter($('#Player_League_Participation').parent());
	$(el).click(function(e) {
		e.preventDefault();
		refreshPlp();
	});
});