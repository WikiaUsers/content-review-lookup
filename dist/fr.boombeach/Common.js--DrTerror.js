	function createevent() { //Create event form
		$('.WikiaRail').prepend('<div style="background-color:purple; border-radius:5px; margin:5px; color:white; text-align:center;" class="event"><div style="float:left;" id="event-image"></div><div style="font-style:italic;">Aujourd\'hui :</div><div style="font-size:130%;" id="event-name">Aucun évenement</div><div id="time-remaining">0h</div></div>');
	}
	function getdate() { //Get the day, because of 6 day, see which event is today, based on a dr terror 1 date.
		return Math.floor(($.now() - new Date('2015','04','15','06','00','00')) / (1000*60*60*24));
	}
	function remainingtime() { //Get the time remaining before the event started (if ended) or ended (if started)
		var dates = new Date();
		var nowdate = new Date();
		var starting = true;
		if (nowdate.getHours() > 5) {
			dates = new Date(nowdate.getFullYear(),nowdate.getMonth(),nowdate.getDate() + 1,'03','00','00'); //After 6 morning, event start
		} else if (nowdate.getHours() < 3) {
			dates = new Date(nowdate.getFullYear(),nowdate.getMonth(),nowdate.getDate(),'03','00','00'); //Tomorrow, before 3 a.m
		} else {
			starting = false;
			dates = new Date(nowdate.getFullYear(),nowdate.getMonth(),nowdate.getDate(),'06','00','00'); //Between 3am and 6am, no event, show the next one
		}
		var hour = Math.floor((dates - $.now()) / (1000*60*60));
		if (hour < 10)
            hour = "0" + hour;
		var minutes = Math.ceil((dates - $.now()) / (1000*60)) - (hour * 60);
		if (minutes < 10)
            minutes = "0" + minutes;
		if (starting) {
			$('#time-remaining').html('Temps restant : ' + hour + ' h ' + minutes + ' m'); //Event started
		} else {
			$('#time-remaining').html('Commence dans ' + hour + ' h ' + minutes + ' m'); //Event not started
		}
	}
	createevent();
	var eventdate = getdate();
	remainingtime();
	eventdate = Math.floor(eventdate % 6); //Check with number between 0 and 5, if not reduce it of 6
	console.log(eventdate);
	switch (eventdate) { //Check for the event, and attribute class for image
		case 0:
		case 3:
		$('#event-name').html('Dr. T, base Terreur');
		$('#event-image').attr('class','dr-terror-image');
		break;
		case 1:
		case 4:
		$('#event-name').html('Dr. T, base Volcanique');
		$('#event-image').attr('class','dr-terror-image');
		break;
		case 2:
		$('#event-name').html('Revanche du lieutenant Hammerman');
		$('#event-image').attr('class','hammerman-image');
		break;
		case 5:
		$('#event-name').html('Colonel Gearheart');
		$('#event-image').attr('class','gearheart-image');
		break;
	}