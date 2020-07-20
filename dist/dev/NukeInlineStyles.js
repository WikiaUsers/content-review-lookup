/**
 * @file        NukeInlineStyles
 * @description Add a button to the toolbar will remove inline styles when pressed
 * @author      Himmalerin
 * @version     1.0.0
 */
 
(function() {
  // Double run protection
  if (window.nukeInlineStylesLoaded) {
    return;
  }
  window.nukeInlineStylesLoaded = true;

  // Preset some variables unless the user chooses to set them
  var nukeInlineStylesRemoveDisplayNone =
    window.nukeInlineStylesRemoveDisplayNone || false;
  var nukeInlineStylesSimpleCSS = window.nukeInlineStylesSimpleCSS || false;

  function removeStyles(all) {
    // https://css-tricks.com/snippets/javascript/remove-inline-styles/
    var i = all.length;
    var j, is_hidden;

    // Presentational attributes.
    var attr = [
      'align',
      'background',
      'bgcolor',
      'border',
      'cellpadding',
      'cellspacing',
      'color',
      'face',
      'height',
      'hspace',
      'marginheight',
      'marginwidth',
      'noshade',
      'nowrap',
      'valign',
      'vspace',
      'width',
      'vlink',
      'alink',
      'text',
      'link',
      'frame',
      'frameborder',
      'clear',
      'scrolling',
      'style'
    ];

    var attr_len = attr.length;

    while (i--) {
      // Remove `display: none` if the user sets
      // `nukeInlineStylesRemoveDisplayNone` to true.
      // Breaks `mw-customcollapsible`s so we leave it off by default.
      if (nukeInlineStylesRemoveDisplayNone) {
        j = attr_len;

        while (j--) {
          all[i].removeAttribute(attr[j]);
        }
      } else {
        // Preserve `display: none` styles if the user doesn't set
        // `nukeInlineStylesRemoveDisplayNone` or sets it to false.
        is_hidden = all[i].style.display === 'none';

        j = attr_len;

        while (j--) {
          all[i].removeAttribute(attr[j]);
        }

        // Re-hide display:none elements,
        // so they can be toggled via JS.
        if (is_hidden) {
          all[i].style.display = 'none';
          is_hidden = false;
        }
      }
    }
  }

  // Get all elements within the WikiaMainContent element so we can
  // remove their inline styles
  var insideWikiaMainContent = document
    .getElementsByClassName('mw-content-text')[0]
    .getElementsByTagName('*');

  // Find the toolbar
  var wikiToolbar = document
    .getElementById('WikiaBarWrapper')
    .getElementsByClassName('toolbar')[0]
    .getElementsByClassName('tools')[0];

  // Create an li to put our button in
  var nukeStylesLi = document.createElement('li');

  // Create our button
  var nukeStylesButton = document.createElement('button');
  // Set button id
  nukeStylesButton.setAttribute('id', 'js-nukeStyles');
  // Set button type
  nukeStylesButton.setAttribute('type', 'button');
  // Set onclick to remove styles
  nukeStylesButton.addEventListener('click', function() {
    removeStyles(insideWikiaMainContent);
  });

  // Set button text
  nukeStylesButton.textContent = 'Nuke Styles';

  // Add the li to the end of the end of the toolbar list
  wikiToolbar.appendChild(nukeStylesLi);

  // Add the button to our li
  nukeStylesLi.appendChild(nukeStylesButton);

  // If the user wants to import a few simple CSS styles to preserve a
  // nicer appearance, do so
  if (nukeInlineStylesSimpleCSS) {
    importArticle({
      type: 'style',
      article: 'u:dev:MediaWiki:NukeInlineStyles.css'
    });
  }
})();