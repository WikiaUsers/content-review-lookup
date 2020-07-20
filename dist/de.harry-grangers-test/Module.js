function getModules(callback) {
    $.get('http://de.harry-grangers-test.wikia.com/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&titles=MediaWiki:CustomUserGroups.js/Users.js&format=json').done(callback).fail(function(error) {
        console.error('Error: ' + error.responseText + '(' + error.statusText + ')');
        console.dir(error);
    });
}

getModules(function(data) {
    var modules = JSON.parse(data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*']);
    console.log('Modules',modules);
    if($('.module').length !== 0) {
        for(i = 0; i < modules; i++) {
            console.log(modules[i]);
            if(modules[i].mode == 'test' AND $('.module[data-mode]).length !== 0) {
                $('.module[data-mode="test"]').append(
                    $('<li />').html('<a href="/wiki/' + modules[i].url + '">' + modules[i].name + '</a>');
            }
            else {
                console.info('No modules in testmode');
            }
        }
    }
    else {
        console.error('could not find .modules in DOM');
    }
});
console.log('Modules load');