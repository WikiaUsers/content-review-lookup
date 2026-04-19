/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */

/*Spoiler Alert*/
SpoilerAlert = {
    pages: ["Spoiler"],
};

/* Top de Editores */
$('.50topeditors').each(function() {
    //Variable y ajustes
    var myDate = new Date(),
        end = myDate.toJSON(),
        start = '',
        $te = $(this),
        userlist = {},
        html = '',
        namespace = ($te.attr('data-te-namespace') || ''),
        type = ($te.attr('data-te-type') || 'edit|new'),
        show = ($te.attr('data-te-show') || ''),
        user = $te.attr('data-te-user') ? '&rcuser=' + $te.attr('data-te-user') : '',
        limit = (Number($te.attr('data-te-limit')) || 25),
        dateoffset = (Number($te.attr('data-te-offset')) || 30);
    limit = user ? 1 : limit;
    myDate.setDate(myDate.getDate() - dateoffset);
    start = myDate.toJSON();

    //Get and parse API data
    function requestLoop(strt, callback) {
        var request = '/api.php?action=query&list=recentchanges&rcstart=' + strt +
            '&rcend=' + end + '&rcnamespace=' + namespace + '&rcshow=' + show +
            '&rctype=' + type + user + '&rcdir=newer&rcprop=user&rclimit=500&format=json';
        console.log(request);
        $.getJSON(request, function(data) {
            for (var change in data.query.recentchanges) {
                var username = data.query.recentchanges[change].user;
                if (userlist[username] !== undefined) {
                    userlist[username] += 1;
                } else {
                    userlist[username] = 1;
                }
            }
            start = data['query-continue']; // JS needs hyphenated values in bracket notation
            if (start !== undefined) {
                requestLoop(start.recentchanges.rcstart, callback);
            } else {
                callback();
            }
        });
    }
    requestLoop(start, function() {

        //Create list in necessary structure and sort
        var userslist = [];
        for (var x in userlist) {
            userslist.push({
                'user': x,
                'count': userlist[x]
            });
        }
        userslist.sort(function(a, b) {
            if (a.count > b.count) {
                return -1;
            } else if (a.count < b.count) {
                return 1;
            } else {
                if (a.user < b.user) {
                    return -1;
                } else if (a.user > b.user) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });

        //Create html and append to page
        for (var i = 0; i < userslist.length && i < limit; i++) {
            if (user) {
                html += userslist[i].count;
            } else {
                html += '<li><a href="/wiki/User:' + encodeURIComponent(
                        userslist[i].user.replace(/ /g, '_')) + '">' +
                    userslist[i].user + '</a>: ' + userslist[i].count + '</li>';
            }
        }
        user ? $te.html(html) : $te.html('<ol>' + html + '</ol>');
    });
});
/* TESTING */
$('.365topeditors').each(function() {
    //Variables and retrieving settings
    var myDate = new Date(),
        end = myDate.toJSON(),
        start = '',
        $te = $(this),
        userlist = {},
        html = '',
        namespace = ($te.attr('data-te-namespace') || ''),
        type = ($te.attr('data-te-type') || 'edit|new'),
        show = ($te.attr('data-te-show') || ''),
        user = $te.attr('data-te-user') ? '&rcuser=' + $te.attr('data-te-user') : '',
        limit = (Number($te.attr('data-te-limit')) || 25),
        dateoffset = (Number($te.attr('data-te-offset')) || 90);
    limit = user ? 1 : limit;
    myDate.setDate(myDate.getDate() - dateoffset);
    start = myDate.toJSON();

    //Get and parse API data
    function requestLoop(strt, callback) {
        var request = '/api.php?action=query&list=recentchanges&rcstart=' + strt +
            '&rcend=' + end + '&rcnamespace=' + namespace + '&rcshow=' + show +
            '&rctype=' + type + user + '&rcdir=newer&rcprop=user&rclimit=500&format=json';
        console.log(request);
        $.getJSON(request, function(data) {
            for (var change in data.query.recentchanges) {
                var username = data.query.recentchanges[change].user;
                if (userlist[username] !== undefined) {
                    userlist[username] += 1;
                } else {
                    userlist[username] = 1;
                }
            }
            start = data['query-continue']; // JS needs hyphenated values in bracket notation
            if (start !== undefined) {
                requestLoop(start.recentchanges.rcstart, callback);
            } else {
                callback();
            }
        });
    }
    requestLoop(start, function() {

        //Create list in necessary structure and sort
        var userslist = [];
        for (var x in userlist) {
            userslist.push({
                'user': x,
                'count': userlist[x]
            });
        }
        userslist.sort(function(a, b) {
            if (a.count > b.count) {
                return -1;
            } else if (a.count < b.count) {
                return 1;
            } else {
                if (a.user < b.user) {
                    return -1;
                } else if (a.user > b.user) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });

        //Create html and append to page
        for (var i = 0; i < userslist.length && i < limit; i++) {
            if (user) {
                html += userslist[i].count;
            } else {
                html += '<li><a href="/wiki/User:' + encodeURIComponent(
                        userslist[i].user.replace(/ /g, '_')) + '">' +
                    userslist[i].user + '</a>: ' + userslist[i].count + '</li>';
            }
        }
        user ? $te.html(html) : $te.html('<ol>' + html + '</ol>');
    });
});

importScriptPage('ExternalImageLoader/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UserAccountAge/code2.js',
    ]
});