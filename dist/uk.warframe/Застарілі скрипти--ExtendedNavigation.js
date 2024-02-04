// Code by Spottra of Clash of Clans Wiki, October 2013.
// Current version: 1.1.2, April 2014.
//
// If you choose to copy this code, please leave the attribution at the top.
//
// Sub-navigation levels 4 and 5
// =============================
// This code extends the MediaWiki:Wiki-navigation to enable level 4 and 5
// submenus. Simply edit the MediaWiki:Wiki-navigation file as normal and
// use '****' and '*****' to indicate where level 4 and 5 submenus should
// appear.
//
// The corresponding CSS required for proper display of the level 4 and 5
// submenus is located at MediaWiki:Wikia.css/SubNav.css.
//
// Supports:
// * '****Link name' construct. Link spaces will be replaced by underscores.
// * '****Link name|Display name' construct. Link spaces also replaced.
// * '****<nowiki>Display name</nowiki>' construct for menus without links.
//
// Limitations:
// * Currently, the level 3 submenus must either have unique links, or for
//   level 3 submenus that are not configured as links
//   (i.e. <nowiki>Menu name</nowiki>), they must be uniquely named. This code
//   uses .find() to locate the proper level 3 submenu to build the extra HTML,
//   and non-unique names will result in the menu being added to all matches.
 
function timeStamp_ExtendedNavigation_js() {
  return "2016.11.09 11:37 (UTC)";
}
 
