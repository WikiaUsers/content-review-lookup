// Tabs in portable infoboxes 

( function () {
	var template = '<nav class="pi-tabs"> \
		<ul> \
			<li><a id="vox-populi" href="#">Vox Populi</a></li> \
			<li><a class="active" id="base-game" href="#">Base Game</a></li> \
		</ul> \
	</nav>',
	infobox = document.getElementsByClassName('pi-theme-tabbed')[0];
	
	if (!infobox) {
		return;
	}
	
	infobox.innerHTML = template + infobox.innerHTML;
	var tabs = Array.prototype.slice.call(infobox.querySelectorAll('.pi-tabs a')),	
		onClick = function (event) {
			event.preventDefault();
		if (event.target.className.indexOf('active') === -1) {
			tabs.forEach(function (el, i) {
				el.className = '';
			});
			event.target.className = 'active';
			var items = infobox.getElementsByClassName('pi-data-value'),
				switchWith = document.querySelectorAll('.infobox-data-vox-populi > li'),
				i = 0, j = 0;
			while( i < items.length) {
				if (switchWith[j].childNodes.length) {
					var tmp = items[i].innerHTML;
					items[i].innerHTML = switchWith[j].innerHTML;			
					switchWith[j].innerHTML = tmp;
					i++;
				}
				j++;
			}
		}
	};
	
	tabs.forEach(function(el, i) {
		el.addEventListener('click', onClick);
	});
}());