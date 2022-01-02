$(function () {

	var Strings = {
		ToggleAll: 'Tout afficher ou tout masquer',
		ToggleCaves: 'Afficher ou masquer les grottes',
	};

	function setVisibility($map, type, on) {
		if (on) {
			$map.removeClass('hide-' + type);
		} else {
			$map.addClass('hide-' + type);
		}
	}

	// Make the map legend interactive.
	$('.data-map-container').each(function () {
		var $this = $(this);
		var $map = $this.find('.resourcemaptable');
		var $legendTable = $this.find('.map-legend');
		var baseId = $map.attr('id');

		// Create checkboxes for toggles, which can't be prerendered with wikitext.
		// Caves:
		var toggleCavesCheckboxId = baseId + '-toggle-cave';
		$legendTable.prepend('<tr><td></td><td><input type="checkbox" id="'+toggleCavesCheckboxId+'" class="toggle-cave" checked>'
						   + '<label for="'+toggleCavesCheckboxId+'">'+Strings.ToggleCaves+'</label></td></tr>');
		// All:
		var toggleAllCheckboxId = baseId + '-toggle-all';
		$legendTable.prepend('<tr><td></td><td><input type="checkbox" id="'+toggleAllCheckboxId+'" class="toggle-all" checked>'
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
		$('#' + toggleCavesCheckboxId).on('click', function() {
			setVisibility($map, 'cave', this.checked);
		});
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
			var pos = $mapContainer.offset(),
				top = pos.top,
				left = pos.left,
				lon = ((e.clientX + $(document).scrollLeft() - left) * widthCoords / $mapContainer.width() + borderL).toFixed(1),
				lat = ((e.clientY + $(document).scrollTop() - top) * heightCoords / $mapContainer.height() + borderT).toFixed(1);

			$tooltipCoords.text(lat + ', ' + lon).css({
				left: e.clientX + 20,
				top: e.clientY
			}).show();
		}).
		mouseleave(function() {
			$tooltipCoords.hide();
		});
	});

});