$(document).ready(function() {
    function applyClassesFromDataAttributes() {
        $('table').each(function() {
            var $table = $(this);
            var columnIndexMap = buildColumnIndexMap($table);

            $table.find('thead th').each(function() {
                var $cell = $(this);
                var columnIndex = getColumnIndex($cell, columnIndexMap);

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
                            applyClassToColumn($table, columnIndex, className);
                        }

                        if (this.name.startsWith('data-width-')) {
                            var width = this.name.substring('data-width-'.length);
                            setImageWidth($table, columnIndex, width);
                        }
                    }
                });
            });

            $table.find('thead th[data-hide-the-column]').each(function() {
                var columnIndex = getColumnIndex($(this), columnIndexMap);
                hideColumn($table, columnIndex);
            });
        });
    }

    function buildColumnIndexMap($table) {
        var columnIndexMap = [];
        var currentRowIndex = 0;

        $table.find('thead tr').each(function() {
            var $row = $(this);
            var cellIndex = 0;

            $row.children('th, td').each(function() {
                var $cell = $(this);
                var colspan = $cell.attr('colspan') ? parseInt($cell.attr('colspan')) : 1;
                var rowspan = $cell.attr('rowspan') ? parseInt($cell.attr('rowspan')) : 1;

                for (var i = 0; i < colspan; i++) {
                    while (columnIndexMap[currentRowIndex] && columnIndexMap[currentRowIndex][cellIndex]) {
                        cellIndex++;
                    }
                    
                    for (var j = 0; j < rowspan; j++) {
                        if (!columnIndexMap[currentRowIndex + j]) {
                            columnIndexMap[currentRowIndex + j] = [];
                        }
                        columnIndexMap[currentRowIndex + j][cellIndex] = $cell;
                    }

                    cellIndex++;
                }
            });

            currentRowIndex++;
        });

        return columnIndexMap;
    }

    function getColumnIndex($cell, columnIndexMap) {
        var rowIndex = $cell.closest('tr').index();
        var cellIndex = 0;

        for (var i = 0; i < columnIndexMap[rowIndex].length; i++) {
            if (columnIndexMap[rowIndex][i][0] === $cell[0]) {
                return i;
            }
        }

        return -1;
    }

    function applyClassToColumn($table, columnIndex, className) {
        $table.find('tbody tr').each(function() {
            var $row = $(this);
            var cellIndex = 0;

            $row.children('td').each(function() {
                var $cell = $(this);
                var colspan = $cell.attr('colspan') ? parseInt($cell.attr('colspan')) : 1;

                if (cellIndex <= columnIndex && cellIndex + colspan > columnIndex) {
                    $cell.addClass(className);
                }

                cellIndex += colspan;
            });
        });
    }

    function setImageWidth($table, columnIndex, width) {
        $table.find('tbody tr').each(function() {
            var $row = $(this);
            var cellIndex = 0;

            $row.children('td').each(function() {
                var $cell = $(this);
                var colspan = $cell.attr('colspan') ? parseInt($cell.attr('colspan')) : 1;

                if (cellIndex <= columnIndex && cellIndex + colspan > columnIndex) {
                    $cell.find('img').each(function() {
                        $(this).attr('style', 'width: ' + width + '; height: auto;');
                    });
                }

                cellIndex += colspan;
            });
        });
    }

    function hideColumn($table, columnIndex) {
        $table.find('tr').each(function() {
            var $row = $(this);
            var cellIndex = 0;

            $row.children('th, td').each(function() {
                var $cell = $(this);
                var colspan = $cell.attr('colspan') ? parseInt($cell.attr('colspan')) : 1;

                if (cellIndex <= columnIndex && cellIndex + colspan > columnIndex) {
                    $cell.addClass('hide-the-column');
                }

                cellIndex += colspan;
            });
        });
    }

    applyClassesFromDataAttributes();
});