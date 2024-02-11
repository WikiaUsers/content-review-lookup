/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// Фильтр для таблицы Бонусы знака
$(".insignia-bonuses-table").before('<fieldset style="border: 1px solid #919191; border-radius: 5px;"><legend>Параметры:</legend><span>Возможно за: </span><input list="mountsList" id="selectedMount" style="width: 20%;" placeholder="Поиск по названию..."><datalist id="mountsList"></datalist><span> Содержащие знак: </span><div class="table-filters" style="display: inline-block !important; padding: 5px !important; display: flex; justify-content: center; align-items: center; flex-wrap: wrap;"><button class="btnIBT" type="button" value="Ячейка серповидных знаков"><img src="https://static.wikia.nocookie.net/neverwinter_ru_gamepedia/images/6/61/Серповидный_знак.png" style="width: 32px;"></button><button class="btnIBT" type="button" value="Ячейка просвещенных знаков"><img src="https://static.wikia.nocookie.net/neverwinter_ru_gamepedia/images/3/3c/Просвещенный_знак.png" style="width: 32px;"></button><button class="btnIBT" type="button" value="Ячейка украшенных знаков"><img src="https://static.wikia.nocookie.net/neverwinter_ru_gamepedia/images/c/c9/Украшенный_знак.png" style="width: 32px;"></button><button class="btnIBT" type="button" value="Ячейка царственных знаков"><img src="https://static.wikia.nocookie.net/neverwinter_ru_gamepedia/images/1/1a/Царственный_знак.png" style="width: 32px;"></button><button class="btnIBT" type="button" value="Ячейка шипастых знаков"><img src="https://static.wikia.nocookie.net/neverwinter_ru_gamepedia/images/5/52/Шипастый_знак.png" style="width: 32px;"></button></div></fieldset>');

$(function(){
    var uniqueMounts = new Set(); // Массив уникальных значений маунтов

    // Проходим по каждой строке в таблице
    $('.insignia-bonuses-table tbody tr').each(function() {
        // Получаем маунты из текущей строки и разделяем их
        var mountsData = $(this).data('mounts');
        var mounts = mountsData ? mountsData.split(', ') : [];

        // Добавляем уникальные маунты в массив
        mounts.forEach(function(mount) {
            uniqueMounts.add(mount);
        });
    });

    // Сортируем массив уникальных маунтов по алфавиту
    var sortedMounts = Array.from(uniqueMounts).sort();

    // Заполняем выпадающий список отсортированными значениями
    sortedMounts.forEach(function(mount) {
        $('#mountsList').append($('<option>', { value: mount, text: mount }));
    });

    // Обработчики событий для выпадающего списка и кнопок
    $('#selectedMount, .btnIBT').on('input click', updateFilters);

    // Функция обновления фильтров
    function updateFilters() {
        var selectedMount = $('#selectedMount').val();
        var selectedButtons = $('.btnIBT.active').map(function() {
            return $(this).val();
        }).get();
        $('.btnIBT:not(.active)').prop('disabled', selectedButtons.length >= 4);

        // Удаляем все строки "Не найдено"
        $('.insignia-bonuses-table tbody tr.not-found').remove();

        // Проверяем, есть ли выбранный маунт или введенные слова
        if (selectedMount || selectedButtons.length > 0) {
            var filterString = (selectedMount ? '[data-mounts*="' + selectedMount + '"]' : '') + selectedButtons.map(function(buttonValue) {
                return '[data-filter*="' + buttonValue + '"]';
            }).join('');
            var $filteredRows = $('.insignia-bonuses-table tbody tr').hide().filter(filterString);

            if ($filteredRows.length === 0) {
                $('.insignia-bonuses-table tbody').append('<tr class="not-found"><td colspan="2" style="text-align: center;font-weight: bold;">Не найдено</td></tr>');
            } else {
                $filteredRows.show();
            }
        } else {
            // Если ничего не выбрано или не введено, показываем все строки
            $('.insignia-bonuses-table tbody tr').show();
        }
    }

    // Обработчик клика по кнопкам
    $('.btnIBT').click(function() {
        $(this).toggleClass('active');
        updateFilters();
    });
});


$("#artifacts-table").prepend('<fieldset><legend>Параметры фильтра таблицы:</legend><p style="margin-bottom: 0.5em;">Нижеследующие таблицы можно отфильтровать. Несколько фильтров могут быть применены сразу, выбрав несколько параметров.</p><div class="table-filters-hide-option" id="table-filters"><select class="stats"><option>Выбрать...</option></select><select class="stats"><option>Выбрать...</option></select><select class="stats"><option>Выбрать...</option></select><select class="stats"><option>Выбрать...</option></select></div></fieldset>');

