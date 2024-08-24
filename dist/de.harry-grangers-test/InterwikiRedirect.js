if($('.redirectText').exists() && url.query.hasOwnProperty('redirect') === false && !!$('.redirectText a').text().match(/^(w:c:|http(s)?)/)) {
    new_url = $('.redirectText a').attr('href');
    $('.redirectText').detach();
    $('.redirectMsg').empty();
    $('.redirectMsg').append(
        $('<span />').text('Sie werden in fünf Sekunden weitergeleitet an folgende URL: ' + new_url).prepend(
            $('<strong>').text('Achtung: ')    
        )
    );
    setTimeout(function() {
        window.location.href = new_url;
    },5000);
}