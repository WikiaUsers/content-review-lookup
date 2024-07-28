$(document).ready(function() {
    function applyClassesFromDataAttributes() {
        $('th').each(function() {
            var $header = $(this);
            var columnIndex = $header.index() + 1;

            $.each($header[0].attributes, function() {
                if (this.name.startsWith('data-')) {
                    var className = '';
                    
                    switch (this.name) {
                        case 'data-align-left':
                            className = 'align-left';
                            break;
                        case 'data-align-center':
                            className = 'align-center';
                            break;
                        case 'data-align-right':
                            className = 'align-right';
                            break;
                        case 'data-valign-top':
                            className = 'valign-top';
                            break;
                        case 'data-valign-middle':
                            className = 'valign-middle';
                            break;
                        case 'data-valign-bottom':
                            className = 'valign-bottom';
                            break;
                        case 'data-no-wrap':
                            className = 'td-th-no-wrap';
                            break;
                    }

                    if (className) {
                        $header.closest('table').find('tr').each(function() {
                            $(this).find('td:nth-child(' + columnIndex + ')').addClass(className);
                        });
                    }
                }
            });
        });
    }

    function calculateColumnIndex(header) {
        var $header = $(header);
        var columnIndex = 0;
        var $row = $header.closest('tr');

        $row.children('th, td').each(function(index) {
            var colspan = $(this).attr('colspan') ? parseInt($(this).attr('colspan')) : 1;
            if (this === $header[0]) {
                return false;
            }
            columnIndex += colspan;
        });

        return columnIndex + 1;
    }

    function hideColumn(columnIndex) {
        $('table').each(function() {
            var $table = $(this);
            var rows = $table.find('tr');

            rows.each(function() {
                var $row = $(this);
                var cellIndex = 0;

                $row.children('th, td').each(function() {
                    var $cell = $(this);
                    var colspan = $cell.attr('colspan') ? parseInt($cell.attr('colspan')) : 1;

                    if (cellIndex < columnIndex && cellIndex + colspan >= columnIndex) {
                        $cell.addClass('hide-the-column');
                    }

                    cellIndex += colspan;
                });
            });
        });
    }

    applyClassesFromDataAttributes();

    $('th[data-hide-the-column]').each(function() {
        var columnIndex = calculateColumnIndex(this);
        hideColumn(columnIndex);
    });
});