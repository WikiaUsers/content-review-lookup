$().ready(function () {
	$("div.LeaderFinder input[name='cardId']").on("keypress", function (evt) {
		if (evt.which == 13) {
			$("button.findLeader").click();
		}
	});
	$("button.randomLeader").click();
	showHotSearch();
});
function findLeader() {
	var enabled = $("button.findLeader").attr("disabled");
	if (enabled === "disabled") {
		return false;
	}
	var cardId = $("div.LeaderFinder input[name='cardId']").val();
	if (cardId === "") {
		$("div.LeaderFinder input[name='cardId']").select();
		return false;
	}
	$("button.findLeader").attr("disabled", true);
	cardId = parseInt(cardId);
	if (isNaN(cardId)) {
		$("div.LeaderFinderResult").empty();
		$("div.LeaderFinderNoResult").show();
		$("button.findLeader").attr("disabled", false);
		$("div.LeaderFinder input[name='cardId']").select();
		return false;
	}
	$("div.LeaderFinder input[name='cardId']").val(cardId);
	updateSearchData(cardId);
	getLeaderData(function (leaderTextData) {
		var leaderData = jQuery.parseJSON(leaderTextData);
		if (!leaderData) {
			leaderData = {};
		}
		$("span.leaderCount").html("共有 " + Object.keys(leaderData).length + " 位魔導士登錄");
		var finderResults = getObjects(leaderData, "cardId", cardId);
		$("div.LeaderFinderResult").empty();
		if (finderResults.length > 0) {
			showFindResults(finderResults);
			$("div.LeaderFinderNoResult").hide();
		} else {
			$("div.LeaderFinderNoResult").show();
			$("button.findLeader").attr("disabled", false);
			$("div.LeaderFinder input[name='cardId']").select();
		}
	});
}
function getObjects(obj, key, val, wikiaUserId) {
	var objects = [];
	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) {
			continue;
		}
		if (typeof obj[i] == 'object') {
			if (obj[i].leaders) {
				wikiaUserId = i;
			}
			objects = objects.concat(getObjects(obj[i], key, val, wikiaUserId));
		} else if (i == key) {
			if (obj[key] == val) {
				objects.push({
					"wikiaUserId": wikiaUserId,
					"leader": obj
				});
			}
		}
	}
	return objects;
}
function showFindResults(results) {
	var cardId = $("div.LeaderFinder input[name='cardId']").val();
	getCardMaxLv(cardId, function (data) {
		var content = data.parse.text['*'];
		var startIndex = content.indexOf("<p>") + 3;
		var endIndex = content.indexOf("\n<\/p>");
		var CardMaxLv = parseInt(content.substring(startIndex, endIndex));

		$(results).each(function (index, result) {
			var wikiaUserId = result.wikiaUserId;
			var leader = result.leader;
			$("div.LeaderFinderResult").append($("div.LeaderTemplate").html());
			var LeaderNode = $("div.LeaderFinderResult div.leader:nth-child(" + (index + 1) + ")");
			var lv = leader.cardLv;
			if (lv.toUpperCase() == "MAX") {
				lv = "MAX";
			} else if (parseInt(lv) >= parseInt(CardMaxLv)) {
				lv = "MAX";
			} else {
				lv = "Lv. " + lv;
			}
			$(LeaderNode).find("div.cardLv").html(lv);
			$(LeaderNode).find("div.cardExtra").html(leader.cardExtra);
			if (parseInt(leader.cardExtra) <= 0) {
				$(LeaderNode).find("div.cardExtra").hide();
			}
			$(LeaderNode).find("div.userId").html(leader.userId);
			$(LeaderNode).find("a.userName").html(leader.userName);
			$(LeaderNode).find("a.userName").attr("href", "https://nekowiz.fandom.com/zh/wiki/%E4%BD%BF%E7%94%A8%E8%80%85:" + wikiaUserId);
			$(LeaderNode).find("a.userName").attr("target", "_blank");
			$(LeaderNode).find("div.userNote").html(leader.userNote);
		});

		getLeaderImage(cardId, function (data) {
			$("div.LeaderFinderResult").find("div.img").html($(data.parse.text['*']).children().attr('target', '_blank'));
		});

		$("div.LeaderFinderResultCount").html("搜尋到 " + results.length + " 位魔導士");
		$("button.findLeader").attr("disabled", false);
		$("div.LeaderFinder input[name='cardId']").select();
	});
}
function getLeaderImage(cardId, successFunc) {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%7B%7BCard/Image/Small%7Cid=' + cardId + '%7Clink=true%7D%7D')
	}, successFunc, 'json');
}
function getCardMaxLv(cardId, successFunc) {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%7B%7BCard/Data/' + cardId + '%7Cdata=MaxLevel%7D%7D')
	}, successFunc, 'json');
}
function randomLeader() {
	var enabled = $("button.randomLeader").attr("disabled");
	if (enabled === "disabled") {
		return false;
	}
	$("div.LeaderFinder input[name='cardId']").val("");
	$("button.randomLeader").attr("disabled", true);
	getLeaderData(function (leaderTextData) {
		var leaderData = jQuery.parseJSON(leaderTextData);
		if (!leaderData) {
			leaderData = {};
		}
		var randomindexs = [];
		var randomResults = [];
		var maxRandomCount = (Math.floor(Math.random() * 50) + 1);
		var leaderDataLength = Object.keys(leaderData).length;
		$("span.leaderCount").html("共有 " + leaderDataLength + " 位魔導士登錄");
		var count = maxRandomCount;
		if (maxRandomCount > leaderDataLength) {
			count = leaderDataLength;
		}
		for (var i = 0; i < count; i++) {
			var randomIndex = Math.floor(Math.random() * (leaderDataLength));
			if (randomindexs.indexOf(randomIndex) >= 0) {
				i--;
				continue;
			}
			var wikiaUserId = Object.keys(leaderData)[randomIndex];
			if (!leaderData[wikiaUserId].leaders) {
				i--;
				continue;
			}
			var wikiaUserLeaders = leaderData[wikiaUserId].leaders;
			if (wikiaUserLeaders.length == 0) {
				if (maxRandomCount < leaderDataLength) {
					i--;
				}
				randomindexs.push(randomIndex);
				continue;
			}
			var randomLeaderIndex = Math.floor(Math.random() * (wikiaUserLeaders.length));
			randomResults.push({
				"wikiaUserId": wikiaUserId,
				"leader": wikiaUserLeaders[randomLeaderIndex]
			});
			randomindexs.push(randomIndex);
		}

		$("div.LeaderFinderResult").empty();
		if (randomResults.length > 0) {
			showRandomResults(randomResults);
			$("div.LeaderFinderNoResult").hide();
		} else {
			$("div.LeaderFinderNoResult").show();
			$("button.randomLeader").attr("disabled", false);
		}
	});
}
function showRandomResults(results) {
	$(results).each(function (index, result) {
		var wikiaUserId = result.wikiaUserId;
		var leader = result.leader;
		$("div.LeaderFinderResult").append($("div.LeaderTemplate").html());
		var LeaderNode = $("div.LeaderFinderResult div.leader:nth-child(" + (index + 1) + ")");
		getLeaderImage(leader.cardId, function (data) {
			$(LeaderNode).find("div.img").html($(data.parse.text['*']).children().attr('target', '_blank'));
		});

		if (leader.cardLv.toUpperCase() === "MAX") {
			$(LeaderNode).find("div.cardLv").html("MAX");
		} else if (leader.cardLv % 10 == 0) {
			getCardMaxLv(leader.cardId, function (data) {
				var content = data.parse.text['*'];
				var startIndex = content.indexOf("<p>") + 3;
				var endIndex = content.indexOf("\n<\/p>");
				var CardMaxLv = parseInt(content.substring(startIndex, endIndex));

				var lv = leader.cardLv;
				if (parseInt(lv) >= parseInt(CardMaxLv)) {
					lv = "MAX";
				} else {
					lv = "Lv. " + lv;
				}
				$(LeaderNode).find("div.cardLv").html(lv);
			});
		} else {
			$(LeaderNode).find("div.cardLv").html("Lv. " + leader.cardLv);
		}

		$(LeaderNode).find("div.cardExtra").html(leader.cardExtra);
		if (parseInt(leader.cardExtra) <= 0) {
			$(LeaderNode).find("div.cardExtra").hide();
		}
		$(LeaderNode).find("div.userId").html(leader.userId);
		$(LeaderNode).find("a.userName").html(leader.userName);
		$(LeaderNode).find("a.userName").attr("href", "https://nekowiz.fandom.com/zh/wiki/%E4%BD%BF%E7%94%A8%E8%80%85:" + wikiaUserId);
		$(LeaderNode).find("a.userName").attr("target", "_blank");
		$(LeaderNode).find("div.userNote").html(leader.userNote);
	});
	$("div.LeaderFinderResultCount").html("與 " + results.length + " 位魔導士相當有緣分");
	$("button.randomLeader").attr("disabled", false);
}
function getSearchData(successFunc) {
	$.ajax({
		url: "https://nekowiz.fandom.com/zh/wiki/Template:Leader/SearchData?action=raw",
		cache: false,
		success: successFunc,
		error: function (xhr) {
			console.log("error");
		}
	});
}
function saveSearchData(searchData) {
	$.ajax({
		url: mw.util.wikiScript('api'),
		data: {
			format: 'json',
			action: 'edit',
			title: 'Template:Leader/SearchData',
			text: searchData,
			token: mw.user.tokens.get('editToken')
		},
		dataType: 'json',
		type: 'POST',
		cache: false,
		success: function (data) {
		},
		error: function (xhr) {
			console.log("error");
		}
	});
}
function updateSearchData(cardId) {
	getSearchData(function (searchTextData) {
		var searchData = jQuery.parseJSON(searchTextData);
		if (!searchData) {
			searchData = {};
		}
		if (!searchData[cardId]) {
			searchData[cardId] = {};
		}
		if (!searchData[cardId].count) {
			searchData[cardId].count = 0;
		}
		searchData[cardId].count++;
		saveSearchData(JSON.stringify(searchData));
	});
}
function showHotSearch() {
	getSearchData(function (searchTextData) {
		var searchData = jQuery.parseJSON(searchTextData);
		var sortSearchData = [];
		for (var cardId in searchData) {
			var card = searchData[cardId];
			sortSearchData.push({
				"cardId": cardId,
				"searchCount": card.count
			});
		}
		sortSearchData.sort(function (a, b) {
			return b.searchCount - a.searchCount;
		});
		for (var i = 0; i < 12; i++) {
			if (!sortSearchData[i]) {
				continue;
			}
			var hotLeaderDiv = document.createElement("div");
			$(hotLeaderDiv).attr("class", "hotLeader");
			$("div.HotLeader").append(hotLeaderDiv);
			getHotLeaderImage(sortSearchData[i].cardId, hotLeaderDiv);
		}
	});
}
function getHotLeaderImage(cardId, rootNode) {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%7B%7BCard/Image/Small%7Cid=' + cardId + '%7Clink=%7C%7D%7D')
	}, function (data) {
		$(rootNode).html($(data.parse.text['*']).children().removeAttr('href').removeClass("image"));
		$(rootNode).find("a").on("click", function () {
			$("div.LeaderFinder input[name='cardId']").val(cardId);
			$("button.findLeader").click();
		});
	}, 'json');
}

