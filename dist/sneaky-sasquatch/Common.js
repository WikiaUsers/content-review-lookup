//potential mentorship window improvements, original code by @itsLido
mw.loader.using('mediawiki.user').then(function() {
    // Only run for logged-in users
    if (mw.config.get('wgUserName')) { // Returns the username if logged in
        // 1. Create the floating question mark button
        var $mentorBtn = $('<div id="mentor-btn">?</div>').css({
            position: 'fixed',
            bottom: '20px',
            left: '80px',
            width: '40px',
            height: '40px',
            'background-color': '#00BA18',
            color: 'white',
            'text-align': 'center',
            'line-height': '40px',
            'border-radius': '50%',
            'font-size': '24px',
            'cursor': 'pointer',
            'z-index': '9999',
            'box-shadow': '0 2px 6px rgba(0,0,0,0.3)'
        });
        $('body').append($mentorBtn);

        // 2. Create the mentor popup window (hidden by default)
        var $mentorWindow = $(`
            <div id="mentor-window">
                <div id="mentor-window-title">Mentor Assigned
                    <span id="close-window" style="float:right; cursor:pointer;">✖</span>
                </div>
                <div id="mentor-window-content">
                    <p>You have been assigned an experienced mentor for editing help: Tom Was Taken1</p>
                    <div id="ask-question-btn" style= "border: 2px solid #00BA18; margin-top: 20px; border-radius: 3px;">Ask Question</div>
                </div>
            </div>
        `).css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '350px',
            'background-color': 'white',
            color: 'black',
            border: '2px solid #00BA18',
            'border-radius': '5px',
            'box-shadow': '0 4px 15px rgba(0,0,0,0.5)',
            'text-align': 'center',
            padding: '15px',
            'z-index': '10000',
            display: 'none'
        });

        $mentorWindow.find('#mentor-window-title').css({
            'background-color': '#00BA18',
            color: 'white',
            padding: '10px',
            'font-weight': 'bold',
            'border-top-left-radius': '3px',
            'border-top-right-radius': '3px',
            'margin-bottom': '10px'
        });

        $mentorWindow.find('#mentor-window-content').css({
            padding: '15px',
            'text-align': 'center'
        });

        $('body').append($mentorWindow);

        // 3. Show the mentor window when the question mark is clicked
        $mentorBtn.on('click', function() {
            $mentorWindow.show();
        });

        // 4. Close the window when the ✖ is clicked
        $('#close-window').on('click', function() {
            $mentorWindow.hide();
        });

        // 5. Ask Question button redirects to Tom Was Taken1's message wall
        $('#ask-question-btn').on('click', function() {
            window.location.href = '/wiki/Message_Wall:Tom_Was_Taken1';
        });
    }
});

(function () {
  if (!mw.config.get('profileUserId') || mw.config.get('profileUserId') === '0') {
    return;
  }

  var userId = mw.config.get('profileUserId');
  var types = ['WALL', 'FORUM', 'ARTICLE_COMMENT'];
  var now = Math.floor(Date.now() / 1000);
  var THIRTY_DAYS = 30 * 24 * 60 * 60;

  function checkActivity() {
    return Promise.all(types.map(function (type) {
      return $.get(mw.util.wikiScript('wikia'), {
        controller: 'DiscussionContribution',
        method: 'getPosts',
        userId: userId,
        responseGroup: 'full',
        limit: 25,
        containerType: type
      }).then(function (res) {
        return (res._embedded && res._embedded['doc:posts']) || [];
      }).catch(function () {
        return [];
      });
    }));
  }

  function removeInactiveTag() {
    var tag = document.querySelector('.user-identity-header__tag.usergroup-inactive.inactive-user');
    if (tag) {
      tag.remove();
    }
  }

  function init() {
    checkActivity().then(function (results) {
      var isActive = results.some(function (posts) {
        return posts.some(function (post) {
          return (now - post.creationDate.epochSecond) <= THIRTY_DAYS;
        });
      });

      if (isActive) {
        removeInactiveTag();
      }
    });
  }

  var interval = setInterval(function () {
    if (document.querySelector('.user-identity-header')) {
      clearInterval(interval);
      init();
    }
  }, 100);
})();