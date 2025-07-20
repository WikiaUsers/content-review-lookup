/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// Фильтр для таблицы Бонусы знака
$(".insignia-bonuses-table").before('<fieldset style="border: 1px solid #919191; border-radius: 5px;"><legend>Параметры:</legend><span>Возможно за: </span><input list="mountsList" id="selectedMount" style="width: 20%;" placeholder="Поиск по названию скакуна..."><datalist id="mountsList"></datalist><span> Содержащие знак: </span><div class="table-filters" style="display: inline-block !important; padding: 5px !important; display: flex; justify-content: center; align-items: center; flex-wrap: wrap;"><button class="btnIBT" type="button" value="Ячейка серповидных знаков"><img src="https://static.wikia.nocookie.net/neverwinter_ru_gamepedia/images/6/61/Серповидный_знак.png" style="width: 32px;"></button><button class="btnIBT" type="button" value="Ячейка просвещенных знаков"><img src="https://static.wikia.nocookie.net/neverwinter_ru_gamepedia/images/3/3c/Просвещенный_знак.png" style="width: 32px;"></button><button class="btnIBT" type="button" value="Ячейка украшенных знаков"><img src="https://static.wikia.nocookie.net/neverwinter_ru_gamepedia/images/c/c9/Украшенный_знак.png" style="width: 32px;"></button><button class="btnIBT" type="button" value="Ячейка царственных знаков"><img src="https://static.wikia.nocookie.net/neverwinter_ru_gamepedia/images/1/1a/Царственный_знак.png" style="width: 32px;"></button><button class="btnIBT" type="button" value="Ячейка шипастых знаков"><img src="https://static.wikia.nocookie.net/neverwinter_ru_gamepedia/images/5/52/Шипастый_знак.png" style="width: 32px;"></button></div></fieldset>');

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

// TOOLTIP
// This script enhances wiki pages by adding interactive tooltips to links with class "ajaxttlink".
// It fetches the TooltipItem template from the wiki, renders it dynamically, 
// and positions the tooltip near the hovered link without caching the content.

const tooltipsOn = true;
let $tfb, activeHoverLink;

const hideTip = () => {
  if (!$tfb) return;
  $tfb.html('').addClass('hidden').removeClass('tooltip-ready').css('visibility', 'hidden');
  activeHoverLink = null;
};

const moveTip = e => {
  if (!$tfb || !$tfb.length || !$tfb.hasClass('tooltip-ready') || !activeHoverLink) return;

  const $link = $(activeHoverLink),
        linkOffset = $link.offset();
  if (!linkOffset) return;

  const linkHeight = $link.outerHeight(),
        linkWidth = $link.outerWidth(),
        tooltipHeight = $tfb.outerHeight(),
        tooltipWidth = $tfb.outerWidth(),
        windowHeight = $(window).height(),
        windowWidth = $(window).width(),
        scrollTop = $(window).scrollTop(),
        fixedHeaderHeight = 46,
        paddingTop = 10,
        paddingBottom = 45;

  let left = linkOffset.left + linkWidth + 10;
  let top = linkOffset.top + (linkHeight / 2) - (tooltipHeight / 2) - scrollTop;

  if (left + tooltipWidth > windowWidth) {
    left = linkOffset.left - tooltipWidth - 10;
  }
  top = Math.max(fixedHeaderHeight + paddingTop, Math.min(top, windowHeight - tooltipHeight - paddingBottom));

  requestAnimationFrame(() => {
    $tfb.css({ position: 'fixed', fontSize: '0.90em', top: `${top}px`, left: `${left}px`, zIndex: 100 });
  });
};

