
/* JS extension configuration */
AddTalkButtonText = 'Talk';
ajaxPages = ['Special:RecentChanges','Special:WikiActivity'];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Standard_Edit_Summary.js configuration */
window.dev = window.dev || {};
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:StandardEditSummary'
};

/* SocialMediaButtons configuration */
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	userLang: "true"
};

// Theme customization from 9pm to 6am
$(function () {
 var d = new Date();
 if (d.getHours() < 6) {
  document.body.className += ' night';
 } 
 else if (d.getHours() > 21) {
  document.body.className += ' night';
 }
});

window.DiscordBannerSettings = {
    bannerStyle: '2',
    inviteLink: 'SQFWNZw',
    prependToRail: false
};

$('table.data:not(.datatable-loaded)').each(function () {
  var $table = $(this).addClass('datatable-loaded'),
    $tableHeader = $('<thead>');
  $table.prepend($tableHeader);
  $table.find('> tbody > tr').first().appendTo($tableHeader);
});

function initDataTables() {
    $('#cast-datatable').DataTable({
      dom: 'PBfrtlip',
      buttons: [{ extend: 'colvis', text: 'Seasons', columns: ':not(.actor)' }],
      ordering: true,
      searching: true,
      responsive: true,
      details: false,
      columnDefs: [
        { targets: '_all', orderable: true, searchable: true, searchPanes: { show: false } },
        { targets: [0], className: 'actor', name: 'actor', title: 'Actor', visible: true },
        { targets: [1], className: 'murderHouse', title: 'Murder House' },
        { targets: [2], className: 'asylum', title: 'Asylum' },
        { targets: [3], className: 'coven', title: 'Coven' },
        { targets: [4], className: 'freakShow', title: 'Freak Show' },
        { targets: [5], className: 'hotel', title: 'Hotel' },
        { targets: [6], className: 'roanoke', title: 'Roanoke' },
        { targets: [7], className: 'cult', title: 'Cult' },
        { targets: [8], className: 'apocalypse', title: 'Apocalypse' },
        { targets: [9], className: 'eightyFour', title: '1984' },
        { targets: [10], className: 'doubleFeature', title: 'Double Feature' }
      ],
      searchPanes: {
        initCollapsed: true,
        i18n: { title: '' },
        orderable: false,
        panes: [
          {
            header: 'Appearances',
            options: [
              { label: 'Murder House', value: function (rowData, rowIdx) { return rowData[1] !== ''; } },
              { label: 'Asylum', value: function (rowData, rowIdx) { return rowData[2] !== ''; } },
              { label: 'Coven', value: function (rowData, rowIdx) { return rowData[3] !== ''; } },
              { label: 'Freak Show', value: function (rowData, rowIdx) { return rowData[4] !== ''; } },
              { label: 'Hotel', value: function (rowData, rowIdx) { return rowData[5] !== ''; } },
              { label: 'Roanoke', value: function (rowData, rowIdx) { return rowData[6] !== ''; } },
              { label: 'Cult', value: function (rowData, rowIdx) { return rowData[7] !== ''; } },
              { label: 'Apocalypse', value: function (rowData, rowIdx) { return rowData[8] !== ''; } },
              { label: '1984', value: function (rowData, rowIdx) { return rowData[9] !== ''; } },
              { label: 'Double Feature', value: function (rowData, rowIdx) { return rowData[10] !== ''; } }
            ],
            dtOpts: { searching: false }
          }
        ]
      }
    });
    $('#storiesEpisodes-datatable').DataTable({
      columnDefs: [
        {
          targets: [0],
          title: 'Season',
          className: 'season never',
          visible: false,
          width: '10em',
          searchable: false
        },
        {
          targets: [1],
          className: 'title',
          orderable: true,
          searchable: true,
          responsivePriority: 1
        },
        {
          targets: [2],
          className: 'episodenum',
          title: '№',
          orderable: true,
          searchable: false,
          responsivePriority: 1
        },
        {
          targets: [3],
          className: 'date',
          orderable: true,
          responsivePriority: 2
        },
        {
          targets: [4],
          className: 'writer',
          orderable: false,
          responsivePriority: 2
        },
        {
          targets: [5],
          className: 'director',
          orderable: false,
          responsivePriority: 2
        },
        {
          targets: [6],
          className: 'description none',
          orderable: false,
          searchable: true,
          responsivePriority: 3
        },
        {
          targets: [7],
          title: 'Prominent Cast',
          className: 'cast none',
          orderable: false,
          searchable: true,
          responsivePriority: 3
        }
      ],
      order: [[0, 'asc'],[2, 'asc']],
      rowGroup: { dataSrc: 0 },
      ordering: true,
      searching: true,
      paging: false,
      responsive: true,
      responsiveDetails: [{ type: 'inline' }]
    });
    $('#storiesCast-datatable').DataTable({
      dom: 'fBrtlip',
      ordering: false,
      searching: true,
      responsive: true,
      info: false,
      details: false,
      pageLength: 25,
      columnDefs: [
        { targets: "_all", orderable: false, searchable: true, searchPanes: { show: false }},
        { targets: [0], className: 'actor', name: 'actor', title: 'Actor', visible: true},
        { targets: [1], className: 'storiesS1', title: 'Season 1' },
        { targets: [2], className: 'storiesS2', title: 'Season 2' }
      ],
      buttons: [{
            extend: 'searchPanes',
            text: 'Search Filters',
            config: {
                orderable: false,
                panes: [
                  {
                    header: 'Episode Appearances',
                    options: [
                      { label: 'Rubber(wo)Man', value: function (rowData, rowIdx) { return rowData[1].includes('Rubber(wo)Man') } },
                      { label: 'Drive In', value: function (rowData, rowIdx) { return rowData[1].includes("Drive In") } },
                      { label: 'The Naughty List', value: function (rowData, rowIdx) { return rowData[1].includes("The Naughty List") } },
                      { label: "BA'AL", value: function (rowData, rowIdx) { return rowData[1].includes("BA'AL") } },
                      { label: 'Feral', value: function (rowData, rowIdx) { return rowData[1].includes('Feral') } },
                      { label: 'Game Over', value: function (rowData, rowIdx) { return rowData[1].includes('Game Over') } },
                    ],
                    dtOpts: { searching: false }
                  }
                ]
            }
        }]
    });
  };

mw.hook('datatables.loaded').add(initDataTables);