/*自定義用戶標籤*/
window.UserTagsJS = {
	modules: {},
	tags: {
        falseblock: {u:'封禁'},
	},
};

UserTagsJS.modules.custom = {
    'Laundry Machine'   : ['falseblock'],
};
 
UserTagsJS.modules.newuser = {
	namespace: 0, // [Optional] 編輯需在條目命名空間內才列入計算
	computation: function(days, edits) {
		// 若該算式為真，則他們會被標記為新用戶
		// 若該算式不為真，則他們不會被標記
		// 舉例來說，當他們擁有30次編輯，或他們已經參與維基10天，newuser標籤就會被移除 （以先發生的為主）
		return days < 10 && edits < 30;
	}
};

UserTagsJS.modules.inactive = 5; // 5 天

UserTagsJS.modules.metafilter = {
	'sysop': ['falseblock'], // Remove Admin from Falseblock
};

window.ajaxSpecialPages = [
    "Recentchanges",
    "WikiActivity",
    "Watchlist",
    "Log",
    "Contributions"
];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';

window.railWAM = {
    logPage:"Project:WAM Log"
};

*/QRThis代碼*/
importScriptPage( 'QRThis/code.js', 'dev' );