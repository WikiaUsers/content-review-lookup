/**
 This code snippet is provided AS IS. This code snippet has no affiliation with Pixiv or its company.
 This code snippet is licensed as Public Domain CC0. Feel free to steal, remix, add, edit, alter, contribute as you wish. Cheers.

**/
(function() {
    if (window.PrixvLinkerLoaded) {
        return;
    }
    window.PrixvLinkerLoaded = true;
    var $el = $('#charjpname'),
        name = $el.text();
    function makeLink(tag, title, text) {
        return $('<a>', {
            text: text,
            href: 'https://www.pixiv.net/tags.php?tag=' + encodeURIComponent(tag),
            target: '_blank',
            title: title,
            css: {
                display: 'inline-block',
                padding: '0 4px',
                color: 'white',
                background: '#007ab3',
                'border-radius': '3px'
            }
        });
    }
    $el.append(
        makeLink(name, 'Full name', 'p'),
        makeLink(name.split(' ')[0], 'First Name Tagged', 'p2')
    );
})();