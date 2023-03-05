$(function () {
	$('#a-loading').hide();
	var fade = 500, delay = 250;
	$('#a-head').show();
	$('#a-head>div').fadeIn( fade );
	$('#a-garakuta').delay( delay ).fadeIn( fade );
	$('#a-recent').delay( delay ).show();
	$('#a-game').delay( delay ).fadeIn( fade );
	$('#a-music').delay( delay + 100 ).fadeIn( fade );
	$('#a-series').delay( delay + 200 ).fadeIn( fade );
	$('#a-doujin').delay( delay + 300 ).fadeIn( fade );
	$('#a-news').delay( delay ).fadeIn( fade );
	$('#a-other').delay( 2 * delay + 100 ).fadeIn( fade );
	$('#a-link').delay( 2 * delay + 200 ).fadeIn( fade );
	$('#a-about').delay( 2 * delay + 300 ).fadeIn( fade );
	$('.cantoggle').each( function () {
		var n = $( this ),t = n.find('.work-item-list-collapse'), list = t.children('.work-item-list'),
			sample = list.eq(0),
			count = list.length, col = Math.floor( t.width() / sample.outerWidth(true) ), current,
			toggle = n.find('.work-item-toggle').wrapInner('<a href="javascript:void(0);"></a>'),
			prev = $('<a class="work-item-prev" href="javascript:void(0);"></a>'),
			next = $('<a class="work-item-next" href="javascript:void(0);"></a>');
		var setToPage = function ( pn ) { // start from 0
			if ( pn >= count ) pn = current;
			if ( pn < 0 ) pn = 0;
			current = pn;
			list.show();
			list.slice( 0, pn ).hide();
			if (pn == 0) prev.hide();
			else prev.show();
			if (pn + col >= count) next.hide();
			else next.show();
		};
		toggle.on('click', function () {
			n.toggleClass( 'work-item-listing' );
			col = Math.floor(t.width() / sample.outerWidth(true));
			setToPage( 0 );
		} );
		prev.on('click', function () {
			setToPage( current - (col = Math.floor(t.width() / sample.outerWidth(true))) );
		} );
		next.on('click', function () {
			setToPage( current + (col = Math.floor(t.width() / sample.outerWidth(true))) );
		} );
		$(window).on( 'resize', function () {
			col = Math.floor(t.width() / sample.outerWidth(true));
			if ( col >= count ) setToPage(0);
			else {
				if (current + col >= count) next.hide();
				else next.show();
			}
		} );
		$('<div class="work-item-control"></div>').append(prev).append(next).appendTo(t);
		setToPage(0);
	} );
	if (mw.config.get('skin')=='vampire'){
		$('#a-weibo-content').html('<iframe id="a-weibo-iframe" width="100%" height="100%" class="share_self"  frameborder="0" scrolling="no" src="./image/weibo/?skin=10"></iframe>');
	} else {
		$('#a-weibo-content').html('<iframe id="a-weibo-iframe" width="100%" height="100%" class="share_self"  frameborder="0" scrolling="no" src="./image/weibo/"></iframe>');
	}
});