function generateTable() {
    var rows = [];
    var lvmax = $('#level-max').val() | 0;
    var fullexp = +$('#full-exp').val();
    var expcurve = +$('#exp-curve').val();

    var exps = [];

    for (var i = 0; i < lvmax; ++ i) {
        exps[i] = (fullexp * Math.pow(i / (lvmax-1), expcurve)) | 0;
    }

    for (var i = 1; i <= lvmax; ++ i) {
        var curexp = exps[i-1];
        var nextexp = exps[i];
        var diffexp;
        if (nextexp) {
            diffexp = nextexp - curexp;
        } else {
            diffexp = '';
        }
        rows.push('<tr><th>', i, '<td>', exps[i-1], '<td>', diffexp);
    }

    $('#exp-body').html(rows.join(''));
}

function typeSelectorChanged() {
    var values = this.value.split(/-/);
    $('#full-exp').val(values[0]);
    $('#level-max').val(values[1]);
    $('#exp-curve').val(values[2]);
    generateTable();

    var text = $('option:selected', this).text().replace(/\s*\([^)]*\)$/, '');
    $('#type-description .mw-headline').filter(function() {
        return $(this).text().replace(/\s/g, '') == text;
    }).parent().next().clone().appendTo($('#type-info').empty());
}

var $typeSelector = $('#type-selector').on('change', typeSelectorChanged).val(document.location.hash.substr(1));
$('#full-exp,#level-max,#exp-curve').on('change', generateTable);
typeSelectorChanged.call($typeSelector[0], null);