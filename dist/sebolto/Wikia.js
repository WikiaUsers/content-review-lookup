(function ($, mw) {
  'use strict';

  /**
   * @description Function for use in positioning era icons in the page header,
   * modified from [[w:c:starwars:MediaWiki:Wikia.js]] & originally retrieved
   * from [[w:c:avatar:MediaWiki:Common.js/icons.js]]
   * @author [[User:Sebolto]] et al.
   */
  function addEraIcons () {

    // Declarations
    var container, target, action, styles;

    // Define name of holder element
    container = '#title-eraicons';

    if ($('.wds-community-header').length) {
      target = '#PageHeader';
      action = 'prepend';
      styles = {'position': 'absolute', 'right': '0px'};
    } else {
      target = '.WikiaPageHeader';
      action = 'append';
      styles = {'position': 'absolute', 'right': '0', 'bottom': '-2em'};
    }

    // Add elements and styles
    $(target)[action]($(container));
    $(container).css(styles).show();
  }

  $(addEraIcons);
})(jQuery, mediaWiki);