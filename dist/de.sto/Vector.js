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
  var toolbar = document.getElementById( 'p-personal' ).getElementsByTagName( 'ul' )[0];
  var optionButton = createSkinOptionButton();
  var prefsButton = document.getElementById( 'pt-preferences' );

  if ( prefsButton ) {
    toolbar.insertBefore( optionButton, prefsButton );
  } else {
    toolbar.appendChild( optionButton );
  }
}

/*
 * Creates the button to bring up the skin options dialog
 */
function createSkinOptionButton( ) {
  var button = document.createElement( 'li' );
  button.id = 'pt_skinoptions';
  var title = "Your options for this skin on this computer or device (requires cookies are enabled)";
  button.innerHTML = '<a href="javascript:toggleSkinOptionDialog();" title="' + title + '">Skin options</a>';
  return button; 
}

/*
 * Adds the skin options dialog
 */
function addSkinOptionDialog( ) {
  document.body.appendChild( createSkinOptionDialog() );
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
  dialog.innerHTML = '<table><tr><th>Hintergrund Seite</th><td>' +
                     '<a id="button-body-fixed" href="javascript:setSkinOption(\'body-fixed\');">' +
                     'Fixierter Hintergrund</a> | ' +
                     '<a id="button-body-scroll" href="javascript:setSkinOption(\'body-scroll\');">' +
                     'Mitscrollender Hintergrund</a> | ' +
                     '<a id="button-body-solid" href="javascript:setSkinOption(\'body-solid\');">' + 
                     'Kein</a>' +
                     '</td></tr><tr><th>Artikel Hintergrund</th><td>' +
                     '<a id="button-content-mask" href="javascript:setSkinOption(\'content-mask\');">' + 
                     'Teil-Transparent</a> | ' +
                     '<a id="button-content-solid" href="javascript:setSkinOption(\'content-solid\');">' + 
                     'Solide</a>' +
                     '</td></tr><tr><td></td><td>' +
                     '<a href="javascript:hideSkinOptionDialog();">Schließen</a>' +
                     '</td></tr></table>';
  return dialog;
}

/*
 * Toggles visibility of the skin options dialog
 */
function toggleSkinOptionDialog( ) {
  var dialog = document.getElementById( 'skinOptionDialog' );
  if ( dialog.style.display == 'none' ) {
    dialog.style.display = 'block';
  } else {
    dialog.style.display = 'none';
  }
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
    removeClass( document.getElementById( 'button-body-fixed' ), 'selected' );
    removeClass( document.getElementById( 'button-body-scroll' ), 'selected' );
    removeClass( document.getElementById( 'button-body-solid' ), 'selected' );
    bodyClass = value.split( ' ' )[0];
    if ( isValidBodyOption( bodyClass ) ) {
      removeClass( document.body, '(body-fixed|body-scroll|body-solid)' );
      addClass( document.body, bodyClass );
      addClass( document.getElementById( 'button-' + bodyClass ), 'selected' );
    }

    if ( value.split( ' ' ).length > 1 ) {
      removeClass( document.getElementById( 'button-content-mask' ), 'selected' );
      removeClass( document.getElementById( 'button-content-solid' ), 'selected' );
      contentClass = value.split( ' ' )[1];
      if ( isValidContentOption( contentClass ) ) {
        removeClass( document.body, '(content-mask|content-solid)' );
        addClass( document.body, contentClass );
        addClass( document.getElementById( 'button-' + contentClass ), 'selected' );
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