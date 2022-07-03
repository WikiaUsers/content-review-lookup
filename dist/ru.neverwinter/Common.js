/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
$("#artifacts-table").prepend('<fieldset><legend>Параметры фильтра таблицы:</legend><p style="margin-bottom: 0.5em;">Нижеследующие таблицы можно отфильтровать. Несколько фильтров могут быть применены сразу, выбрав несколько параметров.</p><div class="table-filters-hide-option" id="table-filters">Параметры<select><option>Все</option><option value="Максимум хитов">Максимум хитов</option><option value="Точность">Точность</option><option value="Критический урон">Критический урон</option><option value="Осведомленность">Осведомленность</option><option value="Боевое преимущество">Боевое преимущество</option><option value="Вероятность критического удара">Вероятность критического удара</option><option value="Критическое уклонение">Критическое уклонение</option><option value="Оборона">Оборона</option><option value="Уклонение">Уклонение</option><option value="Скорость движения">Скорость движения</option><option value="Могущество">Могущество</option><option value="Восстановление здоровья">Восстановление здоровья</option><option value="Влияние спутника">Влияние спутника</option><option value="Принимаемое лечение">Принимаемое лечение</option><option value="Бонус к контролю">Бонус к контролю</option><option value="Сопротивляемость контролю">Сопротивляемость контролю</option></select><select><option>Все</option><option value="Максимум хитов">Максимум хитов</option><option value="Точность">Точность</option><option value="Критический урон">Критический урон</option><option value="Осведомленность">Осведомленность</option><option value="Боевое преимущество">Боевое преимущество</option><option value="Вероятность критического удара">Вероятность критического удара</option><option value="Критическое уклонение">Критическое уклонение</option><option value="Оборона">Оборона</option><option value="Уклонение">Уклонение</option><option value="Скорость движения">Скорость движения</option><option value="Могущество">Могущество</option><option value="Восстановление здоровья">Восстановление здоровья</option><option value="Влияние спутника">Влияние спутника</option><option value="Принимаемое лечение">Принимаемое лечение</option><option value="Бонус к контролю">Бонус к контролю</option><option value="Сопротивляемость контролю">Сопротивляемость контролю</option></select><select><option>Все</option><option value="Максимум хитов">Максимум хитов</option><option value="Точность">Точность</option><option value="Критический урон">Критический урон</option><option value="Осведомленность">Осведомленность</option><option value="Боевое преимущество">Боевое преимущество</option><option value="Вероятность критического удара">Вероятность критического удара</option><option value="Критическое уклонение">Критическое уклонение</option><option value="Оборона">Оборона</option><option value="Уклонение">Уклонение</option><option value="Скорость движения">Скорость движения</option><option value="Могущество">Могущество</option><option value="Восстановление здоровья">Восстановление здоровья</option><option value="Влияние спутника">Влияние спутника</option><option value="Принимаемое лечение">Принимаемое лечение</option><option value="Бонус к контролю">Бонус к контролю</option><option value="Сопротивляемость контролю">Сопротивляемость контролю</option></select><select><option>Все</option><option value="Максимум хитов">Максимум хитов</option><option value="Точность">Точность</option><option value="Критический урон">Критический урон</option><option value="Осведомленность">Осведомленность</option><option value="Боевое преимущество">Боевое преимущество</option><option value="Вероятность критического удара">Вероятность критического удара</option><option value="Критическое уклонение">Критическое уклонение</option><option value="Оборона">Оборона</option><option value="Уклонение">Уклонение</option><option value="Скорость движения">Скорость движения</option><option value="Могущество">Могущество</option><option value="Восстановление здоровья">Восстановление здоровья</option><option value="Влияние спутника">Влияние спутника</option><option value="Принимаемое лечение">Принимаемое лечение</option><option value="Бонус к контролю">Бонус к контролю</option><option value="Сопротивляемость контролю">Сопротивляемость контролю</option></select><select><option>Все</option><option value="Максимум хитов">Максимум хитов</option><option value="Точность">Точность</option><option value="Критический урон">Критический урон</option><option value="Осведомленность">Осведомленность</option><option value="Боевое преимущество">Боевое преимущество</option><option value="Вероятность критического удара">Вероятность критического удара</option><option value="Критическое уклонение">Критическое уклонение</option><option value="Оборона">Оборона</option><option value="Уклонение">Уклонение</option><option value="Скорость движения">Скорость движения</option><option value="Могущество">Могущество</option><option value="Восстановление здоровья">Восстановление здоровья</option><option value="Влияние спутника">Влияние спутника</option><option value="Принимаемое лечение">Принимаемое лечение</option><option value="Бонус к контролю">Бонус к контролю</option><option value="Сопротивляемость контролю">Сопротивляемость контролю</option></select></div></fieldset>');

