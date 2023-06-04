/* Any JavaScript here will be loaded for all users on every page load. */
/****************************/
/* Gacha Simulator */
/****************************/
function pullRandomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function makeGachaArray(rates) {
	/* Creates an array to choose randomly from with ratio indicated by the values of the input object */
	var array = [];
	Object.entries(rates).forEach(function (rankRate) {
		for (var i=0;i<rankRate[1]*10;i++) {
			array.push(rankRate[0]);
		}
	});
	return array;
}

function createHistoricalGachaTable(historicalGirlsNrs, girlsIcons, girl_rank, currentGachaGirl) {
	var finalHtml = "";
	var currentGirls = [];
	var currentAmount = [];
	
	function addRow() {
		finalHtml += createGachaCurrentRow(currentGirls, girlsIcons, girl_rank, currentGachaGirl);
		finalHtml += createGachaCurrentRow(currentAmount);
		currentGirls = [];
		currentAmount = [];
	}
	
	Object.entries(historicalGirlsNrs).sort(function (nameAmountA, nameAmountB) {
		if (nameAmountB[1] - nameAmountA[1] !== 0){
			return nameAmountB[1] - nameAmountA[1];
		}
		if (girl_rank[nameAmountA[0]] - girl_rank[nameAmountB[0]] !== 0){
			return girl_rank[nameAmountA[0]] - girl_rank[nameAmountB[0]];
		}
		if (nameAmountA[0] < nameAmountB[0]) {
			return -1;
		}
		return 1;
	}).forEach(function (nameAmount) {
		if (currentGirls.length == 5) {
			addRow();
		}
		currentGirls.push(nameAmount[0]);
		currentAmount.push(nameAmount[1]);
	});
	if (currentGirls.length) {
		addRow();
	}
	return finalHtml;
}

function createGachaCurrentRow(rowContent, girlsIcons, girl_rank, currentGachaGirl) {
	return "<tr>" + rowContent.map(function (content) {
		text = content;
		style = "text-align: center;";
		if (girlsIcons && girlsIcons[content]) {
			girlsIcons[content].done(function(formated_icon) {
				text = formated_icon.parse.text["*"];
				if (girl_rank[content] === 3) {
					if (content === currentGachaGirl) {
						style += "background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(182,174,190,0.52) 100%);";
					} else {
						style += "background: rgba(155, 133, 230, .5);";
					}
				} else if (girl_rank[content] === 2) {
					style += "background: rgba(230, 143, 22, .5);";
				} else {
					style += "background: rgba(38, 138, 203, .5);";
				}
				style += "girl: " + content + ";";
			});
		}
		return '<td style="' + style + '">' + text + "</td>";
	}) + "</tr>" ;
}

