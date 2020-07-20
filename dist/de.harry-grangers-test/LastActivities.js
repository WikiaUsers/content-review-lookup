function getLastActivities(callback) {
    $.get('http://de.harry-grangers-test.wikia.com/api/v1/Activity/LatestActivity?limit=10&namespaces=0&allowDuplicates=true').done(callback);
}

var data = {};
var activities = {};
var editDate = undefined;
getLastActivities(function(data) {
    $('<div />').addClass('lastActivities').appendTo('body');
    console.log(data.items);
    for(i = 0; i < Object.keys(data.items).length; i++) {
        var articleName = '';
        activities = data.items;
        date = new Date(activities[i].timestamp * 1000);
        editDate = date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear();
        getArticleDescription(activities[i].article, function(articleDetails) {
            data = arguments[2];
            articleName = articleDetails.sections[0].title;
            getUserName(activities[i].user, function(userDetails) {
                data = arguments[2];
                username = userDetails.items[0].name;
                console.log('Article "' + articleName + '" was edited ' + editDate + ' by ' + username + '.');
                $('<div />').text('Der Artikel "' + articleName + '" wurde am ' + editDate + ' von ' + username + ' bearbeitet.');
            },data); 
        },data);
    }
});