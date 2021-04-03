// <syntaxhighlight lang="javascript">
/**
 * ListUsers.js
 *
 * Enumerates all users in a certain group
 * @author: [[w:User:.jun]]
 */

$(function() {
    if (!$('.listusers').length) return;
    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function(predicate) {
                var o = Object(this);
                var len = o.length >>> 0;
                var thisArg = arguments[1];
                var k = 0;
                while (k < len) {
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    k++;
                }
                return undefined;
            }
        });
    }//array.find
    var listUsers = $.extend({
        talk: true,
        contribs: false,
        editcount: false,
        limit: 10,
        active: true
    }, window.listUsers),
        gmgroups = ['bot', 'sysop', 'bureaucrat', 'staff', 'soap', 'helper', 'rollback', 'chatmoderator'];
    function createList (group, au) {
        var html = '';
        for (var i in au) {
            var user = au[i].name,
                enc = encodeURIComponent(user);
            html += '<li><a href="/wiki/User:' + enc + '">' + user + '</a>';
            if (listUsers.talk) {
                html += ' <a href="/wiki/User_talk:' + enc + '">(talk)</a>';
            }
            if (listUsers.contribs) {
                html += ' <a href="/wiki/Special:Contributions/' + enc + '">(contribs)</a>';
            }
            if (listUsers.editcount) {
                html += ' ' + au[i].editcount + ' edits.';
            }
            html += '</li>';
            $('.listusers#' + group + ' ul').html(html);
        }
    }//createlist
    function getUsers(group) {
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            list: 'allusers|groupmembers',
            augroup: group,
            aulimit: listUsers.limit,
            gmgroups: group,
            gmlimit: listUsers.limit,
            format: 'json'
        }, function(data) {
            $('.listusers#' + group).html('<ul></ul>');
            var au = data.users || data.query && data.query.allusers;
            if (au[0].id == 0) {
                $('.listusers#' + group).html('No users found in the ' + group + ' group.');
            } else {
                //get additional data if requested
                if (listUsers.editcount) {
                    var aunames = '';
                    au.forEach(function(el) {
                        aunames = aunames + '|' + el.name;
                    });
                    aunames = aunames.slice(1);//remove 1st |
                    $.getJSON(mw.util.wikiScript('api'), {
                        action: 'query',
                        list: 'users',
                        usprop: 'editcount',
                        uslimit: listUsers.limit,
                        ususers: aunames,
                        format: 'json'
                    }, function(d) {
                        if (!d.error) {
                            d.query.users.forEach(function(el) {
                                $.extend(true, au.find(function(e) {if (e.name === el.name) return true}), el);
                            });
                            createList(group, au);
                        }//if data
                    });
                } else {
                    createList(group, au);
                }//if editcount requested is
            }
        });
    }
    for (var i in gmgroups) {
        $('.listusers').each(function() {
            switch ($(this).attr('id')) {
                case gmgroups[i]: getUsers(gmgroups[i]);
                    break;
                case '':
                case undefined: $(this).html('No user group found.');
                    break;
            }
        });
    }
    if (window.listUsers && window.listUsers.customgroups) {
        csgroups = window.listUsers.customgroups;
        for (var i in csgroups) {
            $('.listusers').each(function() {
                switch ($(this).attr('id')) {
                    case csgroups[i]: getUsers(csgroups[i]);
                        break;
                    case '':
                    case undefined: $(this).html('No user group found.');
                        break;
                }
            });
        }
    }
});
// </syntaxhighlight>