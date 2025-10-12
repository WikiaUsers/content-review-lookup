/* Any JavaScript here will be loaded for all users on every page load. */

// accurate item names for links
  // [[Pumpkin_placeholder]]
  // please ai pleaseeee
$(function() {
    // 1. Select the specific <a> element using the CSS selector:
    //    Selects <a> elements whose 'href' attribute ends with "Pumpkin placeholder"
    var $link = $('a[href$="Pumpkin placeholder"], a[href$="Pumpkin_placeholder"]');

    // 2. Check if the link was found
    if ($link.length) {
        var newText = "Pumpkin&#x5Fplaceholder"; // The desired encoded text

        // 3. Replace the link's inner text (what the user sees)
        $link.text(newText);

        // 4. Replace the link's 'title' attribute (what appears on hover)
        $link.attr('title', newText);
    }
});

window.MessageBlock = {
	title : 'Blocked',
	message : 'You have received a block because you were $1. If you have any questions, please message the administrators.',
	autocheck : true
};

//lock comments doesnt seem to work in the slightest im commenting it out
/* .LockOldComments-locked [class^="ReplyCreate"] {
    display: none;
}

window.lockOldComments = (window.lockOldComments || {});

window.lockOldComments.limit = 100;
window.lockOldComments.addNoteAbove = true;
*/