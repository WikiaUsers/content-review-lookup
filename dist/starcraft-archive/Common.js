/* Any JavaScript here will be loaded for all users on every page load. */

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

function quoteSelectorName(name) {
	return name.replace(/[:.'"]/g, function(s) { return '\\' + s; });
}
function tocLinkToSelector(link) {
	return quoteSelectorName(link.href.match(/#.+$/)[0]);
}

// [[Template:Versions]] and [[Template:cv]]
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
	baseEditLink = baseEditLink ? baseEditLink : (mw.config.get("wgScript") + "?action=edit&title=" + mw.util.wikiUrlencode(mw.config.get("wgTitle")) + "&section=0");
	var ttstore = {'#': $("#bodyContent div.wtooltip").first()}, editlinks = {}, conditionals = {'#': 'default'};
	var tips = $("#item-versions div.wtooltip").not(".wtooltip .wtooltip"), headers = tips.prev("h3").find(".mw-headline");
	var tabs = '<span id="versions-header-tabs" class="item-versions">';
	for (var i = 0; i < headers.length; i++) {
		ttstore['#' + headers[i].id] = tips.eq(i);
		editlinks['#' + headers[i].id] = headers.eq(i).prev().find("a").attr("href");
		conditionals['#' + headers[i].id] = headers[i].id.toLowerCase().replace(/\.27/g, "'").replace(/[ _]/g, '-');
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
		$(".versions-cv-" + quoteSelectorName(conditionals[key])).show();
		if ($("#bodyContent div.wtooltip").first()[0] != ttstore[key][0])
			$("#bodyContent div.wtooltip").first().replaceWith(ttstore[key]);

		$("#versions-header-tabs .activetab").toggleClass("activetab inactivetab");
		$('#versions-header-tabs a[href="'+key+'"]').toggleClass("activetab inactivetab");
		if (Tooltips && Tooltips.setActivePageVersion)
			Tooltips.setActivePageVersion(key == '#' ? '' : conditionals[key]);
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
		if (name == lhash || (!!lhash && ch.find('#' + quoteSelectorName(lhash)).length)) aid = i;
		$('<a>').attr('href', '#' + name).text(ch.data('version-name')).addClass('inactivetab ' + (cls[1+i] || '')).data('version-content', ch).appendTo(tabs);
	}
	i = ofs = 0; ch = chld.eq(0);
	toc.find('li a').each(function() {
		var n = $(this).find('.tocnumber'), nt = n.text(), v = nt.match(/\d+/);
		var h = tocLinkToSelector(this);
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
				var show = ch.find(tocLinkToSelector(this)).length, $t = $(this);
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