// 全局滑块游戏对象
var SliderGame = {
    // 初始化游戏实例
    init: function($container) {
        var sliderGame = $container;
        var sliderHandle = sliderGame.find('.slider-handle');
        var sliderImage = sliderGame.find('.slider-image');

        // 游戏状态变量
        var gameData = {
            masks: [],
            sliderBall: null,
            animationId: null,
            ballX: 0,
            ballY: 0,
            ballSpeedX: 0,
            ballSpeedY: 0,
            lastTime: 0,
            sliderGameRect: null,
            sliderHandleWidth: sliderHandle.width(),
            sliderBallSize: 20,
            maskWidth: 0,
            maskHeight: 0,
            lastValidPosition: 0,
            isGameOver: false,
            showOriginal: false
        };

        // 初始化游戏
        function initGame() {
            // 清除现有元素
            sliderGame.find('.slider-mask').remove();
            sliderGame.find('.slider-ball').remove();
            sliderGame.find('.win-popup').remove();
            
            // 重置游戏状态
            gameData.masks = [];
            gameData.isGameOver = false;
            gameData.showOriginal = false;
            sliderGame.removeClass('slider-game-over');
            
            // 显示所有元素
            sliderHandle.show();
            sliderImage.show();

            // 设置slider-game的宽高
            if (sliderImage.length) {
                sliderGame.css({
                    width: sliderImage.width(),
                    height: sliderImage.height()
                });
            } else {
                sliderGame.css({
                    width: '400px',
                    height: '200px'
                });
            }

            // 更新尺寸信息
            updateGameDimensions();

            // 创建mask元素
            createMasks();
            
            // 创建小球
            createNewBall();
        }

        // 更新游戏尺寸信息
        function updateGameDimensions() {
            gameData.sliderGameRect = sliderGame[0].getBoundingClientRect();
            gameData.maskWidth = gameData.sliderGameRect.width / 10;
            gameData.maskHeight = gameData.sliderGameRect.height / 10;
            gameData.lastValidPosition = gameData.sliderGameRect.width / 2 - gameData.sliderHandleWidth / 2;
            sliderHandle.css('left', gameData.lastValidPosition + 'px');
        }

        // 创建mask元素
        function createMasks() {
            for (var i = 0; i < 100; i++) {
                var mask = $('<div>').addClass('slider-mask');
                
                if (i >= 90) {
                    mask.addClass('disappear');
                }
                
                sliderGame.append(mask);
                gameData.masks.push({
                    element: mask,
                    index: i,
                    isActive: i < 90
                });
            }
        }

        // 计算基于父元素大小的速度
        function calculateSpeed() {
            return {
                x: gameData.sliderGameRect.width / 3,
                y: gameData.sliderGameRect.height / 2
            };
        }

        // 检查是否所有mask都消失了
        function checkAllMasksDisappeared() {
            for (var i = 0; i < 90; i++) {
                if (gameData.masks[i].isActive) return false;
            }
            showWinEffect();
            return true;
        }

        // 显示胜利效果
        function showWinEffect() {
            gameData.isGameOver = true;
            sliderGame.addClass('slider-game-over');
            if (gameData.animationId) {
                cancelAnimationFrame(gameData.animationId);
            }
            if (gameData.sliderBall) {
                gameData.sliderBall.remove();
            }

            // 创建胜利消息
            var winMsg = $('<div>').addClass('win-message').text('游戏结束');
            var restartBtn = $('<button>').addClass('restart-btn').text('再玩一次');
            var showOriginalBtn = $('<button>').addClass('show-original-btn').text('显示原图');
            
            var winPopup = $('<div>').addClass('win-popup')
                .append(winMsg)
                .append(restartBtn)
                .append(showOriginalBtn);
            
            sliderGame.append(winPopup);

            // 重新开始按钮事件
            restartBtn.off('click').on('click', function() {
                initGame();
            });
            
            // 显示原图按钮事件
            showOriginalBtn.off('click').on('click', function() {
                toggleOriginalImage();
            });
        }

        // 切换显示原图
        function toggleOriginalImage() {
            gameData.showOriginal = !gameData.showOriginal;
            
            if (gameData.showOriginal) {
                // 隐藏所有游戏元素，只显示图片
                sliderHandle.hide();
                sliderGame.find('.slider-mask').hide();
                sliderGame.find('.win-popup').hide();
                sliderImage.css('visibility', 'visible');
            } else {
                // 恢复显示所有元素
                sliderHandle.show();
                sliderGame.find('.slider-mask').show();
                sliderGame.find('.win-popup').show();
                sliderImage.css('visibility', 'visible');
            }
        }

        // 创建新小球
        function createNewBall() {
            if (gameData.sliderBall && gameData.sliderBall.parent().length) {
                gameData.sliderBall.remove();
            }
            if (gameData.animationId) {
                cancelAnimationFrame(gameData.animationId);
            }
            
            // 检查游戏是否已经结束
            if (gameData.isGameOver) {
                return;
            }
            
            gameData.sliderBall = $('<div>').addClass('slider-ball')
                .css({
                    width: gameData.sliderBallSize + 'px',
                    height: gameData.sliderBallSize + 'px',
                    borderRadius: '50%',
                    position: 'absolute',
                    zIndex: 5,
                    backgroundColor: 'red'
                });
            
            sliderGame.append(gameData.sliderBall);
            
            gameData.ballX = Math.random() * (gameData.sliderGameRect.width - gameData.sliderBallSize);
            gameData.ballY = Math.random() * (gameData.sliderGameRect.height / 2);
            
            var speeds = calculateSpeed();
            gameData.ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * speeds.x;
            gameData.ballSpeedY = speeds.y;
            
            gameData.lastTime = performance.now();
            animateBall();
        }

        // 手柄鼠标移动事件
        sliderGame.on('mousemove', function(e) {
            if (gameData.isGameOver || gameData.showOriginal) return;
            
            var mouseX = e.clientX - gameData.sliderGameRect.left;
            var handleLeft = mouseX - (gameData.sliderHandleWidth / 2);
            
            if (handleLeft < 0) {
                handleLeft = 0;
            } else if (handleLeft > gameData.sliderGameRect.width - gameData.sliderHandleWidth) {
                handleLeft = gameData.sliderGameRect.width - gameData.sliderHandleWidth;
            }
            
            sliderHandle.css('left', handleLeft + 'px');
            gameData.lastValidPosition = handleLeft;
        });

        // 检测小球与mask的碰撞
        function checkMaskCollision() {
            var col = Math.floor(gameData.ballX / gameData.maskWidth);
            var row = Math.floor(gameData.ballY / gameData.maskHeight);
            var index = row * 10 + col;
            
            var checkIndices = [index];
            if (gameData.ballSpeedX > 0) checkIndices.push(index + 1);
            if (gameData.ballSpeedX < 0) checkIndices.push(index - 1);
            if (gameData.ballSpeedY > 0) checkIndices.push(index + 10);
            if (gameData.ballSpeedY < 0) checkIndices.push(index - 10);
            
            var collided = false;
            
            for (var i = 0; i < checkIndices.length; i++) {
                var checkIndex = checkIndices[i];
                
                if (checkIndex >= 0 && checkIndex < 90 && gameData.masks[checkIndex] && gameData.masks[checkIndex].isActive) {
                    var maskRect = {
                        left: (checkIndex % 10) * gameData.maskWidth,
                        top: Math.floor(checkIndex / 10) * gameData.maskHeight,
                        right: (checkIndex % 10 + 1) * gameData.maskWidth,
                        bottom: (Math.floor(checkIndex / 10) + 1) * gameData.maskHeight
                    };
                    
                    if (gameData.ballX + gameData.sliderBallSize > maskRect.left && 
                        gameData.ballX < maskRect.right &&
                        gameData.ballY + gameData.sliderBallSize > maskRect.top && 
                        gameData.ballY < maskRect.bottom) {
                        
                        gameData.masks[checkIndex].isActive = false;
                        gameData.masks[checkIndex].element.addClass('disappear');
                        collided = true;
                        
                        if (checkAllMasksDisappeared()) {
                            return true;
                        }
                    }
                }
            }
            
            return collided;
        }

        // 小球动画函数
        function animateBall() {
            if (gameData.isGameOver || gameData.showOriginal) return;
            
            var currentTime = performance.now();
            var deltaTime = (currentTime - gameData.lastTime) / 1000;
            gameData.lastTime = currentTime;
            
            gameData.ballX += gameData.ballSpeedX * deltaTime;
            gameData.ballY += gameData.ballSpeedY * deltaTime;
            
            var handleLeft = parseFloat(sliderHandle.css('left')) || 0;
            var handleRight = handleLeft + gameData.sliderHandleWidth;
            var handleTop = gameData.sliderGameRect.height - 10;
            
            // 边界检测
            if (gameData.ballX <= 0) {
                gameData.ballX = 0;
                gameData.ballSpeedX = Math.abs(gameData.ballSpeedX);
            }
            else if (gameData.ballX >= gameData.sliderGameRect.width - gameData.sliderBallSize) {
                gameData.ballX = gameData.sliderGameRect.width - gameData.sliderBallSize;
                gameData.ballSpeedX = -Math.abs(gameData.ballSpeedX);
            }
            
            if (gameData.ballY <= 0) {
                gameData.ballY = 0;
                gameData.ballSpeedY = Math.abs(gameData.ballSpeedY);
            }
            
            if (gameData.ballY >= gameData.sliderGameRect.height - gameData.sliderBallSize) {
                gameData.sliderBall.remove();
                setTimeout(createNewBall, 2000);
                return;
            }
            
            // 手柄碰撞检测
            if (gameData.ballY + gameData.sliderBallSize >= handleTop &&
                gameData.ballX + gameData.sliderBallSize >= handleLeft &&
                gameData.ballX <= handleRight) {
                gameData.ballY = handleTop - gameData.sliderBallSize;
                gameData.ballSpeedY = -Math.abs(gameData.ballSpeedY);
            }
            
            // 检测mask碰撞
            checkMaskCollision();
            
            // 更新小球位置
            gameData.sliderBall.css({
                left: gameData.ballX + 'px',
                top: gameData.ballY + 'px'
            });
            
            gameData.animationId = requestAnimationFrame(animateBall);
        }

        // 窗口大小变化处理
        $(window).on('resize', function() {
            if (gameData.showOriginal) return;
            
            if (sliderImage.length) {
                sliderGame.css({
                    width: sliderImage.width(),
                    height: sliderImage.height()
                });
            }
            updateGameDimensions();
            createNewBall();
        });

        // 开始游戏
        initGame();
    }
};
window.SliderGame = SliderGame;

// 使用接口添加3×3华容道游戏
$(document).ready(function() {
    // 隐藏无JS提示
    $('slider-game-no-js').hide();

    // 初始化所有华容道游戏实例
    $(".slider-game").each(function() {
    	var game = new RotatingPuzzleGame($(this));
        game.init();
    });
});