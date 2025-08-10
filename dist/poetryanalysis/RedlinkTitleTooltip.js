// Wiki links have their target page stored in the title attribute, which on many browsers is displayed 
// as a tooltip when hovering over the link. The following snippet (by HumansCanWinElves) adds such 
// titles to redlinks too.

mw.loader.using('mediawiki.Uri').then(function() {
    $('.main-container').on('mouseover', 'a.new:not([title])[href]', function() {
        var regExp = /(?<=\/wiki\/)([^?]+)(?=(\?.+)?)/,
            match = regExp.exec($(this).attr('href')),
            title;
        if (match) {
            title = mw.Uri.decode(match[0]).replace(/_/g, ' ');
            $(this).attr('title', title);
        }
    });
});