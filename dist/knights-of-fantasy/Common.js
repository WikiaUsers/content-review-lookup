function convertTZ(date, tzString)
{	//NOTE: do not forget to discard the timezone from the result
	return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
}
function getTimeZone() 
{ 
	return /\((.*)\)/.exec(new Date().toString());
}
function appendCountDown(header, strCountDown)
{
	var dispTime = new Date(strCountDown);
	$('.tbl_countdown')
	.append('<tr><th colspan="2" style="text-align:left"><h3>' + header + '</h3></th></tr><tr><td>' + dispTime.toString().substr(4, 11) + '<br /><span style="font-size:2em">' + dispTime.toLocaleTimeString() + '</span></td>' +
	'<td><span class="countdown" data-options="no-leading-zeros short-format" style="display:none; font-size:3em"><span class="countdowndate">' + strCountDown + '</span></span></td>');
}
function regularEventCountdown() {
	var servTime = convertTZ(new Date(), "America/New_York").getTime();
	var tempTime = new Date(servTime);
	var dispTime, strCountDown;
	var today = new Date();
	var zero = today.getTime() + (today.getTimezoneOffset() * 60 * 1000);
	var suffix =  (parseInt((zero - servTime) / (60 * 60 * 1000)) == 4) ? " EDT" : suffix;
	
	//Infinite Maze
	if (tempTime.toTimeString().split(" ")[0] < "12:30")
	{
		strCountDown = tempTime.toString().substr(4, 11) + " 12:30" + suffix;
	}
	else if (tempTime.toTimeString().split(" ")[0] < "18:30")
	{
		strCountDown = tempTime.toString().substr(4, 11) + " 18:30" + suffix;
	}
	else
	{
		tempTime.setDate(tempTime.getDate()+1);
		strCountDown = tempTime.toString().substr(4, 11) + " 12:30" + suffix;
	}
	appendCountDown("INFINITE MAZE", strCountDown);
	//Goddess of Light
	tempTime = new Date(servTime);
	if ("20:30" <= tempTime.toTimeString().split(" ")[0])
	{
		tempTime.setDate(tempTime.getDate()+1);
	}
	if (tempTime.getDay() == 0)
	{
		tempTime.setDate(tempTime.getDate()+1);
	}
	appendCountDown("GODDESS OF LIGHT", tempTime.toString().substr(4, 11) + " 20:30" + suffix);
	//World boss
	tempTime = new Date(servTime);
	if ("21:00" <= tempTime.toTimeString().split(" ")[0])
	{
		tempTime.setDate(tempTime.getDate()+1);
	}
	appendCountDown("WORLD BOSS", tempTime.toString().substr(4, 11) + " 21:00" + suffix);
	//Infinite Abyss
	tempTime = new Date(servTime);
	if ("21:20" <= tempTime.toTimeString().split(" ")[0])
	{
		tempTime.setDate(tempTime.getDate()+1);
	}
	appendCountDown("INFINITE ABYSS", tempTime.toString().substr(4, 11) + " 21:20" + suffix);
	//Guild Battle
	tempTime = new Date(servTime);
	if ("20:00" <= tempTime.toTimeString().split(" ")[0] || tempTime.getDay() > 0)
	{
		tempTime.setDate(tempTime.getDate()+7-tempTime.getDay());
	}
	appendCountDown("BATTLE FOR RELIC ISLAND", tempTime.toString().substr(4, 11) + " 20:00" + suffix);
	//Fishing Competition
	tempTime = new Date(servTime);
	if ("20:30" <= tempTime.toTimeString().split(" ")[0] || tempTime.getDay() > 0)
	{
		tempTime.setDate(tempTime.getDate()+7-tempTime.getDay());
	}
	appendCountDown("FISHING COMPETITION", tempTime.toString().substr(4, 11) + " 20:30" + suffix);
	//2x event 1
	var referenceTime = new Date("November 13 2020");
	tempTime = new Date(servTime);
	tempTime.setDate(tempTime.getDate() + 14 - (parseInt((tempTime.getTime() - referenceTime.getTime()) / (1000*60*60*24)) % 14));
	appendCountDown("FAIRY PRAY: Success Rate x1.5; Crit Rate x2", tempTime.toString().substr(4, 11) + suffix);
	//2x event 2
	referenceTime.setDate(referenceTime.getDate()+1);
	tempTime = new Date(servTime);
	tempTime.setDate(tempTime.getDate() + 14 - (parseInt((tempTime.getTime() - referenceTime.getTime()) / (1000*60*60*24)) % 14));
	appendCountDown("ABYSS PARTY: Reward x2", tempTime.toString().substr(4, 11) + suffix);
	//2x event 3
	referenceTime.setDate(referenceTime.getDate()+1);
	tempTime = new Date(servTime);
	tempTime.setDate(tempTime.getDate() + 14 - (parseInt((tempTime.getTime() - referenceTime.getTime()) / (1000*60*60*24)) % 14));
	appendCountDown("MATERIAL INSTANCE: Rewards x2", tempTime.toString().substr(4, 11) + suffix);
	//2x event 4
	referenceTime.setDate(referenceTime.getDate()+5);
	tempTime = new Date(servTime);
	tempTime.setDate(tempTime.getDate() + 14 - (parseInt((tempTime.getTime() - referenceTime.getTime()) / (1000*60*60*24)) % 14));
	appendCountDown("PET STAR UP: Skill Activation Chance x2", tempTime.toString().substr(4, 11) + suffix);
	//2x event 5
	referenceTime.setDate(referenceTime.getDate()+1);
	tempTime = new Date(servTime);
	tempTime.setDate(tempTime.getDate() + 14 - (parseInt((tempTime.getTime() - referenceTime.getTime()) / (1000*60*60*24)) % 14));
	appendCountDown("UNIQUE BOSS: Dropped Bond Items x2", tempTime.toString().substr(4, 11) + suffix);
	//2x event 6
	referenceTime.setDate(referenceTime.getDate()+1);
	tempTime = new Date(servTime);
	tempTime.setDate(tempTime.getDate() + 14 - (parseInt((tempTime.getTime() - referenceTime.getTime()) / (1000*60*60*24)) % 14));
	appendCountDown("EXP & GOLD TRIAL: Challenge or Wipe-out Rewards 2x", tempTime.toString().substr(4, 11) + suffix);
}
regularEventCountdown();