(function () {
 
  // jQuery.escapeSelector utility function - sourced from jQuery 3.0
  // Source: https://github.com/jquery/jquery/blob/master/src/selector-native.js
  // License: MIT - https://github.com/jquery/jquery/blob/master/LICENSE.txt
  if ( !jQuery.escapeSelector ) {
    // CSS string/identifier serialization
    // https://drafts.csswg.org/cssom/#common-serializing-idioms
    var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
    var fcssescape = function( ch, asCodePoint ) {
      if ( asCodePoint ) {
 
        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
        if ( ch === "\0" ) {
          return "\uFFFD";
        }
 
        // Control characters and (dependent upon position) numbers get escaped as code points
        return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
      }
 
      // Other potentially-special ASCII characters get backslash-escaped
      return "\\" + ch;
    };
 
    function escape( sel ) {
      return ( sel + "" ).replace( rcssescape, fcssescape );
    }
 
    jQuery.extend( {
      escapeSelector: escape
    } );
  }
 
  function imgChevron(strDirection) {
    if (strDirection === 'down')
      return '<img class="chevron" src="data:image/gif;base64,' +
        'R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D">';
 
    return '<img height="0" width="0" class="chevron-right" ' +
      'src="data:image/gif;base64,' +
      'R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D">';
  }
 
  var intShift = 0;
 
  function processNavigation(data) {
    var arrNav       = data.trim().split('\n');
    var strSubNav    = '';
    var strSubNavs   = '';
    var strSubMenu2  = '';
    var strSubMenu2a = '';
    var boolSubMenu4 = false;
    intShift         = subNavLevel(arrNav[0]) - 1;
 
    console.log('ExtendedNavigation: Creating custom menus');
 
    for (var i = 0; i < arrNav.length; i ++) {
      var intSubLevel = subNavLevel(arrNav[i]);
 
      // Check for level 3 or greater subnav. We will build all level 3+ menus
      // but only add them if we need to (i.e. if we encounter a level 4+
      // somewhere.
      if (intSubLevel >= 3) {
        // Check both the previous and the next entries.
        var intPrevSubLevel = subNavLevel(arrNav[i - 1]);
        var intNextSubLevel = (i === arrNav.length - 1 ? 0 : subNavLevel(arrNav[i + 1]));
 
        if (intSubLevel > intPrevSubLevel + 1) {
          // The only valid choices for submenus are:
          // * intSubLevel == intPrevSubLevel (the current menu continues)
          // * intSubLevel == intPrevSubLevel + 1 (new submenu)
          // * intSubLevel <  intPrevSubLevel (the current menu ends)
          // Anything else and we simply exit due to bad formation.
          console.log('ExtendedNavigation: Exiting:\n' +
            '  Submenu structure badly formed.\n' +
            '  arrNav[' + i + ']=' + arrNav[i] + '\n' +
            '  intSubLevel=' + intSubLevel + '\n' +
            '  intPrevSubLevel=' + intPrevSubLevel + '\n' +
            '  intNextSubLevel=' + intNextSubLevel + '\n' +
            '  strSubNav=' + strSubNav);
          return;
        }
 
        // If we've encountered a level 4+ submenu, we'll need to add it.
        if (intSubLevel === 4)
          boolSubMenu4 = true;
 
        if (intNextSubLevel === intSubLevel + 1) {
          // We've encountered the beginning of a new submenu.
          strSubNav += (strSubNav === '' ? '' : '\n');
          strSubNav += '<li>' + '\n';
          strSubNav += subNavLevel(arrNav[i], 'fullsublink');
          strSubNav += '\n' + '<ul class="subnav-' + (intSubLevel + 1) + '">';
        }
        else if (intNextSubLevel < intSubLevel) {
          // We've encountered the end of a submenu.
          strSubNav += (strSubNav === '' ? '' : '\n');
          strSubNav += '<li>' + subNavLevel(arrNav[i], 'fulllink') + '</li>';
          strSubNav += '\n' + '</ul></li>';
 
          if (intSubLevel - intNextSubLevel > 1 && strSubNav !== '') {
            // If we're closing more than one submenu, add additional closing tags.
            var intClosingTags = intSubLevel - intNextSubLevel;
 
            while (intClosingTags > 1) {
              strSubNav += '\n' + '</ul></li>';
              intClosingTags --;
            }
          }
        }
        else if (intSubLevel === intNextSubLevel) {
          // Garden variety submenu.
          strSubNav += '\n' + '<li>' + subNavLevel(arrNav[i], 'fulllink') + '</li>';
        }
        else {
          console.log('ExtendedNavigation: Exiting:\n' +
            '  Fallthrough.\n' +
            '  arrNav[' + i + ']=' + arrNav[i] + '\n' +
            '  intSubLevel=' + intSubLevel + '\n' +
            '  intPrevSubLevel=' + intPrevSubLevel + '\n' +
            '  intNextSubLevel=' + intNextSubLevel + '\n' +
            '  strSubNav=' + strSubNav);
          return; // Only should happen if the Wiki-navigation is poorly formed.
        }
      }
 
      // If we've dropped below level 3 or reached the end of the file,
      // close and reset the subnav string and start over
      if (i === arrNav.length - 1 || intSubLevel < 3) {
        if (strSubNav !== '') {
          strSubNavs += strSubNav;
          strSubNav   = '';
        }
 
        // If we've got submenus to add, do so.
        if (boolSubMenu4) {
          var subnav3 = $('.WikiHeader nav').find(strSubMenu2);
 
          // Non-links unfortunately match every non-link, so we need to find
          // the correct one.
          if (strSubMenu2a !== '') {
            subnav3.each(function(index) {
              var subnav2 = $(this).parent().find('.subnav-2a');
 
              // Unfortunately the chevron string changes slightly so we
              // can't match to the whole thing.
              var strMatch = strSubMenu2a + imgChevron('down').substr(0, 5);
 
              if (subnav2.html().substr(0, strMatch.length) === strMatch) {
                // We've found the right one, so save just the one we want to
                // modify.
                subnav3 = $(this);
                return false;
              }
            });
          }
 
          subnav3.addClass("subnav-3-with-subnav-4");
          subnav3.html(strSubNavs);
          boolSubMenu4 = false;
        }
      }
 
      // Grab any level 2 submenu we encounter and reset the subnavs string.
      if (intSubLevel === 2) {
        strSubMenu2  = subNavLevel(arrNav[i], 'findlink');
 
        // For menu items with no links, store the displayname
        if (Array.isArray(strSubMenu2)) {
          strSubMenu2a = strSubMenu2[1];
          strSubMenu2  = strSubMenu2[0];
        }
        else
          strSubMenu2a = '';
 
        strSubNavs   = '';
        boolSubMenu4 = false;
      }
    }
 
    var mColor = $('.WikiHeader > nav .subnav-3').css('border-left-color');
 
    if (mColor) {
      $('.WikiHeader nav').find('.subnav-4, .subnav-5')
        .css({ borderColor: mColor });
    }
  }
 
  /*
   * Function to determine the subnav level (i.e. the number of leading asterisks).
   *
   * The strReturnLink argument changes the behavior of this function in several ways:
   *   no argument   - simply return the subnav level
   *   'link'        - returns the basic HTML link
   *   'findlink'    - returns HTML link text suitable for finding in Wikia nav HTML
   *   'fulllink'    - returns the full HTML link with display text and closing tag
   *   'sublink'     - returns the HTML link with the proper subnav class
   *   'fullsublink' - return the full HTML link with display text, subnav and closing
   *   'display'     - returns the display name
   *
   * Example 1:
   *   subNavLevel('***Barbarian')
   *     return 3;
   *   subNavLevel('***Barbarian', 'findlink')
   *     return 'a[href="/wiki/Barbarian"] + .subnav-4';
   *   subNavLevel('***Barbarian', 'link')
   *     return '<a href="/wiki/Barbarian">';
   *   subNavLevel('***Barbarian', 'fulllink')
   *     return '<a href="/wiki/Barbarian">Barbarian</a>';
   *   subNavLevel('***Barbarian', 'sublink')
   *     return '<a href="/wiki/Barbarian" class="subnav-3a">';
   *   subNavLevel('***Barbarian', 'fullsublink')
   *     return '<a href="/wiki/Barbarian" class="subnav-3a">Barbarian' +
   *       imgChevron() + '</a>';
   *   subNavLevel('***Barbarian', 'display')
   *     return 'Barbarian';
   *
   * Example 2:
   *   subNavLevel('****Loading_Screen_Hints|Loading Screen Hints')
   *     return 4;
   *   subNavLevel('****User:Spottra|Spottra', 'findlink')
   *     return 'a[href="/wiki/User:Spottra"] + .subnav-5';
   *   subNavLevel('****User:Spottra|Spottra', 'link')
   *     return '<a href="/wiki/User:Spottra">';
   *   subNavLevel('****User:Spottra|Spottra', 'fulllink')
   *     return '<a href="/wiki/User:Spottra">Spottra</a>';
   *   subNavLevel('****User:Spottra|Spottra', 'sublink')
   *     return '<a href="/wiki/User:Spottra" class="subnav-4a">';
   *   subNavLevel('****User:Spottra|Spottra', 'fullsublink')
   *     return '<a href="/wiki/User:Spottra" class="subnav-4a">' +
   *       'Spottra' + imgChevron()  + '</a>';
   *   subNavLevel('****User:Spottra|Spottra', 'display')
   *     return 'Spottra';
   */
  function subNavLevel(strNav, strReturnLink) {
    if (strNav === undefined) return;
 
    var idx = 0;
 
    while (idx < strNav.length && strNav.substr(idx, 1) === '*')
      idx ++;
 
    idx -= intShift;
 
    if (!strReturnLink)
      return idx;
 
    strNav = strNav.substr(idx + intShift).trim();
 
    if (strNav.substr(0, 8) === '<nowiki>' &&
        strNav.substr(strNav.length - 9) === '</nowiki>') {
      // A nowiki tag means we use a nonfunctional link ('#') and use the
      // entire string as the display.
      strNav = ['#', strNav.substr(8, strNav.length - 17)];
    }
    else {
      strNav = strNav.split('|');
 
      if (strNav.length === 1)
        strNav = [strNav[0], strNav[0]];
      else if (strNav[0].length < 1)
        // Support '|display' for nonfunctional links also
        strNav[0] = '#';
 
      // If we've got a namespace specified, check to see if it's a standard
      // namespace that we'll need to translate ('project', 'blog', etc.)
      var strNamespace = strNav[0].split(':');
 
      if (strNamespace.length > 1) {
        var intNamespaceID = wgNamespaceIds[strNamespace[0]];
 
        if (typeof intNamespaceID !== 'undefined')
          strNamespace[0] = wgFormattedNamespaces[intNamespaceID];
 
        strNav[0] = strNamespace.join(':');
      }
 
      if (strNav[0] !== '#') {
        var intFragmentPos = strNav[0].indexOf('#');
 
        if (strReturnLink === 'findlink') {
          // Escape and URL encode for CSS selector
          strNav[0] = $.escapeSelector(encodeURI(
            mw.config.get('wgArticlePath').replace('$1', strNav[0]).replace(/ /g, '_')
          ).replace(/'/g, '%27'));
        }
        else {
          // Encode for HTML
          if (intFragmentPos !== -1)
            // mw.util.getUrl doesn't handle URL fragments correctly in MW versions < 1.27, so do that manually
            strNav[0] = mw.util.getUrl(strNav[0].substr(0, intFragmentPos)) + strNav[0].substr(intFragmentPos);
          else
            strNav[0] = mw.util.getUrl(strNav[0]);
        }
      }
    }
 
    switch (strReturnLink) {
      case 'link':
        return '<a href="' + strNav[0] + '">';
 
      case 'findlink': {
        if (strNav[0] === '#')
          return  ['a[href="' + strNav[0] + '"] + .subnav-' + (idx + 1), strNav[1]];
 
        return 'a[href="' + strNav[0] + '"] + .subnav-' + (idx + 1);
      }
 
      case 'sublink':
        return '<a href="' + strNav[0] + '" class="subnav-' + idx + 'a">';
 
      case 'fulllink':
        return '<a href="' + strNav[0] + '">' + strNav[1] + '</a>';
 
      case 'fullsublink':
        return '<a href="' + strNav[0] + '" class="subnav-' + idx + 'a">' +
          strNav[1] + imgChevron() + '</a>';
 
      case 'display':
        return strNav[1];
    }
  }
 
  function main() {
    // Importing required CSS
    window.importArticle({
      type:    'style',
      article: 'MediaWiki:ExtendedNavigation.css' /*Оформлення рівнів*/
    });
 
    if ($('.WikiHeader nav').length)
      $.get(mw.util.getUrl('MediaWiki:Wiki-navigation', { action: 'raw' })).done(processNavigation);
 
    if (mw.config.get('wgIsWikiNavMessage'))
      $(window).on('EditPageAfterRenderPreview', function () {
        // reset shift, as it may change between previews
        intShift = 0;
        processNavigation($('#wpTextbox1').val());
      });
  }
 
  mw.loader.using('mediawiki.util', main);
}());