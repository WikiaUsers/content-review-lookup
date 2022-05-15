/* 
Tools: [http://horizonfleet.wikia.com/index.php?title=-&action=raw&smaxage=0&gen=js reload cache]
<pre><nowiki>
*/
/* tooltips and access keys */
ta = new Object();
ta['pt-userpage'] = new Array('.','My user page'); 
ta['pt-anonuserpage'] = new Array('.','The user page for the ip you\'re editing as'); 
ta['pt-mytalk'] = new Array('n','My talk page'); 
ta['pt-anontalk'] = new Array('n','Discussion about edits from this ip address'); 
ta['pt-preferences'] = new Array('','My preferences'); 
ta['pt-watchlist'] = new Array('l','List of pages I\'m monitoring for changes'); 
ta['pt-mycontris'] = new Array('y','List of my contributions'); 
ta['pt-login'] = new Array('o','You are encouraged to log in; it is not mandatory, however'); 
ta['pt-anonlogin'] = new Array('o','You are encouraged to log in; it is not mandatory, however'); 
ta['pt-logout'] = new Array('o','Log out'); 
ta['ca-talk'] = new Array('t','Discussion about the content page'); 
ta['ca-edit'] = new Array('e','You can edit this page; please use the preview button before saving'); 
ta['ca-addsection'] = new Array('+','Add a comment to this discussion'); 
ta['ca-viewsource'] = new Array('e','This page is protected; you can view its source'); 
ta['ca-history'] = new Array('h','Past versions of this page'); 
ta['ca-protect'] = new Array('=','Protect this page'); 
ta['ca-delete'] = new Array('d','Delete this page'); 
ta['ca-undelete'] = new Array('d','Restore the edits done to this page before it was deleted'); 
ta['ca-move'] = new Array('m','Move this page'); 
ta['ca-nomove'] = new Array('','You don\'t have the permissions to move this page'); 
ta['ca-watch'] = new Array('w','Add this page to your watchlist'); 
ta['ca-unwatch'] = new Array('w','Remove this page from your watchlist'); 
ta['search'] = new Array('','Search Memory Alpha'); 
ta['p-logo'] = new Array('z','Main Page'); 
ta['n-mainpage'] = new Array('z','Visit the Main Page'); 
ta['n-Main-page'] = new Array('z','Visit the Main Page'); 
ta['n-portal'] = new Array('','About the project, what you can do, where to find things'); 
ta['n-Chat'] = new Array('','IRC, the place to chat');
ta['n-currentevents'] = new Array('','Find background information on current events'); 
ta['n-recentchanges'] = new Array('r','The list of recent changes in the wiki'); 
ta['n-randompage'] = new Array('x','Load a random page'); 
ta['n-help'] = new Array('/','The place to find out information'); 
ta['n-sitesupport'] = new Array('','Support us'); 
ta['t-whatlinkshere'] = new Array('j','List of all wiki pages that link here'); 
ta['t-recentchangeslinked'] = new Array('k','Recent changes in pages linking to this page'); 
ta['feed-rss'] = new Array('','RSS feed for this page'); 
ta['feed-atom'] = new Array('','Atom feed for this page'); 
ta['t-contributions'] = new Array('','View the list of contributions of this user'); 
ta['t-emailuser'] = new Array('','Send a mail to this user'); 
ta['t-upload'] = new Array('u','Upload images or media files'); 
ta['t-specialpages'] = new Array('q','List of all special pages'); 
ta['ca-nstab-main'] = new Array('c','View the content page'); 
ta['ca-nstab-user'] = new Array('c','View the user page'); 
ta['ca-nstab-media'] = new Array('c','View the media page'); 
ta['ca-nstab-special'] = new Array('','This is a special page; you can\'t edit the page itself.'); 
ta['ca-nstab-wp'] = new Array('c','View the project page'); 
ta['ca-nstab-image'] = new Array('c','View the image page'); 
ta['ca-nstab-mediawiki'] = new Array('c','View the system message'); 
ta['ca-nstab-template'] = new Array('c','View the template'); 
ta['ca-nstab-help'] = new Array('c','View the help page'); 
ta['ca-nstab-category'] = new Array('c','View the category page');

