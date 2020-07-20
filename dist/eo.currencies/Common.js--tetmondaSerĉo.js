// Aldonante tutmonda serĉo eblon por serĉi (eksperimenta)
 
function globalSearch() {
    if(wgCanonicalNamespace == 'Speciala') {
        $('#mw-search-top-table').append('<span style="float:left; margin-left:0em;"><a href="https://www.google.com/search?q=site%3Awikia.com">Serĉo ĉiuj Wikia</a></span>');
    }
}
addOnloadHook(globalSearch);