// snow flakes effect
var _int_snow = function () {
	var
		size_min = (typeof (snow_size_min) != 'undefined') ? snow_size_min : 4,
		size_max = (typeof (snow_size_max) != 'undefined') ? snow_size_max : 6,
		num_flakes = (typeof (snow_num_flakes) != 'undefined') ? snow_num_flakes : 20,
		horiz_start = (typeof (snow_horiz_start) != 'undefined') ? snow_horiz_start : 0,
		horiz_end =
			(typeof (snow_horiz_end) != 'undefined') ?
			snow_horiz_end :
			(window.innerWidth || document.body.clientWidth || document.body.innerWidth || document.body.offsetWidth),
		vert_start = (typeof (snow_vert_start) != 'undefined') ? snow_vert_start : 0,
		vert_end =
			(typeof (snow_vert_end) != 'undefined') ?
			snow_vert_end :
			(window.innerHeight || document.body.clientHeight || document.body.innerHeight || document.body.offsetHeight),
		flake_image = (typeof (snow_flake_image) != 'undefined') ? snow_flake_image : null,
		flake_color = (typeof (snow_flake_color) != 'undefined') ? snow_flake_color : '#E0E0E0',
		fall_speed = (typeof (snow_fall_speed) != 'undefined') ? snow_fall_speed : 40,
		float_speed = (typeof (snow_float_speed) != 'undefined') ? snow_float_speed : 40,
		flake_objects = [],
		flakes_per_ms = num_flakes * fall_speed / (vert_end - vert_start) / 1000,
		flakes_limit = 0,
		time_start = new Date ().getTime ();

	setInterval (
		function () {
			var _int_flake_move = function (time_current) {
				var i, one_flake, time_diff;

				for (i = 0; i < flake_objects.length; ++i) {
					one_flake = flake_objects [i];
					time_diff = time_current - one_flake.time_start;
					one_flake.pos_vert_current = one_flake.pos_vert_start + time_diff * one_flake.fall_speed / 1000;
					if (float_speed != 0) {
						one_flake.pos_horiz_current = one_flake.pos_horiz_start + time_diff * one_flake.float_speed / 1000;
					} else {
						one_flake.pos_horiz_current = one_flake.pos_horiz_start + Math.floor(Math.random() * 4 - 2);
					}
					one_flake.dom.style.top = one_flake.pos_vert_current + 'px';
					one_flake.dom.style.left = one_flake.pos_horiz_current + 'px';
				}
			};

			var _int_flake_cleanup = function () {
				while (flake_objects.length && ((flake_objects [0].pos_vert_current > vert_end) || (flake_objects [0].pos_vert_current < 0 - size_max) || (flake_objects [0].pos_horiz_current > horiz_end) || (flake_objects [0].pos_horiz_current < 0 - size_max))) {
					document.body.removeChild (flake_objects [0].dom);
					flake_objects.shift ();
				}
			};

			var _int_flake_add = function (time_current) {
				var current_size, current_flake, px_size, pos_horiz, pos_vert;

				current_size = Math.floor (Math.random () * (size_max - size_min + 1)) + size_min;
				if (current_size % 2 != 0) {
					current_size += 1;
				}
				px_size = current_size + 'px';
				px_radius = current_size / 2 + 'px';
				seed = Math.random();
				if ((horiz_end + vert_end) * seed > vert_end) {
					pos_horiz = Math.floor(seed * (horiz_end + vert_end) - vert_end + 1) + horiz_start;
					pos_vert = vert_start - current_size;
				} else {
					pos_horiz = horiz_start - current_size;
					pos_vert = Math.floor(vert_end - seed * (horiz_end + vert_end) + 1) + vert_start;
				}
				current_fall_speed = (Math.random() * 20 - 10) + fall_speed;
				current_float_speed = (Math.random() * 20 - 10) + float_speed;
				if (flake_image !== null) {
					one_flake = document.createElement ('img');
					one_flake.src = flake_image;
					one_flake.style.display = 'block';
				} else {
					one_flake = document.createElement ('div');
					one_flake.style.color = flake_color;
					one_flake.style.backgroundColor = flake_color;
					//one_flake.style.fontSize = px_size;
					one_flake.style.borderRadius = px_radius;
					one_flake.style.boxShadow = '0px 0px ' + px_size + ' ' + px_radius + ' ' + flake_color;
					one_flake.style.border = 'none';
				}
				one_flake.style.position = 'fixed';
				one_flake.style.zIndex = '1000000';
				one_flake.style.width = px_size;
				one_flake.style.height = px_size;
				one_flake.style.top = pos_vert + 'px';
				one_flake.style.left = pos_horiz + 'px';
				flake_objects.push ({
					dom: one_flake,
					size: current_size,
					time_start: time_current,
					fall_speed: current_fall_speed,
					float_speed: current_float_speed,
					pos_horiz_start: pos_horiz,
					pos_horiz_current: pos_horiz,
					pos_vert_start: pos_vert,
					pos_vert_current: pos_vert
				});
				document.body.appendChild (one_flake);
			};

			var time_current, flakes_limit, flakes_active;

			time_current = new Date ().getTime ();
			_int_flake_move (time_current);
			_int_flake_cleanup ();
			flakes_limit = Math.floor ((time_current - time_start) * flakes_per_ms) + 1;
			for (;;) {
				flakes_active = flake_objects.length;
				if ((flakes_active >= flakes_limit) || (flakes_active >= num_flakes)) {
					break;
				}
				_int_flake_add (time_current);
			}
		},
		100
	);
};



// enable the snow effect when the page is loaded
if ('addEventListener' in window) {
	window.addEventListener ('load', _int_snow, false);
} else if ('attachEvent' in document) {
	window.attachEvent ('onload', _int_snow);
} else {
	window.onload = _int_snow;
}