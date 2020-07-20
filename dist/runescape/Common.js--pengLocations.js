/** <pre>
 * pengLocations.js
 *
 * Description:
 * Implement row marking on the penguin locations table in the DnD Locations article.
 * Show/hide columns to fit a large table in a smaller display area.
 *
 * Version 1.0: Row marking                         - Quarenon
 * Version 2.0: Show/hide columns                   - Saftzie
 *              Thanks to Tyilo and Chrislee33 for ideas
 * Version 2.1: Highlight classes, JSLint, Wrapping - Saftzie, Cåm
 */

( function($, mw) {

    'use strict';

    function pengLocations() {

        // requires CSS classes named in lightOnClass and mouseOverClass
        var wgPageName = mw.config.get('wgPageName'),
            tableID = 'pengLocations',
            cookieID = 'pengLocations',
            toggleClass = 'pengToggle',
            lightOnClass = 'highlight-on',
            mouseOverClass = 'highlight-over',
            cookie,
            rows,
            selector,
            headers;

        // change the row bg color based on mouse events
        function setHighlight(el, val) {
            $(el).removeClass(mouseOverClass).removeClass(lightOnClass);
            switch(val) {
            case 1:  // light on
                $(el).addClass(lightOnClass);
                break;
            case 2:  // mouse-over
                $(el).addClass(mouseOverClass);
                break;
            default: // same as case 0, light off
            }
        }

        // show or hide columns
        // 1 = show, 0 = hide
        function setVisibility(val) {
            if (val === 1) {
                $('#' + tableID + ' .' + toggleClass).show();
            } else {
                $('#' + tableID + ' .' + toggleClass).hide();
            }
        }

        // define a callback for Array.map
        function parseIntA(element, index, array) {
            return parseInt(element, 10);
        }

        // save the cookie for page reloads
        function saveCookie() {
            $.cookie(cookieID, cookie.join(''), {
                expires: 6
            });
        }

        if (wgPageName === 'Distractions_and_Diversions/Locations' || wgPageName === 'Distractions_and_Diversions/Locations/Penguin_Hide_and_Seek') {

            rows = $('#' + tableID + ' tr:has(td)'); // data rows

            selector = '';                           // propagate class from header row to data rows
            headers = $('#' + tableID + ' tr > th'); // save the headers to count them later

            headers.filter('.' + toggleClass).each( function() {

                if (selector.length > 0) {           // build a selector that mirrors the header row
                    selector += ',';                 // Note: index() starts at 0, nth-child starts at 1
                }

                selector += 'td:nth-child(' + ($(this).index() + 1) + ')';

            });

            // apply it to the data rows and add the class
            if (selector.length > 0) {
                rows.children(selector).addClass(toggleClass);
            }

            // load the existing cookie, if any
            // cookie[0] is the hidden state
            if ($.cookie(cookieID) !== null) {
                cookie = $.cookie(cookieID).split('').map(parseIntA);
            } else {
                cookie = [0];
            }

            // initialize a cookie if one didn't exist on load
            while (cookie.length < rows.length + 1) {
                cookie.push(0);
            }

            rows.each( function(iRow) {

                // initialize highlighting based on the cookie
                setHighlight(this, cookie[iRow + 1]);

                // set mouse events
                $(this).mouseover( function() {
                    setHighlight(this, 2);
                }).mouseout( function() {
                    setHighlight(this, cookie[iRow + 1]);
                }).click( function(e) {
                    // don't highlight when clicking links
                    if (e.target.tagName === 'TD') {
                        // toggle highlight
                        cookie[iRow + 1] = 1 - cookie[iRow + 1];
                        setHighlight(this, cookie[iRow + 1]);
                        saveCookie();
                    }
                });
            });

            // initialize cell visibility based on the cookie
            setVisibility(cookie[0]);

            // add some buttons for reset and size
            $('#' + tableID).append(
                $('<tr/>').append(
                    $('<th/>', {
                        'colspan': headers.length
                    }).append(
                        $('<input>', {
                            'type': 'button',
                            'value': 'Clear marks',
                            'click': function() {
                                rows.each( function(iRow) {
                                    cookie[iRow + 1] = 0;
                                    setHighlight(this, 0);
                                });
                                saveCookie();
                            }
                        }),

                        '&nbsp;',

                        $('<input>', {
                            'type': 'button',
                            'value': 'Toggle visibility',
                            'click': function() {
                                cookie[0] = 1 - cookie[0];
                                setVisibility(cookie[0]);
                                saveCookie();
                            }
                        })
                    )
                )
            );
        }
    }

    $( function() {
        pengLocations();
    });

}(this.jQuery, this.mediaWiki));

/* </pre> */