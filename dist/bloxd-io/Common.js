/* Any JavaScript here will be loaded for all users on every page load. */

// accurate item names for links
  // [[Pumpkin_placeholder]]
    // credits: https://community.fandom.com/wiki/Admin_Forum:How_do_you_create_a_page_with_an_underscore_in_the_title%3F
    // i hope this works :sobe:
$(function() {
    $('a[href*="/Pumpkin_placeholder"]').filter(function () {
        return /\(\)$/.test($(this).html());
    }).html(function (index, oldhtml) {
        return oldhtml.replace(/ +/g, '_'); // Added 'g' for global replacement
    });
});

window.MessageBlock = {
	title : 'Blocked',
	message : 'You have received a block because you were $1. If you have any questions, please message the administrators.',
	autocheck : true
};

//lock comments
.LockOldComments-locked [class^="ReplyCreate"] {
    display: none;
}

window.lockOldComments = (window.lockOldComments || {});

window.lockOldComments.limit = 100;
window.lockOldComments.addNoteAbove = true;