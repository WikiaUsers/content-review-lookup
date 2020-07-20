if (typeof BPSummary !== "undefined") {
    if (typeof BPSummary.editSummary === "undefined") {
        BPSummary.editSummary = "Removing all content from page.";
    }
} else {
    BPSummary = {
        editSummary: 'Removing all content from page.',
    };
}
$('<li>').html('<a href="#">Blank</a>')
    .prependTo('#my-tools-menu')
    .click(function() {
        $.ajax({
            type: 'POST',
            url: mw.util.wikiScript('api'),
            dataType: 'json',
            data: {
                action: 'edit',
                title: wgPageName,
                summary: BPSummary.editSummary,
                text: '',
                format: 'json',
                token: mw.user.tokens.get('editToken')
            }
        }).done(function(data) {
            if (data.edit.result === 'Success') {
                new BannerNotification("Successfully blanked the page!", "confirm").show();
                window.location.reload();
            } else {
                new BannerNotification("An error occurred.", "error").show();
            }
        }).fail(function(data) {
            new BannerNotification("An error occurred.", "error").show();
        });
    });