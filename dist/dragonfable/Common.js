/* Any JavaScript here will be loaded for all users on every page load. */
// [[Template:ajax]]
function addAjaxDisplayLink() {
	$("table.ajax").each(function (i) {
		var table = $(this).attr("id", "ajaxTable" + i);
		table.find(".nojs-message").remove();
		var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
		var cell = table.find("td").first(), needLink = true;
		cell.parent().show();
		if (cell.hasClass("showLinkHere")) {
			var old = cell.html(), rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
			if (rep != old) {
				cell.html(rep);
				needLink = false;
			}
		}
		if (needLink) headerLinks.html('[<a href="javascript:;" class="ajax-load-link">show data</a>]');
		table.find(".ajax-load-link").parent().addBack().filter('a').click(function(event) {
			event.preventDefault();
			var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
			cell.text('Please wait, the content is being loaded...');
			$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
				if (data) {
					cell.html(data);
					cell.find('.ajaxHide').remove();
					cell.find('.darktable').removeClass('darktable');
					if (cell.find("table.sortable").length) {
						mw.loader.using('jquery.tablesorter', function() {
							cell.find("table.sortable").tablesorter();
						});
					}
					headerLinks.text('[');
					headerLinks.append($('<a>edit</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
					headerLinks.append(document.createTextNode(']\u00A0['));
					var shown = true;
					$("<a href='javascript:;'>hide</a>").click(function() {
						shown = !shown;
						shown ? cell.show() : cell.hide();
						$(this).text(shown ? "hide" : "show");
					}).appendTo(headerLinks);
					headerLinks.append(document.createTextNode(']'));
					tooltipsInit(cell);
				}
			}).error(function() {
				cell.text('Unable to load table; the source article for it might not exist.');
			});
		});
	});
}

// [[Template:Time]], [[Template:Countdown]]
function timeInit() {
	function getDate(s) {
		s = s && s.match(/(\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{2})/);
		return s && Date.UTC(parseInt(s[1]), parseInt(s[2])-1, parseInt(s[3]), parseInt(s[4]), parseInt(s[5]));
	}
	function updateCountdown() {
		var $this = $(this), t = getDate($this.data("jst-time")), now = new Date();
		if (t && (t > now)) {
			var $d = $this.find(".jst-days"), $h = $this.find(".jst-hours"), $m = $this.find(".jst-minutes"), $s = $this.find(".jst-seconds");
			var ofs = (t - now)/1000 | 0 + ($s.length ? 0 : 60), d = (ofs / 86400) | 0, h = (ofs / 3600) | 0, m = (ofs / 60) | 0, s = ofs % 60;
			if ($d.length) h %= 24;
			if ($h.length) m %= 60;
			$d.toggleClass("jst-active", d).find(".jst-value").text(d);
			$h.toggleClass("jst-active", d || h).find(".jst-value").text(h);
			$m.toggleClass("jst-active", d || h || m).find(".jst-value").text(m);
			$s.toggleClass("jst-active", true).find(".jst-value").text(s);
			$this.addClass("jst-active");
		} else {
			$this.removeClass("jst-active");
			$this.text($this.data('jst-text-over') || "");
		}
	}
	function updateCountdowns() {
		$(".jst-countdown.jst-active").each(updateCountdown);
		if ($(".jst-countdown.jst-active").length) setTimeout(updateCountdowns, 1001);
	}
	$(".jst-countdown").addClass("jst-active");
	$(".jst-countdown .jst-alternative").remove();
	$(".jst-days > .jst-label").text("days");
	$(".jst-hours > .jst-label").text("hours");
	$(".jst-minutes > .jst-label").text("minutes");
	$(".jst-seconds > .jst-label").text("seconds");
	updateCountdowns();

	$(".jst-abstime").each(function() {
		var $this = $(this), t1 = getDate($this.data("jst-time")), t2 = getDate($this.data("jst-time2")), ta = getDate($this.data("jst-anchor"));
		if (!t1) return;
		var t1d = new Date(t1), nowDate = ta ? (new Date(ta)).toDateString() : (new Date()).toDateString();
		$this.text((t1d.toDateString() == nowDate ? t1d.toLocaleTimeString() : (t1d.toLocaleDateString() + ", " + t1d.toLocaleTimeString())) + (t2 ? " – " + (new Date(t2)).toLocaleTimeString() : ""));
	});
}

$(function() {
	$('#firstHeading').addClass('page-header__title');
	$('#bodyContent').addClass('page-content');

	if ($("table.classnav").length) classNav();
	if ($("#ptabs").length) doPortalTabs();

	tooltipsInit($(article));
	addAjaxDisplayLink();
	timeInit();

	handleAutocollapse($(article));
	$("td.collapse-next-row").each(function() {if ($(this).parent().next().height()>300) $(this).append("<span style='float:right;'>[<a>show</a>]</span>").children("span").children("a").click(function(){$(this).text($(this).text()=="hide"?"show":"hide").parent().parent().parent().next().slideToggle();}).parent().parent().parent().next().hide();});
	requireImageLicense();
	if (mw.config.get("wgUserName") != null) $("span.insertusername").html(mw.config.get("wgUserName"));
	$(article+" .quote").prepend("<span class='quotemark' style='float:right;'>&#8221;</span><span class='quotemark' style='float:left;'>&#8220;</span>").css("max-width","75%").after("<br clear='left' />");
	$(".mw-mpt-link").html("<a href='/Special:WhatLinksHere/"+$(".page-header__title").text().replace("Move ","").replace(/'/g,"%27")+"'>Links to the old page title</a>");
	$(".coords-link").each(function() {
		if ($(this).next().find("a.new").length)
			$(this).addClass('broken');
	});

	if (!(window.location.hash && window.location.hash.match(/!noversions/))) {
		versionsInit();
		inlineVersionsInit();
	}
});