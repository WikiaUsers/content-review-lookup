function getRawPage(title,callback) {
    $.get('/wiki/' + title ,function(data) {
        callback($('<div/>').html($.parseHTML(data)).find('#mw-content-text').html());
    });
};