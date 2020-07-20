/* Any JavaScript here will be loaded for all users on every page load. */

/* Daily Missions Timer */
$(function($) {
	// UTC+9 is JP time
	var jpOffset = 9 * 1000 * 60 * 60;
	function getNow() {
		return new Date(new Date().getTime() + jpOffset);
	}

	function renderWeek(el, now) {
		el.children().hide();
		el.children('[data-day="'+now.getUTCDay()+'"]').show();
	}
	
	var dayMs = 24*60*60*1000;
	function renderCycle(el, now) {
		var elapsed = new Date().getTime() - new Date(el.attr("data-start")).getTime();
		var elapsedDays = Math.floor(elapsed / dayMs);
		var maxDay = Math.max.apply(null, el.children().map(function() { return +$(this).attr("data-day"); }));
		var curDay = (elapsedDays % maxDay) + 1;
		el.children().hide();
		el.children('[data-day="'+curDay+'"]').show();
	}
	
	function updateTimer() {
		var now = getNow();
		var ts = dayMs - now.getTime() % dayMs;
		$(".daytimer .timer").text(new Date(ts).toISOString().substr(11,8));
		$(".daytimer:hidden").each(updateEl);
	}
	
	function updateEl() {
		var now = getNow();
		var el = $(this);
		el.children(".row").each(function() {
			var c = $(this);
			switch(c.attr("data-type")) {
				case "week": return renderWeek(c, now);
				case "cycle": return renderCycle(c, now);
				default: c.hide();
			}
		});
		el.show();
	}
	function update() {
		$(".daytimer").each(updateEl);
	}
	setInterval(updateTimer, 1000);
	setInterval(update, 60000);
});
/* End - Daily Missions Timer */

/* Daywidget */
var day_map = {
	0: "sunday",
	1: "monday",
	2: "tuesday",
	3: "wednesday",
	4: "thursday",
	5: "friday",
	6: "saturday",
};

function update_week_widget(widget) {
	// UTC+9 is JP time
	var tzdiff = (new Date().getTimezoneOffset() / 60) + 9;
	var tzdiff_ms = tzdiff * 1000 * 60 * 60;
	var now = new Date(new Date().valueOf() + tzdiff_ms);
	
	var num_days = $(widget).attr("data-numdays") || 1;
	var display = $(widget).find(".display").empty();
	
	var revival_list = widget.find(".daily_revivals");
	var dailies_list = widget.find(".days");
	var num_revivals = revival_list.children().length;
	
	var revival_start = new Date(revival_list.attr("data-start"));
	var ms_since_cycle_start = Date.now() - revival_start;
	var days_since_cycle_start = Math.floor(ms_since_cycle_start / 1000 / 60 / 60 / 24);
	var current_day = now.getDay();
	
	for(var i = 0; i < num_days; i++) {
		var day = (current_day + i) % 7;
		var revival_index = 1 + ((days_since_cycle_start + i + num_revivals) % num_revivals);
		
		var filter1 = ".day[data-value=" + day_map[day] + "]";
		var filter2 = ".entry[data-value=" + revival_index + "]";
		
		var dailies = dailies_list.find(filter1).clone();
		var revival = revival_list.find(filter2).clone();
		var header = $("<div>").text(day_map[day]).addClass("header");
		
		var day_div = $("<div>")
			.append(header)
			.append(dailies.clone())
			.append(revival.clone())
			.appendTo(display);
	}
	
	display.children().first().addClass("today");
}

function initialize_week_widget() {
	var update = function() {
		$(".weekwidget").each(function(index, widget) {
			update_week_widget($(widget));
		});
	};
	
	setInterval(update, 60 * 1000);
	update();
}


$(window).load(initialize_week_widget);
/* End daywidget */