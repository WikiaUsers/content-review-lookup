//*** Javascript utility functions, meant to be used by other scripts.
//***
//***
//*** Contributors:
//***   Michael T. Mosier <mtmosier@gmail.com>
//***


statUpdateUtils = {};
statUpdateUtils.isReady = false;  //*** A flag to indicate all external data required by this file has been successfully loaded
statUpdateUtils.maxPhrase = 3;  //*** Maximum number of words to match in a phrase when doing page link parsing. A higher number will be more taxing on the user's browser

statUpdateUtils.getDebugLevel = function(){
	var queryString = window.location.search;
	var urlParams = new URLSearchParams(queryString);
	if (urlParams.get("debug") == 1 || window.location.hash == "#debug" || window.location.hash == "#debug1") {
		return 1;
	}

	for (var i = 1; i < 10; i++) {
		if (urlParams.get("debug") == i || window.location.hash == "#debug" + i) {
			return i;
		}
	}

	return 0;
};

statUpdateUtils.getPageName = function(){
	var pageName = "";
	if (pageName === "")  $('[data-source=title1]').each(function(){  pageName = $(this).text();  });
	if (pageName === "")  $('.page-header__title').each(function(){  var txt = $(this).text(); if (txt) pageName = txt;  });
	return pageName;
};

statUpdateUtils.getNPRIdFromName = function(input) {
	var nprName = input.replace(/\[?npr([\]\s:\-]+)(.*)$/i, '$2');
	var normalizedNprName = statUpdateUtils.getStemmedAndNormalizedString(nprName);

	for (var i in constants.races) {
		var comparisonName = statUpdateUtils.getStemmedAndNormalizedString(constants.races[i].name);
		if (comparisonName == normalizedNprName)
			return i;
	}
	if (normalizedNprName == "ghost")
		return "ghosts";

	return false;
};

//*** https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
statUpdateUtils.titleCase = function(str) {
	str = str.replace(/_+/g, ' ');
	return str.toLowerCase().split(' ').map(function(word) {
		return word.replace(word[0], word[0].toUpperCase());
	}).join(' ');
};

statUpdateUtils.secondsDisplay = function(sec) {
	var val = sec + " second";
	if (sec != 1) val += "s";
	return val;
};

statUpdateUtils.updateStatElementDisplay = function(elementObj, newValue) {
	var replacementHtml = "";
	var debugLevel = statUpdateUtils.getDebugLevel();

	if (debugLevel == 3) {
		var currentText = elementObj.text();
		if (currentText.toLowerCase().trim() != ("" + newValue).replace("&nbsp;", " ").toLowerCase().trim()) {
			replacementHtml += '<span class="originalValue">' + currentText + '</span>';
		}
	}
	if (debugLevel == 1 || debugLevel == 3) {
		replacementHtml += '<span class="updatedValue">' + newValue + '</span>';
	} else {
		replacementHtml += newValue;
	}

	elementObj.html(replacementHtml);
};

statUpdateUtils.updateStatElementDisplayNoReplacement = function(elementObj, newValue) {
	var replacementHtml = "";
	var debugLevel = statUpdateUtils.getDebugLevel();

	if (elementObj.html().replace("&nbsp;", "").trim() === "") {
		if (debugLevel == 1 || debugLevel == 3) {
			replacementHtml += '<span class="updatedValue">' + newValue + '</span>';
		} else {
			replacementHtml += newValue;
		}
		elementObj.html(replacementHtml);
	}
};

statUpdateUtils.checkIfTableHasMoreRecentData = function(tableInfo) {
	if (statUpdateCacheUtils.dataDate) {
		var tableGeneratedDate = false;
		for (var i in tableInfo.classNameList) {
			var cn = tableInfo.classNameList[i];
			if (cn.substring(0, 10) == "generated-") {
				tableGeneratedDate = cn.substring(10);
				break;
			}
		}
		if (statUpdateCacheUtils.dataDate < tableGeneratedDate) {
			return true;
		}
	}
	return false;
};

