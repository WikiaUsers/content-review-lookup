/* Any JavaScript here will be loaded for all users on every page load. */

function setStoredValue(key, value, expiredays) {
	if (typeof(localStorage) == "undefined") {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + (expiredays ? expiredays : 30));
		document.cookie = key + "=" + escape(value) + ";expires=" + exdate.toGMTString();
	} else {
		localStorage[key] = value;
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
	$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
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
		if ($.browser.msie) h = h.clone();
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
	if ($tfb == null) {
		$(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
		$tfb = $("#tfb");
		$ttfb = $("#templatetfb");
		$htt = $("#tfb,#templatetfb");
	}
	root.find(".ajaxoutertt > a").wrapInner('<span class="ajaxttlink" />');
	root.find(".ajaxoutertt, .ajaxoutertt-soft").each(function() {
		var cn = this.className.replace(/(?:^|\s)ajaxoutertt[^\s]*/, "").trim();
		if (cn) $(this).find("span.ajaxttlink").addClass(cn);
	});
	root.find("span.ajaxttlink").each(bindTT);
	root.find("span.tttemplatelink").hover(showTemplateTip,hideTemplateTip).mousemove(moveTip);
}

// collapsible tables
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable(i, isAutomated) {
	var Button = $("#collapseButton" + i);
	var Table = $("#collapsibleTable" + i);
	if (Table.length<1 || Button.length<1) return false;
	if (Button.text() == collapseCaption) {
		Table.find("tr").not(":has('#collapseButton"+i+"')").hide();
		if (isAutomated == null) setStoredValue("hideTable-" + wgArticleId + "-" + i,1,30);
		Button.text(expandCaption);
	} else {
		Table.find("tr").not(":has('#collapseButton"+i+"')").show();
		if (isAutomated == null) setStoredValue("hideTable-" + wgArticleId + "-" + i,0,30);  
		Button.text(collapseCaption);
	}
}
 
function createCollapseButtons() {
	var tch = $("table.collapsible tr th:last-child");
	tch.each(function (i) {
		$(this).closest("table").attr("id", "collapsibleTable" + i);
		$(this).prepend('<span style="float:right; font-weight:normal; text-align:right; width:6em">[<a href="javascript:collapseTable('+i+');" style="color:'+$(this).css("color")+';" id="collapseButton'+i+'">'+collapseCaption+'</a>]</span>');
		if ($(this).closest("table").hasClass("collapsed") || (getStoredValue("hideTable-" + wgArticleId + "-" + i) == 1) || (tch.length >= autoCollapse && $(this).closest("table").hasClass("autocollapse"))) collapseTable(i, 1);
	});
}

var nbh = '['+collapseCaption+']';
var nbs = '['+expandCaption+']';
function toggleNavigationBar(i) {
	var NavToggle = $("#NavToggle" + i);
	var NavFrame = $("#NavFrame" + i);
	if (NavFrame.length<1 || NavToggle.length<1) return false; 
	ncd=(NavToggle.text()==nbh)?'none':'block';
	NavFrame.children(".NavPic,.NavContent").css("display",ncd);
	nct=(NavToggle.text()==nbh)?nbs:nbh;
	NavToggle.text(nct);
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
	$("div.NavFrame").each(function (i) {
		NavToggleText = ($(this).children(".NavPic:visible,.NavContent:visible").length>0)?nbh:nbs;
		$(this).children(".NavHead").append('<a href="javascript:toggleNavigationBar('+i+');" id="NavToggle'+i+'" class="NavToggle">'+NavToggleText+'</a>');
		$(this).attr("id","NavFrame"+i);
	});
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

// add scribblemap processing
function wwScribbleMaps() {
	$(article+" div.wwSM").each(function () {
		mapID = $(this).attr("class").replace("wwSM map-","");
		if (mapID.length > 20) mapID = "";
		$(this).html('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="550" height="400" id="smwidget" align="middle"><param name="allowFullScreen" value="true" /><param name="FlashVars" value="id='+mapID+'&p=true&mt=false&d=true&z=true" /><param name="movie" value="http://widgets.scribblemaps.com/wowsmwidget.swf"/><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><embed src="http://widgets.scribblemaps.com/wowsmwidget.swf" FlashVars="id='+mapID+'&p=true&mt=false&d=true&z=true" "quality="high" bgcolor="#000000" width="550" height="400" name="smwidget" align="middle" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');
	});
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

function loadGSList(){
	if ($("#gslist").length>0) {
		var timestamp = 0;
		var today = new Date();
		var tsDate = new Date();
		var dateRE = /(\d{4})-(\d\d)-(\d\d).*/;
		var pArr = new Array();
		$.getJSON("http://www.wowpedia.org/api.php?action=query&generator=categorymembers&gcmlimit=500&gcmsort=timestamp&gcmdir=desc&gcmtitle=Category:Guild_stubs&prop=revisions&rvprop=timestamp&format=json&callback=?", function(data) {
			if (data.query) {
				pages = data.query.pages;
				for (pageID in pages) {
					timestamp = pages[pageID].revisions[0].timestamp;
					dateREd = dateRE.exec(timestamp);
					tsDate.setFullYear(dateREd[1],dateREd[2]-1,dateREd[3]);
					daysElapsed = Math.round((today - tsDate) / 86400000);
					pArr[pArr.length] = pages[pageID].title + ";" + daysElapsed;
				}
				pArr2 = pArr.sort(sortDays);
				gslBuffer = "<ul>";
				for (n in pArr2) {
					guild = pArr2[n].substring(0,pArr2[n].indexOf(";"));
					daysE = pArr2[n].substring(pArr2[n].indexOf(";")+1);
					daysE = (daysE < 0)?0:daysE;
					daysE = (daysE > 29)?'<span style="color:red;">('+daysE+' days)</span>':'('+daysE+' days)';
					gslBuffer += '<li><a href="/'+guild+'" title="'+guild+'">'+guild+'</a> ' + daysE + ' - <a href="/'+guild+'?action=history">History</a> &bull; <a href="/'+guild+'?action=delete">Delete</a></li>';
				}
				gslBuffer += "</ul>";
				$("#gslist").html(gslBuffer);
			}
		});
	}
}

// AJAX RC
var ajaxPages = new Array("Special:RecentChanges");
var ajaxRCOverride = false;
var rcRefresh = 30000;

function ajaxRC() {
	appTo = $(".firstHeading");
	appTo.append('&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Automatically refresh the current page every ' + Math.floor(rcRefresh/1000) + ' seconds">Auto-refresh:</span><input type="checkbox" id="autoRefreshToggle"><span style="position:relative; top:5px; left:5px;" id="autoRefreshProgress"><img src="http://www.wowpedia.org/images/0/0e/Progressbar.gif" border="0" alt="AJAX operation in progress" /></span>');
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
function loadRCData() {
	if (!$("#autoRefreshToggle").is(":checked")) return;
	$('#autoRefreshProgress').show()
	$(article).load(location.href + " "+article+" > *", function (data) {
		$(article + " .mw-collapsible").makeCollapsible();
		$('#autoRefreshProgress').hide()
		if ($("#autoRefreshToggle").is(":checked")) setTimeout("loadRCData();", rcRefresh);
	});
}

// tab switch
var ptabs;
var ffc;
function doTabs() {
	cTab = $("#ptabs .activetab").parent().prevAll().length + 1;
	ptabs = $("#ptabs>*");
	ptabs.css("cursor","pointer");
	$("#ptab-extra").attr("id", "ptab" + ptabs.length);
	ptabs.click(function (e) {
		$pt = $(e.target);
		if ($pt.hasClass("inactivetab")) e.preventDefault();
		if (ffc != 1 && $(".fswitch").length) {
			if ($pt.text().indexOf("Alliance") != -1) {
				setStoredValue("fspref","Alliance",30);
			} else {
				setStoredValue("fspref","Horde",30);
			}
		}
		if ($pt.parent().not("#ptabs").html()) $pt = $pt.parent();
		sp = $pt.prevAll().length;
		ptabs.eq(cTab-1).children("*").removeClass("activetab").addClass("inactivetab");
		$("#ptab"+cTab).hide().children(".toc").removeAttr("id");
		cTab = sp+1;
		ptabs.eq(sp).children("*").removeClass("inactivetab").addClass("activetab");
		$("#ptab"+cTab).show().children(".toc").attr("id","toc");
	});
}

// AJAX tables
ahClass = new RegExp('class="ajaxHide"', "gim");
crlf = new RegExp("\r\n", "g")

function getTableData(tablePage, tableNum) {
	var cell = $("#ajaxTable" + tableNum).find("td").eq(0);
	cell.html('<p>Please wait, the table is being loaded...</p>');
	$.get('http://' + location.hostname + '/' + tablePage + '?action=render', function (data) {
		if (data) {
			data = data.replace(crlf, "").replace(ahClass, 'class="ajaxHide-active"').replace('class="darktable"', "");
			cell.html(data);
			if (cell.find("table.sortable").length) {
				mw.loader.using('jquery.tablesorter', function() {
					cell.find("table.sortable").tablesorter();
				});
			}
			$("#stl" + tableNum).html('[<a href="/'+tablePage+'?action=edit">edit</a>]&nbsp;[<a href="javascript:;" id="htl' + tableNum + '" onClick="hideTable(' + tableNum + ');">hide</a>]');
			if (tooltipsOn) tooltipsInit(cell);
		}
	}).error(function() {
		cell.html('<p>Unable to load table; the Wowpedia page for it might not exist.</p>')
	});
}

function hideTable(tableNum) {
	$("#ajaxTable" + tableNum).find("tr").eq(1).hide();
	$("#htl" + tableNum).click(function() {
		showTable(tableNum);
	});
	$("#htl" + tableNum).text("show");
}

function showTable(tableNum) {
	$("#ajaxTable" + tableNum).find("tr").eq(1).show();
	$("#htl" + tableNum).click(function() {
		hideTable(tableNum);
	});
	$("#htl" + tableNum).text("hide");
}

function loadTableData(tableNum) {
	thisTable = document.getElementById("ajaxTable" + tableNum);
	loadPage = thisTable.className.substring(thisTable.className.indexOf("targetPage-") + 11);
	getTableData(loadPage, tableNum);
}

function addAjaxDisplayLink() {
	$(article+" table.ajax").each(function (i) {
		$(this).attr("id", "ajaxTable" + i);
		$(this).find("td").eq(1).parent().hide();
		$(this).find("td").eq(0).parent().show();
		if (this.getElementsByTagName("th").length > 0) this.getElementsByTagName("th")[0].innerHTML = '<span style="float:right;" id="stl' + i + '"></span>' + this.getElementsByTagName("th")[0].innerHTML;
		if ($(this).find("td").eq(0).hasClass("showLinkHere")) {
			$(this).find("td").eq(0).html($(this).find("td").eq(0).html().replace("[link]", '<a href="javascript:;" onClick="loadTableData(' + i + ')">').replace("[/link]","</a>"));
		} else {
			$("#stl" + i).html('[<a href="javascript:;" onClick="loadTableData(' + i + ')">show data</a>]');
		}
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
	var sec = $("#item-versions").prevAll("h2").first().nextUntil("h2").andSelf();
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
	var tabs = '<span id="ptabs" class="item-version-tabs">';
	for (var i = 0; i < headers.length; i++) {
		ttstore['#' + headers[i].id] = tips.eq(i);
		editlinks['#' + headers[i].id] = headers.eq(i).prev().find("a").attr("href");
		conditionals['#' + headers[i].id] = headers[i].id.toLowerCase().replace(/[ _]/, '-')
		tabs += ' <a href="#' + headers[i].id + '"><span class="inactivetab">' + $.trim(headers.eq(i).text()) +'</span></a>';
	}
	tabs = $(tabs + "</span>");

	var baseProps = $('#versions-base-name');
	var defaultTab = ' <a href="#"><span class="inactivetab">' + (baseProps.text() ? $.trim(baseProps.text()) : 'Base') + '</span></a> ';
	var defaultPos = baseProps.length == 1 ? parseInt(baseProps.attr("class").match(/\d+/)) : 0;
	if (defaultPos >= headers.length) {
		tabs.append(defaultTab);
	} else {
		tabs.children().eq(defaultPos).before(defaultTab);
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

		$(".activetab").toggleClass("activetab inactivetab");
		$('#ptabs a[href="'+key+'"] span').toggleClass("activetab inactivetab");
		activeVersionTag = key == '#' ? '' : (key).replace(/^#/, '-').replace(/[ _]/, '-');
		$(".versionsttlink").parent("a").each(function() {
			$(this).attr("href", $(this).attr("href").replace(/(?:#.*)|$/, key));
		});
	}
}

$(function() {
	article = "#bodyContent";
	for (x in ajaxPages) { 
		if (wgPageName == ajaxPages[x] && $("#autoRefreshToggle").length==0) ajaxRC();
	}
	if ($("table.classnav").length) classNav();
	if ($("#ptabs").length) doTabs();
	if ($(".fswitch").length) {
		$("#ptab1,#ptab2").addClass("fswitched");
		$("#ptabs").appendTo("#firstHeading").css("display", '');
		$("#toc").clone().attr("id","toc2").insertBefore("#ptab2 :header:first");
		var lpt1;
		$("#toc ul > li > a").each(function () { if (!$("#ptab1 "+$(this).attr("href")).length) $(this).parent().remove(); });
		$("#toc2 ul > li > a").each(function (i) { 
			if ($("#ptab1 "+$(this).attr("href")).length) {
				$(this).parent().remove();
			} else {
				var tocNumber = $(this).children(".tocnumber").text().split(".");
				if (lpt1 == null) lpt1 = tocNumber[0]-1;
				tocNumber[0] = tocNumber[0] - lpt1;
				$(this).children(".tocnumber").text(tocNumber.join("."));
			}
		});
		f = ["Alliance","Horde"];
		faction = getStoredValue("fspref", f[Math.round(Math.random())]);
		ffc = 1;
		$("#ptabs span.inactivetab:contains('"+faction+"')").click();
		if (location.hash && $(".fswitched:visible "+location.hash).length == 0) { 
			$("#ptabs span.inactivetab:contains('"+$("#firstHeading .inactivetab").text()+"')").click();
			h = location.hash;
			location.hash = "#top";
			location.hash = h;
		}
		ffc = 0;
	}
	$(window).error(function(){ return true; });
	if (wgNamespaceNumber==14 && wgAction=="view") addPortletLink('p-views', 'javascript:createPageInCategory();', "Create", 'ca-create-category-page', "Create a page in this category", '',document.getElementById("ca-history"));
	if (getParamValue("category") && wgAction=="edit") $("#wpTextbox1").val("\n\n[" + "[Category:"+getParamValue("category")+"]]");
	if (tooltipsOn) tooltipsInit($(article));
	addAjaxDisplayLink();
	createCollapseButtons();
	createNavigationBarToggleButton();
	wwScribbleMaps();
	requireImageLicense();
	loadGSList();
	if (wgUserName != null) $("span.insertusername").html(wgUserName);
	$(article+" .quote").prepend("<span class='quotemark' style='float:right;'>&#8221;</span><span class='quotemark' style='float:left;'>&#8220;</span>").css("max-width","75%").after("<br clear='left' />");
	$(".mw-mpt-link").html("<a href='/Special:WhatLinksHere/"+$(".firstHeading").text().replace("Move ","").replace(/'/g,"%27")+"'>Links to the old page title</a>");
	$(".coords-link").each(function() {
		if ($(this).next().find("a.new").length)
			$(this).addClass('broken');
	});

	if ($("#item-versions").length && !(window.location.hash && window.location.hash.match(/!noversions/))) versionsInit();
});