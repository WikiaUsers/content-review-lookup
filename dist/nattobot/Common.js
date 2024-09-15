/* Any JavaScript here will be loaded for all users on every page load. */
/* Adding the list of the last new page creations */

$.ajax({

url: "https://nattobot.fandom.com/api.php?action=query&format=json&list=logevents&formatversion=2&leprop=title&letype=create&lenamespace=0&lelimit=5",

type: 'GET',

dataType: 'json',

success: function(res) {

var newPageList = '<ul>';

if (res && res.query && res.query.logevents) {

res.query.logevents.forEach(function(e) {

if (e.title) {

newPageList += '<li><a href="/wiki/' + e.title + '">' + e.title + '</a></li>';

}

});

}

newPageList += '</ul>';

$( '#recent-changes-api' ).html(newPageList);

}

});