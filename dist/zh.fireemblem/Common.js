/* 此处的JavaScript将加载于所有用户每一个页面。 */

/* ====================================================================== */
/* ============================= Selector =============================== */
/* Description: Improves the display functionality of content.
   Used for Template:Selector.
   Author: KhangND */

var max = 30; // max number of fields
 
$(function() {
    var containers = $('.sel-container');
    var fields = $('.fields');

    for (indx = 0; indx < containers.length; indx++) {
        $(fields[indx]).attr('id', 'select' + (indx + 1));
        var selector = '#select' + (indx + 1);

        //Prepare options
        var options = "";
        for (i = 1; i <= max; i++) {
            text = $(selector + ' #option' + i).text();
            if (text !== ''){
                options = options + "<option value='"+i+"'>" + text + "</option>";
                $(selector + ' #option' + i).css('display', 'none');
            }
        }

        //Append to container
        $(containers[indx]).append("<select id='selector" + (indx + 1) + "' onchange='change(" + indx + ")'>" + options + "</select>");
    }

});

//Onchange handler
function change(indx) {
    var selector = '#select' + (indx + 1);
    var option = $('#selector' + (indx + 1)).val();
    for (i = 1; i <= max; i++) {
        if (i != option)
            $(selector + ' #changefield' + i).css('display', 'none');
        else
            $(selector + ' #changefield' + i).css('display', 'block');
    }
}