/* Any JavaScript here will be loaded for all users on every page load. */


function fBox() {
	$('#fbox').append('<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FHow-I-Met-Your-Mother-Wiki%2F135634716493499&amp;width=292&amp;colorscheme=light&amp;connections=0&amp;stream=false&amp;header=true&amp;height=62" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:292px; height:62px;" allowTransparency="true"></iframe>');
}

$(fBox);

/* UserTag setup */
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { order: 0 },
		sysop: { order: 1 },
		council: { order: 2 }
	}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'patroller', 'rollback', 'sysop', 'bot', 'bot-global', 'council'];