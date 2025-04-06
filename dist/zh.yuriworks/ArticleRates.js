(function($) {
  mw.loader.using(["mediawiki.api", "mediawiki.util", "mediawiki.jqueryMsg"], function() {
    if (mw.config.get("wgNamespaceNumber") !== 0 || mw.user.isAnon()) {
      return;
    }
    
    var pageId = mw.config.get("wgArticleId");
    var pageTitle = mw.config.get("wgPageName");
    var userId = mw.user.getId();
    var currentAverage = 0;
    var currentVoteCount = 0;
    var currentPageRatings = {};
    
    // 创建评分组件
    var $ratingContainer = $("<div>").addClass("article-rating-container");
    var $starsContainer = $("<div>").addClass("rating-stars-container");
    var $averageContainer = $("<div>").addClass("rating-average-container");
    var $popupIntro = $("<div>").addClass("rating-popup-intro").text("查看详情");
    
    // 创建弹窗元素并添加到评分容器
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
    
    // 组装弹窗结构
    $popupHeader.append($closeLabel, $headerText);
    $popupBox.append($popupHeader, $popupContent);
    $popupFrame.append($popupSublayer, $popupBox);
    
    var $stars = [];
    for (var i = 1; i <= 5; i++) {
      var $star = $("<span>")
        .addClass("rating-star")
        .data("value", i)
        .html("★");
      $stars.push($star);
      $starsContainer.append($star);
    }
    $ratingContainer.append($starsContainer, $averageContainer, $popupIntro, $popupFrame);
    
    // 插入到页面 - 作为 .page-header 父元素的最后一个子元素
    var $pageHeader = $(".page-header");
    if ($pageHeader.length) {
      $pageHeader.append($ratingContainer);
    } else {
      var $titleElement = $("#firstHeading, .firstHeading").first();
      if ($titleElement.length) {
        $titleElement.append($ratingContainer);
      }
    }
    
    // 加载评分数据
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
            // 新数据结构: { pageId: { userId: { rating: X, timestamp: "..." }, ... }, ... }
            var ratings = JSON.parse(content) || {};
            var pageRatings = ratings[pageId] || {};
            
            // 转换为旧格式兼容: { userId: rating, ... }
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
      var rounded = Math.round(rating * 2) / 2;
      var fullStars = Math.floor(rounded);
      var fraction = rounded - fullStars;
      for (var i = 0; i < 5; i++) {
        var $star = $stars[i];
        $star.removeClass("highlight half");
        if (i < fullStars) {
          $star.addClass("highlight");
        } else if (i === fullStars && fraction === 0.5) {
          $star.addClass("highlight half");
        }
      }
    }
    
    // 修改updateAverageRating以接收完整评分数据
    function updateAverageRating(simpleRatings, fullRatings) {
      currentPageRatings = fullRatings || simpleRatings; // 优先使用完整数据
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
        $averageContainer.text(average.toFixed(1) + ", 共" + ratings.length + "票");
        highlightStars(average);
      } else {
        currentAverage = 0;
        currentVoteCount = 0;
        $averageContainer.text("暂无评分");
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
        
        // 初始化页面评分数据
        if (!ratings[pageId]) {
          ratings[pageId] = {};
        }
        
        // 新数据结构: 存储评分和时间戳
        ratings[pageId][userId] = {
          rating: rating,
          timestamp: new Date().toISOString()
        };
        
        api.postWithEditToken({
          action: "edit",
          title: "Project:ArticleRates",
          text: JSON.stringify(ratings),
          summary: "将" + pageTitle + "评为" + rating + "分",
          baserevid: revisionId,
          format: "json"
        }).done(function() {
          // 转换为简单格式用于计算平均分
          var simpleRatings = {};
          for (var uid in ratings[pageId]) {
            simpleRatings[uid] = ratings[pageId][uid].rating;
          }
          updateAverageRating(simpleRatings, ratings[pageId]);
          mw.notify("评分已保存!");
        }).fail(function(error) {
          console.error("Error saving rating:", error);
          mw.notify("保存评分时出错: " + error, { type: "error" });
        });
      }).fail(function(error) {
        console.error("Error loading rating data for save:", error);
        mw.notify("加载评分数据时出错: " + error, { type: "error" });
      });
    }
    
    // 点击查看详情按钮时显示评分详情弹窗
    $popupIntro.on("click", function() {
      showRatingDetailsDialog();
    });
    
    // 关闭弹窗事件
    $closeLabel.on("click", function(e) {
      e.stopPropagation();
      $popupFrame.hide();
    });
    
    $popupSublayer.on("click", function() {
      $popupFrame.hide();
    });
    
    // 显示评分详情弹窗
    function showRatingDetailsDialog() {
      if (!currentPageRatings || Object.keys(currentPageRatings).length === 0) {
        mw.notify("暂无评分", { type: "info" });
        return;
      }
      
      // 显示弹窗
      $popupFrame.show();
      $popupContent.html("<div style='padding: 20px; text-align: center;'>加载中...</div>");
      
      // 获取用户信息
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
        
        // 创建表格
        var $table = $("<table>").addClass("fandom-table row-hover count-row-table-v2-first-column");
        var $tbody = $("<tbody>");
        $table.append($tbody);
        
        // 添加表头
        var $header = $("<tr>");
        $header.append(
          $("<th>").text("序号").css({textAlign: "center"}),
          $("<th>").text("用户"),
          $("<th>").text("评分").css({textAlign: "center"}),
          $("<th>").text("评分时间")
        );
        $tbody.append($header);
        
        // 添加评分行
        var index = 1;
        for (var userId in currentPageRatings) {
          var ratingData = currentPageRatings[userId];
          var rating = typeof ratingData === 'object' ? ratingData.rating : ratingData;
          var $row = $("<tr>");
          
          // 序号列
          $row.append($("<td>").css({textAlign: "center"}));
          
          // 用户列
          var $userCell = $("<td>");
          var userName = userMap[userId] ? userMap[userId].name : "用户ID:" + userId;
          var $userLink = $("<a>")
            .attr("href", mw.util.getUrl("User:" + userName))
            .text(userName);
          $userCell.append($userLink);
          $row.append($userCell);
          
          // 评分列
          $row.append(
            $("<td>")
              .text(rating)
              .css({ 
                textAlign: "center", 
                color: "var(--theme-link-color)",
                fontWeight: "bold"
              })
          );
          
          // 评分时间列
          var ratingTime = "未知";
          if (typeof ratingData === 'object' && ratingData.timestamp) {
            ratingTime = new Date(ratingData.timestamp).toLocaleString();
          }
          $row.append($("<td>").text(ratingTime));
          
          $tbody.append($row);
        }
        
        // 添加平均分信息
        var $averageInfo = $("<div>")
          .html("<p><strong>平均分:</strong> " + currentAverage.toFixed(1) + " (共" + currentVoteCount + "票)</p>");
        
        // 清空内容后追加平均分和表格
        $popupContent.empty().append($averageInfo, $table);
      }).fail(function(error) {
        $popupContent.html("<div style='color: #d33; padding: 20px;'>加载评分详情失败: " + error + "</div>");
      });
    }
  });
})(jQuery);