$("#equipment-table").wrap($('<div id="fieldset-equipment-table" />"'));
$("#fieldset-equipment-table").prepend('<fieldset id="settings"><legend>Параметры:</legend><div style="line-height: 2.5;"><div><span>Предмет: </span><input type="text" name="search" style="width: 180px;" placeholder="Поиск предмета по имени"></div><div><span>Ячейка/Категория: </span><select class="category"><option>Все</option></select></div><div><span>Качество: </span><select class="quality"><option>Любое качество</option></select></div><div><span>Минимальный уровень: </span><label>Мин.: <input type="text" size="1" name="min"></label> - <label>Макс.: <input type="text" size="1" name="max"></label></div><div><span>Уровень предмета: </span><label>Мин.: <input type="text" size="1" name="min"></label> - <label>Макс.: <input type="text" size="1" name="max"></label></div></div><div><span>Параметры:</span><div class="stats"></div></div><div><span>Класс:</span><div class="role"></div></div></fieldset>');

// merges a repeating cell in a table
/*$(function() {
    $.map($(".merge-duplicate-td"), function(b, a) {
        return $("tr td:nth-child(" + ++a + ")")
    }).forEach(function(b) {
        var a;
        b.each(function(b, c) {
            a && a.textContent == c.textContent ? ($(c).remove(), a.rowSpan++) : a = c
        })
    })
});*/

// default setting to turn tooltips on
var tooltipsOn = true;

var $tfb;
var activeHoverLink = null;
var tipCache = new Object();

// hides the tooltip
function hideTip() {
  $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
  activeHoverLink = null;
}

// displays the tooltip
function displayTip(e) {
  $tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
  moveTip(e);
  $tfb.not(":empty").css("visibility","visible");
  moveTip(e);
}

// moves the tooltip
function moveTip(e) {
	var $ct = $tfb.not(":empty");
	var eh = $ct.innerHeight() + 20, wh = $(window).height();
	var newTop = e.clientY + ((e.clientY > (wh/2)) ? -eh : 20);
	var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($ct.innerWidth()+20):20);
	newTop = Math.max(105, Math.min(wh - eh, newTop));
	$ct.css({"position":"fixed","font-size":"0.90em","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTip(e) {
  var $t=$(this);
  activeHoverLink = $t;
  $p=$t.parent();
  if ($p.hasClass("selflink")==false) {
    $t.removeAttr("title");
    $p.removeAttr("title");
   /*var url = "/ru/index.php?title="+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F").replace(/\+/g,"%2B")+"&action=render .tooltip-content";*/
   var url = "/ru/index.php?title=" + encodeURIComponent(decodeURIComponent($t.data("tt"))) + "&action=render " + 'div[class*="tooltip-content"]';
    if (tipCache[url] != null) {
      $tfb.html(tipCache[url]);
      displayTip(e);
      return;
    }
    $tfb.load(url,function () {
      if ($t != activeHoverLink) return;
      if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
      $tfb.find(".tooltip-content").css("display","");
      tipCache[url] = $tfb.html();
      displayTip(e);
    });
  }
}

function bindTT() {
  $t=$(this);
  $p=$t.parent();
  if ($p.hasClass("selflink") == false) {
    $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).hover(showTip,hideTip).mousemove(moveTip);
  }
}

// check to see if it is active then do it
function ttMouseOver() {
  if (tooltipsOn) {
    $("#content").append('<div id="tfb" class="htt"></div>');
    $tfb = $("#tfb");
    $("#content span.ajaxttlink").each(bindTT);
  }
}

$(ttMouseOver);

/**
 * demarcateDialogue
 *   Additional class formatting "dialogue" for sections titled as dialogue or text on mainspace articles
 */
