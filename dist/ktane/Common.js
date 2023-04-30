/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get('Chess')) {
	var pieces = ["♔", "♕", "♖", "♗", "♘"]; //"♙"
	var selected = "";
	var start;
	$(document).click(function() {
		start = null;
	});
	var row;
	var chessboard = $(".chessboard");
	for (let y = 0; y < 6; y++) {
		row = $("<div>").addClass("chess-row").appendTo(chessboard);
		$("<div>").addClass("square").text(6 - y).appendTo(row);
		for (let x = 0; x < 6; x++) {
			$("<div>").addClass("square " + ((y + x) % 2 === 0 ? "white" : "black")).appendTo(row).each(function(_, e) {
				var element = $(e);
				element.mousedown(function(event) {
                    start = [x, y];
                    event.preventDefault();
                    event.stopPropagation();
                });

                element.mouseup(function(event) {
                    if (start) { // Just incase.
                        var changed = [];
                        var a, b, i;
                        if (start[0] == x) {
                            a = (start[1] > y ? y : start[1]);
                            b = (start[1] > y ? start[1] : y);
                            for (i = a; i <= b; i++) {
                                changed.push([x, i]);
                            }
                        } else if (start[1] == y) {
                            a = (start[0] > x ? x : start[0]);
	                        b = (start[0] > x ? start[0] : x);
                            for (i = a; i <= b; i++) {
                                changed.push([i, y]);
                            }
                        } else if (Math.abs(start[0] - x) == Math.abs(start[1] - y)) {
                            var dist = Math.abs(start[0] - x);
                            var dirx = (start[0] < x) ? 1 : -1;
                            var diry = (start[1] < y) ? 1 : -1;

                            for (i = 0; i <= dist; i++) {
                                changed.push([start[0] + i * dirx, start[1] + i * diry]);
                            }
                        }

                        if (changed.length > 0) {
                            var first = chessboard.children().eq(start[1]).children().eq(start[0] + 1).hasClass("occupied");
                            changed.forEach(function(pos) {
                                var elm = chessboard.children().eq(pos[1]).children().eq(pos[0] + 1);
                                if (selected == "marking") {
                                    if (changed.length == 1) {
                                        elm.toggleClass("occupied");
                                    } else {
                                        elm.toggleClass("occupied", !first);
                                    }
                                } else if (changed.length == 1) {
                                    elm.text(elm.text() == "" ? selected : "");
                                }
                            });
                        }
                        start = null;
                    }
					event.preventDefault();
					event.stopPropagation();
				});
				if (x === 0) {
					element.css("border-left-width", "2px");
				} else if (x == 5) {
					element.css("border-right-width", "2px");
				}
				if (y === 0) {
					element.css("border-top-width", "2px");
					element.parent().addClass("extra-height");
				} else if (y == 5) {
					element.css("border-bottom-width", "2px");
					element.parent().addClass("extra-height");
				}
			});
		}
	}
	row = $("<div>").addClass("chess-row letters").appendTo(chessboard);
	for (var i = 0; i < 6; i++) {
		$("<div>").addClass("square").text(String.fromCharCode(97 + i)).appendTo(row);
	}

	var chesspieces = $(".chess-pieces");
	$("<div>").addClass("piece square").css("background-color", "rgba(255, 105, 105, 1)").appendTo(chesspieces).click(function() {
		$(".piece").removeClass("selected");
		$(this).addClass("selected");
		selected = "marking";
	}).click();
	pieces.forEach(function(val) {
		$("<div>").addClass("piece square").appendTo(chesspieces).click(function() {
			$(".piece").removeClass("selected");
			$(this).addClass("selected");
			selected = val;
		}).text(val);
	});

	$(".reset").click(function() {
		$(".black.square, .white.square").text("").removeClass("occupied");
	});	
}