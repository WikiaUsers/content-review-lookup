$(function() {
	var inputForm = document.getElementById('tournament-results-filter');
	if (! inputForm) return;
	var thisPlayer = mw.config.get('wgTitle').split('/')[0];
	function getNewContent(player, minplace) {
		var text = '{{PlayerResults|show=everything|' + player + '|minplacement=' + minplace + '}}';
		var a = new mw.Api();
		return a.get({
			action : 'parse',
			text : text,
			prop : 'text'
		}).then(function(data) {
			return window.processParserOutput(data.parse.text['*']);
		});
	}
	function updateDisplay(html){
		$('#trf-content').html(html);
		return;
	}
	$('#trf-submit').click(function(e) {
		e.preventDefault();
		var minplace = $('#trf-minplace').val();
		if (!minplace) {
			alert('Please enter a minimum placement to filter');
			return;
		}
		return getNewContent(thisPlayer, minplace)
		.then(updateDisplay);
	});
	$('#trf-reset').click(function(e) {
		e.preventDefault();
		var minplace = 100000;
		return getNewContent(thisPlayer, minplace)
		.then(updateDisplay);
	})
});