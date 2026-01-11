/* Ongoing Campaigns */

mw.hook('wikipage.content').add(function () {

    function addCampaignModule(attempt) {
        attempt = attempt || 0;

        // Rail selectors across Oasis + UCP
        var rail = $('.WikiaRail, #right-rail, .page__right-rail, #rail');

        if (!rail.length) {
            if (attempt < 20) {
                // Retry for up to ~4 seconds
                setTimeout(function () {
                    addCampaignModule(attempt + 1);
                }, 200);
            }
            return;
        }

        // Prevent duplicate insertion
        if ($('#ongoing-campaigns-module').length) return;

        // Create module
        var module = $('<section>')
            .addClass('rail-module rail-module--custom')
            .attr('id', 'ongoing-campaigns-module');

        module.append('<h2 class="rail-module__header">Ongoing Campaigns</h2>');
        var content = $('<div class="rail-module__content">Loading…</div>');
        module.append(content);

        // Insert at top of rail
        rail.prepend(module);

        // Load template via API (more reliable than .load)
        $.get('/api.php', {
            action: 'parse',
            page: 'Template:Main_Page/Campaign',
            prop: 'text',
            format: 'json'
        }).done(function (data) {
            if (data?.parse?.text['*']) {
                content.html(data.parse.text['*']);
            } else {
                content.text('Unable to load campaign content.');
            }
        }).fail(function () {
            content.text('Failed to load campaign content.');
        });
    }

    addCampaignModule();
});