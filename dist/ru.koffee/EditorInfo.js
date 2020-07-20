/**
 * @name    EditorInfo
 * @desc    The tool that shows characters' and bytes' amounts and the difference (in bytes) relative to current size of page.
 * @author  Kofirs2634
 * @version 1.0
 * @docs    [[EditorInfo]]
 */
$(function() {
    var action = mw.config.get('wgAction');

    if (window.EditorInfo || action != 'edit' || !$('#wpTextbox1')) return;
    window.EditorInfo = true;

    // by https://gist.github.com/lovasoa
    function byteLength(str) {
        var s = str.length;
        for (var i = str.length - 1; i >= 0; i--) {
            var code = str.charCodeAt(i);
            if (code > 0x7f && code <= 0x7ff) s++;
            else if (code > 0x7ff && code <= 0xffff) s += 2;
            if (code >= 0xDC00 && code <= 0xDFFF) i--;
        }
        return s;
    }

    areaVal = $('#wpTextbox1').val();
    pageSize = byteLength(areaVal);

    $('#cke_toolbar_source_1').after($('<div>', { id: 'EditorInfo' })
        .append($('<ul>')
            .append($('<li><b>Символов:</b> <span id="EI-chars">-</span></li>'))
            .append($('<li><b><abbr title="Без учета категорий">Вес:</abbr></b> <span id="EI-weight">-</span> байт</li>'))
            .append($('<li><b>Изменение:</b> <span id="EI-diff" class="mw-plusminus-null">0</span></li>'))
        ))

    // Initial state
    if (areaVal.length) {
        $('#EI-chars').text(areaVal.length - 1);
        $('#EI-weight').text(pageSize - 1)
    } else {
        $('#EI-chars').text(areaVal.length);
        $('#EI-weight').text(pageSize)
    }

    // Update it
    $('#wpTextbox1').keyup(function() {
        areaVal = $('#wpTextbox1').val(),
        bytes = byteLength(areaVal);

        // Chars & weight
        $('#EI-chars').text(areaVal.length);
        $('#EI-weight').text(bytes);

        // Diff
        if (bytes - pageSize > 0) {
            $('#EI-diff').text('+' + (bytes - pageSize))
                .attr('class', 'mw-plusminus-pos')
        } else {
            $('#EI-diff').text(bytes - pageSize);
            if (bytes - pageSize < 0) $('#EI-diff').attr('class', 'mw-plusminus-neg')
            else $('#EI-diff').attr('class', 'mw-plusminus-null')
        }

        if (Math.abs(bytes - pageSize) >= 500) $('#EI-diff').css('font-weight', 'bold')
        else $('#EI-diff').css('font-weight', 'normal')
    })
})