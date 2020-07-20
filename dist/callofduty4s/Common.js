var Stats;
 
function FetchBF3Stats() {
	var BF3Stats = document.getElementById('BF3Stats');
	var Player = BF3Stats.dataset.player;
	var Platform = BF3Stats.dataset.platform;
	$('#BF3Stats').html('Loading stats. <img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />');
 
	$.ajax({
		type: 'POST',
		url: 'http://api.bf3stats.com/' + Platform + '/player/',
		data: { 
			'player': Player, 
			'opt': 'rank'
		},
		success: function(data){
			Stats = JSON.parse(data);
			BuildStatTable();
		}
	});
}

function BuildStatTable() {
	var html = '<table class="wikitable" style="width:40%;"><tr><th colspan="2">BF3 Stats</th></tr>';
	html = html + '<tr><td colspan="2">' + Stats.name + '<img src="http://files.bf3stats.com/img/' + Stats.country_img + '"/></td></tr>';
	html = html + AddStat('Rank', Stats.stats.rank.name);
	html = html + AddStat('Score', Stats.stats.rank.score);
	html = html + '</table><span style="font-size:70%;">Stats generated by <a href="http://bf3stats.com">bf3stats.com</a></span>';
	$('#BF3Stats').html(html);
}

function AddStat(stat, value) {
	return '<tr><td>' + stat + '</td><td>' + value  + '</td></tr>';
}	
	
$(document).ready(function() {
	if ((mw.config.get('wgCanonicalNamespace') == 'User') && ($('#BF3Stats').length > 0)) {
		FetchBF3Stats()
	}
});