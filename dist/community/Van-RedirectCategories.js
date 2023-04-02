/**
 * Automatically redirect to local tracking categories on non-EN wikis when accessed from EN names
 * This is a Vanguard tool
 *
 * @author Rail <rail@fandom.com>
 */
;( function() {
    'use strict';

    const conf = mw.config.get( [
        'wgContentLanguage',
        'wgNamespaceNumber',
        'wgFormattedNamespaces',
        'wgTitle',
        'wgAction'
    ] );

    if (
        conf.wgAction !== 'view' ||
        conf.wgNamespaceNumber !== 14
    ) {
        return;
    }

    const self = {
        /**
         * Normalized page title to get rid of the "):" artifact
         */
        pageTitle: conf.wgTitle.replace( /(\):)?$/, '' ),

        /**
         * Sorry, no API to extract all of them automatically - had to hard define
         */
        trackingCategories: [
            {
                category: 'Pages containing omitted template arguments',
                id: 'post-expand-template-argument-category'
            },
            {
                category: 'Pages using duplicate arguments in template calls',
                id: 'duplicate-args-category'
            },
            {
                category: 'Pages with template loops',
                id: 'template-loop-category'
            },
            {
                category: 'Pages where template include size is exceeded',
                id: 'post-expand-template-inclusion-category'
            },
            {
                category: 'Noindexed pages',
                id: 'noindex-category'
            },
            {
                category: 'Pages with ignored display titles',
                id: 'restricted-displaytitle-ignored'
            },
            {
                category: 'Pages with too many expensive parser function calls',
                id: 'expensive-parserfunction-category'
            },
            {
                category: 'Pages where node count is exceeded',
                id: 'node-count-exceeded-category'
            },
            {
                category: 'Pages where expansion depth is exceeded',
                id: 'expansion-depth-exceeded-category'
            },
            {
                category: 'Pages with script errors',
                id: 'scribunto-common-error-category'
            },
            {
                category: 'Scribunto modules with errors',
                id: 'scribunto-module-with-errors-category'
            }
        ],

        /**
         * Not very optimal but easier scalable
         */
        isTrackingCategory: function() {
            const trackingCatsMap = self.trackingCategories.map(
                function( item ) {
                    return item.category;
                }
            );
            const titleRegex = new RegExp( trackingCatsMap.join( '|' ) );

            return titleRegex.test( self.pageTitle );
        },

        getTrackingCatKey: function( category ) {
            var retKey;

            self.trackingCategories.forEach( function( item ) {
                if ( item.category === category ) {
                    retKey = item.id;
                }
            } );

            return retKey;
        },

        init: function() {
            // Add a killswitch
            if ( mw.util.getParamValue( 'redirect' ) === 'no' || !self.isTrackingCategory() ) {
                return;
            }

            // Special case for EN wikis
            if ( conf.wgContentLanguage === 'en' ) {
                if ( conf.wgTitle.slice( -2 ) === '):' ) {
                    location.replace(
                        mw.util.getUrl( 'Category:' + self.pageTitle )
                    );
                }
                return;
            }

            new mw.Api().get( {
                action: 'query',
                formatversion: 2,
                meta: 'allmessages',
                ammessages: self.getTrackingCatKey( self.pageTitle ),
                amlang: conf.wgContentLanguage
            } ).done( function( resp ) {
                const localCategoryName = resp.query.allmessages[0].content;
                const localNamespaceName = conf.wgFormattedNamespaces[14];

                location.replace(
                    mw.util.getUrl( localNamespaceName + ':' + localCategoryName )
                );
            } );
        }
    };

	window.redirectTrackingCats = self;
    mw.loader.using( [ 'mediawiki.api', 'mediawiki.util' ] ).then( self.init );
} )();