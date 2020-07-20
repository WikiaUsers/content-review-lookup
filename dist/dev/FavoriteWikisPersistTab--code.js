/*
 * FavoriteWikisPersistTab
 *
 * Does a script with a name that verbose need a description?
 * Persists the selected user tab when clicking favorite wiki links.
 *
 * @author Dorumin
 */

(function() {
    var $wikis = $('#UserProfileMasthead .wikis > ul > li > a');
    if (!$wikis.exists()) return;
    
    function replace_links(page) {
        $wikis.each(function() {
            var $this = $(this),
            href = $this.attr('href'),
            path = '/wiki/' + page.replace('$1', href.split(':').slice(2).join(':'));
            $this.attr('href', href.replace(/\/wiki\/.+/, path));
        });
    }

    var config = mw.config.get([
        'wgNamespaceNumber',
        'wgCanonicalSpecialPageName'
    ]);
    
    if (config.wgNamespaceNumber === 2) {
        replace_links('User:$1');
    } else if (config.wgNamespaceNumber === 500) {
        replace_links('User_blog:$1');
    } else if (config.wgCanonicalSpecialPageName === 'Contributions') {
        replace_links('Special:Contributions/$1');
    } else if (config.wgCanonicalSpecialPageName === 'Following') {
        replace_links('Special:Following');
    }
    // User talk is default, Special:UserActivity is CC only
})();