// Adding global search option to search (experimental)

function globalSearch() {
    if(wgCanonicalNamespace == 'Special') {
        $('#mw-search-top-table').append('<span style="float:left; margin-left:0em;"><a href="https://www.google.com/search?q=site%3Awikia.com">Search all of Wikia</a></span>');
    }
}
addOnloadHook(globalSearch);