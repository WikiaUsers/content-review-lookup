 $(function () {

	var Strings = {
		ToggleAll: 'Tout afficher/masquer',
		ToggleCaves: 'Afficher/masquer les grottes',
	};

	function setVisibility($map, type, on) {
		if (on) {
			$map.removeClass('hide-' + type);
		} else {
			$map.addClass('hide-' + type);
		}
	}

	function tryGuardCssValue(test) {
		return (test && /^([\w-]+|\d+px \w+ (#[0-9a-fA-F]{2,6}|\w+)|#[0-9a-fA-F]{2,6}|\d+)$/.test(test)) ? test : null;
	}

	var GeneratedCssMarkerTypes = {};

	// Make the map legend interactive.
	$('.data-map-container').each(function () {
		if (this._resourceMapInitialised) {
			return;
		}
		this._resourceMapInitialised = true;
		
		var $this = $(this);
		var $map = $this.find('.map-container');
		var $legendTable = $this.find('.map-legend');
		var baseId = $this.attr('id');
	var hasCaveMarkers = $map.find('.dots.cave').length > 0;
	
	// Create checkboxes for toggles, which can't be prerendered with wikitext.
	// Caves:
	var toggleCavesCheckboxId = baseId + '-toggle-cave';
	if (hasCaveMarkers) {
		$legendTable.prepend('<tr class="no-icon"><td colspan=2><input type="checkbox" id="'+toggleCavesCheckboxId+'" class="toggle-cave" checked>'
						   + '<label for="'+toggleCavesCheckboxId+'">'+Strings.ToggleCaves+'</label></td></tr>');
	}
	// All:
	var toggleAllCheckboxId = baseId + '-toggle-all';
	$legendTable.prepend('<tr class="no-icon"><td colspan=2><input type="checkbox" id="'+toggleAllCheckboxId+'" class="toggle-all" checked>'
						     + '<label for="'+toggleAllCheckboxId+'">'+Strings.ToggleAll+'</label></td></tr>');
		// Convert resource placeholders:
		$legendTable.find('td.map-legend-checkbox').each(function() {
			var nodeName = this.innerText;
			var nodeClass = this.dataset.markerName;
			var checkboxId = baseId + '-toggle-' + nodeClass;
			this.innerHTML = '<input type="checkbox" id="'+checkboxId+'" class="toggle-one" value="'+nodeClass+'" checked><label for="'+checkboxId+'">'+nodeName+'</label>';
		});
	
		// Assign change listeners to checkboxes
		$legendTable.on('change', 'input.toggle-one', function() {
			setVisibility($map, this.value, this.checked);
		});
		$('#' + toggleAllCheckboxId).on('click', function() {
			$legendTable.find('input.toggle-one').prop('checked', this.checked).each(function() {
				setVisibility($map, this.value, this.checked);
			});
		});
		 if (hasCaveMarkers) {
	    	$('#' + toggleCavesCheckboxId).on('click', function() {
		    	setVisibility($map, 'cave', this.checked);
		   });
		 }
		// Unhide elements that are hidden from view before scripts are loaded.
		$legendTable.find('.data-map-needs-js').each(function() {
			$(this).removeClass('data-map-needs-js');
		});

		// Generate CSS with marker styling (to save on manual maintenance work + CSS downloads everywhere).
		var $style = $('<style type="text/css">');
		var fragments = [];
		$legendTable.find('td.map-legend-checkbox').each(function() {
			var markerType = tryGuardCssValue(this.dataset.markerName);
			var markerColour = tryGuardCssValue(this.dataset.markerColor);
			var markerSize = tryGuardCssValue(this.dataset.markerSize);
			var markerBorder = tryGuardCssValue(this.dataset.markerBorder);

			if (markerType && !GeneratedCssMarkerTypes[markerType]) {
				fragments.push('.hide-' + markerType + ' .' + markerType + '{display:none}');

				if ((markerColour || markerSize || markerBorder)) {
					fragments.push('.map-legend .' + markerType + ',.' + markerType + '.dots > div{')
					if (markerColour) fragments.push('background-color:' + markerColour + ';');
					if (markerSize) fragments.push('width:'+markerSize+'px;height:'+markerSize+'px;');
					if (markerBorder) fragments.push('border:'+markerBorder+';');
					fragments.push('}')
					GeneratedCssMarkerTypes[markerType] = true;
				}
			}
		});
		 // Generate CSS for local marker icons if standardisation is impossible.
        var iconDefs = $legendTable.data('marker-icons');
        if (iconDefs) {
            iconDefs.split(';').forEach(function (kvpair) {
                kvpair = kvpair.split(':');
                if (/^[\w\d]+$/.test(kvpair[0]) && /^[a-f0-9]\/[a-f0-9]{2}\/[\w\d]+\.svg$/.test(kvpair[1])) {
                    fragments.push('.map-container .' + kvpair[0] + '.dots > div{background-image:url(');
                    fragments.push('//ark.fandom.com/media/' + kvpair[1]);
                    fragments.push(')}');
                }
            });
        }
        // Write the generated styles to the document tree.
		$style.text(fragments.join(''));
		$this.append($style);
	});
	

	// Floating tooltip showing GPS coordinates of mouse cursor.
	var $tooltipCoords = $('<div id="tooltipCoords">').css({
		textAlign: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		textShadow: '1px 1px white',
		color: 'black',
		padding: '3px',
		minWidth: '60px',
		position: 'fixed',
		display: 'none',
		whiteSpace: 'nowrap',
		border: '1px solid black',
		zIndex: 6,
	}).appendTo('#content');

	$('.data-map-container').each(function () {
		var $this = $(this),
			$mapContainer = $this.find('.map-container'),
			widthCoords = parseFloat($this.data('border-right')) - parseFloat($this.data('border-left')),
			heightCoords = parseFloat($this.data('border-bottom')) - parseFloat($this.data('border-top')),
			borderT = parseFloat($this.data('border-top')),
			borderL = parseFloat($this.data('border-left'));

		$mapContainer.mousemove(function(e) {
			var pos = $this.offset(),
				top = pos.top,
				left = pos.left,
				lon = ((e.clientX + $(document).scrollLeft() - left) * widthCoords / $mapContainer.width() + borderL).toFixed(1),
				lat = ((e.clientY + $(document).scrollTop() - top) * heightCoords / $mapContainer.height() + borderT).toFixed(1);

			$tooltipCoords.text(lat + ', ' + lon).css({
				left: e.clientX + 20,
				top: e.clientY
			}).show();
		}).mouseleave(function() {
			$tooltipCoords.hide();
		});
	});

});