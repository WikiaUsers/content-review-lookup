(function($) {
  mw.loader.using(["mediawiki.api", "mediawiki.util", "mediawiki.jqueryMsg"], function() {

    // Ensure PopupGenerator is loaded
    if (typeof PopupGenerator === 'undefined') {
      console.error('PopupGenerator is not loaded');
      return;
    }

    var pageId = mw.config.get("wgArticleId");
    var pageTitle = mw.config.get("wgPageName");
    var userId = mw.user.getId();
    var currentAverage = 0;
    var currentVoteCount = 0;
    var currentPageRatings = {};
    
    // Skip if not mainspace, no page ID, or anon.
    if (mw.config.get("wgNamespaceNumber") !== 0 || mw.user.isAnon() || pageId === 0) {
      return;
    }

    // Skip hardcoded pages listed in Common.js
    if (window.ArticleRatesExcludePages && window.ArticleRatesExcludePages.indexOf(pageTitle) !== -1) {
      return;
    }
    
    // Skip redirect pages
    if (mw.config.get('wgIsRedirect') === true) {
        return;
    }

    // Only show ratings on pages that belong to "Characters" OR "Series" category
    var currentCats = mw.config.get('wgCategories') || [];
    if (!currentCats.includes('Characters') && !currentCats.includes('Series')) {
      return;
    }

    // Create rating component
    var $ratingContainer = $("<div>").addClass("article-rating-container");
    var $starsContainer = $("<div>").addClass("rating-stars-container");
    var $averageContainer = $("<div>").addClass("rating-average-container");

    // Use PopupGenerator to create popup
    var popup = PopupGenerator.createPopup({
      introText: "View Details",
      headerText: "Rating Details",
      frameCSS: "rating-popup",
      content: "",
      appendTo: $ratingContainer,
      mode: "create",
      onOpen: function() {
        showRatingDetailsDialog();
      },
      onClose: function() {
        // Cleanup when popup closes (if any)
      }
    });

    var $stars = [];

// Define the labels for each star (1 = Garbage, 10 = Masterpiece)
    var starLabels = [
      "Garbage",
      "Very Bad",
      "Bad",
      "Okay",
      "Average",
      "Good",
      "Really Good",
      "Great",
      "Excellent",
      "Masterpiece"
    ];

    for (var i = 1; i <= 10; i++) {
      var label = starLabels[i - 1]; // 0-based array index

      var $star = $("<span>")
        .addClass("rating-star")
        .data("value", i)
        .html("★")
        .attr("title", i + " – " + label)  // native browser tooltip fallback
        .append(
          $("<span>")
            .addClass("star-tooltip")
            .text(label)
        );

      $stars.push($star);
      $starsContainer.append($star);
    }

    $ratingContainer.append($starsContainer, $averageContainer, popup.triggerElement, popup.popupElement);

    // Insert into page header
    var $pageHeader = $(".page-header");
    if ($pageHeader.length) {
      $pageHeader.append($ratingContainer);
    } else {
      var $titleElement = $("#firstHeading, .firstHeading").first();
      if ($titleElement.length) {
        $titleElement.append($ratingContainer);
      }
    }

    // Load rating data
    loadRatingData();

    function loadRatingData() {
      var api = new mw.Api();
      api.get({
        action: "query",
        titles: "Project:ArticleRates",
        prop: "revisions",
        rvprop: "content",
        format: "json"
      }).done(function(data) {
        var pages = data.query.pages;
        var ratingPageId = Object.keys(pages)[0];
        if (ratingPageId !== "-1") {
          var content = pages[ratingPageId].revisions[0]["*"];
          try {
            var ratings = JSON.parse(content) || {};
            var pageRatings = ratings[pageId] || {};

            // Convert to old format for compatibility
            var simpleRatings = {};
            for (var uid in pageRatings) {
              if (pageRatings.hasOwnProperty(uid)) {
                simpleRatings[uid] = pageRatings[uid].rating;
              }
            }

            updateAverageRating(simpleRatings, pageRatings);
          } catch (e) {
            console.error("Error parsing rating data:", e);
          }
        }
      }).fail(function(error) {
        console.error("Error loading rating data:", error);
      });
    }

    function highlightStars(rating) {
  const fullStars = Math.floor(rating);           // e.g. 7.0–7.999… → 7
  const remainder = rating - fullStars;           // 0.0 to ~0.999…

  // Show half star if the fractional part is 0.5 or higher
  const showHalf = remainder >= 0.5;

  for (let i = 0; i < 10; i++) {
    const $star = $stars[i];
    $star.removeClass("highlight half");

    if (i < fullStars) {
      $star.addClass("highlight");          // full
    }
    else if (i === fullStars && showHalf) {
      $star.addClass("highlight half");     // half
    }
    // else: empty star
  }
}

    function updateAverageRating(simpleRatings, fullRatings) {
      currentPageRatings = fullRatings || simpleRatings;
      var ratings = [];
      for (var uid in simpleRatings) {
        if (simpleRatings.hasOwnProperty(uid)) {
          ratings.push(simpleRatings[uid]);
        }
      }
      if (ratings.length > 0) {
        var sum = ratings.reduce(function(a, b) { return a + b; }, 0);
        var average = sum / ratings.length;
        currentAverage = average;
        currentVoteCount = ratings.length;
        $averageContainer.text(average.toFixed(1) + ", " + ratings.length + " votes");
        highlightStars(average);
      } else {
        currentAverage = 0;
        currentVoteCount = 0;
        $averageContainer.text("No ratings yet");
        highlightStars(0);
      }
    }

    $starsContainer.on("mousemove", function(e) {
      var $target = $(e.target).closest(".rating-star");
      if ($target.length) {
        var value = $target.data("value");
        highlightStars(value);
      }
    });

    $starsContainer.on("mouseleave", function() {
      highlightStars(currentAverage);
    });

    $starsContainer.on("click", ".rating-star", function() {
      var rating = $(this).data("value");
      saveRating(rating);
    });

    function saveRating(rating) {
      var api = new mw.Api();
      api.get({
        action: "query",
        titles: "Project:ArticleRates",
        prop: "revisions",
        rvprop: "content",
        format: "json"
      }).done(function(data) {
        var pages = data.query.pages;
        var ratingPageId = Object.keys(pages)[0];
        var revisionId = pages[ratingPageId].revisions[0].revid;
        var content = pages[ratingPageId].revisions[0]["*"];
        var ratings = {};
        try {
          ratings = JSON.parse(content) || {};
        } catch (e) {
          ratings = {};
        }

        if (!ratings[pageId]) {
          ratings[pageId] = {};
        }

        ratings[pageId][userId] = {
          rating: rating,
          timestamp: new Date().toISOString()
        };

        api.postWithEditToken({
          action: "edit",
          title: "Project:ArticleRates",
          text: JSON.stringify(ratings),
          summary: "Rated [[" + pageTitle + "]] with " + rating,
          baserevid: revisionId,
          format: "json"
        }).done(function() {
          var simpleRatings = {};
          for (var uid in ratings[pageId]) {
            simpleRatings[uid] = ratings[pageId][uid].rating;
          }
          updateAverageRating(simpleRatings, ratings[pageId]);
          mw.notify("Rating saved!");
        }).fail(function(error) {
          console.error("Error saving rating:", error);
          mw.notify("Error saving rating: " + error, { type: "error" });
        });
      }).fail(function(error) {
        console.error("Error loading rating data for save:", error);
        mw.notify("Error loading rating data: " + error, { type: "error" });
      });
    }

    // Show rating details popup
    function showRatingDetailsDialog() {
      if (!currentPageRatings || Object.keys(currentPageRatings).length === 0) {
        mw.notify("No ratings yet", { type: "info" });
        popup.close();
        return;
      }

      popup.contentElement.html("<div style='padding: 20px; text-align: center;'>Loading...</div>");

      var api = new mw.Api();
      api.get({
        action: "query",
        list: "users",
        ususerids: Object.keys(currentPageRatings).join("|"),
        usprop: "groups"
      }).done(function(data) {
        var users = data.query.users;
        var userMap = {};
        users.forEach(function(user) {
          userMap[user.userid] = user;
        });

        var $table = $("<table>").addClass("article-rating-content-table row-hover count-row-table-v2-first-column");
        var $tbody = $("<tbody>");
        $table.append($tbody);

        var $header = $("<tr>");
        $header.append(
          $("<th>").text("No.").css({textAlign: "center"}),
          $("<th>").text("User"),
          $("<th>").text("Rating").css({textAlign: "center"}),
          $("<th>").text("Time")
        );
        $tbody.append($header);

        for (var userId in currentPageRatings) {
          var ratingData = currentPageRatings[userId];
          var rating = typeof ratingData === 'object' ? ratingData.rating : ratingData;
          var $row = $("<tr>");

          $row.append($("<td>").css({textAlign: "center"}));

          var $userCell = $("<td>");
          var userName = userMap[userId] ? userMap[userId].name : "UserID:" + userId;

          var $userLink = $("<a>")
            .attr("href", mw.util.getUrl("User:" + userName))
            .text(userName);

          var $avatarContainer = $("<span>")
            .addClass("UserAvatarFetch")
            .append(
              $("<span>").addClass("avi-thisUsername").text(userName).hide(),
              $("<span>").addClass("avi-thisSize").text("20").hide(),
              $("<span>").addClass("avi-thisLink").text("User:" + userName).hide()
            );

          $userCell.append($avatarContainer, $userLink);
          $row.append($userCell);

          $row.append($("<td>").text(rating));

          var ratingTime = "Unknown";
          if (typeof ratingData === 'object' && ratingData.timestamp) {
            ratingTime = new Date(ratingData.timestamp).toLocaleString();
          }
          $row.append($("<td>").text(ratingTime));

          $tbody.append($row);
        }

        var $averageInfo = $("<div>")
          .html("<p><strong>Average:</strong> " + currentAverage.toFixed(1) + " (" + currentVoteCount + " votes)</p>");

        popup.contentElement.empty().append($averageInfo, $table);

        // Trigger avatar loading
        if (typeof findAvatars === 'function') {
          findAvatars(popup.contentElement);
        } else if (typeof mw.hook !== 'undefined') {
          mw.hook('wikipage.content').fire(popup.contentElement);
        }

      }).fail(function(error) {
        popup.contentElement.html("<div style='color: #d33; padding: 20px;'>Failed to load rating details: " + error + "</div>");
      });
    }
  });
})(jQuery);