function setUpButtonBehaviour(characters, girlsIcons) {
	var numberOfRolls = 0;
	var girl_rank = {};
	
	// Just add whatever you want to simulate, since there's no basis for these ranks
	var welfare = ["Stats Tooltip/pr", "Custom Character Icon/pr"]; // welfare girls who can not appear in gacha
	var limited_star3_chars = ["Musician Of The Forest, Cranberry", "Pythie Frederica", "Pfle", "Pukin", "Archfiend Pam", "Grim Heart", "Puk Puck", "Ratsumukana-honome-no-kami", "The First Lapis Lazuline", "Francisca Francesca", "Kashikiakarukushihime", "The First Mage", "Agrielreymwaed Quarky", "Halna Midi Meren", "Navi Ru", "Yoshiko Yoshinoura", "Miss Satou", "Shou Minamida", "Sumire", "John Shepherdspie", "Mana", "Lyr Cuem Sataborn", "Yol", "Touta Magaoka", "Tomoki Tatehara"].sort();// Will be selectable in the dropdown and only appear if chosen
	var unlimited_star3_chars = ["Snow White", "Ripple", "Hardgore Alice", "Clantail", "Pechka", "Magical Daisy", "Lapis Lazuline", "Shadow Gale", "Tepsekemei", "7753", "Princess Deluge", "Marika Fukuroi", "Styler Mimi", "Uluru", "Sorami Nakano", "Dark Cutie", "Tetty Goodgripp", "Kana", "Thunder-General Adelheid", "Calkoro", "Miss Marguerite", "Pastel Mary", "Dreamy☆Chelsea", "Ragi Zwe Nento", "Fal", "Lake of Fire Flame Flamey"] ;  // Will appear in any pull
	var star2_chars = ["Ruler", "Sister Nana", "Calamity Mary", "@Meow-Meow", "Nokko", "Rionetta", "Detec Bell", "Melville", "Kuru-Kuru Hime", "Hana Gekokujou", "Weddin", "Toko", "Princess Tempest", "Kafuria", "Filru", "Uttakatta", "Stanczyka", "Premium Sachiko", "Glassianne", "Blade Brenda", "Cannon Catherine", "Miss Ril", "Diko Narakunoin", "Pshuke Prains", "Love Lulu", "Maiya", "Alma", "Puppeta", "Amy", "Monako", "Clarissa Toothedge", "Rareko", "La Pucelle", "Top Speed", "Tama", "Nemurin", "Nokko", "Cherna Mouse", "Keek", "Captain Grace", "Rain Pow", "Postaire", "Tot Pop", "Sonia Bean", "Princess Inferno", "Prism Cherry", "Shufflin", "Premium Sachiko", "Micchan the Dictionary", "CQ Angel Hamuel", "Shufflin Ⅱ", "Bluebell Candy", "Lethe", "Mephis Pheles", "Sally Raven", "Ranyi", "Princess Lightning", "Love Me Ren-Ren", "Nephilia", "Jouvet", "Fav", "Toko"];
	var star1_chars = characters.filter(function(char) {
		return !(limited_star3_chars.includes(char) || unlimited_star3_chars.includes(char) || star2_chars.includes(char));
	});
	limited_star3_chars.forEach(function (girl) {
			girl_rank[girl] = 3;
		});
	unlimited_star3_chars.forEach(function (girl) {
			girl_rank[girl] = 3;
		});
	star2_chars.forEach(function (girl) {
			girl_rank[girl] = 2;
		});
	star1_chars.forEach(function (girl) {
			girl_rank[girl] = 1;
		});
	girls = {1: star1_chars, 2: star2_chars, 3: limited_star3_chars.concat(unlimited_star3_chars)};
	var pullRates = {
		/* Format rank : probability */
		1: 78.5,
		2: 18.5,
		3: 2.3,
		4: 0.7 // 4 is used for rateup limited 3*
	};
	var pullRatesLastPull = {
		// No 1* girls on the last pull
		2: pullRates[1] + pullRates[2],
		3: pullRates[3],
		4: pullRates[4],
	};

	var gachaArray = makeGachaArray(pullRates);
	var gachaArrayLastPull = makeGachaArray(pullRatesLastPull);

	var rollButton = $("#roll-gacha");
	var gachaResultsDiv = $("#current-result");
	var historyResultsDiv = $("#history-results");
	var gacha1StarAmountText = $("#gacha-1-star");
	var gacha2StarAmountText = $("#gacha-2-star");
	var gacha3StarAmountText = $("#gacha-3-star");
	var numberOfGemsText = $("#gems-spent");
	var numberOfRollsText = $("#number-of-rolls");
	var optionsString = '<label for="limited-select"  style="display: block;">Choose Limited Gacha: </label><select id="limited-select"><option value="none"></option>';
	limited_star3_chars.forEach(function(girl) {
		optionsString += '<option value="' + girl + '">' + girl + '</option>';
	});
	optionsString += '</select>';
	$("#selector-box").html(optionsString);
	var selector = $("#limited-select");
	var historicalGirlsNrs = {};

	var currentGirls = [];
	var amountRolled = {1: 0, 2: 0,3: 0};
	rollButton.click(function () {
		var currentGachaGirl = selector[0].value;
		var	currentIgnored = welfare.concat(currentGachaGirl === "none" ? limited_star3_chars : limited_star3_chars.filter(function(v) { return v !== currentGachaGirl; }));

		currentGirls = [];
		for (var i=0; i<10; i++) {
			rank = pullRandomElement(i == 9 ? gachaArrayLastPull : gachaArray);
			girl = null;
			if (rank === "4") {
				rank = "3";
				if (currentGachaGirl !== "none") {
					girl = currentGachaGirl;
				}
			}
			if (girl == null) {
				do {
					girl = pullRandomElement(girls[rank]);
				} while (currentIgnored.includes(girl));
			}
			amountRolled[rank]++;
			currentGirls.push(girl);
			if (historicalGirlsNrs[girl]) {
				historicalGirlsNrs[girl]++;
			} else {
				historicalGirlsNrs[girl] = 1;
			}
		}

		gachaResultsDiv.html(
			createGachaCurrentRow(currentGirls.slice(0, 5), girlsIcons, girl_rank, currentGachaGirl) + 
			createGachaCurrentRow(currentGirls.slice(5), girlsIcons, girl_rank, currentGachaGirl)
		);
		historyResultsDiv.html(createHistoricalGachaTable(historicalGirlsNrs, girlsIcons, girl_rank, currentGachaGirl));
		gacha1StarAmountText.html(amountRolled[1]);
		gacha2StarAmountText.html(amountRolled[2]);
		gacha3StarAmountText.html(amountRolled[3]);
		numberOfRollsText.html(++numberOfRolls);
		numberOfGemsText.html(numberOfRolls*1200);
	});
	rollButton.html("Roll Gacha");
}

