importScriptPage("MediaWiki:ApiKey.js", "translators");

temp_text = $('#wikiReason').val();
user = "~~" + "~~";
// default - en
language = wgContentLanguage;
staffUsers = [
"Miri-Nae", "MtaÄ"
];

var $ = this.jQuery,
    mw = this.mediaWiki,
    i,
    msg = messages = {
        get: function(name) {
    return (messages[language.toUpperCase()]||messages['EN'])[name];
        }
}

// variables to localize
messages['EN'] = {
"staffReason": "This community is currently inactive and it would be great if someone would take on the wiki to revive it again! If you like the topic, go ahead and post an adoption request.",
"postAsStaffTooltip": "Add wiki as staff (erases comment and replaces with default message)",
"newOfferSummary": "New adoption offer",
"wikiOfferPage": "Adopties", // this is where the offer place lives
"AdoptionOfferTableLocation": "AdoptionOfferTable", // name of the template that is used in the post
"adoptionFormH2": "Put your wiki up for adoption",
"offerURLTooltip": "URL of the wiki you want to put up for adoption",
"offerReasonTooltip": "Please let us know why you want to put the wiki up for adoption",
"submit": "Submit",
"offerAdoptButtonSummary": "New adoption request",
"postAdoptionRequestNamespace": "Adoption:",
"postAdoptionRequestTitleSuffix": "Adoptable wikis",
"postAdoptionRequestPreload": "Forumheader/Adoption_requests",
"putwikiupforadoption": "Put wiki up for adoption",
}
messages['DE'] = {
"staffReason": "Diese Community ist momentan inaktiv und es wäre schön, wenn sich jemand bereiterklärt, ihr wieder Leben einzuhauchen! Wenn du dich also für das Thema erwärmen kannst, dann stelle einen Adoptionsantrag.",
"postAsStaffTooltip": "Wiki als Angestellter hinzufügen (überschreibt Kommentar mit vorgefertigter Nachricht)",
"newOfferSummary": "Neues adoptierbares Projekt hinzugefügt",
"wikiOfferPage": "Projekt:Adoptierbare Wikis", // this is where the offer place lives
"AdoptionOfferTableLocation": "AdoptionOfferTable", // name of the template that is used in the post
"adoptionFormH2": "Projekt zur Adoption freigeben",
"offerURLTooltip": "URL des Projektes, das zur Adoption freigegeben werden soll",
"offerReasonTooltip": "Lass uns wissen, warum du das Projekt abgeben möchtest",
"submit": "Abschicken",
"offerAdoptButtonSummary": "Neue Adoptionsanfrage",
"postAdoptionRequestNamespace": "Adoption:",
"postAdoptionRequestTitleSuffix": "Adoptierbare Wikis",
"postAdoptionRequestPreload": "Forumheader/Adoption_requests",
"putwikiupforadoption": "Wiki zur Adoption freigeben",
}

messages['KO'] = {
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
}

// code
$("span#adoptButton").html('<button id="opener" onclick="offerWikiForAdoption()">' + msg.get('putwikiupforadoption') + '</button>');

function submitWikiForAdoption() {
summary = msg.get('newOfferSummary'); // this appears in recent changes
reason = $("#wikiReason").val();
url = $("#wikiURL").val();
urlname = url.replace('http://', '').replace(/\.wikia\.com(.*)/g, '');
destination = msg.get("wikiOfferPage"); // post to this page
text = '\n==' + urlname + '==\n{{' + msg.get('AdoptionOfferTableLocation') + '\n|user=' + user + '\n|reason=' + reason + '\n|url=' + url + '\n|wikiurlid=' + urlname + '\n}}\n'; 

$.post(wgServer + '/api.php?action=edit&title=' + encodeURIComponent(destination) + '&appendtext=' + encodeURIComponent(text) + '&token=' + encodeURIComponent(_api.edittoken) + '&summary=' + summary, function() {
setTimeout(function() {
window.location.reload();
}, 500);
});
}

function offerWikiForAdoption()  {
$("#opener").fadeOut();

$("#adoptButton button").after('<div id="adoptionForm" style="text-align: left;">' 
+ '<h2>' + msg.get('adoptionFormH2') + '</h2>'
+ '<div style="display: none;" id="helper">'
	+ '<input type="checkbox"></input>&nbsp;'
	+ msg.get('postAsStaffTooltip')
	+ '</div>'
+ '<b>' + msg.get('offerURLTooltip') + '</b>'
+ '<br>'
+ '<input id="wikiURL"></input>'
+ '<br><br>'
+ '<b>' + msg.get('offerReasonTooltip') + '</b>'
+ '<br>'
+ '<textarea id="wikiReason"></textarea>'
+ '<br><button id="wikiSubmit" onclick="submitWikiForAdoption()">' + msg.get('submit') + '</button>'
+ '</div>');

if (jQuery.inArray( wgUserName, staffUsers ) !== -1) {
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
		$('#wikiReason').val(msg.get('staffReason'));
    } else {
		$('#wikiReason').val(temp_text);
		user = _api.signature;
}
});
}

$(".button.adoptMe").click(function() {

adopt_wiki_id = $(this).attr("id");

summary = msg.get('offerAdoptButtonSummary'); // this appears in recent changes

setTimeout(function() {
window.location = _api.server + "/wiki/" + msg.get('postAdoptionRequestNamespace') + adopt_wiki_id + " (" + msg.get('postAdoptionRequestTitleSuffix') +")?action=edit&preload=Template:" + msg.get('postAdoptionRequestPreload') + "&editintro=&summary=" + summary + "&redlink=1";
}, 500);

});