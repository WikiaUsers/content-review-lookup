(function($) {
    if (window.jQuery === undefined || wgCanonicalNamespace != 'File') return;
    $('.filehistory td:nth-child(3) a').each(function() {
        var $this = $(this);
        for (var i in wgMonthNamesShort) {
            $this.text($this.text().replace(wgMonthNames[i], wgMonthNamesShort[i]));
        }
    });
})(window.jQuery);