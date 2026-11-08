/* Any JavaScript here will be loaded for all users on every page load. */

/* RailModule */
window.AddRailModule = [{prepend: true}];

/* UploadMultipleFiles */
mw.config.set('UMFBypassLicenseCheck', true);

/* Category:Media - Test* */

(async function () {
    'use strict';

    const api = new mw.Api();

    let continuation = {};
    let total = 0;
    let edited = 0;
    let skipped = 0;

    if (!confirm(
        'Start adding [[Category:Media]] to all file pages?'
    )) {
        return;
    }

    async function processFile(file) {
        try {
            const data = await api.get({
                action: 'query',
                prop: 'revisions',
                titles: file.title,
                rvprop: 'content',
                rvslots: 'main',
                formatversion: 2
            });

            const page = data.query.pages[0];

            if (!page || !page.revisions || !page.revisions.length) {
                skipped++;
                return;
            }

            const content = page.revisions[0].slots.main.content;

            if (/\[\[\s*Category\s*:\s*Media\s*(?:\|[^\]]*)?\]\]/i.test(content)) {
                skipped++;
                return;
            }

            const updated =
                content.trimEnd() + '\n[[Category:Media]]\n';

            await api.postWithEditToken({
                action: 'edit',
                title: file.title,
                text: updated,
                summary: 'Add [[Category:Media]]',
                bot: 0
            });

            edited++;

        } catch (error) {
            console.error('Error processing ' + file.title, error);
            skipped++;
        }
    }

    try {
        do {
            const result = await api.get(Object.assign({
                action: 'query',
                list: 'allpages',
                apnamespace: 6,
                aplimit: 'max',
                formatversion: 2
            }, continuation));

            for (const file of result.query.allpages) {
                await processFile(file);
                total++;

                console.log(
                    'Processed:', total,
                    '| Edited:', edited,
                    '| Skipped:', skipped
                );
            }

            continuation = result.continue || {};

        } while (Object.keys(continuation).length);

        alert(
            'Completed!\n' +
            'Files scanned: ' + total +
            '\nCategories added: ' + edited +
            '\nSkipped or failed: ' + skipped
        );

    } catch (error) {
        console.error(error);
        alert('An error occurred. Check the browser console.');
    }
})();