statUpdateUtils.removeRowSpanFromTable = function(tableInfo) {
	var rowList = tableInfo.element.find("tr");

	for (var curCol = 0; curCol < tableInfo.headers.length; curCol++) {
		for (var rowIdx = 0; rowIdx < rowList.length; rowIdx++) {
			var tdList = $(rowList[rowIdx]).find("td");
			if (tdList.length > curCol) {

				var curElem = $(tdList[curCol]);
				var rowspan = curElem.attr("rowspan");
				if (!rowspan)  rowspan = 0;
				else rowspan = parseInt(rowspan);

				if (rowspan > 1) {
					curElem.attr("rowspan", 1);
					curElem.data("origRowspan", rowspan);

					for (var i = 1; i < rowspan; i++) {
						var nextRowCells = curElem.parent().next().find("td");
						curElem = curElem.clone();
						curElem.insertAfter(nextRowCells[curCol - 1]);
						rowIdx++;
					}
				}
			}
		}
	}

	return true;
};

statUpdateUtils.restoreTableRowSpan = function(tableInfo) {
	var rowList = tableInfo.element.find("tr");

	for (var curCol = tableInfo.headers.length - 1; curCol > 0; curCol--) {
		for (var rowIdx = rowList.length - 2; rowIdx >= 0; rowIdx--) {
			var tdList = $(rowList[rowIdx]).find("td");
			if (tdList.length > curCol) {

				var curElem = $(tdList[curCol]);

				//*** Row span for current element should always be 1
				var curRowSpan = curElem.attr("rowspan");
				if (!curRowSpan)  curRowSpan = 1;
				else curRowSpan = parseInt(curRowSpan);

				var nextRowTdList = $(rowList[rowIdx + curRowSpan]).find("td");
				var nextRowElem = $(nextRowTdList[curCol]);

				if (nextRowElem.html() == curElem.html()) {
					//*** Row span for target element could be any number
					var nextRowSpan = nextRowElem.attr("rowspan");
					if (!nextRowSpan)  nextRowSpan = 1;
					else nextRowSpan = parseInt(nextRowSpan);

					curElem.attr("rowspan", curRowSpan + nextRowSpan);
					nextRowElem.remove();
				}
			}
		}
	}

	return true;
};

statUpdateUtils.getDataTableInfoList = function() {
	var rtnInfoList = [];

	$(".article-table, .wikitable").each(function(){
		var headers = [];
		var title = "";
		var caption = "";

		var tableCaption = $(this).find('caption');
		if (tableCaption.length) {
			caption = tableCaption.text().trim();
		}

		var prevElement = this;
		var titleElement = $(this).prev();
		if (titleElement.length == 0) {
			 titleElement = $(prevElement).parent();
		}
		if (titleElement.length && titleElement[0].nodeName.toLowerCase() != "h2" && titleElement[0].nodeName.toLowerCase() != "h3") {
			prevElement = titleElement;
			titleElement = $(titleElement).prev();
		}
		if (titleElement.length == 0) {
			titleElement = $(prevElement).parent();
		}
		if (titleElement.length && titleElement[0].nodeName.toLowerCase() != "h2" && titleElement[0].nodeName.toLowerCase() != "h3") {
			prevElement = titleElement;
			titleElement = $(titleElement).prev();
		}
		if (titleElement.length && titleElement[0].nodeName.toLowerCase() != "h2" && titleElement[0].nodeName.toLowerCase() != "h3") {
			prevElement = titleElement;
			titleElement = $(titleElement).prev();
		}
		if (titleElement.length && (titleElement[0].nodeName.toLowerCase() == "h2" || titleElement[0].nodeName.toLowerCase() == "h3")) {
			title = $(titleElement[0]).text();
			title = title.replace(/ Edit/i, "");
			title = title.replace(/ \(\d*\)/, "");
			title = title.trim();
		}

		$(this).find("th").each(function(){
			var colName = $(this).text().trim().toLowerCase();
			if (colName == "engine name")  colName = "name";
			if (colName == "item")  colName = "name";
			headers[headers.length] = colName;
		});

		if (headers.length >= 2 && headers[0] === "name") {
			rtnInfoList[rtnInfoList.length] = {
				id: this.id,
				classNameList: this.className.split(/\s+/),
				title: title,
				caption: caption,
				element: $(this),
				headers: headers
			};
		}
	});

	return rtnInfoList;
};

statUpdateUtils.escapeHtml = function(unsafe) {
	unsafe = "" + unsafe;
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
};

