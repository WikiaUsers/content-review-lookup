;(function($, mw) {
	'use strict';
	var config = mw.config.get([
			'wgContentLanguage',
			'wgArticlePath',
			'wgScriptPath',
			'wgUserName'
		]),
		temp_text = $('#wikiReason').val(),
		user = "~~" + "~~",
		// default - en
		language = config.wgContentLanguage,
		staffUsers = [
			"MtaÄ"
		],
		token = mw.user.tokens.values.csrfToken;
	
	var i,
	    messages = {
	        get: function(name) {
	    return (messages[language.toUpperCase()]||messages.EN)[name];
	        }
	};
	
	messages.DE = {
	"staffReason": "Diese Community ist momentan inaktiv und es wäre schön, wenn sich jemand bereiterklärt, ihr wieder Leben einzuhauchen! Wenn du dich also für das Thema erwärmen kannst, dann stelle einen Adoptionsantrag.",
	"postAsStaffTooltip": "Wiki als Angestellter hinzufügen (überschreibt Kommentar mit vorgefertigter Nachricht)",
	"newOfferSummary": "Neues adoptierbares Wiki hinzugefügt",
	"wikiOfferPage": "Adoptierbare Wikis", // this is where the offer place lives
	"AdoptionOfferTableLocation": "AdoptionOfferTable", // name of the template that is used in the post
	"adoptionFormH2": "Wiki zur Adoption freigeben",
	"offerURLTooltip": "URL des Wikis, das zur Adoption freigegeben werden soll",
	"offerReasonTooltip": "Lass uns wissen, warum du es abgeben möchtest",
	"submit": "Abschicken",
	"offerAdoptButtonSummary": "Neue Adoptionsanfrage",
	"postAdoptionRequestNamespace": "Adoption:",
	"postAdoptionRequestTitleSuffix": "Adoptierbare Wikis",
	"postAdoptionRequestPreload": "Forumheader/Adoption_requests",
	"putwikiupforadoption": "Neues Wiki zur Adoption freigeben",
	};
	
	messages.KO = {
	"staffReason": "이 커뮤니티는 현재 활동이 저조하지만, 누군가의 도움이 있다면 다시 활기를 되찾을 수 있을 것으로 보입니다. 이 주제에 관심이 있으시다면 관리자 권한을 신청해주세요.",
	"postAsStaffTooltip": "스태프로서 추가하기 (이미 적혀 있는 설명을 지우고 기본 설명으로 대체합니다)",
	"newOfferSummary": "새 관리자 권한 제안",
	"wikiOfferPage": "관리자 권한 제안", // this is where the offer place lives
	"AdoptionOfferTableLocation": "관리자 권한 제안 틀", // name of the template that is used in the post
	"adoptionFormH2": "위키를 관리자 권한 제안란에 올려보세요",
	"offerURLTooltip": "관리자 권한을 제안하고 싶은 위키의 주소(URL)",
	"offerReasonTooltip": "해당 위키를 관리자 권한을 제안한 이유를 알려주세요 ",
	"submit": "완료",
	"offerAdoptButtonSummary": "관리자 권한 요청",
	"postAdoptionRequestNamespace": "관리자 권한 요청:",
	"postAdoptionRequestTitleSuffix": "관리자 권한 제안",
	"postAdoptionRequestPreload": "관리자 권한 요청",
	"putwikiupforadoption": "새 관리자 권한 제안",
	};
	
	// code
	$("span#adoptButton").html('<button id="opener" onclick="offerWikiForAdoption()">' + messages.get('putwikiupforadoption') + '</button>');
	
	function submitWikiForAdoption() {
		var summary = messages.get('newOfferSummary'), // this appears in recent changes
			reason = $("#wikiReason").val(),
			url = $("#wikiURL").val(),
			urlname = url.replace('http://', '').replace(/\.wikia\.com(.*)/g, ''),
			destination = messages.get("wikiOfferPage"), // post to this page
			text = '\n==' + urlname + '==\n{{' + messages.get('AdoptionOfferTableLocation') + '\n|user=' + user + '\n|reason=' + reason + '\n|url=' + url + '\n|wikiurlid=' + urlname + '\n}}\n'; 
		
		$.post(config.wgScriptPath + '/api.php?action=edit&title=' + encodeURIComponent(destination) + '&appendtext=' + encodeURIComponent(text) + '&token=' + encodeURIComponent(token) + '&summary=' + summary, function() {
		setTimeout(function() {
		window.location.reload();
		}, 500);
		});
	}
	
	function offerWikiForAdoption()  {
	$("#opener").fadeOut();
	
	$("#adoptButton button").after('<div id="adoptionForm" style="text-align: left;">' +
	'<h2>' + messages.get('adoptionFormH2') + '</h2>' +
	'<div style="display: none;" id="helper">' +
		'<input type="checkbox"></input>&nbsp;' +
		messages.get('postAsStaffTooltip') +
		'</div>' +
	'<b>' + messages.get('offerURLTooltip') + '</b>' +
	'<br>' +
	'<input id="wikiURL"></input>' +
	'<br><br>' +
	'<b>' + messages.get('offerReasonTooltip') + '</b>' +
	'<br>' +
	'<textarea id="wikiReason"></textarea>' +
	'<br><button id="wikiSubmit" onclick="submitWikiForAdoption()">' + messages.get('submit') + '</button>' +
	'</div>');
	
	if ($.inArray( config.wgUserName, staffUsers ) !== -1) {
	// if user name is specified in the staff array
	$("#helper").fadeIn();
	} else {
	$("#helper").remove();
	}
	
	$("#adoptionForm #wikiURL, #adoptionForm textarea").css("box-sizing", "border-box").css("width", "100%");
	
	$("#helper input").change(function() {
	    if(this.checked) {
			user = '<staff />';
			temp_text = $('#wikiReason').val();
			$('#wikiReason').val(messages.get('staffReason'));
	    } else {
			$('#wikiReason').val(temp_text);
			user = '~~' + '~~';
	}
	});
	}
	
	$(".button.adoptMe").click(function() {
	
	var adopt_wiki_id = $(this).attr("id");
	
	var summary = messages.get('offerAdoptButtonSummary'); // this appears in recent changes
	
	setTimeout(function() {
		var tmp = messages.get('postAdoptionRequestNamespace') + adopt_wiki_id + " (" + messages.get('postAdoptionRequestTitleSuffix') +")?action=edit&preload=Template:" + messages.get('postAdoptionRequestPreload') + "&editintro=&summary=" + summary + "&redlink=1";
		window.location = config.wgArticlePath.replace('$1', tmp);
	}, 500);
	
	});
})(window.jQuery, window.mediaWiki);