/* Any JavaScript here will be loaded for all users on every page load. */
// Start "Hidden appearances section/interactive tree" script; by [[User:Bp]]
// -----
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