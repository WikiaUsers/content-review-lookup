if (typeof (PrintDialog) == 'undefined' && mw.config.get("wgNamespaceNumber") >= 0) {
 
 var PrintDialog = {
  install: function() {
   $('#t-print a').click( function(e) { PrintDialog.open(); e.preventDefault(); } ).text( "Print page");
  },

  open: function() {
   var dlgButtons = {};
   dlgButtons.Print = function() {
    $.each(PrintDialog.questions, function(i, v) {
                  response = $('#PrintOption' + i).val();
                  if (v.type == 'checkbox') response = $('#PrintOption' + i).attr('checked');
                  PrintDialog[v.returnvalue] = response;
    });
    PrintDialog.changePrintCSS();
    PrintDialog.otherEnhancements();
    $(this).dialog('close');
    window.print();
    if( !$.browser.opera) {
      window.location = window.location;
    }
   };
   dlgButtons.Cancel = function() {
    $(this).dialog('close');
   };
   var $dialog = $('<div></div>')
          .html('<div id="PrintDialogContainer"></div>')
          .dialog({
              width: 600,
              modal: true,
              title: "Print this page",
              draggable: true,
              dialogClass: "wikiEditor-toolbar-dialog",
              close: function() {
                  $(this).dialog("destroy");
                  $(this).remove();
              },
              buttons: dlgButtons
          });
   $.each(PrintDialog.questions, function(i, v) {
     if( v.type =="checkbox") {
      $('#PrintDialogContainer').append('<input type="checkbox" id="PrintOption' + i + '" style="" ' + (v.checked ? 'checked' : '') + '>' + v.label + '<br>');
     }
   });

  }, /* end open */

  changePrintCSS: function() {
    /* Here we:
       - disable stylesheets that are print specific
       - make screen specific stylesheets also enabled for print medium
       - remove print specific stylerules
       - make screen specific stylerules also enabled for print medium
    */
    if( false ) {
       var stylesheets=document.styleSheets;
       for(var i=0; i < stylesheets.length; i++ ) {
         var stylesheet = stylesheets[i];
         var disabled = false;
         var screen = false;
         if( !stylesheet.media ) continue;
         if( stylesheet.media.mediaText && stylesheet.media.mediaText.indexOf( "print" ) != -1) {
           if(stylesheet.media.mediaText.indexOf( "screen" ) == -1 )
             stylesheet.disabled = true;
         } else if( stylesheet.media.mediaText && stylesheet.media.mediaText.indexOf( "screen" ) != -1) {
           if( stylesheet.media.mediaText.indexOf( "print" ) == -1 )
             try { stylesheet.media.appendMedium( "print" ); } catch(e) { stylesheet.media.mediaText += ",print"; }
         }

         /* now test individual stylesheet rules */
         var rules;
         try {
           rules = stylesheet.cssRules || stylesheet.rules;
         } catch(e) { /* Cross domain issue. */ continue; }
         stylesheet.compatdelete = stylesheet.deleteRule || stylesheet.removeRule;
         for(var j=0; rules && j < rules.length; j++) {
           var rule = rules[j];
           var hasPrint = false;
           var hasScreen = false;
           if( rule.type == 4 && rule.media ) {
             for(var k=0; k < rule.media.length; k++ ) {
               if( rule.media[k] == "print" ) {
                 hasPrint = true;
               } else if (rule.media[k] == "screen" ) {
                 hasScreen = true;
               }
             }
           } else { continue; }
           if( hasPrint && !hasScreen ) {
             stylesheet.compatdelete( j );
             j--;
           } else if ( hasScreen && !hasPrint ) {
             stylesheet.media.appendMedium( "print" );
           }
         }
       }
    }
    /* Add css to hide images */
    if( this.noimages ) {
       $("head").append('<style type="text/css">@media print { img, .thumb {display:none;}}</style>');
    }
    /* Add css to hide references markers and the references lists */
    if( this.norefs ) {
       $("head").append('<style type="text/css">@media print { .mw-headline[id="References"], ol.references, .reference {display:none;} }</style>');
    }
    if( this.nobackground ) {
       $("head").append('<style type="text/css">@media print { * {background:none !important;} }</style>');
    }
    if( this.blacktext ) {
       $("head").append('<style type="text/css">@media print { * {color:black !important;} }</style>');
    }

  },

  /* Rewrite the "retrieved from" url to be readable */
  otherEnhancements: function() {
    link = $('div.printfooter a');
    link.text( decodeURI( link.text() ) );
  },

  questions: [/*{
    label: "Hide interface elements (You can only change this on Safari)",
    type: "checkbox",
    checked: true,
    returnvalue: 'enhanced'
   },*/
   {
    label: "Hide images",
    type: "checkbox",
    checked: false,
    returnvalue: 'noimages'
   },
   {
    label: "Hide references",
    type: "checkbox",
    checked: false,
    returnvalue: 'norefs'
   },
   {
    label: "Remove backgrounds",
    type: "checkbox",
    checked: false,
    returnvalue: 'nobackground'
   },
   {
    label: "Force all text to black",
    type: "checkbox",
    checked: true,
    returnvalue: 'blacktext'
   }
  ]
 };

 $(document).ready( PrintDialog.install );
}