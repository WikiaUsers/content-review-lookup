/* Any JavaScript here will be loaded for users using the mobile site */

/* Any JavaScript here will be loaded for users using the mobile site */

/******************************
/* Item talent user interface *
/******************************/
var itui = itui || {
  initialize : function () {
    var interfaceIndex = 0;
    var cellIndex = 0;
    var talentIndex = 0;
    var list, label, details;
    $( ".itemTalents" ).each( function() {
      $( this ).addClass( "js-enabled" );
      $( this ).attr( "id", "itemTalents_" + interfaceIndex );
      $( this ).append( $( '<div id="itemTalentLists_' + interfaceIndex + '" class="itemTalentLists"></div>' ) );
      $( this ).append( $( '<div id="itemTalentDisplay_' + interfaceIndex + '" class="itemTalentDisplay"></div>' ) );
      $( this ).find( ".itemTalentCell" ).each( function() {
        if ( $.trim( $( this ).html() ) != "" ) {
          $( this ).attr( "id", "itemTalentCell_" + cellIndex );
          list = $( '<div id="itemTalentList_' + cellIndex + '" class="itemTalentList"></div>' );
          if ( cellIndex > 0 ) {
            list.hide();
          } else {
            $( this ).addClass( "selected" );
          }
          list.html( $( this ).html() );
          $( this ).html( "&nbsp;" );
          $( "#itemTalentLists_" + interfaceIndex ).append( list );
          $( this ).on( "click", { cellIndex : cellIndex, talentIndex: talentIndex, interfaceIndex : interfaceIndex }, itui.showTalentList );
          list.find( ".itemTalentHover" ).each( function () {
            label = $( this ).find( ".itemTalentLabel" );
            label.attr( "id", "itemTalentLabel_" + talentIndex );
            details = $( this ).find( ".itemTalentDetails" );
            details.attr( "id", "itemTalentDetails_" + talentIndex );
            $( "#itemTalentDisplay_" + interfaceIndex ).append( details );
            if ( talentIndex > 0 ) {
              details.hide();
            } else {
              label.addClass( "selected" );
            }
            $( this ).on( "click", { talentIndex : talentIndex, interfaceIndex : interfaceIndex }, itui.showTalentDetails );
            ++talentIndex;
          } );
          ++cellIndex;
        }
      } );
      ++interfaceIndex;
    } );
  },
  showTalentList : function ( event ) {
    $( "#itemTalentLists_" + event.data.interfaceIndex + " .itemTalentList" ).hide();
    $( "#itemTalentList_" + event.data.cellIndex ).show();
    $( "#itemTalents_" + event.data.interfaceIndex + " .itemTalentCell" ).removeClass( "selected" );
    $( "#itemTalentCell_" + event.data.cellIndex ).addClass( "selected" );

    itui.showTalentDetails( event );
  },
  showTalentDetails : function ( event ) {
    $( "#itemTalentDisplay_" + event.data.interfaceIndex + " .itemTalentDetails" ).hide();
    $( "#itemTalentDetails_" + event.data.talentIndex ).show();
    $( "#itemTalentLists_" + event.data.interfaceIndex + " .itemTalentLabel" ).removeClass( "selected" );
    $( "#itemTalentLabel_" + event.data.talentIndex ).addClass( "selected" );
  }
}

$( document ).ready( itui.initialize );