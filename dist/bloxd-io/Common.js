/* Any JavaScript here will be loaded for all users on every page load. */

// turns out jQuery and JavaScript are two very different things, good job old me, please never speak of that again... and also fix this out of rage
// hey maybe i finally actually fixed it (watch it not work :heart:)
document.querySelectorAll('a[title="Pumpkin placeholder"]').forEach((link) => {
	link.textContent = "Pumpkin_placeholder"
});

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
//-- hey when did you get here???? either way seems we both failed :broken_heart:

function replaceTitles() {
    const replacements = {
        "Temp": "temp",
        "Staging.bloxd.io": "staging.bloxd.io",
        "Pumpkin placeholder": "Pumpkin_placeholder",
        "Pumpkin Placeholder": "Pumpkin_placeholder",
        "Cherry Door Top": "_Cherry Door Top"
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
        .replace(/Cherry Door Top/g, "_Cherry Door Top")
        .replace(/\bTemp\b/g, "temp")
        .replace(/\bStaging.bloxd.io\b/g, "staging.bloxd.io");
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

$(function () {
    $('.show-hide').each(function () {
        var $box = $(this);

        $box.addClass('mw-collapsible mw-collapsed');

        $box.prepend(
            '<span class="mw-collapsible-toggle">[<a href="#">Show</a>]</span> '
        );

        $box.makeCollapsible();

        function updateText() {
            var text = $box.hasClass('mw-collapsed') ? 'Show' : 'Hide';
            $box.find('.mw-collapsible-toggle a').text(text);
        }

        updateText();

        $box.on('afterExpand.mw-collapsible', updateText);
        $box.on('afterCollapse.mw-collapsible', updateText);
    });
});