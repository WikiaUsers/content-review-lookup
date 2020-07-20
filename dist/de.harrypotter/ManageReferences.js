function editRef(ref) {
    refID = /cite_note-(?:\D+)?(\d+)/.exec(ref)[1];
    $.showCustomModal('Edit Reference', '<textarea id="edit-reference-content" style="width:100%; height:100px;"></textarea>', {
        id: 'edit-reference-form',
        callback: function() {
            $.getJSON('/api.php?action=query&prop=revisions&pageids=' + wgArticleId + '&indexpageids&rvprop=content|timestamp&format=json', function(data) {
                starttimestamp = (new Date()).toISOString();
                rev = data.query.pages[data.query.pageids[0]].revisions[0];
                pageContent = rev['*'];
                pattern = /(<ref(?: name="(.*)")?>)(.*)<\/ref>/g;
                refs = pageContent.match(pattern);
                match = pattern.exec(refs[refID]);
                if (match.length >= 4 && typeof match[3] != 'undefined' && match[3].length) {
                    refOrigContent = match[3];
                    $('#edit-reference-content').val(refOrigContent);
                }
            });
        },
        buttons: [{
            message: 'Cancel',
            handler: function() {
                $('#edit-reference-form').closeModal();
            },
            defaultButton: !1,
            id: 'edit-bio-cancel'
        }, {
            message: 'Save',
            handler: function() {
                refNewContent = $(
                    '#edit-reference-form #edit-reference-content').val();
                saveRef(pageContent.replace(match[0], match[2] + refNewContent + '</ref>'));
            },
            defaultButton: !0,
            id: 'edit-bio-save'
        }]
    });
}

function saveRef(content) {
    $.post('/api.php?action=edit', {
        title: wgPageName,
        summary: 'edit ref ' + refID + '; Replace "' + refOrigContent + '" with "' + refNewContent + '"',
        text: content,
        basetimestamp: rev.timestamp,
        starttimestamp: starttimestamp,
        tags: 'apiedit',
        token: mw.user.tokens.get('editToken'),
        format: 'json'
    }, function(res) {
        if (res.edit.result == 'Success' && !res.edit.hasOwnProperty('nochange')) {
            $('#edit-reference-form .modalToolbar').prepend($('<a />', {
                class: 'wikia-button secondary',
                id: 'edit-reference-rev',
                href: wgServer + wgArticlePath.replace('$1', res.edit.title) + '?diff=' + res.edit.newrevid + '&oldid=' + res.edit.oldrevid,
                target: '_blank'
            }).text('Check changes'));
            $.get('/api.php?action=parse&text=' + refNewContent + '&contentmodel=wikitext&format=json', function(res) {
                refParsedContent = $.parseHTML(res.parse.text['*']).find('p').html();
                $('#edit-reference-form #edit-bio-cancel').replaceWith($('<a />', {
                    class: 'wikia-button secondary',
                    id: 'edit-reference-ok'
                }).text('OK').click(function() {
                    $('#edit-reference-form').closeModal();
                    $('ol.references li#cite_note-' + refID + ' .reference-text').html(refParsedContent);
                }));
            });
        }
    }, 'json');
}

function deleteRef(ref) {
    refID = /cite_note-(\d+)/.exec(ref)[1];
    $.getJSON('/api.php?action=query&prop=revisions&pageids=' + wgArticleId + '&indexpageids&rvprop=content|timestamp&format=json', function(data) {
        starttimestamp = (new Date()).toISOString();
        rev = data.query.pages[data.query.pageids[0]].revisions[0];
        pageContent = rev['*'];
        pattern = /((<ref(?: name="(.*)")?>)(.*)<\/ref>|<ref(?: name="(.*)")?(?: )?\/>)/g;
        refs = pageContent.match(pattern);
        match = pattern.exec(refs[refID]);
        if (match.length >= 5 && typeof match[4] != 'undefined' && match[4].length) {
            refOrigContent = match[4];
            saveRef(pageContent.replace(match[0], ''));
        }
    });
}
if (!window.hasOwnProperty('dev') || !window.dev.hasOwnProperty(
        'manageReferencesInitialized') || !window.dev.manageReferencesInitialized) {
    if (!window.hasOwnProperty('dev')) {
        window.dev = {};
    }
    window.dev.manageReferencesInitialized = !0;
    $('ol.references > li').each(function() {
        $(this).append($('<span />', {
            class: 'reference-buttons'
        }).append($('<span />').html('<svg id="wds-icons-pencil" viewBox="0 0 24 24" width="15px" height="15px"><path d="M1.293 16.293A1 1 0 0 0 1 17v5a1 1 0 0 0 1 1h5c.265 0 .52-.105.707-.293L19 11.414 12.586 5 1.293 16.293zm21.414-10l-5-5a.999.999 0 0 0-1.414 0L14 3.586 20.414 10l2.293-2.293a.999.999 0 0 0 0-1.414z" fill-rule="evenodd"></path></svg>').click(editRef.bind(this, $(this).attr('id'))), $('<span />').html(
            '<svg id="wds-icons-trash" viewBox="0 0 24 24" width="15px" height="15px"> <g fill-rule="evenodd"><path d="M18.417 21.167H5.583V6.5h12.834v14.667zM9.25 2.833h5.5v1.834h-5.5V2.833zm12.833 1.834h-5.5v-2.75A.916.916 0 0 0 15.667 1H8.333a.917.917 0 0 0-.916.917v2.75h-5.5a.917.917 0 0 0 0 1.833H3.75v15.583c0 .507.41.917.917.917h14.666c.507 0 .917-.41.917-.917V6.5h1.833a.916.916 0 1 0 0-1.833z"></path><path d="M12 9.25a.917.917 0 0 0-.917.917V17.5a.916.916 0 1 0 1.834 0v-7.333A.917.917 0 0 0 12 9.25m-3.667 0a.917.917 0 0 0-.916.917V17.5a.916.916 0 1 0 1.833 0v-7.333a.917.917 0 0 0-.917-.917m6.417.917V17.5a.916.916 0 1 0 1.833 0v-7.333a.916.916 0 1 0-1.833 0"></path></g></svg>').click(deleteRef.bind(this, $(this).attr('id')))));
    });
};