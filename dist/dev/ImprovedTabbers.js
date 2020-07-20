require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {

    window.ImprovedTabbers = window.ImprovedTabbers || {};
    if (typeof window.ImprovedTabbers.Load !== 'undefined' || $('body').hasClass('editor')) {
        return; // prevent second load.
    }
    
    window.ImprovedTabbers = $.extend({
        Load: true,
        HideHeaderTitle: true,
        HideContentTitle: true,
        NonASCIIAnchor: true,
        SynchroInfoboxes: true,
        SynchroTabbers: true,
    }, window.ImprovedTabbers);
    
    const HeaderTitle  = window.ImprovedTabbers.HideHeaderTitle  ? 'data-tabber-title' : 'title',
          ContentTitle = window.ImprovedTabbers.HideContentTitle ? 'data-tabber-title' : 'title';
    
    if (window.ImprovedTabbers.HideHeaderTitle || window.ImprovedTabbers.HideContentTitle || window.ImprovedTabbers.SynchroTabbers) {
        var tabbers = $(".tabber");
        tabbers.each(function() {
            var $this = $(this),
            tabContent = $this.children('.tabbertab'),
            nav = $this.children('.tabbernav');
            // hidding titles in header and content of tabbers.
            if (window.ImprovedTabbers.HideHeaderTitle) {
                nav.find('a').each(function () {
                    $(this).attr(HeaderTitle, $(this).attr('title') );
                    $(this).attr('title', null);
                });
            }

            if (window.ImprovedTabbers.HideContentTitle) {
                tabContent.each(function () {
                    $(this).attr(ContentTitle, $(this).attr('title') );
                    $(this).attr('title', null);
                });
            }
            
            function showContent(title) {
                var content = tabContent.filter('[' + ContentTitle + '="' + title + '"]');
                if (content.length !== 1) return false;
                tabContent.hide();
                content.show();
                nav.find('.tabberactive').removeClass('tabberactive');
                nav.find('a[' + HeaderTitle + '="' + title + '"]').parent().addClass('tabberactive');
                $(window).trigger('scroll');
                return true;
            }
            nav.off('click', 'a');
            nav.on('click', 'a', function (e) {
                var title = $(this).attr(HeaderTitle);
                e.preventDefault();
                location.hash = '#' + title;
                showContent(title);
                // open tabs with same name in others tabbers on page
                if (window.ImprovedTabbers.SynchroTabbers) {
                    tabbers.not($this).find('.tabbernav a[' + HeaderTitle + '="' + title + '"]').trigger('customclick', [title]);
                }
            });
            nav.on('customclick', 'a', function (e, title) {
                showContent(title);
            });
        });
    }
    // if tabber contain inside infoboxes with collapsible sections
    // when section on active tab collapsed or expanded
    // then automatically synchronously collapse or expande sections with same name on nonactive tabs
    if (window.ImprovedTabbers.SynchroInfoboxes) {
        var collapsibleGroups = $(".tabber .pi-collapse");
        collapsibleGroups.each(function(index) {
            collapsibleGroups.eq(index).find(".pi-header:first").click(function() {
                collapsibleGroups.not($(this).parent()).has(".pi-header:first:contains('" + $(this).text() + "')").toggleClass("pi-collapse-closed");
            });
        });
    }
    // if location hash anchor contain a non ascii-characters, decode it and open tab with same title
    if (window.ImprovedTabbers.NonASCIIAnchor) {
        var loc = location.hash.replace("#", "").replace(/\./g, "%");
        if (loc !== "") {
            $(".tabber .tabbernav a").filter(function() {
                return (mw.util.wikiUrlencode($(this).attr(HeaderTitle)) == loc);
            }).click();
        }
    }
});