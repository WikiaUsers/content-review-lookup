/* 此 JavaScript 會用於使用者載入的每一個頁面。 */
// tooltips.js setting
window.tooltips_config = {
    waitForImages: true,
    noCSS: true
};

// tt improvement, from 神奇宝贝百科 https://wiki.52poke.com/wiki/MediaWiki:Common.js
    var tip = $('.explain, abbr, acronym');
    if (tip.length > 0) {
        mw.loader.using('jquery.tipsy', function(){
            tip.tipsy();
        });
        tip.click(function() {
            if (tip.hasClass('no-fix')) {
                return;
            }
            if ($('div.tipsy-n').length == 1) {
                $('#MoeNotification').after($('div.tipsy-n').clone());
            } else {
                $('div.tipsy-n')[0].remove();
            }
        });
    }

// NoLicenseWarning setting
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: [
    	'bureaucrat',
        'sysop',
        'threadmoderator',
        'content-moderator',
        'rollback'
    ]
};

// Prepare custom messages for NoLicenseWarning
window.dev = window.dev || {};
window.dev.i18n = window.dev.i18n || {};
window.dev.i18n.overrides = window.dev.i18n.overrides || {};
window.dev.i18n.overrides['NoLicenseWarning'] = window.dev.i18n.overrides['NoLicenseWarning'] || {};

// Add custom content instead of default messages
window.dev.i18n.overrides['NoLicenseWarning']['warning-text'] = '請選擇授權條款以便分類，謝謝合作！';
window.dev.i18n.overrides['NoLicenseWarning']['rejected-text'] = '未選擇授權條款，請檢察是否有檔案未選擇授權條款，謝謝合作！';

// filterable table, oiginal from Puzzles & Dragons Wiki https://pad.fandom.com/wiki/MediaWiki:FilterTable.js , edited
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
				$(this).html('<a href="javascript:void(0)" class="showFilterMenu">'+$(this).html()+'↓</a>');
				$(this).append($('<div class="filterMenu" style="position:absolute;top:'+$(this).height()+'px;left:0;width:'+(22+l*10)+'px;text-align:left;padding:5px;background: #000000BB;color:#fff;border-radius: 0.3em;z-index:1;display:none"></div>'));
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
				if (cond==0) $(this).show();
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
};
function charLength(s){
	return s.length+(encodeURI(s).split(/%..|./).length-1-s.length)/2;
}
filterTable();