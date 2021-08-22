$(document).ready(function() {
	var item = $('.music-column');
	if (item) {
		$('<iframe/>', { width: "100%", height: 290, frameborder: "no", scrolling: "no", src: "http://music.snh48.today/?p=embed/playlist/69-take-me&amp;type=classic&amp;color=ff6138%22%3E" }).prependTo(item[0]);
	}
});