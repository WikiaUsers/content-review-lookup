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


/* =================================== *\
	# functions
\* =================================== */

/* 0-pad a single-digit number */
$cl.fn.padNum = function(n) {
    var a = String(n);
    return a.length === 1 ? '0' + a : a;
};

/* get subpage by date */
$cl.fn.getLogsDate = function() {
    var a = $('#chatlog-date-dd').val(),
        b = $('#chatlog-date-mm').val(),
        c = $('#chatlog-date-yy').val();
    return $cl.fn.padNum(a) + ' ' + $cl.data.months[Number(b) - 1] + ' ' + c;
};

/* enable & disable ui inputs */
$cl.fn.setInputsState = function(state) {
    var a = $('#chatlog').find('input, button, select');
    if (state === 0 || state === false) {
        $(a).attr('disabled', 'disabled');
    } else {
        $(a).removeAttr('disabled');
    }
};

/* get logs content of a given date */
$cl.fn.getLogs = function() {
    var date = $cl.fn.getLogsDate();
    $('#chatlog-status').html('Loading logs from ' + date);
    $.getJSON('/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=Project:Chat/Logs/' + encodeURIComponent(date) + '&cb=' + new Date().getTime(), function(data) {
        // $cl.fn.setInputsState(1);
        var a = data.query.pages,
            b;
        for (var pageid in a) {
            if (pageid == '-1') {
                // logs for that date do not exist
                $('#chatlog-status').html('Logs from ' + $cl.fn.getLogsDate() + ' could not be found.<br />Please try again later or pick a different date');
                $cl.fn.setInputsState(1);
                return;
            } else {
                // logs could be found
                b = a[pageid];
            }
            break;
        }
        $cl.data.users.curr = []; // reset user list
        $cl.fn.parseRawContent(b.revisions[0]['*']);
    });
};

/* parse raw page content */
$cl.fn.parseRawContent = function(data) {
    var a = '\n' + data.replace(/^\<pre class\="ChatLog"\>\n|\n\<\/pre\>\n\[\[Category\:.+\]\]$/g, ''),
        b = a.match(/\[\d{4}\-\d\d\-\d\d \d\d\:\d\d\:\d\d\].+(?:\n(?!\[\d{4}\-\d\d\-\d\d \d\d\:\d\d\:\d\d\]).*)*/g);
    $cl.fn.parseSeparatedMessages(b);
};

/* parse separated messages */
$cl.fn.parseSeparatedMessages = function(messages) {
    var output = $('<ul />');
    for (var i in messages) {
        $(output).append($cl.fn.parseMsg(messages[i]));
    }
    $('#chatlog-output').html(output);
    $('#chatlog-status').html('Logs from ' + $cl.fn.getLogsDate() + ' have successfully loaded! :)');
    $cl.fn.addAvatars();
};

/* go through each message and convert it to a <li>. if a message contains '.continued', make several <li>s */
$cl.fn.parseMsg = function(msg) {
    //return $('<li>' + msg + '</li>');
    /*  experimental:*/
    var output,
        char22 = msg.charAt(22);
    if (char22 === '-') {
        // inline alert
        output = $('<li class="inline-alert" />').html(msg.substr(26));
        $cl.data.lastPoster = ''; // bast-poster blank memory
    } else {
        // ordinary message
        var raw = msg.replace(/^.+\&lt\;.+?\&gt\; */, '').split('\n'),
            nonborder = []; // in the logs, every '2n + 1'th array item (e.g. 1, 3, 5...) is used as a blank newline to separate lines in messages with Shift+Enter
        for (var i = 0; i < raw.length; i += 2) {
            nonborder.push(raw[i]);
        }
        var user = msg.substr(26).split('&gt;')[0],
            t = msg.substr(12, 5),
            content = nonborder.join('\n');
        output = $('<li />')
        //.html(msg.substr(26).replace(/^.+?\&gt\; */, ''))
            .attr({
                'data-user': user
            });
        $('<img class="avatar" />').appendTo(output);
        $('<span class="time" />').html(t).appendTo(output);
        $('<span class="username" />').html(user).appendTo(output);
        $('<span class="message" />').html(content).appendTo(output);
        // check if message continues the former message
        if ($cl.data.lastPoster === user) {
            $(output).addClass('continued');
        } else {
            $cl.data.lastPoster = user;
        }
        // check if is '/me'
        if (msg.split('&gt;')[1].indexOf('/me') === 1) {
            $(output).addClass('me-message');
            $(output).find('.message').html('* ' + user + ' ' + $(output).find('.message').html().substr(4));
        }
        // add user to list
        if ($cl.data.users.curr.indexOf(user) === -1) {
            $cl.data.users.curr.push(user);
        }
    }
    return output;
};

