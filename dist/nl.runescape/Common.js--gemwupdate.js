/** <nowiki>
 * GE price update script
 *
 * Allows semi-automatic price updates by pulling price from GED API
 *
 * Can be configured for manual price updates for when the GED stops updating
 * either partially or completely, see [[RS:EXCHANGE]] for more help.
 *
 * @author Quarenon
 * @author Joeytje50
 * @author Cqm
 *
 * @todo Track manual updates using AF which triggers when:
 *       - Manual updates are enabled selectively
 *       - The GED doesn't return a price via it's API and the user enters a custom price
 * @todo Add click handler to update link in infoboxes, per the original design
 *       @see [[Forum:GEMW_Script]]
 *
 * @notes [[User:TehKittyCat]] sent in an email recommending Jagex add CORS headers
 *        to their APIs, so we can ditch the use of anyorigin, etc.
 *        Hopefully we can get that for Christmas 2015
 */

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
            vol: null,
            gePage: null,
            volPage: null,

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
                            .text( 'Prijs bijwerken' )
                            .on( 'click', self.submit ),
                        '&nbsp;Voor hulp of om problemen te melden, gelieve een bericht te plaatsen ',
                        $( '<a>' )
                            .attr( {
                                'href': 'wiki/RuneScape_Wiki:Administrator_nodig',
                                'title': 'RuneScape Wiki:Administrator nodig'
                            } )
                            .text( 'op deze pagina' ),
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
                    .text( 'Prijs bijwerken' );
            },

            /**
             * Click event handler for update button
             */
            submit: function () {

                mw.log( 'Prijs aan het updaten...' );

                var $update = $( '#updateGEPrice' ),
                    price,
                    curprice,
                    variance;

                // trying to stop the event handler being called twice
                // not sure what's causing it
                if ( $update.prop( 'disabled' ) ) {
                    mw.log( 'Error: Al aan het updaten' );
                    return false;
                }

                $( '#updateGEPrice' )
                    .prop( 'disabled', true )
                    .text( 'Bezig...' );

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

                        // volumes don't update when GED is down
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

                mw.log( 'Prijsdata ophalen' );

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

                        // @todo pull price and last date from the module page
                        //       to avoid someone updating with an old pageload (from before the price last updated)
                        curprice = parseInt( $( '#GEPrice' ).text().replace( /,/g, '' ), 10 );

                        // convert milliseconds to seconds
                        now = Math.round( now / 1000 );

                        // when exchange pages are created
                        // they should have price, date, last and lastdate filled out
                        // @example price=$price, date=$date, last=$price, lastdate=$date
                        curdate = Math.round( new Date( $( '#GEDate' ).text() ) / 1000 );

                        // we update our version after the GED updates
                        // hence `curdate` (when we updated here) will be greater than
                        // `now` (when the GED updated) if we're on the most current price
                        if ( price === curprice && curdate > now ) {
                            self.showError( 'De prijs is al dezelfde als die van de officiële GE database.' );
                            return;
                        }

                        // set these so we don't have to keep passing them to functions
                        // that don't use or modify their value
                        self.price = price;
                        self.data = data;

                        self.getVols();

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
             * Only used with `self.getPrice`, the result returned by volume data is 
             * more annoying to deal with
             *
             * @param data {object} Data returned from $.ajax call
             * @param via {string} Domain used for cross domain query
             *                     Corresponds to `via` argument in `self.crossDomain`
             *
             * @returns {object} Parsed JSON result
             */
            parseData: function ( data, via ) {
                if ( via === 'yahoo' ) {
                    return JSON.parse( data.query.results.html.body.p );
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

                mw.log( 'Prijsupdate indienen' );

                var api = new mw.Api();

                api
                    .get( {
                        action: 'query',
                        prop: 'info|revisions',
                        intoken: 'edit',
                        titles: 'Module:Exchange/' + conf.wgTitle + '|Module:Exchange/' + conf.wgTitle + '/Data',
                        rvprop: 'content|timestamp',
                    } )
                    .done( function ( data ) {

                        mw.log( data );

                        $.each( data.query.pages, function ( k, v ) {
                            if ( v.title.indexOf( '/Data' ) > -1 ) {
                                self.volPage = data.query.pages[k];
                            } else {
                                self.gePage = data.query.pages[k];
                            }
                        } );

                        var x = self.gePage,
                            text = x.revisions[0]['*'],
                            // assume pages have price, last, date and lastdate
                            // filled out on creation
                            re = {
                                // regexes for matching current price data
                                price: /price\s*=\s*(\d*)/i,
                                last: /last\s*=\s*(\d*)/i,
                                date: /date\s*=\s*'(.*?)'/i,
                                lastdate: /lastdate\s*=\s*'(.*?)'/i,
                                vol: /volume\s*=\s*(\d*\.?\d?)/i,
                                voldate: /volumedate\s*=\s*'(.*?)'/i
                            },
                            params = {
                                minor: 'yes',
                                summary: 'Grand Exchange data bijgewerkt via script op de Exchange pagina.',
                                action: 'edit',
                                title: 'Module:Exchange/' + conf.wgTitle,
                                basetimestamp: x.revisions[0].timestamp,
                                starttimestamp: x.starttimestamp,
                                token: x.edittoken,
                                // don't add module page to watchlist
                                watchlist: 'nochange'
                            };

                        // update text with new values
                        // and move existing values to 'old' values
                        // @example price -> last
                        //          date -> lastdate
                        text = text
                            .replace(
                                // first generate the match group
                                re.last,
                                // next generate the string to replace with
                                text
                                    // extract the specific part to replace
                                    // essentially the same as the first argument in our replace
                                    .match( re.last )[0]
                                    // then swap the old value for the new value
                                    .replace(
                                        // generate a string for the old value
                                        text.match( re.last )[1],
                                        // generate a string for the new value
                                        text.match( re.price )[1]
                                    )
                            )
                            .replace(
                                re.lastdate,
                                text
                                    .match( re.lastdate )[0]
                                    .replace(
                                        text.match( re.lastdate )[1],
                                        text.match( re.date )[1]
                                    )
                            )
                            .replace(
                                re.price,
                                text
                                    .match( re.price )[0]
                                    .replace(
                                        text.match( re.price )[1],
                                        self.price
                                    )
                            )
                            .replace(
                                re.date,
                                text
                                    .match( re.date )[0]
                                    .replace(
                                        text.match( re.date )[1],
                                        '~~~~~'
                                    )
                            );

                        if ( self.vol ) {
                            text = text
                                .replace(
                                    re.vol,
                                    text
                                        .match( re.vol )[0]
                                        .replace(
                                            text.match( re.vol )[1],
                                            self.vol
                                        )
                                )
                                .replace(
                                    re.voldate,
                                    text
                                        .match( re.voldate )[0]
                                        .replace(
                                            text.match( re.voldate )[1],
                                            '~~~~~'
                                        )
                                );
                        }

                        params.text = text;

                        mw.log( params );

                        api
                            .post( params )
                            .done( function ( data ) {
                                if ( data.edit && data.edit.result === 'Success' ) {
                                    if ( self.data ) {
                                        // don't update /Data pages with manual update enabled
                                        self.updateData();
                                        return;
                                    } else {
                                        alert( 'Bedankt voor je bijdrage! Deze pagina wordt nu opnieuw geladen.' );
                                        if ( !mw.config.get( 'debug' )  ) {
                                            location.replace( '?action=purge' );
                                        }
                                        return;
                                    }
                                }

                                // normally this is an api error of some description
                                self.showError( 'Er is een fout gebeurd bij het verwerken van de bewerking.' );
                                mw.log( data );
                            } );
                    } );

            },

            /**
             * Attempt to find volume data for item
             */
            getVols: function () {

                if ( !$( '#volumeData' ).length ) {
                    // to save time, don't make this call unless we need to
                    // additionally, this stop errors where an item has not had
                    // volume data before where we attempt to update non-existent params
                    // AzBot has a database of volumes, so it should be able to handle that case
                    mw.log( 'Skipping volume data check as no previous data has been found.' );
                    self.submitUpdate();
                    return;
                }

                mw.log( 'Checking for volume data' );

                $
                    .getJSON(
                        // yahoo parses html into an object which you can't the pass to jquery
                        // so only use anyorigin or whateverorigin for this
                        self.crossDomain( 'http://services.runescape.com/m=itemdb_rs/top100.ws' )
                    )
                    .done( function ( resp ) {

                        if ( !resp.contents ) {
                            self.submitUpdate();
                        }

                        // the data is stored in a table of the top 100 most traded items
                        // so we need to manipulate the html to access it
                        var $tr = $( resp.contents ).find( 'tbody > tr' ),
                            vols = {};

                        $tr.each( function () {
                            // we need the item id and the total volume traded
                            // which can both be found in the last cell of each row
                            // as of 29-09-2014
                            // @todo check this periodically
                            var $a = $( this ).children( 'td' ).last().children( 'a' ),
                                // the id can be found in the href of the anchor tag
                                // @example .../viewitem.ws?obj=12345
                                id = $a.attr( 'href' ).match( /obj=(\d+)/ )[1],
                                vol = $a.text();

                            vols[id] = self.bilToMil( vol );
                        } );

                        // check if the item appears on the list of most traded items
                        if ( vols[$( '#GEDBID' ).text()] ) {
                            mw.log( 'Volume data found for item.');
                            self.vol = vols[$( '#GEDBID' ).text()];
                        }

                        self.submitUpdate();

                    } );

            },

            /**
             * Converts billions to millions
             * As millions is what we use in our exchange graphs for volume data
             *
             * @param num {str} num Number to convert
             *
             * @returns {number} Converted number
             */
            bilToMil: function ( num ) {
                var mb = num.match( /[a-z]/i ),
                    mult = mb && mb[0] === 'b' ? 1000 : 1;

                // @notes parseFloat strips the trailing m or b
                return parseFloat( num, 10 ) * mult;
            },

            /**
             * Updates /Data subpages
             *
             * By this point we've established that there's at least one data point to add
             * but we're also updating any other missing data
             */
            updateData: function () {

                // delete the main item page
                // leaving just the /Data page

                mw.log( 'Attempting to update /Data page.' );

                var api = new mw.Api(),
                    x = self.volPage,
                    params = {
                        minor: 'yes',
                        summary: 'Grand Exchange data bijgewerkt via script op de Exchange pagina.',
                        action: 'edit',
                        title: 'Module:Exchange/' + conf.wgTitle + '/Data',
                        basetimestamp: x.revisions[0].timestamp,
                        starttimestamp: x.starttimestamp,
                        token: x.edittoken,
                        // don't add module page to watchlist
                        watchlist: 'nochange'
                    },
                    points =  x.revisions[0]['*']
                            .replace( 'return {', '' )
                            .replace( '}', '' )
                            .replace( /,/g, '' )
                            .trim()
                            .split( '\n' ),
                    data = Object.keys( self.data ).sort( self.compareNums ),
                    last,
                    i,
                    j = 0,
                    tv;

                // convert into usable datapoints
                data.forEach( function ( elem, i, arr ) {
                    arr[i] = parseInt( elem, 10 ) / 1000 + ':' + self.data[elem];
                } );

                // add volume to last point if it exists
                if ( self.vol ) {
                    data[data.length - 1] += ':' + self.vol;
                }

                // we need to compare the contents of points and data
                // if there's a element in data that isn't found in points
                // add it to the end
                // this won't verify or modify any of the existing data
                // as re-organising could cause issues with volume data (if it exists)
                last = parseInt( points[points.length - 1].replace( /'/g, '' ).split( ':' )[0], 10 );
                if ( isNaN( last ) ) {
                    // happens when no data is found on exchange page
                    last = 0;
                    points = [];
                }

                // @todo iterate from the end of data
                //       to make this a bit faster
                for ( i = 0; i < data.length; i++ ) {
                    tv = data[i].split( ':' );
                    if ( parseInt( tv[0], 10 ) > last && parseInt( tv[1], 10 ) > 0 ) {
                        points.push( '\'' + data[i] + '\'' );
                        j++;
                    }
                }

                mw.log( j + ' new data points found.' );

                // remove indent from each data point
                points.forEach( function ( elem, index, arr ) {
                    arr[index] = elem.trim();
                } );

                params.text = 'return {\n    ' + points.join( ',\n    ' ) + '\n}';

                mw.log( params );

                api
                    .post( params )
                    .done( function ( data ) {
                        if ( data.edit && data.edit.result === 'Success' ) {
                            alert( 'Bedankt voor je bijdrage! Deze pagina wordt nu opnieuw geladen.' );
                            if ( !conf.debug ) {
                                location.replace( '?action=purge' );
                            }
                            return;
                        }

                        // normally this is an api error of some description
                        self.showError( 'Er is een fout gebeurd bij het verwerken van de bewerking.' );
                        mw.log( data );
                    } );
            }
        };

    $( self.init );

}( jQuery, mediaWiki ) );