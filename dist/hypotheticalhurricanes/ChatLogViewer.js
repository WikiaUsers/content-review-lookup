/*\
|*| provide a visual display for the chat logs
|*|
|*| @author Penguin-Pal [[w:c:community:User:Penguin-Pal]]
|*|         all complaints should be addressed to that parroteer, or to one of the wiki's admins
\*/


/* =================================== *\
	# global object
\* =================================== */

window.$cl = {};
$cl.data = {};
$cl.fn = {};

/* =================================== *\
	# data
\* =================================== */

/* month list */
$cl.data.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/* year list */
$cl.data.years = [2015, 2016, 2017, 2018, 2019, 2020];

/* last message poster - for '.continued' messages */
$cl.data.lastPoster = '';

/* users */
$cl.data.users = {
    curr: [], // array of users in current request
    data: {} // users whose information has already been loaded: key = user, value = object
};

/* configuration */
$cl.data.logFormats = [
    { prefix: 'Hypothetical Hurricanes Wiki:Chat/Logs', format: 'DMY' },
    { prefix: 'Hypothetical Hurricanes Wiki:CCB Logs', format: 'MDY' },
    { prefix: 'Hypothetical Hurricanes Wiki:CCB Logs/2.8', format: 'MDY' }
];


/* =================================== *\
	# functions
\* =================================== */

/* 0-pad a single-digit number */
$cl.fn.padNum = function(n) {
    var num = Number(n);
	return (num < 10 ? '0' : '') + num;
};

/* get date components and formatted strings */
$cl.fn.getSelectedDateInfo = function() {
    var dd = $('#chatlog-date-dd').val(),
        mm = $('#chatlog-date-mm').val(),
        yy = $('#chatlog-date-yy').val(),
        monthName = (mm && $cl.data.months[Number(mm) - 1]) ? $cl.data.months[Number(mm) - 1] : 'INVALID_MONTH';

    if (!dd || !mm || !yy || monthName === 'INVALID_MONTH') {
         console.warn("CL: getSelectedDateInfo - Invalid date components selected. DD:", dd, "MM:", mm, "YY:", yy);
    }

    return {
        dd: dd,
        mm: mm,
        yy: yy,
        // DD-MM-YYYY
        dmy: $cl.fn.padNum(dd) + ' ' + monthName + ' ' + yy,
        // MM-DD-YYYY
        mdy: $cl.fn.padNum(mm) + '-' + $cl.fn.padNum(dd) + '-' + yy
    };
};

/* enable & disable ui inputs */
$cl.fn.setInputsState = function(state) {
    var a = $('#chatlog-container').find('input, button, select');
    if (state === 0 || state === false) {
        $(a).prop('disabled', true);
    } else {
        $(a).prop('disabled', false);
    }
};

$cl.fn.constructPageTitle = function(formatConfig, dateInfo) {
    var dateString;
    if (formatConfig.format === 'DMY') {
        dateString = dateInfo.dmy;
        if (dateString.includes('INVALID_MONTH')) {
            console.error("CL: Cannot construct DMY title with invalid month:", dateInfo);
            return null;
        }
    } else if (formatConfig.format === 'MDY') {
        dateString = dateInfo.mdy;
    } else {
        console.error("CL: Unknown date format in config:", formatConfig.format);
        return null;
    }
    if (!dateInfo.dd || !dateInfo.mm || !dateInfo.yy) {
         console.error("CL: Cannot construct title with invalid date components:", dateInfo);
         return null;
    }
    return formatConfig.prefix + '/' + dateString;
};


