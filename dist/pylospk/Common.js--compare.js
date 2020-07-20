/** <nowiki>
 * Adds links for compare popups
 * 
 * @author Quarenon
 * @author Ryan PM
 * @author Joeytje50
 * @author Cqm
 *
 * @todo try to find a standard img url domain to use
 * @todo re-center (vertical & horizontally) with new items added, or find a way to do it with pure CSS
 *       might require overhaul to #overlay structure/styles
 */

;( function ( $, mw, rs ) {

    'use strict';

    var conf = mw.config.get( [
            'stylepath',
            'wgTitle'
        ] ),

        self = {
            /**
             * Inital loading method
             */
            init: function () {
                var $compare = $( '.cioCompareLink' ),
                    $ibox = $( '.infobox-bonuses' );

                $compare.each( function () {
                    var $this = $( this ),
                        props = ( $this.attr( 'title' ) || '' ).split( '|' ),
                        text = props[0] !== '' ? props[0] : 'Compare items',
                        items = props.length >= 2 ? props.slice( 1 ) : [conf.wgTitle],
                        $a = $( '<a>' )
                            .attr( {
                                href: '#',
                                title: 'Compare this item with other items',
                                'data-items': items.join( '|' )
                            } )
                            .text( text )
                            .on( 'click', self.open );

                        $this
                            .empty()
                            .append( $a )
                            .parent()
                                .show();
                } );

                $ibox.each( function () {
                    var $this = $( this ),
                        $tr = $this.find( '> tbody > tr' );

                    // increase rowspan to accommodate compare link row
                    $tr.first().children( 'td' ).attr( 'rowspan', function ( _, val ) {
                        return parseInt( val, 10 ) + 1;
                    } );

                    // insert new row with compare link
                    $tr.last().prev().after(
                        $( '<tr>' )
                            .append(
                                $( '<td>' )
                                    .attr( 'colspan', '6' )
                                    .append(
                                        $( '<a>' )
                                            .attr( {
                                                href: '#',
                                                title: 'Compare this item with other items',
                                                'data-items': conf.wgTitle
                                            } )
                                            .on( 'click', self.open )
                                            .text( 'Compare items' )
                                    )
                            )
                    );
                } );

            },

            /**
             * Images
             *
             * These are functions to avoid us having to use .clone()
             * and to avoid potential memory leaks
             */
            img: {
                /**
                 * Delete image
                 *
                 * @return {jquery object}
                 */
                del: function () {
                    return $( '<img>' )
                        .attr( {
                            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHWSURBVHjadFJBTxNREP7m7ba1kRAg2SZyUKFcCHAhXI134w/Qg+FCAt7ECwgXygESQMKlRDQxXjRKQq1COBEPeBBixB8gHGxSmrbJtuUA3V12x7e76WshcZI5vPnmm2/mywMzw89qsczmryNuvK+nefjzCiYgo1Yosr2ehrWygsr+d8a1qOx9Y2v1JcoLiwqjWv6UrXQabi4HCDknoiP2ZBSd9++RIn14D7gu4HnQentgpFKkt3ffopLj+PqApgGXLuyNVzD9fep1OO/eAjfiISbJ7Hqhoo+f5Qtcf/0G3skfUDQa3EByetAYiYCIwLYNrb8fxuwMKWIjilPTzPk8KBZDox6QpLJIJpGYT5G6sZXoR2nyGXuVGshfTQZLVWEYSCwvUWufaH2YW5+Zi+XQJNUhwKcFmDu7VxSUormVYTuTAeSNcj9p0mXYoesIjHMcRB89RtfDB6QUzY+bbGezTZK8yTdC3O0BLCusyQH25ieYmWygJKrHJ+xsf23uICdrIyMwXkxTYn6O9MGhoBasL512vmRR/Ztj0dGXpMj4OCgeB19cQB8ehvF8UhkRHRuDNiDJ5+dA203EJp6i485tav7FHwdcXl37718tLS1z5ei3wv8JMADpOhbE0Ou4cwAAAABJRU5ErkJggg==',
                            width: 14,
                            height: 13,
                            alt: '[X]'
                        } );
                },

                /**
                 * Loading image
                 *
                 * @return {jquery object}
                 */
                loading: function () {
                    return $( '<img>' )
                        .attr( {
                            // .gif can't be converted to data: URI
                            src: conf.stylepath + '/common/progress-wheel.gif',
                            width: 16,
                            height: 16,
                            alt: '...'
                        } );
                },

                /**
                 * Error image
                 *
                 * @return {jquery object}
                 */
                error: function () {
                    return $( '<img>' )
                        .attr( {
                            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcpJREFUeNpi3FvPwoAHMEPpv+gSTg2/wTQTPs2MjMx/QBjJIAyAz4AKMS0/BjHtQDCbVAPkmNm4WxSdyhkUHYoYQGyQGCkG5MvbFDCwcfECMTeDvHUuSKyIWANs2Hkli6SNoxh+fzzK8PvDQQYZowgGTkGFfKCcKzEGZCo5VTMw/v/BcHxGGsPxWXkM//+9Y1ByLAPLETIgmV/WNEpMzY7h59uNcMGfr9cxCCsaMfDLmIBCNA2fAZnKTpUMf77fYPj/5xNC9O9Xhr/frjGouJQxAKN1JnK0IhtQLa7lZ8wjLMLw6+02BoY/H+ES//9+AbpiPQOXAD+DpEEYSKgRJscITYnSzGxcT0yS1jIw/TzJ8OfLJZAUSCsQ/WH4/x+Y6v79YmDmUmFg5g9kODUvnOHPj49KwNR4H+aCfDnzVAZWtr/AUD8EtPEzGJ9evY7h9JpNQC98Awbkd4Y/n88zMDF/Y5CzSAHrgbkAGG3ih03iFzD8fD4RaOEXoCgjkgv+Q7LCf0h2YGTiYuCUq2Y4sziZ4fv7Rz4s4GizLwTq+cbAIZnMQAz4/+8jg7JTGcOVtTmZIAOmX98CTupRDKSBrSC9jP/BTiQfAAQYAMjEmRhwR6odAAAAAElFTkSuQmCC',
                            width: 16,
                            height: 16,
                            alt: '!!'
                        } );
                }
            },

            /**
             * Modal open method
             *
             * Callback to on click event
             *
             * @param e {jquery.event}
             */
            open: function ( e ) {
                e.preventDefault();

                var $overlay = $( '#overlay' ),
                    items = $( this ).attr( 'data-items' ).split( '|' ),
                    $modal = self.buildModal();

                if ( !$overlay.length ) {
                    $( 'body' )
                        .append(
                            $( '<div>' )
                                .attr( 'id', 'overlay' )
                        );

                    $overlay = $( '#overlay' );
                }

                $overlay
                    .show()
                    .on( 'click', self.close )
                    .after( $modal );

                $modal.css( 'left', $( window ).width() / 2 - ( $modal.width() / 2 ) );

                $( document ).on( 'keydown', self.keyClose );

                items.forEach( self.submit );
            },

            /**
             * Callback for jquery event
             *
             * Separated out so we can detach it specifically
             * instead of every keydown event
             */
            keyClose: function ( e ) {
                // Esc
                if ( e.which === 27 ) {
                    self.close();
                }
            },

            /**
             * Builds the compare modal
             *
             * @return {jquery object}
             */
            buildModal: function () {
                var $modal = $( '<div>' )
                    .attr( 'id', 'modal' )
                    .append(
                        $( '<div>' )
                            .attr( 'id', 'cioTitle' )
                            .append(
                                $( '<div>' )
                                    .attr( {
                                        id: 'modalClose',
                                        title: 'Close'
                                    } )
                                    .on( 'click', self.close )
                                    .append( self.img.del() ),
                                'Compare items'
                            ),
                        $( '<form>' )
                            .attr( {
                                name: 'cioCompare',
                                id: 'cioCompare',
                                action: '#'
                            } )
                            .on( 'submit', function () {
                                // stop jquery.event being passed as an argument
                                self.submit();
                                return false;
                            } )
                            .append(
                                $( '<table>' )
                                    .append(
                                        $( '<tr>' )
                                            .append(
                                                $( '<td>' )
                                                    .append(
                                                        $( '<label>' )
                                                            .attr( 'for', 'cioItem' )
                                                            .append(
                                                                'Compare ',
                                                                $( '<b>' )
                                                                    .text( conf.wgTitle ),
                                                                ' with:'
                                                            )
                                                    ),
                                                $( '<td>' )
                                                    .append(
                                                        $( '<input>' )
                                                            .attr( {
                                                                type: 'input',
                                                                name: 'cioItem',
                                                                id: 'cioItem'
                                                            } )
                                                            .val( '' ),
                                                        '&nbsp;',
                                                        $( '<input>' )
                                                            .attr( 'type', 'submit' )
                                                            .val( 'Add' )
                                                    )
                                            ),
                                        $( '<tr>' )
                                            .append(
                                                $( '<td>' )
                                                    // &nbsp;, but in unicode so we can use .text()
                                                    .text( '\u00A0' ),
                                                $( '<td>' )
                                                    .attr( 'id', 'cioStatus' )
                                            )
                                    )
                            ),
                        $( '<table>' )
                            .addClass( 'wikitable' )
                            .attr( 'id', 'cioItems' )
                            .append(
                                $( '<thead>' )
                                    .append(
                                        $( '<tr>' )
                                            .append(
                                                $( '<th>' )
                                                    .attr( 'rowspan', '2' )
                                                    .text( 'Name' ),
                                                $( '<th>' )
                                                    .attr( 'colspan', '2' )
                                                    .text( 'Mainhand Info' ),
                                                $( '<th>' )
                                                    .attr( 'colspan', '2' )
                                                    .text( 'Offhand Info' ),
                                                $( '<th>' )
                                                    .attr( 'colspan', '4' )
                                                    .text( 'Attributes' ),
                                                $( '<th>' )
                                                    .attr( 'colspan', '3' )
                                                    .append(
                                                        $( '<span>' )
                                                            .css( 'font-size', '80%' )
                                                            .text( 'Damage Bonuses' )
                                                    ),
                                                $( '<th>' )
                                                    .attr( 'width', '30' )
                                                    .text( 'Speed' ),
                                                $( '<th>' )
                                                    .attr( 'width', '30' )
                                                    .text( 'Weight' ),
                                                $( '<th>' )
                                                    .attr( 'width', '30' )
                                                    .text( 'GE' )
                                            ),
                                        $( '<tr>' )
                                            .append(
                                                $( '<th>' )
                                                    .attr( 'width', '35' )
                                                    .append(
                                                        $( '<span>' )
                                                            .css( 'font-size', '80%' )
                                                            .text( 'Damage' )
                                                    ),
                                                $( '<th>' )
                                                    .attr( 'width', '35' )
                                                    .append(
                                                        $( '<span>' )
                                                            .css( 'font-size', '80%' )
                                                            .text( 'Accuracy' )
                                                    ),
                                                $( '<th>' )
                                                    .attr( 'width', '35' )
                                                    .append(
                                                        $( '<span>' )
                                                            .css( 'font-size', '80%' )
                                                            .text( 'Damage' )
                                                    ),
                                                $( '<th>' )
                                                    .attr( 'width', '35' )
                                                    .append(
                                                        $( '<span>' )
                                                            .css( 'font-size', '80%' )
                                                            .text( 'Accuracy' )
                                                    ),
                                                $( '<th>' )
                                                    .attr( 'width', '35' )
                                                    .text( 'Style' ),
                                                $( '<th>' )
                                                    .attr( {
                                                        width: '35',
                                                        title: 'Armour rating'
                                                    } )
                                                    .append(
                                                        $( '<img>' )
                                                            .attr( {
                                                                src: 'https://images.wikia.nocookie.net/runescape/images/thumb/d/d8/Defence-icon.png/18px-Defence-icon.png',
                                                                alt: 'Arm'
                                                            } )
                                                    ),
                                                $( '<th>' )
                                                    .attr( {
                                                        width: '35',
                                                        title: 'Life bonus'
                                                    } )
                                                    .append(
                                                        $( '<img>' )
                                                            .attr( {
                                                                src: 'https://images.wikia.nocookie.net/runescape/images/thumb/1/1d/Constitution-icon.png/21px-Constitution-icon.png',
                                                                alt: 'Lif'
                                                            } )
                                                    ),
                                                $( '<th>' )
                                                    .attr( {
                                                        width: '35',
                                                        title: 'Prayer bonus'
                                                    } )
                                                    .append(
                                                        $( '<img>' )
                                                            .attr( {
                                                                src: 'https://images.wikia.nocookie.net/runescape/images/2/24/Prayer-icon.png',
                                                                width: '20',
                                                                height: '20',
                                                                alt: 'Pra'
                                                            } )
                                                    ),
                                                $( '<th>' )
                                                    .attr( {
                                                        width: '35',
                                                        title: 'Strength bonus'
                                                    } )
                                                    .append(
                                                        $( '<img>' )
                                                            .attr( {
                                                                src: 'https://images.wikia.nocookie.net/runescape/images/9/90/Stab_Attack_Style.png',
                                                                width: '11',
                                                                height: '20',
                                                                alt: 'Dam'
                                                            } )
                                                    ),
                                                $( '<th>' )
                                                    .attr( {
                                                        width: '35',
                                                        title: 'Ranged bonus'
                                                    } )
                                                    .append(
                                                        $( '<img>' )
                                                            .attr( {
                                                                src: 'https://images.wikia.nocookie.net/runescape/images/7/72/Ranged-icon.png',
                                                                width: '20',
                                                                height: '20',
                                                                alt: 'Rng'
                                                            } )
                                                    ),
                                                $( '<th>' )
                                                    .attr( {
                                                        width: '35',
                                                        title: 'Magic bonus'
                                                    } )
                                                    .append(
                                                        $( '<img>' )
                                                            .attr( {
                                                                src: 'https://images.wikia.nocookie.net/runescape/images/7/77/Magic-icon.png',
                                                                width: '20',
                                                                height: '19',
                                                                alt: 'Mag'
                                                            } )
                                                    ),
                                                $( '<th>' )
                                                    .attr( {
                                                        width: '35',
                                                        title: 'Speed'
                                                    } )
                                                    .append(
                                                        $( '<img>' )
                                                            .attr( {
                                                                src: 'https://images.wikia.nocookie.net/runescape/images/a/a9/Energy.png',
                                                                width: '17',
                                                                height: '20',
                                                                alt: 'Spd'
                                                            } )
                                                    ),
                                                $( '<th>' )
                                                    .attr( {
                                                        width: '35',
                                                        title: 'Weight (kg)'
                                                    } )
                                                    .append(
                                                        $( '<img>' )
                                                            .attr( {
                                                                src: 'https://images.wikia.nocookie.net/runescape/images/8/85/Weight_icon.png',
                                                                width: '20',
                                                                height: '20',
                                                                alt: 'Wgt'
                                                            } )
                                                    ),
                                                $( '<th>' )
                                                    .attr( {
                                                        width: '35',
                                                        title: 'Grand Exchange Price'
                                                    } )
                                                    .append(
                                                        $( '<img>' )
                                                            .attr( {
                                                                src: 'https://images.wikia.nocookie.net/runescape/images/6/65/Coins_25.png',
                                                                width: '20',
                                                                height: '15',
                                                                alt: 'GE'
                                                            } )
                                                    )
                                            )
                                    ),
                                $( '<tbody>' )
                                    .append(
                                        $( '<tr>' )
                                            .attr( 'id', 'cioTotals' )
                                    )
                            )
                    );

                return $modal;
            },

            /**
             * Modal close method
             *
             * Removes events we added and hides/removes elements
             */
            close: function () {
                $( '#overlay' ).off( 'click' );
                $( '#modal' ).fadeOut( 'normal', function () {
                    $( '#modal' ).remove();
                    $( '#overlay' ).hide();
                } );

                $( document ).off( 'keydown', self.keyClose );
            },

            /**
             * Initial callback for adding new items to the UI
             *
             * @param elem {string} (optional)
             */
            submit: function ( elem ) {
                var item = elem || $( '#cioItem' ).val();

                $( '#cioStatus' )
                    .empty()
                    .attr( 'class', 'cioLoading' )
                    .append(
                        self.img.loading(),
                        ' Loading...'
                    );

                // make sure first letter of item is uppercase
                // otherwise price data won't be found
                item = item.charAt( 0 ).toUpperCase() + item.slice( 1 );
 
                ( new mw.Api() )
                    .get( {
                        action: 'query',
                        prop: 'revisions',
                        titles: item + '|Module:Exchange/' + item,
                        rvprop: 'content',
                        redirects: ''
                    } )
                    .done( self.done )
                    .fail( self.fail );

                return false;
            },

            /**
             * Success callback for `jQuery.ajax` promise
             */
            done: function ( data ) {
                var pages = data.query.pages,
                    bonuses = [
                        'maindamage',
                        'mainaccuracy',
                        'offdamage',
                        'offaccuracy',
                        'style',
                        'armour',
                        'life',
                        'prayer',
                        'strength',
                        'ranged',
                        'magic',
                        'aspeed'
                    ],
                    excg,
                    main,
                    x,
                    title,
                    content,
                    bonusData,
                    itemData,
                    excgData,
                    $tr;

                mw.log( data );

                for ( x in pages ) {
                    if ( pages.hasOwnProperty( x ) ) {
                        if ( x < 0 ) {
                            // the page does not exist
                            mw.log( pages[x] );
                            continue;
                        } else if ( pages[x].ns === 828 ) {
                            excg = pages[x];
                        } else if ( pages[x].ns === 0 ) {
                            main = pages[x];
                        }
                    }
                }

                if ( !main ) {
                    self.showError( 'Could not find that item.' );
                    return;
                }

                title = main.title;
                content = main.revisions[0]['*'];
                bonusData = self.parseTemplate( 'infobox bonuses', content );
                itemData = self.parseTemplate( 'infobox item', content );

                if ( excg ) {
                    excgData = self.parseModule( excg.revisions[0]['*'] );
                }

                if ( $.isEmptyObject( bonusData ) ) {
                    self.showError( 'No bonus data found for the item.' );
                    return;
                }

                $tr = $( '<tr>' )
                    .append(
                        $( '<th>' )
                            .append(
                                $( '<a>' )
                                    .attr( {
                                        href: '#',
                                        title: 'Remove this row'
                                    } )
                                    .on( 'click', function () {
                                        $( this ).closest( 'tr' ).fadeOut( 'slow', function () {
                                            $( this ).remove();
                                            self.calcTotals();
                                        } );

                                        return false;
                                    } )
                                    .append( self.img.del() ),
                                '&nbsp;',
                                $( '<a>' )
                                    .attr( {
                                        href: mw.util.wikiGetlink( title ),
                                        title: title
                                    } )
                                    .text( title )
                            )
                    );

                bonuses.forEach( function ( el ) {
                    $tr.append( self.format( bonusData[el] ) );
                } );

                $tr.append( self.format( !$.isEmptyObject( itemData ) ? itemData.weight : null ) );
                $tr.append( self.format( !$.isEmptyObject( excgData ) ? rs.addCommas( excgData.price ) : null ) );

                $( '#cioTotals' ).before( $tr );

                self.calcTotals();
                $( '#cioStatus' ).empty();
                $( '#cioItem' ).val( '' );
            },

            /**
             * Error callback for `jQuery.ajax` promise
             */
            fail: function ( _, error ) {
                self.showError( 'Error: ' + error );
            },

            /**
             * Outputs error to the UI
             *
             * @param str {string} Error to display
             */
            showError: function ( str ) {
                $( '#cioStatus' )
                    .empty()
                    .attr( 'class', 'cioError' )
                    .append(
                        self.img.error(),
                        ' ' + str
                    );
            },

            /**
             * Extracts parameter-argument pairs from templates
             *
             * Used for infobox bonuses, infobox item and exchangeitem
             * but should work for almost anything
             *
             * @todo This might be useful for other scripts
             *       perhaps move it to site js?
             * @todo Account for multiple templates?
             *
             * @param tpl {string} Template to extract data from
             * @param text {string} Text to look for template in
             *
             * @return {object} Object containing parameter-argument pairs
             */
            parseTemplate: function ( tpl, text ) {
                var rgx = new RegExp(
                        '\\{\\{(template:)?' + tpl.replace( /[ _]/g, '[ _]' ) + '\\s*(\\||\\}\\})',
                        'i'
                    ),
                    exec = rgx.exec( text ),
                    // splits template into |arg=param or |param
                    paramRgx = /\|(.*?(\{\{.+?\}\})?)(?=\s*\||$)/g,
                    args = {},
                    params,
                    i,
                    j;

                // happens if the template is not found in the text
                if ( exec === null ) {
                    return false;
                }

                text = text.substring( exec.index + 2 );

                // used to account for nested templates
                j = 0;

                // this purposefully doesn't use regex like the old script
                // as it became very difficult to make it work properly
                for ( i = 0; i < text.length; i++ ) {
                    if ( text[i] === '{' ) {
                        j++;
                    } else if ( text[i] === '}' ) {
                        if ( j > 0 ) {
                            j--;
                        } else {
                            break;
                        }
                    }
                }

                // cut off where the template ends
                text = text.substring( 0, i );
                // remove template name as we're not interested in it past this point
                text = text.substring( text.indexOf( '|' ) ).trim();
                // separate params and args into an array
                params = text.match( paramRgx );

                // handle no params/args
                // shouldn't happen but you never know what VE or RTE might do one day
                if ( params !== null ) {
                    // used as an index for unnamed params
                    i = 1;

                    params.forEach( function ( el ) {
                        var str = el.trim().substring( 1 ),
                            eq = str.indexOf( '=' ),
                            tpl = str.indexOf( '{{' ),
                            param,
                            val;

                        // checks if the equals is after opening a template
                        // to catch unnamed args that have templates with named args as params
                        if ( eq > -1 && ( tpl === -1 || eq < tpl ) ) {
                            param = str.substring( 0, eq ).trim().toLowerCase();
                            val = str.substring( eq + 1 ).trim();
                        } else {
                            param = i;
                            val = str.trim();
                            i++;
                        }

                        args[param] = val;
                    } );
                }

                return args;
            },

            /**
             * Alternate version of `parseTemplate` for parsing lua module data
             *
             * Only works for key-value pairs
             * but that'll do for exchange modules
             *
             * @param text {string} Text to parse
             *
             * @return {object} Object containing parameter-argument pairs
             */
            parseModule: function ( text ) {

                    // strip down to just key-value pairs
                var str = text
                        .replace( /return\s*\{/, '' )
                        .replace( /\}\s*$/, '' )
                        .trim(),
                    rgx = /\s*(.*?\s*=\s*(?:\{[\s\S]*?\}|.*?))(?=,?\n|$)/g,
                    args = {},
                    params = str.match( rgx );

                if ( params !== null ) {
                    params.forEach( function ( elem ) {
                        var str = elem.trim(),
                            eq = str.indexOf( '=' ),
                            param = str.substring( 0, eq ).trim().toLowerCase(),
                            val = str.substring( eq + 1 ).trim();

                        args[param] = val;
                    } );
                }

                return args;
            },

            /**
             * Formats each attribute's value and inserts it into a td cell
             *
             * @param str {string} Attribute value to format
             *
             * @return {jquery object} td cell to insert into the associated item's row
             */
            format: function ( str ) {
                var $td = $( '<td>' ),
                    first;

                // set `null` or `undefined` to an empty string
                /*jshint eqnull:true */
                if ( str == null ) {
                /* jshint eqnull:false */
                    str = '';
                }

                // remove comments
                str = str.replace( /no|<!--.*?-->/gi, '' ).trim();

                // cache first character of `str`
                first = str.substring( 0, 1 );

                if ( !str ) {
                    $td
                        .addClass( 'cioEmpty' )
                        .text( '--' );
                } else if ( /\d/.test( first ) ) {
                    $td
                        .addClass( 'cioPos' )
                        .text( '+' + str );
                } else if ( first === '-' ) {
                    $td
                        .addClass( 'cioNeg' )
                        .text( str );
                } else {
                    $td
                        .text( str );
                }

                return $td;
            },

            /**
             * Calculate bonus totals
             */
            calcTotals: function () {
                    // 14 0's, one for each attribute
                var totals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    $totals = $( '#cioTotals' );

                $( '#cioItems tbody tr:not( #cioTotals )' ).each( function () {
                    $( this ).children( 'td' ).each( function ( i ) {
                        var num = $( this ).text().replace( /,/g, '' );
                        totals[i] += ( isNaN( num ) ? 0 : parseInt( num, 10 ) );
                    } );
                } );

                $totals
                    .empty()
                    .append(
                        $( '<th>' )
                            .text( 'Total' )
                    );

                totals.forEach( function ( elem, index ) {
                    $totals.append(
                        self.format(
                            // don't total style or speed
                            // 4th and 11th index/column respectively
                            [4, 11].indexOf( index ) > -1 ? null : rs.addCommas( elem )
                        )
                    );
                } );
            },
        };

    mw.loader.using( ['mediawiki.util', 'mediawiki.api'], self.init );

} ( this.jQuery, this.mediaWiki, this.rswiki ) );