// Filterable Table+

function filterTablePlus() {
	$("table.filterable").each(function(){
		var i = 0;
		var cols;
		$(this).find("tr th, tr td").each(function(){
			i++;
			
			if ($(this).is("td") || $(this).hasClass("unfilterable")) return;
			
			cols = optionList($(this), i);
			
			$(this).css("position","relative");
			$(this).html('<a href="javascript:void(0)" class="showFilterMenu">' + $(this).html() + '▼</a>');
			$(this).append($('<div class="filterMenu"></div>'));
			 
			for (j = 0; j < cols.length; j++) {
				$(this).find(".filterMenu").append('<div style="width:max-content"><input type="checkbox" value="' + cols[j]
				+'"col="' + i + '" style="float:left" class="filterOption" checked>'
				+'<div style="float:left" class="filterOptionText">' + cols[j] + '</div></div>');
			}
		});
		$(this).find("tr:nth-child(n+1)").attr("condition", 0);
	});
	
	$(".showFilterMenu").click(function(){
		if ($(this).find(".filterMenu").hasClass("show")) {
			$(".filterMenu").removeClass("show");
		} else {
			$(".filterMenu").removeClass("show");
			$(this).parent().find(".filterMenu").addClass("show");
		}
	});
	
	$(document).mouseup(function(e){
		var container = $(".filterMenu");
	    if (!container.find(e.target).length > 0 && container.hasClass("show")){
	        container.removeClass('show');
	    }
	});
	
	$(".filterOption").click(function(){
		var type = $(this).closest("th").data("filterType");
		var col = $(this).attr("col");
		var rule = $(this).val();
		var chg = $(this).is(":checked") ? 1 : -1;
		
		$(this).closest("table").find("tr:nth-child(n+1)").each(function(){
			var el = $(this).find("td:nth-child(" + col + ")");
			var val = el.data("filterValue");
			val = val != undefined ? val : el.text();
			
			if (!filterItem(type, rule, val)) return;
			
			var cond = $(this).attr("condition");
			cond = Number(cond) + chg;
			$(this).attr("condition", cond);
			if (cond == 0) $(this).show();
			else $(this).hide();
		});
	});
}

function filterItem(type, rule, val) {
	function filterItemPerSymbol(rule, val) {
		for (var i = 0; i < rule.length; i++) {
			if (!val.includes(rule[i])) return false;
		}
		return true;
	}
	
	function filterItemWholeWords(rule, val) {
		return rule == val;
	}
	
	if ((type == undefined) || (type.trim() == "wholewords")) {
		return filterItemWholeWords(rule, val);
	} else if (type.trim() == "persymbol") { 
		return filterItemPerSymbol(rule, val);
	}
}

function optionList(el, i) {
	// get real
	function optionListPerSymbol(cols) {
		var coolcols = cols.join('').replace(/\s/g, '').split('')
						.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
		return coolcols;
	}
	
	function optionListWholeWords(cols) {
		return cols.reduce(function(p, c) {
	        if (p.indexOf(c) < 0) p.push(c);
	        return p;
	    }, []);
	}
	
	var cols = [];
	el.closest("table").find("tr td:nth-child(" + i + ")").each(function(){
		var val = $(this).data("filterValue");
		cols.push(val ? val : $(this).text());
	});
	
	var filterType = el.data("filterType");
	
	if ((filterType == undefined) || (filterType.trim() === "wholewords")) {
		return optionListWholeWords(cols);
	} else if (filterType.trim() === "persymbol") { 
		return optionListPerSymbol(cols);
	}
	
	return cols;
}

filterTablePlus();