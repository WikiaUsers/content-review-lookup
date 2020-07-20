/* Any JavaScript here will be loaded for all users on every page load. */
//CopyText's JS - thank you JustLeafy
$('body').on('click', '.copy-button', function(e){
    var $input = $('<input>', { type: 'text' })
        .val($('.copy-text').text())
        .appendTo('body')
        .select();
    document.execCommand('Copy');
    $input.remove();
});
//RailWAM
window.railWAM = {
    logPage:"Project:WAM Log",
    autoLogForUsers:"Americhino",
};

window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

window.UserTagsJS = {
	modules: {},
	tags: {
		council: { u:'Councilor', link:'Help:Community Council' },
		vanguard: { u:'Vanguard', link:'Help:Vanguard' },
		vstf: { u:'VSTF', link:'Help:VSTF' },
		sysop: { u: 'Full Admin' },
		founder: { u: 'Senior Admin'},
		bureaucrat: { u: 'Senior Admin'}
	}
};
UserTagsJS.modules.implode = {
	'senior-admin': ['sysop', 'bureaucrat'],
	'junior-admin': ['threadmoderator', 'contentmoderator'],
	'sentinel': ['chatmoderator', 'patroller', 'rollback'],
	'moderator': ['chatmoderator', 'threadmoderator', 'contentmoderator']
};