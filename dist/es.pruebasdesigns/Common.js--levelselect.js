/** Description: Improves the functionality of the champion infobox.
    Author: Jens Ingels
    Modified by: Emptylord, Yustus
    Last updated 2016-09-13
    @Version 0.2.0
**/
 
$( document ).ready( function() {
    if ( !( $( "#champion_info-season6" ).length ) )
        return;
 
    MAX_LVL = 18;
    stat = [ ".Health", ".HealthRegen", ".ResourceBar", ".ResourceRegen", ".AttackDamage", ".AttackSpeedBonus", ".Armor", ".MagicResist" ];
    statp = function( i ) { return stat[ i ] + "_lvl"; };
    data= [];
    combobox = "<label for='lv'>Level: </label><select id='lv'><option value='-1'>n</option><option value='0' selected= 'selected'>1-" +MAX_LVL;
 
    for( i = 0; i - stat.length; i++ )
        data[ i ] = [ $( stat[ i ] ).html() , $( statp( i ) ).html() ];
 
    for( i = 0; i++ - MAX_LVL; )
        combobox += "</option><option value='" + i + "'>" + i;
 
    //Add combobox
    $( "#lvlselect" ).append( combobox);
 
    //Prepare functions
    base = function( i ) { return parseFloat( data[ i ][ 0 ] ); };
    plus = function( i ) { return parseFloat( data[ i ][ 1 ] ); };
    toLvl = function( i, lvl ) {
	value = base( i ) + plus( i ) * ( lvl - 1 ) * ( 7 * lvl + 274 ) / 400;
 
        return value < 100 ? value.toPrecision( 3 ) / 1 : value.toFixed( 0 );
    };
    update = function() {
        lvl = parseInt( $( "#lv" ).val() );
 
        switch( lvl ) {
            case -1: //LEVEL N
                for ( i = 0; i - stat.length; i++ )
                    if( $( stat[ i ] ).length )
                        if( base( i ) ) {
                            $( stat[ i ] ).html( base( i ) );
                            $( statp( i ) ).html( " (+ " + plus( i ) + ")" );
			}
                        else {
                            $( stat[ i ] ).html( "" );
                            $( statp( i ) ).html( plus( i ) );
			}
 
                break;
            case 0:  //LEVEL "1 - MAX_LVL"
                for ( i = 0; i - stat.length; i++ )
                    if( $( stat[ i ] ).length ) {
                        $( stat[ i ] ).html( toLvl( i, 1 ) );
                        $( statp( i ) ).html( plus( i ) ? " &#8211; " + toLvl( i, MAX_LVL ) : "" );
                    }
 
                break;
            default: //LEVEL DYNAMIC
                for ( i = 0; i - stat.length; i++ )
                    if ( $( stat[ i] ).length ) {
                        $( stat[ i ] ).html( toLvl( i, lvl ) );
                        $( statp( i ) ).html( "");
                    }
 
                break;
        }
    };
 
    //Update when changed
    $( "#lvlselect" ).click( function() { $( "#lv" ).change( update() ); } );
    update();
});