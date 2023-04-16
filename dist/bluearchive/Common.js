/* Any JavaScript here will be loaded for all users on every page load. */

/******************************/
/* Expand All Collapsible     */
/******************************/
function expandAllHandler(e, $el) {
    // Forked from MW collapsibles handler
    if (e) {
        if (e.type === 'click' &&
            e.target.nodeName.toLowerCase() === 'a' &&
            $(e.target).attr('href')) {
                    return;
        } else if (e.type === 'keypress' &&
            e.which !== 13 &&
            e.which !== 32) {
                    return;
        } else {
            e.preventDefault();
            e.stopPropagation();
            $el.find('.mw-collapsible-toggle-collapsed').click();
        }
    }
}

function expandAll_Buttons($el) {
    $el.find('.mw-expandall:not(.mw-expandall-handled)').each(function() {
        var $this = $(this),
            $contents = $this.contents();

        $this.attr('role', 'button');
        if (!$this.attr('tabindex')) $this.attr('tabindex', '0');
        $('<a' + '>').prependTo($this).append($contents)
            .on('click', function(e) { expandAllHandler(e, $el); })
            .on('keypress', function(e) { expandAllHandler(e, $el); });
        $this.addClass('mw-expandall-handled');
    })
}

mw.loader.using('mediawiki.util').then(function () {
    mw.util.addCSS('.mw-expandall-handled { cursor: pointer; }');
});

mw.hook('wikipage.content').add(expandAll_Buttons);
expandAll_Buttons($('#content'));
window.lastEdited = {
	size: false,
	diff: false,
	position: {
		element: document.getElementById('mw-content-text'),
		method: 'prepend'
	},    

}

/*******************/
/* LastEdit     */
/*******************/

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LastEdited/code.js',
    ]
});

/*******************/
/* Tooltip     */
/*******************/

window.tooltips_list = [
	{
		classname: 'advanced-tooltip',
		delay: 300
	}
];

/*********************/
/* BackToTopButton     */
/*********************/
window.BackToTopModern = true;


/*********************/
/* Gacha Simulator     */
/*********************/
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

