/* Any JavaScript here will be loaded for all users on every page load. */

// turns out jQuery and JavaScript are two very different things, good job old me, please never speak of that again... and also fix this out of rage


// ts better work (it wont)

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

//Let me try it for a moment.

function replaceTitles() {
    const replacements = {
        "Temp": "temp",
        "Pumpkin placeholder": "Pumpkin_placeholder",
        "Pumpkin Placeholder": "Pumpkin_placeholder"
    };

    document.querySelectorAll("*").forEach(el => {
        if (
            el.children.length === 0 &&
            el.textContent
        ) {
            let text = el.textContent.trim();

            if (replacements[text]) {
                el.textContent = replacements[text];
            }
        }
    });

    document.title = document.title
        .replace(/Pumpkin placeholder/g, "Pumpkin_placeholder")
        .replace(/Pumpkin Placeholder/g, "Pumpkin_placeholder")
        .replace(/\bTemp\b/g, "temp");
}

replaceTitles();

new MutationObserver(replaceTitles).observe(document.body, {
    childList: true,
    subtree: true
});

//I'd like to change "Expand/Collapse" to "Press to show/Press to hide" instead.

$(function () {

    function updateCollapseText() {
        $('.mw-collapsible').each(function () {

            var toggleLink = $(this).find('.mw-collapsible-toggle a');

            if ($(this).hasClass('mw-collapsed')) {
                toggleLink.text('Press to show');
            } else {
                toggleLink.text('Press to hide');
            }

        });
    }

    updateCollapseText();

    $(document).on('click', '.mw-collapsible-toggle a', function () {

        var box = $(this).closest('.mw-collapsible');

        setTimeout(function () {

            if (box.hasClass('mw-collapsed')) {
                box.find('.mw-collapsible-toggle a').text('Press to show');
            } else {
                box.find('.mw-collapsible-toggle a').text('Press to hide');
            }

        }, 10);

    });

});