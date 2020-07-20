
var tzdiff = (new Date().getTimezoneOffset() / 60) + 9;
var tzdiff_ms = tzdiff * 60 * 60 * 1000;
var maintenance_day = 4;
var maintenance_hour = 11;
var maintenance_duration = 4;

function get_maintenance_status(jptime) {
	if(jptime.getDay() == maintenance_day) {
		if(jptime.getHours() >= maintenance_hour) {
			if(jptime.getHours() < maintenance_hour + maintenance_duration) {
				return "ongoing";
			}else {
				return "finished";
			}
		}
	}
}

function get_maintenance_timestamp(jptime, maintenance_status) {
	var timestamp = new Date(jptime.getFullYear(),
		jptime.getMonth(),
		jptime.getDate() + (7 + maintenance_day - jptime.getDay()) % 7,
		maintenance_hour);
		
	if(maintenance_status === "ongoing") {
		timestamp.setHours(timestamp.getHours() + maintenance_duration);
	}else if(maintenance_status === "finished") {
		timestamp.setDate(timestamp.getDate() + 7);
	}

	target_date = timestamp;
	target_date.setHours(target_date.getHours() - tzdiff);
	
	return target_date;
}

function update_widget(widget, now, target_timestamp, maintenance_status) {
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
	
	if(maintenance_status === "ongoing") {
		widget_date.html("Maintenance ongoing")
			.addClass("maintenance_ongoing");
	}else {
		widget_date.removeClass("maintenance_ongoing");
	}
	
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
	var maintenance_status = get_maintenance_status(jptime);
	
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
		target_date = get_maintenance_timestamp(jptime, maintenance_status);
	} else {
		target_date = Date.parse(target);
	}
	
	var target_stamp = new Date(target_date.valueOf());
	update_widget(widget, now, target_stamp, maintenance_status);
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


function update_score_widget() {
	var numunits = $('#scorewidget_numunits').val();
	var up = $('#scorewidget_up').val();
	var score = Math.round(10000 * (2.5 - (0.1 * numunits)) * (7.5 - (0.02 * up)));
	$('#scorewidget_score').text(score);
}

function make_score_widget(widget) {
	var html = '<label for="scorewidget_numunits">Units</label><input id="scorewidget_numunits" type="number" min="0" max="15" default="0" /><label for="scorewidget_up">UP spent</label><input id="scorewidget_up" size="5" type="number" min="0" default="0" /><br/><label for="scorewidget_score">Score:</label><span id="scorewidget_score"></span>';

	widget.html(html);
	$("#scorewidget > input").on("change", update_score_widget);
}

function initialize_score_widget() {
    $("#scorewidget").each(function(index, widget) {
        make_score_widget($(widget));
    });
}


$(window).on("load", initialize_time_widget);
$(window).on("load", initialize_score_widget);