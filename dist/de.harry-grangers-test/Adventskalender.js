function getDoorContent(callback) {
    $.ajax({
        url: "http://seb-be.bplaced.net/api/adventskalender.php",
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    }).done(callback);
}

getDoorContent(function(data) {
    response = JSON.parse(data.replace('XMLHttpRequest',''));
    if(response.error && response.error.length) {
        console.error(response.error);
    }
    else {
        date = new Date();
        day = date.getDay();
        $('.adventskalender #' + day).data('content',response.content);
    }
});