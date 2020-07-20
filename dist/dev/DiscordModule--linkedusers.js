mw.hook('discordmodule.modal.show').add(function($content) {
    // converts all usernames to local user: links
    // for servers with wiki-verified users
    // works better (only) with (window.dev = window.dev || {}).discordmodule = {usenick: true};
    $content.find('.discord-member').each(function() {
        var textNode = this.childNodes[1],
            $textNode = $(textNode);
        if (textNode.nodeType !== 3 || $(this).find('.discord-bot').length) return;// it's not the textnode u r looking for
        $textNode.wrap(
            $('<a>', {
                href: mw.config.get('wgScriptPath') + '/wiki/User:' + textNode.textContent,
                title: this.title || '',
            })
        );
    });
});// hook