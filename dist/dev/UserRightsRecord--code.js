/* UserRightsRecord by Bobogoobo
 * Displays a list of all users having certain rights and when they gained and lost them.
 * See description page for documentation on options.
 */
//IDEAS:
// custom date formatting
// add option to line everything up (luckily dates are already zero-padded)
// maybe I should allow sorting by highest duration within groups...
// should probably do something about group names if possible (e.g. sysop -> administrator) when desired
// should go through the data structure for cleanup instead of going through the HTML after it's done

$('.rightsrecord').each(function(thisidx) {
    var $urr = $(this),
      mode = $urr.attr('data-urr-mode') === 'users' ? 'users' : 'rights',
      exclude = $urr.attr('data-urr-exclude') ? $urr.attr('data-urr-exclude').split(', ') : [],
      start = $urr.attr('data-urr-start') ? '&lestart=' + $urr.attr('data-urr-start') : '',
      end = $urr.attr('data-urr-end') ? '&leend=' + $urr.attr('data-urr-end') : '',
      user = $urr.attr('data-urr-user') ? '&letitle=' + $urr.attr('data-urr-user') : '',
      minDays = parseInt($urr.attr('data-urr-daymin')) || 1,
      showDays = ($urr.attr('data-urr-showdays') || 'true').toLowerCase(),
      hideUnknown = (($urr.attr('data-urr-onlyknown') || 'false').toLowerCase() === 'true'),
      hidePresent = (($urr.attr('data-urr-onlypast') || 'false').toLowerCase() === 'true'),
      userNS = 'User',
      nameChanges = {},
      stuff = {};
        //rights: {'rollback':{'User:A':[[start, end]], 'User:B':[[start, end], [start, end]]}, 'sysop':{}, ...}
        //users: {'User:A':{'rollback':[[start, end], [start, end]], 'sysop':[[start, end]]}, 'User:B':{}, ...}

    try {
        nameChanges = JSON.parse($urr.text());
    } catch (SyntaxError) {
        if ($urr.text() !== '') {
            console.log('Invalid name change specification.');
        }
    }

    if (!($.isPlainObject(nameChanges))) {
        nameChanges = {}; //override any other valid JSON that may have been there
    }

    if (showDays === 'false') {
        showDays = false;
    } else if (showDays !== 'divided') {
        showDays = true;
    }

    //An approximation. Let me know if it is not sufficiently accurate, 
    // but it doesn't need to be exact. (Thanks StackOverflow as always)
    function dateDiff(date1, date2) {
        var days = 0;

        if (date1 === 'unknown') {
            return '??? days';
        }

        if (date2 === 'present') {
            date2 = new Date().toJSON();
            date2 = date2.substring(0, date2.indexOf('T'));
        }

        days = Math.round((new Date(date2) - new Date(date1))/8.64e+7);

        if (showDays !== 'divided') {
            return days.toString() + (days === 1 ? ' day' : ' days');
        } else {
            var counts = [0, 0, 0], str = [];
            counts[0] = Math.floor(days / 365);
            days = days % 365;
            counts[1] = Math.floor(days / 30);
            days = days % 30;
            counts[2] = days;

            if (counts[0]) str.push(counts[0] + ' year' + (counts[0] > 1 ? 's' : ''));
            if (counts[1]) str.push(counts[1] + ' month' + (counts[1] > 1 ? 's' : ''));
            if (counts[2]) str.push(counts[2] + ' day' + (counts[2] > 1 ? 's' : ''));

            return str.join(', ');
        }
    }

    //This seems like the best way to create objects in "stuff" as necessary...
    // hopefully it isn't too slow being called that often.
    function checkElement(name) {
        if (stuff[name] === undefined) {
            stuff[name] = {};
        }
    }

    function addDate(arr, target, timestamp, isPlus) {
        var e = ['', ''],
          arrInd = isPlus ? 0 : 1,
          plcInd = isPlus ? 1 : 0,
          placeholders = ['unknown', 'present'],
          arrlen;

        if (arr.length && arr[0] !== '') {
            for (var i = 0; i < arr.length; i++) {
                if (mode === 'rights') {
                    checkElement(arr[i]);
                    e = [arr[i], target];
                } else if (mode === 'users') {
                    checkElement(target);
                    e = [target, arr[i]];
                }

                if (stuff[e[0]][e[1]]) {
                    arrlen = stuff[e[0]][e[1]].length - 1;
                    if (stuff[e[0]][e[1]][arrlen][arrInd] === placeholders[arrInd] && !isPlus) {
                        //additions should always make a new element due to chronology
                        stuff[e[0]][e[1]][arrlen][arrInd] = timestamp;
                    } else {
                        stuff[e[0]][e[1]].push(['', '']);
                        stuff[e[0]][e[1]][arrlen+1][arrInd] = timestamp;
                        stuff[e[0]][e[1]][arrlen+1][plcInd] = placeholders[plcInd];
                    }
                } else {
                    stuff[e[0]][e[1]] = [['', '']];
                    stuff[e[0]][e[1]][0][arrInd] = timestamp;
                    stuff[e[0]][e[1]][0][plcInd] = placeholders[plcInd];
                }
            }
        }
    }

    function cleanOutput() {
        if (mode === 'rights') {
            $urr.find('h3').each(function() {
                if (!($(this).next().find('li').length)) {
                    $(this).next().remove();
                    $(this).remove();
                    $('#urr-toc').find('a[href="#' + $(this).attr('id') + '"]').closest('li').remove();
                }
            });
        } else if (mode === 'users') {
            $urr.find('li').each(function() {
                if ($(this).text() === $(this).find('a').text() + ': ') {
                    $(this).remove();
                }
            });
        }

        if (!($urr.find('li').length)) {
            $urr.html('No results found matching the criteria.');
        }
    }

    function getData(qcontinue, callback) {
        $.getJSON(mw.util.wikiScript('api') + '?action=query&list=logevents&letype=rights' + 
          '&leprop=title|timestamp|details' + qcontinue + end + user +
          '&ledir=newer&lelimit=max&format=json', function(data) {
            var evs = data.query.logevents, newArr, oldArr, target, timestamp, plus, minus;
            for (var i = 0; i < evs.length; i++) {
                if (evs[i].actionhidden !== undefined || !evs[i].rights) {
                    continue; //as always, some random thing to account for :P
                }

                target = evs[i].title;
                userNS = decodeURIComponent(target.substring(0, target.indexOf(':')));
                target = decodeURIComponent(target.substring(target.indexOf(':') + 1));
                if (nameChanges[target] === null) {
                    continue;
                }
                target = userNS + ':' + (nameChanges[target] || target);
                timestamp = evs[i].timestamp.substring(0, evs[i].timestamp.indexOf('T'));
                newArr = evs[i].rights['new'].split(', ');
                oldArr = evs[i].rights['old'].split(', ');
                //Array difference: https://stackoverflow.com/a/15385871/2848688
                plus = $(newArr).not(oldArr).not(exclude);
                minus = $(oldArr).not(newArr).not(exclude);

                addDate(plus, target, timestamp, true);
                addDate(minus, target, timestamp, false);
            }

            qcontinue = data['query-continue'];
            if (qcontinue !== undefined) {
                getData('&lestart=' + qcontinue.logevents.lestart, callback);
            } else {
                callback();
            }
        });
    }

    function putResults() {
        function arrMerge(arr) { //don't need the parameter thanks to epic scoping but I like to be safe
            var wrap = (mode === 'rights' ? [' (', '', ')'] : [' [', '', ']']);
            //best way I could think of to wrap a string like this

            var stop = arr.length;
            for (var k = 0; k < stop; k++) {
                wrap[1] = dateDiff(arr[k][0], arr[k][1]);

                if (
                    wrap[1].substring(0, wrap[1].indexOf(' ')) < minDays || 
                    (hideUnknown && arr[k][0] === 'unknown') || 
                    (hidePresent && arr[k][1] === 'present')
                ) {
                    arr.splice(k, 1);
                    stop -= 1;
                    k -= 1; //next iteration at same index
                } else {
                    arr[k] = arr[k].join(' &ndash; ') + (showDays ? wrap.join('') : '');
                }
            }
            return arr.join(', ');
        }

        var keysOuter = [], keysInner = [], item, merge;
        $urr.html('<h2>User rights record</h2>');
        if (mode === 'rights') {
            $urr.append('<table class="toc"><tr><td><ul id="urr-toc"></ul></td></tr></table>');
        } else if (mode === 'users') {
            $urr.append('<ul></ul>');
        }

        for (var keyOut in stuff) {
            keysOuter.push(keyOut);
        }
        keysOuter.sort();

        for (var i = 0; i < keysOuter.length; i++) {
            keysInner = [];
            for (var key in stuff[keysOuter[i]]) {
                keysInner.push(key);
            }
            keysInner.sort();

            for (var j = 0; j < keysInner.length; j++) {
                item = stuff[keysOuter[i]][keysInner[j]];
                merge = arrMerge(item);

                if (mode === 'rights') {
                    if (j === 0) {
                        $urr.append(
                            $('<h3 />', {
                                'id':'urr-' + keysOuter[i] + '-' + thisidx,
                                'text':keysOuter[i]
                            }).after(
                                $('<ul />', {'id':'urr-active'})
                            )
                        );

                        $('#urr-toc').append(
                            $('<li />', {
                                'class':'toclevel-1',
                                'html':$('<a />', {
                                    'href':'#urr-' + keysOuter[i] + '-' + thisidx,
                                    'text':keysOuter[i]
                                })
                            })
                        );
                    }

                    if (merge) {
                        $('#urr-active').append(
                            $('<li />').html(
                                $('<a />', {
                                    'href':mw.util.getUrl(keysInner[j]),
                                    'text':keysInner[j].substring(userNS.length + 1)
                                }).after(': ')
                            ).append(merge)
                        );
                    }
                } else if (mode === 'users') {
                    if (j === 0) {
                        $urr.children('ul').append(
                            $('<li />', {
                                'id':'urr-active',
                                'html':$('<a />', {
                                    'href':mw.util.getUrl(keysOuter[i]),
                                    'text':keysOuter[i].substring(userNS.length + 1)
                                }).after(': ')
                            })
                        );
                    } else if (merge && $('#urr-active').text().slice(-1) === ')') {
                        $('#urr-active').append(', ');
                    }

                    if (merge) {
                        $('#urr-active').append(keysInner[j] + ' (' + merge + ')');
                    }
                }
            }

            $('#urr-active').removeAttr('id');
        }

        cleanOutput(); //easier to clean up a mess than to avoid making one

        $('#urr-toc').removeAttr('id'); //for multiple instances on one page
    }

    //One line to call them all
    getData(start, putResults);
});