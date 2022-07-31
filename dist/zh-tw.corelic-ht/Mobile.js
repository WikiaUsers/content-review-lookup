/* 此處所有的JavaScript都會在使用者使用行動版網站時載入 */
/*  Tabber alternative, same as common.js
    Author: Meow1101
*/
$.when(mw.loader.using('mediawiki.util'), $.ready).then(function () {
  $tabList = $('.js-tabber-list');
  // Early stop if no tab is found.
  if ($tabList.length === 0) return;

  function toggleContentDisplay(tabname, displayType) {
    // display: none to hide content
    $('.' + tabname + '-content').each(function () {
      $(this).css('display', displayType);
    });
  }

  function setSelection(element) {
    // Hide all siblings' content
    $(element).siblings('.js-tabber-toggle').each(function () {
      $(this).removeClass('current-selection');
      toggleContentDisplay($(this).attr('data-tag'), 'none');
    });
    // Show selected content
    $(element).addClass('current-selection');
    toggleContentDisplay($(element).attr('data-tag'), '');
  }

  $tabList.each(function () {
    $(this).children('.js-tabber-toggle').each(function (index) {
      // Callback for clicking tabname
      $(this).click(function () {
        setSelection(this);
      });
      // hide all content but index 0
      if (index === 0) setSelection(this);
    });
  });
});