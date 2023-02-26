function timer() {
	for (var i = 4; i > 1; i = i - 1) {
		$('<span style="font-weight:bold;" id="chance' + i + '"></span>').prependTo('#cookpotWorkSpace');
		$('<span style="position: relative;"><img class="hiddeningredientcookpot" id="result' + i + '"></span>').prependTo('#cookpotWorkSpace');
	}

	$('<span style="font-weight:bold;" id="chance1"></span>').prependTo('#cookpotWorkSpace');
	$('<span style="position: relative;"><img class="ingredientcookpot" id="result1"></span>').prependTo('#cookpotWorkSpace');
	$('<span style="position: relative;"><img id="arrowcookpot" class="cookpotarrow" src="https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru"></span>').prependTo('#cookpotWorkSpace');
	$('<span style="position: relative;"><img class="ingredientcookpot" id="cookpot4" onclick="cookpotDelete(3)"></span>').prependTo('#cookpotWorkSpace');
	$('<span style="position: relative;"><img class="ingredientcookpot" id="cookpot3" onclick="cookpotDelete(2)"></span>').prependTo('#cookpotWorkSpace');
	$('<span style="position: relative;"><img class="ingredientcookpot" id="cookpot2" onclick="cookpotDelete(1)"></span>').prependTo('#cookpotWorkSpace');
	$('<span style="position: relative;"><img class="ingredientcookpot" id="cookpot1" onclick="cookpotDelete(0)"></span>').prependTo('#cookpotWorkSpace');

	$('#cpclear').attr('onclick', 'cookpotDeleteAll()');
	$(".cookpot .inglist a").each(function() {
		var src = $(this).children('img').attr('data-src');
		var title = $(this).attr('title');
		var name = $(this).children('img').attr('data-image-name');
		name = name.replace('.png', '');
		$(this).attr('title', name);
		$(this).removeAttr('href');
		$(this).removeClass('image-thumbnail image');
		$(this).attr('onclick', 'cookpotAdd("' + title + '","' + src + '")');
	});
	$(".cookpot .cookpoting a").each(function() {
		$(this).removeAttr('href');
		$(this).removeClass('image-thumbnail image');
	});
	$("#foods > p > a").each(function() {
		var id = $(this).attr('title');
		$(this).attr('id', id);
		$(this).removeAttr('href');
		$(this).removeClass('image-thumbnail image');
	});
	$('#description > a, #description2 > a, #description3 > a, #description4 > a').each(function() {
		var src = $(this).children('img').attr('data-src');
		$(this).children('img').attr('src', src);
	});

	$('#buttonds').click(function sortds() {
	$(".ds").css({
		"display": ""
	});
	$(".rog, .sw, .h, .dst, .warlydst").css({
		"display": "none"
	});
	$("#buttonds").addClass("buttoncb");
	$("#buttonrog, #buttonsw, #buttonh, #buttondst").removeClass("buttoncb");
	cookpotDeleteAll();
	dlc = 'DS';
});
$('#buttonrog').click(function sortrog() {
	$(".rog").css({
		"display": ""
	});
	$(".ds, .sw, .h, .dst, .warlydst").css({
		"display": "none"
	});
	$("#buttonrog").addClass("buttoncb");
	$("#buttonds, #buttonsw, #buttonh, #buttondst").removeClass("buttoncb");
	cookpotDeleteAll();
	dlc = 'RoG';
});
$('#buttonsw').click(function sortsw() {
	$(".sw").css({
		"display": ""
	});
	$(".ds, .rog, .h, .dst, .warlydst").css({
		"display": "none"
	});
	$("#buttonsw").addClass("buttoncb");
	$("#buttonds, #buttonrog, #buttonh, #buttondst").removeClass("buttoncb");
	cookpotDeleteAll();
	dlc = 'SW';
});
$('#buttonh').click(function sorth() {
	$(".h").css({
		"display": ""
	});
	$(".ds, .rog, .sw, .dst, .warlydst").css({
		"display": "none"
	});
	$("#buttonh").addClass("buttoncb");
	$("#buttonds, #buttonrog, #buttonsw, #buttondst").removeClass("buttoncb");
	cookpotDeleteAll();
	dlc = 'H';
});
$('#buttondst').click(function sortdst() {
	$(".dst").css({
		"display": ""
	});
	$(".ds, .sw, .h, .rog, .warlydst").css({
		"display": "none"
	});
	$("#buttondst").addClass("buttoncb");
	$("#buttonds, #buttonsw, #buttonh, #buttonrog").removeClass("buttoncb");
	cookpotDeleteAll();
	dlc = 'DST';
	if ($('#buttonwarly').hasClass('buttonwarly')) {
		$(".warly, .warlydst").css({
			"display": ""
		});
	}
});

$('#buttonwarly').click(function sortwarly() {
	cookpotDeleteAll();
	if (!$(this).hasClass('buttonwarly')) {
		$(".warly, .warlydst").css({
			"display": ""
		});
		$("#buttonwarly").addClass("buttonwarly");
		warly = true;
	} else {
		$(".warly, .warlydst").css({
			"display": "none"
		});
		$(".buttonwarly").removeClass("buttonwarly");
		warly = false;
	}
});

$('#bmeat').click(function meat() {
	$(".meat, .meatfish").addClass("light");
	$(".veggie, .fish, .fruit, .other").removeClass("light");
	$("#bmeat").css({
		"background-color": "#88684c82"
	});
	$("#bveggie, #bfish, #bfruit, #bother").css({
		"background-color": "transparent"
	});
});

$('#bfish').click(function fish() {
	$(".fish, .meatfish").addClass("light");
	$(".veggie, .meat, .fruit, .other").removeClass("light");
	$("#bfish").css({
		"background-color": "#88684c82"
	});
	$("#bveggie, #bmeat, #bfruit, #bother").css({
		"background-color": "transparent"
	});
});

$('#bveggie').click(function veggie() {
	$(".veggie").addClass("light");
	$(".meat, .fish, .meatfish, .fruit, .other").removeClass("light");
	$("#bveggie").css({
		"background-color": "#88684c82"
	});
	$("#bmeat, #bfish, #bfruit, #bother").css({
		"background-color": "transparent"
	});
});

$('#bfruit').click(function fruit() {
	$(".fruit").addClass("light");
	$(".veggie, .meat, .meatfish, .fish, .other").removeClass("light");
	$("#bfruit").css({
		"background-color": "#88684c82"
	});
	$("#bveggie, #bfish, #bmeat, #bother").css({
		"background-color": "transparent"
	});
});

$('#bother').click(function other() {
	$(".other").addClass("light");
	$(".veggie, .meat, .fruit, .fish, .meatfish").removeClass("light");
	$("#bother").css({
		"background-color": "#88684c82"
	});
	$("#bveggie, #bmeat, #bfruit, #bfish").css({
		"background-color": "transparent"
	});
});

$('#bclear').click(function clear() {
	$(".veggie, .meat, .fruit, .fish, .meatfish, .other").removeClass("light");
	$("#bveggie, #bmeat, #bfruit, #bfish, #bother").css({
		"background-color": "transparent"
	});
});

$('#buttonds, #buttonrog, #buttonsw, #buttonh, #buttondst, #buttonwarly').click(function() {
	$(function() {
		$(".cookpot img.lzy, .cookpotbutton img.lzy").each(function() {
			var dataSrc = $(this).attr('data-src');
			if (dataSrc) {
				$(this).attr('src', dataSrc);
			}
		});
	});
});

$('.cookpot > div > p > span > a > img').on('click', function() {
	if (event.ctrlKey == true) {
		var href = $(this).attr('data-image-name').replace('.png', '');
		window.open(href, '_blank').focus();
	}
});
}

