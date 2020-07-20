/* Any JavaScript here will be loaded for all users on every page load. */

/* Custom usertags */

window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;

UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat'],
		jshelper: { u: 'JavaScript', order: 100 },
		csshelper: { u: 'CSS', order: 101 },
		templatehelper: { u: 'Templates', order: 102 },
		rollback: { order: 150 }
		
};
UserTagsJS.modules.custom = {
	'Ampager': ['csshelper', 'templatehelper', 'jshelper', 'rollback'] // NOTE: order of list here does NOT matter
};

/* Inactive user */

UserTagsJS.modules.inactive = 120; // 120 days

/* New user */

UserTagsJS.modules.newuser = {
	days: 5, // Must have been on the wiki for 5 days
	edits: 10, // And have at least 10 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

/*
===============================
Begin: Highlight pages by category
===============================
*/
//Highlight pages by category, by User:Bobogoobo
$(function() {
    var pageList = {
        '*':{} //put individual pages here like this: {'page name':1, 'other page':1}
    };
    var categories = ['Category:Disambiguations'];
      //Categories there, e.g. ['Category:Stuff', 'Category:Other stuff'];
 
    function addHighlights(category) {
        $('#mw-content-text a').each(function() {
            if (pageList[category][$(this).attr('title')]) {
                $(this).css('color', 'green'); //change color here
            }
        });
    }
 
    function getPages(category, qcontinue, callback) {
        if (pageList[category] === undefined) {
            pageList[category] = {};
        }
        $.getJSON('/api.php?action=query&list=categorymembers&cmtitle=' + 
          category + qcontinue + '&cmlimit=max&format=json', function(data) {
            for (var i = 0; i < data.query.categorymembers.length; i++) {
                pageList[category][data.query.categorymembers[i].title] = 1;
            }
 
            qcontinue = data['query-continue'];
            if (qcontinue) {
                getPages(category, '&cmcontinue=' + 
                  qcontinue.categorymembers.cmcontinue, callback);
            } else {
                callback(category);
            }
        });
    }
 
    for (var i = 0; i < categories.length; i++) {
        getPages(categories[i], '', addHighlights);
    }
    addHighlights('*');
});
/*
===============================
End: Highlight pages by category
===============================
*/