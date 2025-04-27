// 游戏主控制器
var PolyLineCoverGame = (function() {
  // 私有变量
  var pieceSize = 40;
  var imageNameGroups = [];
  var naxWorks = 20;
  var imageUrlMap = {};
  var currentGroupsData = null;

  // 辅助函数：规范化图片名称
  function normalizeImageName(name) {
    return (name || '').replace(/^File:/, '').replace(/ /g, '_').trim();
  }

  // 辅助函数：获取回退图片URL
  function getFallbackImageUrl(imageName) {
    return ''
  }

  // 辅助函数：数组洗牌
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  // 辅助函数：创建矩阵
  function createMatrix(rows, cols) {
    var matrix = [];
    for (var i = 0; i < rows; i++) {
      matrix[i] = [];
      for (var j = 0; j < cols; j++) {
        matrix[i][j] = 1;
      }
    }
    return matrix;
  }

  // 辅助函数：生成maxSizeArray
  function generateMaxSizeArray(groups) {
    return groups.map(function(group) {
      return group.length;
    });
  }

  // 辅助函数：获取单批图片URL
  function fetchImageBatch(api, imageNames, resultMap) {
    return api.get({
      action: 'query',
      titles: imageNames.map(function(name) {
        return name.startsWith('File:') ? name : 'File:' + name;
      }).join('|'),
      prop: 'imageinfo',
      iiprop: 'url',
      iiurlwidth: pieceSize,
      iiurlheight: pieceSize,
      formatversion: 2
    }).then(function(data) {
      if (data.query && data.query.pages) {
        data.query.pages.forEach(function(page) {
          if (page.imageinfo) {
            var title = normalizeImageName(page.title);
            resultMap[title] = page.imageinfo[0].thumburl || page.imageinfo[0].url;
          }
        });
      }
    }).catch(function(error) {
      console.error('图片批量获取失败:', error);
      imageNames.forEach(function(name) {
        var normalized = normalizeImageName(name);
        if (!resultMap[normalized]) {
          resultMap[normalized] = getFallbackImageUrl(name);
        }
      });
    });
  }

  // 辅助函数：批量获取图片
  function batchFetchImages(imageNames, batchSize) {
    var api = new mw.Api();
    var promises = [];
    var resultMap = {};
    
    for (var i = 0; i < imageNames.length; i += batchSize) {
      var batch = imageNames.slice(i, i + batchSize);
      promises.push(fetchImageBatch(api, batch, resultMap));
    }
    
    return Promise.all(promises).then(function() {
      return resultMap;
    });
  }

  // 核心函数：生成游戏组
  function generateGroups(matrix, maxSizeArray) {
    var numRows = matrix.length;
    var numCols = matrix[0].length;
    var groupId = 1;
    var groupMap = [];
    var groups = {};
    var groupsList = [];
    
    // 初始化groupMap
    for (var i = 0; i < numRows; i++) {
      groupMap[i] = [];
      for (var j = 0; j < numCols; j++) {
        groupMap[i][j] = 0;
      }
    }

    // 图片组跟踪
    var currentImageGroupIndex = 0;
    var currentImageSubIndex = 0;

    function getNeighbors(r, c, visited) {
      var dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];
      var neighbors = [];
      for (var d = 0; d < dirs.length; d++) {
        var nr = r + dirs[d][0], nc = c + dirs[d][1];
        if (nr >= 0 && nr < numRows && nc >= 0 && nc < numCols &&
            matrix[nr][nc] === 1 && !visited[nr + ',' + nc] && groupMap[nr][nc] === 0) {
          neighbors.push([nr, nc]);
        }
      }
      return neighbors;
    }

    function randomWalk(r, c, visited) {
      var path = [];
      var current = [r, c];
      visited[r + ',' + c] = true;
      path.push(current);

      while (true) {
        var neighbors = getNeighbors(current[0], current[1], visited);
        if (neighbors.length === 0) break;

        var next = neighbors[Math.floor(Math.random() * neighbors.length)];
        visited[next[0] + ',' + next[1]] = true;
        path.push(next);
        current = next;
      }

      return path;
    }

    var visited = {};

    for (var i = 0; i < numRows; i++) {
      for (var j = 0; j < numCols; j++) {
        if (matrix[i][j] === 1 && groupMap[i][j] === 0) {
          var path = randomWalk(i, j, visited);

          while (path.length > 0 && currentImageGroupIndex < imageNameGroups.length) {
            var currentImageGroup = imageNameGroups[currentImageGroupIndex];
            var requiredSize = currentImageGroup.length;
            var availableSize = Math.min(
              path.length,
              requiredSize - currentImageSubIndex,
              maxSizeArray.length > 0 ? Math.max.apply(null, maxSizeArray) : 0
            );

            if (availableSize <= 0) {
              currentImageGroupIndex++;
              currentImageSubIndex = 0;
              continue;
            }

            // 寻找最佳匹配尺寸
            var bestFit = -1;
            var bestFitIndex = -1;
            for (var k = 0; k < maxSizeArray.length; k++) {
              if (maxSizeArray[k] >= availableSize && 
                  (bestFit === -1 || maxSizeArray[k] < bestFit)) {
                bestFit = maxSizeArray[k];
                bestFitIndex = k;
              }
            }

            if (bestFit === -1) {
              bestFit = Math.min.apply(null, maxSizeArray);
              bestFitIndex = maxSizeArray.indexOf(bestFit);
            }

            if (bestFitIndex === -1) break;

            maxSizeArray.splice(bestFitIndex, 1);
            var subPath = path.slice(0, bestFit);
            path = path.slice(bestFit);

            // 记录组信息
            var orderMap = {};
            for (var s = 0; s < subPath.length; s++) {
              var r = subPath[s][0], c = subPath[s][1];
              groupMap[r][c] = groupId;
              orderMap[r + ',' + c] = currentImageSubIndex + s + 1;
            }

            groups[groupId] = {
              start: subPath[0],
              members: subPath,
              order: orderMap,
              imageGroupIndex: currentImageGroupIndex,
              imageStartIndex: currentImageSubIndex
            };

            currentImageSubIndex += subPath.length;
            if (currentImageSubIndex >= currentImageGroup.length) {
              currentImageGroupIndex++;
              currentImageSubIndex = 0;
            }

            groupsList.push(subPath);
            groupId++;
          }
        }
      }
    }

    return {
      groupMap: groupMap,
      groups: groups,
      groupsList: groupsList
    };
  }

  // 初始化游戏实例
  function initGameInstance($container) {
    resetContainer($container);
    
    var rows = parseInt($container.data('rows'), 10);
    var cols = parseInt($container.data('cols'), 10);
    maxWorks = parseInt($container.data('max-works') || '20', 10);
    pieceSize = parseInt($container.data('piece-size') || '40', 10);
    
    loadGameData($container, rows, cols);
  }

  function resetContainer($container) {
    $container.prev('.controls').remove();
    $container.empty();
  }

  // 加载游戏数据
  function loadGameData($container, rows, cols) {
    fetchTemplateData()
      .then(function(groups) {
        imageNameGroups = selectRandomGroups(groups, maxWorks);
        var matrix = createMatrix(rows, cols);
        currentGroupsData = generateGroups(matrix, generateMaxSizeArray(imageNameGroups));
        return loadAllImages();
      })
      .then(function() {
        renderGame($container, rows, cols);
      })
      .catch(function(error) {
        handleInitError($container, error);
      });
  }

  // 获取模板数据
  function fetchTemplateData() {
    return new mw.Api().get({
      action: 'query',
      titles: 'Template:PolylineCoverGame/data',
      prop: 'revisions',
      rvprop: 'content',
      rvslots: 'main',
      formatversion: 2
    }).then(function(data) {
      var content = data.query.pages[0].revisions[0].slots.main.content;
      var groups = JSON.parse(content);
      
      if (!Array.isArray(groups)) {
        throw new Error('数据格式错误：应为数组的数组');
      }
      
      return groups;
    });
  }

  // 随机选择组
  function selectRandomGroups(groups, count) {
    return shuffleArray(groups).slice(0, count);
  }

  // 加载所有图片
  function loadAllImages() {
    var allImageNames = getAllRequiredImageNames();
    return batchFetchImages(allImageNames, 5)
      .then(function(urlMap) {
        imageUrlMap = urlMap;
      });
  }

  // 获取所有需要的图片名称
  function getAllRequiredImageNames() {
    var names = [];
    for (var groupId in currentGroupsData.groups) {
      if (currentGroupsData.groups.hasOwnProperty(groupId)) {
        var group = currentGroupsData.groups[groupId];
        var imageGroup = imageNameGroups[group.imageGroupIndex];
        for (var i = 0; i < group.members.length; i++) {
          var order = i + group.imageStartIndex + 1;
          if (imageGroup[order - 1]) {
            names.push(imageGroup[order - 1]);
          }
        }
      }
    }
    // ES5去重
    return names.filter(function(item, pos, self) {
      return self.indexOf(item) === pos;
    });
  }

  // 渲染游戏
  function renderGame($container, rows, cols) {
    setupContainer($container, rows, cols);
    addInteraction($container);
    createExtraControls($container, rows, cols);
  }

  // 设置容器
  function setupContainer($container, rows, cols) {
    var size = pieceSize;
    var piece = currentGroupsData.groupMap;

    $container.css({
      'grid-template-columns': 'repeat(' + cols + ', 1fr)',
      width: (cols * size) + 'px',
      height: (rows * size) + 'px'
    });

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        var groupId = piece[i][j];
        var $cell = createCell(groupId, i, j);
        $container.append($cell);
      }
    }
  }

  function createCell(groupId, i, j) {
    var $cell = $('<div class="cell"></div>');
    if (groupId === 0) return $cell.addClass('unavailable');

    var group = currentGroupsData.groups[groupId];
    var imageGroup = imageNameGroups[group.imageGroupIndex];
    var order = group.order[i + ',' + j];
    var imageName = imageGroup[order - 1];
    
    var imageUrl = getSafeImageUrl(imageName);
    
    $('<img>')
      .attr('src', imageUrl)
      .appendTo($cell);
    
    $cell.data('group', groupId);
    return $cell;
  }

  function getSafeImageUrl(imageName) {
    if (!imageName) return getFallbackImageUrl('undefined');
    var normalized = normalizeImageName(imageName);
    return imageUrlMap[normalized] || getFallbackImageUrl(imageName);
  }

  // 错误处理
  function handleInitError($container, error) {
    console.error('游戏初始化失败:', error);
    $container.html('<div class="error">游戏加载失败，请刷新重试</div>');
  }

  // 交互功能
  function addInteraction($container) {
    var isMouseDown = false;
    var activeGroup = null;
    var highlighted = [];
    var finishedGroups = {};

    $container.on('mousedown', '.cell:not(.unavailable)', function(e) {
      if (e.which !== 1) return;
      var $cell = $(this);
      var group = $cell.data('group');
      
      if (!group || finishedGroups[group]) return;

      isMouseDown = true;
      activeGroup = group;
      highlighted = [];

      $cell.addClass('highlight');
      highlighted.push($cell[0]);
    });

    $container.on('mouseenter', '.cell:not(.unavailable)', function(e) {
      if (!isMouseDown) return;
      var $cell = $(this);
      var group = $cell.data('group');

      if (group !== activeGroup || highlighted.indexOf($cell[0]) !== -1) {
        cancelHighlight();
        return;
      }

      $cell.addClass('highlight');
      highlighted.push($cell[0]);
    });

    $(document).on('mouseup', function() {
      if (!isMouseDown) return;
      isMouseDown = false;

      if (!activeGroup) {
        cancelHighlight();
        return;
      }

      var $allGroupCells = $container.find('.cell').filter(function() {
        return $(this).data('group') === activeGroup;
      });

      if (highlighted.length === $allGroupCells.length) {
        var group = $allGroupCells.data('group');
        var hue = 360 / Object.keys(currentGroupsData.groups).length * group;
        var light = 60 + (1 - (group % 2) * 2) * 15;
        $allGroupCells.addClass('finish').css({
        backgroundColor: 'hsl(' + hue + ', 100%, ' + light + '%)',
      });
        finishedGroups[activeGroup] = true;
        checkGameCompletion($container);
      }

      cancelHighlight();
    });

    function cancelHighlight() {
      highlighted.forEach(function(cell) {
        $(cell).removeClass('highlight');
      });
      highlighted = [];
      activeGroup = null;
    }
  }

  function checkGameCompletion($container) {
    var allGroups = {};
    var completedGroups = {};

    $container.find('.cell[data-group]').each(function() {
      var group = $(this).data('group');
      allGroups[group] = true;
      if ($(this).hasClass('finish')) {
        completedGroups[group] = true;
      }
    });

    var total = Object.keys(allGroups).length;
    var completed = Object.keys(completedGroups).length;
  }

  // 控制按钮
  function createExtraControls($container, rows, cols) {
    var controlsHtml = [
      '<div class="game-controls">',
      '<button class="cdx-button restart-game">重置游戏</button>',
      '<button class="cdx-button hint-game">提示</button>',
      '<button class="cdx-button solve-game">自动求解</button>',
      '<button class="cdx-button stop-solving" style="display:none;">中止求解</button>',
      '</div>'
    ].join('');

    $container.before(controlsHtml);

    // 事件绑定
    $container.prev('.controls').find('.restart-game').click(function() {
      initGameInstance($container);
    });

    // 其他控制按钮逻辑保持不变...
  }

  // 公共接口
  return {
    init: function() {
      $('.polyline-cover-game').each(function() {
        initGameInstance($(this));
      });
    }
  };
})();

// 初始化游戏
$(document).ready(function() {
  PolyLineCoverGame.init();
});