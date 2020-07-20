/* Any JavaScript here will be loaded for all users on every page load. */

/** Accordion script **/
var acc = document.getElementsByClassName("accordion-fantasy");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
}

/** Filtering button script **/
var filtering = filtering || {
  enableFilters : function() {
    $( ".filter-button" ).each( function() {
      $( this ).find( ".filter-initial" ).hide();
      $( this ).click( filtering.toggleFilter );
      $( this ).find( ".filter-off" ).show();
    } );
  },

  toggleFilter : function() {
    $( this ).find( ".filter-off" ).toggle();
    $( this ).find( ".filter-on" ).toggle();
    filtering.applyFilters();
  },

  applyFilters : function() {
    var activeGroups = {};
    var data = null;
    var groupName = null;
    $( ".filter-button" ).each( function() {
      if ( $( this ).find( '.filter-on' ).css( "display" ) !== "none" ) {
        data = $( this ).data();
        if ( "filterGroup" in data && data.filterGroup.trim() !== "" && "filter" in data && data.filter.trim() !== "" ) {
          groupName = data.filterGroup.trim().toLowerCase();
          if ( groupName in activeGroups ) {
            activeGroups[groupName].push( data.filter.trim().toLowerCase() );
          } else {
            activeGroups[groupName] = [ data.filter.trim().toLowerCase() ];
          }
        }
      }
    } );

    $( ".filterable" ).each( function() {
      var show = true;
      var filters = $( this ).data().filters.split( "," );

      for ( var groupName in activeGroups ) {
        show = false;
        for ( var i = 0; i < filters.length; ++i ) {
          if ( activeGroups[groupName].indexOf( filters[i].trim().toLowerCase() ) > -1 ) {
            show = true;
            break;
          }
        }
        if ( !show ) {
          break;
        }
      }

      if ( show ) {
        $( this ).show();
      } else {
        $( this ).hide();
      }
    } );
  }
}

$( document ).ready( filtering.enableFilters );