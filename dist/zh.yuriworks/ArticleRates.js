(function($) {
  mw.loader.using(["mediawiki.api", "mediawiki.util", "mediawiki.jqueryMsg"], function() {
    // 确保PopupGenerator已加载
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

    if (mw.config.get("wgNamespaceNumber") !== 0 || mw.user.isAnon() || pageId === 0) {
      return;
    }

    if (window.ArticleRatesExcludePages && window.ArticleRatesExcludePages.indexOf(pageTitle) !== -1) {
      return;
    }

    // 创建评分组件
    var $ratingContainer = $("<div>").addClass("article-rating-container");
    var $starsContainer = $("<div>").addClass("rating-stars-container");
    var $averageContainer = $("<div>").addClass("rating-average-container");
    
    // 使用PopupGenerator创建弹窗
    var popup = PopupGenerator.createPopup({
      introText: "查看详情",
      headerText: "评分详情",
      frameCSS: "rating-popup",
      content: "",
      appendTo: $ratingContainer,
      mode: "create",
      onOpen: function() {
        showRatingDetailsDialog();
      },
      onClose: function() {
        // 弹窗关闭时的清理工作（如果有）
      }
    });

    var $stars = [];
    for (var i = 1; i <= 5; i++) {
      var $star = $("<span>")
        .addClass("rating-star")
        .data("value", i)
        .html("★");
      $stars.push($star);
      $starsContainer.append($star);
    }
    
    $ratingContainer.append($starsContainer, $averageContainer, popup.triggerElement, popup.popupElement);

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
          summary: "将[[" + pageTitle + "]]评为" + rating + "分",
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

    // 显示评分详情弹窗
	function showRatingDetailsDialog() {
	  if (!currentPageRatings || Object.keys(currentPageRatings).length === 0) {
	    mw.notify("暂无评分", { type: "info" });
	    popup.close();
	    return;
	  }
	
	  // 设置弹窗内容为加载中
	  popup.contentElement.html("<div style='padding: 20px; text-align: center;'>加载中...</div>");
	
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
	    var $table = $("<table>").addClass("article-rating-content-table row-hover count-row-table-v2-first-column");
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
	    for (var userId in currentPageRatings) {
	      var ratingData = currentPageRatings[userId];
	      var rating = typeof ratingData === 'object' ? ratingData.rating : ratingData;
	      var $row = $("<tr>");
	
	      // 序号列
	      $row.append($("<td>").css({textAlign: "center"}));
	
	      // 用户列 - 添加头像
	      var $userCell = $("<td>");
	      var userName = userMap[userId] ? userMap[userId].name : "用户ID:" + userId;
	      
	      // 创建包含头像的用户链接
	      var $userLink = $("<a>")
	        .attr("href", mw.util.getUrl("User:" + userName))
	        .text(userName);
	      
	      // 添加头像容器
	      var $avatarContainer = $("<span>")
	        .addClass("UserAvatarFetch")
	        .append(
	          $("<span>").addClass("avi-thisUsername").text(userName).hide(),
	          $("<span>").addClass("avi-thisSize").text("20").hide(),
	          $("<span>").addClass("avi-thisLink").text("User:" + userName).hide()
	        );
	      
	      $userCell.append($avatarContainer, $userLink);
	      $row.append($userCell);
	
	      // 评分列
	      $row.append(
	        $("<td>").text(rating));
	
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
	    popup.contentElement.empty().append($averageInfo, $table);
	    
	    // 触发头像加载
	    if (typeof findAvatars === 'function') {
	      findAvatars(popup.contentElement);
	    } else if (typeof mw.hook !== 'undefined') {
	      // 如果User Avatar Finder脚本已加载，通过hook触发
	      mw.hook('wikipage.content').fire(popup.contentElement);
	    }
	    
	  }).fail(function(error) {
	    popup.contentElement.html("<div style='color: #d33; padding: 20px;'>加载评分详情失败: " + error + "</div>");
	  });
	}
  });
})(jQuery);

