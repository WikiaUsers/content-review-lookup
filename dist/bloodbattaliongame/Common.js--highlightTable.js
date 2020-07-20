/** <pre>
 * highlightTable.js
 *
 * Description:
 * Adds row highlighting to tables
 *
 * Version 1.0: Row highlighting                    - Quarenon
 * Version 1.1: Update from pengLocations.js v1.0   - Quarenon
 * Version 2.0: pengLocations v2.1, Granular cookie - Saftzie
 *
 * Remember to tolerate bitwise operators when linting
 */
 
(function (window, $, mw, Math) {
 
    'use strict';
 
    function highlightTable() {
 
        // requires CSS classes named in lightOnClass and mouseOverClass
        var wgPageName = mw.config.get('wgPageName'),
            cookiePrefix = 'lightTable',
            tableClass = 'lighttable',
            lightOnClass = 'highlight-on',
            mouseOverClass = 'highlight-over',
            base64url = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
            pageSeparator = '!',
            tableSeparator = '.',
            hashPageName,
            rows = [],
            columns,
            tables,
            cookie;
 
        // hash a string into a 32-bit hex string, msb first
        function crc32c(s) {
            var polynomial = 0x04C11DB7, // Castagnoli polynomial
                retVal,
                table = [],
                i,
                j,
                k;
 
            // guarantee 8-bit chars
            s = window.unescape(window.encodeURI(s));
 
            // calculate the crc for all 8-bit data
            // bit-wise operations discard anything left of bit 31
            for (i = 0; i < 256; i += 1) {
                k = (i << 24);
                for (j = 0; j < 8; j += 1) {
                    k = (k << 1) ^ ((k >>> 31) * polynomial);
                }
                table[i] = k;
            }
 
            // the actual calculation
            retVal = 0;
            for (i = 0; i < s.length; i += 1) {
                retVal = (retVal << 8) ^ table[(retVal >>> 24) ^ s.charCodeAt(i)];
            }
 
            // make negative numbers unsigned
            if (retVal < 0) {
                retVal += 4294967296;
            }
            // 32-bit hex string, padded on the left
            retVal = '0000000' + retVal.toString(16).toUpperCase();
            retVal = retVal.substr(retVal.length - 8);
 
            return retVal;
        }
 
        // change the row bg color based on mouse events
        function setHighlight(el, val) {
            $(el).removeClass(mouseOverClass).removeClass(lightOnClass);
            switch (val) {
            case 1:  // light on
                $(el).addClass(lightOnClass);
                break;
            case 2:  // mouse-over
                $(el).addClass(mouseOverClass);
                break;
            default: // same as case 0, light off
            }
        }
 
        // load the cookie and parse it for the page
        // cookie info is saved in 1 of 16 browser cookies, based on page name hash
        // global cookie[][] supports multiple tables and multiple pages
        // uses global hashPageName
        function loadCookie(numTables) {
            var cookieName = cookiePrefix + '-' + hashPageName.charAt(0),
                pageCookies,
                tableCookies,
                iPage,
                iTable,
                i,
                j,
                k;
 
            cookie = [];
            if ($.cookie(cookieName) !== null) {
                pageCookies = $.cookie(cookieName).split(pageSeparator);
                for (iPage = 0; iPage < pageCookies.length; iPage += 1) {
                    if (hashPageName === pageCookies[iPage].substr(0, 8)) {
                        tableCookies = pageCookies[iPage].substr(8).split(tableSeparator);
                        // trim the cookie array of arrays, if needed
                        while (tableCookies.length > numTables) {
                            tableCookies.pop();
                        }
                        // extract the row info per table
                        // use Base64url to compress 6 rows to 1 character
                        for (iTable = 0; iTable < tableCookies.length; iTable += 1) {
                            cookie[iTable] = [];
                            for (i = 0; i < tableCookies[iTable].length; i += 1) {
                                k = base64url.indexOf(tableCookies[iTable].charAt(i));
                                if (k < 0) { // input validation
                                    k = 0;
                                }
                                for (j = 5; j >= 0; j -= 1) {
                                    cookie[iTable][6 * i + j] = (k & 0x1);
                                    k >>= 1;
                                }
                            }
                        }
                    }
                }
            }
 
            // initialize the cookie array of arrays, if needed
            while (cookie.length < numTables) {
                cookie.push([]);
            }
        }
 
        // save/update the cookie for page reloads
        // cookie info is saved in 1 of 16 browser cookies, based on page name hash
        // global cookie[][] supports multiple tables and multiple pages
        // uses global hashPageName
        function saveCookie() {
            var cookieName = cookiePrefix + '-' + hashPageName.charAt(0),
                pageCookies,
                tableCookies,
                iPage,
                iTable,
                i,
                j,
                k,
                updated;
 
            // create the cookie for the tables on the current page
            // use Base64url to compress 6 rows to 1 character
            tableCookies = hashPageName;
            for (iTable = 0; iTable < cookie.length; iTable += 1) {
                if (iTable > 0) {
                    tableCookies += tableSeparator;
                }
                for (i = 0; i < Math.ceil(cookie[iTable].length / 6); i += 1) {
                    k = cookie[iTable][6 * i];
                    for (j = 1; j < 6; j += 1) {
                        k = 2 * k + ((6 * i + j < cookie[iTable].length) ? cookie[iTable][6 * i + j] : 0);
                    }
                    tableCookies += base64url.charAt(k);
                }
            }
 
            updated = 0;
            pageCookies = [];
            if ($.cookie(cookieName) !== null) {
                // get all the page cookies
                // another page might have updated them since this page
                pageCookies = $.cookie(cookieName).split(pageSeparator);
                // update the page cookie if it already exists
                for (iPage = 0; iPage < pageCookies.length; iPage += 1) {
                    if (hashPageName === pageCookies[iPage].substr(0, 8)) {
                        updated = 1;
                        pageCookies[iPage] = tableCookies;
                    }
                }
            }
            // add the page cookie if it doesn't exist yet
            if (updated === 0) {
                pageCookies.push(tableCookies);
            }
 
            // set path to / so it works for /wiki/, /index.php, etc
            $.cookie(cookieName, pageCookies.join(pageSeparator), {
                expires: 7,
                path: '/'
            });
        }
 
        tables = $('table.' + tableClass);
        // don't bother doing anything unless there's really something to do
        if (tables.length > 0) {
            // hash the page name to an 8-char hex string
            hashPageName = crc32c(wgPageName);
            loadCookie(tables.length);
 
            tables.each(function (iTable) {
                rows[iTable] = $(this).find('tr:has(td)'); // data rows
 
                // init or trim the cookie array of rows, if needed
                while (cookie[iTable].length < rows[iTable].length) {
                    cookie[iTable].push(0);
                }
                while (cookie[iTable].length > rows[iTable].length) {
                    cookie[iTable].pop();
                }
 
                // don't rely on headers to find # of columns
                // count them dynamically
                columns = 1;
 
                rows[iTable].each(function (iRow) {
                    // update column count as we go
                    // a smarter approach would count colspans, but this is good for now
                    columns = Math.max(columns, $(this).children('th,td').length);
 
                    // initialize highlighting based on the cookie
                    setHighlight(this, cookie[iTable][iRow]);
 
                    // set mouse events
                    $(this).mouseover(function () {
                        setHighlight(this, 2);
                    }).mouseout(function () {
                        setHighlight(this, cookie[iTable][iRow]);
                    }).click(function (e) {
                        // don't toggle highlight when clicking links
                        if ((e.target.tagName !== 'A') && (e.target.tagName !== 'IMG')) {
                            cookie[iTable][iRow] = 1 - cookie[iTable][iRow];
                            setHighlight(this, cookie[iTable][iRow]);
                            saveCookie();
                        }
                    });
                });
 
                // add a button for reset
                $(this).append(
                    $('<tr/>').append(
                        $('<th/>', {
                            'colspan': columns
                        }).append(
                            $('<input>', {
                                'type': 'button',
                                'value': 'Reset',
                                'click': function () {
                                    rows[iTable].each(function (iRow) {
                                        cookie[iTable][iRow] = 0;
                                        setHighlight(this, 0);
                                    });
                                    saveCookie();
                                }
                            })
                        )
                    )
                );
            });
        }
    }
 
    $(function () {
        highlightTable();
    });
 
}(this, this.jQuery, this.mediaWiki, this.Math));
 
/* </pre> */