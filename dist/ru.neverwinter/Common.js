/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
$("#artifacts-table").prepend('<fieldset><legend>Параметры фильтра таблицы:</legend><p style="margin-bottom: 0.5em;">Нижеследующие таблицы можно отфильтровать. Несколько фильтров могут быть применены сразу, выбрав несколько параметров.</p><div class="table-filters-hide-option" id="table-filters">Параметры<select><option>Все</option><option value="Максимум хитов">Максимум хитов</option><option value="Точность">Точность</option><option value="Критический урон">Критический урон</option><option value="Осведомленность">Осведомленность</option><option value="Боевое преимущество">Боевое преимущество</option><option value="Вероятность критического удара">Вероятность критического удара</option><option value="Критическое уклонение">Критическое уклонение</option><option value="Оборона">Оборона</option><option value="Уклонение">Уклонение</option><option value="Скорость движения">Скорость движения</option><option value="Могущество">Могущество</option><option value="Восстановление здоровья">Восстановление здоровья</option><option value="Влияние спутника">Влияние спутника</option><option value="Принимаемое лечение">Принимаемое лечение</option><option value="Бонус к контролю">Бонус к контролю</option><option value="Сопротивляемость контролю">Сопротивляемость контролю</option></select><select><option>Все</option><option value="Максимум хитов">Максимум хитов</option><option value="Точность">Точность</option><option value="Критический урон">Критический урон</option><option value="Осведомленность">Осведомленность</option><option value="Боевое преимущество">Боевое преимущество</option><option value="Вероятность критического удара">Вероятность критического удара</option><option value="Критическое уклонение">Критическое уклонение</option><option value="Оборона">Оборона</option><option value="Уклонение">Уклонение</option><option value="Скорость движения">Скорость движения</option><option value="Могущество">Могущество</option><option value="Восстановление здоровья">Восстановление здоровья</option><option value="Влияние спутника">Влияние спутника</option><option value="Принимаемое лечение">Принимаемое лечение</option><option value="Бонус к контролю">Бонус к контролю</option><option value="Сопротивляемость контролю">Сопротивляемость контролю</option></select><select><option>Все</option><option value="Максимум хитов">Максимум хитов</option><option value="Точность">Точность</option><option value="Критический урон">Критический урон</option><option value="Осведомленность">Осведомленность</option><option value="Боевое преимущество">Боевое преимущество</option><option value="Вероятность критического удара">Вероятность критического удара</option><option value="Критическое уклонение">Критическое уклонение</option><option value="Оборона">Оборона</option><option value="Уклонение">Уклонение</option><option value="Скорость движения">Скорость движения</option><option value="Могущество">Могущество</option><option value="Восстановление здоровья">Восстановление здоровья</option><option value="Влияние спутника">Влияние спутника</option><option value="Принимаемое лечение">Принимаемое лечение</option><option value="Бонус к контролю">Бонус к контролю</option><option value="Сопротивляемость контролю">Сопротивляемость контролю</option></select><select><option>Все</option><option value="Максимум хитов">Максимум хитов</option><option value="Точность">Точность</option><option value="Критический урон">Критический урон</option><option value="Осведомленность">Осведомленность</option><option value="Боевое преимущество">Боевое преимущество</option><option value="Вероятность критического удара">Вероятность критического удара</option><option value="Критическое уклонение">Критическое уклонение</option><option value="Оборона">Оборона</option><option value="Уклонение">Уклонение</option><option value="Скорость движения">Скорость движения</option><option value="Могущество">Могущество</option><option value="Восстановление здоровья">Восстановление здоровья</option><option value="Влияние спутника">Влияние спутника</option><option value="Принимаемое лечение">Принимаемое лечение</option><option value="Бонус к контролю">Бонус к контролю</option><option value="Сопротивляемость контролю">Сопротивляемость контролю</option></select><select><option>Все</option><option value="Максимум хитов">Максимум хитов</option><option value="Точность">Точность</option><option value="Критический урон">Критический урон</option><option value="Осведомленность">Осведомленность</option><option value="Боевое преимущество">Боевое преимущество</option><option value="Вероятность критического удара">Вероятность критического удара</option><option value="Критическое уклонение">Критическое уклонение</option><option value="Оборона">Оборона</option><option value="Уклонение">Уклонение</option><option value="Скорость движения">Скорость движения</option><option value="Могущество">Могущество</option><option value="Восстановление здоровья">Восстановление здоровья</option><option value="Влияние спутника">Влияние спутника</option><option value="Принимаемое лечение">Принимаемое лечение</option><option value="Бонус к контролю">Бонус к контролю</option><option value="Сопротивляемость контролю">Сопротивляемость контролю</option></select></div></fieldset>');

