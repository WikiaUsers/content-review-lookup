/* Any JavaScript here will be loaded for all users on every page load. */

/* FilterTable */
function filterTable(){
	$("table.filterable").each(function(){
		var i=0;
		var cols;
		$(this).find("tr:first-child th, tr:first-child td").each(function(){
			if (!$(this).hasClass("unfilterable")){
				cols=[];
				$(this).closest("table").find("tr td:nth-child("+(i+1)+")").each(function(){
					cols.push($(this).text());
				});
				cols = arrayUnique(cols);
				l=0;
				for (j=0; j<cols.length; j++){
					t=charLength(cols[j]);
					if (l<t) l=t;
				}
				$(this).css("position","relative");
				$(this).html('<a href="javascript:void(0)" class="showFilterMenu">'+$(this).html()+'▼</a>');
				$(this).append($('<div class="filterMenu" style="position:absolute;top:'+$(this).height()+'px;left:0;width:'+(22+l*7)+'px;text-align:left;padding:5px;border:1px #000 solid;background:#ddd;z-index:1;display:none"></div>'));
				for (j=0; j<cols.length; j++){
					$(this).find(".filterMenu").append('<div><input type="checkbox" value="'+cols[j]+'" col="'+(i+1)+'" class="filterOption" checked>'+cols[j]+'</div>')
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
	$(".filterOption").click(function(){
		col=$(this).attr("col");
		val=$(this).val();
		if ($(this).is(":checked")) chg=1; else chg=-1;
		$(this).closest("table").find("tr:nth-child(n+1)").each(function(){
			if ($(this).find("td:nth-child("+col+")").text()==val){
				var cond=$(this).attr("condition");
				cond=Number(cond)+chg;
				$(this).attr("condition", cond);
				if (cond===0) $(this).show();
				else $(this).hide();
			}
		});
	});
}
function arrayUnique(a) {
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
}
function charLength(s){
	return s.length+(encodeURI(s).split(/%..|./).length-1-s.length)/2;
}
filterTable();