(function(cb) {
	if (window.jQuery) return cb();
	// Second-guess everything.
	var script = document.createElement("script"), isIE = !!script.readyState;
	script.type = "text/javascript";
	script[isIE ? "onreadystatechange" : "onload"] = function() {
		if (!isIE || script.readyState == "loaded" || script.readyState == "complete") {
			cb();
		}
	};
	script.src = 'http://wowpedia.org/extensions/MobileFrontend/javascripts/jquery-1.7.1.min.js';
	document.getElementsByTagName("head")[0].appendChild(script);
})(function() {

var _nav = {};
for (var k in navigator) _nav[k] = navigator[k];
_nav.userAgent = "Mozilla/5.0";
window.navigator = _nav;

$(function() {
	var root = $("#content");
	root.find(".ajaxoutertt > a").wrapInner('<span class="ajaxttlink" />');
	root.find(".ajaxoutertt, .ajaxoutertt-soft").each(function() {
		var cn = this.className.replace(/(?:^|\s)ajaxoutertt[^\s]*/, "").trim();
		if (cn) $(this).find("span.ajaxttlink").addClass(cn);
	});
});

if (!(window.location.hash && window.location.hash.match(/!noversions/))) $(function() {
	var iv = $("#item-versions");
	if (iv.length == 0) return;
	var sec = iv.parent().prevUntil('h2').addBack().prev().addBack();
	sec.wrapAll('<div id="versions-section" style="display: none"/>');

	var ttstore = {'#': $("#content div.wtooltip").first()}, conditionals = {'#': 'default'};
	var tips = $("#item-versions div.wtooltip").not(".wtooltip .wtooltip"), headers = tips.prev("h3").find(".mw-headline");
	var tabs = '<span id="versions-header-tabs" class="item-versions">';
	for (var i = 0; i < headers.length; i++) {
		ttstore['#' + headers[i].id] = tips.eq(i);
		conditionals['#' + headers[i].id] = headers[i].id.toLowerCase().replace(/[ _]/, '-')
		tabs += ' <a href="#' + headers[i].id + '"><span class="inactivetab">' + $.trim(headers.eq(i).text()) +'</span></a>';
	}
	tabs = $(tabs + "</span>");

	var baseName = iv.data("base-name") || "Base", basePos = iv.data("base-pos") || 0;
	var defaultTab = ' <a href="#"><span class="inactivetab">' + baseName + '</span></a> ';

	if (basePos >= headers.length) {
		tabs.append(defaultTab);
	} else {
		tabs.children().eq(basePos).before(defaultTab);
	}
	tabs.children("a").click(function(e) {
		var target = $(this).attr("href");
		e.preventDefault();
		if ($(this).hasClass("activetab")) {
			return;
		}
		if (history && history.replaceState) {
			history.replaceState(null, $("title").text(), target);
		} else {
			window.location.hash = target;
		}
		versionsShow(target);
	});
	tabs.appendTo("#section_0");
	
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
		if ($("#content div.wtooltip").first()[0] != ttstore[key][0])
			$("#content div.wtooltip").first().replaceWith(ttstore[key]);

		$(".activetab").toggleClass("activetab inactivetab");
		$('#versions-header-tabs a[href="'+key+'"] span').toggleClass("activetab inactivetab");
		activeVersionTag = key == '#' ? '' : (key).replace(/^#/, '-').replace(/[ _]/, '-');
		$(".versionsttlink").parent("a").each(function() {
			$(this).attr("href", $(this).attr("href").replace(/(?:#.*)|$/, key));
		});
		if (mw && mw.mobileFrontend) mw.mobileFrontend.emit('section-toggled');
	}
});

if (!(window.location.hash && window.location.hash.match(/!noversions/))) $(function() {
	var iv = $("#versions-inline");
	if (iv.length == 0) return;
	$(".versions-inline-wrap").each(function() { var $t = $(this); $t.parentsUntil(iv).andSelf().nextUntil(".versions-inline-wrap").appendTo($t); }).not(iv.children()).appendTo(iv);

	var i, chld = iv.children(), 
	    cls = (iv.data('switch-classes') || '').split(' '),
	    tabs = $('<span>').attr('id', 'versions-header-tabs').addClass(cls[0] || ''),
	    aid = 0, lhash = ((window.location && window.location.hash) || '').substring(1);
		
	for (i = 0; i < chld.length; i++) {
		var ch = chld.eq(i), name = ch.data('version-name');
		if (i) tabs.append('&#32;');
		if (name == lhash || (lhash != '' && ch.find('#' + lhash).length)) aid = i;
		$('<a>').attr('href', '#' + name).text(ch.data('version-name')).addClass('inactivetab ' + (cls[1+i] || '')).data('version-content', ch).appendTo(tabs);
	}
	tabs.appendTo('#section_0');
	tabs.children('a').click(function(e) {
		var $t = $(this), target = $t.attr("href");
		e.preventDefault();
		if ($t.hasClass("activetab")) return;
		if (history && history.replaceState) {
			history.replaceState(null, $("title").text(), target);
		} else {
			window.location.hash = target;
		}
		$t.siblings('a.activetab').toggleClass('inactivetab activetab');
		$t.removeClass('inactivetab').addClass('activetab');
		chld.hide();
		$t.data('version-content').show();
		if (mw && mw.mobileFrontend) mw.mobileFrontend.emit('section-toggled');
	});

	var cur = tabs.children('a').eq(aid);
	cur.toggleClass('activetab inactivetab');
	chld.hide();
	cur.data('version-content').show();

	$("body").addClass("versions-active-inline");
	if (mw && mw.mobileFrontend) mw.mobileFrontend.emit('section-toggled');
});

if (!(window.location.hash && window.location.hash.match(/!nobrchomp/))) $(function() {
	$("#content br + br").filter(function() {
		var tag = this;
		for(;tag.previousSibling; tag = tag.previousSibling) {
			var nt = tag.previousSibling.nodeType;
			if (nt != 8 && (nt != 3 || tag.previousSibling.nodeValue.match(/\S/))) break;
		}
		return tag.previousSibling && tag.previousSibling.nodeName == 'BR';
	}).remove();
});

}); // loader wrapper

$("head").append('<meta name="theme-color" content="#ffb74b">');