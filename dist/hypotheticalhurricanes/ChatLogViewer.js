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
    return n.toString().padStart(2, '0');
};

/* get subpage by date */
$cl.fn.getLogsDate = () => {
	const dd = $('#chatlog-date-dd').val();
	const mm = $('#chatlog-date-mm').val();
	const yy = $('#chatlog-date-yy').val();
	const formattedMonth = $cl.data.months[Number(mm) - 1];
	return `${$cl.fn.padNum(dd)} ${formattedMonth} ${yy}`;
};

/* enable & disable ui inputs */
$cl.fn.setInputsState = function(state) {
    const elements = $('#chatlog').find('input, button, select');
    elements.prop('disabled', state === 0 || state === false);
};

/* get logs content of a given date */
$cl.fn.getLogs = async function() {
    const date = $cl.fn.getLogsDate();
    $('#chatlog-status').html(`Loading logs from ${date}`);
    try {
        const response = await $.getJSON(`/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=Project:Chat/Logs/${encodeURIComponent(date)}&cb=${new Date().getTime()}`);
        const page = response.query.pages;
        const pageId = Object.keys(page)[0];
        if (pageId === '-1') {
        	// logs for that date do not exist
            $('#chatlog-status').html(`Logs from ${$cl.fn.getLogsDate()} could not be found.<br />Please try again later or pick a different date`);
            $cl.fn.setInputsState(1);
            return;
        }
        $cl.data.users.curr = [];
        $cl.fn.parseRawContent(page[pageId].revisions[0]['*']);
    } catch (error) {
        console.error(error);
    }
};

/* parse raw page content */
$cl.fn.parseRawContent = function(data) {
    let content = '\n' + data.replace(/^\<pre class\="ChatLog"\>\n|\n\<\/pre\>\n\[\[Category\:.+\]\]$/g, '');
    let messages = content.match(/\[\d{4}\-\d\d\-\d\d \d\d\:\d\d\:\d\d\].+(?:\n(?!\[\d{4}\-\d\d\-\d\d \d\d\:\d\d\:\d\d\]).*)*/g);
    $cl.fn.parseSeparatedMessages(messages);
};

/* parse separated messages */
$cl.fn.parseSeparatedMessages = function(messages) {
    const output = $('<ul />');
    messages.forEach(msg => $(output).append($cl.fn.parseMsg(msg)));
    $('#chatlog-output').html(output);
    $('#chatlog-status').html(`Logs from ${$cl.fn.getLogsDate()} have successfully loaded! :)`);
    $cl.fn.addAvatars();
};

/* go through each message and convert it to a <li>. if a message contains '.continued', make several <li>s */
$cl.fn.parseMsg = function(msg) {
    let char22 = msg.charAt(22),
        output;
    if (char22 === '-') {
        // inline alert
        output = $(`<li class="inline-alert">${msg.substr(26)}</li>`);
        $cl.data.lastPoster = ''; // bast-poster blank memory
    } else {
        // ordinary message
        let raw = msg.replace(/^.+\&lt\;.+?\&gt\; */, '').split('\n'),
            nonborder = []; 
        for (let i = 0; i < raw.length; i += 2) {
            nonborder.push(raw[i]);
        }
        let [user, content] = msg.substr(26).split('&gt;'),
            t = msg.substr(12, 5),
            $output = $(`<li data-user="${user}"></li>`);
        $output.append(`<img class="avatar"/>`);
        $output.append(`<span class="time">${t}</span>`);
        $output.append(`<span class="username">${user}</span>`);
        $output.append(`<span class="message">${nonborder.join('\n')}</span>`);
        // check if message continues the former message
        if ($cl.data.lastPoster === user) {
            $output.addClass('continued');
        } else {
            $cl.data.lastPoster = user;
        }
        // check if is '/me'
        if (msg.split('&gt;')[1].indexOf('/me') === 1) {
            $output.addClass('me-message');
            $output.find('.message').html(`* ${user} ${$output.find('.message').html().substr(4)}`);
        }
        // add user to list
        if ($cl.data.users.curr.indexOf(user) === -1) {
            $cl.data.users.curr.push(user);
        }
        output = $output;
    }
    return output;
};


/* add avatars */
$cl.fn.addAvatars = function() {
    const missing = [];
    for (const user of $cl.data.users.curr) {
        if (!$cl.data.users.data.hasOwnProperty(user)) {
            missing.push(user);
        }
    }
    $cl.fn.queryUsers(missing, function() {
        $('#chatlog-output .avatar').each(function() {
            const avatar = $cl.data.users.data[$(this).parent().data('user')].avatar;
            $(this).attr('src', avatar || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23c00' viewBox='0 0 16 16'%3E%3Crect width='16' height='16'/%3E%3C/svg%3E");
        });
        $cl.fn.onAfterLoaded();
    });
};

/* get user ids and avatar urls */
$cl.fn.queryUsers = function(users, cb) {
  if (users.length === 0) {
    return cb();
  }

  Promise.all([
  	// some information is missing - make a request
    $.getJSON(`/api.php?action=query&format=json&list=users&ususers=${encodeURIComponent(users.join('|'))}&cb=${new Date().getTime()}`),
    $.getJSON(`/api/v1/User/Details?ids=${users.join(',')}&size=28&cb=${new Date().getTime()}`)
  ])
    .then(([usersdata, wikiausers]) => {
      usersdata.query.users.forEach(a => {
        $cl.data.users.data[a.name] = { id: a.userid, avatar: '' };
      });

      wikiausers.items.forEach(a => {
        $cl.data.users.data[a.name].avatar = a.avatar;
      });
      
      // no missing information about users
      cb();
    });
};

/* when the log list been updated */
$cl.fn.onAfterLoaded = function() {
    $cl.data.lastPoster = ''; // reset last message poster
    $cl.data.users.curr = []; // reset user list
    $cl.fn.setInputsState(1);
};

/* generate markup */
$cl.fn.generateMarkup = function(anchor) {
    const selectMonth = `
        <select id="chatlog-date-mm">
            ${$cl.data.months.map((month, index) => `
                <option value="${index + 1}">${month}</option>
            `).join('')}
        </select>
    `;

    const selectDate = `
        <select id="chatlog-date-dd">
            ${[...Array(31)].map((_, index) => `
                <option value="${index + 1}">${index + 1}</option>
            `).join('')}
        </select>
    `;

    const selectYear = `
        <select id="chatlog-date-yy">
            ${$cl.data.years.map(year => `
                <option value="${year}">${year}</option>
            `).join('')}
        </select>
    `;

    const ui = `
        <nav id="chatlog">
            <p>
                Please select a date for the logs:<br />
                ${selectMonth}
                ${selectDate}
                ${selectYear}
                <input type="button" id="chatlog-go" value="go" />
            </p>
            <pre id="chatlog-status"></pre>
            <section id="chatlog-output"></section>
        </nav>
    `;

    $(anchor).replaceWith(ui);
};

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