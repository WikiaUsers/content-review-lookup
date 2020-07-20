/* 
This code is loaded on all skins.
*/

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop new people bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|Uberfuzzy]]
 * Oasis support by [[User:Uberfuzzy|Uberfuzzy]]
 */

if (wgNamespaceNumber == 110 || wgNamespaceNumber === 114) {

    function disableOldForumEdit() {
        if (typeof (enableOldForumEdit) != 'undefined' && enableOldForumEdit) {
            return;
        }
        if (!document.getElementById('old-forum-warning')) {
            return;
        }

        if (skin == 'oasis') {
            $('#WikiaPageHeader .wikia-menu-button > a').html('Archived').removeAttr('href');
            return;
        }
        if (!document.getElementById('ca-edit')) {
            return;
        }
        var editLink = null;
        if (skin == 'monobook') {
            editLink = document.getElementById('ca-edit').firstChild;
        } else {
            return;
        }

        editLink.removeAttribute('href', 0);
        editLink.removeAttribute('title', 0);
        editLink.style.color = 'gray';
        editLink.innerHTML = 'Archived';

        $('span.editsection-upper').remove();

    }
    addOnloadHook(disableOldForumEdit);
}

/* Opens chat in a new window for homepage */

$(".openchat a").click(function () {
    window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
    return false;
});


/* Guided Tours */
if (mw.config.get('wgCanonicalNamespace') == 'User_blog') {
	setTimeout(function() {
		$('.guidedtours-header').each(function() {
			var headerWidth = $(this).find('.text').width();
			var leftMargin = parseInt(headerWidth) + 15 + 'px';
			$(this).next().css('margin-left',leftMargin);
		});
	},250);
}

/* Wikia University */
$('.wu-content .box .next').on('click', function() {
	var currentBox = $(this).parent();
	var nextBox = currentBox.next();
	if (nextBox.length !== 0) {
		$('html, body').animate({
			scrollTop: $(nextBox).offset().top
		}, 500);
	}
});

/* Allows the entire box on Help:Contents to be clickable */

if (wgPageName == 'Help:Contents') {
    $('.centralhelpbox').click(function() {
        window.location.href = '/wiki/Help:' + $(this).attr('data-link');
    });
}

/* TZClock */
importArticles({
	type: 'style',
	articles: [
		'u:dev:MediaWiki:TZclock.css'
	]
}, {
	type: 'script',
	articles: [
		'u:dev:TZclock.js'
	]
});