const showTip = (e, $t) => {
  if (!$t || !$t.length || $t.parent().hasClass('selflink')) return;

  const title = $t.data('tt') || $t.attr('title');
  if (!title) return;

  $t.removeAttr('title');

  const url = `/ru/index.php?title=${encodeURIComponent(decodeURIComponent(title))}&action=raw`,
        newQuality = $t.closest('.ajaxttlink').attr('data-quality');

  hideTip();
  activeHoverLink = $t;

  function extractTemplate(wikitext, templateName) {
    const startIndex = wikitext.indexOf(`{{${templateName}`);
    if (startIndex === -1) return '';

    let index = startIndex + 2;
    let braces = 2;
    while (index < wikitext.length && braces > 0) {
      const char = wikitext[index];
      const nextChar = wikitext[index + 1];
      if (char === '{' && nextChar === '{') {
        braces += 2;
        index++;
      } else if (char === '}' && nextChar === '}') {
        braces -= 2;
        index++;
      }
      index++;
    }

    return wikitext.substring(startIndex, index);
  }

  $.get(url, wikitext => {
    if ($t !== activeHoverLink) return;

    const enTitle = (wikitext.match(/\[\[en:([^\]]+)\]\]/) || [])[1] || '';
    let tooltipText = extractTemplate(wikitext, 'TooltipItem');

    if (!tooltipText) return;

    if (newQuality) {
      if (/\|\s*качество\s*=/.test(tooltipText)) {
        tooltipText = tooltipText.replace(/\|\s*качество\s*=\s*[^\n|}]+/, `|качество=${newQuality}`);
      } else {
        tooltipText = tooltipText.replace(/\{\{TooltipItem/, `{{TooltipItem|качество=${newQuality}`);
      }
    }

    tooltipText = tooltipText.replace(/\}\}$/, `|temp_en_title=${enTitle}}}`);

    $.ajax({
      url: '/ru/api.php',
      data: { action: 'parse', format: 'json', text: tooltipText, title, prop: 'text', contentmodel: 'wikitext' },
      dataType: 'json',
      success: data => {
        if ($t !== activeHoverLink) return;
        if (data.error) {
          $tfb.html('API Error: ' + data.error.info);
        } else {
          const html = data.parse.text['*'],
                $tooltip = $(html).find('.tooltip-content');
          if ($tooltip.length) {
            $tfb.html($tooltip);
          } else {
            $tfb.html('Error: could not extract tooltip.');
          }
        }
        $tfb.removeClass('hidden').addClass('tooltip-ready').css('visibility', 'visible');
        moveTip(e);
      },
      error: () => {
        $tfb.html('API request error').removeClass('hidden').addClass('tooltip-ready').css('visibility', 'visible');
        moveTip(e);
      }
    });
  }).fail(() => {
    $tfb.html('Error loading page').removeClass('hidden').addClass('tooltip-ready').css('visibility', 'visible');
    moveTip(e);
  });
};

$(() => {
  if (!tooltipsOn) return;
  $('#content').append('<div id="tfb" class="htt hidden"></div>');
  $tfb = $('#tfb');

  $('#content')
    .on('mouseenter', '.ajaxttlink a', function (e) {
      const $link = $(this);
      if (!$link.data('tt') && $link.attr('title')) {
        $link.data('tt', $link.attr('title').replace(' (page does not exist)', '').replace('?', '%3F'));
      }
      showTip(e, $link);
    })
    .on('mouseleave', '.ajaxttlink a', hideTip)
    .on('mousemove', '.ajaxttlink a', moveTip);
});
// END TOOLTIP

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
                return $(':selected',el);
            });
            var $teamId = null;
            $opt.prop('disabled', false);
			$chosen.each(function(i, el) {
			    $teamId = $(el).val();
			    $opt.not(el).filter(function() {
			        return $(this).val() == $teamId;
			    }).prop('disabled', true);
			});
            
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

/**
 * This script dynamically updates HTML tables with class 'timer-table' to display event schedules.
 * It highlights the active event at the top, sorts upcoming events by start time, and adjusts times
 * to the user's local timezone. The table is refreshed every second for real-time countdowns.
 *
 * Functionality:
 * - Targets tables with class 'timer-table' and processes each independently.
 * - Expects three columns: Time (data-time-cell), Event name, Status (data-start-time, optional data-duration).
 * - Formats event times in 24-hour format (e.g., 13:30–13:45) in the user's local timezone.
 * - Identifies the active event (if current time is within its duration) and marks it with 'active-event' class.
 * - Sorts non-active events by time until start, marking the nearest as 'Nearest'.
 * - Updates statuses with countdowns (e.g., 'Active (remains X min Y sec)', 'in X hr Y min Z sec').
 * - Rebuilds the table each second to reflect the current order and times.
 *
 * Requirements:
 * - Tables must have class 'timer-table' and the specified column structure.
 * - Rows must include data-start-time (Unix timestamp) and optionally data-duration (seconds).
 * - Default event duration is 15 minutes if data-duration is absent.
 *
 * Usage: Add to MediaWiki:Common.js to enable real-time event tables on wiki pages.
 */
