(function($) {
	$.letitsnow = function() {
		setWaH();
		var u = $("<div \/>").css({
			width: $('body').width() + "px",
			height: 1,
			display: "block",
			overflow: "visible",
			position: "absolute",
			left: "1px",
			top: $("html").scrollTop() + 1 + "px",
			zIndex: "auto"
		});
		$("html").prepend(u).css({
			"overflow-x": "hidden"
		});
		var v = Array();
		generateFlake(75, false);
		setInterval(animateFlakes, 100);
		window.onresize = setWaH;
		function setWaH() {
			WIN_HEIGHT = (window.innerHeight || document.documentElement.clientHeight) - 50;
		};
		window.onscroll = function() {
			u.css({
				top: $("html").scrollTop() + "px"
			})
		};
		function generateFlake(a, b) {
			var i = 0;
			for(i = 0; i < a; i++) {
				var c = $("<span \/>");
				c.html("&bull;").css({
					color: "#fff",
					fontSize: Math.floor(Math.random() * 40) + "px",
					display: "block",
					position: "absolute",
					cursor: "default",
					"z-index": "auto"
				});
				$(u).append(c);
				f_left = Math.floor(Math.random() * ($('body').width() - c.width() - 50)) + 25;
				f_top = b ? -1 * c.height() : Math.floor(Math.random() * (WIN_HEIGHT - 50));
				jQuery.data(c, "posData", {
					top: f_top,
					left: f_left,
					rad: Math.random() * 50,
					i: Math.ceil(1 + Math.random() * 2),
					swingRange: Math.floor(Math.random() * 90)
				});
				c.css({
					top: f_top + "px",
					left: f_left + "px"
				});
				v.push(c)
			}
		};
		function animateFlakes() {
			var i = 0;
			for(i = v.length - 1; i >= 0; i--) {
				var f = v[i];
				var a = jQuery.data(f, "posData");
				a.top += a.i;
				var b = Number();
				b = Math.cos((a.rad / 180) * Math.PI);
				a.rad += 2;
				var X = a.left - b * a.swingRange;
				f.css({
					top: a.top + "px",
					left: X + "px",
					opacity: (WIN_HEIGHT - a.top < 100) ? ((WIN_HEIGHT - a.top) / 100) : 1
				});
				if(a.top > WIN_HEIGHT) {
					jQuery.removeData(f);
					f.remove();
					v.splice(i, 1);
					generateFlake(1, true)
				}
			}
		};
		return this
	};
})(jQuery);
$(document).ready(function() {
	jQuery.letitsnow();
});