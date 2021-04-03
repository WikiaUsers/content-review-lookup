var dt = new Date('2015-06-30T17:00:00Z');
var $target = $('#countdown');
 
showTime();
 
function showTime() {
	var dateNow = new Date();
	var timeDiff = Math.abs(dt.getTime() - dateNow.getTime()); 
	var hours = Math.floor( timeDiff / 36e5 );
	var mins = Math.floor( (timeDiff % 36e5) / 6e4 );
	$target.html( ' (in <b style="font-size:120%">' + 
		hours + '</b> часов, <b style="font-size:120%">' + 
		mins + '</b> минут)');
}