/*
	hide the 2014 version for the oasis navbar when unused
	@author Penguin-Pal
*/
$(function() {
	/* initially - remove the inline styling of the navbar */
	$("#globalNavigation").removeAttr("style");
	/* core object */
	var tnt = window.topnavtoggle || {};
	tnt.text = tnt.text || {};
	tnt.duration = typeof tnt.duration === "string" ? ($.isArray(tnt.duration.match(/^\d+(?:\.\d+)?m?s$/)) ? tnt.duration : "500ms") : "500ms";
	/* css */
	mw.util.addCSS(
        '#novasis-label {' +
            '\ttop: ' + $("#globalNavigation").height() + 'px;\n' +
            '\ttransition-duration: ' + tnt.duration + '\n' +
        '}'
    );
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:Novasis14.css'
    });

	/* functions */
	// check if there's need to collapse or expand the nav
	function scrollCheck() {
		var a = $(window).scrollTop(),
			b = $("#globalNavigation").height();
		if (a <= b) {
			// scrolled back to top - show nav
			$("#globalNavigation").removeClass("novasis-navbar-closed");
		} else {
			// scrolled enough to the bottom - hide nav
			$("#globalNavigation").addClass("novasis-navbar-closed");
		}
	}

	// force or unforce nav display
	function togglePin(scrollTop) {
		localStorage.topnavtoggle = localStorage.topnavtoggle == "false" ? "true" : "false";
		$("#globalNavigation").toggleClass("novasis-navbar-forced");
	}

	// update notifications icon
	function updateNotifications() {
		var notifications = Number(document.querySelector("#notificationsEntryPoint .notifications-count").innerHTML);
		if ($.isNumeric(notifications)) {
			if (notifications > 0) {
				// add
				$("#novasis-unread").addClass("novasis-unread-has");
			} else {
				// remove
				$("#novasis-unread").removeClass("novasis-unread-has");
			}
		}
	}

	/* observe notifications */
	var notificationsObserver = new MutationObserver(function() {
		updateNotifications();
	});
	notificationsObserver.observe(document.querySelector("#notificationsEntryPoint .notifications-count"), {
		childList: true,
		attributes: false
	});
	updateNotifications();

	// simulate mouse over to load notifications
	if (tnt.msgcheck > 0) {
		setInterval(function() {
			$("#notifications").trigger("mouseover");
		}, $.isNumeric(tnt.msgcheck) ? tnt.msgcheck * 1000 : 30000);
	}

	/* check scrolling distance for 'scrollCheck' function */
	$(window).scroll(function() {
		scrollCheck();
	});

	/* pin navigation based on localStorage */
	if (localStorage.topnavtoggle != "false") {
		$("#globalNavigation").addClass("novasis-navbar-forced");
	}

	/* insert interface */
	var label = $('<div id="novasis-label" />'),
		btn = $('<span id="novasis-button" />').attr("title", tnt.text.pin ? tnt.text.pin : "Force navigation display"),
		msg = $('<span id="novasis-unread" class="topnav-toggle-unread-has" />').attr("title", tnt.text.unread ? tnt.text.unread : "You have unread messages");
	$(btn).click(function() {
		togglePin();
	});
	$(label).append(btn, msg).appendTo("#globalNavigation");

	// also check for notifications and check scrolling state
	updateNotifications();
	scrollCheck();

	/* show navbar when typing (if not pinned but the search field was marked at the top of the page) */
	$("#searchInput").keydown(function() {
		if (!$("#globalNavigation").hasClass("novasis-navbar-forced")) {
			togglePin();
		}
	});
});