//********************************************************************************
// Start "Hidden appearances section/interactive tree" script; by [[User:Bp]]
//********************************************************************************
function toggleAppearancesPane(eid) {
	e = document.getElementById(eid);
	if (e) { e.className = (e.className == "hiddenlist") ? "visiblelist" : "hiddenlist"; }
}

function showAppearancesPane(eid) {
	e = document.getElementById(eid);
	if (e) { e.className = "visiblelist"; }
}

function hideAppearancesPane(eid) {
	e = document.getElementById(eid);
	if (e) { e.className = "hiddenlist"; }
}
// -----

var tree = 0;
var pane = 0;
var paneListForThisTree = new Array();
var descriptionString = new String("This list contains %d items."); //%d is where the number of items is inserted

var smallTreeCount = 8; // less leaves than this, the tree will be open at first
var interactiveTrees = 1; // set this to 0 in user.js to turn this off

function button(text,onclick,cls) {
	var b = document.createElement('a');
	b.innerHTML = text;
	b.href="javascript:"+onclick;
	b.className = cls;
	return b;
}

function recursiveCountAndMark(e, depth, nocount) {
	var si = e.firstChild;
	var total = 0;
	while(si) {
		var tn = (si.tagName) ? si.tagName.toLowerCase() : '';
		if (tn == "li") { total++; }
		var subtotal = recursiveCountAndMark(si, depth+1, nocount);
		if (tn == "ul" || tn == "ol") {
			if (depth > 1) {
				si.id = "Pane" + pane++;
				paneListForThisTree.push(si.id);
				si.className = "hiddenlist";

				si.parentNode.insertBefore(document.createTextNode('('), si);
				si.parentNode.insertBefore(button( (nocount) ? "+/-" : subtotal, "toggleAppearancesPane(\""+si.id+"\")", "listexpand"), si);
				si.parentNode.insertBefore(document.createTextNode(')'), si);
				total--; // don't count the li that this ul/ol is in
			} else {
				// we are finished and this is the top ul/ol
				if (subtotal < smallTreeCount) { // this small enough they can be visible right away
					for (var i=0;i<paneListForThisTree.length;i++) {
						toggleAppearancesPane(paneListForThisTree[i]);
					}
				}
				var allonexec = '{';
				var alloffexec = '{';
				for (var i=0;i<paneListForThisTree.length;i++) {
					allonexec += "showAppearancesPane(\""+paneListForThisTree[i]+"\"); ";
					alloffexec += "hideAppearancesPane(\""+paneListForThisTree[i]+"\"); ";
				}
				allonexec += '}'; alloffexec += '}';

			        var ds = (nocount) ? "" : descriptionString.replace(/\%d/g, subtotal);
				si.parentNode.insertBefore(document.createTextNode(ds + ' ('), si);
				si.parentNode.insertBefore(button("show all", allonexec, "listexpand"), si);
				si.parentNode.insertBefore(document.createTextNode(' | '), si);
				si.parentNode.insertBefore(button("hide all", alloffexec, "listexpand"), si);
				si.parentNode.insertBefore(document.createTextNode(')'), si);
			}
		}
		total += subtotal;
		si = si.nextSibling;
	}
	return total;
}

function doAppearancesTrees() {
	if (!interactiveTrees) { return; }

	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].className.match(/\bappear\b/)) {
			recursiveCountAndMark(divs[i], 0, (divs[i].className.match(/\bnocount\b/)) ? 1 : 0);
			paneListForThisTree = new Array();
			tree++;
		}
	}

	// fix a bug noticed by renegade54
	// jump to the named anchor again
	if (window.location.hash && tree > 0) {
		// still won't work 100% in safari and khtml
		if (navigator.userAgent.indexOf("MSIE") != -1) {
			window.location = window.location.hash; // -- causes Firefox to fire onload events
		} else {
			window.location.hash = window.location.hash;
		}
	}

}

hookEvent("load", doAppearancesTrees);
// End "Hidden Appearances section" script

//********************************************************************************
// Start "Interactive quotes" script; by [[User:Bp]]
//********************************************************************************
function speakerLabel(text) {
	var spkr = document.createElement('span');
	spkr.innerHTML = text + ": ";
	spkr.className = "speaker-label";
	return spkr;
}

