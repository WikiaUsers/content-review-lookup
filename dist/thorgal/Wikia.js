// <syntaxhighlight lang="jquery">

// Code by Spottra of Clash of Clans Wiki, October 2013.
// Current version: 1.1, November 2013.
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
// Notes:
// * The navigation preview does not display the level 4 or 5 submenus, as it
//   does not call any custom Javascript. You will need to publish your changes
//   and then refresh the page in order to see their effects.
// * Publishing the Wiki-navigation page does not call any custom Javascript
//   either, which is why the page refresh is necessary. The previous level 4
//   and 5 submenus will appear until the page is refreshed. Note that you do
//   not need to clear cache; a simple refresh is all that is required (or
//   browse to another page).
//
// Limitations:
// * Currently, the level 3 submenus must either have unique links, or for
//   level 3 submenus that are not configured as links
//   (i.e. <nowiki>Menu name</nowiki>), they must be uniquely named. This code
//   uses .find() to locate the proper level 3 submenu to build the extra HTML,
//   and non-unique names will result in the menu being added to all matches.

function timeStamp_ExtendedNavigation_js() {
  return "2013.11.26 17:46 (UTC-8)";
}

// Importing required CSS
window.importArticle({
  type:    'style',
  article: 'u:dev:ExtendedNavigation/code.css'
});

function imgChevron(strDirection) {
  if (strDirection == 'down')
    return '<img class="chevron" src="data:image/gif;base64,' +
      'R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D">';

  return '<img height="0" width="0" class="chevron-right" ' +
    'src="data:image/gif;base64,' +
    'R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D">';
}

