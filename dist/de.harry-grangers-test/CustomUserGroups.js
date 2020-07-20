$.getScript('http://underscorejs.org/underscore.js', function() {
    getUsers(function(data) {
        var users = JSON.parse(data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*']);
        var affected = _.where(users,{'username':wgUserName}).length === 0 ? false : true;
        if(affected === true) {
            var search = _.where(users,{"username":wgUserName});
            var groups = search[0].groups;
            $.merge(wgUserGroups,groups);
            console.log('New groups for',wgUserName +':',wgUserGroups);
        }
        else {
            console.log('User not affected',affected);
        }
    });
});

function getUsers(callback) {
    $.get('http://de.harry-grangers-test.wikia.com/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&titles=MediaWiki:CustomUserGroups.js/Users.js&format=json').done(callback).fail(function(error) {
        console.error('Error: ' + error.responseText + '(' + error.statusText + ')');
        console.dir(error);
    });
}

console.log('CustomUserGroups Module load');