/*
	the following script allows users to toggle the chat rail
	to keep functionality, users will be notified when they have unread
	messages in pm or main room, if the rail is in its toggled state
	(also thanks for Apj26 for tolerating my ridiculous, repeating "apj-say-something-in-pm-apj-say-something-in-main-chat" demands to test this script)
*/

$(function() {
	/* main variables */
	var svgUrl = [true, false].map(function(a) {
			return "url('data:image/svg+xml," + encodeURI('<svg width="6" height="8" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="' + (a ? "M 1 1 L 5 4 L 1 7 z" : "M 5 1 L 1 4 L 5 7 z" ) + '" fill="#fff" stroke="#333" stroke-linejoin="round" stroke-linecap="round" /></svg>') + "')";
		}),
		btnWidth = 7,
		btnBorder = 1,
		storageState = localStorage.getItem("chat-hiderail");
	storageState = storageState ? JSON.parse(storageState) : {};

	/* css */
	mw.util.addCSS(
		'#hiderail-btn {\n' +
			'\twidth: ' + btnWidth + 'px;\n' +
			'\theight: 100%;\n' +
			'\tposition: absolute;\n' +
			'\ttop: 0;\n' +
			'\tright: ' + (150 - btnWidth - btnBorder) + 'px;\n' +
			'\tbackground-position: 1px center, 0 0;\n' +
			'\tbackground-repeat: no-repeat;\n' +
			'\tborder-right: ' + btnBorder + 'px solid #035379;\n' +
			'\tcursor: pointer;\n' +
		'}\n' +
		'#hiderail-btn:hover {\n' +
			'\tbox-shadow: ' + btnWidth + 'px 0 0 rgba(255, 255, 255, 0.3) inset;\n' +
		'}\n' +
		'#hiderail-btn.hiderail-btn-hide {\n' +
			'\tbackground-image: ' + svgUrl[0] + ', linear-gradient(to right, #05c, #39f);\n' +
		'}\n' +
		'#hiderail-btn.hiderail-btn-show {\n' +
			'\tbackground-image: ' + svgUrl[1] + ', linear-gradient(to right, #05c, #39f);\n' +
		'}\n' +
		'#hiderail-notifications {\n' +
			'\tdisplay: none;\n' +
			'\twidth: 18px;\n' +
			'\theight: 28px;\n' +
			'\tposition: absolute;\n' +
			'\ttop: -28px;\n' +
			'\tright: -' + (btnWidth / 2) + 'px;\n' +
			'\tz-index: 1;\n' +
			'\tbackground-image: url(\'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Stock-dialog-warning.svg/18px-Stock-dialog-warning.svg.png\'), url(\'https://upload.wikimedia.org/wikipedia/commons/8/80/Vector_skin_action_arrow.png\');\n' +
			'\tbackground-position: center top, center bottom;\n' +
			'\tbackground-repeat: no-repeat;\n' +
			'\tfilter: drop-shadow(0 0 5px #0c0);\n' +
		'}\n' +
		'body.hiderail #hiderail-notifications.hiderail-notifications-unread {\n' +
			'\tdisplay: inline-block;\n' +
		'}\n' +
		'#Rail {\n' +
			'\twidth: ' + (150 - btnWidth + btnBorder) + 'px;\n' +
		'}\n' +
		'body.hiderail #hiderail-btn {\n' +
			'\tright: 0;\n' +
		'}\n' +
		'body.hiderail #Rail {\n' +
			'\twidth: 0;\n' +
		'}\n' +
		'body.hiderail #Write {\n' +
			'\tpadding-left: 50px;\n' +
			'\tright: ' + (btnWidth + btnBorder) + 'px;\n' +
		'}\n' +
		'body.hiderail .Chat {\n' +
			'\tright: ' + (btnWidth + btnBorder) + 'px;\n' +
		'}\n' +
		'body.hiderail #Write > img {\n' +
			'\tleft: 0;\n' +
		'}\n' +
		'#Rail, #Write, .Chat, body.hiderail #Write > img, #hiderail-btn {\n' +
			'\ttransition: 300ms;\n' +
		'}'
	);

	/* toggle function */
	function toggleRailToState(isNewStateCollapsed) {
		isNewStateCollapsed = Boolean(isNewStateCollapsed);
		localStorage.setItem("chat-hiderail", JSON.stringify({isCollapsed: isNewStateCollapsed}));
		var btn = $("#hiderail-btn");
		$(btn).data("isCollapsed", isNewStateCollapsed);
		if (isNewStateCollapsed) {
			$(btn).addClass("hiderail-btn-show").removeClass("hiderail-btn-hide");
			$("body").addClass("hiderail");
		} else {
			$(btn).addClass("hiderail-btn-hide").removeClass("hiderail-btn-show");
			$("body").removeClass("hiderail");
		}
	}

	/* insert markup */

	// show-hide bar button
	$('<div id="hiderail-btn" class="hiderail-btn-hide" />').data({
		isCollapsed: false
	}).click(function() {
		toggleRailToState(!$(this).data("isCollapsed"));
	}).insertAfter("#Rail");

	// unread messages notification
	$("#WikiaPage").prepend('<span id="hiderail-notifications" />');

	/* get last state */
	if (typeof storageState.isCollapsed === "boolean") {
		toggleRailToState(storageState.isCollapsed);
	}

	/* notification alert */
	setInterval(function() {
		var notice = $("#hiderail-notifications");
		if ($("#Rail .unread").length > 0) {
			$(notice).addClass("hiderail-notifications-unread");
		} else {
			$(notice).removeClass("hiderail-notifications-unread");
		}
	}, 500);
});