function createHistoricalGachaTable(historicalGirlsNrs, girlsIcons, girlRank, currentGachaGirl) {
	var finalHtml = "";
	var currentGirls = [];
	var currentAmount = [];
	
	function addRow() {
		finalHtml += createGachaCurrentRow(currentGirls, girlsIcons, girlRank, currentGachaGirl);
		finalHtml += createGachaCurrentRow(currentAmount);
		currentGirls = [];
		currentAmount = [];
	}
	
	Object.entries(historicalGirlsNrs).sort(function (nameAmountA, nameAmountB) {
		if (nameAmountB[1] - nameAmountA[1] !== 0){
			return nameAmountB[1] - nameAmountA[1];
		}
		if (girlRank[nameAmountA[0]] - girlRank[nameAmountB[0]] !== 0){
			return girlRank[nameAmountA[0]] - girlRank[nameAmountB[0]];
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

function createGachaCurrentRow(rowContent, girlsIcons, girlRank, currentGachaGirl) {
	return "<tr>" + rowContent.map(function (content) {
		text = content;
		style = "text-align: center;";
		if (girlsIcons) {
			text = girlsIcons[content];
			if (girlRank[content] === 3) {
				text = text.replaceAll("transform:skewX(-10deg)", "");
				style += "transform: skewX(-10deg);";
				if (content === currentGachaGirl) {
					style += "background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(184,145, 28,0.52) 100%);";
				} else {
					style += "background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(182,174,190,0.52) 100%);";
				}
			}
		}
		return '<td style="' + style + '">' + text + "</td>";
	}) + "</tr>" ;
}

function setUpButtonBehaviour(girls, girlsIcons, girlRank) {
	var numberOfRolls = 0;
	var welfare = ["Nodoka", "Tsurugi Swimsuit", "Izumi Swimsuit", "Tomoe", "Fubuki", "Michiru", "Ayane Swimsuit", "Shizuko Swimsuit", "Hibiki Cheerleader", "Hasumi Gym", "Junko New Year", "Nonomi"]; // welfare girls who can not appear in gacha
	var possibleLimitedGirl = ['Azusa Swimsuit', 'Aru New Year', 'Wakamo', "Mashiro Swimsuit", "Hina Swimsuit", "Iori Swimsuit", "Neru Bunny Girl", "Karin Bunny Girl", "Miku", "Mutsuki New Year", "Hoshino Swimsuit", "Izuna Swimsuit", "Chise Swimsuit", "Mari Gym", "Yuuka Gym", "Fuuka New Year", "Haruna New Year", "Mika", "Nagisa", "Toki"].sort(); // limited girl who can only appear if chosen
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
	possibleLimitedGirl.forEach(function(girl) {
		optionsString += '<option value="' + girl + '">' + girl + '</option>';
	});
	optionsString += '</select>';
	$("#selector-box").html(optionsString);
	var selector = $("#limited-select");
	var historicalGirlsNrs = {};

	var currentGirls = [];
	var amountRolled = {1: 0, 2: 0,3: 0};
	return setTimeout(function () {
		rollButton.click(function () {
			var currentGachaGirl = selector[0].value;
			var	currentIgnored = welfare.concat(currentGachaGirl === "none" ? possibleLimitedGirl : possibleLimitedGirl.filter(function(v) { return v !== currentGachaGirl; }));

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
				createGachaCurrentRow(currentGirls.slice(0, 5), girlsIcons, girlRank, currentGachaGirl) + 
				createGachaCurrentRow(currentGirls.slice(5), girlsIcons, girlRank, currentGachaGirl)
			);
			historyResultsDiv.html(createHistoricalGachaTable(historicalGirlsNrs, girlsIcons, girlRank, currentGachaGirl));
			gacha1StarAmountText.html(amountRolled[1]);
			gacha2StarAmountText.html(amountRolled[2]);
			gacha3StarAmountText.html(amountRolled[3]);
			numberOfRollsText.html(++numberOfRolls);
			numberOfGemsText.html(numberOfRolls*1200);
		});
		rollButton.html("Roll Gacha");
	}, 5000); // Timeout to allow all images and characters to load before button is enabled
}

function setupGachaSimulator() { 

	var girls = {1:[], 2:[], 3:[]};
	var girlsIcons = {};
	var girlRank = {};

	mw.loader.using([ 'mediawiki.api'], function() {
		var api = new mw.Api();
		api.get( {
		    action: 'query',
		    format: 'json',
		    list: 'categorymembers',
		    cmtitle: 'Category:Character_Data',
		    cmlimit: 500,
		    cmprop: 'title',
		    cmnamespace: 10
		} ).done( function ( data ) {
			if (data && data.query && data.query.categorymembers) {
				var dataPages = data.query.categorymembers.map(function (o){return o.title;});
				dataPages.forEach(function(dataPage) {
					var name = dataPage.substring(9, dataPage.length - 7);
					var icon = api.get({ action: 'parse', page: 'Template:' + name + ' Icon'});
					api.get({
					    action: 'expandtemplates',
						text: '{{' + dataPage + '|Get|rarity}}'
					}).done(function(formated_data) {
						if (formated_data && formated_data.expandtemplates && formated_data.expandtemplates["*"]) {
							var rank = (formated_data.expandtemplates["*"].match(/File:Star Icon\.png/g)||[]).length;
							if (rank == 0) {
								console.error("Error in tamplate for " + name + '. Rank given was 0. Is the template formatted correctly without using number parameters (e.g. "|1 = abc|"? https://bluearchive.fandom.com/wiki/' + dataPage.replace(/ /g, "_") + '?action=edit');
							} else {
								icon.done(function(formated_icon) {
									girls[rank].push(name);
									girlsIcons[name] = formated_icon.parse.text["*"];
									girlRank[name] = rank;
								});
							}
						} else {
							console.error("Error in tamplate for " + name + ". Could not load data. https://bluearchive.fandom.com/wiki/" + dataPage.replace(/ /g, "_") + '?action=edit');
						}
					});
				});
			}
			setUpButtonBehaviour(girls, girlsIcons, girlRank);
		});
	});
}
// ############### CALLERS ############
// function equivalent to jquery ready. Runs once the page loads on all pages
$(function() {
	switch (mw.config.get('wgPageName')) {
	    case 'User:Thefrozenfish/Sandbox': 
	    case 'Template:Gacha_Simulator':
			setupGachaSimulator();
	        break;
	}
});