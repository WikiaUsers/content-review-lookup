/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

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
	$ct.css({"position":"fixed","font-size":"0.755em","top":newTop + "px","left":newLeft + "px"});
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
$(function()
{
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
      $tbody = $(".filter-table tbody"),
      $trs = $("[data-filter]", $tbody),
      $sel = $('#table-filters select'),
      $selHideOption = $('.table-filters-hide-option select'),
      $opt = $('option:not(:first-child)', $selHideOption);
  $sel.each(function(i, select) {
    var $el = $(select);
    pattern.push(select.value);
    $el.change(function() {
      pattern[i] = select.value;
      var $rows = $trs.hide().filter(function(i, tr) {
        var $data = $(tr).data("filter").split(", ");
        var arr = pattern.slice(0);
        $data.forEach(function(a) {
        var i = arr.indexOf(a);
        if(i != -1) arr.splice(i,1);
        })
        return arr.every(function(txt, k) {
          return txt == "Все" 
        })
      }).show();

      var $chosen = $selHideOption.map(function(i, el){
        return $(':selected',el);
      });
      var $teamId = null;
      $opt.show().prop('disabled', false);
      $chosen.each(function(i, el){0
        $teamId = $(el).val();
        $opt.not(el).filter(function(){
          return $(this).val() == $teamId;
        }).hide().prop('disabled', true);
      })

      if (!$rows.length === true){
        $tbody.find("tr:first-child").css("display", "table-row");
      } else {
        $tbody.find("tr:first-child").css("display", "none");
      }
    })
  })
});

;(function(mw, $) {
	
	function filter(list, filter) {
		if (!filter.length) {
			return list;
		}

		return list.filter(function(x) {
			var entry = $(list[x]).get(0);        
			return filter.find(function(y) {
				var filterEntry = $(y).get(0);
				if (filterEntry.dataset.key === "abilitygroup") {
					var abilitygroup = entry.dataset.abilitygroup || "";
	                return abilitygroup.split(" ").indexOf(filterEntry.dataset.value) >= 0;
	            }
	            
                return String(filterEntry.dataset.value).toLowerCase() === String(entry.dataset[filterEntry.dataset.key]).toLowerCase();
			});
		});
	}

	function updateFilters() {
		var typeFilters = $('.filter-group-type > .mw-ui-button.mw-ui-progressive').toArray();
		var characterList = $('.grid-entry');

		characterList.each(function() {
			this.style.display = 'none';
		});

		var filteredList = characterList;
		filteredList = filter(filteredList, typeFilters);

		filteredList.each(function() {
			this.style.display = '';
		});
	}

$(document).ready(function() {
    $('.character-filters label').on('click', function(event) {
        $(event.target).toggleClass('mw-ui-progressive');
        updateFilters();
    });
});

})(mediaWiki, jQuery);