//*** Very helpful regex escape routine from stackoverflow:  https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
statUpdateUtils.escapeRegExp = function(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

statUpdateUtils.roundToDecPlaces = function(input, places) {
	var mult = 1;
	var roundingShiftedLeft = false;
	if (places < 0) {
		places = places * -1;
		roundingShiftedLeft = true;
	}
	for (var i = 0; i < places; i++)  mult *= 10;
	if (roundingShiftedLeft) {
		return Math.round((input + Number.EPSILON) / mult) * mult;
	} else {
		return Math.round((input + Number.EPSILON) * mult) / mult;
	}
};

statUpdateUtils.roundToSignificantAmount = function(input, smallValue) {
	if (input >= 500)  return statUpdateUtils.roundToDecPlaces(input, -2);
	if (smallValue && input >= 100)  return statUpdateUtils.roundToDecPlaces(input / 50, 0) * 50;
	if (input >= 50)  return statUpdateUtils.roundToDecPlaces(input, -1);
	if (input >= 10)  return statUpdateUtils.roundToDecPlaces(input / 5, 0) * 5;
	return statUpdateUtils.roundToDecPlaces(input, 0);
};

statUpdateUtils.splitTextIntoPhrases = function(input, maxPhrase) {

	input = input.replace(/[^a-zA-Z0-9\(\):-]/g, " ");
	var inputWordList = input.split(/\s+/g);
	var phraseList = [];

	for (var plen = maxPhrase; plen > 0; plen--) {
		for (var sIdx = 0; sIdx <= inputWordList.length - plen; sIdx++) {
			var phrase = "";
			for (var i = 0; i < plen; i++) {
				phrase += inputWordList[sIdx + i] + " ";
			}
			phrase = phrase.trim();
			phraseList.push(phrase);
		}
	}

	return phraseList;
};

statUpdateUtils.addWikiLinksToText = function(input) {
	var phraseList = statUpdateUtils.splitTextIntoPhrases(input, statUpdateUtils.maxPhrase);
	var replacementList = [];
	var replacementInfo = {};
	var placeholderCount = 0;

	for (var pIdx in phraseList) {
		var origPhrase = phraseList[pIdx];
		var normalizedPhrase = statUpdateUtils.getStemmedAndNormalizedString(origPhrase);
		var wIdx = statUpdateUtils.normalizedWikiPageList.indexOf(normalizedPhrase);
		if (wIdx >= 0) {
			var url = mw.util.wikiGetlink(statUpdateUtils.wikiPageList[wIdx]);
			replacementInfo = {};
			replacementInfo["originalHtml"] = origPhrase;
			replacementInfo["replacementHtml"] = "<a href=\"" + url + "\" title=\"" + statUpdateUtils.escapeHtml(statUpdateUtils.wikiPageList[wIdx]) + "\">" + statUpdateUtils.escapeHtml(origPhrase) + "</a>";
			replacementInfo["placeholder"] = "~~placeholder:" + placeholderCount + ":~~";
			replacementList.push(replacementInfo);
			placeholderCount++;

			var regExp = new RegExp(statUpdateUtils.escapeRegExp(replacementInfo["originalHtml"]), 'g');
			input = input.replace(regExp, replacementInfo["placeholder"]);
		}
	}

	for (var idx in replacementList) {
		replacementInfo = replacementList[idx];
		var regExp = new RegExp(statUpdateUtils.escapeRegExp(replacementInfo["placeholder"]), 'g');
		input = input.replace(regExp, replacementInfo["replacementHtml"]);
	}

	return input;
};

statUpdateUtils.addWikiLinkToPhrase = function(phrase) {
	if (statUpdateUtils.isReady) {
		var normalizedPhrase = statUpdateUtils.getStemmedAndNormalizedString(phrase);
		var idx = statUpdateUtils.normalizedWikiPageList.indexOf(normalizedPhrase);
		if (idx >= 0) {
			var url = mw.util.wikiGetlink(statUpdateUtils.wikiPageList[idx]);
			phrase = "<a href=\"" + url + "\" title=\"" + statUpdateUtils.escapeHtml(statUpdateUtils.wikiPageList[idx]) + "\">" + statUpdateUtils.escapeHtml(phrase) + "</a>";
		}
	}
	return phrase;
};

statUpdateUtils.getStemmedAndNormalizedString = function(input) {
	var stringMapping = statUpdateUtils.getStemmedAndNormalizedStringMapping(input);
	return stringMapping.map(function(i){return i.normalizedWord;}).join(" ");
};

statUpdateUtils.stemWord = function(input) {
	if (typeof synonymListForWikiLinkReplacements !== "undefined" && !$.isEmptyObject(synonymListForWikiLinkReplacements)) {
		var exitLoop = false;
		for (var p in synonymListForWikiLinkReplacements) {
			if (exitLoop) break;
			for (var idx in synonymListForWikiLinkReplacements[p]) {
				if (input.toLowerCase() == synonymListForWikiLinkReplacements[p][idx].toLowerCase()) {
					input = p;
					exitLoop = true;
					break;
				}
			}
		}
	}

	return stemmer(input);
};

statUpdateUtils.getStemmedAndNormalizedStringMapping = function(input) {
	var inputWordList = input.split(/\b/);

	var wordMapping = [];
	var count = 0;
	var start = false;
	var curWord = "";
	var first = true;
	var wordInfo = {};

	for (var idx in inputWordList) {
		var word = inputWordList[idx];
		if (word.search(/^[^a-zA-Z0-9'\-]+$/) === 0) {
			if (count > 0) {
				wordInfo = {};
				wordInfo.origWord = inputWordList.slice(start, start + count).join("");
				wordInfo.normalizedWord = curWord.toLowerCase();
				if (statUpdateUtils.normalizedExactMatchWordList.indexOf(wordInfo.normalizedWord) == -1)
					wordInfo.normalizedWord = statUpdateUtils.stemWord(wordInfo.normalizedWord);
				wordMapping.push(wordInfo);
			}

			start = false;
			count = 0;
			curWord = "";
			continue;
		}
		if (word.search(/^['\-]+$/) === 0) {
			if (start === false)  start = parseInt(idx);
			count++;
			continue;
		}

		if (start === false)  start = parseInt(idx);
		curWord += word;
		count++;
	}

	if (count > 0) {
		wordInfo = {};
		wordInfo.origWord = inputWordList.slice(start, start + count + 1).join("");
		wordInfo.normalizedWord = curWord.toLowerCase();
		if (statUpdateUtils.normalizedExactMatchWordList.indexOf(wordInfo.normalizedWord) == -1)
			wordInfo.normalizedWord = statUpdateUtils.stemWord(wordInfo.normalizedWord);
		wordMapping.push(wordInfo);
	}

	return wordMapping;
};

statUpdateUtils.wikiPageList = [];
statUpdateUtils.normalizedWikiPageList = [];
statUpdateUtils.normalizedExactMatchWordList = [];
statUpdateUtils.normalizedDoNotPerformReplacementsList = [];
statUpdateUtils.saveWikiPageList = function(data) {
	if (typeof exactMatchWordListForWikiLinkReplacements !== "undefined" && Array.isArray(exactMatchWordListForWikiLinkReplacements)) {
		for (var eIdx = 0; eIdx < exactMatchWordListForWikiLinkReplacements.length; eIdx++) {
			var value = exactMatchWordListForWikiLinkReplacements[eIdx];
			value = value.trim().toLowerCase();
			statUpdateUtils.normalizedExactMatchWordList.push(value);
		}
	}

	if (typeof doNotPerformWikiLinkReplacementsWordList !== "undefined" && Array.isArray(doNotPerformWikiLinkReplacementsWordList)) {
		for (var dIdx = 0; dIdx < doNotPerformWikiLinkReplacementsWordList.length; dIdx++) {
			var value = doNotPerformWikiLinkReplacementsWordList[dIdx];
			value = statUpdateUtils.getStemmedAndNormalizedString(value);
			statUpdateUtils.normalizedDoNotPerformReplacementsList.push(value);
		}
	}

	if (Array.isArray(data)) {
		statUpdateUtils.wikiPageList = data;
		for (var idx = 0; idx < data.length; idx++) {
			var value = data[idx];
			value = statUpdateUtils.getStemmedAndNormalizedString(value);
			if (statUpdateUtils.normalizedDoNotPerformReplacementsList.indexOf(value) !== -1) {
				value = "*";  //*** A flag which indicates the word should not be replaced
			}
			statUpdateUtils.normalizedWikiPageList.push(value);
		}

		statUpdateUtils.isReady = true;
	}
};

$( document ).ready(function() {
    statUpdateCacheUtils.getCachedWikiPageList(0, statUpdateUtils.saveWikiPageList);
});