function explicitQuoteOn(event, e) {
	var si = (e) ? e.firstChild : this.firstChild;
	while(si) {
		explicitQuoteOn(event, si);
		if (si.className == "dialogue-inside") {
			si.className = "dialogue-inside-highlight";
		} else if (si.className == "quoteline") {
			if (si.childNodes[0].className != "speaker-label") {
				if (si.title != '') {
					si.insertBefore(speakerLabel(si.title), si.childNodes[0]);
					si.title = '';
				}
			}
			if (si.childNodes[0].className == "speaker-label") {
				si.childNodes[0].style.display = "inline";
			}
		}
		si = si = si.nextSibling;
	}
}

function explicitQuoteOff(event, e) {
	var si = (e) ? e.firstChild : this.firstChild;
	while(si) {
		explicitQuoteOff(event, si);
		if (si.className == "dialogue-inside-highlight") {
			si.className = "dialogue-inside";
		} else if (si.className == "quoteline") {
			if (si.childNodes[0].className == "speaker-label") {
				si.childNodes[0].style.display = "none";
			}
		}
		si = si = si.nextSibling;
	}
}

var explicitQuotes = 0;

function doQuotes() {
	if (!explicitQuotes) { return; }

	var dumbevent;
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].className == 'dialogue') {
			if (explicitQuotes == 1) {
				divs[i].onmouseover = explicitQuoteOn;
				divs[i].onmouseout = explicitQuoteOff;
			} else {
				explicitQuoteOn(dumbevent, divs[i]);
			}
		}
	}
}

hookEvent("load", doQuotes);
// End "Interactive quotes" script

// Start "live search" script; by [[User:Bp]]
// findPos() function from http://www.quirksmode.org/js/findpos.html 
// -----
var searchDropDown = 1;
var showRedirects = 1;
var uppercaseFirstChar = 1;
var allPagesLink = "http://memory-alpha.org/en/wiki/Special:Prefixindex/";
var queryphpLink = "http://memory-alpha.org/en/query.php?what=allpages&aplimit=10&apnamespace=0&apfrom=";
var loadingHTML = "Loading...";
var searchToolsHTML = "<a class=\"searchListTools\" href=\"/en/wiki/Special:Allpages\" title=\"All pages\">All pages</a> | <a class=\"searchListTools\" href=\"/en/wiki/Special:Search\" title=\"Advanced Search\">Advanced Search</a>";

var qmethod = 1;  // 0 = special pages, 1 = query.php

var currentInputElement;
var allPagesFrame;
var searchListElement;
var tid;

function SubmitText(text) {
	currentInputElement.value = text;
	currentInputElement.form.submit();
}

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}

function makeSearchListItem(title,isRD) {
	if (isRD) {
		return "<li class=\"searchListItemRedirect\"" +
				"onmouseover=\"this.className = 'searchListItemRedirectHighlight';\"" +
				"onmouseout=\"this.className = 'searchListItemRedirect';\"" +
				"onclick=\"SubmitText(this.textContent);\"" +
				">" + title + "</li>";
	} else {
		return "<li class=\"searchListItem\"" +
				"onmouseover=\"this.className = 'searchListItemHighlight';\"" +
				"onmouseout=\"this.className = 'searchListItem';\"" +
				"onclick=\"SubmitText(this.textContent);\"" +
				">" + title + "</li>";
	}
}

function allPagesExtract(i,o) {
	var lc = 0;
	o.innerHTML = "";
	var links = allPagesFrame.contentDocument.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var ptn = (links[i].parentNode.tagName) ? links[i].parentNode.tagName.toLowerCase() : '';

		if ((ptn == "td" || ptn == "div") &&
			links[i].title != '' &&
			links[i].title == links[i].textContent &&
			(links[i].href.indexOf("/en/wiki/") >= 7)) {

			if (links[i].parentNode.className == "allpagesredirect") {
				if (showRedirects) {
					o.innerHTML += makeSearchListItem(links[i].textContent,1);
					if (++lc == 10) { break; }
				}
			} else {
				o.innerHTML += makeSearchListItem(links[i].textContent,0);
				if (++lc == 10) { break; }
			}
		}
	}
	o.innerHTML += "<li class=\"searchListTools\">" + searchToolsHTML + "</li>";
}

