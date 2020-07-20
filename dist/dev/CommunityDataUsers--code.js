/**
 * Name:        CommunityDataUsers
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Adds data-user attributes to users in Special:Community's
 *              sidebar. Written by request of Ursuul
 */
(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Community') {
        return;
    }
    function addAttribute(sel1, sel2) {
        $('.community-page-rail .community-page-' + sel1 + '-item').each(function() {
            var $this = $(this);
            $this.attr('data-user', $this.find('> .community-page-' + sel2 + '-details > a').text());
        });
    }
    addAttribute('admin', 'contributor');
    addAttribute('moderators-list', 'moderator');
    addAttribute('contributors-list', 'contributor');
})();