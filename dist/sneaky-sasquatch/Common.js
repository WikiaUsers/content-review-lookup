mw.loader.using('mediawiki.user').then(function () {
    // Only run for logged-in users
    if (!mw.config.get('wgUserName')) return;

    // 1. Create the floating question mark button
    var $mentorBtn = $('<div id="mentor-btn">?</div>').css({
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        width: '40px',
        height: '40px',
        backgroundColor: '#0078D7',
        color: 'white',
        textAlign: 'center',
        lineHeight: '40px',
        borderRadius: '50%',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: '9999',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
    });

    $('body').append($mentorBtn);

    // 2. Create the mentor popup window (hidden by default)
    var $mentorWindow = $(`
        <div id="mentor-window">
            <div id="mentor-window-title">
                Mentor Assigned
                <span id="close-window" style="float:right; cursor:pointer;">✖</span>
            </div>
            <div id="mentor-window-content">
                <p><strong>You have been assigned an experienced mentor for editing help: Tom Was Taken1</strong></p>
                <button id="ask-Tom-Was-Taken-a-question-btn">Ask Question</button>
            </div>
        </div>
    `).css({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '350px',
        backgroundColor: 'white',
        border: '2px solid #0078D7',
        borderRadius: '5px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        textAlign: 'center',
        padding: '15px',
        zIndex: '10000',
        display: 'none'
    });

    $mentorWindow.find('#mentor-window-title').css({
        backgroundColor: '#0078D7',
        color: 'white',
        padding: '10px',
        fontWeight: 'bold',
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        marginBottom: '10px'
    });

    $mentorWindow.find('#mentor-window-content').css({
        padding: '15px',
        textAlign: 'center'
    });

    $('body').append($mentorWindow);

    // 3. Show mentor window
    $mentorBtn.on('click', function () {
        $mentorWindow.show();
    });

    // 4. Close mentor window
    $(document).on('click', '#close-window', function () {
        $mentorWindow.hide();
    });

    // 5. Ask Question button (FIXED)
    $(document).on('click', '#ask-Tom-Was-Taken-a-question-btn', function () {
        window.location.href = '/wiki/Message_Wall:Tom_Was_Taken1';
    });
});

mw.hook('wikipage.content').add(function () {
    if (mw.config.get('wgAction') !== 'history') return;
    if (!mw.user.isLoggedIn()) return;

    var api = new mw.Api();

    $('.mw-history-histlinks').each(function () {
        var $links = $(this);
        if ($links.find('.revert-alert-btn').length) return;

        var $btn = $('<span>')
            .addClass('revert-alert-btn')
            .css({ marginLeft: '8px', cursor: 'pointer', color: '#0645ad' })
            .text('[Revert & Alert]');

        $links.append($btn);

        $btn.on('click', function () {
            var $row = $links.closest('li');a
            var revId = $row.data('mw-revid');
            var user = $row.find('.mw-userlink').text();

            if (!revId || !user) {
                alert('Unable to detect revision or user.');
                return;
            }

            if (!confirm('Revert this edit and notify ' + user + '?')) return;

            api.postWithToken('csrf', {
                action: 'edit',
                title: mw.config.get('wgPageName'),
                undo: revId,
                summary: 'Reverted unconstructive edit'
            }).done(function () {
                api.postWithToken('csrf', {
                    action: 'messagewallthread',
                    wall: 'Message_Wall:' + user,
                    title: 'Edit reverted',
                    message: 'Hello, I reverted your edit because I considered it unconstructive.'
                }).done(function () {
                    alert('Edit reverted and message sent.');
                    location.reload();
                }).fail(function () {
                    alert('Edit reverted, but message could not be sent.');
                });
            }).fail(function () {
                alert('Revert failed.');
            });
        });
    });
});


// Optional config — leave blank to use defaults
window.welcomeMessage = {
  enabled: true,
  adminUsername: 'ItsLido',     // $4
  adminNickname: 'ItsLido Bot',    // $3
  messageTitle: 'Welcome, $1!',
  messageText: 'Welcome $1 — I\'m ItsLido.\n\n if you need any help please ask your mentor. Also, Thanks for your first edit on <a href="wikiurl.fandom.com/wiki/$2">$2</a>.\n\n— $3',
  debug: false,
  testAllEdits: false,
  preferTalk: false,
};

// Import from dev
importArticles({
  type: 'script',
  articles: [
    'dev:MediaWiki:WelcomeMessage.js'
  ]
});


