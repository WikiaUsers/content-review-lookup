/** <nowiki>
 *
 * @Title       Open Navboxes
 * @Description Makes all collapsed Navbox sections open by default
 * @Version     2.1.1
 *
 */
(function() {
    if (window.OpenNavboxesLoaded) return;
    window.OpenNavboxesLoaded = true;
 
    function openNavboxes($content) {
        if (!$content) return;
        $content.find('.navbox.mw-collapsed .mw-collapsible-toggle.mw-collapsible-toggle-collapsed').click();
    }
 
    openNavboxes(mw.util.$content);
    mw.hook('wikipage.content').add(openNavboxes);
})();