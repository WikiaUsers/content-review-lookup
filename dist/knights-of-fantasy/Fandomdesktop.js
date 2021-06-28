( function ( mw, $ ) {
	
$.when( mw.loader.using(["mediawiki.api", "mediawiki.jqueryMsg"]), $.ready ).done( function() {
	new mw.Api().loadMessagesIfMissing( ['custom-reference-date' ] ).done( function() {
		regularEventCountdown(mw.message( 'custom-reference-date' ).plain());
		mw.hook('wikipage.content').fire($('.countdown'));
		$('.post-countdown').hide();
	});
} );

} )( mediaWiki, jQuery );

function convertTZ(date, tzString)
{	//NOTE: do not forget to discard the timezone from the result
	return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
}
function getTimeZone() 
{ 
	return /\((.*)\)/.exec(new Date().toString());
}
function appendCountDown(header, glow, strCountDown1, strCountDown2, strCountDown3)
{
	var dispTime = new Date(strCountDown1);
	$('.tbl_countdown')
	.append('<tr><th colspan="2" style="text-align:left">' + header + '</th></tr><tr><td>' + (glow ? 'ends on ' : '') + dispTime.toString().substr(4, 11) +
			'<br /><span style="font-size:2em">' + dispTime.toLocaleTimeString() + '</span></td><td>' +
	'<span data-end="toggle" data-toggle="next" class="countdown ' + 
			(glow ? 'glow' : '') + '" data-options="no-leading-zeros short-format" style="display:none; font-size:3em">' +
			'<span class="countdowndate">' + strCountDown1 + '</span></span><span style="display:none; font-size:2em">Please refresh page.</span></td>');
	if (strCountDown2)		
	{
		$('.countdown').last()
		.after('<span data-end="toggle" data-toggle="next" class="countdown post-countdown ' +
			(!glow ? 'glow' : '') +'" data-options="no-leading-zeros short-format" style="display:none; font-size:3em">' +
			'<span class="countdowndate">' + strCountDown2 + '</span></span>');
	}
	if (strCountDown3)
	{
		$('.post-countdown').last()
		.after('<span data-end="toggle" data-toggle="next" class="countdown post-countdown ' + 
				(glow ? 'glow' : '') + '" data-options="no-leading-zeros short-format" style="display:none; font-size:3em">' +
				'<span class="countdowndate">' + strCountDown3 + '</span></span>');
	}
}
function regularEventCountdown(refTime) {
	var servTime = convertTZ(new Date(), "America/New_York").getTime();
	var tempTime = new Date(servTime);
	var dispTime, strCountDown1, strCountDown2, strCountDown3;
	var today = new Date();
	var zero = today.getTime() + (today.getTimezoneOffset() * 60 * 1000);
	var suffix =  (parseInt((zero - servTime) / (60 * 60 * 1000)) == 4) ? " EDT " : " ";
	var glow = 0;
	
	/*****************
	*  DAILY EVENTS  *
	*****************/
	//Infinite Maze
	if (tempTime.toTimeString().split(" ")[0] < "12:30")
	{
		strCountDown1 = tempTime.toString().substr(4, 11) + " 12:30" + suffix;
		strCountDown2 = tempTime.toString().substr(4, 11) + " 13:30" + suffix;
		strCountDown3 = tempTime.toString().substr(4, 11) + " 18:30" + suffix;
	}
	else if (tempTime.toTimeString().split(" ")[0] < "13:30")
	{
		glow = 1;
		strCountDown1 = tempTime.toString().substr(4, 11) + " 13:30" + suffix;
		strCountDown2 = tempTime.toString().substr(4, 11) + " 18:30" + suffix;
		strCountDown3 = tempTime.toString().substr(4, 11) + " 19:30" + suffix;
	}
	else if (tempTime.toTimeString().split(" ")[0] < "18:30")
	{
		strCountDown1 = tempTime.toString().substr(4, 11) + " 18:30" + suffix;
		strCountDown2 = tempTime.toString().substr(4, 11) + " 19:30" + suffix;
	tempTime.setDate(tempTime.getDate() + 1);
		strCountDown3 = tempTime.toString().substr(4, 11) + " 12:30" + suffix;
	}
	else if (tempTime.toTimeString().split(" ")[0] < "19:30")
	{
		glow = 1;
		strCountDown1 = tempTime.toString().substr(4, 11) + " 19:30" + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown2 = tempTime.toString().substr(4, 11) + " 12:30" + suffix;
		strCountDown3 = tempTime.toString().substr(4, 11) + " 13:30" + suffix;
	}
	else
	{
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown1 = tempTime.toString().substr(4, 11) + " 12:30" + suffix;
		strCountDown2 = tempTime.toString().substr(4, 11) + " 13:30" + suffix;
		strCountDown3 = tempTime.toString().substr(4, 11) + " 18:30" + suffix;
	}
	appendCountDown("INFINITE MAZE", glow, strCountDown1, strCountDown2, strCountDown3);
	//Goddess of Light
	tempTime = new Date(servTime);
	glow = 0;
	if (tempTime.getDay() > 0 && tempTime.toTimeString().split(" ")[0] < "20:30")
	{//excluding Sunday
		strCountDown1 = tempTime.toString().substr(4, 11) + " 20:30" + suffix;
		strCountDown2 = tempTime.toString().substr(4, 11) + " 20:40" + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown3 = tempTime.toString().substr(4, 11) + " 20:30" + suffix;
	}
	else if (tempTime.getDay() > 0 && tempTime.toTimeString().split(" ")[0] < "20:40")
	{//excluding Sunday
		glow = 1;
		strCountDown1 = tempTime.toString().substr(4, 11) + " 20:40" + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown2 = tempTime.toString().substr(4, 11) + " 20:30" + suffix;
		strCountDown3 = tempTime.toString().substr(4, 11) + " 20:40" + suffix;
	}
	else
	{
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown1 = tempTime.toString().substr(4, 11) + " 20:30" + suffix;
		strCountDown2 = tempTime.toString().substr(4, 11) + " 20:40" + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown3 = tempTime.toString().substr(4, 11) + " 20:30" + suffix;
	}
	appendCountDown("GODDESS OF LIGHT", glow, strCountDown1, strCountDown2, strCountDown3);
	//World boss
	tempTime = new Date(servTime);
	glow = 0;
	if (tempTime.toTimeString().split(" ")[0] < "21:00")
	{
		strCountDown1 = tempTime.toString().substr(4, 11) + " 21:00" + suffix;
		strCountDown2 = tempTime.toString().substr(4, 11) + " 21:10" + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown3 = tempTime.toString().substr(4, 11) + " 21:00" + suffix;
	}
	else if (tempTime.toTimeString().split(" ")[0] < "21:10")
	{
		glow = 1;
		strCountDown1 = tempTime.toString().substr(4, 11) + " 21:10" + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown2 = tempTime.toString().substr(4, 11) + " 21:00" + suffix;
		strCountDown3 = tempTime.toString().substr(4, 11) + " 21:10" + suffix;
	}
	else
	{
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown1 = tempTime.toString().substr(4, 11) + " 21:00" + suffix;
		strCountDown2 = tempTime.toString().substr(4, 11) + " 21:10" + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown3 = tempTime.toString().substr(4, 11) + " 21:00" + suffix;
	}
	appendCountDown("WORLD BOSS", glow, strCountDown1, strCountDown2, strCountDown3);
	//Infinite Abyss
	tempTime = new Date(servTime);
	glow = 0;
	if (tempTime.toTimeString().split(" ")[0] < "21:20")
	{
		strCountDown1 = tempTime.toString().substr(4, 11) + " 21:20" + suffix;
		strCountDown2 = tempTime.toString().substr(4, 11) + " 21:30" + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown3 = tempTime.toString().substr(4, 11) + " 21:20" + suffix;
	}
	else if (tempTime.toTimeString().split(" ")[0] < "21:30")
	{
		glow = 1;
		strCountDown1 = tempTime.toString().substr(4, 11) + " 21:30" + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown2 = tempTime.toString().substr(4, 11) + " 21:20" + suffix;
		strCountDown3 = tempTime.toString().substr(4, 11) + " 21:30" + suffix;
	}
	else
	{
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown1 = tempTime.toString().substr(4, 11) + " 21:20" + suffix;
		strCountDown2 = tempTime.toString().substr(4, 11) + " 21:30" + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown3 = tempTime.toString().substr(4, 11) + " 21:20" + suffix;
	}
	appendCountDown("INFINITE ABYSS", glow, strCountDown1, strCountDown2, strCountDown3);
	/******************
	*  WEEKLY EVENTS  *
	*******************/
	//Guild Battle
	tempTime = new Date(servTime);
	glow = 0;
	if (tempTime.getDay() == 0 && tempTime.toTimeString().split(" ")[0] < "20:00")
	{//only Sunday
		strCountDown1 = tempTime.toString().substr(4, 11) + " 20:00" + suffix;
		strCountDown2 = tempTime.toString().substr(4, 11) + " 20:15" + suffix;
		tempTime.setDate(tempTime.getDate() + 7);
		strCountDown2 = tempTime.toString().substr(4, 11) + " 20:00" + suffix;
	}
	else if (tempTime.getDay() == 0 && tempTime.toTimeString().split(" ")[0] < "20:15")
	{//only Sunday
		glow = 1;
		strCountDown1 = tempTime.toString().substr(4, 11) + " 20:15" + suffix;
		tempTime.setDate(tempTime.getDate() + 7);
		strCountDown2 = tempTime.toString().substr(4, 11) + " 20:00" + suffix;
		strCountDown3 = 0;
	}
	else
	{
		tempTime.setDate(tempTime.getDate() + 7 - tempTime.getDay());
		strCountDown1 = tempTime.toString().substr(4, 11) + " 20:00" + suffix;
		strCountDown2 = 0;
		strCountDown3 = 0;
	}
	appendCountDown("BATTLE FOR RELIC ISLAND", glow, strCountDown1, strCountDown2, strCountDown3);
	//Fishing Competition
	tempTime = new Date(servTime);
	glow = 0;
	if (tempTime.getDay() == 0 && tempTime.toTimeString().split(" ")[0] < "20:30")
	{//only Sunday
		strCountDown1 = tempTime.toString().substr(4, 11) + " 20:30" + suffix;
		strCountDown2 = tempTime.toString().substr(4, 11) + " 20:55" + suffix;
		tempTime.setDate(tempTime.getDate() + 7);
		strCountDown3 = tempTime.toString().substr(4, 11) + " 20:30" + suffix;
	}
	else if (tempTime.getDay() == 0 && tempTime.toTimeString().split(" ")[0] < "20:55")
	{//only Sunday
		glow = 1;
		strCountDown1 = tempTime.toString().substr(4, 11) + " 20:55" + suffix;
		tempTime.setDate(tempTime.getDate() + 7);
		strCountDown2 = tempTime.toString().substr(4, 11) + " 20:30" + suffix;
		strCountDown3 = 0;
	}
	else
	{
		tempTime.setDate(tempTime.getDate() + 7 - tempTime.getDay());
		strCountDown1 = tempTime.toString().substr(4, 11) + " 20:30" + suffix;
		strCountDown2 = 0;
		strCountDown3 = 0;
	}
	appendCountDown("FISHING COMPETITION", glow, strCountDown1, strCountDown2, strCountDown3);
	
	/***********************
	*  FORTNIGHTLY EVENTS  *
	************************/
	//if refTime is not set, use default (Reminder: DO NOT USE suffix)
	var referenceTime = (!isNaN(Date.parse(refTime)) ? new Date(refTime) : new Date("April 23 2021"));
	//set referenceTime to the Friday of the week
	referenceTime.setDate(referenceTime.getDate() + 5 - referenceTime.getDay());
	//forgot to reset tempTime before use
	tempTime = new Date(servTime);
	//get difference of current time from reference time
	var diffDay = 14 - (parseInt((tempTime.getTime() - referenceTime.getTime()) / (1000*60*60*24)) % 14);
	//2x event 1
	if (diffDay < 14)
	{
		glow = 0;
		tempTime.setDate(tempTime.getDate() + diffDay);
		strCountDown1 = tempTime.toString().substr(4, 11) + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown2 = tempTime.toString().substr(4, 11) + suffix;
	}
	else
	{
		glow = 1;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown1 = tempTime.toString().substr(4, 11) + suffix;
		tempTime.setDate(tempTime.getDate() + 13);
		strCountDown2 = tempTime.toString().substr(4, 11) + suffix;
	}
	appendCountDown("FAIRY PRAY: Success Rate x1.5; Crit Rate x2", glow, strCountDown1, strCountDown2);
	//2x event 2
	tempTime = new Date(servTime);
	diffDay = ((diffDay < 14) ? (diffDay + 1) : 1);
	if (diffDay < 14)
	{
		glow = 0;
		tempTime.setDate(tempTime.getDate() + diffDay);
		strCountDown1 = tempTime.toString().substr(4, 11) + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown2 = tempTime.toString().substr(4, 11) + suffix;
	}
	else
	{
		glow = 1;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown1 = tempTime.toString().substr(4, 11) + suffix;
		tempTime.setDate(tempTime.getDate() + 13);
		strCountDown2 = tempTime.toString().substr(4, 11) + suffix;
	}
	appendCountDown("ABYSS PARTY: Reward x2", glow, strCountDown1, strCountDown2);
	//2x event 3
	tempTime = new Date(servTime);
	diffDay = ((diffDay < 14) ? (diffDay + 1) : 1);
	if (diffDay < 14)
	{
		glow = 0;
		tempTime.setDate(tempTime.getDate() + diffDay);
		strCountDown1 = tempTime.toString().substr(4, 11) + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown2 = tempTime.toString().substr(4, 11) + suffix;
	}
	else
	{
		glow = 1;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown1 = tempTime.toString().substr(4, 11) + suffix;
		tempTime.setDate(tempTime.getDate() + 13);
		strCountDown2 = tempTime.toString().substr(4, 11) + suffix;
	}
	appendCountDown("MATERIAL INSTANCE: Rewards x2", glow, strCountDown1, strCountDown2);
	//2x event 4
	tempTime = new Date(servTime);
	diffDay = ((diffDay < 10) ? (diffDay + 5) : (diffDay - 9));
	if (diffDay < 14)
	{
		glow = 0;
		tempTime.setDate(tempTime.getDate() + diffDay);
		strCountDown1 = tempTime.toString().substr(4, 11) + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown2 = tempTime.toString().substr(4, 11) + suffix;
	}
	else
	{
		glow = 1;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown1 = tempTime.toString().substr(4, 11) + suffix;
		tempTime.setDate(tempTime.getDate() + 13);
		strCountDown2 = tempTime.toString().substr(4, 11) + suffix;
	}
	appendCountDown("PET STAR UP: Skill Activation Chance x2", glow, strCountDown1, strCountDown2);
	//2x event 5
	tempTime = new Date(servTime);
	diffDay = ((diffDay < 14) ? (diffDay + 1) : 1);
	if (diffDay < 14)
	{
		glow = 0;
		tempTime.setDate(tempTime.getDate() + diffDay);
		strCountDown1 = tempTime.toString().substr(4, 11) + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown2 = tempTime.toString().substr(4, 11) + suffix;
	}
	else
	{
		glow = 1;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown1 = tempTime.toString().substr(4, 11) + suffix;
		tempTime.setDate(tempTime.getDate() + 13);
		strCountDown2 = tempTime.toString().substr(4, 11) + suffix;
	}
	appendCountDown("UNIQUE BOSS: Dropped Bond Items x2", glow, strCountDown1, strCountDown2);
	//2x event 6
	tempTime = new Date(servTime);
	diffDay = ((diffDay < 14) ? (diffDay + 1) : 1);
	if (diffDay < 14)
	{
		glow = 0;
		tempTime.setDate(tempTime.getDate() + diffDay);
		strCountDown1 = tempTime.toString().substr(4, 11) + suffix;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown2 = tempTime.toString().substr(4, 11) + suffix;
	}
	else
	{
		glow = 1;
		tempTime.setDate(tempTime.getDate() + 1);
		strCountDown1 = tempTime.toString().substr(4, 11) + suffix;
		tempTime.setDate(tempTime.getDate() + 13);
		strCountDown2 = tempTime.toString().substr(4, 11) + suffix;
	}
	appendCountDown("EXP & GOLD TRIAL: Challenge or Wipe-out Rewards 2x", glow, strCountDown1, strCountDown2);
}