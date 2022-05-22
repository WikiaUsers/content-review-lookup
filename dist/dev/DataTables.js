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
    mw.loader.load('https://cdn.datatables.net/v/dt/dt-1.12.0/b-2.2.3/b-colvis-2.2.3/date-1.1.2/fc-4.1.0/r-2.3.0/rg-1.2.0/sc-2.0.6/sp-2.0.1/sl-1.4.0/datatables.css', 'text/css');
    mw.loader.getScript('https://cdn.datatables.net/v/dt/dt-1.12.0/b-2.2.3/b-colvis-2.2.3/date-1.1.2/fc-4.1.0/r-2.3.0/rg-1.2.0/sc-2.0.6/sp-2.0.1/sl-1.4.0/datatables.js').then(function() {
        initialized = true;
        queue.forEach(process);
    });
    mw.hook('wikipage.content').add(initialize);
    mw.hook('datatables.loaded').fire();
})(jQuery, mediaWiki);