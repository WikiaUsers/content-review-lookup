/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

 
/**
 * Switch Infobox -- Allows multiple infoboxes to be seamlessly switched.
 * Required template: https://runescape.wikia.com/wiki/Template:Switch_infobox
 * Required stylesheet: https://runescape.wikia.com/wiki/User:Matthew2602/SwitchInfobox.css
 */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:RemoveLegacyThreads.js',
    ]
});

// Fixes a weird bug with the MW parser that adds lots of empty parapgraphs
$( '.switch-infobox > p, .switch-infobox-triggers > p' ).each( function() {
    if ( $( this ).children( 'br' ).length ) {
        $( this ).remove();
    } else {
        $( this ).replaceWith( this.innerHTML );
    }
});
 
// Appends the switch triggers to every item
$( '.switch-infobox' ).each( function() {
        // The switch triggers
        var triggers = $( this ).children( '.switch-infobox-triggers' );
 
        $( this ).children( '.item' ).find( 'caption' ).append( triggers );
} );
 
// Does the actual switching
$( '.switch-infobox' ).find( '.switch-infobox-triggers' ).children( '.trigger' ).click( function() {
    // The parent .switch-infobox of the clicked trigger
    var parentSwitchInfobox = $( this ).parents( '.switch-infobox' );
    // Hides items showing
    parentSwitchInfobox.children( '.item.showing' ).removeClass( 'showing' );
    // Show the relevant item
    parentSwitchInfobox.children( '.item[data-id="' + this.getAttribute( 'data-id' ) + '"]' ).addClass( 'showing' );
} );
 
// Finishes loading and makes switch infoboxes functional
$( '.switch-infobox.loading' ).removeClass( 'loading' );
 
//Debug
console.log('Initialised switch infoboxes', $( '.switch-infobox' ).length);


/* Динамически-подгружаемый контент с других страниц */
$("table.ajax").each(function (i) {
	var table = $(this).attr("id", "ajaxTable" + i);
	table.find(".nojs-message").remove();
	var headerLinks = $('<span style="float: right;">').appendTo(table.find('th').first());
	var cell = table.find("td").first();
	var needLink = true;
	cell.parent().show();
	if (cell.hasClass("showLinkHere")) {
		var old = cell.html();
		var rep = old.replace(/\[link\](.*?)\[\/link\]/, '<a href="javascript:;" class="ajax-load-link">$1</a>');
		if (rep !== old) {
			cell.html(rep);
			needLink = false;
		}
	}
	if (needLink){
		headerLinks.html('[<a href="javascript:;" class="ajax-load-link">Показать данные</a>]');
	}
	table.find(".ajax-load-link").parent().addBack().filter('a').click(function(event) {
		event.preventDefault();
		var sourceTitle = table.data('ajax-source-page'), baseLink = mw.config.get('wgScript') + '?';
		cell.text('Таблица загружается, пожалуйста, подождите.');
		$.get(baseLink + $.param({ action: 'render', title: sourceTitle }), function (data) {
			if (!data) {
				return;
			}
			cell.html(data);
			cell.find('.ajaxHide').remove();
			if (cell.find("table.sortable").length) {
				mw.loader.using('jquery.tablesorter', function() {
					cell.find("table.sortable").tablesorter();
				});
			}
			headerLinks.text('[');
			headerLinks.append($('<a>Редактировать</a>').attr('href', baseLink + $.param({ action: 'edit', title: sourceTitle })));
			headerLinks.append(document.createTextNode(']\u00A0['));
			var shown = true;
			$("<a href='javascript:;'>Скрыть</a>").click(function() {
				shown = !shown;
				cell.toggle(shown);
				$(this).text(shown ? 'Скрыть' : 'Показать');
			}).appendTo(headerLinks);
			headerLinks.append(document.createTextNode(']'));
		}).error(function() {
			cell.text('Невозможно загрузить таблицу. Возможно, искомая страница не существует.');
		});
	});
});

/*Right module discord */
window.AddRailModule = [
    {page: 'Template:Discord', prepend: true}];