function allPagesExtract_queryphp_xmlfm(i,o) {
	var pre = allPagesFrame.contentDocument.getElementsByTagName("pre");
	if (pre.length < 1) return;

	var out = "";
	var title = "";
	var isRD = 0;
	var si = pre[0].firstChild;
	while(si) {
		var tn = (si.tagName) ? si.tagName.toLowerCase() : '';
		if (tn == "font") {
			switch (si.innerHTML) {
			case "&lt;title&gt;":
				si = si.nextSibling;
				title = si.data;
				break;
			case "&lt;redirect /&gt;":
				isRD = 1;
				break;
			case "&lt;page&gt;":
				if (title) { out += makeSearchListItem(title,isRD); }
				title = "";
				isRD = 0;
				break;
			}
		}
		si = si.nextSibling;
	}
	// add last one
	if (title) { out += makeSearchListItem(title,isRD);	}

	o.innerHTML = out + "<li class=\"searchListTools\">" + searchToolsHTML + "</li>";
}

function allPagesFrame_onLoad(e) {
	if (qmethod == 1) {
		allPagesExtract_queryphp_xmlfm(allPagesFrame, searchListElement);
	} else {
		allPagesExtract(allPagesFrame, searchListElement);
	}
}

function hookSearchInput() {
	var fone = 0;

	if (!searchDropDown) { return; }

	var iboxes = document.getElementsByTagName("input");
	for (var i = 0; i < iboxes.length; i++) {
		if (iboxes[i].className == 'bodySearchIput') {
			iboxes[i].onkeypress = requestUpdate;
			iboxes[i].onblur = requestHideSearchList;
			fone = 1;
		}
	}

	if (fone) {
		allPagesFrame = document.createElement("iframe");
		searchListElement = document.createElement("ul");

		allPagesFrame.onload = allPagesFrame_onLoad;
		allPagesFrame.frameBorder = 0;
		allPagesFrame.width = 0;
		allPagesFrame.height = 0;

		searchListElement.className = "searchList";
		searchListElement.style.zIndex = 99;
		searchListElement.style.display = "none";

		document.body.appendChild(allPagesFrame);
		document.body.appendChild(searchListElement);
	}

}

function searchUpdate() {
	tid = 0;

	if (uppercaseFirstChar) {
		var s = currentInputElement.value;
		if (s.length > 0)  {
			if (s.length == 1) {
				s = s.toUpperCase();
			} else {
				s = s.substr(0,1).toUpperCase() + s.substr(1,s.length-1);
			}
			currentInputElement.value = s;
		}
	}

	if (qmethod == 1) {
		allPagesFrame.src = queryphpLink + escape(currentInputElement.value) + ((showRedirects) ? "" : "&apfilterredir=nonredirects");
	} else {
		allPagesFrame.src = allPagesLink + escape(currentInputElement.value);
	}
}

function requestUpdate(e) {

	//move the box to the correct input element
	if (e.currentTarget != currentInputElement) {
		searchListElement.innerHTML = "<li class=\"searchListText\">" + loadingHTML + "</li>";
		searchListElement.innerHTML += "<li class=\"searchListTools\">" + searchToolsHTML + "</li>";
		window.clearTimeout(tid);
		tid = 0;
	};

	currentInputElement = e.currentTarget;

	var ibpos = findPos(currentInputElement);

	searchListElement.style.position = "absolute";
	searchListElement.style.top = + ibpos[1] + currentInputElement.offsetHeight + "px";
	searchListElement.style.left = + ibpos[0] + "px";
	searchListElement.style.width = (currentInputElement.offsetWidth + 30) + "px";

	if (!tid) {
		tid = window.setTimeout(searchUpdate, 500);
	}
	showSearchList();
}

function requestHideSearchList(e) {
	window.setTimeout(hideSearchList, 500);
}

function hideSearchList() {
	searchListElement.style.display = "none";
}

function showSearchList() {
	searchListElement.style.display = "block";
}

hookEvent("load", hookSearchInput);


/*
</nowiki></pre>
*/