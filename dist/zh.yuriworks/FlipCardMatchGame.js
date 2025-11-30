// 相同角色匹配游戏对象
var FlipCardMatchGame = {
    // 初始化游戏实例
    init: function($container) {
        var self = this;
        
        // 保存容器引用
        self.$container = $container;
        
        // 获取数据容器并隐藏
        var $dataContainer = $container.find('.flip-card-match-data');
        if ($dataContainer.length === 0) {
            console.error('找不到数据容器');
            return;
        }
        $dataContainer.hide();

        // 获取游戏ID和列数
        var gameId = $dataContainer.attr('id') || 'match-game-' + Math.random().toString(36).substr(2, 9);
        var cols = parseInt($dataContainer.attr('data-cols')) || 4;
        var itemHeight = $dataContainer.attr('data-height') || '100px'; // 新增高度
		var itemWidth = $dataContainer.attr('data-width') || '100px';   // 新增宽度

        // 创建开始游戏按钮
        $container.append(
            '<div class="match-game-start" id="' + gameId + '-start">' +
            '<div class="match-game-intro">这里有一个记忆力配对游戏</div>' +
            '<button class="match-start-btn cdx-button has-ripple">点此立即游玩</button>' +
            '</div>'
        );

        var $startContainer = $container.find('.match-game-start');
        var $startBtn = $container.find('.match-start-btn');

        // 游戏状态对象
        var gameState = {
            items: [],
            nowFocusing: null,
            matchedPairs: 0,
            totalPairs: 0,
            isAnimating: false,
            isGameStarted: false,
            isPreviewMode: true,
            moveHistory: [],
            currentPage: mw.config.get('wgPageName'),
            initialData: [],
            originalOrder: [],
            $container: $container,
            $gameContainer: null,
            gameId: gameId,
            cols: cols,
    		itemHeight: itemHeight,
    		itemWidth: itemWidth,
            countdownTimer: null,
            startTime: null,
            gameTimer: null,
            elapsedTime: 0
        };

        // 开始游戏按钮点击事件
        $startBtn.on('click', function() {
            startGamePreview();
        });

        // 开始游戏预览
        function startGamePreview() {
            $startBtn.prop('disabled', true).text('准备中...');
            gameState.isPreviewMode = true;
            
            // 立即隐藏开始容器
            $startContainer.hide();
            
            // 创建游戏容器（设置列数）
            $container.append('<div class="flip-card-match" id="' + gameId + '-game" style="grid-template-columns: repeat(' + cols + ', 0fr);"></div>');
            gameState.$gameContainer = $container.find('.flip-card-match');
			gameState.$gameContainer.css('--item-height', itemHeight);
			gameState.$gameContainer.css('--item-width', itemWidth);
            
            // 创建控制按钮（先隐藏）
            $container.append(
                '<div class="match-game-controls" style="display:none;">' +
                '<button class="match-tips-btn cdx-button has-ripple">提示</button>' +
                '<button class="match-solve-btn cdx-button has-ripple">自动求解</button>' +
                '<button class="match-reset-btn cdx-button has-ripple">重置游戏</button>' +
                '</div>'
            );

            // 初始化游戏数据
            initGameData();
            
            // 显示所有正面内容
            showAllFrontContent();
            
            // 开始倒计时
            startCountdown();
        }

        // 初始化游戏数据
        function initGameData() {
            var frontData = [];
            var backData = [];
            
            // 收集所有背面数据（使用html()获取HTML内容）
            var backContents = [];
            $dataContainer.children('[data-b="1"]').each(function() {
                backContents.push($(this).html()); // 使用html()而不是text()
            });
            
            // 收集正面数据（使用html()获取HTML内容）
            $dataContainer.children(':not([data-b="1"])').each(function() {
                frontData.push($(this).html()); // 使用html()而不是text()
            });

            if (frontData.length === 0) {
                console.error('没有找到正面数据');
                return;
            }

            gameState.totalPairs = frontData.length;
            gameState.initialData = frontData.slice();
            
            // 创建配对数据 (每个正面数据出现两次)
            var pairedData = [];
            for (var i = 0; i < frontData.length; i++) {
                // 为每个正面数据分配一个背面内容（循环使用）
                var backContent = backContents[i % backContents.length] || '?';
                pairedData.push({
                    id: i,
                    content: frontData[i],
                    backContent: backContent
                });
                pairedData.push({
                    id: i,
                    content: frontData[i],
                    backContent: backContent
                });
            }

            // 保存原始顺序
            gameState.originalOrder = pairedData.slice();
            
            // 打乱顺序
            shuffleArray(pairedData);

            // 创建游戏元素（初始显示正面）
            pairedData.forEach(function(data, index) {
                var $item = $(
                    '<div class="item preview-mode" data-id="' + data.id + '" data-index="' + index + '">' +
                    '<div class="item-front">' + data.backContent + '</div>' +
                    '<div class="item-back">' + data.content + '</div>' +
                    '</div>'
                );

                gameState.$gameContainer.append($item);
                gameState.items.push({
                    element: $item,
                    id: data.id,
                    content: data.content,
                    backContent: data.backContent,
                    isMatched: false,
                    index: index
                });
            });
        }

        // 显示所有正面内容
        function showAllFrontContent() {
            gameState.items.forEach(function(item) {
                item.element.addClass('focusing');
            });
        }

        // 开始倒计时
        function startCountdown() {
            var countdown = 5;
            var $countdownText = $('<div class="match-countdown">' + countdown + '秒之后开始配对</div>');
            gameState.$gameContainer.after($countdownText);
            
            gameState.countdownTimer = setInterval(function() {
                countdown--;
                $countdownText.text(countdown + '秒之后开始配对');
                
                if (countdown <= 0) {
                    clearInterval(gameState.countdownTimer);
                    $countdownText.remove();
                    startRealGame();
                }
            }, 1000);
        }

        // 开始真正的游戏
        function startRealGame() {
            gameState.isPreviewMode = false;
            gameState.isGameStarted = true;
            
            // 开始计时
            gameState.startTime = new Date();
            gameState.gameTimer = setInterval(function() {
                gameState.elapsedTime = Math.floor((new Date() - gameState.startTime) / 1000);
            }, 1000);
            
            // 显示控制按钮
            $container.find('.match-game-controls').show();
            
            // 移除预览模式类，翻转到背面
            gameState.items.forEach(function(item) {
                item.element.removeClass('preview-mode focusing');
                // 绑定点击事件
                item.element.off('click').on('click', function() {
                    if (gameState.isAnimating || gameState.isPreviewMode || !gameState.isGameStarted) return;
                    handleItemClick($(this));
                });
            });
            
            // 初始化控制按钮事件
            initControlButtons();
        }

        // 初始化控制按钮
        function initControlButtons() {
            var $tipsBtn = $container.find('.match-tips-btn');
            var $solveBtn = $container.find('.match-solve-btn');
            var $resetBtn = $container.find('.match-reset-btn');

            // 提示功能
            $tipsBtn.on('click', function() {
                if (gameState.isAnimating || !gameState.isGameStarted) return;
                
                var unmatchedItems = gameState.items.filter(function(item) {
                    return !item.isMatched && !item.element.hasClass('focusing');
                });
                
                if (unmatchedItems.length < 2) return;
                
                // 找到一对未匹配的项目
                var pairs = {};
                var foundPair = null;
                
                for (var i = 0; i < unmatchedItems.length; i++) {
                    var item = unmatchedItems[i];
                    if (!pairs[item.id]) {
                        pairs[item.id] = [item];
                    } else {
                        pairs[item.id].push(item);
                        if (pairs[item.id].length >= 2) {
                            foundPair = pairs[item.id].slice(0, 2);
                            break;
                        }
                    }
                }
                
                if (foundPair) {
                    // 闪烁提示
                    var blinkCount = 0;
                    var maxBlinks = 3;
                    
                    function blink() {
                        if (blinkCount >= maxBlinks * 2) {
                            foundPair[0].element.removeClass('tips');
                            foundPair[1].element.removeClass('tips');
                            return;
                        }
                        
                        if (blinkCount % 2 === 0) {
                            foundPair[0].element.addClass('tips');
                            foundPair[1].element.addClass('tips');
                        } else {
                            foundPair[0].element.removeClass('tips');
                            foundPair[1].element.removeClass('tips');
                        }
                        
                        blinkCount++;
                        setTimeout(blink, 300);
                    }
                    
                    blink();
                    
                    // 记录提示使用
                    gameState.moveHistory.push({
                        action: 'hint_used',
                        pair: [foundPair[0].index, foundPair[1].index],
                        itemId: foundPair[0].id,
                        timestamp: new Date().toISOString()
                    });
                }
            });

            // 自动求解功能
            $solveBtn.on('click', function() {
                if (gameState.isAnimating || !gameState.isGameStarted) return;
                
                $solveBtn.prop('disabled', true);
                $tipsBtn.prop('disabled', true);
                
                var unmatchedItems = gameState.items.filter(function(item) {
                    return !item.isMatched;
                });
                
                var pairs = {};
                unmatchedItems.forEach(function(item) {
                    if (!pairs[item.id]) {
                        pairs[item.id] = [];
                    }
                    pairs[item.id].push(item);
                });
                
                var pairGroups = [];
                for (var id in pairs) {
                    if (pairs[id].length >= 2) {
                        pairGroups.push(pairs[id].slice(0, 2));
                    }
                }
                
                function solveNextGroup(index) {
                    if (index >= pairGroups.length) {
                        $solveBtn.prop('disabled', false);
                        $tipsBtn.prop('disabled', false);
                        return;
                    }
                    
                    var pair = pairGroups[index];
                    
                    // 设置动画状态
                    gameState.isAnimating = true;
                    
                    // 几乎同时点击两个匹配的元素（间隔很短，模拟用户快速点击）
                    simulateItemClick(pair[0].element);
                    
                    // 第二个元素在很短延迟后点击（模拟用户几乎同时点击）
                    setTimeout(function() {
                        simulateItemClick(pair[1].element, function() {
                            // 两个元素都翻转后，标记为匹配
                            pair[0].isMatched = true;
                            pair[1].isMatched = true;
                            pair[0].element.addClass('matched');
                            pair[1].element.addClass('matched');
                            
                            gameState.matchedPairs++;
                            
                            // 记录匹配成功
                            gameState.moveHistory.push({
                                action: 'auto_match_success',
                                pair: [pair[0].index, pair[1].index],
                                itemId: pair[0].id,
                                timestamp: new Date().toISOString()
                            });
                            
                            // 重置动画状态
                            gameState.isAnimating = false;
                            
                            // 检查游戏是否完成
                            if (gameState.matchedPairs === gameState.totalPairs) {
                                clearInterval(gameState.gameTimer);
                                setTimeout(showWinPopup, 500);
                            }
                            
                            // 下一组（间隔1秒）
                            setTimeout(function() {
                                solveNextGroup(index + 1);
                            }, 1000);
                        });
                    }, 0); // 第二个元素在100ms后点击，模拟几乎同时点击
                }
                
                // 模拟项目点击的函数
                function simulateItemClick($item, callback) {
                    var itemId = $item.attr('data-id');
                    var itemIndex = parseInt($item.attr('data-index'));
                    var gameItem = gameState.items[itemIndex];
                    
                    // 记录移动历史
                    gameState.moveHistory.push({
                        action: 'auto_click',
                        itemIndex: itemIndex,
                        itemId: itemId,
                        timestamp: new Date().toISOString()
                    });
            
                    // 立即添加focusing类开始翻转动画（与用户点击完全一致）
                    $item.addClass('focusing');
            
                    // 等待翻转动画完成
                    setTimeout(function() {
                        if (callback) callback();
                    }, 300);
                }
                
                solveNextGroup(0);
                
                // 记录自动求解
                gameState.moveHistory.push({
                    action: 'auto_solve_started',
                    timestamp: new Date().toISOString()
                });
            });
            $resetBtn.on('click', function() {
                resetGame();
            });
        }

        // 处理项目点击
        function handleItemClick($item) {
            if (gameState.isAnimating || !gameState.isGameStarted) return;
            
            var itemId = $item.attr('data-id');
            var itemIndex = parseInt($item.attr('data-index'));
            var gameItem = gameState.items[itemIndex];
            
            // 如果已经匹配或者是当前焦点项目，则忽略
            if (gameItem.isMatched || $item.hasClass('focusing')) return;

            // 记录移动历史
            gameState.moveHistory.push({
                action: 'click',
                itemIndex: itemIndex,
                itemId: itemId,
                timestamp: new Date().toISOString()
            });

            // 翻开当前项目
            $item.addClass('focusing');
            gameState.isAnimating = true;

            setTimeout(function() {
                gameState.isAnimating = false;
                
                if (gameState.nowFocusing === null) {
                    // 第一次点击
                    gameState.nowFocusing = {
                        element: $item,
                        id: itemId,
                        index: itemIndex
                    };
                } else {
                    // 第二次点击，检查是否匹配
                    var firstItem = gameState.nowFocusing;
                    
                    if (firstItem.id === itemId && firstItem.index !== itemIndex) {
                        // 匹配成功
                        gameItem.isMatched = true;
                        gameState.items[firstItem.index].isMatched = true;
                        
                        $item.addClass('matched');
                        firstItem.element.addClass('matched');
                        
                        gameState.matchedPairs++;
                        
                        // 记录匹配成功
                        gameState.moveHistory.push({
                            action: 'match_success',
                            pair: [firstItem.index, itemIndex],
                            itemId: itemId,
                            timestamp: new Date().toISOString()
                        });
                        
                        // 检查游戏是否完成
                        if (gameState.matchedPairs === gameState.totalPairs) {
                            clearInterval(gameState.gameTimer);
                            setTimeout(showWinPopup, 500);
                        }
                    } else {
                        // 匹配失败 - 立即翻回两张牌
                        gameState.moveHistory.push({
                            action: 'match_fail',
                            pair: [firstItem.index, itemIndex],
                            items: [firstItem.id, itemId],
                            timestamp: new Date().toISOString()
                        });
                        
                        // 立即移除focusing类，不需要延迟
                        $item.removeClass('focusing');
                        firstItem.element.removeClass('focusing');
                    }
                    
                    gameState.nowFocusing = null;
                }
            }, 300);
        }

        // 重置游戏
        function resetGame() {
            // 清除计时器
            if (gameState.countdownTimer) {
                clearInterval(gameState.countdownTimer);
            }
            if (gameState.gameTimer) {
                clearInterval(gameState.gameTimer);
            }
            
            // 重置状态
            gameState.items = [];
            gameState.nowFocusing = null;
            gameState.matchedPairs = 0;
            gameState.isAnimating = false;
            gameState.isGameStarted = false;
            gameState.isPreviewMode = false;
            gameState.elapsedTime = 0;
            gameState.startTime = null;
            
            // 记录重置
            gameState.moveHistory.push({
                action: 'game_reset',
                timestamp: new Date().toISOString()
            });
            
            // 清除游戏容器和控制按钮
            if (gameState.$gameContainer) {
                gameState.$gameContainer.remove();
            }
            $container.find('.match-game-controls').remove();
            $container.find('.match-countdown').remove();
            
            // 重新显示开始容器
            $startContainer.show();
            $startBtn.prop('disabled', false).text('点此立即游玩');
        }

        // 显示胜利弹窗
        function showWinPopup() {
            var totalMoves = gameState.moveHistory.filter(function(move) {
                return move.action === 'click';
            }).length;
            
            // 创建弹窗结构（模仿华容道）
            var $popup = $('<div class="win-popup"></div>');
            var $message = $('<div class="win-message"></div>').text("游戏完成！匹配对数: " + gameState.totalPairs + "，步数: " + totalMoves + "，用时: " + gameState.elapsedTime + "秒");
            var $restart = $('<button class="restart-btn">再玩一次</button>');
            var $saveGame = $('<button class="save-game-btn blue-gradient-btn">保存记录</button>');
            var $showOriginal = $('<button class="show-original-btn">返回游戏</button>');

            $popup.append($message).append($restart).append($saveGame).append($showOriginal);
            $container.append($popup);

            $restart.on("click", function () {
                resetGame();
                $popup.remove();
            });

            $saveGame.on("click", function () {
                saveGameData();
                $popup.remove();
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

            var totalMoves = gameState.moveHistory.filter(function(move) {
                return move.action === 'click';
            }).length;

            var saveData = {
                timestamp: new Date().toISOString(),
                page: gameState.currentPage,
                totalPairs: gameState.totalPairs,
                moves: totalMoves,
                time: gameState.elapsedTime,
                initialData: gameState.initialData,
                originalOrder: gameState.originalOrder,
                moveHistory: gameState.moveHistory,
                gameType: 'match',
                cols: gameState.cols,
    			itemHeight: gameState.itemHeight,
    			itemWidth: gameState.itemWidth
            };

            var pageTitle = 'User:' + username + '/FlipCardMatchGame/Data';
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
                        totalPairs: record.totalPairs,
                        moves: record.moves,
                        time: record.time,
                        initialData: record.initialData,
                        gameType: record.gameType,
                        cols: record.cols,
    					itemHeight: gameState.itemHeight,
    					itemWidth: gameState.itemWidth
                    };
                    
                    var saveDataWithoutTimestamp = {
                        page: saveData.page,
                        totalPairs: saveData.totalPairs,
                        moves: saveData.moves,
                        time: saveData.time,
                        initialData: saveData.initialData,
                        gameType: saveData.gameType,
                        cols: saveData.cols,
    					itemHeight: gameState.itemHeight,
    					itemWidth: gameState.itemWidth
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
                    summary: '在页面[[' + saveData.page + ']]上以' + saveData.moves + '步、' + saveData.time + '秒的成绩完成了' + saveData.totalPairs + '对匹配游戏。',
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
                    summary: '在页面[[' + saveData.page + ']]上以' + saveData.moves + '步、' + saveData.time + '秒的成绩完成了' + saveData.totalPairs + '对匹配游戏。',
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
            var userPageTitle = 'User:' + username + '/FlipCardMatchGame';
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
                        text: '<div class="match-game-container"></div>',
                        summary: '创建匹配游戏展示页',
                        format: 'json',
                        createonly: true
                    }).fail(function(error) {
                        console.error('创建用户页面失败:', error);
                    });
                }
            });
        }

        // 工具函数
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        // 返回游戏状态对象以便外部访问
        return gameState;
    }
};

// 页面加载完成后初始化游戏
$(document).ready(function() {
    $(".flip-card-match-game-container").each(function() {
        FlipCardMatchGame.init($(this));
    });
});