$(document).ready(function() {
  const eventDurationDefault = 15 * 60; // 15 минут в секундах

  // Расписание — часы событий (с 30 по 45 минуту)
  const schedule = [
    { hour: 1, minute: 30, duration: eventDurationDefault, name: 'Разбойники крепости', icon: '<img src="/images/f/f3/Icon_Event_Pvp.png" alt="PvP" style="width:20px;vertical-align:middle;">' },
    { hour: 3, minute: 30, duration: eventDurationDefault, name: 'Разбойники крепости', icon: '<img src="/images/f/f3/Icon_Event_Pvp.png" alt="PvP" style="width:20px;vertical-align:middle;">' },
    { hour: 5, minute: 30, duration: eventDurationDefault, name: 'Разбойники крепости', icon: '<img src="/images/f/f3/Icon_Event_Pvp.png" alt="PvP" style="width:20px;vertical-align:middle;">' },
    { hour: 7, minute: 30, duration: eventDurationDefault, name: 'Разбойники крепости', icon: '<img src="/images/f/f3/Icon_Event_Pvp.png" alt="PvP" style="width:20px;vertical-align:middle;">' },
    { hour: 9, minute: 30, duration: eventDurationDefault, name: 'Разбойники крепости', icon: '<img src="/images/f/f3/Icon_Event_Pvp.png" alt="PvP" style="width:20px;vertical-align:middle;">' },
    { hour: 11, minute: 30, duration: eventDurationDefault, name: 'Разбойники крепости', icon: '<img src="/images/f/f3/Icon_Event_Pvp.png" alt="PvP" style="width:20px;vertical-align:middle;">' },
    { hour: 13, minute: 30, duration: eventDurationDefault, name: 'Разбойники крепости', icon: '<img src="/images/f/f3/Icon_Event_Pvp.png" alt="PvP" style="width:20px;vertical-align:middle;">' },
    { hour: 15, minute: 30, duration: eventDurationDefault, name: 'Разбойники крепости', icon: '<img src="/images/f/f3/Icon_Event_Pvp.png" alt="PvP" style="width:20px;vertical-align:middle;">' },
    { hour: 17, minute: 30, duration: eventDurationDefault, name: 'Разбойники крепости', icon: '<img src="/images/f/f3/Icon_Event_Pvp.png" alt="PvP" style="width:20px;vertical-align:middle;">' },
    { hour: 19, minute: 30, duration: eventDurationDefault, name: 'Разбойники крепости', icon: '<img src="/images/f/f3/Icon_Event_Pvp.png" alt="PvP" style="width:20px;vertical-align:middle;">' },
    { hour: 21, minute: 30, duration: eventDurationDefault, name: 'Разбойники крепости', icon: '<img src="/images/f/f3/Icon_Event_Pvp.png" alt="PvP" style="width:20px;vertical-align:middle;">' },
    { hour: 23, minute: 30, duration: eventDurationDefault, name: 'Разбойники крепости', icon: '<img src="/images/f/f3/Icon_Event_Pvp.png" alt="PvP" style="width:20px;vertical-align:middle;">' },
  ];

  const table = document.querySelector('.event-timer-table');
  if (!table) return;

  function getNextEventTime(hour, minute) {
    const now = new Date();
    let eventDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0);

    // Если событие уже прошло сегодня, переносим на завтра
    if (eventDate < now) {
      eventDate.setDate(eventDate.getDate() + 1);
    }
    return eventDate;
  }

  function formatTimeRange(startDate, duration) {
    const endDate = new Date(startDate.getTime() + duration * 1000);
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    return `${startDate.toLocaleTimeString([], options)}–${endDate.toLocaleTimeString([], options)}`;
  }

  function updateTable() {
    const now = new Date();

    // Удаляем все строки кроме заголовка
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    // Создаем список событий с актуальными временами и статусом
    const events = schedule.map(ev => {
      const startTime = getNextEventTime(ev.hour, ev.minute);
      const endTime = new Date(startTime.getTime() + ev.duration * 1000);
      const timeUntil = (startTime - now) / 1000;
      const isActive = now >= startTime && now <= endTime;
      let status;

      if (isActive) {
        const timeLeft = Math.floor((endTime - now) / 1000);
        const minutesLeft = Math.floor(timeLeft / 60);
        const secondsLeft = timeLeft % 60;
        status = `<b>Активно</b> (осталось ${minutesLeft} мин ${secondsLeft} сек)`;
      } else {
        if (timeUntil > 3600) {
          const h = Math.floor(timeUntil / 3600);
          const m = Math.floor((timeUntil % 3600) / 60);
          const s = Math.floor(timeUntil % 60);
          status = `через ${h} ч ${m} мин ${s} сек`;
        } else {
          const m = Math.floor(timeUntil / 60);
          const s = Math.floor(timeUntil % 60);
          status = `через ${m} мин ${s} сек`;
        }
      }

      return { ev, startTime, duration: ev.duration, status, isActive, timeUntil };
    });

    // Сортируем: активное событие — в начало, остальные по времени до старта
    const activeEvent = events.find(e => e.isActive);
    let sortedEvents = events.filter(e => !e.isActive).sort((a, b) => a.timeUntil - b.timeUntil);

    if (activeEvent) {
      sortedEvents.unshift(activeEvent);
    } else if (sortedEvents.length > 0) {
      sortedEvents[0].status = `<b>Ближайшее</b> (${sortedEvents[0].status.replace('через ', '')})`;
    }

    // Вставляем строки в таблицу
    sortedEvents.forEach(event => {
      const row = table.insertRow();
      row.classList.toggle('active-event', event.isActive);

      const cellTime = row.insertCell();
      const cellName = row.insertCell();
      const cellStatus = row.insertCell();

      cellTime.innerHTML = formatTimeRange(event.startTime, event.duration);
      cellName.innerHTML = `${event.ev.icon} ${event.ev.name}`;
      cellStatus.innerHTML = event.status;
    });
  }

  updateTable();
  setInterval(updateTable, 1000);
});

