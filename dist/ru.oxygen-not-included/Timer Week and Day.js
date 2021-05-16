function updatetimer() {
	var now = new Date();
	var then = new Date($('.countdowndateONI').text());
	var delta = (then - now)/(1000 * 60 * 60 * 24);
	var text = "";
	
	if (delta < -1) text = "Уже вышло!";
	else if (delta < 0) text = "Совсем чуть-чуть!"
	else if (delta < 1) text = "Меньше дня!";
	else {
		delta = Math.floor(delta);
		var weeks = Math.floor(delta / 7);
		var days = delta - weeks * 7;
		
		if (weeks === 0) text = days + ' ' + RusEnds(days, 'день','дня','дней');
		else if (days === 0) text = weeks + ' ' + RusEnds(weeks, 'неделя','недели','недель');
		else text = weeks + ' ' + RusEnds(weeks, 'неделя','недели','недель') + ', ' + days + ' ' + RusEnds(days, 'день','дня','дней');
	}
	$('.lefttimeONI').text(text);
}

function RusEnds(num, one, two, five) {
	var d10 = num % 10, d100 = num % 100;
	if (d10 == 1 && d100 != 11) return one;
	if (d10 > 1 && d10 < 5 && ( d100 < 10 || d100 >= 20)) return two;
	else return five;
}
updatetimer();