$("#equipment-table").wrap($('<div id="fieldset-equipment-table" />"'));
$("#fieldset-equipment-table").prepend('<fieldset> <legend>Параметры:</legend> <div> <h4>Предмет:</h4> <input type="text" name="search" placeholder="Поиск по имени"> </div> <div> <h4>Уровень:</h4> <label>Мин.:<input type="text" size="1" name="min"></label> - <label>Макс.:<input type="text" size="1" name="max"></label> </div> <div> <h4>Ячейка/Категория:</h4> <select class="category"> <option>Все</option> <option value="Голова">Лицо</option> <option value="Доспехи">Доспех</option> <option value="Руки">Руки</option> <option value="Ноги">Ноги</option> <option value="Рубаха">Рубаха</option> <option value="Пояс">Талия</option> <option value="Штаны">Штаны</option> <option value="Шея">Шея</option> <option value="Кольцо">Кольцо</option> <option value="Правая руки">Правая руки</option> <option value="Левая рука">Левая рука</option> <option value="Только для спутников">Экипировка спутника</option> </select> </div> <div > <h4>Параметры:</h4> <div class="stats"></div> </div> <div > <h4>Класс:</h4> <div class="classes"></div> </div></div></fieldset>');

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
    var tbody = document.querySelector("#equipment-table tbody");
    var trs = Array.from(tbody.querySelectorAll("tr"));
    var temp = {
      "stats": new Set(),
      "category": new Set(),
      "classes": new Set()
    };
    trs.forEach(function (tr) {

        var _tr$dataset = tr.dataset,
        stats = _tr$dataset.stats,
        category = _tr$dataset.category,
        classes = _tr$dataset.classes;
    	
        if (!tr.dataset.stats) {
        } else {
            stats = stats.split(",");
            stats.forEach(function (e) {
                return temp.stats.add(e.trim());
            });
        }
        if (!tr.dataset.classes) {
        } else {
            classes = classes.split(",");
            classes.forEach(function (e) {
                return temp.classes.add(e.trim());
            });
        }
        if (!tr.dataset.category) {
        } else {  
            category = category.split(",");
            category.forEach(function (e) {
                return temp.category.add(e.trim());
            });
        }
    });

    // Добавляет параметры предмета
    temp.stats.forEach(function (item) {
      item = "<label><input type=\"checkbox\" name=\"".concat(item, "\" checked>").concat(item, "</label>");
      document.querySelector("#fieldset-equipment-table .stats").insertAdjacentHTML("beforeend", item);
    });
	
	// Добавляет классы предмета
	if(document.querySelector("#fieldset-equipment-table .classes")) {
	    temp.classes.forEach(function (item) {
	        item = "<label><input type=\"checkbox\" name=\"".concat(item, "\" checked>").concat(item, "</label>");
	        document.querySelector("#fieldset-equipment-table .classes").insertAdjacentHTML("beforeend", item);
	    });
	}
    
    //Добавляет категории предмета
    /*for (let item of temp.category) {
        item = `<option value="${item}">${item}</option>`;
        document.querySelector(".category").insertAdjacentHTML("beforeend", item)
    }*/

    // Основной скрипт поиска
    document.querySelector("#fieldset-equipment-table fieldset").addEventListener("input", function () {
      tbody.innerHTML = "";
      tbody.append.apply(tbody, trs);
      trs.forEach(function (tr) {
        var _tr$dataset = tr.dataset,
            subject = _tr$dataset.subject,
            stats = _tr$dataset.stats,
            level = _tr$dataset.level,
            category = _tr$dataset.category,
            classes = _tr$dataset.classes;
            
        // Поиск по параметрам
        if (!tr.dataset.stats) {
        } else {
            stats = stats.split(", ");
            stats = stats.some(function (e) {
            return document.querySelector("#fieldset-equipment-table .stats [name=\"".concat(e.trim(), "\"]")).checked;
            });
    
            if (!stats) {
            tr.remove();
            return "continue";
            }
        }

        if (tr.dataset.classes) {
            // Поиск по классам
            classes = classes.split(",");
            classes = classes.some(function (e) {
            return document.querySelector("#fieldset-equipment-table .classes [name=\"".concat(e.trim(), "\"]")).checked;
            });
    
            if (!classes) {
            tr.remove();
            return "continue";
            }
        }

        if (!tr.dataset.category) {
        } else {
            // Поиск по категориям
            category = category.split(",");
            var txt = document.querySelector("#fieldset-equipment-table .category").value;
            category = category.some(function (e) {
            return e.trim() == txt;
            });
    
            if (txt !== "Все" && !category) {
            tr.remove();
            return "continue";
            }
        }

        if (!tr.dataset.subject) {
        } else {
            // Поиск по тексту
            var search = document.querySelector("[name='search']").value.toLowerCase();
            if (search && subject.toLowerCase().indexOf(search)) {
            tr.remove();
            return "continue";
            }
        }

        if (!tr.dataset.level) {
        } else {
            // Поиск по уровню
            var min = document.querySelector("[name='min']").value;
            if (min && level < +min) {
            tr.remove();
            return "continue";
            }

            var max = document.querySelector("[name='max']").value;
            if (max && level > +max) {
            tr.remove();
            return "continue";
            }
        }
      });
      
      // Значение по умолчанию если результатов 0
      if (tbody.children.length == 0) tbody.insertAdjacentHTML("beforeend", "<tr><th>Нет совпадений</th></tr>");
    });