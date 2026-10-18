$(function () {
    var pageName = mw.config.get('wgPageName');

    if (!pageName) return;

    new mw.Api().get({
        action: 'query',
        prop: 'revisions',
        titles: pageName,
        rvprop: 'user|timestamp',
        rvlimit: 1,
        format: 'json'
    }).done(function (data) {
        var page = Object.values(data.query.pages)[0];

        if (!page.revisions || !page.revisions[0]) return;

        var revision = page.revisions[0];
        var date = new Date(revision.timestamp);

        var utcClock =
            String(date.getUTCHours()).padStart(2, '0') + ':' +
            String(date.getUTCMinutes()).padStart(2, '0') + ':' +
            String(date.getUTCSeconds()).padStart(2, '0') +
            ' UTC';

$('.mw-parser-output').first().append(
    '<div class="last-edited-box" style="' +
        'text-align: center;' +
        'user-select: none;' +
        '-webkit-user-select: none;' +
        '-moz-user-select: none;' +
        '-ms-user-select: none;' +
        'pointer-events: none;' +
        'margin: 10px auto;' +
        'width: fit-content;' +
    '">' +
        '<i class="fa-regular fa-clock last-edited-icon"></i> ' +
        'Editado pela última vez por <b>' +
        $('<div>').text(revision.user).html() +
        '</b> às ' +
        utcClock +
    '</div>'
);
    });
});