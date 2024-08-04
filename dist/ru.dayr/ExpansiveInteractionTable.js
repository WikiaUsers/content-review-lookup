$(document).ready(function() {
    function applyClassesFromDataAttributes() {
        $('th, td').each(function() {
            var $cell = $(this);
            var columnIndex = calculateColumnIndex($cell);
            
            $.each($cell[0].attributes, function() {
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
                        applyClassToColumn(columnIndex, className, $cell);
                    }

                    if (this.name.startsWith('data-width-')) {
                        var width = this.name.substring('data-width-'.length);
                        setImageWidth(columnIndex, width);
                    }
                }
            });
        });
    }

    function calculateColumnIndex(cell) {
        var $cell = $(cell);
        var columnIndex = 0;
        var $row = $cell.closest('tr');

        $row.children('th, td').each(function(index) {
            var colspan = $(this).attr('colspan') ? parseInt($(this).attr('colspan')) : 1;
            if (this === $cell[0]) {
                return false;
            }
            columnIndex += colspan;
        });

        return columnIndex + 1;
    }

    function applyClassToColumn(columnIndex, className, $cell) {
        $('table').each(function() {
            var $table = $(this);
            var rows = $table.find('tr');

            rows.each(function() {
                var $row = $(this);
                var cellIndex = 0;

                $row.children('th, td').each(function() {
                    var $cellInRow = $(this);
                    var colspan = $cellInRow.attr('colspan') ? parseInt($cellInRow.attr('colspan')) : 1;

                    if (cellIndex < columnIndex && cellIndex + colspan >= columnIndex) {
                        if ($cellInRow.is('td')) {
                            $cellInRow.addClass(className);
                        }
                    }

                    cellIndex += colspan;
                });
            });
        });
    }

    function setImageWidth(columnIndex, width) {
        $('table').each(function() {
            var $table = $(this);
            var rows = $table.find('tr');

            rows.each(function() {
                var $row = $(this);
                var cellIndex = 0;

                $row.children('th, td').each(function() {
                    var $cellInRow = $(this);
                    var colspan = $cellInRow.attr('colspan') ? parseInt($cellInRow.attr('colspan')) : 1;

                    if (cellIndex < columnIndex && cellIndex + colspan >= columnIndex) {
                        if ($cellInRow.is('td')) {
                            $cellInRow.find('img').each(function() {
                                $(this).attr('style', 'width: ' + width + '; height: auto;');
                            });
                        }
                    }

                    cellIndex += colspan;
                });
            });
        });
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