var cookpot = [];
var dlc = "DS";
var warly = false;
var cookpotTimer;
setTimeout(timer, 1000);
window.cookpotDeleteResult = function() {
	if ((cookpot[0] !== undefined) && (cookpot[1] !== undefined) && (cookpot[2] !== undefined) && (cookpot[3] !== undefined)) {
		if (navigator.userAgent.includes('Firefox')) {
			$('#result1').removeAttr('src');
		} else {
			$('#result1').attr('src', ' ');
		}
		$('#arrowcookpot').attr('src', "https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru");
		$('#chance1').text(' ');
		$('#description1').css({
			"display": "none"
		});
		for (var i = 4; i > 1; --i) {
			if (($('#result' + i).css('display')) !== 'none') {
				$('#chance' + i).text(' ');
				$('#description' + i).css({
					"display": "none"
				});
				$('#result' + i).removeClass('ingredientcookpot');
				$('#result' + i).addClass('hiddeningredientcookpot');
				$('#result' + i).attr('src', ' ');
			}
		}
		clearInterval(cookpotTimer);
		for (var k = 0; k < 15; k++) {
			delete cookpotResult[k];
		}
	}
};

window.cookpotDelete = function(i) {
	cookpotDeleteResult();
	delete cookpot[i];
	if (navigator.userAgent.includes('Firefox')) {
		$('#cookpot' + (i + 1)).removeAttr('src');
	} else {
		$('#cookpot' + (i + 1)).attr('src', ' ');
	}
};

