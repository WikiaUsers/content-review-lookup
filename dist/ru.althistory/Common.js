$(document).ready(function() {
    mw.loader.using( ['jquery.ui.tabs'], function() {
      var $tabs = $("#portal_slider").tabs({ fx: [{opacity:'toggle', duration:0},{height:'toggle', duration:0}, ] } );
      $("[class^=portal_sliderlink]").click(function() { // bind click event to link
        var currentCl = $(this).prop('class');
        var workaround = $(this).children("a").prop('href');
        $(this).children("a").children("img").addClass("selectedImg");
        $(".selectedImg").removeClass("selectedImg");
          if ( currentCl != "portal_sliderlink_28" ) {
            $tabs.tabs('select', currentCl.replace("portal_sliderlink_", ""));
          }
          else {
            window.location.replace(workaround);
          }
        return false;
      });
    });
});


$(function(){
$('<section class="rail-module"></section>')
.appendTo('#WikiaRail')
.load('https://althistory.fandom.com/ru/wiki/Шаблон:RailModule .mw-parser-output');
});
 

window.UserTagsJS = {
	modules: {},
	tags: {
	    zhurnal: { u:'Журналист'},
		hacker: { u:'Технический администратор'},
		otpusk: { u:'В вики отпуске'},
		oldie: { u:'Ветеран'},
		founder: { u:'МагнуМ'},
		rollbask: { u:'Откатчик'},
	}
};

// Add custom groups to several users
UserTagsJS.modules.custom = {
	'СергейК': ['oldie'],
	'Лобачевский': ['oldie'],
	'ShiftNeru': ['oldie'],
	'Drako Jankovic': ['oldie'],
	'Ottocar': ['oldie'],
	'Stalin 2': ['rollbask','oldie'],
	'GamesDiscussion': ['oldie'],
	'Белозерг': ['oldie'],
	'Magnum': ['founder'],
	
};
UserTagsJS.modules.inactive = 30;
};


UserTagsJS.modules.implode = {
	otpusk: ['inactive'] // Remove inactive replace with в вики-отпуске
};

UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
};


/*
UserTagsJS.modules.userfilter = {
	'John Smith': ['inactive'] // John Smith is never inactive, even when he is
};

UserTagsJS.modules.implode = {
	'mini-sysop': ['patroller', 'rollback', 'chatmoderator'], // Remove patroller, rollback and chatmoderator, if ALL 3 exist, and replace with 'mini-sysop'
};
UserTagsJS.modules.explode = {
	'vandal-patrol': ['patroller', 'rollback'] // Add 'vandal-patrol' to everyone who has BOTH patroller and rollback
};
*/

// WikiActivity
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WikiActivity.js',
    ]
});
window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : false,
    customRendering : { },
    headerLink : false,
    refresh : false,
    refreshDelay : 5 * 60 * 1000,
    timeout : 10 * 1000
};

 
$(function(){
        $.get('/index.php?title=Template:RailModule&action=render', function(html) {
            if (!html.trim()) return;
            $('<p align="right"><a href="/wiki/%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:WikiActivity" class="wds-is-secondary wds-button wds-is-squished start-a-chat-button">				Подробнее			</a></p><')
            .appendTo('.activity-items');
        });
});