/* Any JavaScript here will be loaded for all users on every page load. */

// SORTING REPLACEMENTS
mw.config.set(
  'tableSorterCollation', {
    'ä' : 'ae',
    'ö' : 'oe',
    'ß' : 'ss',
    'ü' : 'ue',
    /* REMOVE ANY NONE ALPHA CHARACTERS */
    ' ' : '',
    ',' : '',
    '!' : '',
    ':' : '',
    '.' : ''
  }
);