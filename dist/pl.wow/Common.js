if ( $.client.profile().name === 'msie' ) {
    importScript( 'MediaWiki:Common.js/IEFixes.js' );
}

function setStoredValue(key, value, expiredays) {
	if (typeof(localStorage) == "undefined") {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + (expiredays ? expiredays : 30));
		document.cookie = key + "=" + escape(value) + ";expires=" + exdate.toGMTString();
	} else {
		try {
			localStorage[key] = value;
		} catch (e) {
			// Usually QUOTA_EXCEEDED_ERR
		}
	}
}

function getStoredValue(key, defaultValue) {
	if (typeof(localStorage) == "undefined") {
		if (document.cookie && document.cookie.length) {
			var varr = document.cookie.match("(?:^|;)\\s*" + key + "=([^;]*)");
			if (varr.length == 2) return varr[1];
		}
		return defaultValue;
	}
	return localStorage[key] == null ? defaultValue : localStorage[key];
}

article = "";
var activeVersionTag = "";

// See [[Help:Tooltips]]
// default setting to turn tooltips on
var tooltipsOn = true;

var $tfb, $ttfb, $htt;
activeHoverLink = null;
tipCache = {};

// hides the tooltip
function hideTip() {
	$tfb.removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
	$tfb.children().remove();
	if ($(this).data('ahl-id') == activeHoverLink) activeHoverLink = null;
}

// displays the tooltip
function displayTip(e) {
	$htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
	moveTip(e);
	$htt.not(":empty").css("visibility","visible");
	moveTip(e);
}

// moves the tooltip
function moveTip(e) {
	$ct = $htt.not(":empty");
	var eh = $ct.innerHeight() + 20, wh = $(window).height();
	var newTop = e.clientY + ((e.clientY > (wh/2)) ? -eh : 20);
	var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($ct.innerWidth()+20):20);
	newTop = Math.max(0, Math.min(wh - eh, newTop));

	$ct.css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTipFromCacheEntry(e, url, tag) {
	var h = tipCache[url + " " + tag];
	if (!h) {
		h = tipCache[url].find(tag);
		if (h.length) tipCache[url + " " + tag] = h;
	}
	if (!h.length) {
		$tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
	} else {
		h.css("display", "").addClass("tooltip-content");
		$tfb.html(h);
	}
	displayTip(e);
}
function showTip(e) {
	var $t = $(this);
	$p = $t.parent();
	if ($p.hasClass("selflink") == false) {
		var tooltipIdentifier = "div.tooltip-content", tooltipTag = $t.attr("class").match(/taggedttlink(-[^\s]+)/)
		if ($t.hasClass("versionsttlink")) tooltipIdentifier += activeVersionTag;
		else if (tooltipTag) tooltipIdentifier += tooltipTag[1];
		var url = "/index.php?title=" + encodeURIComponent(decodeURIComponent($t.data("tt"))) + "&action=render " + 'div[class*="tooltip-content"]';
		var tipId = url + " " + tooltipIdentifier;
		activeHoverLink = tipId;
		$t.data('ahl-id', tipId);
		if (tipCache[url] != null) return showTipFromCacheEntry(e, url, tooltipIdentifier);
		$('<div style="display: none"/>').load(url, function(text) {
			if (text == "") return; // Occurs when navigating away from the page cancels the XHR
			tipCache[url] = $(this);
			if (tipId != activeHoverLink) return;
			showTipFromCacheEntry(e, url, tooltipIdentifier);
		});
	}
}

// quick tooltips
function hideTemplateTip() {
	$ttfb.html("").removeClass("tooltip-ready").addClass("hidden"); 
}

function showTemplateTip(e) {
	$ttfb.html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
	displayTip(e);
}

