/* A request was made by User Mugg1991 that the black reference popup blocks the links. Therefore this is implemented to have the popup appear at the upperleft instead. */
//special:newpages addon
//add ugly button to toggle preview
//supposed-to-well-suited for mobile
//main code.js still have to be imported
(function ($) {
    if (wgCanonicalSpecialPageName !== 'Newpages') return;
    var preview;//preview object
    function init (p) {
        preview = p;
        $(setHandlers);
    }//init
    function handler (e) {
        if (e && e.preventDefault) e.preventDefault();
        var preview = preview || window.pPreview;
        if ($('.npage-preview').length) {
            preview.f.hidepreview();
            return false;
        }
        var $li = $(e.currentTarget).closest('li');
        if (!$li.length) return false;
        var $link = $li.find('.mw-newpages-pagename');
        preview.f.getpreview($link, $link.attr('title'));
        return false;
    }//handler
    function setHandlers () {
        var button = $('<a>', {href: '#', text: 'p', class: 'ppreview-toggle wds-button wds-is-squished wds-is-secondary'});
        //remove artefacts
        $('#mw-content-text > ul li .ppreview-toggle').remove();
        $('body').off('click', '.ppreview-toggle', handler);
        //add buttons
        $('#mw-content-text > ul li').prepend(button.clone());
        $('body').on('click', '.ppreview-toggle', handler);
    }//sethandlers
    importArticles({type: "script", articles: ["u:dev:LinkPreview/code.js"]});
    mw.hook('ppreview.ready').add(init);
}(jQuery));