/* add avatars */
$cl.fn.addAvatars = function() {
    var missing = [],
        user;
    for (var i in $cl.data.users.curr) {
        user = $cl.data.users.curr[i];
        if (!$cl.data.users.data.hasOwnProperty(user)) {
            missing.push(user);
        }
    }
    $cl.fn.queryUsers(missing, function() {
        $('#chatlog-output .avatar').each(function() {
            var avatar = $cl.data.users.data[$(this).parent().attr('data-user')].avatar;
            if (avatar) {
                $(this).attr('src', avatar);
            } else {
                $(this).css('border', '2px groove #c00');
            }
        });
        $cl.fn.onAfterLoaded();
    });
    // when done, execute '$cl.fn.onAfterLoaded'
};

/* get user ids and avatar urls */
$cl.fn.queryUsers = function(users, cb) {
    var ids = [];
    if (users.length > 0) {
        // some information is missing - make a request
        $.getJSON('/api.php?action=query&format=json&list=users&ususers=' + encodeURIComponent(users.join('|')) + '&cb=' + new Date().getTime(), function(usersdata) {
            for (var i in usersdata.query.users) {
                var a = usersdata.query.users[i];
                $cl.data.users.data[a.name] = {};
                $cl.data.users.data[a.name].id = a.userid;
                ids.push(a.userid);
            }
            $.getJSON('/api/v1/User/Details?ids=' + ids.join(',') + '&size=28&cb=' + new Date().getTime(), function(wikiausers) {
                for (var i in wikiausers.items) {
                    var a = wikiausers.items[i];
                    $cl.data.users.data[a.name].avatar = a.avatar;
                }
                cb();
            });
        });
    } else {
        // no missing information about users
        cb();
    }
};

/* when the log list been updated */
$cl.fn.onAfterLoaded = function() {
    $cl.data.lastPoster = ''; // reset last message poster
    $cl.data.users.curr = []; // reset user list
    $cl.fn.setInputsState(1);
};

