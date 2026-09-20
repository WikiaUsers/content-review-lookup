// <nowiki>
mw.loader.using(['mediawiki.api', 'oojs-ui'], function () {
    const api = new mw.Api();
    function notif(msg) {
        mw.notify(msg);
    }
    const page = mw.config.get('wgPageName');
    if (!page.startsWith('Test Page')) return;

    async function loadSPITemplate() {
        try {
            const res = await api.get({
                action: "query",
                titles: "Test Page/IPS/Form.json",
                prop: "revisions",
                rvprop: "content",
                rvslots: "main",
                formatversion: 2 // Simplifies response structure (returns pages as an array)
            });

            const pageData = res.query.pages[0];

            if (pageData.missing) {
                notif('Page does not exist.');
                return null;
            }

            // Extract content string from the main slot
            const rawContent = pageData.revisions[0].slots.main.content;

            // Parse raw JSON text into a JavaScript object
            const formData = JSON.parse(rawContent);
            
            return formData;
        } catch (error) {
            notif('Failed to load JSON data.');
            console.error('API Error:', error);
        }
    }
});
// </nowiki>