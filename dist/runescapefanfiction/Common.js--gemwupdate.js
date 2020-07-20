;( function ( $, mw ) {
 
    'use strict';
 
    var 
        // begin manual configuration settings
 
        /**
         * To enable manual updates on every page, set `manual` to `true`
         * and `manualPages` to `[]`
         *
         * To enable manual updates on a specific pages, set
         * `manual` to `true` and populate `manualPages` with the pages to have
         * manual updates
         * @example manualPages = ['Acorn', 'Weird gloop']
         *
         * To disable manual updates, set `manual` to `false` and
         * `manualPages` to `[]`
         *
         * The manual update form will load for everyone, not just autoconfirmed users
         * So remember to disable [[Special:AbuseFilter/39]] when setting manual updates
         * and to enable it if disabling them
         *
         * Don't forget to keep the trailing commas at the end of the lines
         *
         * Remember to use spaces in pages added to `manualPages`, not underscores,
         * check you're using the correct capitalisation, and don't include the namespace
         */
        manual = false,
        manualPages = [],
 
        /*
        // examples
 
        // manual disabled
        manual = false,
        manualPages = [],
 
        // manual enabled everywhere
        manual = true,
        manaualPages = [],
 
        // manual enabled selectively
        manual = true,
        manualPages = ['Acorn', 'Iron bar'],
        */
 
        // end manual configuration settings
 
        /**
         * Cache mw.config variables
         */
        conf = mw.config.get( [
                'debug',
                'wgNamespaceNumber',
                'wgTitle',
                'wgUserGroups'
            ] ),
 
        /**
         * Main function object
         */
        self = {
            // placeholders for data
            // used to avoid unnecessarily passing variables through functions
            // that don't use or modify them
            data: null,
            price: null,
            gePage: null,
 
            /**
             * Used by Array.prototype.sort for sorting numbers by size
             *
             * @source <http://mdn.io/sort#Example:_Creating.2C_displaying.2C_and_sorting_an_array>
             */
            compareNums: function ( a, b ) {
                return a - b;
            },
 
            /**
             * Loads the update button/form
             */
            init: function () {
                // check we're in the exchange ns
                if ( conf.wgNamespaceNumber !== 112 ) {
					return;
                }
				// check we're not on a subpage
                if ( conf.wgTitle.indexOf( '/' ) !== -1 ) {
                    return;
                }
 
                var $guide = $( '#gemw_guide' ),
                    $input = '';
 
                if (
                    // add a number input if manually updating is enabled
                    manual &&
                    // if `manualPages` is empty then load on all pages
                    // else load only on pages `manualPages` specifies
                    ( !manualPages.length || manualPages.indexOf( conf.wgTitle ) !== -1 )
                ) {
                    $input = $( '<input>' )
                        .attr( {
                            'id': 'manualGEPrice',
                            'type': 'text'
                        } );
                    mw.log( 'Manual GE updating enabled.' );
                } else {
                    // don't load semi-automatic form for anons/new users
                    // per <http://rs.wikia.com/Forum:Allow_users_to_edit_Exchange_namespace>
                    if ( conf.wgUserGroups.indexOf( 'autoconfirmed' ) === -1 ) {
                        return;
                    }
                }
 
                $guide
                    .empty()
                    .append(
                        $input,
                        $( '<button>' )
                            .attr( 'id', 'updateGEPrice' )
                            .text( 'Update item price' )
                            .on( 'click', self.submit ),
                        '&nbsp;For help with exchange pages or to report errors, please post ',
                        $( '<a>' )
                            .attr( {
                                'href': '/wiki/RuneScape:Administrator_requests',
                                'title': 'RuneScape:Administrator requests'
                            } )
                            .text( 'here' ),
                        '.'
                    );
            },
 
            /**
             * Outputs an error to the user and resets the update form
             *
             * @param msg {string} Message to output to user
             */
            showError: function ( msg ) {
                alert( msg );
 
                $( '#updateGEPrice' )
                    .prop( 'disabled', false )
                    .text( 'Update item price' );
            },
 
            /**
             * Click event handler for update button
             */
            submit: function () {
                var $update = $( '#updateGEPrice' ),
                    price,
                    curprice,
                    variance;
 
                // trying to stop the event handler being called twice
                // not sure what's causing it
                if ( $update.prop( 'disabled' ) ) {
                    mw.log( 'Error: Already updating' );
                    return false;
                }
 
                $( '#updateGEPrice' )
                    .prop( 'disabled', true )
                    .text( 'Updating...' );
 
                // make sure mediawiki.api is loaded
                // largely for anons, who don't have it loaded by default
                mw.loader.using( ['mediawiki.api'], function () {
                    if ( manual ) {
                        price = $( '#manualGEPrice' )
                            .val()
                            .trim()
                            .replace( /,/g, '' );
                        price = parseInt( price, 10 );
 
                        // NaN is strange
                        // <http://stackoverflow.com/questions/8965364/comparing-nan-values-for-equality-in-javascript>
                        // so we'll do this
                        if ( isNaN( price ) || price > 0 && price % 1 !== 0 ) {
                            self.showError( 'Input must be an integer above 0.' );
                            return;
                        }
 
                        curprice = parseInt( $( '#GEPrice' ).text().replace( /,/g, '' ), 10 );
                        variance = price / curprice;
 
                        // allow 0.2 variance on the previous price for manual updates
                        // make sure price change is greater than 1 for this to apply
                        // don't apply this to sysop/custodians
                        if (
                            !(
                                conf.wgUserGroups.indexOf( 'sysop' ) !== -1 ||
                                conf.wgUserGroups.indexOf( 'custodian' ) !== -1
                            ) &&
                            ( Math.abs( curprice - price ) > 1 ) &&
                            ( variance > 0.8 || variance < 1.2 )
                        ) {
                            // @todo think of a better error message for this
                            self.showError( 'New price is outside variance limits' );
                            return;
                        }
 
                        self.price = price;
                        self.submitUpdate();
                    } else {
                        self.getPrice();
                    }
 
                    return false;
                } );
            },
 
            /**
             * Queries the GED API for the current price
             */
            getPrice: function () {
                var id = $( '#GEDBID' ).text(),
                    url = 'http://services.runescape.com/m=itemdb_rs/api/graph/' + id + '.json',
                    via = 'anyorigin',
                    getUrl = self.crossDomain( url, via );
 
                $.getJSON( getUrl )
                    .done( function ( response ) {
 
                        var data = self.parseData( response, via ).daily,
							keys = Object.keys( data ),
                            curprice = parseInt( $( '#GEPrice' ).text().replace( /,/g, '' ), 10 ),
                            variance,
                            now,
                            price,
                            curdate;
 
                        // make sure we're selecting the most current price
                        // identified by the key with the biggest number
                        // because the keys are in unix time
                        keys.sort( self.compareNums );
 
						now = !!keys.length ? keys[keys.length - 1] : 0;
 
                        // also handles GED errors that cause the price to be set to 0
                        // started happening ~May '15
                        if ( now === 0 || data[now] <= 0 ) {
                            // occurs when the GED doesn't contain data or only contains zeroes
                            // happened when writing the previous version of this script
                            // not sure if it still happens
                            // @todo modify edit summary so we can track this through AF
 
                            // fallback for if the price isn't in the GED
                            price = prompt( 'The Grand Exchange Database did not have a price stored at  the moment. Please check the item\'s price in-game, and enter it below.' );
                            price = parseInt( price, 10 );
 
                            // check something that isn't a number hasn't been entered
                            if ( isNaN( price ) || price > 0 && price % 1 !== 0 ) {
                                self.showError( 'Input must be an integer above 0.' );
                                return;
                            }
 
                            // allow 0.2 variance on the previous price for manual updates
                            variance = price / curprice;
 
                            if (
                                !(
                                    conf.wgUserGroups.indexOf( 'sysop' ) !== -1 ||
                                    conf.wgUserGroups.indexOf( 'custodian' ) !== -1
                                ) &&
                                ( Math.abs( curprice - price ) > 1 ) &&
                                ( variance > 0.8 || variance < 1.2 )
                            ) {
                                // @todo think of a better error message for this
                                self.showError( 'New price is outside variance limits' );
                                return;
                            }
                        } else {
                            // convert back to string
                            now += '';
                            price = data[now];
                        }
 
                        //to avoid someone updating with an old pageload (from before the price last updated)
                        curprice = parseInt( $( '#GEPrice' ).text().replace( /,/g, '' ), 10 );
 
                        // convert milliseconds to seconds
                        now = Math.round( now / 1000 );
 
                        // we update our version after the GED updates
                        // hence `curdate` (when we updated here) will be greater than
                        // `now` (when the GED updated) if we're on the most current price
                        if ( price === curprice) {
                            self.showError( 'The price is already the same as the price on the official GE database.' );
                            return;
                        }
 
                        // set these so we don't have to keep passing them to functions
                        // that don't use or modify their value
                        self.price = price;
                        self.data = data;
 
                        self.submitUpdate();
                    } );
            },
 
            /**
             * Wrapper for cross domain queries
             *
             * @param url {string} URL to request
             * @param via {string} Domain to use for request
             *                     Can be one of 'yahoo', 'anyorigin' or 'whateverorigin'
             *                     Defaults to 'whateverorigin'
             *
             * @returns {string} URL to pass to $.ajax
             */
            crossDomain: function ( url, via ) {
                if ( via === 'yahoo' ) {
					return 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20"' + encodeURIComponent( url ) + '"%20and%20xpath%3D"*"&format=json&_maxage=900';
                } else if ( via ==='anyorigin' ) {
                    return 'http://anyorigin.com/get?url=' + encodeURIComponent( url ) + '&callback=?';
                } else {
                    return 'http://whateverorigin.org/get?url=' + encodeURIComponent( url ) + '&callback=?';
                }
            },
 
            /**
             * Helper for parsing response returned by using url returned by `self.crossDomain`
             *
             * @param data {object} Data returned from $.ajax call
             * @param via {string} Domain used for cross domain query
             *                     Corresponds to `via` argument in `self.crossDomain`
             *
             * @returns {object} Parsed JSON result
             */
            parseData: function ( data, via ) {
                if ( via === 'yahoo' ) {
                    return JSON.parse( data.query.results.html.body );
                } else if ( via === 'anyorigin' ) {
                    return data.contents;
                } else {
                    return JSON.parse( data.contents );
                }
            },
 
            /**
             * Submits the price update
             */
            submitUpdate: function () {
 
                var api = new mw.Api();
 
                api
                    .get( {
                        action: 'query',
                        prop: 'info|revisions',
                        intoken: 'edit',
                        titles: 'Exchange:'+conf.wgTitle,
                        rvprop: 'content|timestamp',
                    } )
                    .done( function ( data ) {
                        $.each( data.query.pages, function ( k, v ) {
                            self.gePage = data.query.pages[k];
                        } );
 
                        var x = self.gePage,
 
							text = x.revisions[0]['*'],
                            // assume pages have price filled out on creation
                            re = {
                                // regular expresions for matching current price data
                                price: /price\s*=\s*(\d*[,?\d*]*)/i
                            },
                            params = {
                                minor: 'yes',
                                summary: 'Updated GEMW data via script on the exchange page.',
                                action: 'edit',
                                title: 'Exchange:'+conf.wgTitle,
                                basetimestamp: x.revisions[0].timestamp,
                                starttimestamp: x.starttimestamp,
                                token: x.edittoken,
                                // don't add exchange page to watchlist
                                watchlist: 'nochange'
                            };
 
                        // update text with new values
						text = text
                            .replace(
                                re.price,
                                text
                                    .match( re.price )[0]
                                    .replace(
                                        text.match( re.price )[1],
                                        self.price
                                    )
                            );
                        params.text = text;
 
                        api
                            .post( params )
                            .done( function ( data ) {
                                if ( data.edit && data.edit.result === 'Success' ) {
 
                                    if ( !self.data ) {
                                        return;
                                    } else {
                                        alert( 'Thank you for your submission! The page will now be reloaded.' );
                                        if ( !mw.config.get( 'debug' )  ) {
                                            location.replace( '?action=purge' );
                                        }
                                        return;
                                    }
                                }
 
                                // normally this is an api error of some description
                                self.showError( 'An error occurred while submitting the edit.' );
                                mw.log( data );
                            } );
                    } );
            }
        };
 
    $( self.init );
 
}( jQuery, mediaWiki ) );