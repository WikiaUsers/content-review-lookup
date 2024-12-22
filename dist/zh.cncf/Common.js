/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');

importArticles({

  type: "script",

  articles: [

      "w:c:dev:Countdown/code.js"

  ]

});

importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		'w:c:dev:DisplayClock/code.js'
		// ...
	]
});

importScriptPage('CollapsibleInfobox/code.js', 'dev'); 
 
importScriptPage('DisplayClock/code.js', 'dev');
 
var PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');

window.UserTagsJS = {
	modules: {},
	tags: {
		montheditor: { u:'Editor of the Month', order:-1/0 },
		featured: 'Featured',
		templates: 'Template Maker',
                profile: 'Nice user page',
                javascript: 'JSS',
                youtube: 'Youtube'
	}
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

UserTagsJS.modules.custom = {
	'JJBisNowHere': ['montheditor', 'rollback'], // Add Editor of the Month
	'AvalancheExia': ['rollback'], // Add rollback
	'Tuudug': ['javascript', 'templates'], // Add featured + templates guru
	'Abel09': ['featured', 'javascript', 'templates'], // Add featured 
        'RonBWL': ['featured'], // Add featured
        'Xenome18': ['profile'], //Add Nice Profile
        'Simrock': ['youtube', 'featured'], //Add YouTube Channel
};

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};

/* Auto-Refresh in Recent Changes */
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb1468579810/common/skins/common/images/ajax.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Tooltips Configuration */
window.tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: true,
    events: ['CustomEvent'],
    noCSS: true,
};

// 简单的 JavaScript 代码来控制按钮和图片的切换
document.querySelectorAll('.NavBtn').forEach(function(button, index) {
  button.addEventListener('click', function() {
    // 首先移除所有按钮的选中样式
    document.querySelectorAll('.NavBtn').forEach(function(btn) {
      btn.classList.remove('nbActiveBottom');
    });
    // 给点击的按钮添加选中样式
    button.classList.add('nbActiveBottom');
    
    // 这里可以通过 index 来控制对应的图片显示
    // 比如，你可以添加代码来切换 SliderWrapper 中的图片
    const slides = document.querySelectorAll('#SliderWrapper .Sld');
    slides.forEach(function(slide) {
      slide.style.display = 'none'; // 隐藏所有图片
    });
    slides[index].style.display = 'block'; // 显示当前对应的图片
  });
});