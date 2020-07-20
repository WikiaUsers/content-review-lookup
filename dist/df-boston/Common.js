/* Any JavaScript here will be loaded for all users on every page load. */

var allSels, thisSel;
allSels = document.evaluate(
    '//pre[@class="selthis"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSels.snapshotLength; i++) {
    allSels.snapshotItem(i).setAttribute("onClick", "this.innerHTML.select();");
}

// For the Gaming Calendar page.
function makeDate(p) {
	var d = new Date();
	if (p == 'n') {
		s = new Date(addDate(d, 1));
		while(s.getDay() > 0) {
			s = new Date(addDate(s, 1));
		}
		d = s;
	}
	var n = d.getFullYear() + "-";
	var t = "00" + (d.getMonth() + 1);
	n += t.substr(-2) + '-';
	var t = "00" + d.getDate();
	n += t.substr(-2);
	return n;
}
function addDate(dt, nd) {
	dt.setDate(dt.getDate() + nd);
	return dt.toLocaleDateString();
}

if(document.getElementById("curdate")) {
	document.getElementById("curdate").innerHTML = makeDate('c');
	document.getElementById("nextsun").innerHTML = makeDate('n');
	var allTbls = document.evaluate('//table[@class="datable"]/*/tr',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	// Set to 1 because !title-row.
	for (var x = 1; x < allTbls.snapshotLength; x++) {
		var tmp = allTbls.snapshotItem(x);
		var theDate = tmp.childNodes[1].innerHTML;
		theDate = theDate.replace(/ /g, "");
		var patt = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
		var rez = patt.exec(theDate);
		if (rez) {
			var bar = new Date(rez[1], parseInt(rez[2], 10) - 1, rez[3], 12, 0, 0, 0);
			if (bar.getDay() > 0) {
				tmp.childNodes[1].innerHTML += "*";
			}
		}
	}
	// Iowa Hawkeyes.
	var newCal = "<iframe src=\"http://www.google.com/calendar/embed?title=US%20Holidays&amp;mode=AGENDA&amp;height=330&amp;wkst=1&amp;src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America/Los_Angeles\" style=\"border: 0\" width=\"800\" height=\"600\" frameborder=\"0\" scrolling=\"no\"></iframe>";
	document.getElementById("gcal").innerHTML = newCal;
}

if(document.getElementById("gmap")) {
 var theData = document.getElementById("gmap").innerHTML;
 var theURL = "http://maps.google.com/maps/api/staticmap?center=";
 theData = theData.split(/ -- /gi);
 theURL += theData[0].replace(/ /gi, '+');
 theURL += "&zoom=14&size=256x256&maptype=roadmap&sensor=false&markers=color:blue|";
 theURL += theData[1];
 var newImg = document.createElement("img");
 newImg.setAttribute("src", theURL);
 document.getElementById("gmap").parentNode.replaceChild(newImg, document.getElementById("gmap"));
}