/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
$("#artifacts-table").prepend('<fieldset><legend>Параметры фильтра таблицы:</legend><p style="margin-bottom: 0.5em;">Нижеследующие таблицы можно отфильтровать. Несколько фильтров могут быть применены сразу, выбрав несколько параметров.</p><div class="table-filters-hide-option" id="table-filters"><select class="stats"><option>Выбрать...</option></select><select class="stats"><option>Выбрать...</option></select><select class="stats"><option>Выбрать...</option></select><select class="stats"><option>Выбрать...</option></select></div></fieldset>');

$("#equipment-table").wrap($('<div id="fieldset-equipment-table" />"'));
$("#fieldset-equipment-table").prepend('<fieldset id="settings"><legend>Параметры:</legend><table><tbody><tr><td><span>Предмет:</span></td><td><input type="text" name="search" placeholder="Поиск предмета по имени"></div></td></tr><tr><td><span>Ячейка/Категория:</span></td><td><select class="category"><option>Все</option></select></td></tr><tr><td><span>Качество:</span></td><td><select class="quality"><option>Любое качество</option></select></td></tr><tr><td><span>На себе:</span></td><td><select class="equip"><option>Все</option></select></td></tr><tr><td><span>Класс:</span></td><td><select class="role"></select></td></tr><tr><td><span>Минимальный уровень:</span></td><td><label>Мин.: <input type="text" size="1" name="min"></label> - <label>Макс.: <input type="text" size="1" name="max"></label></td></tr><tr><td><span>Уровень предмета:</span></td><td><label>Мин.: <input type="text" size="1" name="min"></label> - <label>Макс.: <input type="text" size="1" name="max"></label></td></tr></tbody></table><div style="float: right;"><span>Параметры (можно выбрать макс. три параметра): </span><div class="stats"></div></div></fieldset>');

// merges a repeating cell in a table
$(function() {
    $.map($("table"), function(b, a) {
        return $(".merge-duplicate-td:nth-child(" + ++a + ")")
    }).forEach(function(b) {
        var a;
        b.each(function(b, c) {
            a && a.textContent == c.textContent ? ($(c).remove(), a.rowSpan++) : a = c
        })
    })
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
            
            var $subject = $(tr).data('subject'), $quality = $(tr).data('quality'), $level = $(tr).data('level');
            
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
            if ($search && $subject.toLowerCase().indexOf($search)) {
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