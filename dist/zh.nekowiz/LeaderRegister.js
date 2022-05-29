$().ready(function () {
    createLeaderRegisterUI();
	$("button.addMyLeader").on("click", function () {
		addMyLeader();
	});
	loadMyLeader();
});
function getCardImage(element) {
	var cardId = parseInt($(element).val());
	if(isNaN(cardId)){
		cardId = "";
	}
	$(element).val(cardId);
	if(!cardId){
		return false;
	}
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%7B%7BCard/Image/Small%7Cid=' + cardId + '%7Clink=true%7D%7D')
	}, function (data) {
		var appendNode = $(element).parents("tr").find("td.cardImage");
		$(appendNode).empty();
		$(data.parse.text['*']).children().attr('target', '_blank').appendTo(appendNode);
	}, 'json');
}
function addMyLeader() {
	if ($("table.myLeader tbody tr").length < 5) {
		$("table.myLeader tbody").append($("table.myLeader tfoot").html());
	} else {
		alert("最多新增五筆代表");
	}
}
function deleteMyLeader(element) {
	$(element).parents("tr").remove();
}
function getLeaderData(successFunc) {
	$.ajax({
		url: "https://nekowiz.fandom.com/zh/wiki/Template:Leader/Data?action=raw",
		cache: false,
		success: successFunc,
		error: function (xhr) {
			errorHandler();
		}
	});
}
function myLeaderToJson() {
	var leaderRegisterForm = $("#leaderRegisterForm tbody");
	var Leaders = [];
	var userId = $(leaderRegisterForm).find("input[name='userId']").val();
	if (!userId) {
		return null;
	}
	var userName = $(leaderRegisterForm).find("input[name='userName']").val();
	if (!userName) {
		return null;
	}
	var userNote = $(leaderRegisterForm).find("input[name='userNote']").val();
	var cardIds = $(leaderRegisterForm).find("input[name='cardId']");
	var cardLvs = $(leaderRegisterForm).find("input[name='cardLv']");
	var cardExtras = $(leaderRegisterForm).find("input[name='cardExtra']");
	for (var i = 0; i < cardIds.length; i++) {
		if (!cardIds[i]) {
			continue;
		}
		if (!cardLvs[i]) {
			continue;
		}
		if (!cardExtras[i]) {
			continue;
		}
		var cardId = $(cardIds[i]).val();
		var cardLv = $(cardLvs[i]).val();
		var cardExtra = $(cardExtras[i]).val();
		Leaders.push({
			"userId": userId,
			"userName": userName,
			"userNote": userNote,
			"cardId": cardId,
			"cardLv": cardLv,
			"cardExtra": cardExtra
		});
	}
	return {
		"userId": userId,
		"userName": userName,
		"userNote": userNote,
		"leaders": Leaders
	};
}
function checkMyLeader() {
	if (mw.config.values.wgUserName === null) {
		alert('請先登入Wikia');
		return false;
	}
	var leaderRegisterForm = $("#leaderRegisterForm tbody");
	var userId = $(leaderRegisterForm).find("input[name='userId']");
	if (!$(userId).val()) {
		alert('請輸入招待碼');
		$(userId).focus();
		return false;
	}
	var userName = $(leaderRegisterForm).find("input[name='userName']");
	if (!$(userName).val()) {
		alert('請輸入暱稱');
		$(userName).focus();
		return false;
	}
	var cardIds = $(leaderRegisterForm).find("input[name='cardId']");
	var cardLvs = $(leaderRegisterForm).find("input[name='cardLv']");
	var cardExtras = $(leaderRegisterForm).find("input[name='cardExtra']");
	for (var i = 0; i < cardIds.length; i++) {
		var cardIdInput = cardIds[i];
		var cardLvInput = cardLvs[i];
		var cardExtraInput = cardExtras[i];
		var cardId = parseInt($(cardIdInput).val());
		var cardLv = $(cardLvInput).val();
		var cardExtra = parseInt($(cardExtraInput).val());
		if (isNaN(cardId)) {
			$(cardIdInput).val("");
			alert('請輸入卡片編號');
			$(cardIdInput).select();
			return false;
		}
		if (!cardId) {
			alert('請輸入卡片編號');
			$(cardIdInput).select();
			return false;
		}
		if (!cardLv) {
			alert('請輸入精靈等級');
			$(cardLvInput).select();
			return false;
		}
		cardLv = parseInt(cardLv);
		if (isNaN(cardLv)) {
			if ($(cardLvInput).val().toUpperCase() !== "MAX") {
				alert('請輸入正確的等級');
				$(cardLvInput).select();
				return false;
			}
		} else {
			if (cardLv <= 0) {
				alert('請輸入正確的等級');
				$(cardLvInput).select();
				return false;
			}
			if (cardLv > 110) {
				alert('請輸入正確的等級');
				$(cardLvInput).select();
				return false;
			}
		}
		if (isNaN(cardExtra)) {
			alert('請輸入碼那值');
			$(cardExtraInput).val("");
			$(cardExtraInput).select();
			return false;
		}
		if (cardExtra < 0 || cardExtra > 400) {
			alert('請輸入正確的碼那值');
			$(cardExtraInput).select();
			return false;
		}
		$(cardExtraInput).val(cardExtra);
	}
	return true;
}
function saveMyLeader() {
	if (!checkMyLeader()) {
		return false;
	}
	$("button.saveMyLeader").attr("disabled", true);
	getLeaderData(function (leaderTextData) {
		var leaderData = jQuery.parseJSON(leaderTextData);
		if (!leaderData) {
			leaderData = {};
		}
		var userId = mw.user.id();
		var myLeaderData = myLeaderToJson();
		leaderData[userId] = myLeaderData;
		saveLeaderData(JSON.stringify(leaderData));
	});
}
function saveLeaderData(leaderData) {
	$.ajax({
		url: mw.util.wikiScript('api'),
		data: {
			format: 'json',
			action: 'edit',
			title: 'Template:Leader/Data',
			text: leaderData,
			token: mw.user.tokens.get('csrfToken')
		},
		dataType: 'json',
		type: 'POST',
		cache: false,
		success: function (data) {
			if (data.edit) {
				if (data.edit.result == 'Success') {
					$("#leaderRegisterForm span.msg").html("儲存完成").fadeIn(1000).delay(3000).fadeOut(1000);
					$("button.saveMyLeader").attr("disabled", false);
					return true;
				}
			}
			$("#leaderRegisterForm span.msg").html("儲存失敗，請重新整理網頁再試").fadeIn(1000).delay(3000).fadeOut(1000);
			$("button.saveMyLeader").attr("disabled", false);
		},
		error: function (xhr) {
			$("button.saveMyLeader").attr("disabled", false);
		}
	});
}
function loadMyLeader() {
	if (mw.config.values.wgUserName === null) {
		$("#leaderRegisterForm").hide();
		$("div.noLoginMsg").fadeIn(1000);
		return false;
	}
	getLeaderData(function (leaderTextData) {
		var leaderData = jQuery.parseJSON(leaderTextData);
		if (!leaderData) {
			return false;
		}
		var userId = mw.user.id();
		var myLeaderData = null;
		myLeaderData = leaderData[userId];
		if (!myLeaderData) {
			return addMyLeader();
		}
		$("#leaderRegisterForm input[name='userId']").val(myLeaderData.userId);
		$("#leaderRegisterForm input[name='userName']").val(myLeaderData.userName);
		$("#leaderRegisterForm input[name='userNote']").val(myLeaderData.userNote);
		for (var i = 0; i < myLeaderData.leaders.length; i++) {
			var myLeader = myLeaderData.leaders[i];
			addMyLeader();
			var myLeaderNode = $("table.myLeader tbody tr:nth-child(" + (i + 1) + ")");
			$(myLeaderNode).find("input[name='cardId']").val(myLeader.cardId);
			getCardImage($(myLeaderNode).find("input[name='cardId']"));
			$(myLeaderNode).find("input[name='cardLv']").val(myLeader.cardLv);
			$(myLeaderNode).find("input[name='cardExtra']").val(myLeader.cardExtra);
		}
	});
}