/* get logs content of a given date */
$cl.fn.getLogs = function() {
    var dateInfo = $cl.fn.getSelectedDateInfo();
    var potentialTitles = [];

    if (!dateInfo.dd || !dateInfo.mm || !dateInfo.yy || dateInfo.dmy.includes('INVALID_MONTH')) {
         $('#chatlog-status').html('Error: Please select a valid date.');
         return;
    }

    for (var i = 0; i < $cl.data.logFormats.length; i++) {
        var title = $cl.fn.constructPageTitle($cl.data.logFormats[i], dateInfo);
        if (title) {
            potentialTitles.push(title);
        }
    }

    if (potentialTitles.length === 0) {
        $('#chatlog-status').html('Error: No valid log page titles could be constructed.');
        $cl.fn.setInputsState(1);
        return;
    }

    var apiTitles = potentialTitles.join('|');
    var requestedDateStr = dateInfo.dd + ' ' + $cl.data.months[Number(dateInfo.mm) - 1] + ' ' + dateInfo.yy;

    $('#chatlog-status').html('Searching for logs from ' + requestedDateStr + '...');
    $('#chatlog-output').empty();

    $.getJSON('/api.php', {
        action: 'query',
        format: 'json',
        prop: 'revisions',
        rvprop: 'content',
        titles: apiTitles,
        formatversion: 2,
        rvslots: 'main',
        cb: new Date().getTime()
    })
    .done(function(data) {
        if (!data || !data.query || !data.query.pages) {
             console.error("CL: Invalid API response structure:", data);
             $('#chatlog-status').html('Error: Received invalid data from server.');
             $cl.fn.setInputsState(1);
             return;
        }

        var pages = data.query.pages;
        var logFound = false;
        var loadedTitle = '';

        for (var i = 0; i < potentialTitles.length; i++) {
            var currentTitle = potentialTitles[i];
            var pageData = pages.find(function(p) { return p.title === currentTitle; });

            if (pageData && !pageData.missing && pageData.revisions && pageData.revisions.length > 0 && pageData.revisions[0].slots && pageData.revisions[0].slots.main && typeof pageData.revisions[0].slots.main.content === 'string') {
                logFound = true;
                loadedTitle = currentTitle;
                var content = pageData.revisions[0].slots.main.content;
                $cl.data.users.curr = []; // reset user list for this log
                $cl.fn.parseRawContent(content);
                $('#chatlog-status').html('Logs from ' + requestedDateStr + ' (loaded from <code>' + loadedTitle + '</code>) have successfully loaded! :)');
                break;
            }
        }

        if (!logFound) {
            $('#chatlog-status').html('Logs from ' + requestedDateStr + ' could not be found in any known location.<br />Please try again later or pick a different date');
            $cl.fn.setInputsState(1);
        }
    })
    .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.error("CL: API request failed: " + err);
        $('#chatlog-status').html('Error loading logs: ' + err + '. Check browser console for details.');
        $cl.fn.setInputsState(1);
    });
};


/* parse raw page content */
$cl.fn.parseRawContent = function(data) {
    var cleanedData = data
        .replace(/^\s*<pre[^>]*>\s*/i, '')
        .replace(/\s*<\/pre\s*>\s*(\[\[Category:[^\]]+\]\]\s*)*$/i, '');

    // match lines starting with timestamp
    var matches = cleanedData.match(/^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\][\s\S]*?(?=\n\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\]|\n*$)/gm);

    if (matches && matches.length > 0) {
        $cl.fn.parseSeparatedMessages(matches);
    } else {
         $('#chatlog-output').html('<li class="chatlog-error">Could not parse any valid log messages from the page content.</li>');
         $cl.fn.onAfterLoaded();
    }
};

/* parse separated messages */
$cl.fn.parseSeparatedMessages = function(messages) {
    var output = $('<ul />');
    $cl.data.lastPoster = '';
    for (var i = 0; i < messages.length; i++) {
        if (messages[i] && messages[i].trim()) {
            var parsedMsg = $cl.fn.parseMsg(messages[i].trim());
            if (parsedMsg) {
                 $(output).append(parsedMsg);
            }
        }
    }
    $('#chatlog-output').html(output);
    $cl.fn.addAvatars(); // fetch avatars after parsing messages
};