$.get("/wiki/MediaWiki:Wiki-navigation?action=raw").done(function(data) {
  var arrNav       = data.split('\n');
  var strSubNav    = '';
  var strSubNavs   = '';
  var strSubMenu2  = '';
  var strSubMenu2a = '';
  var boolSubMenu4 = false;

  console.log('ExtendedNavigation/code.js: Creating custom menus');

  for (var i = 0; i < arrNav.length; i ++) {
    var intSubLevel = subNavLevel(arrNav[i]);

    // Check for level 3 or greater subnav. We will build all level 3+ menus
    // but only add them if we need to (i.e. if we encounter a level 4+
    // somewhere.
    if (intSubLevel >= 3) {
      if (i == 0) {
        console.log('ExtendedNavigation/code.js: Exiting:\n' +
          '  Level 3+ subnav on first line of Wiki-navigation file.\n' +
          '  arrNav[' + i + ']=' + arrNav[i] + '\n' +
          '  intSubLevel=' + intSubLevel + '\n' +
          '  strSubNav=' + strSubNav);
        return; // Shouldn't happen, but exit gracefully if it does.
      }

      // Check both the previous and the next entries.
      intPrevSubLevel = subNavLevel(arrNav[i - 1]);
      intNextSubLevel = (i == arrNav.length  - 1 ? 0 : subNavLevel(arrNav[i + 1]));

      if (intSubLevel > intPrevSubLevel + 1) {
        // The only valid choices for submenus are:
        // * intSubLevel == intPrevSubLevel (the current menu continues)
        // * intSubLevel == intPrevSubLevel + 1 (new submenu)
        // * intSubLevel <  intPrevSubLevel (the current menu ends)
        // Anything else and we simply exit due to bad formation.
        console.log('ExtendedNavigation/code.js: Exiting:\n' +
          '  Submenu structure badly formed.\n' +
          '  arrNav[' + i + ']=' + arrNav[i] + '\n' +
          '  intSubLevel=' + intSubLevel + '\n' +
          '  intPrevSubLevel=' + intPrevSubLevel + '\n' +
          '  intNextSubLevel=' + intNextSubLevel + '\n' +
          '  strSubNav=' + strSubNav);
        return;
      }

      // If we've encountered a level 4+ submenu, we'll need to add it.
      if (intSubLevel == 4)
        boolSubMenu4 = true;

      if (intNextSubLevel == intSubLevel + 1) {
        // We've encountered the beginning of a new submenu.
        if (intSubLevel > 3) {
          // For sublevels > 3, add a new class.
          strSubNav += (strSubNav == '' ? '' : '\n');
          strSubNav += '<li class="subnav-' + (intNextSubLevel) + 'p">';
        }
        else {
          // Otherwise just add a <li> tag.
          strSubNav += (strSubNav == '' ? '' : '\n');
          strSubNav += '<li>';
        }

        strSubNav += (strSubNav == '' ? '' : '\n');
        strSubNav += subNavLevel(arrNav[i], 'fullsublink');
        strSubNav += '\n' + '<ul class="subnav-' + (intSubLevel + 1) + '">';
      }
      else if (intNextSubLevel < intSubLevel) {
        // We've encountered the end of a submenu.
        strSubNav += (strSubNav == '' ? '' : '\n');
        strSubNav += '<li>' + subNavLevel(arrNav[i], 'fulllink') + '</li>';
        strSubNav += '\n' + '</ul></li>';

        if (intSubLevel - intNextSubLevel > 1 && strSubNav != '') {
          // If we're closing more than one submenu, add additional closing tags.
          var intClosingTags = intSubLevel - intNextSubLevel;

          while (intClosingTags > 1) {
            strSubNav += '\n' + '</ul></li>';
            intClosingTags --;
          }
        }
      }
      else if (intSubLevel == intNextSubLevel) {
        // Garden variety submenu.
        strSubNav += '\n' + '<li>' + subNavLevel(arrNav[i], 'fulllink') + '</li>';
      }
      else {
        console.log('ExtendedNavigation/code.js: Exiting:\n' +
          '  Fallthrough.\n' +
          '  arrNav[' + i + ']=' + arrNav[i] + '\n' +
          '  intSubLevel=' + intSubLevel + '\n' +
          '  intPrevSubLevel=' + intPrevSubLevel + '\n' +
          '  intNextSubLevel=' + intNextSubLevel + '\n' +
          '  strSubNav=' + strSubNav);
        return; // Only should happen if the Wiki-navigation is poorly formed.
      }
    }
    else {
      // Close and reset the subnav string and start over
      if (strSubNav != '') {
        strSubNavs += strSubNav;
        strSubNav   = '';
      }
    }

    // If we have dropped below level 3 and we've got submenus to add, do so.
    if (intSubLevel < 3 && boolSubMenu4) {
      var subnav3 = $('.WikiHeader nav').find(strSubMenu2);

      // Non-links unfortunately match every non-link, so we need to find the
      // correct one.
      if (strSubMenu2a != '') {
        subnav3.each(function(index) {
          var subnav2 = $(this).parent().find('.subnav-2a');

          // Unfortunately the chevron string changes slightly so we
          // can't match to the whole thing.
          var strMatch = strSubMenu2a + imgChevron('down').substr(0, 5);

          if (subnav2.html().substr(0, strMatch.length) == strMatch) {
            // We've found the right one, so save just the one we want to modify.
            subnav3 = $(this);
            return false;
          }
        });
      }

      subnav3.addClass("subnav-3-with-subnav-4");
      subnav3.html(strSubNavs);
      boolSubMenu4 = false;
    }

    // Grab any level 2 submenu we encounter and reset the subnavs string.
    if (intSubLevel == 2) {
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

  var mColor = getMenuColor();

  if (mColor) {
    $('.WikiHeader nav').find('.subnav-4')
      .css({ backgroundColor: mColor });
    $('.WikiHeader nav').find('.subnav-5')
      .css({ backgroundColor: mColor });
    $('.WikiHeader nav').find('.chevron-right')
      .css({ borderLeftColor: mColor });
  }
});

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
 *   subNavLevel('****User:Spottra|Spottra', 'display)
 *     return 'Spottra';
 */
function subNavLevel(strNav, strReturnLink) {
  if (strNav == undefined) return;

  var idx = 0;

  while (idx < strNav.length && strNav.substr(idx, 1) == '*')
    idx ++;

  if (!strReturnLink)
    return idx;

  strNav = strNav.substr(idx);

  if (strNav.substr(0, 8) == '<nowiki>' &&
      strNav.substr(strNav.length - 9) == '</nowiki>') {
    // A nowiki tag means we use a nonfunctional link ('#') and use the 
    // entire string as the display.
    strNav = ['#', strNav.substr(8, strNav.length - 17)];
  }
  else {
    strNav = strNav.split('|');

    if (strNav.length == 1)
      strNav = [strNav[0], strNav[0]];

    // Hopefully will fix Chinese URLs without breaking the others
    strNav[0] = '/wiki/' +
      encodeURIComponent(strNav[0].replace(new RegExp(' ', 'g'), '_'));
  }

  switch (strReturnLink) {
    case 'link':
      return '<a href="' + strNav[0] + '">';

    case 'findlink': {
      if (strNav[0] == '#')
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

// Function to determine appropriate menu color. Adapted from Wikimarks
// code, http://wikimarks.wikia.com/wiki/Client.js, © Peter Coester, 2012.
var menuColor;

function getMenuColor() {
  if (menuColor && menuColor.length)
    return menuColor;

  var header  = $('#WikiHeader');
  var bgColor = $('#WikiaPageBackground').css('background-color');

  if (bgColor == 'transparent')
    bgColor = $('#WikiaPage').css('background-color');

  var navBg = $('.navbackground', header);
  menuColor = bgColor;

  if (navBg.length)
    menuColor = navBg.css('background-color');
  else {
    var pageHeader = $('#WikiaPageHeader');

    if (pageHeader.length)
      menuColor = pageHeader.css('border-bottom-color');
  }

  return menuColor;
}
// </syntaxhighlight>