$("#equipment-table").wrap($('<div id="fieldset-equipment-table" />"'));
$("#fieldset-equipment-table").prepend('<fieldset id="settings"><legend>Параметры:</legend><table><tbody><tr><td><span>Предмет:</span></td><td><input type="text" name="search" placeholder="Поиск предмета по имени"></div></td></tr><tr><td><span>Ячейка/Категория:</span></td><td><select class="category"><option>Все</option></select></td></tr><tr><td><span>Качество:</span></td><td><select class="quality"><option>Любое качество</option></select></td></tr><tr><td><span>На себе:</span></td><td><select class="equip"><option>Все</option></select></td></tr><tr><td><span>Класс:</span></td><td><select class="role"></select></td></tr><tr><td><span>Минимальный уровень:</span></td><td><label>Мин.: <input type="text" size="1" name="min"></label> - <label>Макс.: <input type="text" size="1" name="max"></label></td></tr><tr><td><span>Уровень предмета:</span></td><td><label>Мин.: <input type="text" size="1" name="min"></label> - <label>Макс.: <input type="text" size="1" name="max"></label></td></tr></tbody></table><div style="float: right;"><span>Параметры (можно выбрать макс. три параметра): </span><div class="stats"></div></div></fieldset>');

// merges a repeating cell in a table
var all = $('.merge-duplicate-td');
var first;
var prev = undefined;
var rowspan = 1;
  
var setRowspan = function() {
  first.attr('rowspan', rowspan);
  rowspan = 1;
}
    
all.each(function() {
  var txt = $(this).text();
  if (prev === txt) {
    rowspan += 1;
    $(this).remove();
  } else {
    // doesnt match, set colspan on first and reset colspan counter
    if (rowspan > 1) {
      setRowspan();
    }
    first = $(this);
    prev = txt;
  }
});
  
if (rowspan > 1) {
  setRowspan();
}
    
