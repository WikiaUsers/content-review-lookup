/* Any JavaScript here will be loaded for all users on every page load. */
/* For custom profiles rank grabber */
$(function() {
    if (mw.config.get('wgNamespaceNumber') === 2 || mw.config.get('wgNamespaceNumber') === 3) {
        var checkExist = setInterval(function() {
            var $profileHeader = $('.UserProfileHeader');
            var $tag = $('.UserProfileHeader .tag');
            
            if ($profileHeader.length && $tag.length) {
                $tag.each(function() {
                    var groupText = $(this).text().toLowerCase().trim().replace(/ /g, '-');
                    $profileHeader.addClass('wiki-group-' + groupText);
                });
                clearInterval(checkExist);
            }
        }, 250);
    }
});