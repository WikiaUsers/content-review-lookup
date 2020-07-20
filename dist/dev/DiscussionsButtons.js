// Custom Discussions Buttons
// @author:Jr Mime

$(function () {
  if (window.location.pathname.indexOf('/d') <= -1) return;
  disButt = {};
  var allButtons;

  disButt.init = function () {
    // Initial setup
    disButtFirstInterval = setInterval(function () {
      if ($('.post-detail'.length) || $('.post-reply').length) {
        disButt.buttInit();
        clearInterval(disButtFirstInterval);
      }
    }, 500);

    // Add event handler for reloads
    document.addEventListener('animationstart', function (event) {
      console.log(event);
      if (event.animationName == "dash" || event.animationName == "post-face-in") {
        disButtNewEventInterval = setInterval(function () {
          timeoutKill("disButtNewEventInterval");
          if ($(".post-detail > .ember-view > .post-actions").not(".marked").length ||
            $(".post-reply").not(".marked").length) {
            clearInterval(disButtNewEventInterval);
            disButt.buttInit();
          }
        }, 500);
      }
    });


    // Kills an interval after 3 secs so it doesn't clog up
    function timeoutKill(intName) {
      setTimeout(function () {
        clearInterval(intName);
      }, 3000);
    }
  };

  // Get info to create buttons
  disButt.buttInit = function () {
    function buttInitFunction(that, action) {
      var varsToUse = {};
      varsToUse.username = $(that).find(".user-avatar__username").text();
      varsToUse.wiki = window.location.origin.replace(/https?:\/\/(.*)\.wikia\.com/, "$1");

      $.get('/api.php', {
        action: 'query',
        list: 'allusers',
        aufrom: varsToUse.username,
        aulimit: 1,
        format: 'json'
      }).done(function (d) {
        varsToUse.userID = d.query.allusers[0].id;
        disButt.createButts(varsToUse, $(that), action);
      });

    }

    $(".post-detail").each(function () {
      if ($(this).find(".ember-view > .post-actions").hasClass("marked")) return;
      buttInitFunction($(this), "post");
    });
    $(".post-reply").not('.marked').each(function () {
      buttInitFunction($(this), "reply");
    });
  }

  // Create the buttons based on user info
  disButt.createButts = function (varsToUse, that, action) {
    var buttons = [];
    if (window.DiscussionsButtonsCustom) {
      var i = 0;
      $.each(window.DiscussionsButtonsCustom, function (text, link) {
        i++
        if (link.match(/^.*\$1.*$/)) {
          link = link.replace(/\$1/, encodeURIComponent(varsToUse.username));
        }
        if (link.match(/^.*\$2.*$/)) {
          link = link.replace(/\$2/, encodeURIComponent(varsToUse.userID));
        }
        if (link.match(/^.*\$3.*$/)) {
          link = link.replace(/\$3/, encodeURIComponent(varsToUse.wiki));
        }

        buttons.push(
          '<li class="small-4 large-4 custom-buttons-contribs" style="justify-content:center; margin-left:0;" class="dissButt-' + i + '">' +
          '<a href="' + link + '">' +
          text +
          '</a>' +
          '</li>'
        )
      });
    } else {
      console.log("DiscussionsButtons.js: No custom buttons set.");
    }
    if (buttons.length >= 1) {
      allButtons = '<ul class="row post-actions custom-buttons marked">';

      buttons.forEach(function (button) {
        allButtons = allButtons + button;
      });
      allButtons = allButtons + "</ul>";
    }
    disButt.addButts(that, action);
  };

  // Add the buttons
  disButt.addButts = function (that, action) {
    if (action == "post") {
      if ($(that).find(".ember-view > .post-actions").hasClass("marked")) return;
      $(that).find(".ember-view > .post-actions").addClass("marked").after(allButtons);
    } else if (action == "reply") {
      if ($(that).hasClass("marked")) return;
      if ($(that).children("ul").hasClass("marked")) return;
      $(that).addClass("marked").append(allButtons);
    }
  }

  disButt.init();
});