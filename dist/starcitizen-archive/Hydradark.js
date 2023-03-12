/* Any JavaScript here will be loaded for users using the Hydra Dark skin */
/*****************************************
/* Front Page column height equalization *
/*****************************************/
// Author:  Shawn Bruckner
// Date:    2013-May-05
// License: CC-BY 3.0
// Version: beta

var fp = fp || {
  equalizeColumns : function() {
    $( '.fpcolumns' ).each( function (index) {
      var lcol = $( this ).find( '.fpcolleft' );
      var rcol = $( this ).find( '.fpcolright' );

      var lheight = lcol.height();
      var rheight = rcol.height();

      var bottombox;

      if ( lheight < rheight ) {
        bottombox = $( lcol ).find( '.fpinnerbox' ).last();
        bottombox.height( bottombox.height() + rheight - lheight );
      } else if ( rheight < lheight ) {
        bottombox = $( rcol ).find( '.fpinnerbox' ).last();
        bottombox.height( bottombox.height() + lheight - rheight );
      }
    } )
  }
};

$( document ).ready( fp.equalizeColumns );
/*********************************************
/* End Front Page column height equalization *
/*********************************************/