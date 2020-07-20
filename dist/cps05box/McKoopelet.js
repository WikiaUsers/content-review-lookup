/* ========================================================== *\
	# to-do list
\* ========================================================== */

/*
	1. add images as the control buttons of dot2dot and use a soft and consistent fill color
	2. maybe add a free draw option?
	3. regain former features from mckoopelet and make them match the new Game design

*/

/* ========================================================== *\
	# core
\* ========================================================== */

/* global valiables */
var Games = {};
Games.arcade = {};
Games.cssForLoadedGames = {};

/* global functions */
Games.apply = function(node) {
	var game = $(node).attr("data-game"),
		properties = {},
		a = $(node).attr("data-game-props").split("|");
	for (var i in a) {
		var b = a[i].split("=");
		if (b[0].length > 0 && b[1].length > 0) {
			properties[b[0]] = b[1];
		}
	}
	Games.arcade[game].apply(node, properties);
}

/* ========================================================== *\
	# game: dot2dot
\* ========================================================== */

/* main objects */
Games.arcade.dot2dot = {};
Games.arcade.dot2dot.fn = {};

Games.arcade.dot2dot = {
	themes: {}, // object, sorting games by a key name
	coorRad: 4, // radius of coordinates
	fn: {} // regular local functions
}

/* themes */
// camera
Games.arcade.dot2dot.themes.camera = {
	name: "camera", // identifying name
	label: "Camera", // a label for the interface
	image: "https://images.wikia.nocookie.net/clubpenguin/images/thumb/b/b5/Camera_pin.png/320px-Camera_pin.png",
	coor: [
		"59,182",
		"100,137",
		"197,135",
		"198,18",
		"296,19",
		"296,136",
		"336,179",
		"335,351",
		"290,352",
		"264,377",
		"213,374",
		"196,356",
		"69,351"
	] // maybe add difficulty + use an array for each coor?
};
// square
Games.arcade.dot2dot.themes.square = {
	name: "square", // identifying name
	label: "Some random square", // a label for the interface
	image: "https://images.wikia.nocookie.net/clubpenguin/images/thumb/6/6e/Snowflakes_Background_2014.png/320px-Snowflakes_Background_2014.png",
	coor: [
		"40,40",
		"360,40",
		"360,360",
		"40,360"
	]
}




/* the apply() function */

Games.arcade.dot2dot.apply = function(node, props) {
	var dot2dot = Games.arcade.dot2dot;
	if (typeof dot2dot.themes[props.name] === "object") {
		// the passed name represents an existing theme
		var theme = dot2dot.themes[props.name];
	} else {
		// no such theme - randomize
		var theme = dot2dot.themes[
			Object.keys(dot2dot.themes)[
				Math.floor(Object.keys(dot2dot.themes).length * Math.random())
			]
		];
	}
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
	window.svg = svg;
	svg.setAttributeNS(null, "class", "dot2dot");
	svg.appendChild(image);
	$(node).replaceWith(svg);
	dot2dot.fn.loadImage(svg, theme.image);
	$(svg).data(theme);
	$(svg).data("curr", 1);
	$(svg).data().coor.forEach(function(coor, i) {
		var pos = [Number(coor.split(",")[0]), Number(coor.split(",")[1])],
			g = document.createElementNS("http://www.w3.org/2000/svg", "g"),
			circle = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
			text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		g.setAttribute("data-dot", (Number(i) + 1));
		circle.setAttribute("cx", pos[0]);
		circle.setAttribute("cy", pos[1]);
		circle.setAttribute("r", dot2dot.coorRad);
		text.setAttribute("x", pos[0]);
		text.setAttribute("y", pos[1] - 7);
		text.setAttribute("text-anchor", "middle");
		text.innerHTML = i + 1;
		$(g).append(circle);
		$(g).append(text);
		$(svg).append(g);
	});
	$(svg).find("g[data-dot] *").mouseover(function() {
		var svg = $(this).parents().eq(1),
			a = $(svg).data();
		if ($(this).parent().attr("data-dot") - 1 == a.curr) {
			var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
			line.setAttribute("x1", Number(a.coor[a.curr - 1].split(",")[0]));
			line.setAttribute("y1", Number(a.coor[a.curr - 1].split(",")[1]));
			line.setAttribute("x2", Number(a.coor[a.curr].split(",")[0]));
			line.setAttribute("y2", Number(a.coor[a.curr].split(",")[1]));
			$(svg).find("image").after(line);
			$(svg).data("curr", a.curr + 1);
			if ($(svg).find("line").length + 1 == a.coor.length) {
				setTimeout(function(){Games.arcade.dot2dot.fn.done(svg[0]);},50);
			}
		}
	});
	dot2dot.fn.addControls(svg);
	Games.arcade.dot2dot.fn.addCSS();
}

