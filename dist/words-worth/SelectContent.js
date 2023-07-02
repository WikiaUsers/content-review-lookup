/**
 * @name            SelectContent
 * @description     Display content from the Select menu.
 * @author          KhangND
 */

// hook('wikipage.content') triggers function in preview mode
mw.hook('wikipage.content').add(function(content) {
    var containers = content.find('.sel-container'),
        fields = content.find('.fields');

    if(window.scLoaded || !containers.length || !fields.length)
        return;
    window.scLoaded = true;

    /**
     * @description Select onchange handler
     * @param       e: target event
     * @context     this: HTML element
     */
    function onChange(e) {
        var value = e.target.value;
        $(this).find('.field').each(function() {
            if(this.id === value) {
                $(this).show();
                $(window).scroll();
            } else
                $(this).hide();
        });
    }

    fields.each(function(i) {
        // creates <select>
        var $select = $('<select>', {
            appendTo: containers[i],
            change: $.proxy(onChange, this)
        });

        // creates <option> corresponding to field names
        var s_index = 0;
        $(this).find('.name')
            .hide()
            .each(function(i) {
                var separator = $(this).hasClass('separator');
                $('<option>', {
                    text: $(this).text(),
                    disabled: separator ? true : false,
                    val: separator ? '' : i - s_index,
                    appendTo: $select
                });
                if(separator) s_index++;
            });

        $(this).find('.field')
            .hide()
            .each(function(i) { $(this).attr('id', i); })
            .first().show();
    });
});