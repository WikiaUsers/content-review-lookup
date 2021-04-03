/**
 * Name:        DataTables.js
 * Author:      KockaAdmiralac <wikia@kocka.tech>
 * Description: Loads CSS and JavaScript from https://datatables.net and
 *              initializes all tables with the `datatable` class as data tables
 */
(function($, mw) {
    'use strict';
    var initialized = false, queue = [];
    function process($content) {
        $content.find('.datatable:not(.datatable-loaded)').each(function() {
            var $table = $(this).addClass('datatable-loaded'),
                $tableHeader = $('<thead>');
            $table.prepend($tableHeader);
            $table.find('> tbody > tr').first().appendTo($tableHeader);
            $table.DataTable();
        });
    }
    function initialize($content) {
        if (initialized) {
            process($content);
        } else {
            queue.push($content);
        }
    }
    mw.loader.load('https://cdn.datatables.net/v/dt/dt-1.10.23/fc-3.3.2/r-2.2.7/rg-1.1.2/sc-2.0.3/sp-1.2.2/sl-1.3.2/datatables.css', 'text/css');
    mw.loader.getScript('https://cdn.datatables.net/v/dt/dt-1.10.23/fc-3.3.2/r-2.2.7/rg-1.1.2/sc-2.0.3/sp-1.2.2/sl-1.3.2/datatables.js').then(function() {
        initialized = true;
        queue.forEach(process);
    });
    mw.hook('wikipage.content').add(initialize);
})(jQuery, mediaWiki);