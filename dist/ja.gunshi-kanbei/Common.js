/* ここにあるすべてのJavaScriptは、すべてのページ読み込みですべての利用者に対して読み込まれます */
/* Skin */

/* Main page */
$(document).ready(function() {
	if (wgPageName === 'Gunshi_Kanbei_Wiki') {
		/** Replace bold tags in the News section **/
		var replaceBoldTags = setInterval(function() {
			$('.mainpage-box-news .wikiaRss').html($('.mainpage-box-news .wikiaRss').html().replace(/\<(\/)?b\>/g,''));
			$('.mainpage-box-news .wikiaRss').html($('.mainpage-box-news .wikiaRss').html().replace(/\&lt\;(\/)?b\&gt\;/g,''));
			
			if ( $('.mainpage-box-news .wikiaRssPlaceholder').text() !== 'Loading RSS data...') {
				clearInterval(replaceBoldTags);
			}
		},100);

		/** Poll text **/
		$('.mainpage-box-poll .total').parent().addClass('pollText'); 		
	}
});

/* General */

/* Other */