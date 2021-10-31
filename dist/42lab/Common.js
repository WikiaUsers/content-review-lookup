/* Any JavaScript here will be loaded for all users on every page load. */

/*for load a filter element*/
$(function(){
	var $btns = $('.btn').click(function(){
		if (this.id == 'all') {
			$('#parent > div').fadeIn(450);
		} else {
			var $el = $('.' + this.id).fadeIn(450);
			$('#parent > div').not($el).hide();
		}
		$btns.removeClass('active');
		$(this).addClass('active');
	});
});