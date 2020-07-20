/*!
 * Snowstorm.js by User:Mathmagician
 * 
 * window.Snowstorm
 *        Snowstorm.stop()        - stops the snow
 *        Snowstorm.start()       - starts snowing
 *        Snowstorm.setRegions(7) - sets the number of regions to 7
 * 
 * Each layer (vertically) has a certain number of regions (horizontally)
 * A new layer is created every 400-1100 milliseconds with 1 snowflake per region
 * 
 * Copyright (c) Jeff Bradford, 2012
 */
 /*jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true */
(function ($, window, document, Math) {
	"use strict";

	var _container,
		_layer,
		_active = false,
		_regions = 6,
		_windCounter = -1,
		_windDrift;

	// returns a random number between lowerBound (inclusive) and upperBound (exclusive)
	function getRandomNum(lowerBound, upperBound) {
		return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
	}

	// creates a single snowflake at coordinate (x, y) inside the current layer
	function createSnowflake(x, y) {
		var snowflake = document.createElement("div");
		snowflake.setAttribute("style", "border-radius:6px; width:4px; height:4px; background-color:#FFFFFF; position:absolute; left:" + x + "px; top:" + y + "px;");
		_layer.appendChild(snowflake);
	}

	// starts one layer of snow
	// this function calls itself via setTimeout to create a lasting snow storm
	function snow() {
		var $window = $(window),
			width = $window.width(),
			height = $window.height() - 35,
			portion = Math.floor(width / _regions),
			i = -1;

		// create a new layer
		_layer = document.createElement('div');
		_layer.setAttribute('style', 'position:fixed; top:0; left:0; opacity:1;');

		// recalcuate wind when _windCounter hits 20
		if (++_windCounter === 20) {
			_windDrift = getRandomNum(-300, 300);
			_windCounter = -1;
		}

		// snowflakes generated in on-screen regions
		while (++i < _regions) {
			createSnowflake(getRandomNum(i * portion, (i + 1) * portion), getRandomNum(0, 20));
		}

		// create one extra region off the side of the screen
		if (_windDrift < -50) {
			createSnowflake(getRandomNum(width, width + portion), getRandomNum(0, 20));
		} else if (_windDrift > 50) {
			createSnowflake(getRandomNum(-portion, 0), getRandomNum(0, 20));
		}

		// add the layer to the main container and animate it
		_container.appendChild(_layer);
		$(_layer).animate({
			top: '+=' + height,
			left: _windDrift < 0 ? '-=' + -_windDrift : '+=' + _windDrift,
			opacity: '.7'
		}, height * 10, 'linear', function () {
			$(this).remove();
		});

		// loop snow() after a certain amount of time to create the next layer
		if (_active) {
			setTimeout(snow, getRandomNum(400, 1100));
		}
	}

	// expose public interface
	window.Snowstorm = {
		stop: function () {
			_active = false;
		},
		start: function () {
			// remove container if it's present
			var con = document.getElementById('Snowstorm-container');
			if (con) {
				con.parentNode.removeChild(con);
			}

			// insert container and begin snowing
			if (!_active || !con) {
				_active = true;
				_container = document.createElement('div');
				_container.setAttribute('id', 'Snowstorm-container');
				document.documentElement.appendChild(_container);
				snow();
			}
		},
		setRegions: function (num) {
			if (typeof num === 'number') {
				_regions = num;
			}
		}
	};

	// start snowing
	$(window.Snowstorm.start);
}(jQuery, window, document, window.Math));