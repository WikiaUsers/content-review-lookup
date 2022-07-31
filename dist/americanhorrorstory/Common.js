/* JS extension configuration */
AddTalkButtonText = 'Talk';

/* dev:DiscordBanner.js */
window.DiscordBannerSettings = {
  bannerStyle: '2',
  inviteLink: 'SQFWNZw',
  prependToRail: false
};

/* HTML5 Utility */
$.fn.changeElementType = function(newType) {
  var newElements = [];
  $(this).each(function() {
    var attrs = {};
    $.each(this.attributes, function(idx, attr) {
      attrs[attr.nodeName] = attr.nodeValue;
    });
    var newElement = $('<' + newType + '/>', attrs).append($(this).contents());
    $(this).replaceWith(newElement);
    newElements.push(newElement);
  });
  return $(newElements);
};

$("[data-true-element='aside']").changeElementType('aside');
$("[data-true-element='figure']").changeElementType('figure');
$("[data-true-element='figcaption']").changeElementType('figcaption');
$("[data-true-element='section']").changeElementType('section');
$("[data-true-element='nav']").changeElementType('nav');
$("[data-true-element]").removeAttr('data-true-element');

$.fn.tableTHEAD = function() {
  $(this)
    .filter('table')
    .not(':has(thead)')
    .has('> tbody > tr:first() > th')
    .not(':has(> tbody > tr:first() > *:not(th))')
    .each(function() {
      $table = $(this)
      var $tableHeader = $('<thead>');
      $(this).prepend($tableHeader);
      $(this).find('> tbody > tr').first().appendTo($tableHeader);
  });
  return $(this);
};

$.fn.collapseExpandedChildRow = function(newColumnName) {
  $(this)
   .filter('table')
   .has('> tbody > tr.expand-child')
   .each(function() {
    var headingRow = $(this).has('thead') ? $(this).find('thead > tr').first() : $(this).find('tbody > tr').first();
    headingRow.append('<th>' + newColumnName + '</th>');
    $(this).find('> tbody > tr').each(function() {
      var $row = $(this);
      if ($(this).next('tr').is('.expand-child')) {
        var expansionRow = $row.next('tr');
        var expandedChild = expansionRow.children('td').first();
        $row.append(expandedChild.removeClass('colspan'));
        expansionRow.remove();
      } else {
        $row.append('<td>');
      };
    });
  });
  return $(this);
};

/* dev:DataTables.js */
$('table.data:not(.datatable-loaded)', 'table.data:not(.dataTable)').tableTHEAD();

(function($, mw) {
  'use strict';

  function initializeDT() {
    $.getJSON(
      'https://americanhorrorstory.fandom.com/wiki/MediaWiki:Custom-DataTables.json?action=raw',
      function(dtConfig) {
        // [[:Category:Cast]]
        $.each(dtConfig.ahsCast.searchPanes.panes[0].options, function(i, v) {
          v.value = function(rowData, rowIdx) {
            return rowData[i + 1] !== '';
          }
        });
        $('.page-Category_Cast #cast-datatable').tableTHEAD();
        $('.page-Category_Cast #cast-datatable').not('.dataTable').DataTable(dtConfig.ahsCast);

        // [[American Horror Stories]]
        $('.page-American_Horror_Stories #episodes-table')
            .tableTHEAD()
            .collapseExpandedChildRow('Description');
        $('.page-American_Horror_Stories #episodes-table').not('.dataTable').DataTable(dtConfig.storiesEpisodes);

        // [[:Category:Cast of American Horror Stories]]
        $.each(dtConfig.storiesCast.buttons[0].config.panes[0].options, function(i, v) {
          v.value = function(rowData, rowIdx) {
            return rowData[1].includes(v.label);
          }
        });
        $('.page-Category_Cast_of_American_Horror_Stories #storiesCast-datatable')
            .tableTHEAD();
        $('.page-Category_Cast_of_American_Horror_Stories #storiesCast-datatable')
            .not('.dataTable').DataTable(dtConfig.storiesCast);
      }
    );
  };
  mw.hook('datatables.loaded').add(initializeDT);
  mw.loader.getScript('https://cdn.datatables.net/v/dt/dt-1.12.0/b-2.2.3/b-colvis-2.2.3/date-1.1.2/fc-4.1.0/r-2.3.0/rg-1.2.0/sc-2.0.6/sp-2.0.1/sl-1.4.0/datatables.js').then(
        mw.hook('datatables.loaded').fire()
  );
})(jQuery, mediaWiki);

/* Hypercard Project */
$('div.hypercard').changeElementType('figure');
$('div.card-gallery').changeElementType('section');
$('div.card-gallery, section.card-gallery').before(
  '<p>Click or tap the item title for more information.</p>'
);

$('div.hypercard .pi-title, figure.hypercard .pi-title').click(function() {
  $(this).closest('.hypercard').toggleClass('active');
});