/**
 * 이 스크립트는 사이트 전체에 적용됩니다. 고칠 때는 주의해주세요.
 * 스크립트를 넣을 때는 충분한 설명, 출처를 넣어주세요! 이후 관리가 어려워집니다.
 * [[미디어위키:ImportJS]]에도 스크립트가 있을 수 있음에 주의하세요.
 * <nowiki>
 */
 
// 요리 방법 재료 드래거블하게 하기
if (document.querySelector('.cook-recipe')) {
	mw.loader.load('/ko/wiki/MediaWiki:Common.js/CookRecipe.js?action=raw&ctype=text/javascript');
}
 
// 메인 페이지에 더 보기 버튼 추가하기
if (mw.config.get('wgIsMainPage')) {
	mw.loader.load('/ko/wiki/MediaWiki:Common.js/MainPage/SeeMore.js?action=raw&ctype=text/javascript');
}

// 툴팁(https://dev.fandom.com/wiki/Tooltips) 커스터마이징
window.tooltips_list = [
	{
		classname: '아이템-툴팁',
		parse:
			'<h1><#item-name#></h1>' +
			'{{#dpl:' +
			'|title=<#item-name#>' +
			'|include={아이템 정보}/툴팁' +
			'|skipthispage=false' +
			'}}'
	},
];

// Unindent[1]와 호환을 위해 CustomizeAce[2]를 이용해 AceEditor가 소프트탭을
// 사용하게 합니다.
// 1: https://dev.fandom.com/wiki/Global_Lua_Modules/Unindent
// 2: https://dev.fandom.com/wiki/CustomizeAce
if (mw.config.get('wgCanonicalNamespace') == 'Module') {
	window.aceCustomSettings = {
		useSoftTabs: true,
	};
}