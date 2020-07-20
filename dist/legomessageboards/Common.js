/* Fix derpy Common.css */
importStylesheet( 'MediaWiki:Common.css' );

/* Main Page CSS */
if( wgPageName === "LEGO_Message_Boards_Wiki" ) {
    importStylesheet( 'MediaWiki:Mainpage.css' );
}
 
importArticles({
    type: "script",
    articles: [
        'u:dev:UserTags/code.js' //UserTags
    ]
});

/* Template:Username */
$(document).ready(function() {
	if (wgUserName) {
		$(".insertusername").html(wgUserName);
	};
});

/* Custom Userpage CSS */
if( wgPageName === "User:Mishkaiel" ) { importStylesheet('MediaWiki:MishPage.css'); }

if( wgPageName === "User:Avalair" ) { importStylesheet('MediaWiki:AvaPage.css'); }

if( wgPageName === "User:Impossibubbles" ) { importStylesheet('MediaWiki:IzzyPage.css'); }

if( wgPageName === "User:Purplebrick333" ) { importStylesheet('MediaWiki:PurplePage.css'); }

if( wgPageName === "User:LordWeirdo" ) { importStylesheet('MediaWiki:LordWeirdoPage.css'); }

if( wgPageName === "User:Keplers" ) { importStylesheet('MediaWiki:KeplersPage.css'); }

if( wgPageName === "User:QuantumHedgehog" ) { importStylesheet('MediaWiki:QuantumPage.css'); }

if( wgPageName === "User:Ked830" ) { importStylesheet('MediaWiki:KedPage.css'); }

if( wgPageName === "User:Majolo9050" ) { importStylesheet('MediaWiki:MajPage.css'); }

if( wgPageName === "User:EvilMidnightNG" ) { importStylesheet('MediaWiki:NGPage.css'); }

if( wgPageName === "User:Kingwja" ) { importStylesheet('MediaWiki:KingPage.css'); }

if( wgPageName === "User:AmazingPythor" ) { importStylesheet('MediaWiki:PythorPage.css'); }

if( wgPageName === "User:Legoanimals750" ) { importStylesheet('MediaWiki:AnimalPage.css'); }

if( wgPageName === "User:Alemas2005" ) { importStylesheet('MediaWiki:AlemasPage.css'); }