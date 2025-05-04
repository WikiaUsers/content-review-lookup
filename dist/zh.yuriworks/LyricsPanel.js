var LyricsPlayer = (function () {
  var lyricsData = [];
  var currentLine = -1;
  var audioElement = null;
  var lyricsContainer = null;
  var scrollable = null;
  var lineHeight = 0;
  var containerHeight = 0;
  var isPlaying = false;
  var isUserScrolling = false;
  var scrollTimeout = null;
  var initialScrollDone = false;
  var roleColorMap = {};

  function decodeHTMLEntities(text) {
    if (!text) return text;
    var textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }

  function parseLRC(text) {
    text = decodeHTMLEntities(text);
    var preContent = text.match(/<pre>([\s\S]*?)<\/pre>/i);
    if (preContent && preContent[1]) text = preContent[1];
    var lines = text.split("\n");
    var result = [];

    lines.forEach(function (line) {
      line = line.trim();
      if (!line) return;

      line = line.replace(/<\d{2}:\d{2}\.\d{2}>/g, "");
      var timeTags = line.match(/\[\d{2}:\d{2}\.\d{2}\]/g);
      if (!timeTags) return;

      var lyricText = line.replace(/\[\d{2}:\d{2}\.\d{2}\]/g, "");
      var segments = [];
      var lastIndex = 0;
      var hasMultipleRoles = false;
      var currentRole = "default";
      var currentColor = "";

      // 修改后的角色解析逻辑
      var roleRegex = /<R\s*=\s*([^,>]+)\s*(?:,\s*C\s*=\s*([^>]+))?\s*>/g;
      var match;
      var lastPos = 0;

      while ((match = roleRegex.exec(lyricText)) !== null) {
        // 添加匹配前的文本
        if (match.index > lastPos) {
          var beforeText = lyricText.substring(lastPos, match.index);
          if (beforeText.trim()) {
            segments.push({
              text: beforeText,
              role: currentRole,
              color: currentColor
            });
          }
        }

        // 更新当前角色和颜色
        currentRole = (match[1] || "").trim();
        currentColor = (match[2] || "").trim();

        if (currentColor) {
          roleColorMap[currentRole] = currentColor;
        } else if (roleColorMap[currentRole]) {
          currentColor = roleColorMap[currentRole];
        }

        lastPos = roleRegex.lastIndex;
        hasMultipleRoles = true;
      }

      // 添加最后一段文本
      if (lastPos < lyricText.length) {
        var remainingText = lyricText.substring(lastPos);
        if (remainingText.trim()) {
          segments.push({
            text: remainingText,
            role: currentRole,
            color: currentColor
          });
        }
      }

      if (segments.length === 0) {
        segments.push({
          text: lyricText,
          role: "default",
          color: ""
        });
      }

      timeTags.forEach(function (tag) {
        var timeStr = tag.replace(/[\[\]]/g, "");
        var parts = timeStr.split(":");
        var time = parseFloat(parts[0]) * 60 + parseFloat(parts[1]);

        result.push({
          time: time,
          segments: segments,
          hasMultipleRoles: hasMultipleRoles
        });
      });
    });

    result.sort(function (a, b) {
      return a.time - b.time;
    });
    return result;
  }

  function createLyricsDOM(container) {
    var lyricsDiv = $("<div>").addClass("lyrics-container");
    scrollable = $("<div>").addClass("lyrics-scrollable");

    var parsePromises = [];

    lyricsData.forEach(function (line, index) {
      var lineDiv = $("<div>").addClass("lyrics-line").attr({
        "data-time": line.time,
        "data-index": index,
        "data-has-multiple-roles": line.hasMultipleRoles
      });

      var segmentsContainer = $("<span>").addClass("lyrics-segments");

      line.segments.forEach(function (segment) {
        var segmentDiv = $("<span>")
          .addClass("lyrics-segment")
          .attr("data-role", segment.role)
          .attr("title", segment.role)
          .css("color", segment.color || "inherit");

        segmentsContainer.append(segmentDiv);

        var promise = new mw.Api()
          .post({
            action: "parse",
            format: "json",
            text: segment.text,
            contentmodel: "wikitext"
          })
          .then(function (data) {
            if (data && data.parse && data.parse.text && data.parse.text["*"]) {
              var html = data.parse.text["*"];
              // 移除不需要的包装 div 和 pre 标签
              html = html
                .replace(/^<div[^>]*>/, "")
                .replace(/<\/div>$/, "")
                .replace(/<pre[^>]*>/, "")
                .replace(/<\/pre>/, "")
                .trim();
              segmentDiv.html(html);
            } else {
              segmentDiv.text(segment.text);
            }
          })
          .fail(function () {
            segmentDiv.text(segment.text);
          });

        parsePromises.push(promise);
      });

      lineDiv.append(segmentsContainer);

      var jumpBtn = $("<span>")
        .addClass("jump-to-time")
        .text("▶")
        .on("click", function (e) {
          e.stopPropagation();
          audioElement[0].currentTime = line.time;
          audioElement[0].play();
          isUserScrolling = false;
        });

      lineDiv.prepend(jumpBtn);
      scrollable.append(lineDiv);
    });

    lyricsDiv.append(scrollable);
    container.prepend(lyricsDiv);

    $.when.apply($, parsePromises).then(function () {
      if (lyricsData.length > 0) {
        lineHeight = scrollable.find(".lyrics-line").first().outerHeight(true);
        containerHeight = lyricsDiv.height();

        setTimeout(function () {
          scrollToLine(0, true);
          initialScrollDone = true;
        }, 300);
      }

      lyricsDiv.on("scroll", function () {
        isUserScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
          isUserScrolling = false;
          if (!isPlaying) {
            var visibleCenter = lyricsDiv.scrollTop() + containerHeight / 2;
            var closestLine = findClosestLine(visibleCenter);
            if (closestLine >= 0 && closestLine !== currentLine) {
              currentLine = closestLine;
              audioElement[0].currentTime = lyricsData[currentLine].time;
            }
          }
        }, 1000);
      });
    });
  }
  function scrollToLine(lineIndex, immediate) {
    var lineElement = scrollable.find(
      '.lyrics-line[data-index="' + lineIndex + '"]'
    );
    if (lineElement.length) {
      var scrollTop =
        lineElement.position().top - containerHeight / 2 + lineHeight / 2;

      scrollable.find(".lyrics-line").removeClass("active");
      lineElement.addClass("active");

      if (immediate) {
        lyricsContainer.scrollTop(scrollTop);
      } else {
        lyricsContainer.stop().animate({ scrollTop: scrollTop }, 300);
      }
    }
  }

  function findClosestLine(visibleCenter) {
    var closestLine = -1;
    var minDistance = Infinity;

    scrollable.find(".lyrics-line").each(function () {
      var lineTop = $(this).position().top;
      var lineCenter = lineTop + lineHeight / 2;
      var distance = Math.abs(visibleCenter - lineCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestLine = parseInt($(this).attr("data-index"));
      }
    });

    return closestLine;
  }

  function updateLyrics(currentTime) {
    if (lyricsData.length === 0 || !scrollable || !initialScrollDone) return;

    var newLine = -1;
    for (var i = 0; i < lyricsData.length; i++) {
      if (lyricsData[i].time <= currentTime) {
        newLine = i;
      } else {
        break;
      }
    }

    if (newLine !== -1 && newLine !== currentLine && !isUserScrolling) {
      currentLine = newLine;
      scrollToLine(currentLine, false);
    }
  }

  function initEvents() {
    lyricsContainer = $(".lyrics-container");

    audioElement.on("play", function () {
      isPlaying = true;
      isUserScrolling = false;
    });

    audioElement.on("pause", function () {
      isPlaying = false;
    });

    audioElement.on("timeupdate", function () {
      updateLyrics(this.currentTime);
    });

    audioElement.on("seeked", function () {
      updateLyrics(this.currentTime);
    });
  }

  return {
    init: function (panelSelector) {
      var panel = $(panelSelector);
      if (panel.length === 0) return;

      audioElement = panel.find("audio").first();
      if (audioElement.length === 0) return;

      var lyricsPage = panel.attr("data-lyrics-page");
      if (!lyricsPage) return;

      new mw.Api()
        .get({
          action: "query",
          prop: "revisions",
          rvprop: "content",
          titles: lyricsPage,
          format: "json"
        })
        .done(function (data) {
          var pages = data.query.pages;
          for (var pageId in pages) {
            if (pages.hasOwnProperty(pageId)) {
              var content = pages[pageId].revisions[0]["*"];
              lyricsData = parseLRC(content);
              createLyricsDOM(panel);
              initEvents();
            }
          }
        });
    }
  };
})();

$(document).ready(function () {
  LyricsPlayer.init(".lyrics-panel");
});