window.cookpotDeleteAll = function() {
	cookpotDeleteResult();
	for (var i = 0; i < 4; i++) {
		delete cookpot[i];
		if (navigator.userAgent.includes('Firefox')) {
			$('#cookpot' + (i + 1)).removeAttr('src');
		} else {
			$('#cookpot' + (i + 1)).attr('src', ' ');
		}
	}
};


window.cookpotAdd = function(title, src) { //Добавляет ингридиент в казан, если слот пустой то он добавляет в него, если слот был удалён, также добавляет в него
	if (event.ctrlKey !== true) {
		if (cookpot[0] === undefined) {
			cookpot[0] = title;
			$('#cookpot1').attr('src', src);
		} else if (cookpot[1] === undefined) {
			cookpot[1] = title;
			$('#cookpot2').attr('src', src);
		} else if (cookpot[2] === undefined) {
			cookpot[2] = title;
			$('#cookpot3').attr('src', src);
		} else if (cookpot[3] === undefined) {
			cookpot[3] = title;
			$('#cookpot4').attr('src', src);
		}
		if ((cookpot[0] !== undefined) && (cookpot[1] !== undefined) && (cookpot[2] !== undefined) && (cookpot[3] !== undefined)) {
			var api = new mw.Api();
			clearInterval(cookpotTimer);
			api.get({
				action: 'expandtemplates',
				text: '{{#invoke:Cookpot|cookpotCalculate|' + dlc + '|' + warly + '|' + cookpot[0] + '|' + cookpot[1] + '|' + cookpot[2] + '|' + cookpot[3] + '}}'
			}).done(function(data) {
				cookpotResult = data.expandtemplates['*'];
				return cookpotResult;
			});
			if (($('#result1').attr('src') == ' ') || ($('#result1').attr('src') === undefined)) {
				src = $('#cookpotatwork').children('img').attr('data-src');
				$('#arrowcookpot').attr('src', src);
			}
			cookpotTimer = setInterval(showResult, 700);
		}
	}
};

window.showResult = function() {
	function returnResult() {
		if ((cookpotResult !== undefined) && (cookpotResult[0] !== undefined)) {
			clearInterval(cookpotTimer);
			if ((cookpotResult.length !== 20) && (cookpotResult !== undefined)) {
				cookpotResult = cookpotResult.split(', ');
			}
			for (var i = 0; i <= 15; i = i + 5) {
				if (cookpotResult[i] !== '0') {
					var src = $('#' + cookpotResult[i]).children('img').attr('data-src');
					var id = (i / 5 + 1);
					$('#result' + id).attr('src', src);
					if (i !== 0) {
						$('#result' + id).removeClass('hiddeningredientcookpot');
						$('#result' + id).addClass('ingredientcookpot');
					}
					$('#arrowcookpot').attr('src', "https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru");
					$('#name' + id).text(cookpotResult[i + 1]);
					$('#health' + id).text(' ' + cookpotResult[i + 2] + ' ');
					$('#hunger' + id).text(' ' + cookpotResult[i + 3] + ' ');
					$('#sanity' + id).text(' ' + cookpotResult[i + 4] + ' ');
					$('#description' + id).css({
						"display": ""
					});
				}
				if (cookpotResult[15] !== '0') {
					$('#chance1, #chance2, #chance3, #chance4').text('25%');
				} else if (cookpotResult[10] !== '0') {
					$('#chance1, #chance2, #chance3').text('33%');
				} else if (cookpotResult[5] !== '0') {
					$('#chance1, #chance2').text('50%');
				}
			}
		}
	}
	return returnResult();
};

intervalCookpotResult = setInterval(timerCookpotResult, 1000);

function timerCookpotResult() {
	if (($('#result1').attr('src') !== undefined)) {
		$('#result1').on('click', function() {
			if (event.ctrlKey == true) {
				var href = cookpotResult[1];
				window.open(href, '_blank');
			}
		});
		$('#result2').on('click', function() {
			if (event.ctrlKey == true) {
				var href = cookpotResult[6];
				window.open(href, '_blank');
			}
		});
		$('#result3').on('click', function() {
			if (event.ctrlKey == true) {
				var href = cookpotResult[11];
				window.open(href, '_blank');
			}
		});
		$('#result4').on('click', function() {
			if (event.ctrlKey == true) {
				var href = cookpotResult[16];
				window.open(href, '_blank');
			}
		});
		$('#name1').on('click', function() {
			var href = cookpotResult[1];
			window.open(href, '_blank');
		});
		$('#name2').on('click', function() {
			var href = cookpotResult[6];
			window.open(href, '_blank');
		});
		$('#name3').on('click', function() {
			var href = cookpotResult[11];
			window.open(href, '_blank');
		});
		$('#name4').on('click', function() {
		    var href = cookpotResult[16];
			window.open(href, '_blank');
		});
		clearInterval(intervalCookpotResult);
	}
}