$.fn.extend({
    outerHTML : function() {
        return $(this).wrapAll('<div>').parent().html();
    }
});