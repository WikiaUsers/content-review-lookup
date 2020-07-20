$('.template_modes_right').click(function(e) {
	let scroll = $('.template_modes_body').scrollTop();
	let i = scroll/105;
	$(".template_modes_move_" + (i+2)).css("color", "black");
	for (let k = 1; k < 8; k++) {
		if (k == (i+2)) {
			continue;
		} else {
			$(".template_modes_move_" + (k)).css("color", "white");
		}
	}
	$('.template_modes_body').scrollTop(scroll+105);
});

$('.template_modes_left').click(function(e) {
	let scroll = $('.template_modes_body').scrollTop();
	let i = scroll/105;
	$(".template_modes_move_" + (i)).css("color", "black");
	for (let k = 1; k < 8; k++) {
		if (k == (i)) {
			continue;
		} else {
			$(".template_modes_move_" + (k)).css("color", "white");
		}
	}
	$('.template_modes_body').scrollTop(scroll-105);
});

$(".template_modes_move_1").click((e) => {
	$('.template_modes_body').scrollTop(0);
	$(".template_modes_move_1").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 1) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

$(".template_modes_move_2").click((e) => {
	$('.template_modes_body').scrollTop(1*105);
	$(".template_modes_move_2").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 2) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

$(".template_modes_move_3").click((e) => {
	$('.template_modes_body').scrollTop(2*105);
	$(".template_modes_move_3").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 3) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

$(".template_modes_move_4").click((e) => {
	$('.template_modes_body').scrollTop(3*105);
	$(".template_modes_move_4").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 4) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

$(".template_modes_move_5").click((e) => {
	$('.template_modes_body').scrollTop(4*105);
	$(".template_modes_move_5").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 5) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

$(".template_modes_move_6").click((e) => {
	$('.template_modes_body').scrollTop(5*105);
	$(".template_modes_move_6").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 6) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});

$(".template_modes_move_7").click((e) => {
	$('.template_modes_body').scrollTop(6*105);
	$(".template_modes_move_7").css("color", "black");
	for (let i = 1; i < 8; i++) {
		if (i == 7) {
			continue;
		} else {
			$(".template_modes_move_" + i).css("color", "white");
		}
	}
});