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

;(function (module, mw, $, undefined) {
 
	'use strict';
 
	var translations = $.extend(true, {
		// English (English)
		en: {
			and: 'and',
			second: 'second',
			seconds: 'seconds',
			minute: 'minute',
			minutes: 'minutes',
			hour: 'hour',
			hours: 'hours',
			day: 'day',
			days: 'days'
		}
	}, module.translations || {}),
	i18n = translations[
		mw.config.get('wgContentLanguage')
	] || translations.en;
 
	var countdowns = [];
 
	var NO_LEADING_ZEROS = 1,
	SHORT_FORMAT = 2,
	NO_ZEROS = 4;
 
	function output (i, diff) {
		/*jshint bitwise:false*/
		var delta, result, parts = [];
		delta = diff % 60;
		result = ' ' + i18n[delta === 1 ? 'second' : 'seconds'];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 60;
		result = ' ' + i18n[delta === 1 ? 'minute' : 'minutes'];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 60);
		delta = diff % 24;
		result = ' ' + i18n[delta === 1 ? 'hour'   : 'hours'  ];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(delta + result);
		diff = Math.floor(diff / 24);
		result = ' ' + i18n[diff  === 1 ? 'day'    : 'days'   ];
		if (countdowns[i].opts & SHORT_FORMAT) result = result.charAt(1);
		parts.unshift(diff  + result);
		result = parts.pop();
		if (countdowns[i].opts & NO_LEADING_ZEROS) {
			while (parts.length && parts[0][0] === '0') {
				parts.shift();
			}
		}
		if (countdowns[i].opts & NO_ZEROS) {
			parts = parts.filter(function(part) {
				return part[0] !== '0';
			});
		}
		if (parts.length) {
			if (countdowns[i].opts & SHORT_FORMAT) {
				result = parts.join(' ') + ' ' + result;
			} else {
				result = parts.join(', ') + ' ' + i18n.and + ' ' + result;
			}
		}
		countdowns[i].node.text(result);
	}
 
	function end(i) {
		var c = countdowns[i].node.parent();
		switch (c.attr('data-end')) {
		case 'remove':
			c.remove();
			return true;
		case 'stop':
			output(i, 0);
			return true;
		case 'toggle':
			var toggle = c.attr('data-toggle');
			if (toggle && toggle === 'next') {
				c.next().css('display', 'inline');
				c.css('display', 'none');
				return true;
			}
			if (toggle && $(toggle).length) {
				$(toggle).css('display', 'inline');
				c.css('display', 'none');
				return true;
			}
			break;
		case 'callback':
			var callback = c.attr('data-callback');
			if (callback && $.isFunction(module[callback])) {
				output(i, 0);
				module[callback].call(c);
				return true;
			}
			break;
		}
		countdowns[i].countup = true;
		output(i, 0);
		return false;
	}
 
	function update () {
		var now = Date.now();
		var countdownsToRemove = [];
		$.each(countdowns.slice(0), function (i, countdown) {
			var diff = Math.floor((countdown.date - now) / 1000);
			if (diff <= 0 && !countdown.countup) {
				if (end(i)) countdownsToRemove.push(i);
			} else {
				output(i, Math.abs(diff));
			}
		});
		var x;
		while((x = countdownsToRemove.pop()) !== undefined) {
			countdowns.splice(x, 1);
		}
		if (countdowns.length) {
			window.setTimeout(function () {
				update();
			}, 1000);
		}
	}
 
	function getOptions (node) {
		/*jshint bitwise:false*/
		var text = node.parent().attr('data-options'),
			opts = 0;
		if (text) {
			if (/no-leading-zeros/.test(text)) {
				opts |= NO_LEADING_ZEROS;
			}
			if (/short-format/.test(text)) {
				opts |= SHORT_FORMAT;
			}
			if (/no-zeros/.test(text)) {
				opts |= NO_ZEROS;
			}
		}
		return opts;
	}
 
	function init() {
		var countdown = $('.countdown:not(.handled)');
		if (!countdown.length) return;
		$('.nocountdown').css('display', 'none');
		countdown
		.css('display', 'inline')
		.find('.countdowndate')
		.each(function () {
			var $this = $(this),
				date = (new Date($this.text())).valueOf();
			if (isNaN(date)) {
				$this.text('BAD DATE');
				return;
			}
			countdowns.push({
				node: $this,
				opts: getOptions($this),
				date: date,
			});
		});
		countdown.addClass('handled');
		if (countdowns.length) {
			update();
		}
	}
 
	mw.hook('wikipage.content').add(init);
 
}(window.countdownTimer = window.countdownTimer || {}, mediaWiki, jQuery));