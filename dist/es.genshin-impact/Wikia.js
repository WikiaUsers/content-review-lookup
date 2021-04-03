$('.characters-toggle').click(function() {
	var $this = $(this);
	var status = $this.data('toggle-status');
	var element = $this.data('element');
	var effects = [ 'fadeIn', 'fadeOut' ];
	$this.data('toggle-status', Math.abs(status - 1));
	$this.css('filter', 'grayscale(' + status + ')');
	$('.characterbox-image.pi-theme-' + element).parent()[effects[status]]();
});