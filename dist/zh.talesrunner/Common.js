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
				$(this).html('<a href="javascript:void(0)" class="showFilterMenu" style="color: var(--filter-text-color)">'+$(this).html()+'↓</a>');
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



//toggle, From https://wiki.52poke.com/wiki/MediaWiki:Gadget-toggle.js
(function(){
    /** 
        Toggles the display of elements on a page 
        Author/contact: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        See http://openwetware.org/wiki/OpenWetWare:Toggle for examples and documentation
     */
    var togglers = new Array();     
    var allClasses = new Object(); // associative map of class names to page elements
     
    function toggler(id)
    {
        var toBeToggled = togglers[id];
        if (!toBeToggled)
            return;
     
        // if some element is in list more than once, it will be toggled multiple times
        for (var i = 0; i < toBeToggled.length; i++)
        {
            // get array of elements to operate on
            var toggles = toBeToggled[i][1];
            if (typeof(toggles) == "string")
            {
                if (toggles.charAt(0) == '-')
                {
                    // treat as an element ID, not as class
                    toggles = document.getElementById(toggles.substring(1));
                    if (toggles)
                        toggles = new Array(toggles);
                }
                else
                    toggles = allClasses[toggles];
            }
            if (!toggles || !toggles.length)
                continue;
     
            var op = toBeToggled[i][0]; // what the operation will be
     
            switch (op)
            {
                case "_reset":
                    for (var j in toggles)
                        toggles[j].style.display = toggles[j]._toggle_original_display;
                    break;
                case "_show":
                    for (var j in toggles)
                        toggles[j].style.display = '';
                    break;
                case "_hide":
                    for (var j in toggles)
                        toggles[j].style.display = 'none';
                    break;
                case "":
                default:
                    // Toggle
                    for (var j in toggles)
                        toggles[j].style.display = ((toggles[j].style.display == 'none') ? '' : 'none');
                    break;
            }
        }
    }
     
    function createTogglerLink(elem, id)
    {
        var toggle = document.createElement("a");
        toggle.className = 'toggler-link';
        toggle.setAttribute('id', 'toggler' + id);
        toggle.setAttribute('href', '#');
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            toggler(id);
        }, false);
        var child = elem.firstChild;
        elem.removeChild(child);
        toggle.appendChild(child);
        elem.insertBefore(toggle, elem.firstChild);
    }
     
    function toggleInit()
    {
        var togglerElems = new Array();
        var toggleGroup = new Array();
     
        // initialize/clear any old information
        togglers = new Array();     
        allClasses = new Object();
        allClasses.watch = undefined;
        allClasses.unwatch = undefined;
     
     
        // make list of all document classes
        var elems = document.getElementsByTagName("*");
        var numelems = elems.length;
        for (var i = 0; i < elems.length; i++)
        {
            var elem = elems[i];
            if (typeof elem.className != 'string' || !elem.className) 
                continue;
     
            elem._toggle_original_display = elem.style.display;
            var togglerID = -1;
            var elemClasses = elem.className.split(' '); // get list of classes
            for (var j = 0; j < elemClasses.length; j++)
            {
                var elemClass = elemClasses[j];
                if (! allClasses[elemClass])
                    allClasses[elemClass] = new Array();
                allClasses[elemClass].push(elem);
     
                // all the special classes begin with _toggle
                if (elemClass.substring(0, 7) != "_toggle")
                    continue;
     
                if (elemClass == "_togglegroup")
                    toggleGroup = new Array();
                else if (elemClass == "_toggle")
                    toggleGroup.push(elem);
                else if (elemClass.substring(0, 12) == "_toggle_init")
                {
                    // set initial value for display (ignore the original CSS set value)
                    // understands _toggle_initshow and _toggle_inithide
                    var disp = elemClass.substring(12);
                    if (disp == "show")
                        elem.style.display = '';
                    else if (disp == "hide")
                        elem.style.display = 'none';
                    elem._toggle_original_display = disp;
                }
                else if (elemClass.substring(0, 8) == "_toggler")
                {
                    if (togglerID == -1)
                    {
                        togglerID = togglers.length;
                        togglers[togglerID] = new Array();
                        togglerElems[togglerID] = elem;
                    }
     
                    // all classes are of form _toggler_op-CLASS
                    // figure out what class we're toggling
                    // if none is specified, then we use the current toggle group
                    var toBeToggled;
                    var hyphen = elemClass.indexOf('-');
                    if (hyphen != -1)
                        toBeToggled = elemClass.substring(hyphen+1);
                    else
                    {
                        toBeToggled = toggleGroup;
                        hyphen = elemClass.length;
                    }
     
                    var op = elemClass.substring(8, hyphen);
                    togglers[togglerID].push(new Array(op, toBeToggled));
                }
            }
        }
     
        // add javascript links to all toggler elements
        for (var i = 0; i < togglerElems.length; i++)
            createTogglerLink(togglerElems[i], i);
    }
     
    $(toggleInit);
})();