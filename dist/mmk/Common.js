/* Any JavaScript here will be loaded for all users on every page load. */

// Importing MediaWiki:Common.js
//importScriptURI('http://animeono.wikia.com/index.php?title=MediaWiki:Common.js' 
//    + '&action=raw&ctype=text/javascript');
// END Importing MediaWiki:Common.js

// SORTING REPLACEMENTS
mw.config.set(
  'tableSorterCollation', {
    '�' : 'ae',
    '�' : 'oe',
    '�' : 'ss',
    '�' : 'ue',
    /* REMOVE ANY NONE ALPHA CHARACTERS */
    ' ' : '',
    ',' : '',
    '!' : '',
    ':' : '',
    '.' : ''
  }
);