(function demarcateDialogue (window, document) {
    if (mw.config.get('wgNamespaceNumber') == 0) {
        $('h2').each(function (i, e) {
            var h2Content = this.innerHTML.match(/(диалог|text)/i);
            if (h2Content) {
                $(this).nextUntil(this.tagName).wrapAll('<div class="dialogue"></div>');
            }
        });
    }
}) (window, document);


/**
 * Simple craft calculator
 */
$(function(){
  var resultCountInput = '<input type="text" size="4" maxlength="4"/>';
  $(".simpleCraftCalcResultCount").empty().append(resultCountInput);
  var craftCountSpans = ' (<span class="simpleCraftCalcCraftCount">1</span> &times; ' +
      '<span class="simpleCraftCalcInitialCount">1</span> = <span class="simpleCraftCalcProduct">1</span>) <sup>' +
      '<abbr title="Кол-во крафтов &times; кол-во предметов, изготавливаемых за 1 крафт = получаемое кол-во предметов в результате">?</abbr></sup>';
  $(".simpleCraftCalcResultCount").append(craftCountSpans);
  $(".simpleCraftCalcResultCount").each(function(index, element)
  {
    var resultEl = $(element);
    var countInput = resultEl.find("input");
    var initialCount = parseInt(resultEl.data("initial-count"));
    countInput.val(initialCount);
    if(initialCount > 1) countInput.attr("title", "Округляется вверх до ближайшего кратного " + initialCount);
    countInput.change(valueChanged);
    countInput.keyup(valueChanged);

    resultEl.find(".simpleCraftCalcInitialCount").text(initialCount);
    resultEl.find(".simpleCraftCalcProduct").text(initialCount);
  });

  function valueChanged(event)
  {
    var countInput = $(this);
    var count = parseInt(countInput.val());
    if(isFinite(count) && count > 0)
    {
      var initialCount = parseInt(countInput.parents(".simpleCraftCalcResultCount").data("initial-count"));
      var crafts = craftCount(count, initialCount);
      var recipeBase = countInput.parents(".simpleCraftCalcRecipeBase");
      var craftCountSpan = recipeBase.find(".simpleCraftCalcCraftCount");
      craftCountSpan.text(crafts);
      var productSpan = recipeBase.find(".simpleCraftCalcProduct");
      productSpan.text(crafts * initialCount);

      recipeBase.find(".simpleCraftCalcIngredientCount").each(function(index, element)
      {
        var ingSpan = $(this);
        var ingInitialCount = parseInt(ingSpan.data("initial-count"));
        ingSpan.text(crafts * ingInitialCount);
      });
    }
  }

  function craftCount(resultCount, initialCount)
  {
    return Math.ceil(resultCount / initialCount);
  }
});

// Filter table
$(function() {
    var pattern = [],
    tbody = $(".filter-table tbody"),
    trs = $("[data-stats]", tbody),
    $selHideOption = $('.table-filters-hide-option select'),
    $opt = $('option:not(:first-child)', $selHideOption);
    $("#table-filters select").each(function(i, select) {
        var el = $(select);
        pattern.push(select.value);
        el.change(function() {
        
       // Скрывает выбранные уже параметры из остальных <select></select>
        var $chosen = $selHideOption.map(function(i, el){
            return $(':selected',el);
        });
        var $teamId = null;
        $opt.prop('disabled', false);
        $chosen.each(function(i, el){0
            $teamId = $(el).val();
            $opt.not(el).filter(function(){
                return $(this).val() == $teamId;
            }).prop('disabled', true);
        })
        // конец кода
        
        pattern[i] = select.value;
         var rows = trs.hide().filter(function(i, tr) {
        	var data = $(tr).data("stats").split(", ");
            var arr = pattern.slice(0);
            data.forEach(function(a) {
            var i = arr.indexOf(a);
            if(i != -1) arr.splice(i,1);
            })
            return arr.every(function(txt, k) {
                return txt == "Все"
            })
        }).show();
        tbody.toggleClass("no-results", !rows.length )
       })
    })
});

