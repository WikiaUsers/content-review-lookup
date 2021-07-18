// <nowiki>
(function () {
    var content = window.clearSandboxContent || '{{sandbox}}';
    var summary = window.clearSandboxSummary || 'Cleanup';

    if ( wgPageName.indexOf("/sandbox") >= 0 || wgPageName.indexOf("/Sandbox") >= 0 ) {
        $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list')
            .append('<li><a id="clear-sandbox">Clear sandbox</a></li>');
    }

    $('#clear-sandbox').click(function(){
        $.post(mw.util.wikiScript( 'api' ), {
            format: 'json',
            action: 'edit',
            title: wgPageName,
            text: content,
            minor: false,
            bot: true,
            summary: summary,
            token: mw.user.tokens.get("csrfToken")
        }, function( data ) {
            if (!data.error) {
                console.log('Sandbox cleaned successfully.');
                location.reload(true);
            } else {
                alert('Cannot into cleanings!\n' + data.error.info);
                console.log('Failed:' + data.error.info);
            }
        });
    });
}());