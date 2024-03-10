function refreshPlp() {
	var players = [];
	$('.team-members-player').each(function() {
		var playerId = $(this).attr('data-player-id');
		if (playerId) players.push(playerId);
	});
	console.log(players);
	window.startSpinner($('#plpRefresher'));
	window.blankEditAll(players, 10).then(function(data) {
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