$("div.title:last").after('<style>span.leaderCount{font-size: 9pt;}div.LeaderFinder{background-color: rgba(255,0,0,0.3);border-radius: 3px;padding: 10px;margin: 10px 0px;}div.LeaderFinderResult div.leader{display: inline-block;padding: 5px;margin: 3px 0px;}div.LeaderFinderResult div.cardInfo{width: 55px;height: 55px;position: relative;display: inline-block;text-shadow: 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black;font-size: 10pt;vertical-align: middle;}div.LeaderFinderResult div.cardInfo img{width: 55px;height: 55px;}div.LeaderFinderResult div.cardInfo div.cardLv{position: absolute;bottom: -8px;left: 0px;}div.LeaderFinderResult div.cardInfo div.cardExtra{position: absolute;top: 3px;right: 0px;}div.LeaderFinderResult div.cardInfo div.cardExtra:before{content: "+";}div.LeaderFinderResult div.userInfo{width: 140px;display: inline-block;font-size: 10pt;vertical-align: middle;border-radius: 2px;border: 1px solid rgb(185,160,58);padding: 3px;background: rgba(0,0,0,0.2);line-height: 10pt;position: relative;height: 60px;}div.LeaderFinderResult div.userId{position: absolute;bottom: -10px;background: darkred;color: white;font-weight: bolder;text-align: center;right: -1px;width: 90px;border-radius: 2px;border: 1px solid rgb(185,160,58);padding: 3px;}div.LeaderFinderResult a.userName{overflow: hidden;height: 15px;font-weight: bolder;display: block;color: white;}div.LeaderFinderResult div.userNote{overflow: hidden;height: 40px;color: gainsboro;margin-left: 5px;}div.LeaderFinderNoResult{text-align: center;padding: 5px;color: red;display: none;}div.searchLeader, div.HotLeader{height: 45px;}div.HotLeader{padding-left: 20px;}div.HotLeader:before{content: "熱門隊長 ";font-size: 9pt;}div.HotLeader div{display: inline-block;margin: 0px 3px;}div.HotLeader img{width: 40px;height: 40px;cursor: pointer;}div.LeaderFinderResultCount{text-align: right;font-size: 9pt;}</style><div class="LeaderFinder"><div class="searchLeader"><input name="cardId" placeholder="卡片編號"/><button class="findLeader" type="button" onclick="findLeader();">搜尋</button><button class="randomLeader" type="button" onclick="randomLeader();">隨機遇見</button><span class="leaderCount"></span></div><div class="HotLeader"></div></div><div class="LeaderFinderResultCount"></div><div class="LeaderFinderResult"></div><div class="LeaderFinderNoResult">找不到目前有人使用此代表，請重新輸入卡片編號重新搜尋。</div><div class="LeaderTemplate" style="display: none;"><div class="leader"><div class="cardInfo"><div class="img"></div><div class="cardLv"></div><div class="cardExtra"></div></div><div class="userInfo"><a class="userName"></a><div class="userNote"></div><div class="userId"></div></div></div></div>');