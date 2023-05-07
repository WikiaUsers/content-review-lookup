/* HTML5 Utility: converts MediaWiki-generated HTML4 elements to modern HTML5 equivalents */
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

/* THEAD Utility: creates THEADs in tables if the first TR (in TBODY) is all TH */
/* required for DataTables initialization */
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

/* collapses expanded child rows to previous columns */
/* required for DataTables initialization (which can use Responsive for a similar effect) */
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

// Ideally, most of the DataTables generated from SMW+SRF will not need this configuration
// after SRF v4.10

// Prepare tables to become DataTables
$('table.data:not(.datatable-loaded)', 'table.data:not(.dataTable)').tableTHEAD();

(function($, mw) {
'use strict';
$('table.data.setManifest').tableTHEAD();
$('table.data.setsContainingCard').tableTHEAD();

function initializeDT() {
	$.getJSON(
	'https://yugioh.fandom.com/wiki/MediaWiki:Custom-DataTables.json?action=raw',
	function(dtConfig) {
		$.each(dtConfig.setManifest.buttons, function(i, v) {
			if (v.text == 'by Region') {
				v.action = function(e, dt, node, config) {
					e.preventDefault();
					dt.rowGroup().dataSrc(0);
					dt.column(0).visible(false);
					dt.order.fixed({ pre: [[ 0, 'asc' ]] }).draw();
				};
			} else if (v.text == 'by Card') {
				v.action = function(e, dt, node, config) {
					e.preventDefault();
					dt.rowGroup().dataSrc(2);
					dt.column(0).visible(true);
					dt.order.fixed({ pre: [[ 2, 'asc' ]]}).draw();
				};
			}
		});
		$('table.data.setManifest')
			.not('.dataTable').DataTable(dtConfig.setManifest);

		$.each(dtConfig.setsContainingCard.buttons, function(i, v) {
			if (v.text == 'by Region') {
				v.action = function(e, dt, node, config) {
					e.preventDefault();
					dt.rowGroup().dataSrc(0);
					dt.column(0).visible(false);
					dt.order.fixed({ pre: [[ 0, 'asc' ]] }).draw();
				};
			} else if (v.text == 'by Set') {
				v.action = function(e, dt, node, config) {
					e.preventDefault();
					dt.rowGroup().dataSrc(2);
					dt.column(0).visible(true);
					dt.order.fixed({ pre: [[ 2, 'asc' ]] }).draw();
				};
			}
		});
		$('table.data.setsContainingCard')
			.not('.dataTable').DataTable(dtConfig.setsContainingCard);
	});
};

	// Opportunities to initialize, due to race condition with dev:DataTable.js ImportJS
	mw.hook('datatables.loaded').add(initializeDT);
	$(window).on('load',
		$(".page-content table:has(thead):not(.dataTable)").each(initializeDT)
	);
})(jQuery, mediaWiki);