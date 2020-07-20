/* Any JavaScript here will be loaded for all users on every page load. */

/* Ticker */
var $ticker = $('#ticker'),
    $ticker_div = $('#tickerdiv'),
    $ticker_text = $('#tickertxt'),
    ticker_text_outer_width,
    ticker_interval;
 
function createTicker() {
	if ($ticker.length && $ticker_div.length && $ticker_text.length) {
		$ticker.css('display', 'block');
		ticker_text_outer_width = $ticker_text.outerWidth();
		$ticker_div.css('left', parseInt($ticker.width()) + 10 + 'px');
		ticker_interval = setInterval("processTicker()", 200);
	}
}
 
function processTicker() {
	var left_width = (parseInt($ticker_div.position().left) > (-10 - ticker_text_outer_width)) ? parseInt($ticker_div.position().left) - 10 + 'px' : parseInt($ticker.width()) + 10 + 'px';
	$ticker_div.css('left', left_width);
} 
 
createTicker();