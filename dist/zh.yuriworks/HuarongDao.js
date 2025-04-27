// 全局华容道游戏对象
var HuarongGame = {
    // 初始化游戏实例
    init: function($container) {
        // 获取配置
        var rows = parseInt($container.attr("data-row")) || 3;
        var cols = parseInt($container.attr("data-col")) || 3;
        var gameId = $container.attr("data-id") || "huarong-" + Math.random().toString(36).substr(2, 9);
        var $imgElement = $container.find(".huarong-img img");

        // 创建游戏元素
        $container.append(
            '<div class="huarong-controls">' +
            '<div class="huarong-moves" id="' + gameId + '-moves">步数: 0</div>' +
            '<button class="huarong-solve-btn cdx-button has-ripple">自动求解</button>' +
            '<button class="huarong-reset-btn cdx-button has-ripple">重置游戏</button>' +
            '</div>' +
            '<div class="huarong-game" id="' + gameId + '-game"></div>'
        );

        var $gameContainer = $container.find(".huarong-game");
        var $movesDisplay = $container.find(".huarong-moves");
        var $solveBtn = $container.find(".huarong-solve-btn");
        var $resetBtn = $container.find(".huarong-reset-btn");

        // 游戏状态对象
        var gameState = {
            blocks: [],
            emptyPos: { x: cols - 1, y: rows - 1 },
            moves: 0,
            isPlaying: true,
            originalImage: null,
            canvas: document.createElement("canvas"),
            ctx: null,
            blockWidth: 0,
            blockHeight: 0,
            isAnimating: false,
            rows: rows,
            cols: cols,
            moveHistory: [],
            autoSolved: false,
            currentPage: mw.config.get('wgPageName'),
            imageSize: { width: $imgElement.width(), height: $imgElement.height() },
            initialShuffledState: null
        };

        gameState.ctx = gameState.canvas.getContext("2d");

        // 初始化游戏
        function initGame() {
            $gameContainer.empty();
            gameState.moves = 0;
            gameState.moveHistory = [];
            gameState.autoSolved = false;
            updateMovesDisplay();
            gameState.isPlaying = true;
            gameState.isAnimating = false;

            if (!gameState.originalImage) {
                console.error("图片未加载");
                return;
            }

            $gameContainer.css({
                width: gameState.originalImage.width + "px",
                height: gameState.originalImage.height + "px"
            });

            gameState.blockWidth = Math.floor(gameState.originalImage.width / cols);
            gameState.blockHeight = Math.floor(gameState.originalImage.height / rows);

            var numbers = Array.from({ length: rows * cols - 1 }, function (_, i) { return i; });
            var solvedState = createBlocksFromNumbers(numbers, true);
            gameState.blocks = solvedState.blocks;
            gameState.emptyPos = solvedState.emptyPos;

            // 打乱拼图前先保存原始正确状态
            var originalState = getCurrentState();
            
            // 打乱拼图
            var shuffleSteps = 20 + Math.floor(Math.random() * 21);
            shufflePuzzle(shuffleSteps);
            
            // 保存打乱后的初始状态
            gameState.initialShuffledState = getCurrentState();

            $solveBtn.show().prop("disabled", false).off("click").on("click", startAutoSolve);
        }

        // 获取当前棋盘状态
        function getCurrentState() {
            var totalBlocks = gameState.rows * gameState.cols;
            var state = new Array(totalBlocks).fill(0);
            
            gameState.blocks.forEach(function(block) {
                var pos = block.y * gameState.cols + block.x;
                state[pos] = block.number + 1;
            });
            
            var emptyPos = gameState.emptyPos.y * gameState.cols + gameState.emptyPos.x;
            state[emptyPos] = 0;
            
            return state;
        }

        // 创建拼图块
        function createBlocksFromNumbers(numbers, isSolved) {
            var blocks = [];
            var index = 0;
            var emptyPos = { x: cols - 1, y: rows - 1 };

            for (var y = 0; y < rows; y++) {
                for (var x = 0; x < cols; x++) {
                    if (x === emptyPos.x && y === emptyPos.y) continue;
                    var number = numbers[index++];
                    var originalX = number % cols;
                    var originalY = Math.floor(number / cols);

                    var croppedImageUrl = cropImage(
                        gameState.originalImage,
                        originalX * gameState.blockWidth,
                        originalY * gameState.blockHeight,
                        gameState.blockWidth,
                        gameState.blockHeight
                    );

                    var $block = $(
                        '<div class="huarong-block" data-x="' + x + '" data-y="' + y + 
                        '" data-original-x="' + originalX + '" data-original-y="' + originalY + 
                        '" data-number="' + number + '" style="width:' + (gameState.blockWidth - 2) + 
                        'px; height:' + (gameState.blockHeight - 2) + 'px; left:' + 
                        x * gameState.blockWidth + 'px; top:' + y * gameState.blockHeight + 'px;">' +
                        '<img src="' + croppedImageUrl + '">' +
                        '</div>'
                    );

                    $block.on("click", function () {
                        if (!gameState.isPlaying || gameState.isAnimating) return;
                        var $this = $(this);
                        tryMoveBlock(parseInt($this.attr("data-x")), parseInt($this.attr("data-y")));
                    });

                    $gameContainer.append($block);
                    blocks.push({
                        element: $block,
                        x: x,
                        y: y,
                        originalX: originalX,
                        originalY: originalY,
                        number: number
                    });
                }
            }

            var $emptySpace = $(
                '<div class="huarong-empty" style="width:' + (gameState.blockWidth - 2) + 
                'px; height:' + (gameState.blockHeight - 2) + 'px; left:' + 
                emptyPos.x * gameState.blockWidth + 'px; top:' + emptyPos.y * gameState.blockHeight + 'px;">' +
                '</div>'
            );
            $gameContainer.append($emptySpace);

            return { blocks: blocks, emptyPos: emptyPos };
        }

        // 打乱拼图
        function shufflePuzzle(steps) {
            var lastDirection = null;
            for (var i = 0; i < steps; i++) {
                var directions = [];
                var x = gameState.emptyPos.x;
                var y = gameState.emptyPos.y;

                if (x > 0 && lastDirection !== "right") directions.push(["left", x - 1, y]);
                if (x < cols - 1 && lastDirection !== "left") directions.push(["right", x + 1, y]);
                if (y > 0 && lastDirection !== "down") directions.push(["up", x, y - 1]);
                if (y < rows - 1 && lastDirection !== "up") directions.push(["down", x, y + 1]);

                if (directions.length === 0) continue;

                var direction = directions[Math.floor(Math.random() * directions.length)];
                lastDirection = direction[0];

                var blockIndex = gameState.blocks.findIndex(function (b) {
                    return b.x === direction[1] && b.y === direction[2];
                });
                if (blockIndex === -1) continue;

                var block = gameState.blocks[blockIndex];
                gameState.moveHistory.push({
                    number: block.number,
                    fromX: block.x,
                    fromY: block.y,
                    toX: gameState.emptyPos.x,
                    toY: gameState.emptyPos.y
                });

                block.element.attr({ "data-x": gameState.emptyPos.x, "data-y": gameState.emptyPos.y })
                    .css({
                        left: gameState.emptyPos.x * gameState.blockWidth + "px",
                        top: gameState.emptyPos.y * gameState.blockHeight + "px"
                    });

                var oldX = block.x, oldY = block.y;
                block.x = gameState.emptyPos.x;
                block.y = gameState.emptyPos.y;
                gameState.emptyPos.x = direction[1];
                gameState.emptyPos.y = direction[2];

                $gameContainer.find(".huarong-empty").css({
                    left: gameState.emptyPos.x * gameState.blockWidth + "px",
                    top: gameState.emptyPos.y * gameState.blockHeight + "px"
                });
            }
        }

        // 剪切图片
        function cropImage(img, x, y, width, height) {
            gameState.canvas.width = width;
            gameState.canvas.height = height;
            gameState.ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
            return gameState.canvas.toDataURL();
        }

        // 尝试移动方块
        function tryMoveBlock(x, y, isAuto) {
            if (!isAuto && (!gameState.isPlaying || gameState.isAnimating)) return;

            if ((Math.abs(x - gameState.emptyPos.x) === 1 && y === gameState.emptyPos.y) ||
                (Math.abs(y - gameState.emptyPos.y) === 1 && x === gameState.emptyPos.x)) {
                var blockIndex = gameState.blocks.findIndex(function (b) {
                    return b.x === x && b.y === y;
                });
                if (blockIndex === -1) return;

                gameState.isAnimating = true;
                var block = gameState.blocks[blockIndex];
                var $block = block.element;
                var oldX = block.x, oldY = block.y;
                var emptyX = gameState.emptyPos.x, emptyY = gameState.emptyPos.y;

                gameState.moveHistory.push({
                    number: block.number,
                    fromX: oldX,
                    fromY: oldY,
                    toX: emptyX,
                    toY: emptyY
                });

                $block.attr({ "data-x": emptyX, "data-y": emptyY })
                    .css({
                        left: emptyX * gameState.blockWidth + "px",
                        top: emptyY * gameState.blockHeight + "px"
                    });

                block.x = emptyX;
                block.y = emptyY;
                gameState.emptyPos.x = oldX;
                gameState.emptyPos.y = oldY;

                $gameContainer.find(".huarong-empty").css({
                    left: gameState.emptyPos.x * gameState.blockWidth + "px",
                    top: gameState.emptyPos.y * gameState.blockHeight + "px"
                });

                gameState.moves++;
                updateMovesDisplay();
                if (!isAuto) {
                    checkWin();
                }

                setTimeout(function () {
                    gameState.isAnimating = false;
                }, 300);
            }
        }

        // 检查是否获胜
        function checkWin() {
            var isWin = gameState.blocks.every(function (b) {
                return b.x === b.originalX && b.y === b.originalY;
            });
            if (isWin) {
                gameState.isPlaying = false;
                showWinPopup();
            }
        }

        // 更新步数显示
        function updateMovesDisplay() {
            $movesDisplay.text("步数: " + gameState.moves);
        }

        // 显示游戏结束弹窗
        function showWinPopup() {
            var $popup = $('<div class="win-popup"></div>');
            var $message = $('<div class="win-message"></div>').text("游戏完成！步数: " + gameState.moves);
            var $restart = $('<button class="restart-btn">再玩一次</button>');
            var $saveGame = $('<button class="save-game-btn blue-gradient-btn">保存记录</button>');
            var $showOriginal = $('<button class="show-original-btn">返回游戏</button>');

            if (gameState.autoSolved) {
                $saveGame.prop('disabled', true)
                    .attr('title', '自动求解模式下不可保存')
                    .css('cursor', 'not-allowed');
            }

            $popup.append($message).append($restart).append($saveGame).append($showOriginal);
            $container.append($popup);

            $restart.on("click", function () {
                resetGame();
                $popup.remove();
            });

            $saveGame.on("click", function () {
                saveGameData();
            });

            $showOriginal.on("click", function () {
                $popup.remove();
            });
        }

        // 保存游戏数据
        function saveGameData() {
            var username = mw.config.get('wgUserName');
            if (!username) {
                mw.notify('请先登录以保存游戏记录', {type: 'warn'});
                return;
            }

            var saveData = {
                timestamp: new Date().toISOString(),
                page: gameState.currentPage,
                imageName: $imgElement.attr('data-image-name') || '',
                imageSize: gameState.imageSize,
                rows: gameState.rows,
                cols: gameState.cols,
                moves: gameState.moves,
                initialShuffledState: getInitialShuffledState(),
                solution: getSolutionSteps()
            };

            var pageTitle = 'User:' + username + '/HuarongDao/Data';
            var api = new mw.Api();

            api.get({
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                titles: pageTitle,
                format: 'json'
            }).done(function(data) {
                var pages = data.query.pages;
                var pageId = Object.keys(pages)[0];
                var existingContent = {};
                
                if (pages[pageId].revisions) {
                    try {
                        existingContent = JSON.parse(pages[pageId].revisions[0]['*']);
                    } catch (e) {
                        existingContent = {};
                    }
                }

                var isDuplicate = Object.keys(existingContent).some(function(key) {
                    var record = existingContent[key];
                    var recordWithoutTimestamp = {
                        page: record.page,
                        moves: record.moves,
                        imageName: record.imageName,
                        rows: record.rows,
                        cols: record.cols,
                        imageSize: record.imageSize,
                        initialShuffledState: record.initialShuffledState,
                        solution: record.solution
                    };
                    
                    var saveDataWithoutTimestamp = {
                        page: saveData.page,
                        moves: saveData.moves,
                        imageName: saveData.imageName,
                        rows: saveData.rows,
                        cols: saveData.cols,
                        imageSize: saveData.imageSize,
                        initialShuffledState: saveData.initialShuffledState,
                        solution: saveData.solution
                    };
                    
                    return JSON.stringify(recordWithoutTimestamp) === JSON.stringify(saveDataWithoutTimestamp);
                });

                if (isDuplicate) {
                    mw.notify('已有相同数据，不重复保存', {type: 'warn'});
                    return;
                }

                var recordId = 'record_' + Date.now();
                existingContent[recordId] = saveData;
                
                api.postWithEditToken({
                    action: 'edit',
                    title: pageTitle,
                    text: JSON.stringify(existingContent, null, 2),
                    summary: '在页面[[' + saveData.page + ']]上以' + saveData.moves + '步的成绩完成了图为[[File:' + saveData.imageName + ']]的 ' + saveData.cols * saveData.rows + '格华容道。',
                    format: 'json',
                    contentmodel: 'json'
                }).done(function() {
                    ensureUserPageExists(username);
                    mw.notify('游戏记录已保存！', {type: 'success'});
                }).fail(function(error) {
                    console.error('保存失败:', error);
                    mw.notify('保存失败: ' + error, {type: 'error'});
                });
            }).fail(function(error) {
                console.error('获取现有数据失败:', error);
                var recordId = 'record_' + Date.now();
                api.postWithEditToken({
                    action: 'edit',
                    title: pageTitle,
                    text: JSON.stringify({ [recordId]: saveData }, null, 2),
                    summary: '在页面[[' + saveData.page + ']]上以' + saveData.moves + '步的成绩完成了图为[[File:' + saveData.imageName + ']]的 ' + saveData.cols * saveData.rows + '格华容道。',
                    format: 'json',
                    contentmodel: 'json',
                    createonly: true
                }).done(function() {
                    ensureUserPageExists(username);
                    mw.notify('游戏记录已保存！', {type: 'success'});
                }).fail(function(error) {
                    console.error('创建页面失败:', error);
                    mw.notify('保存失败: ' + error, {type: 'error'});
                });
            });
        }

        // 确保用户主页存在
        function ensureUserPageExists(username) {
            var userPageTitle = 'User:' + username + '/HuarongDao';
            var api = new mw.Api();
            
            api.get({
                action: 'query',
                prop: 'info',
                titles: userPageTitle,
                format: 'json'
            }).done(function(data) {
                var pages = data.query.pages;
                var pageId = Object.keys(pages)[0];
                
                if (pageId === "-1") {
                    api.postWithEditToken({
                        action: 'edit',
                        title: userPageTitle,
                        text: '<div class="huarong-demo-container"></div>',
                        summary: '创建华容道游戏展示页',
                        format: 'json',
                        createonly: true
                    }).fail(function(error) {
                        console.error('创建用户页面失败:', error);
                    });
                }
            });
        }

        // 获取初始打乱状态
        function getInitialShuffledState() {
            return gameState.initialShuffledState;
        }
        
        // 获取解决方案步骤
        function getSolutionSteps() {
            var userMoveCount = gameState.moves;
            var allMoves = gameState.moveHistory;
            var solutionMoves = allMoves.slice(allMoves.length - userMoveCount);
            
            var solution = [];
            solutionMoves.forEach(function(move) {
                solution.push(move.number + 1);
            });
            
            return solution;
        }

        // 自动求解功能
        function startAutoSolve() {
            $solveBtn.prop("disabled", true);
            gameState.autoSolved = true;
            var solution = gameState.moveHistory.slice().reverse();
            animateSolution(solution);
        }

        // 动画演示求解步骤
        function animateSolution(solution) {
            var step = 0;
            
            function nextStep() {
                if (step >= solution.length || !gameState.isPlaying) {
                    gameState.isPlaying = true;
                    checkWin();
                    return;
                }
                var move = solution[step];
                var block = gameState.blocks.find(function (b) {
                    return b.x === move.toX && b.y === move.toY;
                });
                if (block) {
                    tryMoveBlock(block.x, block.y, true);
                    step++;
                    gameState.autoSolveTimer = setTimeout(nextStep, 300);
                }
            }
            
            nextStep();
        }

        // 重置游戏
        function resetGame() {
            if (gameState.autoSolveTimer) {
                clearTimeout(gameState.autoSolveTimer);
                gameState.autoSolveTimer = null;
            }
            gameState.blocks = [];
            gameState.emptyPos = { x: cols - 1, y: rows - 1 };
            gameState.moves = 0;
            gameState.moveHistory = [];
            gameState.autoSolved = false;
            updateMovesDisplay();
            gameState.isPlaying = true;
            gameState.isAnimating = false;
            $gameContainer.empty();
            initGame();
            $solveBtn.prop("disabled", false);
        }

        // 为重置按钮绑定事件
        $resetBtn.on("click", function () {
            resetGame();
        });

        // 预加载图片
        function preloadImage($imgElement, callback) {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = function () {
                gameState.originalImage = img;
                callback();
            };
            img.onerror = function () {
                console.error("图片加载失败");
            };
            img.src = $imgElement.attr("src");
        }

        // 初始加载图片并开始游戏
        preloadImage($imgElement, initGame);
    }
};
window.HuarongGame = HuarongGame;
// 使用接口添加3×3华容道游戏
$(document).ready(function() {
    // 隐藏无JS提示
    $('.huarong-no-js').hide();

    // 初始化所有华容道游戏实例
    $(".huarong").each(function() {
        HuarongGame.init($(this));
    });
});

