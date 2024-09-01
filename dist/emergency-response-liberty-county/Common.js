/* Any JavaScript here will be loaded for all users on every page load. */
/*Fully close Mbox notice upon clicking instead of collapsing */
$(document).ready(function() {
    $(document).on('click', '.mbox__close', function() {
        $(this).closest('.mbox').hide();
    });
});


/* credit to Among Us wiki for the config */
window.MessageBlock = {
	title : '[BLOCKED] You have been blocked for $1',
	message : 'You have received a $2 block for the reason: \'$1\'. Unless otherwise stated and your block is not less than two weeks, you may appeal your block on my message wall at Community Central. This is a automatic message sent to blocked users.',
	autocheck : true
};

TBL_GROUP = "roblox-en";

console.log("MediaWiki:Common.js has finished loading.");