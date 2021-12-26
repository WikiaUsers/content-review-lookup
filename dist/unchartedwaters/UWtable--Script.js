/* <source lang=javascript> */

console.log("loading UWtable script");

if ($('table.UWtable').length) {
    $('table.UWtable > tbody > tr > td').on({
        'mouseover': function() {
            $(this).addClass('hover').siblings().addClass('hover');
        },
        'mouseout': function() {
            $(this).removeClass('hover').siblings().removeClass('hover');
        }
    });

    $n = $('table.UWtable').length;
    roundness = '8px';
    for (i = 0; i < $n; i++) {
        if ($('table.UWtable:eq(' + i + ') > tbody > tr:first-child > th:first-child').length)
            $('table.UWtable:eq(' + i + ')').css('border-top-left-radius', roundness);

        if ($('table.UWtable:eq(' + i + ') > tbody > tr:first-child > th:last-child').length)
            $('table.UWtable:eq(' + i + ')').css('border-top-right-radius', roundness);

        if ($('table.UWtable:eq(' + i + ') > tbody > tr:last-child > th:first-child').length)
            $('table.UWtable:eq(' + i + ')').css('border-bottom-left-radius', roundness);

        if ($('table.UWtable:eq(' + i + ') > tbody > tr:last-child > th:last-child').length)
            $('table.UWtable:eq(' + i + ')').css('border-bottom-right-radius', roundness);
    }
}

/* </source> */