(function() {
    function highlightHash() {
        $('.article-table tr.selected').removeClass('selected');
        var hash = window.location.hash;
        if (!hash) {
            return;
        }
        $('.article-table ' + hash)
            .closest('tr')
            .addClass('selected');
    }
    highlightHash();
    $(window).on('hashchange', highlightHash);
})();