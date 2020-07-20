/* Kill XP calculator for [[Template:Infobox Monster new]] */
$('.infobox-monster').each(function(){
	var $infobox = $(this);
	var $wrapper = $infobox.parent();
	var $row = $('<tr>');
	var $input = $('<input type="number" value="1" min="0" style="width:90%; padding-left:3px; padding-right:3px;" />');
	
	var cbXPeach = 0, hpXPeach = 0, eqXPeach = 0, slayXPeach = 0;
	
	function resetCalc(firstTime){
		function getXP(v, c, c2){
			if (firstTime === true || $wrapper.find('.infobox-switch-resources span[data-attr-param="'+c2+'"]').length) {
				return parseFloat($infobox.find('.'+c).text().replace(/,/g,''));
			}
			else {
				return v;
			}
		}
		cbXPeach = getXP(cbXPeach, 'mob-cb-xp', 'experience');
		hpXPeach = getXP(hpXPeach, 'mob-hp-xp', 'hpxp');
		slayXPeach = getXP(slayXPeach, 'mob-slay-xp', 'slayxp');
		
		eqXPeach = cbXPeach * 0.02;
		
		$input.val(1);
	}
	
	function updateCalc(){
		function setXP(c, v) {
			$infobox.find('.'+c).text(v);
		}
		function twodp(v){
			return v.toLocaleString({useGrouping:true, maximumFractionDigits:2});
		}
		var val = parseInt($input.val(), 10);
		if (Number.isNaN(val)) {
			return;
		}
		setXP('mob-cb-xp', twodp(cbXPeach * val));
		setXP('mob-hp-xp', twodp(hpXPeach * val));
		setXP('mob-slay-xp', twodp(slayXPeach * val));
		
		setXP('mob-eq-xp', twodp(eqXPeach * 3 * val) + ' / ' + twodp(eqXPeach * 2 * val) + ' / ' + twodp(eqXPeach * val));
	}
	$infobox.parent().find('.infobox-buttons').on('switchinfoboxComplete', resetCalc);
	$input.on('change keyup mouseup', updateCalc);
	
	
	$row
		.append($('<th>')
			.attr('colspan', 2)
			.text('Number of kills')
			)
		.append($('<td>')
			.attr('colspan', 2)
			.append($input)
			)
		.insertAfter($infobox.find('.combat-info-header').parent());
	
	resetCalc(true);
});