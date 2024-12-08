function filterTable(){
	$("table.filterable").each(function(){
		var i=0;
		$(this).find("tr:eq(0) th, tr:eq(0) td").each(function(){
			if (!$(this).hasClass("unfilterable")){
				var values = new Map();
				$(this).closest("table").find("tr td:nth-child("+(i+1)+")").each(function(){
					var sort = $(this).find('[data-sort-value]').attr('data-sort-value');
					var text = getFilterText(this);
					values.set(sort || text, text);
				});
				values = Array.from(values.entries());
				if(!$(this).hasClass("filter-select-nosort")) {
					values = values.sort();
				}
				$(this).css("position","relative");
				$(this).html('<a href="javascript:void(0)" class="showFilterMenu">'+$(this).html()+'▼</a>');
				var filterMenu = $('<div class="filterMenu" style="top:'+$(this).height()+'px;"></div>').appendTo(this);
				filterMenu.append('<div><label><input type="checkbox" col="'+(i+1)+'" class="filterAllOption" checked>Выбрать все</label></div><hr>');
				for (var j = 0; j < values.length; ++j){
					filterMenu.append('<div><label><input type="checkbox" value="'+values[j][1]+'" col="'+(i+1)+'" class="filterOption" checked>'+values[j][1]+'</label></div>');
				}
			}
			i++;
		});
		$(this).find("tr:nth-child(n+1)").attr("condition", 0);
	});
	$(".showFilterMenu").click(function(){
		if ($(this).parent().find(".filterMenu:visible").length){
			$(".filterMenu").slideUp(150);
		}else{
			$(".filterMenu").slideUp(150);
			$(this).parent().find(".filterMenu").slideDown(150);
		}
	});
	$(document).mouseup(function(e){
		var container = $(".filterMenu");
	    if (!container.is(e.target) && container.has(e.target).length === 0){
	        container.slideUp(150);
	    }
	});
	$('.filterMenu').click(function(e){e.stopPropagation();});
	$(".filterOption").click(function(e){
		col=$(this).attr("col");
		val=$(this).val();
		if ($(this).is(":checked")) chg=1; else chg=-1;
		$(this).closest("table").find("tr:gt(0)").each(function(){
			var td = $(this).find("td:nth-child("+col+")");
			if (getFilterText(td)==val){
				var cond=$(this).attr("condition");
				cond=Number(cond)+chg;
				$(this).attr("condition", cond);
				if (cond==0) $(this).show();
				else $(this).hide();
			}
		});
	});
	$(".filterAllOption").click(function(e){
		var chk = $(this).prop('checked');
		$(this).closest(".filterMenu").find('.filterOption').prop('checked', !chk).click();
	});
}
function arrayUnique(a) {
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
}
function getFilterText(el) {
	return $(el).find('[data-filter-text]').attr('data-filter-text') || 
		$(el).text().trim() || 
		$(el).find('img').attr('alt') || '';
}
filterTable();