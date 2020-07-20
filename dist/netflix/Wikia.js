// Netflix Catalogue
// @Author: User:Original Authority
// source API: whats-on-netflix.com
// updated: 05/05/2020
// desc: a dynamic-table-view list of all Netflix's "original content" — including summaries, IMDb rating, programe type & image.
$(function() {
    if (wgPageName !== "Special:Netflix_Catalogue") {
        return;
    }
    $('title').text("Netflix Catalogue");
    $('.page-header__title').text("Netflix Catalogue");
    table = $('<table class=\"wikitable\" style=\"width:100%; font-family:Rubik; table-layout:fixed; color: white; text-align: center;\"><th style="background-color: darkred; font-size: 23px;">Title</th><th style="background-color: darkred; font-size: 23px;">Type</th><th style="background-color: darkred; font-size: 23px;">Summary</th><th style="background-color: darkred; font-size: 23px;">IMDB rating</th>');
      $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/https://www.whats-on-netflix.com/wp-content/plugins/whats-on-netflix/json/originals.json',
            type: 'GET',
            success: function(result) {
                // console.log(result);
                result.forEach(titleresult);
                function titleresult(result) {
                    // console.log(result.title)
                    titles = result.titles;
                    var tr = $('<tr>');
                    tr.append($('<td><img src="' + result.image_portrait + '" width="185px" /><br /><a href=\"/wiki/' + result.title + '\">' + result.title + '</a>')).css('font-weight', 'bold')
                    .append($('<td>', {
                        html: result.type
                    }))
                    .append($('<td>', {
                        html: result.description
                    }))
                    .append($('<td>', {
                        html: result.imdb
                    }));
                    table.append(tr);
                }
            table.append('<tr><th colspan="4" style="font-size:9px;">Version 0.1; <a href=\"http://originalauthortiy.wikia.com/wiki/User_talk:Original_Authority\">Suggest Changes</a></th></tr>');
            $('#mw-content-text').html(table);
        },
        error: function (error) {
        console.log(error);
    }
})
});