$(document).ready(function() {
  // 从URL中解析目标用户名
  function getTargetUsername() {
    // 假设URL格式为 /wiki/User:用户名/HuarongDao
    var pageName = mw.config.get('wgPageName');
    var parts = pageName.split('/');
    if (parts.length >= 2 && parts[0].startsWith('User:')) {
      return parts[0].substring(5); // 去掉"User:"前缀
    }
    return null;
  }

  // 检查是否在华容道记录页面
  var targetUsername = getTargetUsername();
  if (targetUsername && mw.config.get('wgPageName') === 'User:' + targetUsername + '/HuarongDao') {
    displayHuarongRecords(targetUsername);
  }

  function displayHuarongRecords(username) {
    // 不再检查是否登录，任何人都可以查看
    var pageTitle = 'User:' + username + '/HuarongDao/Data';
    var api = new mw.Api();

    // 添加友好的加载提示
    $('#mw-content-text').html('<div class="loading">正在加载' + username + '的游戏记录...</div>');

    api.get({
      action: 'query',
      prop: 'revisions',
      rvprop: 'content',
      titles: pageTitle,
      format: 'json'
    }).done(function(data) {
      var pages = data.query.pages;
      var pageId = Object.keys(pages)[0];
      
      if (!pages[pageId].revisions) {
        $('#mw-content-text').html('<div class="no-records">用户 ' + username + ' 暂无华容道游戏记录</div>');
        return;
      }

      try {
        var recordsData = JSON.parse(pages[pageId].revisions[0]['*']);
        renderRecordsPage(recordsData, username);
      } catch (e) {
        console.error('解析记录数据失败:', e);
        $('#mw-content-text').html('<div class="error">解析游戏记录失败: ' + e.message + '</div>');
      }
    }).fail(function(error) {
      console.error('获取记录失败:', error);
      $('#mw-content-text').html('<div class="error">无法获取用户 ' + username + ' 的游戏记录</div>');
    });
  }

  function renderRecordsPage(recordsData) {
    // 清空内容区域
    $('#mw-content-text').empty();

    // 统计数据
    var recordCount = 0;
    var minMoves = Infinity;
    var maxDifficulty = 0;
    var recordsList = [];
    var currentHighlightRecord = null;

    // 处理每条记录
    for (var recordId in recordsData) {
      if (recordsData.hasOwnProperty(recordId)) {
        var record = recordsData[recordId];
        recordCount++;
        
        // 更新最少步数
        if (record.moves < minMoves) {
          minMoves = record.moves;
        }
        
        // 更新最大难度
        var difficulty = record.rows * record.cols;
        if (difficulty > maxDifficulty) {
          maxDifficulty = difficulty;
        }
        
        // 准备记录列表项
        recordsList.push({
          id: recordId,
          timestamp: record.timestamp,
          page: record.page || '未知页面',
          moves: record.moves,
          imageName: record.imageName || '未知图片',
          rows: record.rows,
          cols: record.cols,
          imageSize: record.imageSize || { width: 400, height: 300 },
          initialShuffledState: record.initialShuffledState,
          solution: record.solution
        });
      }
    }

    // 如果没有记录
    if (recordCount === 0) {
      $('#mw-content-text').html('<div class="no-records">暂无华容道游戏记录</div>');
      return;
    }

    // 按时间倒序排序
    recordsList.sort(function(a, b) {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    // 渲染统计面板
    var $panel = $(
      '<div class="huarong-panel">' +
      '<span>这个用户已经完成了<span class="huarong-panel-num">' + recordCount + '</span>次华容道小游戏</span>' +
      '<span>其中</span>' + 
      '<span>游玩的最短的步骤是<span class="huarong-panel-num">' + (minMoves === Infinity ? 0 : minMoves) + '</span>步</span>' +
      '<span>游玩的最困难的格数是<span class="huarong-panel-num">' + maxDifficulty + '</span>格</span>' +
      '</div>'
    );
    $('#mw-content-text').append($panel);

    // 渲染记录列表
    var $list = $('<div class="huarong-list timeline with-time"></div>');

    // 添加演示区域容器（先创建空容器）
    var $demoContainer = $('<div class="huarong-demo-container"></div>');
    $('#mw-content-text').append($list).append($demoContainer);

    // 添加每条记录
    recordsList.forEach(function(record, index) {
      var difficulty = record.rows * record.cols;
      var timestamp = new Date(record.timestamp).toLocaleString();
      var pageDisc = '页面<a href="/zh/wiki/' + encodeURIComponent(record.page) + '">' + record.page + '</a>'
      if (record.page === '未知页面') {
        pageDisc = '未知页面';
      }
      
      var $li = $(
        '<div class="timeline-item" data-record-id="' + record.id + '">' +
        '<div class="timeline-item">' +
        '<div class="chevron-out">' +
        '<div class="chevron-in-left"><div>' +
        timestamp + 
        '</div></div>' +
        '<div class="chevron-in-right"></div></div>' +
        '<div><div class="timeline-text">' +
        '在' + pageDisc + '上以' +
        '<span class="huarong-record-moves">' + record.moves + '</span>步的成绩完成了图为' +
        '<a href="/zh/wiki/File:' + encodeURIComponent(record.imageName) + '">' + record.imageName + '</a>的' +
        '<span class="huarong-record-difficulty">' + difficulty + '</span>格华容道。' +
        '<div></div></div></div></div>'
      );
      
      // 默认高亮第一条记录
      if (index === 0) {
        $li.addClass('highlight');
        currentHighlightRecord = record;
        // 立即加载第一条记录的演示
        loadDemoGame(record, $demoContainer);
      }
      
      $li.on('click', function(e) {
        // 防止点击链接时触发
        if (e.target.tagName === 'A') return;
        
        // 更新高亮状态
        $list.find('.timeline-item').removeClass('highlight');
        $li.addClass('highlight');
        
        // 更新演示区域
        currentHighlightRecord = record;
        loadDemoGame(record, $demoContainer);
      });
      
      $list.append($li);
    });
  }

  function loadDemoGame(record, $container) {
    $container.empty().html('<div class="loading">加载游戏中...</div>');
    
    // 获取图片URL
    var api = new mw.Api();
    api.get({
      action: 'query',
      titles: 'File:' + record.imageName,
      prop: 'imageinfo',
      iiprop: 'url',
      iiurlwidth: record.imageSize.width,
      iiurlheight: record.imageSize.height,
      format: 'json'
    }).done(function(data) {
      var pages = data.query.pages;
      var pageId = Object.keys(pages)[0];
      
      if (pages[pageId].imageinfo) {
        var imageUrl = pages[pageId].imageinfo[0].thumburl;
        renderDemoGame(record, imageUrl, $container);
      } else {
        $container.html('<div class="error">无法获取图片URL</div>');
      }
    }).fail(function(error) {
      console.error('获取图片URL失败:', error);
      $container.html('<div class="error">加载游戏图片失败</div>');
    });
  }

  function renderDemoGame(record, imageUrl, $container) {
    $container.empty();
    
    var $demo = $(
      '<div class="huarong huarong-demo" data-row="' + record.rows + '" data-col="' + record.cols + '">' +
      '<div class="huarong-img">' +
      '<img src="' + imageUrl + '" alt="' + record.imageName + '">' +
      '</div>' +
      '<div class="huarong-controls">' +
      '<button class="huarong-demo-btn cdx-button has-ripple">开始演示</button>' +
      '</div>' +
      '</div>'
    );
    $container.append($demo);
    
    // 初始化演示游戏
    initHuarongDemo($demo, record);
  }

  function initHuarongDemo($container, recordData) {
    var rows = parseInt($container.attr("data-row")) || 3;
    var cols = parseInt($container.attr("data-col")) || 3;
    var gameId = "huarong-demo-" + Math.random().toString(36).substr(2, 9);
    var $imgElement = $container.find(".huarong-img img");

    // 创建游戏容器
    $container.append('<div class="huarong-game" id="' + gameId + '-game"></div>');
    var $gameContainer = $container.find(".huarong-game");
    var $demoBtn = $container.find(".huarong-demo-btn");

    // 游戏状态对象
    var gameState = {
      blocks: [],
      emptyPos: { x: cols - 1, y: rows - 1 },
      isPlaying: false,
      originalImage: null,
      canvas: document.createElement("canvas"),
      ctx: null,
      blockWidth: 0,
      blockHeight: 0,
      isAnimating: false,
      rows: rows,
      cols: cols,
      solution: recordData.solution || [],
      solutionIndex: 0,
      autoSolveTimer: null,
      initialShuffledState: recordData.initialShuffledState || null
    };

    gameState.ctx = gameState.canvas.getContext("2d");

    // 预加载图片并初始化游戏
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      gameState.originalImage = img;
      initGame();
    };
    img.onerror = function() {
      $gameContainer.html('<div class="error">游戏图片加载失败</div>');
    };
    img.src = $imgElement.attr("src");

    function initGame() {
      $gameContainer.empty();
      gameState.isPlaying = false;
      gameState.isAnimating = false;
      gameState.solutionIndex = 0;

      if (!gameState.originalImage) {
        $gameContainer.html('<div class="error">游戏初始化失败</div>');
        return;
      }

      $gameContainer.css({
        width: gameState.originalImage.width + "px",
        height: gameState.originalImage.height + "px"
      });

      gameState.blockWidth = Math.floor(gameState.originalImage.width / cols);
      gameState.blockHeight = Math.floor(gameState.originalImage.height / rows);

      // 根据初始打乱状态创建拼图块
      createBlocksFromState(gameState.initialShuffledState);

      // 更新按钮状态
      $demoBtn.text("开始演示").prop("disabled", false);
    }

    function createBlocksFromState(state) {
      if (!state || state.length !== rows * cols) {
        $gameContainer.html('<div class="error">无效的游戏状态</div>');
        return;
      }

      var blocks = [];
      var emptyPos = { x: -1, y: -1 };

      // 首先找到空位
      for (var i = 0; i < state.length; i++) {
        if (state[i] === 0) {
          emptyPos.x = i % cols;
          emptyPos.y = Math.floor(i / cols);
          break;
        }
      }

      if (emptyPos.x === -1) {
        $gameContainer.html('<div class="error">游戏配置错误</div>');
        return;
      }

      gameState.emptyPos = emptyPos;

      // 创建方块
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          var pos = y * cols + x;
          var number = state[pos] - 1; // 转换为0-based

          if (number === -1) continue; // 空位

          var originalX = number % cols;
          var originalY = Math.floor(number / cols);

          var croppedImageUrl = cropImage(
            gameState.originalImage,
            originalX * gameState.blockWidth,
            originalY * gameState.blockHeight,
            gameState.blockWidth,
            gameState.blockHeight
          );

          var $block = $(
            '<div class="huarong-block" ' +
            'data-x="' + x + '" ' +
            'data-y="' + y + '" ' +
            'data-original-x="' + originalX + '" ' +
            'data-original-y="' + originalY + '" ' +
            'data-number="' + number + '" ' +
            'style="width:' + (gameState.blockWidth - 2) + 'px; ' +
            'height:' + (gameState.blockHeight - 2) + 'px; ' +
            'left:' + (x * gameState.blockWidth) + 'px; ' +
            'top:' + (y * gameState.blockHeight) + 'px;">' +
            '<img src="' + croppedImageUrl + '">' +
            '</div>'
          );

          // 演示模式下点击方块无效果
          $block.on("click", function(e) {
            e.preventDefault();
            return false;
          });

          $gameContainer.append($block);
          blocks.push({
            element: $block,
            x: x,
            y: y,
            originalX: originalX,
            originalY: originalY,
            number: number
          });
        }
      }

      // 添加空位
      var $emptySpace = $(
        '<div class="huarong-empty" ' +
        'style="width:' + (gameState.blockWidth - 2) + 'px; ' +
        'height:' + (gameState.blockHeight - 2) + 'px; ' +
        'left:' + (emptyPos.x * gameState.blockWidth) + 'px; ' +
        'top:' + (emptyPos.y * gameState.blockHeight) + 'px;">' +
        '</div>'
      );
      $gameContainer.append($emptySpace);

      gameState.blocks = blocks;
    }

    function cropImage(img, x, y, width, height) {
      gameState.canvas.width = width;
      gameState.canvas.height = height;
      gameState.ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
      return gameState.canvas.toDataURL();
    }

    function startDemo() {
      if (gameState.isAnimating || gameState.solution.length === 0) return;

      $demoBtn.prop("disabled", true);
      gameState.isPlaying = true;
      animateNextStep();
    }

    function animateNextStep() {
      if (gameState.solutionIndex >= gameState.solution.length) {
        gameState.isPlaying = false;
        $demoBtn.text("重置状态").prop("disabled", false);
        return;
      }

      var blockNumber = gameState.solution[gameState.solutionIndex] - 1;
      var block = gameState.blocks.find(function(b) {
        return b.number === blockNumber;
      });

      if (!block) {
        gameState.solutionIndex++;
        gameState.autoSolveTimer = setTimeout(animateNextStep, 300);
        return;
      }

      if (
        (Math.abs(block.x - gameState.emptyPos.x) === 1 && block.y === gameState.emptyPos.y) ||
        (Math.abs(block.y - gameState.emptyPos.y) === 1 && block.x === gameState.emptyPos.x)
      ) {
        gameState.isAnimating = true;
        var $block = block.element;
        var oldX = block.x, oldY = block.y;
        var emptyX = gameState.emptyPos.x, emptyY = gameState.emptyPos.y;

        $block
          .attr({
            "data-x": emptyX,
            "data-y": emptyY
          })
          .css({
            left: emptyX * gameState.blockWidth + "px",
            top: emptyY * gameState.blockHeight + "px"
          });

        block.x = emptyX;
        block.y = emptyY;
        gameState.emptyPos.x = oldX;
        gameState.emptyPos.y = oldY;

        $gameContainer.find(".huarong-empty").css({
          left: gameState.emptyPos.x * gameState.blockWidth + "px",
          top: gameState.emptyPos.y * gameState.blockHeight + "px"
        });

        gameState.solutionIndex++;

        setTimeout(function() {
          gameState.isAnimating = false;
          gameState.autoSolveTimer = setTimeout(animateNextStep, 0);
        }, 300);
      } else {
        gameState.solutionIndex++;
        gameState.autoSolveTimer = setTimeout(animateNextStep, 0);
      }
    }

    function resetGame() {
      if (gameState.autoSolveTimer) {
        clearTimeout(gameState.autoSolveTimer);
        gameState.autoSolveTimer = null;
      }
      initGame();
    }

    $demoBtn.on("click", function() {
      if ($(this).text() === "开始演示") {
        startDemo();
      } else {
        resetGame();
      }
    });
  }
});