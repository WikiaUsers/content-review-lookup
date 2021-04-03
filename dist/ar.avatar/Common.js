/* User profile header custom tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { link:'Project:Administrators' },
		rollback: { link:'Project:Rollback' }
	}
};
window.UserTagsJS.modules.inactive = 30;
window.UserTagsJS.modules.mwGroups = ['rollback', 'sysop', 'bot', 'bot-global'];
 
/* Auto-refreshing recent changes */
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');
 
/* Standard edit summaries */
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'MediaWiki:Stdsummaries'
};
 
/* 
/* Custom edit buttons for source mode
 * by: [[User:Thailog|Thailog]]
 */
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
		"speedTip": "إدراج قالب الشخصيات",
		"tagOpen": "\{\{قالب الشخصيات\r| الأمة         = ",
		"tagClose": "\r| الصورة          = \r| اسماء بديلة      = \r| الجنسية    = \r| الأصل العرقي      = \r| العمر            = \r| تاريخ الميلاد          = \r| تاريخ الوفاة          = \r| النوع         = \r| الطول         = \r| لون العين           = \r| لون الشعر           = \r| لون البشرة      = \r| نوع البشرة       = \r| زوج/ة   = \r| الحلفاء         = \r| الأعداء        = \r| السلاح المفضل         = \r| أساليب القتال  = \r| مهنة     = \r| منصب       = \r| فترة لحكم          = \r| سبقه           = \r| تبعه        = \r| لانتماء    = \r| أول ظهور     = \r| آخر ظهور = \r| مؤدي الصوت          = \r| مؤدي الشخصية          = \r| المزيد           = \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/__cb20120415191112/avatar/images/2/25/Cite_ep_Button.png",
		"speedTip": "Episode/issue reference tag",
		"tagOpen": "<ref name=\"\">{{Cite episode|2|4",
		"tagClose": "}}</ref>",
		"sampleText": "number"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/d/dc/Image_Button.png",
		"speedTip": "Insert Imagebox template",
		"tagOpen": "\{\{Imagebox\r| description = ",
		"tagClose": "\r| film        = \r| series      = \r| season      = \r| episode     = \r| source      = \r| origin      = \r| cats        = \r| license     = \r\}\}",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/1/1d/Copyrights_needed_Button.png",
		"speedTip": "Uncredited image tag",
		"tagOpen": "\{\{subst:Unknown/ukn|",
		"tagClose": "}}",
		"sampleText": "both"};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Support_Button.png",
		"speedTip": "Support",
		"tagOpen": "{{Support}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/9/9f/Oppose_Button.png",
		"speedTip": "Oppose",
		"tagOpen": "{{Oppose}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/7/7e/Neutral_Button.png",
		"speedTip": "Neutral",
		"tagOpen": "{{Neutral}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/a/a5/Keep_Button.png",
		"speedTip": "Vote to keep",
		"tagOpen": "{{Vote keep}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/3/3c/Delete_Button.png",
		"speedTip": "Vote to delete",
		"tagOpen": "{{Vote delete}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/4/4d/Merge_Button.png",
		"speedTip": "Vote to merge",
		"tagOpen": "{{Vote merge}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/b/b3/Done_Button.png",
		"speedTip": "Done",
		"tagOpen": "{{Done}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/avatar/images/f/fd/Not_Done_Button.png",
		"speedTip": "Not done",
		"tagOpen": "{{Not done}} ",
		"tagClose": "",
		"sampleText": ""};
}
 
//* Forum Reply Reverse Chronological Order And Highlight Certain Threads *//
var reverseForumPageNames = ['Thread:1282421'];
if (reverseForumPageNames.indexOf(wgPageName) !== -1) {
	$('.replies > li').not('.replies .new-reply').not('.replies li:last-child').each(function() {
		$(this).prependTo(this.parentNode);
	});
 
	var forumNameArray = ['Mike.DiMartino','Bryan.Konietzko'];
	$('.replies .message').each(function() {
		var that = this;
		$.each(forumNameArray, function(key,value) {
			var url = 'a[href="http://avatar.wikia.com/wiki/Message_Wall:' + value + '"]';
			if ($(that).children().find(url).length) {
				$(that).css('background','#A6D785');
			}
		});
	});
}