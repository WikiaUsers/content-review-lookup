(function($) {
  mw.loader.using(["mediawiki.api", "mediawiki.util"], function() {
    if (mw.user.isAnon()) {
      return;
    }

    var api = new mw.Api();
    // 全局评分数据，格式：{ pageId: { userId: { rating: 数字, timestamp: "ISO时间" }, ... } }
    var globalRatings = {};
    var currentDetailsPageId = null; // 当前正在查看详情的页面ID

    // 获取 Project:ArticleRates 页面中的全局评分数据
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
        if (typeof callback === "function") {
          callback();
        }
      }).fail(function(error) {
        mw.notify("加载评分数据时出错: " + error, { type: "error" });
        if (typeof callback === "function") {
          callback();
        }
      });
    }

    // 根据页面ID返回该页面的评分数据
    function fetchPageRating(pageId, callback) {
      fetchGlobalRatings(function() {
        var data = globalRatings[pageId] || {};
        if (typeof callback === "function") {
          callback(data);
        }
      });
    }

    // 批量管理容器
    var $manager = $("#batch-rating-manager");
    if (!$manager.length) {
      return;
    }

    // 创建排序控制区
    var $sortControls = $("<div id='sort-controls'>")
      .css({ marginBottom: "10px" })
      .append(
        $("<button id='sort-avg' class='cdx-button'>").text("按平均分排序").css({ marginRight: "10px" }),
        $("<button id='sort-my' class='cdx-button'>").text("按我的评分排序")
      );
    $manager.append($sortControls);

    // 创建表格，包含三列：页面、评分组件、我的评分
    var $table = $("<table>").css({
      width: "100%",
      borderCollapse: "collapse"
    });
    var $thead = $("<thead>");
    var $tbody = $("<tbody>");
    $table.append($thead, $tbody);
    var $headerRow = $("<tr>");
    $headerRow.append(
      $("<th>").text("页面").css({ textAlign: "left", padding: "8px" }),
      $("<th>").text("评分组件").css({ textAlign: "center", padding: "8px" }),
      $("<th>").text("我的评分").css({ textAlign: "center", padding: "8px" })
    );
    $thead.append($headerRow);
    $manager.append($table);

    // 创建全局详情弹窗
    var $popupFrame = $("<div>").addClass("popup-box-frame rating-popup").hide();
    var $popupSublayer = $("<div>").addClass("popup-box-sublayer");
    var $popupBox = $("<div>").addClass("popup-box");
    var $popupHeader = $("<div>").addClass("popup-box-header");
    var $closeLabel = $("<span>")
      .addClass("close-label")
      .attr("title", "关闭")
      .html("&times;");
    var $headerText = $("<span>")
      .addClass("popup-box-header-text")
      .text("评分详情");
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

    // 加载所有主名字空间的内容页面（排除重定向页面）
    function loadAllPages(continueParams, allPages, callback) {
      allPages = allPages || [];
      var params = {
        action: "query",
        list: "allpages",
        apnamespace: 0,
        aplimit: "max",
        apfilterredir: "nonredirects",
        format: "json"
      };

      if (continueParams && continueParams.apcontinue) {
        params.apcontinue = continueParams.apcontinue;
      }

      api.get(params).done(function(data) {
        var pages = data.query.allpages || [];
        allPages = allPages.concat(pages);

        if (data.continue && data.continue.apcontinue) {
          loadAllPages(data.continue, allPages, callback);
        } else {
          // 过滤掉不需要的页面
          if (window.ArticleRatesExcludePages && Array.isArray(window.ArticleRatesExcludePages)) {
            allPages = allPages.filter(function(page) {
              return window.ArticleRatesExcludePages.indexOf(page.title) === -1;
            });
          }
          callback(allPages);
        }
      }).fail(function(error) {
        mw.notify("加载页面列表时出错: " + error, { type: "error" });
        callback(allPages);
      });
    }

    // 渲染页面表格
    function renderPagesTable(pages) {
      pages.forEach(function(page) {
        var $row = $("<tr>").data("pageid", page.pageid);
        // 第一列：页面链接
        var $pageCell = $("<td>").css({ padding: "8px" });
        var pageUrl = mw.util.getUrl(page.title);
        var $link = $("<a>").attr("href", pageUrl).attr("title", page.title).text(page.title);
        $pageCell.append($link);
        // 第二列：评分组件
        var $ratingCell = $("<td>").css({ padding: "8px", textAlign: "center" });
        var ratingData = globalRatings[page.pageid] || {};
        var widget = createRatingWidget(page.pageid, page.title, ratingData);
        $ratingCell.append(widget);
        // 第三列：我的评分
        var $myCell = $("<td>").css({ padding: "8px", textAlign: "center" });
        var myRating = (ratingData[mw.user.getId()] && ratingData[mw.user.getId()].rating) || "";
        $myCell.text(myRating ? myRating : "未评分");
        $row.append($pageCell, $ratingCell, $myCell);
        // 保存排序数据：平均分与我的评分
        var avg = getAverage(ratingData);
        $row.data("avg", avg).data("my", myRating || 0);
        $tbody.append($row);
      });
    }

    // 初始化加载
    fetchGlobalRatings(function() {
      loadAllPages(null, [], function(allPages) {
        renderPagesTable(allPages);
      });
    });

    // 计算平均分
    function getAverage(ratingData) {
      var arr = [];
      for (var uid in ratingData) {
        if (ratingData.hasOwnProperty(uid)) {
          arr.push(ratingData[uid].rating);
        }
      }
      if (arr.length === 0) return 0;
      var sum = arr.reduce(function(a, b) { return a + b; }, 0);
      return sum / arr.length;
    }

    // 创建评分组件（包含星级、平均分显示和"查看详情"按钮）
    function createRatingWidget(pageId, pageTitle, ratingData) {
      var $container = $("<div>").addClass("article-rating-container");
      var $starsContainer = $("<div>").addClass("rating-stars-container").css({ display: "inline-block" });
      var $averageContainer = $("<div>").addClass("rating-average-container").css({ display: "inline-block", marginLeft: "5px" });
      var $popupIntro = $("<div>").addClass("rating-popup-intro").text("查看详情").css({
        display: "inline-block",
        marginLeft: "5px",
        cursor: "pointer",
        color: "var(--theme-link-color)"
      });
      var $stars = [];
      for (var i = 1; i <= 5; i++) {
        var $star = $("<span>")
          .addClass("rating-star")
          .data("value", i)
          .html("★")
          .css({
            cursor: "pointer",
            fontSize: "1.2em",
            marginRight: "1px",
            transition: "color 0.3s",
            color: "var(--minor-script-text-color)"
          });
        // 鼠标悬停时显示高亮
        $star.on("mouseenter", function() {
          var val = $(this).data("value");
          $starsContainer.find(".rating-star").each(function(index) {
            $(this).css("color", index < val ? "var(--theme-link-color)" : "var(--minor-script-text-color)");
          });
        });
        $star.on("mouseleave", function() {
          highlightStars($starsContainer, getAverage(ratingData));
        });
        (function(value) {
          $star.on("click", function() {
            saveRatingForPage(pageId, pageTitle, value, $container);
          });
        })(i);
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

    // 更新组件UI：更新平均分显示和星级高亮
    function updateWidgetUI(ratingData, $averageContainer, $starsContainer) {
      var avg = getAverage(ratingData);
      var count = Object.keys(ratingData).length;
      $averageContainer.text(count > 0 ? (avg.toFixed(1) + ", 共" + count + "票") : "暂无评分");
      highlightStars($starsContainer, avg);
    }

    function highlightStars($container, rating) {
      var rounded = Math.round(rating * 2) / 2;
      var fullStars = Math.floor(rounded);
      var fraction = rounded - fullStars;
      $container.find(".rating-star").each(function(index) {
        $(this).removeClass("highlight half");
        if (index < fullStars) {
          $(this).css("color", "var(--theme-link-color)");
        } else if (index === fullStars && fraction === 0.5) {
          $(this).css("color", "var(--theme-link-color)");
        } else {
          $(this).css("color", "var(--minor-script-text-color)");
        }
      });
    }

    // 保存评分，并更新当前行及刷新详情弹窗（如果显示）
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
        try {
          ratings = content ? JSON.parse(content) : {};
        } catch (e) {
          ratings = {};
        }
        if (!ratings[pageId]) {
          ratings[pageId] = {};
        }
        var currentTimestamp = new Date().toISOString();
        ratings[pageId][mw.user.getId()] = {
          rating: rating,
          timestamp: currentTimestamp
        };
        api.postWithEditToken({
          action: "edit",
          title: "Project:ArticleRates",
          text: JSON.stringify(ratings),
          summary: "将" + pageTitle + "评为" + rating + "分",
          baserevid: revisionId,
          format: "json"
        }).done(function() {
          // 重新获取当前页面的评分数据
          fetchPageRating(pageId, function(pageData) {
            updateWidgetUI(pageData, $widget.find(".rating-average-container"), $widget.find(".rating-stars-container"));
            var my = (pageData[mw.user.getId()] && pageData[mw.user.getId()].rating) || "";
            $widget.closest("tr").find("td").eq(2).text(my ? my : "未评分");
            $widget.closest("tr").data("avg", getAverage(pageData))
                               .data("my", my || 0);
            mw.notify("评分已保存: " + pageTitle);
            // 如果详情弹窗正在显示该页面，则刷新详情内容
            if ($popupFrame.is(":visible") && currentDetailsPageId === pageId) {
              showRatingDetailsDialog(pageId, pageData, pageTitle);
            }
          });
        }).fail(function(error) {
          mw.notify("保存评分时出错: " + error, { type: "error" });
        });
      }).fail(function(error) {
        mw.notify("加载评分数据时出错: " + error, { type: "error" });
      });
    }

    // 显示详情弹窗，每次重新获取最新数据后构造详情内容
    function showRatingDetailsDialog(pageId, ratingData, pageTitle) {
      fetchPageRating(pageId, function(pageData) {
        if (!pageData || Object.keys(pageData).length === 0) {
          mw.notify("暂无评分", { type: "info" });
          return;
        }
        currentDetailsPageId = pageId;
        $popupContent.html("<div style='padding: 20px; text-align: center;'>加载中...</div>");
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
          users.forEach(function(user) {
            userMap[user.userid] = user;
          });
          var $table = $("<table>").addClass("fandom-table row-hover count-row-table-v2-first-column").css({
            width: "100%",
            borderCollapse: "collapse"
          });
          var $tbodyPopup = $("<tbody>");
          $table.append($tbodyPopup);
          var $header = $("<tr>");
          $header.append(
            $("<th>").text("序号").css({ textAlign: "center", padding: "8px" }),
            $("<th>").text("用户").css({ padding: "8px" }),
            $("<th>").text("评分").css({ textAlign: "center", padding: "8px" }),
            $("<th>").text("评分时间").css({ padding: "8px" })
          );
          $tbodyPopup.append($header);
          var index = 1;
          for (var uid in pageData) {
            if (pageData.hasOwnProperty(uid)) {
              var rec = pageData[uid];
              var $row = $("<tr>");
              $row.append(
                $("<td>").text(index).css({ textAlign: "center", padding: "8px" }),
                $("<td>").append(
                  $("<a>")
                    .attr("href", mw.util.getUrl("User:" + (userMap[uid] ? userMap[uid].name : uid)))
                    .text(userMap[uid] ? userMap[uid].name : ("用户ID:" + uid))
                ).css({ padding: "8px" }),
                $("<td>").text(rec.rating).css({ textAlign: "center", padding: "8px", color: "var(--theme-link-color)", fontWeight: "bold" }),
                $("<td>").text(rec.timestamp ? new Date(rec.timestamp).toLocaleString() : "未知").css({ padding: "8px" })
              );
              $tbodyPopup.append($row);
              index++;
            }
          }
          var avg = getAverage(pageData);
          var count = Object.keys(pageData).length;
          var $averageInfo = $("<div>").html("<p><strong>平均分:</strong> " + avg.toFixed(1) + " (共" + count + "票)</p>");
          $popupContent.empty().append($averageInfo, $table);
        }).fail(function(error) {
          $popupContent.html("<div style='color: #d33; padding: 20px;'>加载评分详情失败: " + error + "</div>");
        });
      });
    }

    // 排序功能：对 tbody 中所有行整体排序
    $("#sort-avg").on("click", function() {
      sortTable("avg");
    });
    $("#sort-my").on("click", function() {
      sortTable("my");
    });
    function sortTable(criteria) {
      var $rows = $tbody.find("tr");
      var rowsArray = $rows.toArray();
      rowsArray.sort(function(a, b) {
        var aVal = $(a).data(criteria) || 0;
        var bVal = $(b).data(criteria) || 0;
        return bVal - aVal;
      });
      $.each(rowsArray, function(index, row) {
        $tbody.append(row);
      });
    }
  });
})(jQuery);