/* functions */

// add css
Games.arcade.dot2dot.fn.addCSS = function() {
	if (!Games.cssForLoadedGames.dot2dot) {
		mw.util.addCSS(
			'svg.dot2dot {\n' +
				'\tdisplay: block;\n' +
				'\twidth: 400px;\n' +
				'\theight: 400px;\n' +
				'\tmargin: auto;\n' +
				'\tborder: 1px solid #ccc;\n' +
			'}\n' +
			'svg.dot2dot image, svg.dot2dot[data-state="done"] g, svg.dot2dot[data-state="done"] line {\n' +
				'\topacity: 0;\n' +
				'\t-webkit-transition: opacity 1500ms linear 100ms;\n' +
				'\ttransition: opacity 1500ms linear 100ms;\n' +
			'}\n' +
			'svg.dot2dot image {\n' +
				'\t-webkit-transition-delay: 200ms;\n' +
				'\t-transition-delay: 200ms;\n' +
				'\t-webkit-transition-duration: 2s;\n' +
				'\t-transition-duration: 2s;\n' +
			'}\n' +
			'svg[data-state="done"] image {\n' +
				'\topacity: 1;\n' +
			'}\n' +
			'svg.dot2dot circle {\n' +
				'\tfill: #000;\n' +
			'}\n' +
			'svg.dot2dot line {\n' +
				'\tstroke: #222822;\n' +
				'\tstroke-width: 3;\n' +
				'\topacity: 0.5;\n' +
			'}\n' +
			'svg.dot2dot text {\n' +
				'\tfill: #333;\n' +
				'\tfont-size: 12px;\n' +
				'\tfont-weight: bold;\n' +
			'}\n' +
			'svg.dot2dot .dot2dot-control {\n' +
				'\tstroke: blue;\n' +
				'\tstroke-width: 1px;\n' +
				'\tcursor: hand;\n' +
				'\tcursor: pointer;\n' +
			'}'

		);
		Games.cssForLoadedGames.dot2dot = true;
	}
}

// load <image /> node
Games.arcade.dot2dot.fn.loadImage = function(svgElement, url) {
	var a = $(svgElement)[0].querySelector("image"),
		b = new Image();
	b.onload = function() {
		// fixed namespace attributes by undefined - StackOverflow - http://stackoverflow.com/questions/10261731/can-not-add-image-inside-svg-via-jquery-image-tag-becomes-img#answer-10262026
		a.setAttributeNS(null, "x", (400 - this.width) / 2);
		a.setAttributeNS(null, "y", (400 - this.height) / 2);
		a.setAttributeNS(null, "width", this.width + "px");
		a.setAttributeNS(null, "height", this.height + "px");
		a.setAttributeNS("http://www.w3.org/1999/xlink", "href", url);
	}
	b.setAttribute("src", url);
}

// add control buttons

Games.arcade.dot2dot.fn.addControls = function(svgElement) {
	// perhaps also add in the future a 
	var restart = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
		shuffle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	// restart properties
	restart.setAttributeNS(null, "class", "dot2dot-control");
	restart.setAttributeNS(null, "width", "12");
	restart.setAttributeNS(null, "height", "12");
	restart.setAttributeNS(null, "x", "376");
	restart.setAttributeNS(null, "y", "388");
	restart.style.fill = "red";
	// shuffle properties
	shuffle.setAttributeNS(null, "class", "dot2dot-control");
	shuffle.setAttributeNS(null, "width", "12");
	shuffle.setAttributeNS(null, "height", "12");
	shuffle.setAttributeNS(null, "x", "388");
	shuffle.setAttributeNS(null, "y", "388");
	shuffle.style.fill = "green";
	// insert and add events
	$(svgElement).append(restart);
	$(svgElement).append(shuffle);
	$(restart).click(function() {
		Games.arcade.dot2dot.apply(this.parentNode, {name: $(this).parent().data().name});
	});
	$(shuffle).click(function() {
		Games.arcade.dot2dot.apply(this.parentNode, {name: ""});
	});
}

// complete

Games.arcade.dot2dot.fn.done = function(svgElement) {
	$(svgElement).attr("data-state", "done");
}


/* ========================================================== *\
	# apply on each
\* ========================================================== */

// $("#mw-content-text").prepend('<span class="wikigame" data-game="dot2dot" data-game-props="name=caaaamera"></span>'); // DEBUGGING !!!!!!!!! AHHH!! $&*^()^%^%#@&@@@^ I WANT YOUR ATTENTION!!!!!
// ^ debugging for dot2dot


$(".wikigame[data-game][data-game-props]").each(function() {
	Games.apply(this);
});