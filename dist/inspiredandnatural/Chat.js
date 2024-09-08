importScriptPage('ChatOptions/code.js', 'dev');

importScriptPage('MediaWiki:Chat.js/options.js','cod');

importScriptPage('ChatTags/code.js', 'dev');

//
/*
	the following script blocks certain works in certain conditions
*/
 
ChatStringsBlocker = {"count": 0};
$('textarea[name="message"]').on("keypress", function(e) {
	if (e.keyCode == 13) {
		var a = $('textarea[name="message"]').val().toLowerCase(),
			b = [
				"ass",
				"asses",
				"bitch",
				"bitches",
				"bitchy",
				"boob",
				"boobs",
				"cunt",
				"dick",
				"fuck",
				"fucker",
				"fucking",
				"motherfucker",
				"nigga",
				"niggas",
				"nigger",
				"niggers",
				"penis",
				"penises",
				"piss",
				"pussy",
				"shit",
				"shitty",
				"tits",
				"sex",
				"whore",
				"whores"
			],
			c = false; // prevent duplication if blocked word was detected already
		for (var i = 0; i < b.length; i++) { // loop through all words
			var d = b[i];
			if (
			(
			/* possibilities start */
				a == d ||                                                                      // whole message equals the word
				a.search(new RegExp(d + "[ ,\\.\\!\\?]")) == 0 ||                              // starts with the word
				a.search(new RegExp("[ ,\\.\\!\\?]" + d + "[ ,\\.\\!\\?]")) > -1 ||            // contains the word
				a.substr(a.length - d.length - 1).search(new RegExp("[ ,\\.\\!\\?]" + d)) > -1 // end with the word
			/* possibilities end */
			) && c === false
			) {
				var c = true;
				$('textarea[name="message"]').val("");
				ChatStringsBlocker.count++;
				if (ChatStringsBlocker.count < 2) {
					alert("Warning! You were caught using innapropriate language and your message has been blocked.");
				} else if (ChatStringsBlocker.count === 2) {
					alert("LAST WARNING!!!\nIt's the second time you were caught using inappropriate language. A third time would auotmatically kick you from the chat room!");
				} else if (ChatStringsBlocker.count === 3) {
					window.close(); // close on 3rd offense
				}
			}
		}
	}
});
 
//
//Switch to night button
var night_button = 'Switch to Night Chat';
 
//Switch to day button
var day_button = 'Switch to Day Chat';
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = '#CCA346';
 
  //All text Color
    var textColor = '#E0115F';
 
  //Self text background color
    var selfTextColor = 'none';
 
  //Chat background color
    var backgroundColor = 'none';
 
  //Chat foreground color
    var foregroundColor = 'none';
 
  //User stats foreground color
    var userStatsColor = 'none';
 
//END NIGHT Chat color scheme
 
//Day and night color schemes
//Written by Foodbandlt
 
 
function addNightStyle(){
var styleElement = document.createElement('style');
 
styleElement.setAttribute("id", "night");
styleElement.innerHTML='body{background-color: '+backgroundColor+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColor+';}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background-color: '+foregroundColor+';}.Chat .you{background: '+selfTextColor+';}a{color: '+linkColor+';}.UserStatsMenu .info{background-color:'+userStatsColor+';}';
$('head').append(styleElement);
} 
 
 
function addDayNightButton(){
 
$('<div class="day-night-div" onclick="switch_view()" style="margin: 10px auto; text-align: center; cursor: pointer;"><a class="day-night-button wikia-button">'+night_button+'</a></div>').prependTo('.Rail');
if ($('style#night').size() < 1 && $('style#nightUser').size() < 1){
addDayStyle();
}
}
 
function day_night(which){
if (which == "night"){
$('style#day').remove();
$('.Rail .day-night-div .day-night-button').text(day_button);
 
addNightStyle();
 
}else{
$('style#night').remove();
$('.Rail .day-night-div .day-night-button').text(night_button);
 
addDayStyle();
}
}
 
 
function switch_view(){
if ($('.Rail .day-night-div .day-night-button').text() == night_button){
day_night("night");
}else{
day_night("day");
}
}
 
 
if ($('.Rail .day-night-button').text() == ""){
addDayNightButton();
}
 
while ($('.Rail .day-night-div').size() > 1){
$('.WikiaPage .Rail div:last-child').remove()