(function($, mw, window){
    if (mw.config.get('wgAction') === 'edit'){
        if ($('.module_content .wikia-menu-button-submit').length){
            var $editButtons = $('.module_content .wikia-menu-button-submit');
            // Step #1
            $editButtons.addClass('wds-button-group');
            $editButtons.children('input[type="submit"], button').addClass('wds-button');
            $editButtons.remove('span.drop');
            // Step #2
            var $editDropdown = $('<div>').addClass('wds-dropdown');
            $editDropdown.html([
                $('<div>').addClass('wds-button wds-dropdown__toggle')
                    .html(
                        $('<svg>').addClass('wds-icon wds-icon-tiny wds-dropdown__toggle-chevron')
                            .attr({
                                xmlns: 'http://www.w3.org/2000/svg',
                                viewbox: '0 0 12 12',
                                id: 'wds-icons-dropdown-tiny'
                            }).html('<path d="M6 9l4-5H2" fill-rule="evenodd"></path>')
                    ),
                $('<div>').addClass('wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned')
                    .html(
                        $editButtons.children('.WikiaMenuElement')
                            .clone()
                            .removeClass('WikiaMenuElement')
                            .addClass('wds-list wds-is-linked')
                    )
            ]);
            $editButtons.children('.WikiaMenuElement').replaceWith($editDropdown);
            $editButtons.removeClass('wikia-menu-button');
        } else {
            
        }
    }
}(jQuery, mediaWiki, window));