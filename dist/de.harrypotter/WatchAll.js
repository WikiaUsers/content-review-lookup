function watchAll(pages) {
    confirmed = confirm('Die folgenden Seiten werden deiner Beobachtungsliste hinzugefügt:\n\n' + pages.reduce(function(a, b) {
        return a + '\u2013\u2002' + (new mw.Title(b)).toText() + '\n';
    }, ''));
    
    if (confirmed) {
        pages.forEach(function(title) { 
            $.post('/api.php', {
                action: 'watch',
                title: title,
                format: 'json',
                token: mw.user.tokens.get('watchToken')
            },'json');
        });
    }
}