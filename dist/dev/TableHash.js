(function() {
    function highlightHash() {
        $('.article-table tr.selected, .wikitable tr.selected').removeClass('selected');
        var hash = window.location.hash;
        if (!hash) {
            return;
        }
        var elem = document.getElementById(hash.substring(1));
        if (!elem) {
            return;
        }
        $(elem).closest('tr').addClass('selected');
    }
    highlightHash();
    $(window).on('hashchange', highlightHash);
})();