/* go through each message and convert it to a <li> */
$cl.fn.parseMsg = function(msg) {
    try {
        msg = msg.trim();
        if (!msg) return null;

        var timeRegex = /^\[(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})\]\s*([\s\S]*)$/;
        var match = msg.match(timeRegex);

        if (!match) {
            console.warn("CL: parseMsg - Skipping line with unexpected start format:", msg);
            return $('<li class="chatlog-error" />').text("Skipped unrecognized line start: " + msg.substring(0, 60) + "...");
        }

        var timestamp = match[1];
        var timeStr = timestamp.substring(11);
        var restOfLine = match[2].trim(); // contains entities like <User>

        var output;

        if (restOfLine.startsWith('- ') || restOfLine.startsWith('-!-')) {
            var alertText = restOfLine.substring(restOfLine.indexOf(' ') + 1).trim();
            output = $('<li class="inline-alert" />').text(alertText);
            $cl.data.lastPoster = '';
        }
        else {
            var decodedRestOfLine;
            try {
                decodedRestOfLine = $('<textarea />').html(restOfLine).text();
            } catch (decodeError) {
                 console.error("CL: parseMsg - Error decoding restOfLine:", restOfLine, decodeError);
                 return $('<li class="chatlog-error" />').text("Skipped - decode error: " + msg.substring(0, 60) + "...");
            }

            // check the decoded string
            var startsWithBracket = decodedRestOfLine.startsWith('<');
            var containsBracket = decodedRestOfLine.includes('>');

            if (startsWithBracket && containsBracket) {
                 var userEndIndex = decodedRestOfLine.indexOf('>');
                 var userStartIndex = 0;

                 if (userEndIndex > userStartIndex) {
                    // extract from decoded string
                    var user = decodedRestOfLine.substring(userStartIndex + 1, userEndIndex).trim();
                    var messageContent = decodedRestOfLine.substring(userEndIndex + 1).trim();

                    var decodedUser = user; // already decoded
                    var decodedMessage = messageContent; // already decoded

                    // build the output
                    output = $('<li />').attr({ 'data-user': decodedUser });
                    $('<img class="avatar" />').appendTo(output); // placeholder
                    $('<span class="time" />').text(timeStr).appendTo(output);
                    $('<span class="username" />').append($('<a />').attr('href', mw.util.getUrl('User:' + decodedUser)).text(decodedUser)).appendTo(output);

                    var messageSpan = $('<span class="message" />').text(decodedMessage);
                    messageSpan.html(messageSpan.html().replace(/\n/g, '<br />'));
                    messageSpan.appendTo(output);

                    // continued message check
                    if ($cl.data.lastPoster === decodedUser) {
                        $(output).addClass('continued');
                    } else {
                        $cl.data.lastPoster = decodedUser;
                    }

                    // /me message check
                    if (decodedMessage.startsWith('/me ')) {
                        $(output).addClass('me-message');
                        var meUserSpan = $('<span />').text(decodedUser).html();
                        var meActionSpan = $('<span />').text(decodedMessage.substring(4)).html();
                        $(output).find('.message').html('* ' + meUserSpan + ' ' + meActionSpan);
                     }

                    if ($cl.data.users.curr.indexOf(decodedUser) === -1) {
                        $cl.data.users.curr.push(decodedUser);
                    }
                 } else {
                    console.warn("CL: parseMsg - DECODED Bracket indices mismatch:", msg, "StartIdx:", userStartIndex, "EndIdx:", userEndIndex);
                    output = $('<li class="chatlog-error" />').text("Skipped - internal parsing error (decoded): " + msg.substring(0, 60) + "...");
                    $cl.data.lastPoster = '';
                 }
            }
            else {
                console.warn("CL: parseMsg - Skipping line, unknown format after decoding:", msg);
                output = $('<li class="chatlog-error" />').text("Skipped unrecognized line format: " + msg.substring(0, 60) + "...");
                $cl.data.lastPoster = '';
            }
        }

        return output;

    } catch (e) {
        console.error("CL: parseMsg - Error parsing message:", msg, e);
        return $('<li class="chatlog-error" />').text("Error parsing line: " + msg.substring(0, 60) + "...");
    }
};


