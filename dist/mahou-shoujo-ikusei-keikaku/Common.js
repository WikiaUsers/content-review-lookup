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
				if (girl_rank[content] === 6) {
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
	var girl_rank = {};
	
	// Just add whatever you want to simulate, since there's no basis for these ranks
	var welfare = []; // welfare girls who can not appear in gacha
	limited_star6_chars = ["Musician Of The Forest, Cranberry", "Pukin"].sort(); // Will be selectable in the dropdown and only appear if chosen
	unlimited_star6_chars = ["Snow White", "Ripple"]; // Will appear in any pull
	star5_chars = ["La Pucelle", "Top Speed"];
	star4_chars = ["Tama"];
	star3_chars = characters.filter(function(char) { // All chars who are not 4, 5, or 6 star
		return !(limited_star6_chars.includes(char) || unlimited_star6_chars.includes(char) || star5_chars.includes(char) || star4_chars.includes(char));
	});
	limited_star6_chars.forEach(function (girl) {
			girl_rank[girl] = 6;
		});
	unlimited_star6_chars.forEach(function (girl) {
			girl_rank[girl] = 6;
		});
	star5_chars.forEach(function (girl) {
			girl_rank[girl] = 5;
		});
	star4_chars.forEach(function (girl) {
			girl_rank[girl] = 4;
		});
	star3_chars.forEach(function (girl) {
			girl_rank[girl] = 3;
		});
	girls = {3: star3_chars, 4: star4_chars, 5: star5_chars, 6: limited_star6_chars.concat(unlimited_star6_chars)};
	var pullRates = {
		/* Format rank : probability */
		3: 78.5,
		4: 13.5,
		5: 5,
		6: 2.3,
		7: 0.7 // 7 is used for rateup limited 6*
	};
	var pullRatesLastPull = {
		// No 1* girls on the last pull
		4: pullRates[3] + pullRates[4],
		5: pullRates[5],
		6: pullRates[6],
		7: pullRates[7],
	};

	var gachaArray = makeGachaArray(pullRates);
	var gachaArrayLastPull = makeGachaArray(pullRatesLastPull);

	var rollButton = $("#roll-gacha");
	var gachaResultsDiv = $("#current-result");
	var historyResultsDiv = $("#history-results");
	var gacha3StarAmountText = $("#gacha-3-star");
	var gacha4StarAmountText = $("#gacha-4-star");
	var gacha5StarAmountText = $("#gacha-5-star");
	var gacha6StarAmountText = $("#gacha-6-star");
	var numberOfGemsText = $("#gems-spent");
	var numberOfRollsText = $("#number-of-rolls");
	var optionsString = '<label for="limited-select">Choose limited gacha: </label><select id="limited-select"><option value="none"></option>';
	limited_star6_chars.forEach(function(girl) {
		optionsString += '<option value="' + girl + '">' + girl + '</option>';
	});
	optionsString += '</select>';
	$("#selector-box").html(optionsString);
	var selector = $("#limited-select");
	var historicalGirlsNrs = {};

	var currentGirls = [];
	var amountRolled = {3: 0, 4: 0, 5: 0, 6: 0};
	rollButton.click(function () {
		var currentGachaGirl = selector[0].value;
		var	currentIgnored = welfare.concat(currentGachaGirl === "none" ? limited_star6_chars : limited_star6_chars.filter(function(v) { return v !== currentGachaGirl; }));

		currentGirls = [];
		for (var i=0; i<10; i++) {
			rank = pullRandomElement(i == 9 ? gachaArrayLastPull : gachaArray);
			girl = null;
			if (rank === "7") {
				rank = "6";
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
		gacha3StarAmountText.html(amountRolled[3]);
		gacha4StarAmountText.html(amountRolled[4]);
		gacha5StarAmountText.html(amountRolled[5]);
		gacha6StarAmountText.html(amountRolled[6]);
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
				girlsIcons[girl] = api.get({ action: 'parse', page: 'Template:' + girl + ' Icon'});
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