//Filter for equipment table
//Author: Roni (Рони) Thanks to him for this script
$(function() {
    $(".stats").on("change", "input[type='checkbox']", function() {
        $(this).closest("label").toggleClass("active", this.checked);
     });

    var $tbody = $("#equipment-table").children("tbody");
    var $trs = $("tr", $tbody).toArray();
    var colCount = $("#equipment-table").find("tr:first th").length;
    $("#equipment-table").children("tbody").children("tr")
    var temp = {
	    "stats": new Set(),
	    "category": ["Голова", "Доспехи", "Руки", "Ноги", "Рубаха", "Пояс", "Штаны", "Шея", "Кольцо", "Правая руки", "Левая рука", "Только для спутников"],
        "role": ["Любой класс", "Клирик", "Варвар", "Чернокнижник", "Плут", "Воин", "Бард", "Паладин", "Следопыт", "Волшебник"],
	};
	
    $.each($trs, function() {
        if (typeof $(this).data('stats') != 'undefined'){
            $stats = $(this).data('stats');
            $stats = $stats.split(",");
            $.each($stats, function(index, value) { temp.stats.add(value.trim()); });
        }
	});
	
	// Добавляет параметры предмета
	temp.stats.forEach(function (item) {
	    item = "<label class=\"checkbox\"><input type='checkbox' name='" + item + "'>" + item + "</label>";
	    $("#settings .stats").append(item);
	});
	
	// Добавляет классы предмета
	temp.role.forEach(function (item) {
	    item = "<label class=\"checkbox\"><input type='checkbox' name='" + item + "'>" + item + "</label>";
	    $("#settings .role").append(item);
	});

	// Добавляет категории предмета в выпадающий список
    temp.category.forEach(function (item) {
        item = '<option value="' + item + '">' + item + '</option>';
        $("#settings .category").append(item);
    });

	// Добавляет категории предмета в выпадающий список
    item = '<option value="Обычный">Обычный</option><option value="Необычный">Необычный</option><option value="Редкий">Редкий</option><option value="Эпический">Эпический</option><option value="Легендарный">Легендарный</option><option value="Мифический">Мифический</option>';
    $("#settings .quality").append(item);

	trs = $("#equipment-table").children("tbody").children("tr");

	// Основной скрипт поиска
	$('#settings').on('input', function() {
        $tbody.html('')
        $tbody.append(trs)

	    $.each($trs, function() {
	        var $subject = $(this).data('subject'), $quality = $(this).data('quality'), $level = $(this).data('level');
	        // Поиск по параметрам
            if (typeof $(this).data('stats') != 'undefined'){
                $stats = $(this).data('stats');
                $stats = $stats.split(",");
                $stats = $stats.some(function (e) {
                   return $("#settings .stats [name=\"" + e.trim() + "\"]").is(':checked');
                });
                if (!$stats && $("#settings .stats :checked").get(0)) {
                    $(this).remove();
                    return;
                }
            }

	        // Поиск по классам
            if (typeof $(this).data('role') != 'undefined'){
                $role = $(this).data('role');
                $role = $role.split(",");
                $role = $role.some(function (e) {
                   return $("#settings .role [name=\"" + e.trim() + "\"]").is(':checked');
                });
                if (!$role && $("#settings .role :checked").get(0)) {
                    $(this).remove();
                    return;
                }
            }

	        // Поиск по категориям
            if (typeof $(this).data('category') != 'undefined'){
                $category = $(this).data('category');
                $category = $category.toLowerCase().split(",");
                var $txt = $("#settings .category").val().toLowerCase();
                $category = $category.some(function (e) {
                    return e.trim() == $txt;
                });
                if ($txt !== "все" && !$category) {
                    $(this).remove();
                    return;
                }
            }

	        // Поиск по качеству
            var $txt = $("#settings .quality").val();
            if ($txt.toLowerCase() !== "любое качество" && $txt.toLowerCase() !== $quality.toLowerCase()) {
                $(this).remove();
                return;
            }

	        // Поиск по названии
	        var $search = $("[name='search']").val().toLowerCase();
	        if ($search && $subject.toLowerCase().indexOf($search)) {
	            $(this).remove();
	            return;
	        }
	
	        // Поиск по минимальному уровню
	        var $min = $("[name='min']").val();
	        if ($min && $level < +$min) {
	            $(this).remove();
	            return;
	        }
	        
	        // Поиск по максимальному уровню
	        var $max =$("[name='max']").val();
	        if ($max && $level > +$max) {
	            $(this).remove();
	            return;
	        }
	    });

	    // Выводит строку "Предметы не найдены", если результатов "0".
	    if ($tbody.children().length == 0) {$tbody.append("<tr><td colspan=" + colCount + ">Предметы не найдены</td></tr>");}
	});
});