(function() {
	if (window.dataUrl && window.dataUrl.length > 0) return;
	window.dataUrl = '';
	function update() {window.dataUrl = window.location.pathname + window.location.hash + window.location.search;}
	function setParam() 
	{
		update();
		$('body').attr('data-url', window.dataUrl);
		// Adds the attribute to elements having the data-url-custom Class
		if ($('.data-url-custom').length >= 1) {
			$('.data-url-custom').each(function() 
			{
				$(this).attr('data-url', window.dataUrl); 
			});
		}
	}
	window.addEventListener('hashchange', function() {
		setParam();
	});
	//manual update
	if ($('.data-url-button').length >= 1) {
		let buttonContent = $('.data-url-button').text();
		$('.data-url-button').text('');
		//Keep Text set by user
		$('.data-url-button').append('<a/>');
		$('.data-url-button a').text(buttonContent);
		$('.data-url-button a').click(function(event) {
			event.preventDefault();
			setParam();
		});
	}
	
	$(document).ready(function() {
		setParam();
	});
})();