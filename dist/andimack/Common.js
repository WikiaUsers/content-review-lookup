/* Any JavaScript here will be loaded for all users on every page load. */

/*----------- SIDEBAR FUNCTION -------- */
// loads sidebar section for new episodes, specials etc

$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', 
     function(data) {
        var content = data.parse.text['*'];
        $('section#sidebar').append(content);
    });
});
 
 
/* ----------- SIDEBAR FUNCTION ---------*/
// user and user tag  related functions
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Bureaucrat', link:'Andi Mack Wiki:Administrators' },
        sysop: { u:'Admin', link:'Andi Mack Wiki:Administrators' },
        chatmoderator: { link:'Andi Mack Wiki:Administrators' },
        rollback: { link:'Andi Mack Wiki:Administrators' },
	}
};
 
UserTagsJS.modules.mwGroups = [
    'bureaucrat',
    'sysop',
    'rollback',
    'bannedfromchat'
];

UserTagsJS.modules.mwGroups = ['bureaucrat']; 
UserTagsJS.modules.mwGroups = ['rollback'];