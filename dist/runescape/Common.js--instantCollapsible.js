/** <nowiki>
 * Removes fade animations on mw-collapsible tables
 *
 * @author  Cqm
 * @version 1.0
 * @comment Does not affect enhanced recent changes
 * @todo tidy up (borrow from jquery.makeCollapsible perhaps?)
 */

(function ($) {

    'use strict';

    function noFade() {

        // use th to avoid affecting enhanced rc
        var $toggle = $('th > .mw-collapsible-toggle'),
            $this,
            $tr,
            $table,
            expand,
            collapse,
            i;

        // prevent normal mw-collapsible behaviour
        $toggle.unbind('click');
        
        $table = $toggle.parent().parent().parent().parent();
        
        $table.find('td > table.navbox-subgroup > tbody > tr[style*="display"]').css({'display': ''});
        
        $table.find('td > table > tbody > tr[style*="display"] > th.navbox-title').parent().css({'display': ''});

        $toggle.click(function (e) {

            // stop scrolling to the top of the page
            e.preventDefault();

            $this = $(this);
            // move one level at a time to avoid selecting nested tables
            $table = $($(this).parent().parent().parent().parent());
            
            // check for defined expand/collapse text
            // normally these are defined by [[MediaWiki:Collapsible-expand]] and [[MediaWiki:Collapsible-collapse]] respectively
            // however, this is currently bugged on wikia (2013-07-23) which forces the default 'Expand' and 'Collapse'
            expand = $table.attr('data-expandtext') || 'Expand';
            collapse = $table.attr('data-collapsetext') || 'Collapse';

            if ($table.children('thead').length) {

                // there seems to be a bug with mw-collapsible hiding thead rows?
                // reported to Wikia, possibly cause to sortable script loading after collapsible script
                
                $tr = $table.children('tbody').children();
                
                if ($table.hasClass('mw-collapsed')) {

                    $table.removeClass('mw-collapsed');
                    $this.children().text(collapse);

                    $this.addClass('mw-collapsible-toggle-expanded')
                         .removeClass('mw-collapsible-toggle-collapsed');

                    // ignore first row as it's the header
                    for (i = 0; i < $tr.length; i += 1) {
                        $($tr[i]).css({
                            'display': 'table-row'
                        });
                    }

                } else {

                    $table.addClass('mw-collapsed');

                    // this is only added by default if already collapsed
                    if (!$table.hasClass('mw-made-collapsible')) {
                        $table.addClass('mw-made-collapsible');
                    }

                    $this.children().text(expand);
                    $this.addClass('mw-collapsible-toggle-collapsed')
                         .removeClass('mw-collapsible-toggle-expanded');

                    for (i = 0; i < $tr.length; i += 1) {
                        $($tr[i]).css({
                            'display': 'none'
                        });
                    }
                }
            
            } else {

                $tr = $table.children().children();
                
                if ($table.hasClass('mw-collapsed')) {
            
                    $table.removeClass('mw-collapsed');

                    $this.children().text(collapse);

                    $this.addClass('mw-collapsible-toggle-expanded')
                         .removeClass('mw-collapsible-toggle-collapsed');

                    // ignore first row as it's the header
                    for (i = 1; i < $tr.length; i += 1) {
                        $($tr[i]).css({
                            'display': 'table-row'
                        });
                    }

                } else {

                    $table.addClass('mw-collapsed');

                    // this is only added by default if already collapsed
                    if (!$table.hasClass('mw-made-collapsible')) {
                        $table.addClass('mw-made-collapsible');
                    }

                    $this.children().text(expand);

                    $this.addClass('mw-collapsible-toggle-collapsed')
                         .removeClass('mw-collapsible-toggle-expanded');

                    // ignore first row as it's the header
                    for (i = 1; i < $tr.length; i += 1) {
                        $($tr[i]).css({
                            'display': 'none'
                        });
                    }
                }
                
            }

        });

    }

    $(function () {

        if ($('.mw-collapsible').length) {
            noFade();
        }

    });

}(this.jQuery));

/* </nowiki> */