$('.page-exists input').on('input',function() {
    $(this).siblings('span').find('img').show();
    $.getJSON('/api.php?action=query&titles=' + $(this).val() + '&format=json',function(data) {
        console.log(!data.query.pages[Object.keys(data.query.pages)[0]].hasOwnProperty('missing'));
    });
});