// ==UserScript==
// @name Revert & Notify (History)
// ==/UserScript==

mw.hook('wikipage.content').add(function () {
    if (mw.config.get('wgAction') !== 'history') return;

    // Prevent duplicates
    if ($('#revertNotifyBtn').length) return;

    const $btn = $('<button>')
        .attr('id', 'revertNotifyBtn')
        .text('Revert & Notify')
        .css({
            margin: '10px',
            padding: '6px 10px',
            background: '#2a87d0',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
        });

    // Insert ABOVE the history list (this exists on Fandom)
    $('#pagehistory').before($btn);

    $btn.on('click', function () {
        const username = prompt('Username to notify:');
        if (!username) return;

        const message =
            'Hello, I reverted your edit because I considered it unconstructive.';

        PostToWall(username, message);
    });
});