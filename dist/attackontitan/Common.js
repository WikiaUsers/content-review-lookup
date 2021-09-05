/* eslint-env browser, jquery */
(function () {
  'use strict';

  console.log('AoT Wiki JS v2.0.3');

  /// /////////////////////////////////////////////////////////////////////////
  //                                GENERAL                                 //
  /// /////////////////////////////////////////////////////////////////////////

  /************************************************/
  /* Adds option to refresh page to edit dropdown */
  /************************************************/

  var url = '//' + location.host + location.pathname + '?action=purge';
  $('.page-header__contribution-buttons .wds-list, .WikiaMenuElement').append('<li><a id="refresh-button" href="' + url + '" title="Refresh page">Refresh</a></li>');

  /********************************/
  /* Tooltips for the media icons */
  /********************************/

  $('#media-icons a').tooltip();

  /// /////////////////////////////////////////////////////////////////////////
  //                            CONFIGURATIONS                              //
  /// /////////////////////////////////////////////////////////////////////////

  /********************/
  /* AutoEditDropdown */
  /********************/

  window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
  };

  /****************/
  /* Auto Refresh */
  /****************/

  window.AjaxRCRefreshText = 'Auto-Refresh';
  window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
  window.ajaxPages = [
    'Special:WikiActivity',
    'Special:RecentChanges',
    'Special:Log'
  ];
  window.ajaxRefresh = 30000;

  /************/
  /* AjaxDiff */
  /************/

  window.AjaxDiff = {
    expiry: 'infinite',
    reason: 'Vandalism'
  };

  /****************/
  /* WikiActivity */
  /****************/

  window.rwaOptions = {
    refresh: true,
    refreshDelay: 30000
  };
})();