/* Any JavaScript here will be loaded for users using the Hydra skin */

RLQ.push(function () {
    if (mw.config.get('wgNamespaceNumber') == 100) {
        addRateButton();
    }
    if (mw.config.get('wgCanonicalSpecialPageName') === 'PvXDecode') {
        addMiniskillbarToPvxdecode();
    }
});

function addRateButton() {
    var caHistory = document.getElementById('ca-history');
    if (caHistory != undefined) {
        ratelink = document.createElement('li');
        ratelink.id = 'special-rate';
        ratelink.innerHTML = '<span><a href="/index.php?title=' + mw.config.get('wgRelevantPageName') + '&action=rate" title="Rate the build">Rate</a></span>'
        caHistory.parentNode.insertBefore(ratelink, caHistory);
    }
}

function addMiniskillbarToPvxdecode () {
    // Only runs if page title = Special:PvXDecode

    // Locate the original textarea node
    var target = $('#mw-content-text textarea');
    target.attr('id','pvxbig');

    // Create another with similar attributes
    var newtextnode = $('<textarea cols="80" rows="10" id="pvxsmall" wrap="virtual"></textarea>');
    target.after(newtextnode);

    // Get original content
    var wikitext = target.val();

    // Apply the find and replace patterns 
    var patterns = [
        ['\r\n', '\n'],
        ['\\[build(.*?)\\]', ']'],
        ['\\[\\/build\\]', '['],
        ['\\]\\[', '|'],
        ['\\<pvxbig\\>', '{{mini skill bar'],
        ['\\<\\/pvxbig\\>', '}}'],
        ['\n', ''],
        ['\\|\\}\\}', '}}']
    ];
    $.map(patterns, function(p,i) {
        var originalText = p[0];
        var newText = p[1];
        var originalTextRegex = new RegExp(originalText, 'mg');
        wikitext = wikitext.replace(originalTextRegex, newText);
    });

    // Write back to the page
    $('#pvxsmall').val(wikitext);
}