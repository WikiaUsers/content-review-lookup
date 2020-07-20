mw.loader.load('mediawiki.action.history.diff');
importArticle({
    type: "style",
    article: "MediaWiki:Diff-snippet.css"
});
function displayDiffSnippet(fromRev, toRev, title, section) {
    $.getJSON(wgScriptPath + '/api.php', {
        action: 'compare',
        fromrev: fromRev,
        torev: toRev,
        format: 'json'
    }, function(res) {
        var container = $('<div />', { class: 'diff-snippet' }).append(
			$('<div />', { class: 'diff-snippet-header' }).append(
				'Diff for ',
				$('<strong />', { text: title }),
				' in between revisions ',
				$('<em />', { text: fromRev }),
				' and ',
				$('<em />', { text: toRev })
			),
            $('<table />', { class: 'diff diff-contentalign-left' }).append(
                $('<colgroup />').append(
                    $('<col />', { class: 'diff-marker' }),
                    $('<col />', { class: 'diff-content' }),
                    $('<col />', { class: 'diff-marker' }),
                    $('<col />', { class: 'diff-content' })
                ),
                res.compare['*']
            )
        );
        diffSections(container);
        container.find('.diff-section:not(:nth-child(' + section + '))').hide().nextAll().hide();
        container.appendTo(mw.util.$content);
    });
}

function commentAreaPerChange() {
    $('.diff-marker').click(function() {
        var tr = $(this).closest('tr');
        if (tr.next('tr').hasClass('diff-line-comment')) {
            tr.next('tr').toggle();
        }
        else {
            tr.after(
                $('<tr />', { class: 'diff-line-comment' }).append(
                    $('<td />', { colspan: 4 }).append(
                        $('<textarea />', { class: 'diff-snippet-comment' })
                    )
                )
            );
        }
    });
}

function diffSections(el) {
    el.find('table.diff td.diff-lineno').each(function() {
        $(this).replaceWith( $('<th>', { text: $(this).text(), colspan: 2, class: 'diff-lineno' }));
        $(this).closest('tr').addClass('diff-section');
    });
}
//e. g. displayDiffSnippet(84275, 84798, 'Harry Potter', 2);