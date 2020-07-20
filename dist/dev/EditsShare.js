/**
 * @name   EditsShare
 * @desc   Displays the share of user's local edits in the global editcount in user's masthead
 * @author Kofirs2634
 * @docs   [[w:c:dev:EditsShare]]
 */
$(function() {
    if (!$('#UserProfileMasthead').length || window.EditsShareInTotal) return;
    window.EditsShareInTotal = true;

    var api = new mw.Api(),
        user = $('hgroup h1').text(),
        ref = mw.util.getUrl('Special:Editcount/' + user),
        localEdits, globalEdits, i18n;

    function getEdits() {
        api.get({
            action: 'query',
            list: 'users',
            ususers: user,
            usprop: 'editcount'
        }, function (data) {
            localEdits = data.query.users[0].editcount;
            $.get(ref, function(data) {
                globalEdits = $(data).find('.TablePager tr:nth-child(2) .ecrowright:nth-child(4)').text().replace(/\s+|,/g, '');
                appendCount()
            })
        });
    }

    function appendCount() {
        $('.contributions-details').after($('<div>', { 'class': 'edits-share tally discussion-details' })
            .append($('<a>', { href: ref }).append($('<em>', {
                style: 'font-size: 18px',
                text: (localEdits / globalEdits * 100).toFixed(2) + '%'
            })).append($('<span>', {
                style: 'font-size: 10px',
                text: i18n.msg('share').plain()
            }))))
    }

    importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' })
    mw.hook('dev.i18n').add(function(i18np) {
        i18np.loadMessages('EditsShare').then(function (i18np) {
            i18n = i18np;
            i18n.useUserLang();
            getEdits()
        })
    })
})