/* add avatars */
$cl.fn.addAvatars = function() {
    var missing = [],
        user;
    for (var i = 0; i < $cl.data.users.curr.length; i++) {
        user = $cl.data.users.curr[i];
        if (!$cl.data.users.data.hasOwnProperty(user)) {
            missing.push(user);
        }
    }

    var applyAvatars = function() {
        $('#chatlog-output li[data-user]').each(function() {
            var li = $(this);
            var user = li.attr('data-user');
            var avatarImg = li.find('.avatar');

            if ($cl.data.users.data.hasOwnProperty(user)) {
                 var avatar = $cl.data.users.data[user].avatar;
                 if (avatar) {
                     avatarImg.attr('src', avatar);
                 } else {
                     avatarImg.addClass('no-avatar');
                 }
            } else {
                 console.warn("CL: applyAvatars - User data missing unexpectedly for:", user);
                 avatarImg.addClass('no-avatar-data');
            }
        });
        $cl.fn.onAfterLoaded();
    };

    if (missing.length === 0) {
        applyAvatars();
        return;
    }

    $cl.fn.queryUsers(missing, applyAvatars);
};

/* get user ids and avatar urls */
$cl.fn.queryUsers = function(users, cb) {
    var userDetailsApi = '/api/v1/User/Details';
    var userList = users.join('|');

    $.getJSON('/api.php', {
        action: 'query',
        format: 'json',
        list: 'users',
        ususers: userList,
        formatversion: 2,
        cb: new Date().getTime()
    })
    .done(function(usersdata) {
        if (!usersdata.query || !usersdata.query.users) {
             console.error("CL: Invalid response from MediaWiki user query API:", usersdata);
             cb();
             return;
        }

        var userMap = {};
        var ids = [];

        usersdata.query.users.forEach(function(u) {
            $cl.data.users.data[u.name] = $cl.data.users.data[u.name] || {};
            if (!u.invalid && !u.missing && u.userid) {
                $cl.data.users.data[u.name].id = u.userid;
                ids.push(u.userid);
                userMap[u.userid] = u.name;
            } else {
                 $cl.data.users.data[u.name].id = null;
            }
        });

        // get avatar URLs (if any were found)
        if (ids.length > 0) {
            $.getJSON(userDetailsApi, {
                ids: ids.join(','),
                size: 28,
                cb: new Date().getTime()
            })
            .done(function(wikiausers) {
                 if (wikiausers && wikiausers.items) {
                     wikiausers.items.forEach(function(a) {
                         var userName = userMap[a.user_id];
                         if (userName && $cl.data.users.data[userName]) {
                             $cl.data.users.data[userName].avatar = a.avatar;
                         }
                     });
                 } else {
                      console.warn("CL: Invalid or empty response from User Details API:", wikiausers);
                 }
                 cb();
            })
            .fail(function(jqxhr, textStatus, error) {
                 console.error("CL: User Details API request failed:", textStatus, error);
                 cb();
            });
        } else {
            cb();
        }
    })
    .fail(function(jqxhr, textStatus, error) {
        console.error("CL: MediaWiki user query API request failed:", textStatus, error);
        cb();
    });
};

/* when the log list been updated and avatars processed */
$cl.fn.onAfterLoaded = function() {
    $cl.fn.setInputsState(1);
};

