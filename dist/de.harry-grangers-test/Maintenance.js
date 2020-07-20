function getSpecialPageEntries(page) {
    $.getJSON('/api.php?action=query&list=querypage&qppage=' + page + '&qplimit=500&format=json',handleResult);
}
 
function handleResult(data) {
    outputPageList(data.query.querypage.results);
    keys = Object.keys(data);
    if(keys.length == 2 && data.hasOwnProperty('query-continue')) {
        console.log('again');
    }
}
 
function outputPageList(pages) {
    ul = $('<ul />');
    for(var i in pages) {
        page = pages[i];
        $('<li />').text(page.title + ': ' + page.value).appendTo(ul);
    }
    mw.util.$content.append(ul);
}