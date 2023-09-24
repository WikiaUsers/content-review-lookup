/* scrollUpButton
 * Add a button to scroll up to the top of the current page.
 * @rev 3 (2019-28-07)
 * @author Kwj2772
 * @contributor Perhelion
 * No internationalisation required
 * [kowiki] Fixed an issue with help-panel-button ([[ko:User:ykhwong]])
 * [zhwiki] Add a timer to autohide button, check more gadgets. Add scrollDownButton
 *   @from https://ko.wikipedia.org/?oldid=25440719
 *   @maintainer 安忆 ([[zh:User:AnYiLin]])
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
		$('#mw-ge-help-panel-cta-button').length > 0 ? $scrollDownButton.css('bottom', dingHeight + 75 + 'px') && $scrollUpButton.css('bottom', dingHeight + 116 + 'px') : $scrollDownButton.css('bottom', dingHeight + 24 + 'px') && $scrollUpButton.css('bottom', dingHeight + 65 + 'px');
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
	});
	$showFullDate.on('mouseenter', function() {
		window.customUserAccountAge(showFullDate)
    });
    
    /* MediaWiki:Gadget-site-lib.js */
window.wgUXS = function (wg, hans, hant, cn, tw, hk, sg, zh, mo, my) {
    var ret = {
        'zh-hans': hans || cn ,
        'zh-hant': hant || tw ,
    }
    return ret[wg] || zh || hant || hans || tw || cn || hk || sg || mo || my; //保證每一語言有值
}

// 顶部滚动公告，代码来自萌娘百科 http://zh.moegirl.org.cn/MediaWiki:Common.js
function autoScroll(obj) {
    $(obj).animate({
        height: "show",
        paddingTop: "show",
        marginTop: "show",
        paddingBottom: "show",
        marginBottom: "show",
    });
    var isFrozen = false;
    setInterval(function () {
        if (!isFrozen) {
        $(obj)
            .find("ul:first")
            .animate(
            {
                marginTop: "-25px",
            },
            500,
            function () {
                $(this)
                .css({
                    marginTop: "0px",
                })
                .find("li:first")
                .appendTo(this);
            }
            );
        }
    }, 5000);
    $(window).on({
        blur: function () {
        isFrozen = true;
        },
        focus: function () {
        isFrozen = false;
        },
    });
}
autoScroll("#scrollDiv");

/* Toggle spolier button text */
$(function () {
    var button = $('.mw-customtoggle-ShowSpoiler');
    if (button.length !== 1) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('Show spoilers');
        } else {
            $(this).addClass('shown');
            $(this).text('Hide spoilers');
        }
    }

    button.text('Show spoilers');

	button.click(toggleText);
});

// Template:Stext JS
$('.spoiler_on').click(function () {
    if ($(this).hasClass('spoiler_on')) {
        $(this).switchClass('spoiler_on', 'spoiler_off');
    } else {
        $(this).switchClass('spoiler_off', 'spoiler_on');
    }
    $wgLocaltimezone = "Asia/Taipei";
});