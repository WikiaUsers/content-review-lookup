/*리브레 위키에서 포크크*/

$(document).ready(function() {
    $('.libre-responsive-table').each(function() {
        var $table = $(this);
        var $cells = $table.find('tbody th, tbody td');
        var $heads = $table.find('thead th');
        var cellsPerRow = $heads.length;
        $heads.each(function(headIndex) {
            var text = $(this).text();
            $cells
                .filter(function(cellIndex) {
                    return cellIndex % cellsPerRow === headIndex;
                })
                .attr('data-th', text);
        });
    });
});