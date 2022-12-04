/* Toggle spolier button text */
$(function () {
    var button = $('.mw-customtoggle-ShowSpoiler');
    if (button.length !== 1) {
        return;
    }

    function toggleText () {
        if ($(this).hasClass('shown')) {
            $(this).removeClass('shown');
            $(this).text('Show spoilers');
        } else {
            $(this).addClass('shown');
            $(this).text('Hide spoilers');
        }
    }

    button.text('Show spoilers');

	button.click(toggleText);
});

// Template:Stext JS
$('.spoiler_on').click(function () {
    if ($(this).hasClass('spoiler_on')) {
        $(this).switchClass('spoiler_on', 'spoiler_off');
    } else {
        $(this).switchClass('spoiler_off', 'spoiler_on');
    }
});

/* User Tags */
window.UserTagsJS = {
    tags: {
        imagecontrol: { u: 'imagecontrol' }
    },
    modules: {
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'imagecontrol',
            'rollback',
            'bot'
        ]
    }
};

/* Adds icons to page header
 * by: The 888th Avatar, adapted to new header by Thailog
 */
$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.WikiaPageHeader').append($('#icons'));
		$('#icons').css({'position' : 'absolute', 'right' : '0', 'bottom' : '-1.5em'});
	}
});