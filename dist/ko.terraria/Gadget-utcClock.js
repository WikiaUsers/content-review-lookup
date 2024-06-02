$(function(){
var linkPurge = mw.config.get( 'wgScript' ) + '?title=' + 
    encodeURIComponent( mw.config.get( 'wgPageName' ) ) + '&action=purge';
    
var clockStyle = 'font-weight:bolder; color:#fff; font-size:170%;';

$('.netbar-right').prepend('<li>' + 
    '<a title="현재 위키 페이지에 대한 서버 캐시를 제거합니다" href="' + linkPurge + '" class="dateNode" style="' + clockStyle + '"></a></li>');
    
var $target = $('.dateNode');
showTime();

function showTime() {
	var now = new Date();
	var hh = now.getUTCHours();
	var mm = now.getUTCMinutes();
	var ss = now.getUTCSeconds();
	var time = ( hh < 10 ? '0' + hh : hh ) + ':' + ( mm < 10 ? '0' + mm : mm ) + ':' + ( ss < 10 ? '0' + ss : ss );
	$target.text( time );
    var ms = now.getUTCMilliseconds();
	setTimeout( function () {
		showTime();
	}, 1100 - ms );
}
});