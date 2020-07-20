function makeUnitSelector(select, unitData, onfinish) {
  $.ajax({url:'//cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2.min.js', dataType:'script', cache:true, success:function () {
    function formatUnit(u) {
        var unit = unitData[u.id];
        return '<img src="' + unit.smallimage + '" width=30 height=30> ' + u.id + ': ' + unit.name;
    }
    function formatUnitShort(u) {
        var unit = unitData[u.id];
        return '<img src="' + unit.smallimage + '" width=30 height=30> ' + u.id;
    }

    var options = [];
    $.each(unitData, function (k, v) {
        if (v) {
            options.push('<option value='+k+'>'+k+': '+v.name);
        }
    });
    options.sort();
    select.html(options.join('')).select2({
        formatResult: formatUnit,
        formatSelection: select[0].multiple ? formatUnitShort : formatUnit,
        escapeMarkup: function (s) { return s; },
        width: 'resolve'
    });
    if (onfinish) { onfinish(select); }
  }});
}