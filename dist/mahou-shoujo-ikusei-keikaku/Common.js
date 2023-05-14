/* Any JavaScript here will be loaded for all users on every page load. */
 
window.PurgeButtonText = 'Purge';

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page'; 
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"]; 
window.BackToTopModern = true; 

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
/* End of the {{USERNAME}} replacement */

/* FileLinksAutoUpdate */
if (wgPageName.indexOf("Special:MovePage/File:") != -1 || (wgCanonicalNamespace == "File" && Storage)) {
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
				var obj = formated_icon.query.pages;
				var item = Object.values(obj)[0];
				if (item.imageinfo) {
					text = '<img style="width: 100px" src="' + item.imageinfo[0].url + '">';
				} else {
					text = '<span style="width: 100px">' + content + '</span>';
				}
				console.log(content, girl_rank[content])
				if (girl_rank[content] === 3) {
					if (content === currentGachaGirl) {
						style += "background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(184,145, 28,0.52) 100%);";
					} else {
						style += "background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(182,174,190,0.52) 100%);";
					}
				}

			});
		}
		return '<td style="' + style + '">' + text + "</td>";
	}) + "</tr>" ;
}

function setUpButtonBehaviour(characters, girlsIcons) {
	var numberOfRolls = 0;
	var welfare = []; // welfare girls who can not appear in gacha
	var limited_star3_chars = []; // limited girl who can only appear if chosen
	var girl_rank = {};
	
	// Just add whatever you want to simulate, since there's no basis for these ranks
	limited_star3_chars = ["@Meow-Meow", "Snow White/Dream World"];
	unlimited_star3_chars = ["Snow White", "Pukin"].sort();
	star2_chars = ["Sonia Bean"];
	star1_chars = characters.filter(function(char) {
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
	console.log(girl_rank)
	console.log(girls)
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
	var optionsString = '<label for="limited-select">Choose limited gacha: </label><select id="limited-select"><option value="none"></option>';
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
		    cmtitle: 'Category:Characters',
		    cmlimit: 500,
		    cmprop: 'title',
		    cmnamespace: 0
		} ).done( function ( response ) {
			var girlsIcons = {};
			var characters = response.query.categorymembers.map(function (obj){
				var girl = obj.title;
				girlsIcons[girl] = api.get({ 
					action: 'query',
					format: "json",
					prop: "imageinfo",
					iiprop: "url",
					titles: 'File:' + girl + ".jpg"});
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
			setupGachaSimulator();
	        break;
	}
});