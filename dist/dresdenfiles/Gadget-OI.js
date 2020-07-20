/** <nowiki>
 *
 * @Title       Open Infoboxes
 * @Description Makes collapsed Infobox sections open by default
 * @Author      Eizen <https://dev.fandom.com/wiki/User:Eizen>
 * @Author      Ursuul <https://dresdenfiles.fandom.com/wiki/User:Ursuul>
 * @Version     2.2.0
 *
 */
(function() {
    if (window.OpenInfoboxesLoaded) return;
    window.OpenInfoboxesLoaded = true;
    
    function openInfoboxes ($content, last) {
        if (!last && $content == mw.util.$content) return;
        $('.portable-infobox .pi-group').removeClass('pi-collapse-closed');
    }

    openInfoboxes(mw.util.$content, true);
    mw.hook('wikipage.content').add(openInfoboxes);
})();