$('.artifact-weapon-table tr').each(function(){
  var $this = $(this),
      title = $this.attr('data-power');
  var $foundFIgure = $('[data-power="'+title+'"]');
    
  if($foundFIgure.length > 1){
    $foundFIgure.eq(0).addClass("artifact-weapon-table-top");
    $foundFIgure.eq(1).addClass("artifact-weapon-table-bottom");
  }
});

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
   var url = "/ru/index.php?title=" + encodeURIComponent(decodeURIComponent($t.data("tt"))) + "&action=render " + 'div[class*="tooltip"]';
    if (tipCache[url] != null) {
      $tfb.html(tipCache[url]);
      displayTip(e);
      return;
    }
    $tfb.load(url,function () {
      if ($t != activeHoverLink) return;
      if ($tfb.html() == "") $tfb.html('<div class="tooltip"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
      $tfb.find(".tooltip").css("display","");
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
    $("#content .ajaxttlink").each(bindTT);
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
        temp = { "stats": new Set() };

    $.each(trs, function() {
        if (typeof $(this).data('stats') != 'undefined'){
            $stats = $(this).data('stats');
            $stats = $stats.split(",");
            $.each($stats, function(index, value) { temp.stats.add(value.trim()); });
        }
	});

    // Adds item parameters
	temp.stats.forEach(function (item) {
        item = '<option value="' + item + '">' + item + '</option>';
	    $("#table-filters .stats").append(item);
	});

    var $selHideOption = $('#table-filters select'),
        $opt = $('option:not(:first-child)', $selHideOption);

    $("#table-filters select").each(function(i, select) {
        var el = $(select);
        pattern.push(select.value);
        el.change(function() {
        
            // Hides already selected options from other <select></select>
            var $chosen = $selHideOption.map(function(i, el){
                console.log();
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
            
            pattern[i] = select.value;
            var rows = trs.hide().filter(function(i, tr) {
                var data = $(tr).data("stats").split(",");
                var arr = pattern.slice(0);
                data.forEach(function(a) {
                    var i = arr.indexOf(a.trim());
                    if(i != -1) arr.splice(i,1);
                })
                return arr.every(function(txt, k) {
                    return txt == "Выбрать..."
                })
            }).show();
            // Outputs the string "Items not found" if the results are "0".
            if (rows.length == 0) {tbody.append("<tr><td colspan=\"3\">Предметы не найдены</td></tr>");}
        })
    })
});

//Filter for equipment table
//Author: Roni (Рони) Thanks to him for this script
$(function() {
    var $tbody = $("#equipment-table").children("tbody");
    var $trs = $("tr", $tbody).toArray();
    var colCount = $("#equipment-table > thead > tr > th").length;
    var temp = {
        "equip": new Set(),     
        "stats": new Set(),
        "category": ["Голова", "Доспехи", "Руки", "Ноги", "Рубаха", "Пояс", "Штаны", "Шея", "Кольцо", "Правая руки", "Левая рука", "Только для спутников"],
        "role": ["Любой класс", "Клирик", "Варвар", "Чернокнижник", "Плут", "Воин", "Бард", "Паладин", "Следопыт", "Волшебник"],
    };
    
    $.each($trs, function() {
        if (typeof $(this).data('equip') != 'undefined'){
            $equip = $(this).data('equip');
            temp.equip.add($equip);
        }
        if (typeof $(this).data('stats') != 'undefined'){
            $stats = $(this).data('stats');
            $stats = $stats.split(",");
            $.each($stats, function(index, value) { temp.stats.add(value.trim()); });
        }
    });
    
    // Adds equip bonus
    Array.from(temp.equip).sort().forEach(function (item) {
        item = '<option value="' + item + '">' + item + '</option>'
        $("#settings .equip").append(item);
    });
    // Adds item parameters
    temp.stats.forEach(function (item) {
        item = "<label class=\"checkbox\" value='" + item + "'><input type='checkbox' name='" + item + "'>" + item + "</label>";
        $("#settings .stats").append(item);
    });
    
    // Adds item role
    temp.role.forEach(function (item) {
        item = '<option value="' + item + '">' + item + '</option>';
        $("#settings .role").append(item);
    });

    // Adds item categories to the dropdown list
    temp.category.forEach(function (item) {
        item = '<option value="' + item + '">' + item + '</option>';
        $("#settings .category").append(item);
    });

    item = '<option value="Обычный">Обычный</option><option value="Необычный">Необычный</option><option value="Редкий">Редкий</option><option value="Эпический">Эпический</option><option value="Легендарный">Легендарный</option><option value="Мифический">Мифический</option>';
    $("#settings .quality").append(item);

    //Limit on the number of selected parameters
    $('#settings .stats input[type=checkbox]').change(function(){
        if($('#settings .stats input[type=checkbox]:checked').length >= 3){
            $('#settings .stats input[type=checkbox]:not(:checked)').prop('disabled', true);
        } else{
            $('#settings .stats input[type=checkbox]:disabled').prop('disabled', false);
        }
    });

    // Main search script
    $('#settings').on('input', function() {
        // Search by parameters
        var pattern = [], trs = $("[data-stats]", $tbody), el;
        $("#settings .stats :checked").each(function(i, checked) {
            el = $(checked);
            pattern.push(checked.name);
        })
        var rows = trs.hide().filter(function(i, tr) {
            var data = $(tr).data("stats").split(",");
            var arr = pattern.slice(0);
            data.forEach(function(a) {
                var i = arr.indexOf(a.trim());
                if(i != -1) arr.splice(i,1);
            })

            return arr.every(function(txt, k) {
                return txt == ""
            })

        }).show();

        // Outputs the string "Items not found" if the results are "0".
        if (rows.length === 0) {$tbody.append("<tr><td colspan=" + colCount + ">Предметы не найдены</td></tr>");}

        $.each($trs, function(index, tr) {
            //ECMAScript 6
            //let {subject, level, category, quality, role, stats} = $(tr).data();
            
            var $subject = $(tr).data('subject').toLowerCase(), $quality = $(tr).data('quality'), $level = $(tr).data('level');
            
            // Search by equip
            if (typeof $(this).data('equip') != 'undefined'){
                $equip = $(this).data('equip');
                $equip = $equip.toLowerCase().split(",");
                var $txt = $("#settings .equip").val().toLowerCase();
                $equip = $equip.some(function (e) {
                    return e.trim() == $txt;
                });
                if ($txt !== "все" && !$equip) {
                    $(tr).hide();
                    return;
                }
            }
            // Search by class
            if (typeof $(this).data('role') != 'undefined'){
                $role = $(this).data('role');
                $role = $role.toLowerCase().split(",");
                var $txt = $("#settings .role").val().toLowerCase();
                $role = $role.some(function (e) {
                    return e.trim() == $txt;
                });
                if ($txt !== "любой класс" && !$role) {
                    $(tr).hide();
                    return;
                }
            }

            // Search by category
            if (typeof $(this).data('category') != 'undefined'){
                $category = $(this).data('category');
                $category = $category.toLowerCase().split(",");
                var $txt = $("#settings .category").val().toLowerCase();
                $category = $category.some(function (e) {
                    return e.trim() == $txt;
                });
                if ($txt !== "все" && !$category) {
                    $(tr).hide();
                    return;
                }
            }

            // Search by quality
            if (typeof $(this).data('quality') != 'undefined'){
                var $txt = $("#settings .quality").val().toLowerCase();
                if ($txt !== "любое качество" && $txt !== $quality.toLowerCase()) {
                    $(tr).hide();
                    return;
                }
            }
            // Search by name
            var $search = $("[name='search']").val().toLowerCase();
            if ($subject.includes($search) == false) {
                $(tr).hide();
                return;
            }
    
            // Search by minimum level
            var $min = $("[name='min']").val();
            if ($min && $level < +$min) {
                $(tr).hide();
                return;
            }
            
            // Search by max level
            var $max =$("[name='max']").val();
            if ($max && $level > +$max) {
                $(tr).hide();
                return;
            }
        });


        // Outputs the string "Items not found" if the results are "0".
        //ECMAScript 6
        //if ($tbody.children().length === 0) {$tbody.append(`<tr><td colspan="${colCount}" style="text-align: center;">Предметы не найдены</td></tr>`);}
        if ($("#equipment-table > tbody > tr:visible").length === 0) {$tbody.append('<tr id="last"><td colspan=\"' + colCount + '\" style="text-align: center;">Предметы не найдены</td></tr>');

    }else{$("#equipment-table > tbody > tr#last").remove(); }
                
    })
});