/* Any JavaScript here will be loaded for all users on every page load. */

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