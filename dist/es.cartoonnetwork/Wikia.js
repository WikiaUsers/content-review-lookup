// Fondos personalizados en artículos (traído de pl.cartoon-network)
$(function() {
    if($('#dostosujTlo').length > 0) {
        var cl = $($('#dostosujTlo').get(0)).data('bg');
        if(cl) {
            cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/ig, '_');
            $(document.body).addClass('tlo-' + cl);
        }
    }
});