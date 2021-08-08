// Any JavaScript here will be loaded for all users on every page load.

/* Thank you to the Sam & Cat Wiki and Dev Wiki! */

// User Tags
window.UserTagsJS = {
	modules: {
			inactive: 30,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
	tags: {
		bureaucrat: { link:'Alex & Co. Wiki:Staff#Bureaucrats_and_administrators' },
		sysop: { link:'Alex & Co. Wiki:Staff#Bureaucrats_and_administrators' },
		chatmoderator: { link:'Alex & Co. Wiki:Staff#Bureaucrats_and_administrators' },
		rollback: { u:'Rollback', link:'Alex & Co. Wiki:Staff#Bureaucrats_and_administrators' },
		featured: { u:'Featured Wikian' },
		css: { u:'CSS', order: 101 },
		javascript: { u:'JavaScript', order: 102 }
	}

};
UserTagsJS.modules.mwGroups = ['bureaucrat']; 
UserTagsJS.modules.mwGroups = ['rollback'];


$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module rail-module"><h2>' +
      'What is New?' + '</h2>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
        mw.hook('wikipage.content').fire($('#WikiaRail'));
    });
});