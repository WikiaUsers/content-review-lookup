/* JS extension configuration */
AddTalkButtonText = 'Talk';

/* dev:DiscordBanner.js */
window.DiscordBannerSettings = {
  bannerStyle: '2',
  inviteLink: 'SQFWNZw',
  prependToRail: false
};

/* dev:DataTables.js */
$('table.data:not(.datatable-loaded)').each(function () {
  var $table = $(this).addClass('datatable-loaded'),
    $tableHeader = $('<thead>');
  $table.prepend($tableHeader);
  $table.find('> tbody > tr').first().appendTo($tableHeader);
});

$.getJSON(
  'https://americanhorrorstory.fandom.com/wiki/MediaWiki:Custom-DataTables.json?action=raw',
  function (dtConfig) {
    // [[Category:Cast]]
    $.each( dtConfig.ahsCast.searchPanes.panes[0].options, function( i, v ) {
      v.value = function ( rowData, rowIdx ) {
        return rowData[i + 1] !== '';
      }
    });
    $('#cast-datatable').DataTable(dtConfig.ahsCast);

    // [[American Horror Stories/test]]
    $('#storiesEpisodes-datatable').DataTable(dtConfig.storiesEpisodes);

    // [[Category:Cast of American Horror Stories]]
    $.each( dtConfig.storiesCast.buttons[0].config.panes[0].options, function( i, v ) {
      v.value = function ( rowData, rowIdx ) {
        return rowData[1].includes(v.label);
      }
    });
    $('#storiesCast-datatable').DataTable(dtConfig.storiesCast);
  }
);

// mw.hook('datatables.loaded').add(initDataTables);

/* HTML5 Utility */
$.fn.changeElementType = function (newType) {
  var newElements = [];
  $(this).each(function () {
    var attrs = {};
    $.each(this.attributes, function (idx, attr) {
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

/* Hypercard Project */
$('div.hypercard').changeElementType('figure');
$('div.card-gallery').changeElementType('section');
$('div.card-gallery, section.card-gallery').before(
  '<p>Click or tap the item title for more information.</p>'
);

$('div.hypercard .pi-title, figure.hypercard .pi-title').click(function () {
  $(this).closest('.hypercard').toggleClass('active');
});