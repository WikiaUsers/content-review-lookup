$(function() {
	
	function aggregateLinkTargets(link, aggregator) {
		aggregator.push($(link).attr('href').replace(/^\//, ''));
	}
	
	$('#player-refresh-button').click(function() {
		window.startSpinner(this);
		var listOfPlayers = [];
		$('.spstats-player a').each(function() {
			aggregateLinkTargets(this, listOfPlayers);
		});
		var listOfTeams = [];
		$('.spstats-team a').each(function() {
			aggregateLinkTargets(this, listOfTeams);
		});
		return window.blankEditAll(listOfPlayers).then(function() {
			return window.purgeAll(listOfTeams);
		}).then(function() {
			window.endSpinner();
			alert('Done! You can close the window now.');
			console.log('done!');
		});
	});
});