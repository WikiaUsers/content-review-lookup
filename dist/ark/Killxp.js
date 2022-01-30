$(function() {
	var Strings = {
		Level: 'Level',
	};

	function calculateXPForLevel(baseXP, level) {
		return (baseXP * (1 + (level - 1) * 0.1)).toFixed(2);
	}

	$('.killxpcalc').each(function () {
		var $this = $(this),
		    baseXP = $this.data('basexp'),
			$result = null;
		if (baseXP) {
			$result = $('<span>').text(calculateXPForLevel(baseXP, 1));
			$this.text(Strings.Level + ' ')
				 .append($('<input type="number" min="1" max="999999" maxlength="6" value="1" style="width:3.5em">')
				 		 .on('change', function() {
							  $result.text(calculateXPForLevel(baseXP, parseInt(this.value)));
						  }))
				 .append(': ')
				 .append($result);
		}
	});
});