// Discussions block button
// @author: Jr Mime

$(function () {
  disBlock = {};

  // i18n variables. This can be better
  var mwExpiry, mwReasons, mwDisableUserTalk, mwEnableAutoBlock, mwWatchUser, mwHardBlock, mwExpiryLabel, mwReasonLabel, mwOtherLabel, mwBlockLabel, mwCancelLabel, mwResultsLabel;

  disBlock.init = function () {
    var disBlInterval1, disBlInterval2;

    // Check on dash events, if the person is on a /d/u page, if there's no block button, add
    document.addEventListener('animationstart', function (event) {
      if (event.animationName != "dash") return;
      timeoutKill('disBlInterval1');
      disBlInterval1 = setInterval(function () {
        if (window.location.pathname.indexOf('/d/u') > -1 && $(".discussions-button").length === 0) {
          clearInterval(disBlInterval1);
          disBlock.beforeButton();
        }
      }, 500);
    });

    // On page load, check if they are at /d/u and the button isn't there
    disBlInterval2 = setInterval(function () {
      if (window.location.pathname.indexOf('/d/u') > -1 && $(".discussions-button").length === 0) {
        clearInterval(disBlInterval2);
        disBlock.beforeButton();
      }
    }, 500);


    timeoutKill('disBlInterval2');

    // Kills an interval after 5 secs so it doesn't clog up
    function timeoutKill(intName) {
      setTimeout(function () {
        clearInterval(intName);
      }, 7000);
    }

    // Get i18n messages
    $.get('/api.php', {
      action: 'query',
      format: 'json',
      meta: 'allmessages',
      amlang: window.navigator.language,
      ammessages: 'Ipboptions|Ipbreason-dropdown|Ipb-disableusertalk|Ipbenableautoblock|Ipbwatchuser|Ipb-hardblock|Ipbexpiry|Ipbreason|htmlform-selectorother-other|blocklink|Cancel|Listusers-results'
    }).done(function (d) {
      mwExpiry = d.query.allmessages[0]['*'];
      mwReasons = d.query.allmessages[1]['*'];
      mwDisableUserTalk = d.query.allmessages[2]['*'];
      mwEnableAutoBlock = d.query.allmessages[3]['*'];
      mwWatchUser = d.query.allmessages[4]['*'];
      mwHardBlock = d.query.allmessages[5]['*'];
      mwExpiryLabel = d.query.allmessages[6]['*'];
      mwReasonLabel = d.query.allmessages[7]['*'];
      mwOtherLabel = d.query.allmessages[8]['*'];
      mwBlockLabel = d.query.allmessages[9]['*'];
      mwCancelLabel = d.query.allmessages[10]['*'];
      mwResultsLabel = d.query.allmessages[11]['*'];
    });
  };

  disBlock.beforeButton = function () {
    // Add CSS stylesheet
    $.when(
      $('head').append('<link rel="stylesheet" href="//dev.wikia.com/index.php?title=MediaWiki:DiscussionsBlock.css&action=raw&ctype=text/css" type="text/css" />')
    ).then(disBlock.addButton);
  };

  disBlock.addButton = function () {
    // Add the button
    $('.ember-view .discussion-moderator-tools').append(
      "<h3 class='discussions-button' style='cursor:pointer'>" +
      "<img src='https://vignette.wikia.nocookie.net/jrmime/images/e/e4/Shield-gray-md.png/revision/latest/scale-to-width-down/16?cb=20180707000745' />" +
      "<span class='active-element-theme-color disBlock-uppercase'>&nbsp;" + mwBlockLabel + " </span>" +
      "</h3>"
    );
	  
	  // Mobile support
	  $('.discussion-moderation-header__action-container ul.wds-list').append(
	    "<li class='active-element-theme-color discussions-button'>" +
      "<img src='https://vignette.wikia.nocookie.net/jrmime/images/e/e4/Shield-gray-md.png/revision/latest/scale-to-width-down/16?cb=20180707000745' />" +
	    "<span class='active-element-theme-color disBlock-uppercase'>&nbsp;" + mwBlockLabel + " </span>" +
	    "</li>"
	  );

    $('.discussions-button').on('click', function () {
      disBlock.onClick();
    });
  };

  disBlock.onClick = function () {
    // Open the modal to block using the i18n messages
    $('.discussion-wrapper > .ember-view > .discussion-dialog').addClass('is-visible').removeAttr('style').append(
      '<div class="modal-dialog-wrapper info ember-view discussions-block-dialogue">' +
      '<div class="modal-dialog-layover"></div>' +
      '<div class="modal-dialog" style="max-width:800px;">' +
      '<div class="modal-dialog-content">' +
      '<h3 class="disBlock-uppercase">' + mwBlockLabel + '</h3>' +
      '<table><tbody>' +
      '<tr>' +
      '<td class="disBlock-top">' + mwExpiryLabel + '</td>' +
      '<td>' +
      '<select id="disblock-expiry-dropdown" class="disBlock-select"><option value="other">' + mwOtherLabel + '</option></select>' +
      '<br>' +
      '<input id="disBlock-expiry-choices-other" size="45" name="disBlockExpiryOther" class="disBlock-input">' +
      '</td>' +
      '</tr>' +
      '<tr>' +
      '<td class="disBlock-top">' + mwReasonLabel + '</td>' +
      '<td>' +
      '<select id="disBlock-reason-choices" class="disBlock-select"><option value="other">' + mwOtherLabel + '</option></select>' +
      '<br>' +
      '<input id="disBlock-reason-choices-other" size="45" name="disBlockReasonOther" class="disBlock-input">' +
      '</td>' +
      '</tr>' +
      '<tr><td>&nbsp;</td><td class="disBlock-checkbox">' +
      '<input name="disBlock-disable-meswall" type="checkbox" id="disBlock-disable-meswall" checked="checked">' +
      '</td></tr>' +
      '<tr><td>&nbsp;</td><td class="disBlock-checkbox">' +
      '<input name="disBlock-block-ip" type="checkbox" id="disBlock-block-ip" checked="checked">' +
      '</td></tr>' +
      '<tr><td>&nbsp;</td><td class="disBlock-checkbox">' +
      '<input name="disBlock-watch-pages" type="checkbox" id="disBlock-watch-pages">' +
      '</td></tr>' +
      '<tr><td>&nbsp;</td><td class="disBlock-checkbox">' +
      '<input name="disBlock-prevent-logged" type="checkbox" id="disBlock-prevent-logged" checked="checked">' +
      '</td></tr>' +
      '<tr>' +
      '<td class="disBlock-top" id="disBlock-result">' + mwResultsLabel + ':</td>' +
      '<td class="disBlock-top" id="disBlock-result-box">...</td>' +
      '</tr>' +
      '</tbody></table>' +
      '<footer>' +
      '<button class="active-element-theme-color disBlock-cancel-button">' + mwCancelLabel + '</button>' +
      '<button class="active-element-theme-color disBlock-confirm-button" data-ember-action="">' + mwBlockLabel + '</button>' +
      '</footer>' +
      '</div>' +
      '</div>'
    );
    disBlock.populateBoxes();
    disBlock.onChange();
    $(".disBlock-cancel-button").on("click", function () {
      $('.discussions-block-dialogue').removeClass('is-visible').css('display', 'none').empty();
    });
    $(".disBlock-confirm-button").on("click", function () {
      disBlock.block();
    });
  };

  disBlock.populateBoxes = function () {
    // Add more i18n messages in the dropdowns
    $("#disBlock-disable-meswall").after("<label for='disBlock-disable-meswall'>" + mwDisableUserTalk + "</label>");
    $("#disBlock-block-ip").after("<label for='disBlock-block-ip'>" + mwEnableAutoBlock + "</label>");
    $("#disBlock-watch-pages").after("<label for='disBlock-watch-pages'>" + mwWatchUser + "</label>");
    $("#disBlock-prevent-logged").after("<label for='disBlock-prevent-logged'>" + mwHardBlock + "</label>");

    mwExpiry = mwExpiry.split(',');

    mwExpiry.forEach(function (time) {
      realTime = time.replace(/^(.*):.*$/, "$1");
      textTime = time.replace(/^.*:(.*)$/, "$1");

      $("#disblock-expiry-dropdown").append("<option value='" + realTime + "'>" + textTime + "</option>");
    });

    mwReasons = mwReasons.split('\n');

    mwReasons.forEach(function (reason) {
      if (reason.match(/^\*\b.*/)) {
        $("#disBlock-reason-choices").append("<optgroup label='" + reason.replace(/^\*(\b(.*))$/, "$1") + "'>");
      } else {
        $("#disBlock-reason-choices > optgroup").last().append("<option value='" + reason.replace(/^\*\*\s?(.*)$/, "$1") + "'>" + reason.replace(/^\*\*\s?(.*)$/, "$1") + "</option>");
      }
    });
  };


  disBlock.onChange = function () {
    // Hide/unhide the text box in Expiry based on value
    $("#disblock-expiry-dropdown").change(function () {
      if ($("#disblock-expiry-dropdown").val() != "other") {
        $("#disBlock-expiry-choices-other").hide(600);
      } else {
        $("#disBlock-expiry-choices-other").show(600);
      }
    });
  };

  disBlock.block = function () {
    // Get variables
    var expiry = $("#disblock-expiry-dropdown").val(),
      expiryOther = $("#disBlock-expiry-choices-other").val(),
      reasonMenu = $("#disBlock-reason-choices").val(),
      reasonTxt = $("#disBlock-reason-choices-other").val(),
      reason = '',
      disablemsgwall = $("#disBlock-disable-meswall:checked"),
      blockIP = $("#disBlock-block-ip:checked"),
      watchPages = $("#disBlock-watch-pages:checked"),
      preventLogged = $("#disBlock-prevent-logged:checked"),
      username = $(".discussion-left-rail__header").text(),
      token = '';

    // Set reason based if it's other or not
    if (reasonTxt) {
      if (reasonMenu == "other" ||  reasonMenu == "Other") {
        reason = reasonTxt;
      } else {
        reason = reasonMenu + ': ' + reasonTxt;
      }
    } else {
      reason = reasonMenu;
    }

    // Gotta get a token lol
    $.ajax({
      url: '/api.php',
      type: 'GET',
      data: {
        action: 'query',
        prop: 'info',
        titles: 'A',
        intoken: 'edit',
        format: 'json'
      },
      success: function (data) {
        // Token here, set block Query based on items given
        token = data.query.pages[-1].edittoken;
        var blockQuery = {
          action: 'block',
          user: username,
          reason: reason,
          token: token,
          format: 'json'
        };
        if (!disablemsgwall) blockQuery.allowusertalk = true;
        if (blockIP) blockQuery.autoblock = true;
        if (watchPages) blockQuery.watchuser = true;
        if (!preventLogged) blockQuery.nocreate = true;
        if (expiry == "other") {
          blockQuery.expiry = expiryOther;
        } else {
          blockQuery.expiry = expiry;
        }

        // Call the block
        $.ajax({
          url: '/api.php',
          type: 'POST',
          data: blockQuery,
          success: function (data) {
            if (!data.error) {
              $("#disBlock-result-box").html('Successfully blocked <strong>' + username + '</strong> for ' + blockQuery.expiry + ' for ' + reason + '.');
            } else {
              $("#disBlock-result-box").html('Error: Unable to block <strong>' + username + '</strong>: ' + data.error.code);
            }
          },
          error: function (data) {
            $("#disBlock-result-box").html('Error: Unable to block <strong>' + username + '</strong>: ' + data.error.code);
          }
        });
      }
    });
  };
  disBlock.init();
});