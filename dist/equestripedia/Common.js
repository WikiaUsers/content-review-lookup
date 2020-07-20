/* Mass Rename */
window.massRenameDelay = 1000; // Optional
window.massRenameSummary = 'automatic'; // Optional

/* Portable infoboxes colors (credit to the Steven Universe wiki) */
(function() {
	// Function to check for Portable Infoboxes, and change their color
	var changeColors = function() {
		var PIs = $('.portable-infobox');
		if (PIs.length) PIs.each(function() {
			var $PI = $(this);
			$PImg = $('.pi-image-thumbnail',this);
			$prev = $(this).prev();
			if ($prev.text()) $PImg.css({
                 width: $prev.text(),
                 height: 'auto'
            });
			color = '',
				classNames = $PI.attr('class').split(' ');
			for (var i = 0; i < classNames.length; i++) {
				if (classNames[i].indexOf('pi-theme-_') !== -1) {
					color = classNames[i].replace('pi-theme-_', '');
					break;
				}
			}
			if (color) $PI.css('border', '2px solid #' + color);
		});
	};
	changeColors();
})();

/* Username Template */
function substUsername() {
	if( wgUserName ) {
		$('.insertusername').text(wgUserName);
	}
}
 
function substUsernameTOC() {
	var toc = $('#toc');
	var userpage = $('#pt-userpage');
 
	if( !userpage || !toc )
		return;
 
	var username = $('#pt-userpage').children(':first-child').text();
	$('span.toctext:not(:has(*)), span.toctext i', toc).each(function()
	{
		$(this).text($(this).text().replace('<insert name here>', username));
	});
}
 
function fixSearch() {
	var button = document.getElementById('searchSubmit');
 
	if( button )
		button.name = 'go';
}