// add the tooltip calls to the page
function eLink(db,nm) {
	dbs = new Array("http://us.battle.net/wow/en/search?f=wowitem&q=","http://www.wowhead.com/?search=");
	dbTs = new Array("Armory","Wowhead");
	dbHs = new Array("&real; ","&omega; ");
	el = '<a href="'+ dbs[db]+nm + '" target="_blank" title="'+ dbTs[db] +'">'+ dbHs[db] + '</a>';
	return el;
}

function bindTT() {
	$t=$(this);
	$p=$t.parent();
	if ($p.hasClass("selflink") == false) {
		$t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).hover(showTip,hideTip).mousemove(moveTip);
		if ($p.hasClass("new")) {
			els = '<sup><span class="plainlinks">';
			y=($t.hasClass("itemlink"))?0:1;
			z=($t.hasClass("achievementlink"))?2:2;
			for (x=y;x<z;x++) els += eLink(x,$t.data("tt").replace("Quest:",""));
			$p.after(els+'</span></sup>');
		} else {
			$t.removeAttr("title");
			$p.removeAttr("title");
		}
	}
}

function tooltipsInit(root) {
	if (!tooltipsOn) return;
	if ($tfb == null) {
		$(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
		$tfb = $("#tfb");
		$ttfb = $("#templatetfb");
		$htt = $("#tfb,#templatetfb");
	}
	root.find(".ajaxoutertt > a").wrapInner('<span class="ajaxttlink" />');
	root.find(".ajaxoutertt, .ajaxoutertt-soft").each(function() {
		var cn = this.className.replace(/(?:^|\s)ajaxoutertt[^\s]*/, "").replace(/^\s+|\s+$/g, "");
		if (cn) $(this).find("span.ajaxttlink").addClass(cn);
	});
	root.find("span.ajaxttlink").each(bindTT);
	root.find("span.tttemplatelink").hover(showTemplateTip,hideTemplateTip).mousemove(moveTip);
}

// extract a URL parameter from the current URL
// From wikipedia:User:Lupin/autoedit.js
// paramName  : the name of the parameter to extract

function getParamValue(paramName) {
	var cmdRe=RegExp( '[&?]' + paramName + '=([^&]*)' );
	var h = document.location.href;
	var m=cmdRe.exec(h);
	if (m) {
		try {
			return decodeURIComponent(m[1]);
		} catch (someError) {}
	}
	return null;
}

function requireImageLicense() {
	if (wgPageName == "Special:Upload" && getParamValue("wpDestFile") == null) {
		$wpu = $("#mw-upload-form").find("[name=wpUpload]").not("#wpUpload");
		$wpu.attr("disabled","true");
		$("#wpLicense").change(function () {
			if ($("#wpLicense").val()) {
				$wpu.removeAttr("disabled");
			} else {
				$wpu.attr("disabled","true");
			}
		});
	}
}

function sortDays(a, b) {
	return b.substring(b.indexOf(";")+1)-a.substring(a.indexOf(";")+1);
}

// AJAX RC
var ajaxPages = {"Special:RecentChanges" : 1};
var ajaxRCOverride = false;
var rcRefresh = 30000;

function ajaxRC() {
	appTo = $(".firstHeading");
	appTo.append('&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Automatically refresh the current page every ' + Math.floor(rcRefresh/1000) + ' seconds">Auto-refresh:</span><input type="checkbox" id="autoRefreshToggle"><span style="position:relative; top:5px; left:5px;" id="autoRefreshProgress"><img src="http://hydra-media.cursecdn.com/wow.gamepedia.com/0/0e/Progressbar.gif" border="0" alt="AJAX operation in progress" /></span>');
	$("#autoRefreshToggle").click(function() {
		setStoredValue("ajaxRC", $("#autoRefreshToggle").is(":checked") ? "on" : "off")
		loadRCData()
	});
	$("#autoRefreshProgress").hide();
	if (getStoredValue("ajaxRC") == "on" || ajaxRCOverride) {
		$("#autoRefreshToggle").attr("checked", "checked");
		setTimeout("loadRCData();", rcRefresh);
	}
}
function handleAutocollapse(root) {
	var $ct = root.find(".mw-collapsible");
	var $es = $ct.filter(".mw-autocollapse").not($ct.first()).not(".mw-collapsed, .mw-uncollapsed, .mw-expanded");
	$es.filter(function() {
		var link = $(this).find(".mw-collapsible-toggle a");
		if (link.length) link.first().click();
		return !link.length;
	}).toggleClass("mw-collapsed mw-autocollapse");
}
function loadRCData() {
	if (!$("#autoRefreshToggle").is(":checked")) return;
	$('#autoRefreshProgress').show()
	$(article).load(location.href + " "+article+" > *", function (data) {
		handleAutocollapse($(article));
		$(article + " .mw-collapsible").makeCollapsible();
		$('#autoRefreshProgress').hide()
		if ($("#autoRefreshToggle").is(":checked")) setTimeout("loadRCData();", rcRefresh);
	});
}

// tab switch
var ptabs;
function doPortalTabs() {
	cTab = $("#ptabs .activetab").parent().prevAll().length + 1;
	ptabs = $("#ptabs>*");
	ptabs.css("cursor","pointer");
	$("#ptab-extra").attr("id", "ptab" + ptabs.length);
	ptabs.click(function (e) {
		$pt = $(e.target);
		if ($pt.hasClass("inactivetab")) e.preventDefault();
		if ($pt.parent().not("#ptabs").html()) $pt = $pt.parent();
		sp = $pt.prevAll().length;
		ptabs.eq(cTab-1).children("*").removeClass("activetab").addClass("inactivetab");
		$("#ptab"+cTab).hide();
		cTab = sp+1;
		ptabs.eq(sp).children("*").removeClass("inactivetab").addClass("activetab");
		$("#ptab"+cTab).show();
	});
}

// AJAX tables
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
		table.find(".ajax-load-link").parent().andSelf().filter('a').click(function(event) {
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


function createPageInCategory() {
	page = prompt("Page name");
	if (page) location.href = "/" + page + "?action=edit&redlink=1&category="+wgTitle;
}

cls = "";
function classNav() {
	clses = new Array("death knight","druid","hunter","mage","monk","paladin","priest","rogue","shaman","warlock","warrior");
	for (x=0;x<11;x++) {
		if (wgTitle.toLowerCase().indexOf(clses[x]) != -1) {
			cls = clses[x].replace(" ","");
			break;
		}
	}
	if (cls) {
		$("table.classnav tr>*:not(:first-child):not(:has('.cc-"+cls+"'))").hide();
		$("table.classnav .cc-"+cls+" .long").show();
		if (!$("table.classnav .classNavShow").length) $("table.classnav th:has('.cc-"+cls+"')").append('<span class="classNavShow" style="cursor:pointer;"></span>');
		$("table.classnav .classNavShow").html("&nbsp;&gt;&gt;").click(classNavShowAll);
	}
}

function classNavShowAll() {
	$("table.classnav .long").hide();
	$("table.classnav tr>*:not(:first-child):not(:has('.cc-"+cls+"'))").show();
	$("table.classnav .classNavShow").html("&nbsp;&lt;&lt;").click(classNav);
}

function versionsInit() {
	var iv = $("#item-versions");
	if (iv.length == 0) return;
	var sec = iv.prevAll("h2").first().nextUntil("h2").andSelf();
	sec.wrapAll('<div id="versions-section" style="display: none"/>');
	var tocentry = $('#toc a[href="#'+ sec.first().find(".mw-headline").attr("id") +'"]').parent();
	tocentry.nextAll().find(".tocnumber").each(function(i) {
		var t = $(this).text();
		$(this).text(t.replace(/^\d+/, parseInt(t.match(/^\d+/))-1));
	});
	tocentry.remove();

	var baseEditLink = $("#bodyContent div.wtooltip").first().parentsUntil("#bodyContent").andSelf().prev("h2, h3").first().find(".editsection a").attr("href");
	baseEditLink = baseEditLink ? baseEditLink : (wgScript + "?action=edit&title=" + mediaWiki.util.wikiUrlencode(wgTitle) + "&section=0");
	var ttstore = {'#': $("#bodyContent div.wtooltip").first()}, editlinks = {}, conditionals = {'#': 'default'};
	var tips = $("#item-versions div.wtooltip"), headers = tips.prev("h3").find(".mw-headline");
	var tabs = '<span id="versions-header-tabs" class="item-versions">';
	for (var i = 0; i < headers.length; i++) {
		ttstore['#' + headers[i].id] = tips.eq(i);
		editlinks['#' + headers[i].id] = headers.eq(i).prev().find("a").attr("href");
		conditionals['#' + headers[i].id] = headers[i].id.toLowerCase().replace(/[ _]/, '-')
		tabs += ' <a href="#' + headers[i].id + '" class="inactivetab">' + $.trim(headers.eq(i).text()) +'</a>';
	}
	tabs = $(tabs + "</span>");

	var baseName = iv.data("base-name") || "Base", basePos = iv.data("base-pos") || 0;
	var defaultTab = ' <a href="#" class="inactivetab">' + baseName + '</a> ';

	if (basePos >= headers.length) {
		tabs.append(defaultTab);
	} else {
		tabs.children().eq(basePos).before(defaultTab);
	}
	tabs.children("a").click(function(e) {
		var target = $(this).attr("href");
		e.preventDefault();
		if ($(this).hasClass("activetab")) {
			window.location = editlinks[target] ? editlinks[target] : baseEditLink;
			return;
		}
		if (history && history.replaceState) {
			history.replaceState(null, $("title").text(), target);
		} else {
			window.location.hash = target;
		}
		versionsShow(target);
	});
	tabs.appendTo("#firstHeading");
	
	if ((window.location.hash && ttstore[window.location.hash])) {
		versionsShow(window.location.hash);
		$("html, body").scrollTop(0);
	} else {
		versionsShow('#');
	}

	$("body").addClass("versions-active");
	
	function versionsShow(key) {
		$(".versions-cv").hide();
		$(".versions-cv-" + conditionals[key]).show();
		if ($("#bodyContent div.wtooltip").first()[0] != ttstore[key][0])
			$("#bodyContent div.wtooltip").first().replaceWith(ttstore[key]);

		$("#versions-header-tabs .activetab").toggleClass("activetab inactivetab");
		$('#versions-header-tabs a[href="'+key+'"]').toggleClass("activetab inactivetab");
		activeVersionTag = key == '#' ? '' : (key).replace(/^#/, '-').replace(/[ _]/, '-');
		$(".versionsttlink").parent("a").each(function() {
			$(this).attr("href", $(this).attr("href").replace(/(?:#.*)|$/, key));
		});
	}
}
function inlineVersionsInit() {
	var iv = $("#versions-inline");
	if (iv.length == 0) return;
	$(".versions-inline-wrap").each(function() { var $t = $(this); $t.parentsUntil(iv).andSelf().nextUntil(".versions-inline-wrap").appendTo($t); }).not(iv.children()).appendTo(iv);

	var i, ofs, ch, name, chld = iv.children(), toc = $("#toc"),
	    cls = (iv.data('switch-classes') || '').split(' '),
	    tabs = $('<span>').attr('id', 'versions-header-tabs').addClass(cls[0] || ''),
	    aid = 0, lhash = ((window.location && window.location.hash) || '').substring(1),
	    pref = iv.data('switch-pref');
	if (!lhash && pref) lhash = getStoredValue('vsp-' + pref) || '';

	for (i = 0; i < chld.length; i++) {
		ch = chld.eq(i); name = ch.data('version-name');
		if (i) tabs.append('&#32;');
		if (name == lhash || (!!lhash && ch.find('#' + lhash).length)) aid = i;
		$('<a>').attr('href', '#' + name).text(ch.data('version-name')).addClass('inactivetab ' + (cls[1+i] || '')).data('version-content', ch).appendTo(tabs);
	}
	i = ofs = 0; ch = chld.eq(0);
	toc.find('li a').each(function() {
		var n = $(this).find('.tocnumber'), nt = n.text(), v = nt.match(/\d+/);
		var h = this.href.match(/#.+$/)[0];
		while (!ch.find(h).length && ch.length) {
			ch = chld.eq(++i); ofs = v - 1;
		}
		if (ofs) n.text(nt.replace(/\d+/, v - ofs));
	});

	tabs.appendTo('#firstHeading');
	tabs.children('a').click(function(e) {
		var $t = $(this), target = $t.attr("href"), $cnt = $t.data('version-content');
		e.preventDefault();
		if ($t.hasClass("activetab")) {
			if ($cnt.data('version-source'))
				window.location = mw.util.wikiGetlink($cnt.data('version-source'));
			return;
		}
		if (history && history.replaceState) {
			history.replaceState(null, $("title").text(), target);
		} else {
			window.location.hash = target;
		}
		if (pref) setStoredValue('vsp-' + pref, target.substring(1));
		$t.siblings('a.activetab').toggleClass('inactivetab activetab');
		$t.removeClass('inactivetab').addClass('activetab');
		showInlineVersion($cnt);
	});

	var cur = tabs.children('a').eq(aid);
	cur.toggleClass('activetab inactivetab');
	showInlineVersion(cur.data('version-content'));

	$("body").addClass("versions-active-inline");
	function showInlineVersion(ch) {
		var toc = $("#toc"), h1 = ch.find(":header"), sock = ch.find(".toc-socket");
		if ((toc.length && h1.length)) {
			toc.find('li a').filter(function() {
				var show = ch.find(this.href.match(/#.+$/)[0]).length, $t = $(this);
				$t.closest('li').toggle(!!show);
			});
			if (!ch.find("#toc").length) {
				if (sock.length) { toc.appendTo(sock.first()); } else { toc.insertBefore(h1.first()); }
			}
		}
		chld.hide();
		ch.show();
	}
}

$(function() {
	article = "#bodyContent";
	if (wgPageName && ajaxPages.hasOwnProperty(wgPageName) && !$("#autoRefreshToggle").length) ajaxRC();
	if ($("table.classnav").length) classNav();
	if ($("#ptabs").length) doPortalTabs();

	if (wgNamespaceNumber==14 && wgAction=="view") addPortletLink('p-views', 'javascript:createPageInCategory();', "Create", 'ca-create-category-page', "Create a page in this category", '',document.getElementById("ca-history"));
	if (getParamValue("category") && wgAction=="edit") $("#wpTextbox1").val("\n\n[" + "[Category:"+getParamValue("category")+"]]");
	tooltipsInit($(article));
	addAjaxDisplayLink();
	handleAutocollapse($(article));
	requireImageLicense();
	if (wgUserName != null) $("span.insertusername").html(wgUserName);
	$(article+" .quote").prepend("<span class='quotemark' style='float:right;'>&#8221;</span><span class='quotemark' style='float:left;'>&#8220;</span>").css("max-width","75%").after("<br clear='left' />");
	$(".mw-mpt-link").html("<a href='/Special:WhatLinksHere/"+$(".firstHeading").text().replace("Move ","").replace(/'/g,"%27")+"'>Links to the old page title</a>");
	$(".coords-link").each(function() {
		if ($(this).next().find("a.new").length)
			$(this).addClass('broken');
	});

	if (!(window.location.hash && window.location.hash.match(/!noversions/))) {
		versionsInit();
		inlineVersionsInit();
	}
});

$(function() {
	var getDate = function(s) {
		s = s && s.match(/(\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{2})/);
		return s && Date.UTC(parseInt(s[1]), parseInt(s[2])-1, parseInt(s[3]), parseInt(s[4]), parseInt(s[5]));
	};
	var updateCountdown = function() {
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
	var updateCountdowns = function() {
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
});