/* Ongoing Campaigns */

mw.hook('wikipage.content').add(function () {
    function addCampaignModule() {
        var rail = $('#rail');
        if (!rail.length) {
            // Rail not ready yet — try again shortly
            setTimeout(addCampaignModule, 200);
            return;
        }

        // Create module
        var module = $('<section>')
            .addClass('rail-module')
            .attr('id', 'ongoing-campaigns-module');

        module.append('<h2 class="rail-module__header">Ongoing Campaigns</h2>');
        module.append(
            $('<div>').load('/wiki/Template:Main_Page/Campaign?action=render')
        );

        // Insert at top
        rail.prepend(module);
    }

    addCampaignModule();
});