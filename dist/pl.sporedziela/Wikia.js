$(document).ready(function(){
$.ajax({
    type: "GET",
    data: "action=raw",
    url: "/wiki/Szablon:Najlepsze_dzieła/" + $('#najlepsze-dziela-load').text() + "",
    success: function(data){$('#najlepsze-dziela-load').text($('#najlepsze-dziela-load').text().replace("_", " "));$('#najlepsze-dziela-load').append(data);},
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
        $('#najlepsze-dziela-load').html("<small>Aktualnie nie mamy wybranego dzieła na medal. <a href=\"/wiki/Wiki Sporepedia:Dzieło na medal\">Głosuj na dzieło, które według ciebie zasługuje na ten tytuł!</a></small>");
    }
});
});