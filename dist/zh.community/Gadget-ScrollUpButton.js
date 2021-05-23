/* scrollUpButton
 * Add a button to scroll up to the top of the current page.
 * @rev 3 (2019-28-07)
 * @author Kwj2772
 * @contributor Perhelion
 * No internationalisation required
 * [kowiki] Fixed an issue with help-panel-button ([[ko:User:ykhwong]])
 * [zhwiki] Add a timer to autohide button, check more gadgets. Add scrollDownButton
 *   @from https://ko.wikipedia.org/?oldid=25440719
 *   @zhwikipedia_maintainer 安忆 ([[zh:User:AnYiLin]])
 */
(function($, mw) {
	var scrollDownButtonId = 'scrollDownButton',
		scrollUpButtonId = 'scrollUpButton';
	if (mw.config.get('wgServerName').match(/wikimirror\.org$/)) {
		scrollDownButtonId += '-zhwiki';
		scrollUpButtonId += '-zhwiki'
	}

	var scrollButtonIcon = '//upload.wikimedia.org/wikipedia/commons/5/59/Font_Awesome_5_regular_arrow-circle-up_blue.svg';
	if (!document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1'))
		scrollButtonIcon = '//upload.wikimedia.org/wikipedia/commons/thumb/5/59/Font_Awesome_5_regular_arrow-circle-up_blue.svg/32px-Font_Awesome_5_regular_arrow-circle-up_blue.svg.png';

	$scrollDownButton = $('<img>', {
		src: scrollButtonIcon,
		id: scrollDownButtonId
	}).css({
		cursor: 'pointer',
		opacity: 0.7,
		position: 'fixed',
		display: 'none',
		right: '18px',
		transform: 'rotate(180deg)',
		'-webkit-transform': 'rotate(180deg)',
		'-moz-transform': 'rotate(180deg)',
		'-o-transform': 'rotate(180deg)',
		'-ms-transform': 'rotate(180deg)'
	}).on('click', function() {
		$('html, body').animate({
			scrollTop: $(document).height() - $(window).height()
		}, 660)
	}).on('mouseenter mouseleave', function(e) {
		this.style.opacity = e.type === 'mouseenter' ? 1 : 0.7
	}).appendTo('body');

	$scrollUpButton = $('<img>', {
		src: scrollButtonIcon,
		id: scrollUpButtonId
	}).css({
		cursor: 'pointer',
		opacity: 0.7,
		position: 'fixed',
		display: 'none',
		right: '18px'
	}).on('click', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 660)
	}).on('mouseenter mouseleave', function(e) {
		this.style.opacity = e.type === 'mouseenter' ? 1 : 0.7
	}).appendTo('body');

	var scrollButtonTimer;
	$(window).on('scroll', function() {
		var dingHeight = $('#bluedeck_ding>div').height() ? $('#bluedeck_ding>div').height() : 0;
		$('#mw-ge-help-panel-cta-button').length > 0 ?
		  $scrollDownButton.css('bottom', dingHeight + 75 + 'px') && $scrollUpButton.css('bottom', dingHeight + 116 + 'px') :
          $('.skin-fandomdesktop').length > 0 ?
		    $scrollDownButton.css('bottom', dingHeight + 44 + 'px') && $scrollUpButton.css('bottom', dingHeight + 85 + 'px') :
		    $scrollDownButton.css('bottom', dingHeight + 24 + 'px') && $scrollUpButton.css('bottom', dingHeight + 65 + 'px');
		$('#cat_a_lot').length > 0 || $('#proveit').length > 0 || $('.wordcount').length > 0 ? $scrollDownButton.css('left', '10px') && $scrollUpButton.css('left', '10px') : $scrollDownButton.css('left', 'unset') && $scrollUpButton.css('left', 'unset');
		$(this).scrollTop() > 60 ? $scrollDownButton.fadeIn('slow') && $scrollUpButton.fadeIn('slow') : $scrollDownButton.fadeOut('slow') && $scrollUpButton.fadeOut('slow');
		this.clearTimeout(scrollButtonTimer);
		scrollButtonTimer = this.setTimeout(function() {
			$scrollDownButton.fadeOut('slow');
			$scrollUpButton.fadeOut('slow')
		}, 2000)
	});
	$scrollDownButton.on('mouseenter', function() {
		window.clearTimeout(scrollButtonTimer)
	});
	$scrollUpButton.on('mouseenter', function() {
		window.clearTimeout(scrollButtonTimer)
	})
})(jQuery, mw);