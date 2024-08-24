window.railWAM = {
    logPage:"Project:WAM Log",
    showLogAlert: false,
};

/***** Actualizar los cambios recientes de la wikiactividad *****/
AjaxRCRefreshText = 'Act. automát.';
AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
;

/*====================*/
/*** Tag personalizado ***/
/*====================*/
 
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







// 1. displayTimer
importScript('MediaWiki:Common.js/displayTimer.js');




//*módulo de imágenes*//

//var NewFilesModuleCompact = 1; //optional compact mode
 if ($('#WikiaRail').length) { //only on pages where the rail is present
   $('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
     if ($('.ChatModule').length && !$("#NewFilesModule").length) { // Only add it ''once''
       if (typeof $temp == "undefined") { // Only load it ''once''
         $temp = $('<div>'); // this line, and the next, originate from http://dev.wikia.com/wiki/AjaxRC/code.js <3
         $temp.load("/Special:NewFiles/13" + " #gallery-", function () {
           $('.ChatModule').after("<section id='NewFilesModule' class='module'><h1><a href='/Special:NewFiles'>New Files</a><a class='wikia-button' href='/Special:Upload'>Upload</a></h1>");
           if (typeof NewFilesModuleCompact != "undefined" && NewFilesModuleCompact) {
             $('#gallery-', $temp).html($('#gallery-', $temp).html().replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/106?"));
             $("#NewFilesModule").addClass("compact");
           }
           $("#NewFilesModule").append($('#gallery-', $temp));
           $("#NewFilesModule .wikia-photogallery-add").remove();
           delete $temp; //delete it, in case the rail is wiped after this point.
         });
       }
     }
   });  //end of DOMNodeInserted block
   $('head').append('<style type="text/css">\n#gallery- { height:452px; overflow-y:auto; clear: both; text-align:center; padding-bottom: 5em;}\n#NewFilesModule .gallery-image-wrapper { top: 0 !important; height: auto !important; border:none; }\n#NewFilesModule.compact .gallery-image-wrapper { width: auto !important; }\n#NewFilesModule .thumb { height:auto !important; }\n#NewFilesModule .wikia-gallery-item { margin: 1px !important; padding: 0 !important; height: auto !important; border: none !important; }\n#NewFilesModule.compact .wikia-gallery-item { width: auto !important; }\n#NewFilesModule .wikia-gallery-item .lightbox-caption { display: none; }\n#NewFilesModule .wikia-gallery-item:hover .lightbox-caption { display: block; }\n#NewFilesModule.compact .wikia-gallery-item:hover .lightbox-caption { display: none; }\n#NewFilesModule h1 {margin: 0 2em 0 0;}\n#NewFilesModule h1 a:first-child {color:inherit;}\n#NewFilesModule img { display: block; }\n.wikia-gallery-item .gallery-image-wrapper a { width: auto !important; height: auto !important; }\n.wikia-gallery-item .gallery-image-wrapper a.image-no-lightbox { line-height: normal; display: block; padding: 1em; }\n</style>');
 }