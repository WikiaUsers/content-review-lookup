/* Any JavaScript here will be loaded for all users on every page load. */

/* Photo feed Instagram */
var username = 'austinmahone';
$.ajax({ 
    type: 'GET', 
    dataType: 'json',
    url: 'http://cors-anywhere.herokuapp.com/https://www.instagram.com/' + username + '/media',
    success: function (data) {
        $.each(data.items, function(idx, el) {
            var thumb = el.images.thumbnail.url;
            var link = 'https://www.instagram.com/p/' + el.code;
            $('#instagram-widget').append('<a href="' + link + '"><img src="' + thumb + '"/></a>');
            return idx < 8;
        })
    }
});