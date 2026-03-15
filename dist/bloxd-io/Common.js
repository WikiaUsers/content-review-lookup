/* Any JavaScript here will be loaded for all users on every page load. */

// turns out jQuery and JavaScript are two very different things, good job old me, please never speak of that again... and also fix this out of rage
/* (function() {
    var $link = $('a[href$="Pumpkin placeholder"], a[href$="Pumpkin_placeholder"]');
    
    var link = documnet.querySelectorAll('a[href$="Pumpking placeholder", a[href$="')

    if ($link.length) {
        var newText = "Pumpkin&#x5Fplaceholder";

        $link.text(newText);

        $link.attr('title', newText);
    }
}); */


// ts better work (it wont)
var pumpkinPlaceholder = document.querySelectorAll('a[href="/wiki/Pumpkin_placeholder"]');
for (var a of pumpkinPlaceholder) {
	a.textContent = "Pumpkin_placeholder";
}

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