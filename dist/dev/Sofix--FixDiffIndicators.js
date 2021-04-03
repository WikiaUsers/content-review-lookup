/* + CSS in MediaWiki:Sofix.css */
$(function () {
    [
        'wikipage.diff',
        'LastEdited.render',
        'quickdiff.ready'
    ]
    .forEach(function (i) {
        mw.hook(i).add(function () {
            $('.mw-diff-movedpara-left').text('↪');
            $('.mw-diff-movedpara-right').text('↩');
        });
    });
});