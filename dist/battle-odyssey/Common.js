/* Any JavaScript here will be loaded for all users on every page load. */
$('#energyfield').html('<input id="energyvalue" maxlength="3" min="0" max="999" name="minutes" value="" placeholder="0" type="number"/>');
$('#energyvalue').on('keypress keyup blur change', function(e) {
	//return false if not 0-9
	if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	   return false;
	} else {
		//limit length but allow backspace so that you can still delete the numbers.
		if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
			return false;
		}
	}
});

$('#energyvalue').on('blur change', function(e) {
	calculateEnergy();
});

function calculateEnergy() {
	// get the x value
	var valueX = $('#energyvalue').val();
	
	//recovery time per 1 energy
	var recoveryTime = 5; //5minutes
	
	// keep the time always in 2 digits
	function pad (str, max) {
		str = str.toString();
		return str.length < max ? pad("0" + str, max) : str;
	}
	
	// get the total hours
	var getHours = Math.round(Math.floor(valueX * recoveryTime /60));
	// print hour/s
	$('#energyhours').html(pad(getHours,2));
	
	// get the total minutes
	totalMinutes = (valueX * recoveryTime /60 - Math.floor(valueX * recoveryTime /60)) * 60;
	getMinutes = Math.round(totalMinutes);

	// print minute/s
	$('#energyminutes').html(pad(getMinutes,2));
	
	// get the current time
	//var dt = new Date();
		// hours
	//var dthours = dt.getHours();
		// minutes
	//var dtminutes = dt.getMinutes();
}