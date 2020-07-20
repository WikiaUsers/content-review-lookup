/* <source lang="javascript"> */



window.dev = window.dev || {};
window.dev.editSummaries = {
     select: ['title1', ['summary1_1', 'summary1_2'], 'title2', [ 'summary2_1'] ]
};



// JavaScript for specific test pages
switch (mw.config.get('wgPageName'))
{
    case 'DynamicSortable':
        importScript('MediaWiki:DynamicSortable.js');
        break;
    case 'Sandbox':
        importScriptURI('http://dev.wikia.com/wiki/Standard_Edit_Summary/code.js?action=raw&ctype=text/javascript&maxage=0&smaxage=0');
        break;
    case 'Template:Stdsummaries':
        window.dev.editSummaries.select = 'Template:Stdsummaries'
        importScriptURI('http://dev.wikia.com/wiki/Standard_Edit_Summary/code.js?action=raw&ctype=text/javascript&maxage=0&smaxage=0');
        break;
}




// TimedSlider from dev wiki
importArticles({
    type: 'script',
    articles: [
        'u:dev:TimedSlider/code.js'
    ]
});






/**
 * Replaces {{USERNAME}} with the name of the user browsing the page.
 * For usage with Template:USERNAME.
 */
$(function () {
    $('.insertusername').html(wgUserName);
});



/**
 * Work in progress: monster breeding info
 * Page:      http://mathmagician.wikia.com/wiki/MonsterBreeding
 * Form:      http://mathmagician.wikia.com/wiki/MediaWiki:MonsterBreeding
 * Raw Data:  http://mathmagician.wikia.com/wiki/MediaWiki:MonsterBreedingData
 * Script:    http://mathmagician.wikia.com/wiki/MediaWiki:Common.js
 */
$(function ($) {
	var monstersMap = {};
	var parentsArrayAlphabetical = [];
	
	var $dropdown1 = $('#monster-breeding-parent-1'),
		$dropdown2 = $('#monster-breeding-parent-2'),
		$dropdowns = $dropdown1.add($dropdown2),
		$list = $('#monster-breeding-children');
	
	function lookup() {
		var parent1 = $dropdown1.val(),
			parent2 = $dropdown2.val(),
			key, value,
			i, len,
			monsterName, items;
		
		if (parent1 < parent2) {
			key = parent1 + ", " + parent2;
		} else {
			key = parent2 + ", " + parent1;
		}
		
		value = monstersMap[key];
		if (value) {
			value.sort();
			items = "";
			for (i = 0, len = value.length; i < len; i++) {
				monsterName = value[i];
				items += '<li><a href="http://tinymonsters.wikia.com/wiki/' + monsterName.replace(/ /g, '_') + '">' + value[i] + '</a></li>';
			}
			$list.html(items);
		} else {
			$list.html("");
		}
	}
	
	function initComponents(monstersMap, parentsArrayAlphabetical) {
		var html = "";
		for (var i = 0, len = parentsArrayAlphabetical.length; i < len; i++) {
			html += '<option>' + parentsArrayAlphabetical[i] + '</option>';
		}
		
		$dropdowns.append(html);
		$dropdowns.change(lookup);
	}
	
	function initApplicationInfo(data) {
		var j = data.lastIndexOf("-->");
		if (j !== -1) {
			data = data.substring(j + 3);
		}
		
		// parse data to build monstersMap and parentsObj
		var parentsObj = {};
		var child = "";
		var lines = data.split('\n');
		for (var i = 0, length = lines.length; i < length; i++) {
			var line = lines[i];
			if (line.length < 3) {
			
			} else if (line.charAt(0) === '*') {
				if (line.charAt(1) === '*') {
					var temp = line.substring(2).split(',');
					temp[0] = temp[0].trim();
					temp[1] = temp[1].trim();
					parentsObj[temp[0]] = true;
					parentsObj[temp[1]] = true;
					
					var key;
					if (temp[0] < temp[1]) {
						key = temp[0] + ', ' + temp[1];
					} else {
						key = temp[1] + ', ' + temp[0];
					}
					
					var value = monstersMap[key];
					if (value) {
						value[value.length] = child;
					} else {
						monstersMap[key] = [child];
					}
				} else {
					child = line.substring(1).trim();
				}
			}
		}
		
		// translate parentsObj into parentsArrayAlphabetical
		var parentsArrayAlphabetical = [];
		for (var name in parentsObj) {
			if (parentsObj[name]) {
				parentsArrayAlphabetical[parentsArrayAlphabetical.length] = name;
			}
		}
		parentsArrayAlphabetical.sort();
		
		// populate form components
		initComponents(monstersMap, parentsArrayAlphabetical);
	}

	if ($dropdown1.length !== 0) {
		$.get('http://mathmagician.wikia.com/index.php?title=MediaWiki:MonsterBreedingData&action=raw', initApplicationInfo);
	}
});

/* </source> */