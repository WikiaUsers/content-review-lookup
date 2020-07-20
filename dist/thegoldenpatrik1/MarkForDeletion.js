/**
 * @Name            MarkForDeletion
 * @Version         v1.2
 * @Author          TheGoldenPatrik1
 * @Protect         <nowiki>
 * @Description     Replaces the contents of the page with {{Delete}}
 */
(function () {
    // Config
    var config = mw.config.get([
        'wgUserGroups',
        'wgPageName'
    ]);
    // Load Protection
    if (
        /sysop|content-moderator|vstf|staff|helper/.test(config.wgUserGroups.join()) ||
        window.MFDLoaded
    ) {
        return;
    }
    window.MFDLoaded = true;
    /**
     * @method init
     * @description Creates the button
     */
    function init () {
        $('.UserProfileActionButton .WikiaMenuElement, .page-header__contribution-buttons .wds-list').append(
            $('<li>', {
                id: 'ca-mfd'
            }).append(
                $('<a>', {
                    href: '#',
                    text: 'MFD',
                    click: click
                })
            )
        );
    }
    /**
     * @method click
     * @description Performs the action
     */
    function click () {
        $.ajax({
            type: 'POST',
            url: mw.util.wikiScript('api'),
            dataType: 'json',
            data: {
                action: 'edit',
                title: config.wgPageName,
                summary: 'Marking for Deletion',
                text: '{{Delete}}',
                format: 'json',
                token: mw.user.tokens.get('editToken')
            }
        }).done(function(data) {
            if (data.edit.result === 'Success') {
                window.location.reload();
            } else {
                error();
            }
        }).fail(function(data) {
            error();
        });
    }
    /**
     * @method error
     * @description Outputs a Banner Notification
     */
    function error () {
        new BannerNotification(
            'An error occurred.', 'error'
        ).show();
    }
    // Load Script
    init();
})();