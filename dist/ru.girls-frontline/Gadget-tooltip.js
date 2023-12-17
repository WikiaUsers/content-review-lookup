/**
 * Tooltip.js
 * A basic script that applies a mouseover tooltip functionality to all elements of a page that have a data-tooltip attribute
 * Matthias Schuetz, http://matthiasschuetz.com
 *
 * Copyright (C) Matthias Schuetz
 * Free to use under the MIT license
 * 
 * --------
 * 
 * This is a modified version not using text but spans inside so I can display some more complex nodes.
 */

if (!window.tooltipEngine) {
	window.tooltipEngine = {};

	window.tooltipEngine._options = {
		tooltipId: "tooltip",
		offsetDefault: 15
	};

	window.tooltipEngine._tooltips = [];
	window.tooltipEngine._tooltipsTemp = null;

	window.tooltipEngine._bindTooltips = function(resetTooltips) {
		console.log("Booting up tooltips.");
		
		if (resetTooltips) {
			window.tooltipEngine._tooltipsTemp = window.tooltipEngine._tooltips.concat();
			window.tooltipEngine._tooltips = [];
		}
		
		var tooltippedElements = document.querySelectorAll("[data-tooltip]");
		console.log("Tooltip element count: ", tooltippedElements.length);

		Array.prototype.forEach.call(tooltippedElements, function(elm, idx) {
			var tooltipText = null;
			var contents = elm.getElementsByClassName("tooltip-content");
			if (contents.length > 0) {
				tooltipText = contents[0];
				$(contents[0]).removeClass("uninitialized");
				elm.removeChild(contents[0]);
				console.log("Tooltip set up for", elm);
			} else {
				console.log("No content found for tooltipped element:", elm);
			}
			var options;

			if (resetTooltips && window.tooltipEngine._tooltipsTemp.length && window.tooltipEngine._tooltipsTemp[idx] && window.tooltipEngine._tooltipsTemp[idx].text) {
				if (tooltipText.length === 0) {
					tooltipText = _tooltipsTemp[idx].text;
				}

				elm.removeEventListener("mousemove", window.tooltipEngine._onElementMouseMove);
				elm.removeEventListener("mouseout", window.tooltipEngine._onElementMouseOut);
				elm.removeEventListener("mouseover", window.tooltipEngine._onElementMouseOver);
			}

			if (tooltipText) {
				elm.setAttribute("data-tooltip-id", idx);
				options = window.tooltipEngine._parseOptions(elm.getAttribute("data-tooltip"));
				
				window.tooltipEngine._tooltips[idx] = {
					text: tooltipText,
					options: options
				};

				elm.addEventListener("mousemove", window.tooltipEngine._onElementMouseMove);
				elm.addEventListener("mouseout", window.tooltipEngine._onElementMouseOut);
				elm.addEventListener("mouseover", window.tooltipEngine._onElementMouseOver);
			}
		});

		if (resetTooltips) {
			window.tooltipEngine._tooltipsTemp = null;
		}
	};

	window.tooltipEngine._createTooltip = function(text, tooltipId) {
		var tooltipElm = document.createElement("div");
		var tooltipText = text;
		var options = tooltipId && window.tooltipEngine._tooltips[tooltipId] && window.tooltipEngine._tooltips[tooltipId].options;

		if (options && options["class"]) {
			tooltipElm.setAttribute("class", options["class"]);
		}

		tooltipElm.setAttribute("id", window.tooltipEngine._options.tooltipId);
		tooltipElm.appendChild(tooltipText);

		document.querySelector("body").appendChild(tooltipElm);
	};

	window.tooltipEngine._getTooltipElm = function() {
		return document.querySelector("#" + window.tooltipEngine._options.tooltipId);
	};

	window.tooltipEngine._onElementMouseMove = function(evt) {
		var tooltipId = this.getAttribute("data-tooltip-id");
		var tooltipElm = window.tooltipEngine._getTooltipElm();
		var options = tooltipId && window.tooltipEngine._tooltips[tooltipId] && window.tooltipEngine._tooltips[tooltipId].options;
		var offset = options && options.offset || window.tooltipEngine._options.offsetDefault;
		var scrollY = window.scrollY || window.pageYOffset;
		var scrollX = window.scrollX || window.pageXOffset;
		var tooltipTop = evt.pageY + offset;
		var tooltipLeft = evt.pageX + offset;

		if (tooltipElm) {
			tooltipTop = (tooltipTop - scrollY + tooltipElm.offsetHeight + 20 >= window.innerHeight ? (tooltipTop - tooltipElm.offsetHeight - 20) : tooltipTop);
			tooltipLeft = (tooltipLeft - scrollX + tooltipElm.offsetWidth + 20 >= window.innerWidth ? (tooltipLeft - tooltipElm.offsetWidth - 20) : tooltipLeft);

			tooltipElm.style.top = tooltipTop + "px";
			tooltipElm.style.left = tooltipLeft + "px";
		}
	};

	window.tooltipEngine._onElementMouseOut = function(evt) {
		var tooltipElm = window.tooltipEngine._getTooltipElm();

		if (tooltipElm) {
			document.querySelector("body").removeChild(tooltipElm);
		}
	};

	window.tooltipEngine._onElementMouseOver = function(evt) {
		var tooltipId = this.getAttribute("data-tooltip-id");
		var tooltipText = tooltipId && window.tooltipEngine._tooltips[tooltipId] && window.tooltipEngine._tooltips[tooltipId].text;

		if (tooltipText) {
			window.tooltipEngine._createTooltip(tooltipText, tooltipId);	
		}
	};

	window.tooltipEngine._parseOptions = function(options) {
		var optionsObj;

		if (options.length) {
			try {
				optionsObj = JSON.parse(options.replace(/'/ig, "\""));
			} catch(err) {
				console.log(err);
			}
		}

		return optionsObj;
	};
}

RLQ.push(['jquery', function () {
  $(document).ready(function() {
	console.log("Loading tooltips...");
  	window.tooltipEngine._bindTooltips();
  });
}]);