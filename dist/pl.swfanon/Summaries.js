/** <nowiki>
 * Standard edit summaries
 * 
 * @author Sikon    <http://starwars.wikia.com/wiki/User:Sikon>
 * @author Ryan PM  <http://rs.wikia.com/wiki/User:Ryan_PM>
 * @author Quarenon <http://rs.wikia.com/wiki/User:Quarenon>
 * @author Eladkse  <http://casualty.wikia.com/wiki/User:Eladkse>
 * @author Cqm      <http://rs.wikia.com/wiki/User:Cqm>
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
            'Zmiana w artykule.',
            '-- Artykuł polecany.',
            '-- Artykuł dobry.',
            '-- Dodanie autora.',
            '-- Dodanie grafiki.',
            '-- Dodanie infoboksu.',
            '-- Dodanie kategorii.',
            '-- Dodanie szablonu nagłówkowego.',
            '-- Kasowanie.',
            '-- Ostrzeżenie przed banem.',
            '-- Poprawa wikitekstu.',
            '-- Rozbudowa artykułu.',
            '-- Stylistyczna poprawka.',
            '-- Utworzenie artykułu.',
            '-- Weryfikacja.',
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
 
                var opts ='<option value="(browse)">(Wybierz standardowy opis zmian.)</option>',
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