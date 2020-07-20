//This script may be identical to Pin.js under the same folder but this one is for the options menu.
/* "!pin" command for chat */
/*
	in order to operate, add in a new line the following string:
	!pin
*/
/*
	no parrots were harmed during the creation, testing and launch of	
	this feature
*/
 
 
/* main objects */
Widget = window.Widget || {};
Widget.pin = {};
Widget.pin.data = {};
Widget.pin.fn = {};
 
 
/* data */
// whether or not a track request has already been executed
Widget.pin.data.activated = false;
 
// container element for dynamic content
Widget.pin.data.container = null;
 
/* functions */
// tracking trigger
Widget.pin.fn.track = function() {
	if (!Widget.pin.data.activated) {
		Widget.pin.fn.addInterface();
	}
	$("#pintrack-wrapper").css("display", "flex");
	$(Widget.pin.data.container).html("Loading...");
	Widget.pin.fn.getResources();
}
 
// insert interface markup
Widget.pin.fn.addInterface = function() {
	Widget.pin.fn.addCSS();
	var markup = $(
		'<section id="pintrack-wrapper">\n' +
			'\t<div id="pintrack">\n' +
				'\t\t<h3>\n' +
					'\t\t\tPin Location\n' +
					'\t\t\t<span id="pintrack-close"></span>\n' +
				'\t\t</h3>\n' +
				'\t\t<nav id="pintrack-container"></nav>\n' +
				'\t\t<p>\n' +
					'\t\t\tFor a detailed list of <a href="/wiki/Pin" title="Pin" target="_new">pins</a>, see <a href="/wiki/List_of_Pins" title="List of Pins" target="_new">List of Pins</a>.\n' +
				'\t\t</p>\n' +
			'\t</div>\n' +
		'</section>'
	);
	$("body").append(markup);
	Widget.pin.data.container = $("#pintrack-container");
	$("#pintrack-close").click(function() {
		$("#pintrack-wrapper").hide();
	});
}
 
// add css
Widget.pin.fn.addCSS = function() {
	mw.util.addCSS(
		'#pintrack-wrapper {\n' +
			'\tdisplay: none;\n' +
			'\twidth: 100%;\n' +
			'\theight: 100%;\n' +
			'\tposition: fixed;\n' +
			'\ttop: 0;\n' +
			'\tleft: 0;\n' +
			'\tjustify-content: center;\n' +
			'\talign-items: center;\n' +
			'\tbackground: rgba(255, 255, 255, 0.65);\n' +
		'}\n' +
		'#pintrack {\n' +
			'\twidth: 270px;\n' +
			'\tpadding: 3px;\n' +
			'\tbackground: #f6f6f6;\n' +
			'\tbackground: linear-gradient(to bottom, #fff 0%, #F6F6F6 47%, #ededed 100%);\n' +
			'\tborder: 1px solid #ccc;\n' +
			'\tborder-radius: 10px;\n' +
		'}\n' +
		'#pintrack h3 {\n' +
			'\tposition: relative;\n' +
			'\tmargin: 0px;\n' +
			'\tfont-size: 16px;\n' +
			'\tfont-weight: bold;\n' +
			'\ttext-align: center;\n' +
		'}\n' +
		'#pintrack h3 span {\n' +
			'\tdisplay: inline-block;\n' +
			'\twidth: 12px;\n' +
			'\theight: 12px;\n' +
			'\tposition: absolute;\n' +
			'\ttop: 2px;\n' +
			'\tright: 2px;\n' +
			'\tbackground-color: #eee;\n' +
			'\tbackground-image: url(\'https://images.wikia.nocookie.net/clubpenguin/images/thumb/archive/8/87/20130201113045%21Bait_Item.svg/10px-Bait_Item.svg.png\');\n' +
			'\tbackground-position: center;\n' +
			'\tbackground-repeat: no-repeat;\n' +
			'\tborder: 1px solid #bbb;\n' +
			'\tborder-radius: 3px;\n' +
			'\tcursor: pointer;\n' +
		'}' +
		'#pintrack svg {\n' +
			'\tdisplay: block;\n' +
			'\tmargin: 0 auto 3px auto;\n' +
		'}'
	);
}
 