function createLeaderRegisterUI(){
    $("div.title1:first").after('<style>table.myLeader input{width: 100%;}tabl.myLeader td{height: 50px;}table.myLeader td.cardImage{width: 50px;}table.myLeader td.cardImage img{width: 50px;height: 50px;}div.noLoginMsg{display: none;text-align: center;color: yellow;}</style><form id="leaderRegisterForm"><table class="article-table"><tr><th style="width: 50px;">招待碼</th><td><input name="userId"/></td><th style="width: 50px;">暱稱</th><td><input name="userName"/></td></tr><tr><th>招呼語</th><td><input name="userNote"/></td><td colspan="2" style="text-align: center;"><button class="saveMyLeader" type="button" onclick="saveMyLeader();">儲存</button><span class="msg"></span></td></tr></table><table class="myLeader article-table"><thead><tr><th colspan="2">卡片編號</th><th style="width: 50px;">等級</th><th style="width: 50px;">瑪那值</th><th style="width: 50px;"><button class="addMyLeader" type="button">新增</button></th></tr></thead><tbody></tbody><tfoot style="display: none;"><tr><td><input name="cardId" onkeyup="getCardImage(this);" placeholder="卡片編號" /></td><td class="cardImage"></td><td><input name="cardLv" value="1" /></td><td><input name="cardExtra" value="0" /></td><td><button class="deleteCard" type="button" onclick="deleteMyLeader(this);">刪除</button></td></tr></tfoot></table></form><div class="noLoginMsg">請登入 Wikia 會員</div>');
}