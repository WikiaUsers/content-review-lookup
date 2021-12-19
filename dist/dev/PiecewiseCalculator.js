// @author: [[w:c:dev:User:DutyS12345]]
// <pre>
(function (window, $, mw) {
	'use strict';
	// Load Protection
	if (window.piecewiseCalculator) return;
	window.piecewiseCalculator = true;
	
	function generateOnChange($this, coords, first, last){
		function calc(value){
			var val = Number(value);
			if (!val) return null;
			if (first && val < coords[0][0]) {
				return ((coords[1][1] - coords[0][1]) * (val - coords[0][0]) / (coords[1][0] - coords[0][0])) + coords[0][1];
			}
			// var lastCoords = coords.length - 1;
			if (last && val > coords[coords.length - 1][0]) {
				return ((coords[coords.length - 1][1] - coords[coords.length - 2][1]) * (val - coords[coords.length - 2][0]) / (coords[coords.length - 1][0] - coords[coords.length - 2][0])) + coords[coords.length - 2][1];
			}
			if (val === coords[coords.length - 1][0]) {
				return coords[coords.length - 1][1];
			}
			for(var i = 0; i < coords.length - 1; i++) {
				if (val === coords[i][0]) {
					return coords[i][1];
				} else if (val > coords[i][0] && val < coords[i + 1][0]) {
					return ((coords[i + 1][1] - coords[i][1]) * (val - coords[i][0]) / (coords[i + 1][0] - coords[i][0])) + coords[i][1];
				}
			}
			return null;
		}
		return function (value) {
			var val = calc(value);
			if (val !== null) {
				$this.find('.piecewise-calc-result').text(val);
			} else {
				$this.find('.piecewise-calc-result').text('N/A');
			}
		};
	}
	function invalidInit($elem) {
		$elem.empty();
		$elem.append($('<p>').text('Invalid Initialization Values'));
	}
	function validateValues(coords) {
		if(coords.length < 2) return false;
		for(var i = 0; i < coords.length - 1; i++){
			if (coords[i][0] >= coords[i + 1][0]) {
				return false;
			}
		}
		return true;
	}
	function initEach() {
		var $this = $(this).addClass('piecewise-calc-initialized');
		var values = $this.data('values').split(';');
		var	first = null;
		var	last = false;
		var coords = [];
		for (var i = 0; i < values.length; i++) {
			var coord = values[i];
			if (coord === '') {
			} else if (first === null && coord === 'inf') {
				first = true;
			} else if (!last && coord === 'inf'){
				last = true;
			} else {
				var pair = coord.split(',');
				if (pair.length !== 2){
					invalidInit($this);
					return;
				}
				var x = pair[0].trim();
				var y = pair[1].trim();
				if (x === '' || y === '' || isNaN(x) || isNaN(y)) {
					invalidInit($this);
					return;
				}
				coords.push([Number(x), Number(y)]);
				if (first === null) first = false;
				last = false;
			}
		}
		if (!validateValues(coords)) invalidInit($this);
		var onChange = generateOnChange($this, coords, first, last);
		mw.loader.using('oojs-ui-core').then(function(){
			var numberInput = new OO.ui.NumberInputWidget( { 
				value: 'Number Input',
				showButtons: false,
			} ).on('change', onChange);
			var numberInputOptions = {
				align: 'top',
				classes: ['piecewise-calc-input'],
			};
			var textOutput = new OO.ui.Widget( {
				content: [$('<div>').addClass('piecewise-calc-result').text('N/A')]
			} );
			var textOutputOptions = {
				align: 'top',
				classes: ['piecewise-calc-output'],
			};
			var xlabel = $this.data('xlabel');
			var ylabel = $this.data('ylabel');
			if (xlabel && xlabel !== '') {
				numberInputOptions.label = xlabel;
			} else if (ylabel && ylabel !== '') {
				numberInputOptions.label = ' ';
			}
			if (ylabel && ylabel !== '') {
				textOutputOptions.label = ylabel;
			} else if (xlabel && xlabel !== '') {
				textOutputOptions.label = ' ';
			}
			var fieldsetOptions = {};
			var title = $this.data('title');
			if (title && title !== '') {
				fieldsetOptions.label = title;
			}
			var fieldset = new OO.ui.FieldsetLayout( fieldsetOptions );
			fieldset.addItems([
				new OO.ui.HorizontalLayout( {
					items: [
						new OO.ui.FieldLayout( numberInput , numberInputOptions ),
						new OO.ui.FieldLayout( textOutput , textOutputOptions ),
					]
				} )
			]);
			$this.append( fieldset.$element );
		});
	}
	function init() {
		$('.piecewise-calc:not(.piecewise-calc-initialized)').each(initEach);
	}
	mw.hook('wikipage.content').add(init);
})(this, jQuery, mediaWiki);
// </pre>