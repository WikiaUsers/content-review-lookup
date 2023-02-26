/* BHM toolbar advertisement */
var toolbarLabel = 'BHM';
var toolbarLinks = [
    {link: 'https://bit.ly/FandomBHMblog-toolbar', label: 'Fandom blog'},
    {link: 'https://americanhorrorstory.fandom.com/f/p/4400000000003693116', label: 'Discussion post'},
    {link: 'https://americanhorrorstory.fandom.com/wiki/User_blog:Johnny_Warren/Black_American_Horror_History_Month', label: 'Black American Horror History'},
    {link: 'https://bit.ly/FandomBHMMillerStory', label: 'Editor Story: Meet Miller'},
    {link: 'https://bit.ly/FandomBHMTimeline', label: 'BHM Entertainment Timeline'},
];
var toolbarElement = document.createElement( 'li' );
var toolbarWrapper = document.querySelector( '#WikiaBar .tools' );
toolbarElement.classList.add( 'custom' );
toolbarElement.classList.add( 'menu' );
toolbarElement.classList.add( 'wds-dropdown' );
toolbarElement.classList.add( 'wds-is-flipped' );
toolbarElement.innerHTML = '<span class="wds-dropdown__toggle">' + 
    '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a href="#">' + toolbarLabel + '</a>' + 
'</span>' + 
'<div class="wds-dropdown__content">' + 
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* BHM logo link */
$('.fandom-community-header__image').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Click here to learn more about Black History Month at Fandom.')
        )
        .attr('href', 'https://bit.ly/FandomBHMblog-logo')
);

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
  $('.page-Category_Cast #cast-datatable').tableTHEAD();
  $('.page-American_Horror_Stories #episodes-table').tableTHEAD();
  $('.page-Category_Cast_of_American_Horror_Stories #storiesCast-datatable').tableTHEAD();
  $('table.appearances-by-cast').tableTHEAD();

  function initializeDT () {
    $.getJSON(
      'https://americanhorrorstory.fandom.com/wiki/MediaWiki:Custom-DataTables.json?action=raw',
      function(dtConfig) {
        // [[:Category:Cast]]
        $.each(dtConfig.ahsCast.searchPanes.panes[0].options, function(i, v) {
          v.value = function(rowData, rowIdx) {
            return rowData[i + 1] !== '';
          }
        });
        $('.page-Category_Cast #cast-datatable').not('.dataTable').DataTable(dtConfig.ahsCast);

        // [[American Horror Stories]]
        $('.page-American_Horror_Stories #episodes-table').collapseExpandedChildRow('Description');
        $('.page-American_Horror_Stories #episodes-table').not('.dataTable').DataTable(dtConfig.storiesEpisodes);

        // [[:Category:Cast of American Horror Stories]]
        $.each(dtConfig.storiesCast.buttons[0].config.panes[0].options, function(i, v) {
          v.value = function(rowData, rowIdx) {
            return rowData[1].includes(v.label);
          }
        });
        $('.page-Category_Cast_of_American_Horror_Stories #storiesCast-datatable')
            .not('.dataTable').DataTable(dtConfig.storiesCast);

        // Cast pages
        $.each(dtConfig.appearancesByCast.buttons, function(i, v) {
            v.action = function ( e, dt, node, config ) {
              e.preventDefault();
              dt.rowGroup().dataSrc( i );
              dt.order.fixed( {pre: [[ i, 'asc' ]]} ).draw();
            }
        });
        $('.appearances-by-cast')
            .not('.dataTable').DataTable(dtConfig.appearancesByCast);
     });
  };
  
  // Opportunities to initialize, due to race condition with dev:DataTable.js ImportJS
  mw.hook('datatables.loaded').add(initializeDT);
  $(window).on('load',
     $(".page-content table:has(thead):not(.dataTable)").each(initializeDT)
  );
  $(window).on('resize scroll', function() {
    if ($(".page-content table:has(thead):not(.dataTable)").visible( true )) { initializeDT() }
  });
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