// generate markup for the pin, location and the room image
Widget.pin.fn.addPinNode = function(roomUrl, imageUrl, pinData) {
	console.log(arguments);
	var output = $('<div style="margin: auto;" />'),
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
		pinName = pinData.name.replace(/ pin$/i, "") + " Pin";
	output.html(
		'<span style="font-weight: bold;">Pin:</span> <a href="' + mw.util.getUrl(pinName) + '" target="_new">' + pinName + '</a><br />' +
		'<span style="font-weight: bold;">Room:</span> <a href="' + roomUrl + '" target="_new">' + pinData.room + '<a><br />'
	);
	svg.setAttributeNS(null, "width", 200);
	svg.setAttributeNS(null, "height", 126);
	var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs"),
		radialGradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient"),
		stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop"),
		stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
	radialGradient.setAttributeNS(null, "id", "chatwidget-pintracker-svg-grad");
	radialGradient.appendChild(stop1);
	radialGradient.appendChild(stop2);
	stop1.setAttributeNS(null, "offset", "0%");
	stop1.setAttributeNS(null, "stop-color", "rgba(50, 255, 50, 1)");
	stop2.setAttributeNS(null, "offset", "100%");
	stop2.setAttributeNS(null, "stop-color", "rgba(50, 255, 50, 0.2)");
	defs.appendChild(radialGradient);
	svg.appendChild(defs);
	var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
	image.setAttributeNS(null, "x", 0);
	image.setAttributeNS(null, "y", 0);
	image.setAttributeNS(null, "width", "200px");
	image.setAttributeNS(null, "height", "126px");
	image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", imageUrl);
	svg.appendChild(image);
	var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	circle.setAttributeNS(null, "transform", "translate(" + Math.round(pinData.x / 3.8) + ", " + Math.round(pinData.y / 3.8) + ")");
	circle.setAttributeNS(null, "r", 4);
	circle.setAttributeNS(null, "fill", "url(#chatwidget-pintracker-svg-grad)");
	circle.setAttributeNS(null, "style", "stroke: rgba(255, 128, 255, 0.65); stroke-width: 1;");
	svg.appendChild(circle);
	var animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
	animate.setAttributeNS(null, "attributeType", "xml");
	animate.setAttributeNS(null, "attributeName", "r");
	animate.setAttributeNS(null, "from", "4");
	animate.setAttributeNS(null, "to", "8");
	animate.setAttributeNS(null, "dur", "800ms");
	animate.setAttributeNS(null, "repeatCount", "indefinite");
	circle.appendChild(animate);
	var circle2 = circle.cloneNode(true);
	circle2.setAttributeNS(null, "r", 2);
	circle2.children[0].setAttributeNS(null, "from", 2);
	circle2.children[0].setAttributeNS(null, "to", 4);
	svg.appendChild(circle2);
	output.append(svg);
	$(Widget.pin.data.container).append(output);
}
 
// get crucial resources for tracking
Widget.pin.fn.getResources = function() {
	$cp.json.multi([
		{file: "paper_items"},
		{file: "rooms"}
	], function() {
		var data = {
				paper: $cp.json.val.en.paper_items,
				rooms: $cp.json.val.en.rooms
			},
			exceptionNames = {
				"Night Club": "Dance Club",
				"Lake": "Hidden Lake",
				"The Dock": "Dock"
			},
			pins = [],
			rooms = [];
		for (var i in data.rooms) {
			if (data.rooms[i].hasOwnProperty("pin_id")) {
				var a = data.rooms[i];
				pins.push({
					room: a.name,
					id: a.pin_id,
					x: a.pin_x,
					y: a.pin_y
				});
			}
		}
		if (pins.length > 0) {
			for (var i in pins) {
				// add name
				for (var j in data.paper) {
					if (data.paper[j].paper_item_id == pins[i].id) {
						pins[i].name = data.paper[j].label;
						break;
					}
				}
				// change room name if the wiki article name is different
				if (exceptionNames.hasOwnProperty(pins[i].room)) {
					pins[i].room = exceptionNames[pins[i].room];
				}
				rooms.push(pins[i].room.replace(/ /g, "+"));
			}
			console.info(pins);
			console.log(pins, rooms);
			$.getJSON("/api/v1/Articles/Details?ids=-1&titles=" + rooms.join(",") + "&abstract=100&width=200&height=126" +  + "&cb=" + new Date().getTime(), function(data1) {
				var currPinIndex = 0;
				$(Widget.pin.data.container).html(""); // blank container
				for (var i in data1.items) {
					var a = data1.items[i];
					console.log(a);
					Widget.pin.fn.addPinNode(a.url, a.thumbnail, pins[currPinIndex]); // $.thumbUrl2ThumbUrl(a.thumbnail, null, 200, 126)
					currPinIndex++;
				}
			});
		} else {
			$(Widget.pin.data.container).html("sorry :( no pin could be found");
		}
	});
}
 
/* events */
//Button
if( !$("#pinTrackerButton").length ) {
  $('form#Write').append('<a class="wikia-button" href="#" id="pinTrackeButton" style="position:absolute; right:47px; top:0px;">Pin</a>');
}
$("#pinTrackeButton").click(Widget.pin.fn.track);
 
console.log("[OPTIONS] Pin Tracker: Loaded");