function setupGachaSimulator() { 
	mw.loader.using([ 'mediawiki.api'], function() {
		var api = new mw.Api();
		api.get( {
		    action: 'query',
		    format: 'json',
		    list: 'categorymembers',
		    cmtitle: 'Category:Character_Icon',
		    cmlimit: 500,
		    cmprop: 'title',
		    cmnamespace: 10
		} ).done( function ( response ) {
			var girlsIcons = {};
			var characters = response.query.categorymembers.map(function (obj){
				var icon = obj.title;
				var girl = icon.slice(9, -5);
				girlsIcons[girl] = api.get({ action: 'parse', page: icon});
				return girl;
			});
			
			setUpButtonBehaviour(characters, girlsIcons);
		});
	});
}
// ############### CALLERS ############
// function equivalent to jquery ready. Runs once the page loads on all pages
$(function() {
	switch (mw.config.get('wgPageName')) {
	    case 'User:Thefrozenfish/Sandbox/Gacha': 
	    case 'Fanmade_Gacha_Simulator': 
			setupGachaSimulator();
	        break;
	}
});


/****************************/
/* RailWAM */
/****************************/
window.railWAM = {
    logPage:"Project:WAM Log"
};

/****************************/
/* Lastedit */
/****************************/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LastEdited/code.js',
    ]
});

window.lastEdited = {
	size: false,
	diff: false,
	position: {
		element: document.getElementById('mw-content-text'),
		method: 'prepend'
	},    

}

/*******************************/
window.PurgeButtonText = 'Purge';

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
window.ajaxPages = ["Special:RecentChanges", "Special:WikiActivity"]; 
window.BackToTopModern = true; 

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */

/* FileLinksAutoUpdate */
if (wgPageName != null && (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage))) {
    importScriptPage("FileUsageAuto-update/code.js/min.js", "dev");
}


/****************************/
/* spoilers by User:Tierrie */
/****************************/
//Testing by Rockmosis
//Modify by Macho44    

$(function() {
    console.log("mahou-shoujo-ikusei-keikaku Wiki: Spoilers script loaded");

    $('.sp_banner').click(function() {
        var id = $(this).parent().attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];

        if ($('.sp_id_' + id + ' .sp_wrn').css('display') == 'none') {
            $('.sp_id_' + id + ' .sp_wrn').fadeIn(200, function() {
                $(this).show(200);
            });
            $('.sp_id_' + id + ' .sp_txt').hide(0);
        } else {
            $('.sp_id_' + id + ' .sp_wrn').fadeOut(200, function() {
                $(this).hide(200);
            });
            $('.sp_id_' + id + ' .sp_txt').delay(200).show(0);
        }
    });

    var sp_on_page = {};
    $('.sp').each(function() {
        var id = $(this).attr('class').match(/sp_id_[\d\w]+/)[0].split('sp_id_')[1];
        sp_on_page[id] = undefined;
    });
    console.log(id);
    for (var id in sp_on_page) {
        //Starts hidden every time
        $('.sp_id_' + id + ' .sp_wrn').show(0);
        $('.sp_id_' + id + ' .sp_txt').hide(0);
    }
});