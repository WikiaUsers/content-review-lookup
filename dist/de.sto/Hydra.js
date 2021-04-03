/****************
/* Skin options *
/****************/

/*
 * Adds both the options button and dialog to the page.
 */
function addSkinOptionElements( ) {
  addSkinOptionButton();
  addSkinOptionDialog();
}

/*
 * Adds the skin options button to the personal toolbar.
 */
function addSkinOptionButton( ) {
  var optionButton = createSkinOptionButton();

  $( '#p-cactions' ).removeClass( 'emptyPortlet' );
  $( '#p-cactions .menu ul' ).prepend( optionButton );
}

/*
 * Creates the button to bring up the skin options dialog
 */
function createSkinOptionButton( ) {
  var button = document.createElement( 'li' );
  button.id = 'pt_skinoptions';
  var title = "Your options for this skin on this computer or device (requires cookies are enabled)";
  button.innerHTML = '<a href="javascript:toggleSkinOptionDialog();" title="' + title + '">Skin&nbsp;options</a>';
  return button; 
}

/*
 * Adds the skin options dialog
 */
function addSkinOptionDialog( ) {
  $( '#global-wrapper' ).append( createSkinOptionDialog() );
}

/*
 * Creates the skin options dialog
 */
function createSkinOptionDialog( ) {
  var dialog = document.createElement( 'div' );
  dialog.id = 'skinOptionDialog';
  dialog.style.display = 'none';
  dialog.style.position = 'absolute';
  dialog.style.left = '300px';
  dialog.style.top = '30px';
  dialog.style.zIndex = '200';
  dialog.innerHTML = '<table><tr><th>Page background</th><td>' +
                     '<a id="button-body-fixed" href="javascript:setSkinOption(\'body-fixed\');">' +
                     'Fixed background</a> | ' +
                     '<a id="button-body-scroll" href="javascript:setSkinOption(\'body-scroll\');">' +
                     'Scrolling background</a> | ' +
                     '<a id="button-body-solid" href="javascript:setSkinOption(\'body-solid\');">' + 
                     'None</a>' +
                     '</td></tr><tr><th>Article background</th><td>' +
                     '<a id="button-content-mask" href="javascript:setSkinOption(\'content-mask\');">' + 
                     'Semi-transparent</a> | ' +
                     '<a id="button-content-solid" href="javascript:setSkinOption(\'content-solid\');">' + 
                     'Solid</a>' +
                     '</td></tr><tr><td></td><td>' +
                     '<a href="javascript:hideSkinOptionDialog();">Close</a>' +
                     '</td></tr></table>';
  return dialog;
}

/*
 * Toggles visibility of the skin options dialog
 */
function toggleSkinOptionDialog( ) {
  $( '#skinOptionDialog' ).toggle();
}

/*
 * Hides the skin options dialog
 */
function hideSkinOptionDialog( ) {
  document.getElementById( 'skinOptionDialog' ).style.display = 'none';
}

/*
 * Gets the value of the skin option cookie or returns the default value if it doesn't exist
 */
function getSkinOptionCookie( ) {
  var value = $.cookie( "STOWikiVector" );
  if ( value && value.split( ' ' ).length > 1 ) {
    return value;
  } else {
    if ( window.matchMedia( 'only screen and (max-device width:480px)' ).matches ) {
      return 'body-solid content-solid';
    } else {
      return 'body-scroll content-mask';
    }
  }
}

/*
 * Set the skin options cookie
 */
function setSkinOptionCookie( value ) {
  $.cookie( "STOWikiVector", value, { path: '/' } );
}

/*
 * Returns true if the value is recognized as a valid option for the body
 */
function isValidBodyOption( value ) {
  return ( value == "body-fixed" || value == 'body-scroll' || value == 'body-solid' );
}

/*
 * Returns true if the value is recognized as a valid option for the content element
 */
function isValidContentOption( value ) {
  return ( value == "content-mask" || value == 'content-solid' );
}

/*
 * Sets the specified skin option if known, saves the cookie, and applies the option
 */
function setSkinOption( value ) {
  var oldValues = getSkinOptionCookie();

  if ( isValidBodyOption( value ) ) {
    newValues = value + ' ' + oldValues.split( ' ' )[1];
  } else if ( isValidContentOption( value ) ) {
    newValues = oldValues.split( ' ' )[0] + ' ' + value;
  }

  setSkinOptionCookie( newValues );
  applySkinOptions( newValues );
}

/*
 * Applies the indicated skin options
 */
function applySkinOptions( value ) {
  if ( value.split( ' ' ).length > 0 ) {
    $( '#button-body-fixed' ).removeClass( 'selected' );
    $( '#button-body-scroll' ).removeClass( 'selected' );
    $( '#button-body-solid' ).removeClass( 'selected' );
    bodyClass = value.split( ' ' )[0];
    if ( isValidBodyOption( bodyClass ) ) {
      $( 'body' ).removeClass( 'body-fixed body-scroll body-solid' );
      $( 'body' ).addClass( bodyClass );
      $( '#button-' + bodyClass ).addClass( 'selected' );
    }

    if ( value.split( ' ' ).length > 1 ) {
      $( '#button-content-mask' ).removeClass( 'selected' );
      $( '#button-content-solid' ).removeClass( 'selected' );
      contentClass = value.split( ' ' )[1];
      if ( isValidContentOption( contentClass ) ) {
        $( 'body' ).removeClass( 'content-mask content-solid' );
        $( 'body' ).addClass( contentClass );
        $( '#button-' + contentClass ).addClass( 'selected' );
      }
    }
  }
}

/*
 * Applies the current skin options
 */
function applyCurrentSkinOptions( ) {
  applySkinOptions( getSkinOptionCookie() );
}

$(document).ready( addSkinOptionElements );
$(document).ready( applyCurrentSkinOptions );