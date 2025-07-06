/* 
 * @name        ScrollUpButton
 * @desc        Add a button to scroll up to the top of the current page.
 * @rev         3 (2019-28-07)
 * @upstream    fandom-zhcc-1 (2021-06-14)
 * @fork        fandom-dev-1 (2021-06-14)
 * @author      Kwj2772
 * @contributor Perhelion
 * @contributor [wikipedia:ko:] Ykhwong
 * @contributor [wikipedia:zh:] AnYiLin
 * @contributor [wikia:zh:] Winston Sung
 * 
 * No internationalisation required
 * 
 * [kowiki] Fixed an issue with help-panel-button. (wikipedia:ko:User:Ykhwong)
 * [zhwiki] Add a timer to autohide button, check more gadgets. Add scrollDownButton.
 * [fandom-zhcc] Adding compatibility with Toolbar/QuickBar. (wikia:zh:User:Winston Sung)
 * 
 * @from https://ko.wikipedia.org/?oldid=25440719
 * @zhwikipedia_maintainer 安忆 (wikipedia:zh:User:AnYiLin)
 * @fandom-zhcc Winston Sung (wikia:zh:User:Winston Sung)
 */

(function($, mw) {
	var scrollDownButtonId = 'scrollDownButton',
		scrollUpButtonId = 'scrollUpButton';
	if (mw.config.get('wgServerName').match(/wikimirror\.org$/)) {
		scrollDownButtonId += '-zhwiki';
		scrollUpButtonId += '-zhwiki'
	}

	var scrollButtonIcon = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2013.229%2013.229%22%3E%3Ccircle%20cx%3D%226.614%22%20cy%3D%226.614%22%20r%3D%225.957%22%20fill%3D%22%23fff%22%20stroke%3D%22%2336c%22%20stroke-width%3D%221.315%22%2F%3E%3Cpath%20fill%3D%22%2336c%22%20d%3D%22M5.866%2010.264h1.497V5.17l1.941%202.177%201.015-.89-3.674-3.81h-.061L2.91%206.456l1.027.89%201.93-2.177Z%22%2F%3E%3C%2Fsvg%3E';
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
		    $scrollDownButton.css('bottom', dingHeight + 54 + 'px') && $scrollUpButton.css('bottom', dingHeight + 95 + 'px') :
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