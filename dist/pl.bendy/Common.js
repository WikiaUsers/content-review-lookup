//Skrypt na nazwę użytkownika
if (wgUserName !== null) {$(".insertusername").html(wgUserName);}

//Custom MW:DailyCountdownEvent.js
var DCE_EventUTCHour = [12, 14, 18];
var DCE_prePostMessages = [
	['Nowa litera na Instagramie za:<br>', ''],
	['Nowa litera już jest na Instagramie! <a href="https://www.instagram.com/batimgame/">Sprawdź!</a><br>Ta sama litera pojawi się na Twitterze Bendy\'ego za:<br>', ''],
	['Nowa litera już jest na Twitterze Bendy\'ego! <a href="https://twitter.com/BATIMgame">Sprawdź!</a><br>Ta sama litera pojawi się na Twitterze Joey Drew Studios za:<br>', ''],
	['Nowa litera już jest na Twitterze Joey Drew Studios! <a href="https://twitter.com/JoeyDrewSTU">Sprawdź!</a><br>Nowa litera na Instagramie za:<br>', ''],
	['Nowa litera na Instagramie za:<br>', '']
];

//Custom MW:WeeklyCountdownEvent.js
var WCE_EventUTCHour = 15;
var WCE_prePostMessages = [
	['Nowa kaseta na kanale <a href="https://www.youtube.com/JoeyDrewStudios">Joey Drew Studios</a> za:<br>', ''],
	['Nowa kaseta już na kanale <a href="https://www.youtube.com/JoeyDrewStudios">Joey Drew Studios</a>!<br>Nowa kaseta za:<br>', '']
];
var WCE_WeekDay = 1;
//1 - Monday; 2 - Tuesday; 3 - Wednesday; 4 - Thursday; 5 - Friday; 6 - Saturday; 7 - Sunday;