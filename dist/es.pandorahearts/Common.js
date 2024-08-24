//===== Actualizar los cambios recientes de la wikiactividad =====//
// 4. AutoRefreshing RecentChanges and WikiActivity
 
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');


/*==================*/
/*** Tag personalizado ***/
/*==================*/
 
window.UserTagsJS = {
    modules: {
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'founder',
            'sysop',
            'rollback',
            'bot'
        ]
    }
};
 
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
    };
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
window.UserTagsJS = {
	modules: {},
	tags: {
		Burócrata: { u:'Burócrata' }
	}
};
UserTagsJS.modules.custom = {
	'Arelys': ['Burócrata']
};
UserTagsJS.modules.inactive = {
	days: 30,
	zeroIsInactive: false
};
UserTagsJS.modules.nonuser = false;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = false;
importArticles({
	type:'script',
	articles: [
		'u:dev:UserTags/code.js'
	]
});


// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='font-size:100%'>VISITANTES<br />DESDE 26 MAYO DE 2011 </td><td style='text-align:right'><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=764702&counter=37' alt='Contador' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Contador</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:100%; background:transparent'>VISITANTES<br />DESDE 26 MAYO DE 2011</td></tr><tr><td><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=764702&counter=37' alt='Contador' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});