/* generate markup */
$cl.fn.generateMarkup = function(anchor) {
    /* html */
    var ui = $(
            '<nav id="chatlog">\n' +
				'\t<p>\n' +
					'\t\tPlease select a date for the logs:<br />\n' +
					'\t\t<select id="chatlog-date-mm"></select>\n' +
					'\t\t<select id="chatlog-date-dd"></select>\n' +
					'\t\t<select id="chatlog-date-yy"></select>\n' +
					'\t\t<input type="button" id="chatlog-go" value="go" />\n' +
				'\t</p>\n' +
				'\t<pre id="chatlog-status"></pre>\n' +
				'\t<section id="chatlog-output"></section>\n' +
			'</nav>'
        ),
        a = $(ui).find('#chatlog-date-dd'),
        b = $(ui).find('#chatlog-date-mm'),
        c = $(ui).find('#chatlog-date-yy');
    for (var i = 1; i <= 31; i++) {
        $(a).append('<option value="' + i +'">' + i + '</option>');
        if (i <= 12) {
            $(b).append('<option value="' + i +'">' + $cl.data.months[i - 1] + '</option>');
        }
    }
    for (var i in $cl.data.years) {
        $(c).append('<option value="' + $cl.data.years[i] +'">' + $cl.data.years[i] + '</option>');
    }
    $(anchor).replaceWith(ui);

    /* css */
    mw.util.addCSS(
        '#chatlog {\n' +
			'\tmargin: 0;\n' +
			'\tpadding: 0;\n' +
			'\tbackground: #fff;\n' +
			'\tborder: 1px solid #ccc;\n' +
			'\tcolor: #3a3a3a;\n' +
		'}\n' +
		'#chatlog p {\n' +
			'\tpadding: 0 7px;\n' +
		'}\n' +
		'#chatlog pre {\n' +
			'\tfont-size: 88%;\n' +
		'}\n' +
		'#chatlog-output ul {\n' +
		    '\tfont-size: 13px;\n' +
			'\tmargin: 0;\n' +
			'\tline-height: 1.4em;\n' +
			'\tlist-style: none;\n' +
			'\tborder: 1px solid #ccc;\n' +
		'}\n' +
		'#chatlog-output li {\n' +
		    '\tmargin: 0;\n' +
			'\tmin-height: 32px;\n' +
			'\tpadding: 18px 15px 16px 55px;\n' +
			'\tposition: relative;\n' +
		'}\n' +
		'#chatlog-output .avatar {\n' +
			'\twidth: 28px;\n' +
			'\theight: 28px;\n' +
			'\ttop: 20px;\n' +
			'\tleft: 15px;\n' +
			'\tborder: 1px solid #ccc;\n' +
			'\tposition: absolute;\n' +
		'}\n' +
		'#chatlog-output .time {\n' +
			'\tfloat: right;\n' +
			'\tfont-size: 12px;\n' +
			'\tcolor: #9C9C9C;\n' +
		'}\n' +
		'#chatlog-output .message {\n' +
			'\twhite-space: pre-line;\n' +
		'}\n' +
		'#chatlog-output .username {\n' +
			'\tdisplay: block;\n' +
			'\tfont-weight: bold;\n' +
		'}\n' +
		'#chatlog-output .username::after {\n' +
			'\tcontent: ":";\n' +
		'}\n' +
		'#chatlog-output .continued .avatar,\n' +
		'#chatlog-output .continued .time,\n' +
		'#chatlog-output .continued .username {\n' +
			'\tdisplay: none;\n' +
		'}\n' +
		'#chatlog-output .continued {\n' +
			'\tmin-height: 0;\n' +
			'\tmargin-bottom: -15px;\n' +
			'\tpadding-top: 0;\n' +
			'\ttop: -15px;\n' +
		'}\n' +
		'#chatlog-output .me-message .message {\n' +
			'\tcolor: #9C9C9C;\n' +
		'}\n' +
		'#chatlog-output .inline-alert {\n' +
			'\tmin-height: 0;\n' +
			'\tpadding-top: 10px;\n' +
			'\tpadding-bottom: 10px;\n' +
			'\ttext-align: center;\n' +
			'\tfont-weight: bold;\n' +
			'\tcolor: #9C9C9C;\n' +
		'}\n' +
		'#chatlog-output .inline-alert::before {\n' +
			'\tcontent: "~ ";\n' +
		'}\n' +
		'#chatlog-output .inline-alert::after {\n' +
			'\tcontent: " ~";\n' +
		'}'
    );
};


/* =================================== *\
	# insert markup
\* =================================== */

if (mw.config.get('wgPageName') === 'Hypothetical_Hurricanes_Wiki:Chat/Logs') {
    $cl.fn.generateMarkup('span#chatlog');
}


/* =================================== *\
	# events
\* =================================== */
$('#chatlog-go').click(function() {
    $cl.fn.setInputsState(0);
    $cl.fn.getLogs();
});