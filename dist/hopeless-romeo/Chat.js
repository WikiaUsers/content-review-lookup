var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:Chat.js/options.js');
} //originates from the CallOfDuty.wikia.com/Mediawiki:chat.js/options.js

importScriptPage('MediaWiki:Chat.js/chatUserClasses.js');
importStylesheet("MediaWiki:Chats.css");
importScriptPage("MediaWiki:Chat.js/rate.js");//originaly by creepypasta.wikia.com/wiki/
importScriptPage("MediaWiki:Chat.js/title.js");//And another that originated from Creepypasta.wikia.com/wiki/

setInterval(function() {
    $('#Rail .User.chat-mod:not(.admin) .username').each(function() {
        if (!this.innerHTML.match(/kingemocut|Palkia the dragon|Eevee lover123|Puppy1/)) {
            $(this).parent().addClass('admin');
        }
    });
}, 1000)


/*

$('.User.chat-mod[data-user="Jeff Leffler"].username').removeClass('admin');

//Originally By: http://creepypasta.wikia.com/wiki/User:Benjaminthewill123123
 
if (wgUserGroups.indexOf('sysop')!=-1) //checks that the user is the sysop
{
    $('<a id= "BlockUserButton" class="wikia-button" href="javascript:BlockUser()" style="position:absolute; right:55px; top:22px;">Block</a>').appendTo('.Write'); //create button the block the user
 
function BlockUser() 
{
    var toBlock = prompt('Please state the user to block');
    var blockExpiry = prompt('Please state the block duration','3 Days');
    var blockReason = prompt('Please state the block reason','Socking');
    var url = wgServer+'/api.php?action=query&prop=info&intoken=block&titles=User:'+toBlock+'&format=json';
    $.getJSON(url, function(data) 
    {
        if (!blockExpiry || !blockReason) return;
        var p; for (var p in data.query.pages) { break; };
        var ET = data.query.pages[p].blocktoken;
        var ET = ET.slice(0, -2);
        var ET = ET+'%2B\\';
        var url = wgServer+'/api.php?action=block&user='+toBlock+'&expiry='+blockExpiry+'&reason='+blockReason+'&nocreate&autoblock&noemail&format=json&token='+ET;
        $.post(url, function() 
        {
            inlineAlert(toBlock+'has been blocked.');
        });
    });
  }
}

//Extra commands by Benjaminthewill123123

var lastMessage = '';
$(function() {
	$('[name="message"]').keypress(function(e) {
		if (e.which == 32 || e.which == 13) {
			switch (this.value) {
			case '/coppa': this.value = 'http://coppa.org - You must be 13 or older to legally have an account on Wikia.'; break;
			case '/srule': this.value = 'http://hopeless-romeo.wikia.com/wiki/Site_Rules';break;
			case '/emote': this.value = 'http://hopeless-romeo.wikia.com/wiki/MediaWiki:Emoticons';break;
			case '/crule': this.value = 'http://hopeless-romeo.wikia.com/wiki/Chat_Rules';break;
                        case '/page':  this.valuse =
'http://hopeless-romeo.wikia.com/wiki/Special:Createpage';break;
			}
		}
		if (e.which == 13) {
			if (this.value.split(' ')[0] == '/grouphug') {
				var args = $('[name="message"]').val().replace('/grouphug ','').split(' ');
				$('[name="message"]').val('* '+wgUserName+' grouphuggles '+args.slice(0,args.length-1).join(', ') + ' and '+args[args.length-1]+'.');
			} else {
				switch (this.value) {
				case '/clear': this.value = ''; $('.Chat[style*="block"] ul, .Chat[style=""] ul').html('<li class="inline-alert">Window cleared</li>');break;
				}
				lastMessage = this.value;
			}
		}
	}).keydown(function(e) {
		if (e.which == 38 && this.value == '') {
			this.value = lastMessage;
			$(this).select();
		}
	});
})
*/




//current test to edit
//Switch to night button
var night_button = "Stalker vision activate";
 
//Switch to day button
 
var day_button = 'Show your true colors';
 
 
 
//
//Color scheme for NIGHT Chat
//
  //Link color
    var linkColor = '#94E1FB';
 
  //All text Color
    var textColor = '#f0f0f0';
 
  //Self text background color
    var selfTextColor = '#0f0f0f';
 
  //Chat background color
    var backgroundColor = '#000000';
 
  //Chat foreground color
    var foregroundColor = '#6265BB';
 
  //User stats foreground color
    var userStatsColor = '#0f50B0';
 
//END NIGHT Chat color scheme
 
// Change mod icons depending on the time 
// Written by Foodbandlt
 
function nighttime_moon(){
 var night = new Date();
 var nighthour=night.getHours();
 
 if (nighthour >= 19 || nighthour <= 7){
  if ($('.User.chat-mod .username').hasClass("modday")){
  $(".User.chat-mod .username").removeClass("modday");
  $(".User.chat-mod .username").addClass("modnight");
  }else{
  $(".User.chat-mod .username").addClass("modnight");
  }
 }else{
  if ($('.User.chat-mod .username').hasClass("modnight")){
  $(".User.chat-mod .username").removeClass("modnight");
  $(".User.chat-mod .username").addClass("modday");
  }else{
  $(".User.chat-mod .username").addClass("modday");
  }
 }
 
setTimeout("nighttime_moon()", 10*60*1000);
}
nighttime_moon();
 
//Day and night color schemes
//Written by Foodbandlt
 
function addDayStyle(){
var styleElementDay = document.createElement('style');
 
styleElementDay.setAttribute("id", "day");
styleElementDay.innerHTML='body{background: '+backgroundColorDay+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColorDay+';}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background: '+foregroundColorDay+';}.Chat .you{background: '+selfTextColorDay+';}a{color: '+linkColorDay+';}.UserStatsMenu .info{background:'+userStatsColorDay+';}';
$('head').append(styleElementDay);
}
 
 
function addNightStyle(){
var styleElement = document.createElement('style');
 
styleElement.setAttribute("id", "night");
styleElement.innerHTML='body{background: '+backgroundColor+';}.username, .message, div.chattopic, .info .edits, .UserStatsMenu .info .since, #ChatHeader h1.private, .Write [name="message"]{color: '+textColor+';}.WikiaPage, .UserStatsMenu, .ChatHeader, .Write [name="message"]{background: '+foregroundColor+';}.Chat .you{background: '+selfTextColor+';}a{color: '+linkColor+';}.UserStatsMenu .info{background:'+userStatsColor+';}';
$('head').append(styleElement);
} 
 
 
function addDayNightButton(){
 
 if ($('.day-night-div').size() == 0){
 $('<div class="day-night-div" onclick="switch_view()"><a class="day-night-button wikia-button">'+night_button+'</a></div>').prependTo('.Rail');
 }
 
 if ($('style#night').size() == 0 && $('style#nightUser').size() == 0){
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
 
 
if ($('.Rail .day-night-div').size() == 0){
addDayNightButton();
}