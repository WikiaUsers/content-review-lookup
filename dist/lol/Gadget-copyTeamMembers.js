function getTextManual(thisObj) {
	var td = thisObj.closest("td");
	if ($(td).find("a").text()) {
		var text = decodeURI($(td).find("a").attr("href").replace("/wiki/", "").replaceAll("_", " "));
	} else {
		var text = $(td).text().replace("\n", "");
	}
	return text
}

function getTextAuto(thisObj) {
	var td = thisObj.closest("td");
	if ($(td).attr("data-player-id")) {
		var text = $(td).attr("data-player-id");
	} else {
		var text = $(td).text();
	}
	return text
}

function updateClipboard(text, thisObj) {
	navigator.clipboard.writeText(text);
	$(thisObj).css('color','green');
	setTimeout(function() {
		$('.copy-content').css('color','');
	}, 2000);
}

function copyText() {
	if ($(this).hasClass("copy-content-auto")) {
		var text = getTextAuto($(this));
	} else if ($(this).hasClass("copy-content-manual")) {
		var text = getTextManual($(this));
	}
	updateClipboard(text, $(this));
}

function determineSubAuto(tr) {
	if ($(tr).find("span.role-sprite:first").hasClass("sub")) {
		var isSub = "yes"
	} else {
		var isSub = "no"
	}
	return isSub
}

function getRoleAuto(tr) {
	return $(tr).find("span.role-sprite:first").attr("title");
}

function copyTemplateAuto(thisObj) {
	var tr = thisObj.closest("tr");
	var nickname = getTextAuto(thisObj);
	var role = getRoleAuto(tr);
	var isSub = determineSubAuto(tr);
	var text = "{{RCPlayer|player=" + nickname + " |role=" + role + " |sub=" + isSub + " |status= }}"
	updateClipboard(text, thisObj);
}

function getRoleManual(tr) {
	return $(tr).find("td:eq(3) > b").text();
}

function copyTemplateManual(thisObj) {
	var tr = thisObj.closest("tr");
	var nickname = getTextManual(thisObj);
	var role = getRoleManual(tr);
	var text = "{{RCPlayer|player=" + nickname + " |role=" + role + " |status= }}"
	updateClipboard(text, thisObj);
}

function copyTemplate() {
	if ($(this).hasClass("copy-content-auto")) {
		copyTemplateAuto($(this))
	} else if ($(this).hasClass("copy-content-manual")) {
		copyTemplateManual($(this))
	}
}

$(document).ready(function() {
	var copyTextEl = $(document.createElement('div')).attr({"class": "copy-content copy-content-text", "title": "Copy Text"});
	var copyTemplateEl = $(document.createElement('div')).attr({"class": "copy-content copy-content-template", "title": 'Copy As RCPlayer Template'});
	$("td.team-members-player").append($(copyTextEl).clone().addClass("copy-content-auto"));
	$("td.team-members-player").append($(copyTemplateEl).clone().addClass("copy-content-auto"));
	$("td.team-members-irlname").each(function() {
		if ($(this).text() != "") {
			$(this).append($(copyTextEl).clone().addClass("copy-content-auto"));
		}
	});

	$(".listplayer-table tr td:nth-child(2)").each(function() {
		if (($(this).children().length > 0 || $(this).text().replace("\n", "") !== "") && ($(this).find("span.country-sprite").length === 0)) {
			$(this).append($(copyTextEl).addClass("copy-content-manual").clone());
			$(this).append($(copyTemplateEl).addClass("copy-content-manual").clone());
		}
	});

	$(".listplayer-table tr td:nth-child(3)").each(function() {
		if ($(this).text().replace("\n", "") !== "") {
			$(this).append($(copyTextEl).addClass("copy-content-manual").clone());
		}
	});

	$('.copy-content-text').click(copyText);
	$('.copy-content-template').click(copyTemplate);
});