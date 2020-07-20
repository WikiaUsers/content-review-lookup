
/** <nowiki> * Standard edit summaries
 * 
 * @author Sikon    <http://starwars.fandom.com/wiki/User:Sikon>
 * @author Ryan PM  <http://rs.fandom.com/wiki/User:Ryan_PM>
 * @author Quarenon <http://rs.fandom.com/wiki/User:Quarenon>
 * @author Eladkse  <http://casualty.fandom.com/wiki/User:Eladkse>
 * @author Cqm      <http://rs.fandom.com/wiki/User:Cqm>
 */
 
;( function ( $, mw ) {
 
    'use strict';
 
    var conf = mw.config.get( [
            'skin',
            'wgAction'
        ] ),
        sums = [
            // lines that begin with -- are summaries to be selected
            // lines that don't are un-selectable headers
            'Refactoring',
            '-- Cleanup',
            '-- Corrected spelling/grammar',
            '-- Factual correction',
            '-- Formatting',
            '-- HTML tidying',
            '-- Wikifying',
            '-- Corrected template usage',
            'Content',
            '-- Updated with new information',
            '-- Updated Missions',
            '-- Expanded',
            '-- Revised',
            '-- Added sources/appearances',
            '-- NPOV',
            '-- Replaced duplicate image(s)',
            'Removal/Reversion',
            '-- Reverted vandalism',
            '-- Reverted test edit',
            '-- Reverted vanity edit',
            '-- Removed fanon',
            '-- Removed libel/slander',
            '-- Removed copyvio',
            'Templates',
            '-- Added template(s)',
            '-- Added infobox',
            '-- Added disambig template',
            '-- Added quote',
            '-- Modified quotes',
            'Categories',
            '-- Added category',
            '-- Modified category',
            '-- Alphabetised categories',
            '-- Removed category',
        ],
        self = {
            /**
             * Loading function
             */
            init: function () {
                if ( ['edit', 'submit'].indexOf( conf.wgAction ) > -1 ) {
                    self.parseSummaries();
                }
            },
 
            /**
             * Load the summaries
             */
            parseSummaries: function () {
 
                var opts ='<option value="(browse)">(Browse standard summaries)</option>',
                    val,
                    i;
 
                for ( i = 0; i < sums.length; i++ ) {
                    switch ( 0 ) {
                        case sums[i].indexOf( '--' ):
                            val = sums[i].substring( 2 ).trim();
                            opts += '<option value="' + val + '">&nbsp;&nbsp;' +
                            val + '</option>';
                            break;
 
                        default:
                            val = sums[i].trim();
                            opts += '<option disabled="disabled">' + val + '</option>';
                            break;
                    }
                }
 
                self.insertModule( opts );
 
            },
 
            /**
             * Inserts the module into the edit area
             */
            insertModule: function ( list ) {
 
                var $module = $( '<div>' )
                    .attr( 'id', 'stdSummaries' )
                    .append(
                        $( '<select>' )
                            .attr( 'id', 'stdSummaries-dropdown' )
                            .append( list )
                            .change( function () {
                                var val = $( this ).val();
                                if ( val === '(browse)' ) {
                                    return;
                                }
                                $( '#wpSummary' ).val( val );
                            } )
                    ),
                    $label = $( '#wpSummaryLabel' );
 
                if ( ['oasis', 'wikia'].indexOf( conf.skin ) > -1 ) {
                    $label.after( $module );
                } else if ( conf.skin === 'monobook' ) {
                    $label.before( $module );
                }
            }
 
        };
 
    $( self.init );
 
}( jQuery, mediaWiki ) );