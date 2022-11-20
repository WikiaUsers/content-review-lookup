//改写自 u:dev:MediaWiki:Selector.js
//做了扩充，现在支持多层级的折叠

mw.loader.using('mediawiki.util').then(function() {
	
	function zselector( $content ) {
		$(function () {
			$('.ns, .ps').unbind();
			$('[class*=wng-]').css('display','none');
			$('.ns[class*=w4c-], .ps[class*=w4c-]').on(
				'click', function(){
					$(this).toggleClass('ns').toggleClass('ps');
					zbehave(zvalue($(this).attr('class'), 1));
				}
			);
			$('.ns[class*=w4h-], .ps[class*=w4h-]').on(
				'mouseover mouseout', function(){
					$(this).toggleClass('ns').toggleClass('ps');
					zbehave(zvalue($(this).attr('class'), 1));
				}
			);
			var zbehave= function (nmbr) {
				// $('[class*=wng]').find('.now-playing').removeClass('.now-playing');
				$('[class*=wng]').each(function(inde, elem){
					var leng = zvalue($(elem).attr('class'), 0);
					if (leng.length >= nmbr.length && $(elem).css('display') == 'block' && leng != nmbr){
						$(elem).css('display', 'none');
						$('.ps.w4c-'+leng+' ,.ps.w4h-'+leng).removeClass('ps').addClass('ns');
					}
				});
				$('[class*=w4]').each(function(inde, elem){
					var leng = zvalue($(elem).attr('class'), 1);
					if (leng.length == nmbr.length && leng != nmbr && $(elem).hasClass('ps')){
						$(elem).removeClass('ps').addClass('ns');
					}
				});
				$('.wng-'+nmbr).toggle(500);
			};
			var zvalue= function (classValue, mode) {
				var answer = '';
				$.each(classValue.split(' '), function(index, value) {
					if (mode == 1 && (value.substring(0, 4) == 'w4h-' || value.substring(0, 4) == 'w4c-')) {
						answer = value.substring(4);
						return false;
					} else if (mode == 0 && value.substring(0, 4) == 'wng-') {
						answer = value.substring(4);
						return false;
					}
				});
				return answer;
			};
		});
	}
	
	mw.hook( 'wikipage.content' ).add( zselector );
	zselector( mw.util.$content );
});