/*
 * Калькулятор хп боссов
 * Скрипт написан [[Участник:Wormix Game]]
*/
$(function(){
	var bossName = "";
	var hpModuleInvokeResult = null;
	var maxAsyncWaitForResultCount = 10;
	var maxChecksForCalcSpan = 5;
	
	function checkResult(currentRequestCount){
		var spanToWriteResult = $("#calcResult")[0];
		if (hpModuleInvokeResult == null){
			if (currentRequestCount != maxAsyncWaitForResultCount){
				setTimeout(checkResult, 1000, currentRequestCount + 1);
			}else{
				spanToWriteResult.innerHTML = "Время ожидания истекло, возможно у вас неустойчивое интернет соединение.";
			}
		}else{
			spanToWriteResult.innerHTML = hpModuleInvokeResult;
		}
	}
	
	window.getBossHp = function() {
		var spanToWriteResult = $("#calcResult")[0];
		var playersCount = Number($("#players-count-field")[0].value);
		var resultText = "ЕРРОР"; 
		if (!isNaN(playersCount)){
			if (0 < playersCount && playersCount <= 256){
				var api = new mw.Api();
				hpModuleInvokeResult = null;
				api.get({
					action: 'expandtemplates',
					text: '{{BossHpCalculator|' + bossName + '|players=' +  playersCount + '}}'
				}).done(function(data) {
					hpModuleInvokeResult = data.expandtemplates['*'];
				});
				resultText = "Ожидайте...";
				checkResult(1);
			}else{
				resultText = "Значение должно быть в диапазоне от 1 до 256";
			}
		}else{
			resultText = "Введите числовое значение.";
		}
		spanToWriteResult.innerHTML = resultText;
	}
	
	var timeUntilNewCheck = 1000;
	var currentCheck = 1;
	
	function checkSpan(){
		var spanToInsertControls = $("#calc")[0];
		if (spanToInsertControls !== undefined){
			bossName = $("#calc")[0].innerText;
			if (bossName !== "") {
				spanToInsertControls.innerHTML = "";
			}
			$('<input id="players-count-field" type="number" max="256" min="2" placeholder="Кол-во игроков" value="2" maxlength="3">').appendTo(spanToInsertControls);
			$('<input id="calculate-hp-boss" onclick="getBossHp()" type="button" value="Рассчитать">').appendTo(spanToInsertControls);
		}else{
			timeUntilNewCheck += 2000;
			if (currentCheck != maxChecksForCalcSpan){
				currentCheck += 1;
				setTimeout(checkSpan, timeUntilNewCheck);
			}
		}
	}
	
	checkSpan();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
 * Hair Dyes slider, for [[Hair Dyes]] page.
 */
$(function() {
    var $sliders = $(".hair-dye-slider-wrapper .slider");
    if(!$sliders.length){
        return;
    }
    var textTime = function(slidervalue) {
        var time = slidervalue*864 + 16200;
        time -= (time > 86400 ? 86400 : 0);
        if (time < 3600) {
            return ''
                + Math.floor(time/3600 + 12) + ":" + Math.round((time/3600 + 12 - Math.floor(time/3600 + 12))*60).toString().padStart(2,0)
                + '&nbsp;до полудня';
        } else if (time < 43200) {
            return ''
                + Math.floor(time/3600) + ":" + Math.round((time/3600 - Math.floor(time/3600))*60).toString().padStart(2,0)
                + '&nbsp;до полудня';
        } else if (time < 46800) {
            return ''
                + Math.floor(time/3600) + ":" + Math.round((time/3600 - Math.floor(time/3600))*60).toString().padStart(2,0)
                + '&nbsp;после полудня';
        } else {
            return ''
                + Math.floor(time/3600 - 12) + ":" + Math.round((time/3600 - 12 - Math.floor(time/3600 - 12))*60).toString().padStart(2,0)
                + '&nbsp;после полудня';
        }
    };
    var colorSpeed = function(slidervalue) {
        var num = slidervalue * 0.1;
        var num2 = 10;
        var num3 = num / num2;
        var num4 = 1 - num3;
        var playerHairColor = { "R": 215, "G": 90, "B": 55 };
        var newColor = { "R": 255, "G": 255, "B": 255 };
        newColor.R = (75 * num3 + playerHairColor.R * num4);
        newColor.G = (255 * num3 + playerHairColor.G * num4);
        newColor.B = (200 * num3 + playerHairColor.B * num4);
        return "rgb(" + newColor.R + "," + newColor.G + "," + newColor.B + ")";
    };
    var colorTime = function(slidervalue) {
        var time = slidervalue*864 + 16200;
        time -= (time > 86400 ? 86400 : 0);
        var color4 = { "R": 1, "G": 142, "B": 255 };
        var color5 = { "R": 255, "G": 255, "B": 0 };
        var color6 = { "R": 211, "G": 45, "B": 127 };
        var color7 = { "R": 67, "G": 44, "B": 118 };
        var newColor = { "R": 255, "G": 255, "B": 255 };
        if (time >= 16200 && time < 70200) {
            if (time < 43200) {
                var num5 = time / 43200;
                var num6 = 1 - num5;
                newColor.R = (color4.R * num6 + color5.R * num5);
                newColor.G = (color4.G * num6 + color5.G * num5);
                newColor.B = (color4.B * num6 + color5.B * num5);
            } else {
                var num7 = 43200;
                var num8 = ((time - num7) / (70200 - num7));
                var num9 = 1 - num8;
                newColor.R = (color5.R * num9 + color6.R * num8);
                newColor.G = (color5.G * num9 + color6.G * num8);
                newColor.B = (color5.B * num9 + color6.B * num8);
            }
        } else {
            if (time >= 70200 && time < 86400) {
                var num10 = (time / 86400);
                var num11 = 1 - num10;
                newColor.R = (color6.R * num11 + color7.R * num10);
                newColor.G = (color6.G * num11 + color7.G * num10);
                newColor.B = (color6.B * num11 + color7.B * num10);
            } else {
                var num12 = 0;
                var num13 = ((time - num12) / (16200 - num12));
                var num14 = 1 - num13;
                newColor.R = (color7.R * num14 + color4.R * num13);
                newColor.G = (color7.G * num14 + color4.G * num13);
                newColor.B = (color7.B * num14 + color4.B * num13);
            }
        }
        return "rgb(" + newColor.R + "," + newColor.G + "," + newColor.B + ")";
    };
    var colorFunc = function ($type, $value) {
        switch($type) {
            case "health":
                return "rgb(" + ($value * 2.35 + 20) + ",20,20)";
            case "mana":
                return "rgb(" + (250 - $value * 2) + "," + (255 - $value * 1.80) + ",255)";
            case "speed":
                return colorSpeed($value);
            case "time":
                return colorTime($value);
            default:
                return "#0ff";
        }
    };
    var textFunc = function ($type, $value) {
        // return the function from the textFunctions table if the id is correct
        // otherwise, return a fallback function that just returns the raw, unchanged slider value
        switch($type) {
            case "speed":
                return (($value === 100) ? "≥ 51" : Math.round($value/10 * 3.75*(15/11)));
            case "time":
                return textTime($value);
            default:
                return $value;
        }
    };
    var update = function($slider){
        var $value = parseInt($slider.data('input').val());
        var $type = $slider.data('type');
        // update color display
        $slider.data('colorBox').css('background-color', colorFunc($type, $value));
        // update text display
        $slider.data('valueBox').html(textFunc($type, $value));
    };
    // create all sliders and make them visible
    $sliders.each(function(){
        var $slider = $(this).append($("<input type='range' style='margin: auto 0.5em'/>"));
        var $wrapper = $slider.parents('.hair-dye-slider-wrapper').show();
        var $valueBox = $wrapper.find(".inputvalue");
        var $input = $slider.find('input').val($valueBox.text()).on('input', function() {
            update($slider);
        });
        $slider.val($valueBox.text()).data({
            valueBox: $valueBox,
            colorBox: $wrapper.find(".color-box"),
            input: $input,
            type: $wrapper.attr('id')
        });
        update($slider);
    });
});