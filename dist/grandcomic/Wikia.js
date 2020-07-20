$(function() {
	var $div = $('#word_list_button');
	
	if ($div.length === 1) {
		var getCellText = function(cell) {
			return $.trim($(cell).text());
		};

		var getPlainText = function() {
			var results = [];
			var $cells = $('table.wordlist td');

			for (var i=0; i < $cells.length; i+=5) {    
				var line = getCellText($cells[i]) + '\t' + 
				getCellText($cells[i+1]) + '\t' + 
				getCellText($cells[i+2]) + '\t' + 
				getCellText($cells[i+3]);
				
				results.push(line);
			}

			return results.join('\n');
		};
		
		var $btn = $div.append('<button>Show Word List in Plain Text</button>');
		
		$btn.click(function() {
			var $textArea = $('#word_list_button textarea');
			if ($textArea.length === 0) {
				$div.append('<br><textarea style="display:none" rows="6" cols="80"></textarea>');
				$textArea = $div.find('textarea');
				$textArea.fadeIn();
				$textArea.text(getPlainText());
			}
		});
	}
});