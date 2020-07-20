//DISPLAYTITLE
importScriptPage('User:Jgjake2/js/DISPLAYTITLE.js', 'deadisland');
 
//PURGEBUTTON
jQuery(function($) {
	"use strict";
	$('.changePageTitle').eq(0).each(function() {
		var $h1 = $('.WikiaPageHeader h1, h1#firstHeading').eq(0);
		$h1.prop('title', $h1.text()).empty().append(this.childNodes);
	}).end()
	.remove();
});
 
//INACTIVETAG
InactiveUsers = { 
    months: 1,
    //gone: ['User1', 'User2'];
};
importScriptPage('InactiveUsers/code.js', 'dev');
 
//SHOWHIDE
importScriptPage('ShowHide/code.js', 'dev');
 
//HIDE PAGES FROM WIKI ACTIVITY
jQuery(function($) {
    "use strict";
    if ((window.wgCanonicalSpecialPageName || (window.mediaWiki && mediaWiki.config.get('wgCanonicalSpecialPageName'))) !== 'WikiActivity') return;
    var pagelist = ["User:Richmond2010/Sandbox 2","User:Richmond2010/Strings/QuestCat","User:Richmond2010/Strings/Consume","User:Richmond2010/Strings/Equip","User:Richmond2010/Strings/Etc","User:Richmond2010/Strings/Familiar","User:Richmond2010/Strings/Map","User:Richmond2010/Strings/Mob","User:Richmond2010/Strings/Npc","User:Richmond2010/Strings/Skill","User:Richmond2010/Strings/QuestCatK","User:Richmond2010/Strings/ConsumeK","User:Richmond2010/Strings/EquipK","User:Richmond2010/Strings/EtcK","User:Richmond2010/Strings/MapK","User:Richmond2010/Strings/MobK","User:Richmond2010/Strings/NpcK","User:Richmond2010/Strings/SkillK","User:Richmond2010/Strings/Eqp2","MapleStory:Main_Page"];
    $("#wikiactivity-main a.title").each(function() {
         var i, l = pagelist.length, $this = $(this), t = $this.text();
         for (i = 0 ; i < l ; ++i) {
             if (t === pagelist[i]) {
                 $this.closest('li').css('display', 'none');
                 break;
             }
         }
    });
});
 
//SIGNATURECHECK
importArticles({
	type: 'script',
	articles: [
		// ...
		'w:c:dev:SignatureCheck/code.js',
		// ...
	]
});
 
//LISTFILES
importArticles({
    type: "script",
    articles: [
        "u:dev:ListFiles/code.js" // ListFiles from Dev Wiki
    ]
});