// Szablon do zmiany tła
$(function() {
    if($('#dostosujTlo').length > 0) {
        var cl = $($('#dostosujTlo').get(0)).data('bg');
        if(cl) {
            cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/i, '_');
            $(document.body).addClass('tlo-' + cl);
        }
    }
});