/* generate markup */
$cl.fn.generateMarkup = function(anchor) {
    /* html */
    var ui = $(
            '<div id="chatlog-container">\n' +
				'\t<div id="chatlog-controls">\n' +
					'\t\t<p>\n' +
						'\t\t\t<label for="chatlog-date-mm">Select date:</label>\n' +
						'\t\t\t<select id="chatlog-date-mm" aria-label="Month"></select>\n' +
						'\t\t\t<select id="chatlog-date-dd" aria-label="Day"></select>\n' +
						'\t\t\t<select id="chatlog-date-yy" aria-label="Year"></select>\n' +
						'\t\t\t<button type="button" id="chatlog-go">Go</button>\n' +
					'\t\t</p>\n' +
				'\t</div>\n' +
				'\t<div id="chatlog-status" aria-live="polite">Select a date and click "Go" to load logs.</div>\n' +
				'\t<section id="chatlog-output" aria-live="polite" aria-atomic="true"></section>\n' +
			'</div>'
        );

    var a = ui.find('#chatlog-date-dd'),
        b = ui.find('#chatlog-date-mm'),
        c = ui.find('#chatlog-date-yy');

    // populate day dropdown
    for (var i = 1; i <= 31; i++) {
        a.append($('<option>', { value: i, text: i }));
    }
    // populate month dropdown
    for (var i = 0; i < $cl.data.months.length; i++) {
        b.append($('<option>', { value: i + 1, text: $cl.data.months[i] }));
    }
    // populate year dropdown
    var currentYear = new Date().getFullYear();
    var startYear = $cl.data.years.length ? Math.min.apply(Math, $cl.data.years) : currentYear - 5;
    var endYear = $cl.data.years.length ? Math.max(currentYear, Math.max.apply(Math, $cl.data.years)) : currentYear;

    for (var y = endYear; y >= startYear; y--) {
        c.append($('<option>', { value: y, text: y }));
    }

    var today = new Date();
    if (a.find('option[value="' + today.getDate() + '"]').length) { a.val(today.getDate()); }
    if (b.find('option[value="' + (today.getMonth() + 1) + '"]').length) { b.val(today.getMonth() + 1); }
    if (c.find('option[value="' + today.getFullYear() + '"]').length) {
       c.val(today.getFullYear());
    } else if (c.find('option').length > 0) {
        c.val(c.find('option:first').val());
    }

    $(anchor).replaceWith(ui);

    /* css */
    mw.util.addCSS(
        '#chatlog-container {\n' +
            '\tmargin: 1em 0;\n' +
            '\tpadding: 0;\n' +
            '\tbackground: #f9f9f9;\n' +
            '\tborder: 1px solid #ccc;\n' +
            '\tcolor: #3a3a3a;\n' +
        '}\n' +
        '#chatlog-controls p {\n' +
            '\tpadding: 10px 15px;\n' +
            '\tmargin: 0;\n' +
            '\tborder-bottom: 1px solid #ccc;\n' +
            '\tbackground: #eee;\n' +
        '}\n' +
        '#chatlog-controls label {\n' +
            '\tmargin-right: 5px;\n' +
            '\tfont-weight: bold;\n' +
        '}\n' +
        '#chatlog-controls select, #chatlog-controls button {\n' +
             '\tpadding: 4px 6px;\n' +
             '\tmargin-right: 5px;\n' +
             '\tvertical-align: middle;\n' +
        '}\n' +
         '#chatlog-status {\n' +
            '\tpadding: 10px 15px;\n' +
            '\tmin-height: 1.5em;\n' +
            '\tbackground: #f0f0f0;\n' +
            '\tborder-bottom: 1px solid #ccc;\n' +
            '\tfont-style: italic;\n' +
            '\tcolor: #555;\n' +
        '}\n' +
        '#chatlog-status code {\n' +
             '\tbackground: #e0e0e0;\n' +
             '\tpadding: 1px 4px;\n' +
             '\tborder-radius: 3px;\n' +
             '\tfont-family: monospace;\n' +
        '}\n' +
        '#chatlog-output {\n' +
            '\tmax-height: 600px;\n' +
            '\toverflow-y: auto;\n' +
            '\tbackground: #fff;\n' +
        '}\n' +
        '#chatlog-output ul {\n' +
            '\tfont-size: 13px;\n' +
            '\tmargin: 0;\n' +
            '\tpadding: 0;\n' +
            '\tline-height: 1.4em;\n' +
            '\tlist-style: none;\n' +
        '}\n' +
        '#chatlog-output li {\n' +
            '\tmargin: 0;\n' +
            '\tmin-height: 32px;\n' +
            '\tpadding: 10px 15px 10px 55px;\n' +
            '\tposition: relative;\n' +
            '\tborder-top: 1px solid #eee;\n' +
        '}\n' +
        '#chatlog-output li:first-child {\n' +
            '\tborder-top: none;\n' +
        '}\n' +
        '#chatlog-output .avatar {\n' +
            '\twidth: 28px;\n' +
            '\theight: 28px;\n' +
            '\ttop: 10px;\n' +
            '\tleft: 15px;\n' +
            '\tborder: 1px solid #ccc;\n' +
            '\tposition: absolute;\n' +
            '\tbackground: #f0f0f0;\n' +
            '\tborder-radius: 3px;\n' +
        '}\n' +
        '#chatlog-output .avatar.no-avatar {\n' +
             '\tborder: 2px groove #c00;\n' +
        '}\n' +
        '#chatlog-output .avatar.no-avatar-data {\n' +
             '\tborder: 2px dashed #aaa;\n' +
        '}\n' +
        '#chatlog-output .time {\n' +
            '\tfloat: right;\n' +
            '\tfont-size: 11px;\n' +
            '\tcolor: #9C9C9C;\n' +
            '\tmargin-left: 10px;\n' +
        '}\n' +
        '#chatlog-output .message {\n' +
            '\twhite-space: pre-line;\n' +
            '\tword-wrap: break-word;\n' +
            '\tdisplay: block;\n'+
        '}\n' +
        '#chatlog-output .username {\n' +
            '\tdisplay: block;\n' +
            '\tfont-weight: bold;\n' +
        '}\n' +
        '#chatlog-output .username a {\n' +
             '\tcolor: inherit;\n' +
             '\ttext-decoration: none;\n' +
        '}\n' +
        '#chatlog-output .username a:hover {\n' +
             '\ttext-decoration: underline;\n' +
        '}\n' +
        '#chatlog-output .username::after {\n' +
            '\tcontent: "";\n' + 
        '}\n' +
        '#chatlog-output .continued {\n' +
            '\tmin-height: 0;\n' +
            '\tpadding-top: 0px;\n' +
            '\tpadding-bottom: 5px;\n' +
            '\tborder-top: none;\n' +
        '}\n' +
        '#chatlog-output .continued .avatar,\n' +
        '#chatlog-output .continued .time,\n' +
        '#chatlog-output .continued .username {\n' +
            '\tdisplay: none;\n' +
        '}\n' +
        '/* /me message styling */\n' +
        '#chatlog-output .me-message .message {\n' +
            '\tcolor: #777;\n' +
            '\tfont-style: italic;\n' +
        '}\n' +
        '/* Inline alert styling */\n' +
        '#chatlog-output .inline-alert {\n' +
            '\tmin-height: 0;\n' +
            '\tpadding: 5px 15px 5px 15px;\n' +
            '\ttext-align: center;\n' +
            '\tfont-style: italic;\n' +
            '\tcolor: #888;\n' +
            '\tbackground: #fafafa;\n' +
        '}\n' +
        '#chatlog-output .inline-alert::before,\n' +
        '#chatlog-output .inline-alert::after {\n' +
            '\tcontent: "";\n' +
        '}\n' +
        '/* Error message styling */ \n' +
         '#chatlog-output li.chatlog-error {\n' +
            '\tcolor: red;\n' +
            '\tfont-style: italic;\n' +
            '\tpadding-left: 15px;\n' +
            '\tbackground-color: #fee;\n' +
        '}\n'
    );
};


/* =================================== *\
	# initialization & events
\* =================================== */

$(function() {
    var $anchor = $('span#chatlog');
    if ($anchor.length > 0) {
        var targetPage = 'Hypothetical_Hurricanes_Wiki:Chat/Logs';

        if (mw.config.get('wgPageName') === targetPage) {
            $cl.fn.generateMarkup($anchor);

            $('#chatlog-container').on('click', '#chatlog-go', function(e) {
                 e.preventDefault();
                 $cl.fn.setInputsState(0);
                 $cl.fn.getLogs();
             });

        }
    }
});