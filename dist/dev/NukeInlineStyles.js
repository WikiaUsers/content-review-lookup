/**
 * @file        NukeInlineStyles
 * @description Add a button to the toolbar will remove inline styles when pressed
 * @author      Himmalerin
 * @version     1.1.0
 */

(function () {
  // Double run protection
  if (window.nisLoaded) return;
  window.nisLoaded = true;

  // Preset some variables unless the user chooses to set them
  var nisRemoveDisplayNone = window.nukeInlineStylesRemoveDisplayNone || false;
  var nisSimpleStyles = window.nukeInlineStylesSimpleCSS || false;

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
      'style',
    ];

    var attr_len = attr.length;

    while (i--) {
      // Remove `display: none` if the user sets
      // `nukeInlineStylesRemoveDisplayNone` to true.
      // Breaks `mw-customcollapsible`s so we leave it off by default.
      if (nisRemoveDisplayNone) {
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

  // Get all elements within the WikiaMainContent element so we can remove their
  // inline styles
  // For Legacy wikis
  if (mw.config.get('wgVersion') === '1.19.24') {
    var nisPageContent = document.querySelectorAll('#mw-content-text *');
  } else {
    // For UCP wikis
    var nisPageContent = document.querySelectorAll(
      '#mw-content-text > .mw-parser-output *'
    );
  }
  // Find the toolbar
  var nisToolbar = document.querySelector('.WikiaBarWrapper .toolbar > .tools');

  // Create an li to put our button in
  var nisLi = document.createElement('li');

  // Create our button
  var nisButton = document.createElement('button');
  // Set button id
  nisButton.id = 'js-nukeStyles';
  // If on a UCP wiki give the button a class and set styles to make it fit
  if (mw.config.get('wgVersion') !== '1.19.24') {
    nisButton.className = 'wds-button';
    nisButton.style.cssText =
      'min-height: unset; height: unset; padding: 0 4px;';
  }
  // Set button type
  nisButton.type = 'button';
  // Set onclick to remove styles
  nisButton.addEventListener('click', function () {
    removeStyles(nisPageContent);
  });

  // Set button text
  nisButton.textContent = 'Nuke Styles';

  // Add the li to the end of the end of the toolbar list
  nisToolbar.appendChild(nisLi);

  // Add the button to our li
  nisLi.appendChild(nisButton);

  // If the user wants to import a few simple CSS styles to preserve a
  // nicer appearance, do so
  if (nisSimpleStyles) {
    importArticle({
      type: 'style',
      article: 'u:dev:MediaWiki:NukeInlineStyles.css',
    });
  }
})();