// <nowiki>
$(function() {
	var button = document.getElementById('generate-bracket-button');
	if (!button) return;
	$(button).click(function(e) {
		e.preventDefault();
		var oldOutput = document.getElementById('generate-bracket-output');
		if (oldOutput) {
			$(oldOutput).remove();
		}
		var bracket = $(document.getElementById('generate-bracket-bracket')).val();
		var fields = $(document.getElementById('generate-bracket-fields')).val();
		var matchfields = $(document.getElementById('generate-bracket-matchfields')).val();
		if (!bracket) {
			alert('Bracket type is required!');
			return;
		}
		fields = fields ? fields : '';
		matchfields = matchfields ? matchfields : '';
		var a = new mw.Api();
		var text = '{{BracketCopyableCode|' + bracket + '|fields=' + fields + '|matchfields=' + matchfields + '}}';
		a.get({
			action : 'parse',
			text : text,
			prop : 'text'
		}).then(function(data) {
			var str = window.processParserOutput(data.parse.text['*']);
			var tbl = str.split('*****');
			str = tbl[1];
			var el = document.createElement('textarea');
			el.value = str;
			el.setAttribute('readonly', '');
			$(el).css('width','calc(100% - 250px)');
			$(el).css('height','500px');
			$(el).attr('id','generate-bracket-output');
			$(el).attr('tabindex','5');
			$(el).insertAfter('#generate-bracket-button');
			el.select();
		});
		
	});
});
// </nowiki>