/* Forum thread state alerts
 *
 * Adds an icon next to threads on the Board: namespace that tells the user if a thread is closed.
 * Credits go to Slyst and Cqm
 * modified by Dorumin and Sophiedp
 */
function getThreadState(node) {
    if (node.is('.state-checked')) return;
    node.addClass('state-checked');
    // For archived threads
    var threadTime = node.find('.timestamp.timeago').text();
    var isArchived = false;
    var isClosed = false;
    if ( /\d\d days ago/.test(threadTime) ) {
        var time = threadTime.split(' days ago')[0];
        if ( Number(time) > (window.BoardThreadAlerts || 14) ) isArchived = true;
    } else if ( /month|year/.test(threadTime) ) {
        isArchived = true;
    }
    // For overpopulated threads
    var threadReplyCount = node.find('.activity .threads').text().split(' ')[0];
    var isOverpopulated = false;
    if ( Number(threadReplyCount) > 500 ) {
        isOverpopulated = true;
    }
    $.get('/wiki/Thread:' + node.data('id'), function (d) {
        if ($(d).find('.message-main .deleteorremove-infobox').exists()) {
            isClosed = true;
        }
        if (isOverpopulated) {
            node
                .addClass('overpopulated')
                .find('h4 > a').append('<span class="overpopulated-alert" style="right: 100px; position: absolute; cursor: help;"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Padlock-lightolive.svg" height="20px" width="20px" alt="(O)" title="This thread exceeded the maximum number of replies."></img></span>');
        } else if (isArchived) {
            node
                .addClass('archived')
                .find('h4 > a').append('<span class="archived-alert" style="right: 100px; position: absolute; cursor: help;"><img src="https://upload.wikimedia.org/wikipedia/en/a/a0/Padlock-skyblue.svg" height="20px" width="20px" alt="(A)" title="This thread is archived."></img></span>');
        } else if (isClosed) {
            node
                .addClass('closed')
                .find('h4 > a').append('<span class="closed-alert" style="right: 100px; position: absolute; cursor: help;"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Padlock-orange.svg" height="20px" width="20px" alt="(C)" title="This thread is closed."></img></span>');
        }
    });
}

$(function() {
    if (mw.config.get('wgNamespaceNumber') !== 2000) return;
    // For the threads that are present on window.onload
    $('.ThreadList .thread').each(function() {
        getThreadState($(this));
    });
    // For threads that aren't on the first page of the board
    $('.ThreadList').on('DOMNodeInserted', function(e) {
        if (e.target.className == 'thread') {
            getThreadState($(e.target));
        }
    });
});