// 第二个函数保持不变
(function($) {
  // 只在 ArticleRates 页面执行（检查命名空间ID和页面名称）
  var pageName = mw.config.get('wgPageName');
  var namespaceId = mw.config.get('wgNamespaceNumber');
  var canonicalPageName = mw.config.get('wgCanonicalNamespace') + ':' + mw.config.get('wgTitle');
  
  // 检查是否是ArticleRates页面（命名空间ID为4或Project，页面名称为ArticleRates）
  if ((namespaceId !== 4 && !/^Project(:|$)/.test(canonicalPageName)) || 
      !/ArticleRates$/.test(pageName)) {
    return;
  }

  // 保存原始表格HTML
  var originalTableHtml = null;
  var isVisualized = false;

  // 等待页面加载完成
  $(function() {
    // 创建控制按钮容器
    var $controlPanel = $('<div>').addClass('json-visual-controls');

    // 添加批量评分按钮
    var $batchRateBtn = $('<button>')
      .text('批量评分')
      .addClass('cdx-button mw-ui-progressive')
      .css('margin-right', '10px')
      .click(function() {
        window.location.href = mw.util.getUrl('Project:BatchRate');
      });

    // 添加可视化/取消可视化按钮
    var $visualizeBtn = $('<button>')
      .text('可视化本页')
      .addClass('cdx-button mw-ui-progressive')
      .click(toggleVisualization);

    // 将按钮添加到控制面板
    $controlPanel.append($batchRateBtn, $visualizeBtn);

    // 将控制面板插入到内容顶部
    $('#mw-content-text').prepend($controlPanel);

    // 切换可视化状态
    function toggleVisualization() {
      if (isVisualized) {
        restoreOriginalTable();
        $visualizeBtn.text('可视化本页');
        isVisualized = false;
      } else {
        visualizeJsonTable();
        $visualizeBtn.text('取消可视化');
        isVisualized = true;
      }
    }

    // 恢复原始表格
    function restoreOriginalTable() {
      if (originalTableHtml) {
        $('.mw-json').replaceWith(originalTableHtml);
        mw.notify('已恢复原始表格显示');
      }
    }

    // 可视化JSON表格函数
    function visualizeJsonTable() {
      var $jsonTable = $('.mw-json:has(.mw-json .mw-json)');
      if (!$jsonTable.length) return;

      // 保存原始HTML
      originalTableHtml = $jsonTable.clone();

      // 设置第一层th宽度为25%
      $jsonTable.find('> tbody > tr:has(.mw-json .mw-json) > th').css('width', '25%');

      // 设置第二层th宽度为33%
      $jsonTable.find('.mw-json > tbody > tr:has(.mw-json) > th').css('width', '33%');

      // 处理第一层表格 - 页面ID
      $jsonTable.find('> tbody > tr:has(.mw-json .mw-json) > th > span').each(function() {
        var pageId = $(this).text();
        var $span = $(this);
        
        // 获取页面标题
        var api = new mw.Api();
        api.get({
          action: 'query',
          pageids: pageId,
          format: 'json'
        }).done(function(data) {
          var pages = data.query.pages;
          var page = pages[pageId];
          if (page && !page.missing) {
            $span.html(
              $('<a>')
                .attr('href', mw.util.getUrl(page.title))
                .text(page.title)
            );
          } else {
            $span.text('页面ID: ' + pageId);
          }
        }).fail(function() {
          $span.text('页面ID: ' + pageId);
        });
      });

      // 处理第二层表格 - 用户ID
      $jsonTable.find('.mw-json > tbody > tr:has(.mw-json) > th > span').each(function() {
        var userId = $(this).text();
        if (/^\d+$/.test(userId)) { // 检查是否是数字ID
          var $span = $(this);
          
          // 获取用户名
          var api = new mw.Api();
          api.get({
            action: 'query',
            list: 'users',
            ususerids: userId,
            format: 'json'
          }).done(function(data) {
            var user = data.query.users[0];
            if (user && !user.missing) {
              $span.html(
                $('<a>')
                  .attr('href', mw.util.getUrl('User:' + user.name))
                  .text(user.name)
              );
            } else {
              $span.text('用户ID: ' + userId);
            }
          }).fail(function() {
            $span.text('用户ID: ' + userId);
          });
        }
      });

      // 处理第三层表格 - 评分和时间
      $jsonTable.find('.mw-json .mw-json > tbody > tr > th > span').each(function() {
        var text = $(this).text();
        if (text === 'rating') {
          $(this).text('评分');
        } else if (text === 'timestamp') {
          $(this).text('时间');
        }
      });

      // 格式化时间戳
      function formatTimestamp(timestamp) {
        try {
          // 移除可能的引号
          var dateStr = timestamp.replace(/^"|"$/g, '');
          
          // 创建Date对象
          var date = new Date(dateStr);
          if (isNaN(date.getTime())) {
            return timestamp; // 返回原始值如果日期无效
          }
          
          // 使用MediaWiki的时间格式化方法
          var options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
          };
          
          // 获取用户语言
          var userLang = mw.config.get('wgUserLanguage') || 'zh';
          
          // 创建格式化对象
          var formatter = new Intl.DateTimeFormat(userLang, options);
          
          // 格式化日期
          return formatter.format(date);
        } catch (e) {
          console.error('格式化时间戳出错:', e);
          return timestamp; // 返回原始值如果出错
        }
      }

      // 格式化时间戳
      $jsonTable.find('td.mw-json-value').each(function() {
        var $cell = $(this);
        var text = $cell.text();
        
        // 检查是否是ISO时间格式
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(text) || 
            /^"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(text)) {
          var formatted = formatTimestamp(text);
          $cell.text(formatted);
        }
      });

      // 添加表格样式
      $jsonTable.addClass('article-rates-table');
      
      mw.notify('可视化完成！点击"取消可视化"可恢复原始表格');
    }
  });
})(jQuery);