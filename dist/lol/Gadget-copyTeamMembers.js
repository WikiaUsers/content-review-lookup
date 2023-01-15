function getTextManual(thisObj) {
	if (thisObj.parent("a").text()) {
		var text = thisObj.parent("a").text().replace("\n", "");
	} else {
		var text = thisObj.parent().text().replace("\n", "");
	}
	return text
}

function getTextAuto(thisObj) {
	if (thisObj.parent().attr("data-player-id")) {
		var text = thisObj.parent().attr("data-player-id");
	} else {
		var text = thisObj.parent().text();
	}
	return text
}

function copyText() {
	console.log("lol");
	if ($(this).hasClass("copy-content-auto")) {
		var text = getTextAuto($(this));
	} else if ($(this).hasClass("copy-content-manual")) {
		var text = getTextManual($(this));
	}
	console.log(text);
	navigator.clipboard.writeText(text);
	$(this).css('color','green');
	setTimeout(function() {
		$('.copy-content').css('color','');
	}, 2000);
}

$(document).ready(function() {
	var el = document.createElement('div');
	$(el).attr({'class': 'copy-content copy-content-auto', "title": "Copy Text"});
	$("td.team-members-player").append(el);
	$("td.team-members-irlname").each(function() {
		if ($(this).text() != "") {
			$(this).append($(el).clone());
		}
	});

	var el = document.createElement('div');
	$(el).attr({'class': 'copy-content copy-content-manual', "title": "Copy Text"});
	$(".listplayer-table tr td:nth-child(2)").each(function() {
		if ($(this).children().length > 0 || $(this).text().replace("\n", "") !== "") {
			$(this).append($(el).clone());
		}
	});

	$('.copy-content').on("click", copyText);
});