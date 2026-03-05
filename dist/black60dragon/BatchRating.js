(function($) {
  mw.loader.using(["mediawiki.api", "mediawiki.util"], function() {
    if (mw.user.isAnon()) {
      return;
    }

    var api = new mw.Api();
    // Global rating data, format: { pageId: { userId: { rating: number, timestamp: "ISO" }, ... } }
    var globalRatings = {};
    var currentDetailsPageId = null;

    // Fetch global ratings from Project:ArticleRates
    function fetchGlobalRatings(callback) {
      api.get({
        action: "query",
        titles: "Project:ArticleRates",
        prop: "revisions",
        rvprop: "content",
        format: "json"
      }).done(function(data) {
        var pages = data.query.pages;
        var pageId = Object.keys(pages)[0];
        if (pageId !== "-1") {
          try {
            var content = pages[pageId].revisions[0]["*"];
            globalRatings = content ? JSON.parse(content) : {};
          } catch (e) {
            globalRatings = {};
          }
        } else {
          globalRatings = {};
        }
        if (typeof callback === "function") callback();
      }).fail(function(error) {
        mw.notify("Error loading rating data: " + error, { type: "error" });
        if (typeof callback === "function") callback();
      });
    }

    // Batch manager container
    var $manager = $("#batch-rating-manager");
    if (!$manager.length) {
      console.log("Batch manager div not found!");
      return;
    }

    // Show loading immediately
    $manager.html('<p style="text-align:center; padding:20px; font-weight:bold;">Loading batch rating manager... (fetching all mainspace pages)</p>');

    // Create sorting controls
    var $sortControls = $("<div id='sort-controls'>")
      .css({ marginBottom: "10px", textAlign: "right" })
      .append(
        $("<button id='sort-avg' class='cdx-button'>").text("Sort by Average Rating").css({ marginRight: "10px" }),
        $("<button id='sort-my' class='cdx-button'>").text("Sort by My Rating")
      );
    $manager.append($sortControls);

    // Create table: Page | Rating Widget | My Rating
    var $table = $("<table>").addClass("article-rating-content-table").css({ width: "100%", borderCollapse: "collapse" });
    var $thead = $("<thead>");
    var $tbody = $("<tbody>");
    $table.append($thead, $tbody);
    var $headerRow = $("<tr>");
    $headerRow.append(
      $("<th>").text("Page").css({ textAlign: "left", padding: "8px" }),
      $("<th>").text("Rating").css({ textAlign: "center", padding: "8px" }),
      $("<th>").text("My Rating").css({ textAlign: "center", padding: "8px" })
    );
    $thead.append($headerRow);
    $manager.append($table);

    // Global details popup (reusing similar structure to main script)
    var $popupFrame = $("<div>").addClass("popup-box-frame rating-popup").hide();
    var $popupSublayer = $("<div>").addClass("popup-box-sublayer");
    var $popupBox = $("<div>").addClass("popup-box");
    var $popupHeader = $("<div>").addClass("popup-box-header");
    var $closeLabel = $("<span>").addClass("close-label").attr("title", "Close").html("&times;");
    var $headerText = $("<span>").addClass("popup-box-header-text").text("Rating Details");
    var $popupContent = $("<div>").addClass("popup-box-content");
    $popupHeader.append($closeLabel, $headerText);
    $popupBox.append($popupHeader, $popupContent);
    $popupFrame.append($popupSublayer, $popupBox);
    $("body").append($popupFrame);

    $closeLabel.on("click", function(e) {
      e.stopPropagation();
      $popupFrame.fadeOut(300);
      currentDetailsPageId = null;
    });
    $popupSublayer.on("click", function() {
      $popupFrame.fadeOut(300);
      currentDetailsPageId = null;
    });

    // Load all main namespace pages (non-redirects)
    function loadAllPages(continueParams, allPages, callback) {
      allPages = allPages || [];
      var params = {
        action: "query",
        list: "allpages",
        apnamespace: 0,
        aplimit: "max",           // Change to "50" for testing if wiki is very large
        apfilterredir: "nonredirects",
        format: "json"
      };

      if (continueParams && continueParams.apcontinue) params.apcontinue = continueParams.apcontinue;

      api.get(params).done(function(data) {
        var pages = data.query.allpages || [];
        allPages = allPages.concat(pages);

        if (data.continue && data.continue.apcontinue) {
          loadAllPages(data.continue, allPages, callback);
        } else {
          // Filter excluded pages if defined
          if (window.ArticleRatesExcludePages && Array.isArray(window.ArticleRatesExcludePages)) {
            allPages = allPages.filter(page => window.ArticleRatesExcludePages.indexOf(page.title) === -1);
          }
          callback(allPages);
        }
      }).fail(function(error) {
        mw.notify("Error loading page list: " + error, { type: "error" });
        callback(allPages);
      });
    }

    // Render pages table
    function renderPagesTable(pages) {
  $tbody.empty(); // Clear loading message
  pages.forEach(function(page) {
    var $row = $("<tr>").data("pageid", page.pageid);
    
    // Page link cell
    var $pageCell = $("<td>").css({ padding: "8px" });
    var pageUrl = mw.util.getUrl(page.title);
    $pageCell.append(
      $("<a>")
        .attr("href", pageUrl)
        .attr("title", page.title)
        .text(page.title)
    );

    // Rating widget cell
    var $ratingCell = $("<td>").css({ padding: "8px", textAlign: "center" });
    var ratingData = globalRatings[page.pageid] || {};
    $ratingCell.append(createRatingWidget(page.pageid, page.title, ratingData));

    // My rating cell
    var $myCell = $("<td>").css({ padding: "8px", textAlign: "center" });
    var myRating = (ratingData[mw.user.getId()] && ratingData[mw.user.getId()].rating) || "";
    $myCell.text(myRating ? myRating : "Not rated");

    $row.append($pageCell, $ratingCell, $myCell);
    $row.data("avg", getAverage(ratingData)).data("my", myRating || 0);
    $tbody.append($row);
  });
}

    // Init
    fetchGlobalRatings(function() {
      loadAllPages(null, [], function(allPages) {
        renderPagesTable(allPages);
      });
    });

    function getAverage(ratingData) {
      var arr = Object.values(ratingData).map(r => r.rating);
      if (arr.length === 0) return 0;
      return arr.reduce((a, b) => a + b, 0) / arr.length;
    }

    function createRatingWidget(pageId, pageTitle, ratingData) {
      var $container = $("<div>").addClass("article-rating-container");
      var $starsContainer = $("<div>").addClass("rating-stars-container").css({ display: "inline-block" });
      var $averageContainer = $("<div>").addClass("rating-average-container").css({ display: "inline-block", marginLeft: "5px" });
      var $popupIntro = $("<div>").addClass("rating-popup-intro").text("View Details").css({
        display: "inline-block",
        marginLeft: "5px",
        cursor: "pointer",
        color: "var(--theme-link-color)"
      });

      var $stars = [];
      for (var i = 1; i <= 10; i++) {
        var $star = $("<span>")
          .addClass("rating-star")
          .data("value", i)
          .html("★");

        $star.on("mouseenter", function() {
          var val = $(this).data("value");
          $starsContainer.find(".rating-star").each(function(index) {
            if (index < val) {
              $(this).addClass("highlight").removeClass("half");
            } else {
              $(this).removeClass("highlight half");
            }
          });
        });

        $star.on("mouseleave", function() {
          highlightStars($starsContainer, getAverage(ratingData));
        });

        $star.on("click", function() {
          var value = $(this).data("value");
          saveRatingForPage(pageId, pageTitle, value, $container);
        });

        $stars.push($star);
        $starsContainer.append($star);
      }

      updateWidgetUI(ratingData, $averageContainer, $starsContainer);
      $popupIntro.on("click", function() {
        showRatingDetailsDialog(pageId, ratingData, pageTitle);
      });

      $container.append($starsContainer, $averageContainer, $popupIntro);
      return $container;
    }

    function updateWidgetUI(ratingData, $averageContainer, $starsContainer) {
      var avg = getAverage(ratingData);
      var count = Object.keys(ratingData).length;
      $averageContainer.text(count > 0 ? avg.toFixed(1) + " (" + count + " votes)" : "No ratings yet");
      highlightStars($starsContainer, avg);
    }

    function highlightStars($container, rating) {
      const fullStars = Math.floor(rating);
      const remainder = rating - fullStars;
      const showHalf = remainder >= 0.5;

      $container.find(".rating-star").each(function(index) {
        $(this).removeClass("highlight half");

        if (index < fullStars) {
          $(this).addClass("highlight");
        } else if (index === fullStars && showHalf) {
          $(this).addClass("highlight half");
        }
      });
    }

    function saveRatingForPage(pageId, pageTitle, rating, $widget) {
      api.get({
        action: "query",
        titles: "Project:ArticleRates",
        prop: "revisions",
        rvprop: "content",
        format: "json"
      }).done(function(data) {
        var pages = data.query.pages;
        var rPageId = Object.keys(pages)[0];
        var revisionId = pages[rPageId].revisions[0].revid;
        var content = pages[rPageId].revisions[0]["*"];
        var ratings = {};
        try { ratings = content ? JSON.parse(content) : {}; } catch(e){ ratings = {}; }
        if (!ratings[pageId]) ratings[pageId] = {};
        ratings[pageId][mw.user.getId()] = { rating: rating, timestamp: new Date().toISOString() };

        api.postWithEditToken({
          action: "edit",
          title: "Project:ArticleRates",
          text: JSON.stringify(ratings),
          summary: "Rated [[" + pageTitle + "]] " + rating,
          baserevid: revisionId,
          format: "json"
        }).done(function() {
          fetchGlobalRatings(function() {  // Refresh global data
            var pageData = globalRatings[pageId] || {};
            updateWidgetUI(pageData, $widget.find(".rating-average-container"), $widget.find(".rating-stars-container"));
            var my = (pageData[mw.user.getId()] && pageData[mw.user.getId()].rating) || "";
            $widget.closest("tr").find("td").eq(2).text(my ? my : "Not rated");
            $widget.closest("tr").data("avg", getAverage(pageData)).data("my", my || 0);
            mw.notify("Rating saved: " + pageTitle);
            if ($popupFrame.is(":visible") && currentDetailsPageId === pageId) {
              showRatingDetailsDialog(pageId, pageData, pageTitle);
            }
          });
        }).fail(function(error) {
          mw.notify("Error saving rating: " + error, { type: "error" });
        });
      }).fail(function(error) {
        mw.notify("Error loading rating data: " + error, { type: "error" });
      });
    }

    function showRatingDetailsDialog(pageId, ratingData, pageTitle) {
      var pageData = globalRatings[pageId] || {};
      if (Object.keys(pageData).length === 0) {
        mw.notify("No ratings yet", { type: "info" });
        return;
      }
      currentDetailsPageId = pageId;
      $popupContent.html("<div style='padding: 20px; text-align: center;'>Loading...</div>");
      $popupFrame.fadeIn(300);

      api.get({
        action: "query",
        list: "users",
        ususerids: Object.keys(pageData).join("|"),
        usprop: "groups",
        format: "json"
      }).done(function(data) {
        var users = data.query.users;
        var userMap = {};
        users.forEach(u => userMap[u.userid] = u);

        var $table = $("<table>").addClass("article-rating-content-table row-hover count-row-table-v2-first-column").css({ width: "100%" });
        var $tbodyPopup = $("<tbody>");
        $table.append($tbodyPopup);

        var $header = $("<tr>");
        $header.append(
          $("<th>").text("No.").css({ textAlign: "center" }),
          $("<th>").text("User"),
          $("<th>").text("Rating").css({ textAlign: "center" }),
          $("<th>").text("Time")
        );
        $tbodyPopup.append($header);

        var index = 1;
        for (var uid in pageData) {
          if (pageData.hasOwnProperty(uid)) {
            var rec = pageData[uid];
            var $row = $("<tr>");
            $row.append(
              $("<td>").text(index).css({ textAlign: "center" }),
              $("<td>").append(
                $("<a>").attr("href", mw.util.getUrl("User:" + (userMap[uid] ? userMap[uid].name : uid)))
                  .text(userMap[uid] ? userMap[uid].name : ("User ID:" + uid))
              ),
              $("<td>").text(rec.rating).css({ textAlign: "center", color: "var(--theme-link-color)", fontWeight: "bold" }),
              $("<td>").text(rec.timestamp ? new Date(rec.timestamp).toLocaleString() : "Unknown")
            );
            $tbodyPopup.append($row);
            index++;
          }
        }

        var avg = getAverage(pageData);
        var count = Object.keys(pageData).length;
        var $averageInfo = $("<div>")
          .html("<p><strong>Average:</strong> " + avg.toFixed(1) + " (" + count + " votes)</p>");

        $popupContent.empty().append($averageInfo, $table);
      }).fail(function(error) {
        $popupContent.html("<div style='color: #d33; padding: 20px;'>Failed to load details: " + error + "</div>");
      });
    }

    // Sorting
    $("#sort-avg").on("click", function() { sortTable("avg"); });
    $("#sort-my").on("click", function() { sortTable("my"); });

    function sortTable(criteria) {
      var $rows = $tbody.find("tr");
      var rowsArray = $rows.toArray();
      rowsArray.sort(function(a, b) {
        var aVal = $(a).data(criteria) || 0;
        var bVal = $(b).data(criteria) || 0;
        return bVal - aVal; // descending
      });
      $.each(rowsArray, function(_, row) { $tbody.append(row); });
    }
  });
})(jQuery);