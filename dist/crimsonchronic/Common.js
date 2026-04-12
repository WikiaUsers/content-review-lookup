// ========================================
// MASS ROLLBACK BUTTON (SELF-CONTAINED)
// ========================================

mw.loader.using(['mediawiki.util', 'mediawiki.api']).done(function () {

    // Only run on Contributions page
    if (!mw.config.get('wgCanonicalSpecialPageName') ||
        mw.config.get('wgCanonicalSpecialPageName') !== 'Contributions') {
        return;
    }

    function createButton() {
        const portlet = document.getElementById('p-cactions') || document.getElementById('p-tb');
        if (!portlet) return;

        const btn = mw.util.addPortletLink(
            portlet.id,
            '#',
            'removed',
            'ca-massrollback',
            'Rollback all visible edits'
        );

        btn.addEventListener('click', function (e) {
            e.preventDefault();
            runMassRollback();
        });
    }

    function runMassRollback() {
        const rollbackLinks = document.querySelectorAll("a[href*='action=rollback']");
        
        if (rollbackLinks.length === 0) {
            mw.notify("No rollback links found.");
            return;
        }

        mw.notify("Starting mass rollback...");

        let count = 0;
        const api = new mw.Api();

        rollbackLinks.forEach((link, index) => {
            const url = new URL(link.href);
            const title = url.searchParams.get('title');
            const user = url.searchParams.get('from');

            if (!title || !user) return;

            setTimeout(() => {
                api.postWithToken('rollback', {
                    action: 'rollback',
                    title: title,
                    user: user,
                    format: 'json'
                }).done(() => {
                    count++;
                    console.log(`Rolled back: ${title}`);
                }).fail(() => {
                    console.warn(`Failed: ${title}`);
                });
            }, index * 300); // delay to avoid rate limits
        });

        setTimeout(() => {
            mw.notify(`Done. Rolled back ${count} edits.`);
        }, rollbackLinks.length * 350);
    }

    createButton();
});