/* Any JavaScript here will be loaded for all users on every page load. */

                    /*TIME FUNCTIONS (Shiny)*/
function gettime() {
  //Grab the local users system time
  var rawtime = new Date();
 
  //Add the difference to UTC, then add another 9 hours to that to get JST (UTC+9:00)
  jptime = new Date(rawtime.getTime()+(rawtime.getTimezoneOffset()*60*1000)+(32400000));
 
  //Get seconds, minutes and hours, add a 0 infront of them and set the last 2 numbers as a variable.
  var seconds = ('0'+(59-jptime.getSeconds()))	.slice(-2);
  var minutes = ('0'+(59-jptime.getMinutes()))	.slice(-2);
  var hours   = ('0'+(23-jptime.getHours	())).slice(-2);
 
  //Add the hours, minutes, seconds and seperators together to form the countdown to next day in JST.
  var timer = hours+':'+minutes+':'+seconds;
 
  //Show timer on all divs with the class of "timer"
	$(".DailyCountdown").text(timer);
}
 
function getday(){
  //get the current day, hide all divs whose parent div have the class of "day", then
  //show the divs whose parents class is "day" and their own class is the current day.
	var currentday = '.Day .'+jptime.getDay();
    $(".Day").children().hide();
    $(currentday).show();
 
    //Needs to start after the timer...
}
function countdown(){
  //finds every div with the "Countdown" class
  $(".Countdown").each(function(){
 
  	//Finds the "Date" attribute and converts it into a time, then subtracts JST from it and makes that the final time.
    var target = $(this).attr("data-date");
    target = new Date(target);
    target = (target-jptime)+(1*1000*60*60); //Adds 2 hours to time, because of issues and stuff.
 
    //Converts the new time into a human readable format. Adds 0's to 0-9 for consistency.
    var days 	= 	   Math.floor(	target / (1000 * 60 * 60 * 24));
    var hours 	= ('0'+Math.floor((	target % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))	.slice(-2);
    var minutes = ('0'+Math.floor((	target % (1000 * 60 * 60)) 			/ (1000 * 60)))		.slice(-2);
    var seconds = ('0'+Math.floor((	target % (1000 * 60)) 					/ 1000))		.slice(-2);
 
    //Combines the days, hours, minutes and seconds then sets them as the div text.
    target = days+'d '+hours+':'+minutes+':'+seconds;
    $(this).text(target);
  });
}
 
$(function(){
  //Basically for faster startup. Loads "gettime" first since the others need one of its global variables.
  setTimeout(gettime, 1);
  setTimeout(getday, 500); 
  setTimeout(countdown, 500);
 
  //Refresh the time widgets every 1-10 seconds, depending on script.
  setInterval(gettime, 1000);
  setInterval(countdown, 1000);
  setInterval(getday, 10000);
});

var tzdiff = (new Date().getTimezoneOffset() / 60) + 9;
var tzdiff_ms = tzdiff * 60 * 60 * 1000;
var maintenance_day = 4;
var maintenance_hour = 11;
var maintenance_duration = 4;


function get_maintenance_timestamp(jptime) {
	var timestamp = new Date(jptime.getFullYear(),
		jptime.getMonth(),
		jptime.getDate() + (7 + maintenance_day - jptime.getDay()) % 7,
		maintenance_hour);
		
	timestamp.setDate(timestamp.getDate() + 7);

	target_date = timestamp;
	target_date.setHours(target_date.getHours() - tzdiff);
	
	return target_date;
}

function update_widget(widget, now, target_timestamp) {
	var widget_date = widget.find(".date").first();
	var widget_body = widget.find(".body").first();
	var vanish_when_done = widget.attr("data-vanish") === "true";

	widget_date.html(target_timestamp.toLocaleString([], {
		timeZone: "Asia/Tokyo",
		hour12: false,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short"
	}));
	
	widget_date.removeClass("maintenance_ongoing");
	
	var ms_til_target = target_timestamp - now;
	var diff_seconds = ('0' + Math.floor(ms_til_target / 1000) % 60			   ).slice(-2);
	var diff_minutes = ('0' + Math.floor(ms_til_target / 1000  / 60) % 60	   ).slice(-2);
	var diff_hours	 = ('0' + Math.floor(ms_til_target / 1000  / 60	 / 60) % 24).slice(-2);
	var diff_days	 =		  Math.floor(ms_til_target / 1000  / 60	 / 60  / 24);
	
	if(ms_til_target < 0) {
		if(vanish_when_done) {
			widget.parent().remove();
		} else {
			widget_body.empty()
				.html(widget.attr("data-end") || "Event finished");
		}
	}else {
		widget_body.empty()
			.html(diff_days + ":" + diff_hours + ":" + diff_minutes + ":" + diff_seconds);
	}

}

function do_countdown(widget) {
	var now = new Date();
	var jptime = new Date(now.valueOf() + tzdiff_ms);
	
	var start = widget.attr("data-start");
	var target = widget.attr("data-target");
	var start_date;
	var target_date;
	
	var is_maintenance_countdown = (widget.attr("data-auto") === "true");
	
	if(start !== undefined) {
		start_date = Date.parse(start);
		if(now < start_date) {
			widget.addClass("timewidget-hidden");
			$(widget).siblings().addClass("timewidget-hidden");
			return;
		}else {
			widget.removeClass("timewidget-hidden");
			$(widget).siblings().removeClass("timewidget-hidden");
		}
	}
	
	if(is_maintenance_countdown) {
		target_date = get_maintenance_timestamp(jptime);
	} else {
		target_date = Date.parse(target);
	}
	
	var target_stamp = new Date(target_date.valueOf());
	update_widget(widget, now, target_stamp);
}

function initialize_time_widget() {
	
	var update = function() {
		$(".timewidget").each(function(index, widget) {
			do_countdown($(widget));
		});
		
		setTimeout(update, 1000);
	};
	
	update();
}

$(window).on("load", initialize_time_widget);