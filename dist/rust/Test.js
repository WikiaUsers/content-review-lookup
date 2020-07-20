/* Temporary file used for testing Javascript */


/* HighlightUsers by Bobogoobo
 * Changes color of links to specified groups and users
 * TODO: redo but much better (recursive would be easier - I've learned a lot since I wrote this thing)
 */
function highlightUsers() {
    var highlight = window.highlight || {}, selector = '', that, userstr, indices = [];
 
    var i = 0;
    for (var ns in mw.config.get('wgNamespaceIds')) {
        if (i === 4) {
            userstr = ns;
        }
        i++;
    }
    userstr = userstr.charAt(0).toUpperCase() + userstr.substring(1);
 
    if (highlight['selectAll']) {
        selector = 'a[href$=":';
    } else {
        selector = 'a[href="/wiki/' + userstr + ':';
    }
 
    for (var y in highlight) {
        indices.push(y);
    }
 
    for (var x in highlight) {
        that = highlight[x];
 
        if (x === 'selectAll') {
            continue;
        } else if (x === 'users') {
            for (var user in that) {
                $(selector + mw.util.wikiUrlencode(user) + '"]').css('color', that[user]).attr(
                  'data-highlight-index', $.inArray('users', indices));
            }
        } else {
            (function(slim, shady) { //JavaScript doesn't like to cooperate with me
                $.getJSON('/api.php?action=query&list=allusers&augroup=' + shady + 
                  '&aulimit=max&format=json', function(data) {
                    var stuff = data.query.allusers; //, select = '';
 
                    for (var user in stuff) {
                        //select += selector + stuff[user].name.replace(/ /g, '_') + '"], ';
                        $(selector + mw.util.wikiUrlencode(stuff[user].name) + '"]').each(function() {
                            if (($(this).attr('data-highlight-index') || -1) < $.inArray(shady, indices)) {
                                $(this).attr('data-highlight-index', $.inArray(shady, indices));
                                $(this).css('color', slim);
                            }
                        });
                    }
                    //select = select.substring(0, select.length - 2);
                    //$(select).css('color', slim);
                });
            }(that, x));
        }
    }
};
 
highlightUsers();
window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(highlightUsers);