// This script ensures correct zebra striping on all `.wikitable` tables,
// preserving the CSS :nth-child(odd) background color styling even when rows are hidden via `display:none`.
// It works by detaching hidden rows from the DOM, so :nth-child(odd) counts only visible rows,
// and re-attaches them when they become visible again.
//
// The script observes changes in each table body (`tbody`), such as sorting or filtering,
// and updates the DOM accordingly with a slight debounce to optimize performance.
$(function() {
  $('.wikitable tbody').each(function() {
    const $tbody = $(this);
    let detachedRows = $();

    // Cache previous count of visible rows to avoid unnecessary updates
    let prevVisibleCount = -1;

    function updateRows() {
      const $rows = $tbody.children('tr');
      const $hidden = $rows.filter((_, tr) => $(tr).css('display') === 'none');
      const $visible = $rows.not($hidden);

      // Only update if the number of visible rows has changed
      if ($visible.length === prevVisibleCount) return;
      prevVisibleCount = $visible.length;

      // Re-attach previously detached rows if they are now visible
      if (detachedRows.length) {
        const $toReattach = detachedRows.filter((_, tr) => $(tr).css('display') !== 'none');
        if ($toReattach.length) {
          $tbody.append($toReattach);
          detachedRows = detachedRows.not($toReattach);
        }
      }

      // Detach rows that are hidden but still in the DOM
      const newToDetach = $hidden.filter((_, tr) => !detachedRows.is(tr));
      if (newToDetach.length) {
        detachedRows = detachedRows.add(newToDetach.detach());
      }
    }

    updateRows();

    // Observe changes in tbody that may affect row visibility, such as sorting or filtering
    const observer = new MutationObserver(() => {
      clearTimeout($tbody.data('updateTimeout'));
      $tbody.data('updateTimeout', setTimeout(updateRows, 50)); // debounce updates for performance
    });
    observer.observe($tbody[0], { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
  });
});