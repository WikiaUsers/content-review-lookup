//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝【Ajax Emoticons】＝＝＝＝＝＝＝＝＝＝＝＝//
//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
ajaxEmoticonsInterval = 1000;

//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝【Emoticons Window】＝＝＝＝＝＝＝＝＝＝＝＝//
//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
window.EmoticonsWindowConfig = {
    chatOptionsIntegration:true
};

window.EmoticonsWindowVocab = {
    help:"An emoticon will appear in the textbox by clicking it."
};

//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝【Interwiki Links】＝＝＝＝＝＝＝＝＝＝＝＝//
//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
CustomLinks = {
	Youtube: "http://youtube.com",
	custom_prefix_2: "http://example2.com",
	custom_prefix_3: "http://example3.com",
	preventDefault: false
};

//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝【Word Filter】＝＝＝＝＝＝＝＝＝＝＝＝＝//
//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//alertMessage = 'Warning: Explicit language is prohibited.';
//window.badWords.push('Fuck','Shit','Asshole','Bitch');

//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//





//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝【Import Articles】＝＝＝＝＝＝＝＝＝＝＝＝//
//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
importArticles({
	type: "script",
	articles: [
		'u:dev:AjaxEmoticons/code.js',
		'u:dev:ChatAnnouncements/code.js',
		'u:dev:ChatAvatarUserPageLink.js',
		'u:dev:ChatImages/code.js',
		'u:dev:ChatInterwikiLinks/code.js',
		'u:dev:MediaWiki:ChatModHover/code.js',
		'u:dev:MediaWiki:ChatNotifications/code.js',
		'u:dev:ChatRefresh/code.js',
		'u:dev:ChatTags/code.js',
		'u:kocka:MediaWiki:Emoticons/code.js',
		'u:dev:MediaWiki:FixAdminKick/code.js',
		'u:dev:jumbles/startup.js',
		'u:dev:!kick/code.js',
		'u:dev:!mods/code.js',
		'u:dev:tictactoe/code.js',
		'u:dev:WordFilter/code.js'
	]
});

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//