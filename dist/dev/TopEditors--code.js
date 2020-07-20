/* TopEditors script by Bobogoobo
 * Please see for full documentation: https://dev.wikia.com/wiki/TopEditors
 */
$('.topeditors').each(function() {
    //Variables and retrieving settings
    var myDate = new Date(), end = myDate.toJSON(), start = '', 
      $te = $(this), userlist = {}, html = '',
      namespace = ($te.attr('data-te-namespace') || ''),
      type = ($te.attr('data-te-type') || 'edit|new'),
      show = ($te.attr('data-te-show') || ''),
      user = $te.attr('data-te-user') ? '&rcuser=' + $te.attr('data-te-user') : '',
      limit = (Number($te.attr('data-te-limit')) || 25),
      dateoffset = (Number($te.attr('data-te-offset')) || 7),
      exclude = ($te.attr('data-te-exclude') ? JSON.parse($te.attr('data-te-exclude')) : '');
    limit = user ? 1 : limit;
    myDate.setDate(myDate.getDate() - dateoffset);
    start = myDate.toJSON();
    
    //Get and parse API data
    function requestLoop(strt, callback) {
        $.getJSON(mw.util.wikiScript('api'), {
            action: 'query',
            list: 'recentchanges',
            rcstart: strt,
            rcend: end,
            rcnamespace: namespace,
            rcshow: show,
            rctype: type,
            rcuser: user || undefined,
            rcdir: 'newer',
            rcprop: 'user',
            rclimit: 'max',
            format: 'json'
        }, function(data) {
            var username;
            for (var change in data.query.recentchanges) {
                username = data.query.recentchanges[change].user;
                if (exclude.hasOwnProperty(username)) {
                    continue;
                }
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
        userslist.push({'user':x, 'count':userlist[x]});
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
            html += '<li><a href="' + mw.util.getUrl('User:' + userslist[i].user) + '">' +
              userslist[i].user + '</a>: ' + userslist[i].count + '</li>';
        }
    }
    user ? $te.html(html) : $te.html('<ol>' + html + '</ol>');
    });
});