window.MessageBlock = {
    title: 'Blocked',
    message: 'You have received a $2 block because you have $1. If you wish to appeal please see the following page: Help:I am Blocked.',
    autocheck: true
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});
mw.loader.using



/* $(function () {

  const btn = $('<div id="wikiAI">Wiki AI</div>');
  const box = $(`
    <div id="wikiAIBox">
      <div id="chat"></div>
      <input id="input" placeholder="Ask Sneakypedia AI..." />
    </div>
  `);

  $("body").append(btn, box);

  btn.click(() => box.toggle());

  $("#input").keypress(function (e) {
    if (e.which === 13) {
      const msg = $(this).val();
      if (!msg) return;

      $("#chat").append("<div><b>You:</b> " + msg + "</div>");
      $(this).val("");

      fetch("https://llm-chat-app-sneakypedia.lidocrum117.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      })
      .then(res => res.json())
      .then(data => {
        $("#chat").append("<div><b>AI:</b> " + data.response + "</div>");
        $("#chat").scrollTop($("#chat")[0].scrollHeight);
      })
      .catch(() => {
        $("#chat").append("<div><b>AI:</b> Error connecting.</div>");
        alert("Wiki AI Loaded");

      });
    }
  });

}); */



//=========
//Editathan leaderboard
// -Twineee
//=========

try {
    if (window.location.href === "https://sneaky-sasquatch.fandom.com/wiki/Special:BlankPage/1000thPLB") { //Leaderboard page URL
    	document.title = "Sneakypedia 1000 pages Leaderboard"; //naming browser tab
    	function Main(){
    		mw.loader.using('mediawiki.api').then(function () { // we need the API to be loaded
	            var api = new mw.Api(); // make the API accessible.
	            api.get({ /// make the request
	                action: "query",
	                list: "recentchanges", 
	                rcend: "2026-03-04T02:42:07Z",
	                rclimit: "max",
	                rcshow: "!bot", // Bots shouldn't be able to play
	                rcprop: ["user", "sizes"], // What's a leaderboard without players and scores?
	                rcnamespace: 0, // only mainspace edits
	                rctype: "edit", // only edits :P
	            }).done(function (e) {
	                data  = e.query.recentchanges; // making it accessible
	                let lb = {}; // emplty leaderboard object
	                data.forEach(function(el, i){
	                	const score = Math.abs(el.oldlen - el.newlen); // calculate diff
	                	if (!(el.user in lb)) {
	                		lb[el.user] = score; // adding user
	                	} else {
	                		lb[el.user] += score; // adding score to preexisting user
	                	}
	                });
	                let rank = [];
	                Object.entries(lb).sort((a, b) => b[1] - a[1]).forEach(function(el, i){
	                	rank[i] = el[0];
	                }); //thx u/4548826 on Stack Overflow. This sorts the scores and returns users in the rank array
	                let res = "<p>The edit-a-than started on March 4th and will end on March 11th. Please review the <a href=\"https://sneaky-sasquatch.fandom.com/wiki/User_blog:ProfitableOranges/1000_pages_announcement\">announcment</a>. The leaderboard is updated every 30 seconds.</p><table><thead><tr><td>User</td><td>Score (bytes changed)</td></tr></thead><tbody>"; // result var to be put inside table
	                rank.forEach(function(el, i) { // add the user and score to the table
	                	res += "<tr><td><a href=\"https://sneaky-sasquatch.fandom.com/wiki/User:" + el + "\">" + el + "</a></td><td>" + lb[el] + "</td></tr>";
	                });
	                document.body.innerHTML = res + `<tbody></table><style>
	                thead {
	                	font-weight: bold;
	                }
	                body {
	                	font-size: 20px;
	                	padding: 16px;
	                	background-color: white;
	 	 	 	 	 	justify-content: center;
	 	 	 	 	 	align-items: center;
	                }
	                p {
	                	display: block;
	                	font-size: 18px;
	                }
	                td {
	                	border-width: 0;
	                	padding-left: 3px !important; 
	                }
	                tr {
	                	border-raius: 20px !important;
	                }
	                </style>`; //close the table and add CSS
	            });
	        });
    	}
    	Main();
        setInterval(Main, 30000); //run Main every 30 seconds for live-ish updates
    }
} catch (err) {
    alert("Error! " + err + " (please message Twineee to fix this with the message)"); // moar debugz
}