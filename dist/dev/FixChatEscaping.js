mw.hook('dev.chat.render').add(function(mainRoom) {
    var map = {
        amp: '&',
        quot: '"',
        '#039': '\''
    },
    replaceText = function(_, text) {
        return text.replace(/&([\w#%]+?);/g, function(full, name) {
            return map[name] || full;
        });
    },
    replaceLink = function(_, href) {
        return href.replace(/%26([\w#%]+?)%3B/g, function(full, name) {
            return map[decodeURIComponent(name)] || full;
        });
    };

    mainRoom.model.chats.bind('afteradd', function(model) {
        if (!model.attributes.isInlineAlert) return;
        $('#entry-' + model.cid).find('a')
            .text(replaceText)
            .attr('href', replaceLink);
    });
});

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:Chat-js.js'
});