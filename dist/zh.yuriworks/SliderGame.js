// 全局滑块游戏对象 (ES5兼容)
var SliderGame = {
  init: function ($container) {
    // 确保容器有正确的定位上下文
    $container.css({
      position: "relative",
      overflow: "hidden"
    });

    var sliderGame = $container;
    var sliderHandle = sliderGame.find(".slider-handle");
    var sliderImage = sliderGame.find(".slider-image");

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
      containerWidth: 0,
      containerHeight: 0,
      sliderHandleWidth: sliderHandle.outerWidth(),
      sliderHandleHeight: sliderHandle.outerHeight(),
      sliderBallSize: 20,
      maskWidth: 0,
      maskHeight: 0,
      isGameOver: false,
      showOriginal: false
    };

    // 初始化游戏
    function initGame() {
      // 清除现有元素
      sliderGame.find(".slider-mask").remove();
      sliderGame.find(".slider-ball").remove();
      sliderGame.find(".win-popup").remove();

      // 重置游戏状态
      gameData.masks = [];
      gameData.isGameOver = false;
      gameData.showOriginal = false;
      sliderGame.removeClass("slider-game-over");

      // 显示所有元素
      sliderHandle.show();
      sliderImage.show();

      // 设置容器尺寸
      sliderGame.css({
        '--slider-game-width': sliderImage.width() + 'px',
        '--slider-game-height': sliderImage.height() + 'px',
        '--slider-cols': 10,
        '--slider-rows': 10
      });

      // 更新尺寸信息
      updateGameDimensions();

      // 创建mask元素
      createMasks();

      // 创建小球
      createNewBall();
    }

    // 更新游戏尺寸信息
    function updateGameDimensions() {
      gameData.containerWidth = sliderGame.width();
      gameData.containerHeight = sliderGame.height();
      gameData.maskWidth = gameData.containerWidth / 10;
      gameData.maskHeight = gameData.containerHeight / 10;

      // 初始化手柄位置（居中）
      var handleLeft =
        (gameData.containerWidth - gameData.sliderHandleWidth) / 2;
      sliderHandle.css({
        left: handleLeft + "px",
        bottom: "0",
        display: "block"
      });
    }

    // 创建mask元素
    function createMasks() {
      sliderGame.css("display", "grid");

      for (var i = 0; i < 100; i++) {
        var mask = $("<div>").addClass("slider-mask");

        if (i >= 90) {
          mask.addClass("disappear");
        }

        sliderGame.append(mask);
        gameData.masks.push({
          element: mask,
          index: i,
          isActive: i < 90
        });
      }
    }

    // 计算基于容器大小的速度
    function calculateSpeed() {
      return {
        x: gameData.containerWidth / 3,
        y: gameData.containerHeight / 2
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
      sliderGame.addClass("slider-game-over");

      if (gameData.animationId) {
        cancelAnimationFrame(gameData.animationId);
        gameData.animationId = null;
      }

      if (gameData.sliderBall) {
        gameData.sliderBall.remove();
      }

      // 创建胜利弹窗
      var winPopup = $("<div>").addClass("win-popup");
      var winMsg = $("<div>").addClass("win-message").text("游戏胜利!");
      var restartBtn = $("<button>").addClass("restart-btn").text("再玩一次");
      var showOriginalBtn = $("<button>")
        .addClass("show-original-btn")
        .text("显示原图");

      winPopup.append(winMsg, restartBtn, showOriginalBtn);
      sliderGame.append(winPopup);

      // 按钮事件
      restartBtn.on("click", function () {
        winPopup.remove();
        initGame();
      });

      showOriginalBtn.on("click", function () {
        toggleOriginalImage();
      });
    }

    // 切换显示原图
    function toggleOriginalImage() {
      gameData.showOriginal = !gameData.showOriginal;

      if (gameData.showOriginal) {
        sliderHandle.hide();
        sliderGame.find(".slider-mask").hide();
        sliderGame.find(".win-popup").hide();
        sliderImage.css("visibility", "visible");
      } else {
        sliderHandle.show();
        sliderGame.find(".slider-mask").show();
        sliderGame.find(".win-popup").show();
        sliderImage.css("visibility", "visible");
      }
    }

    // 创建新小球
    function createNewBall() {
      // 清除现有小球
      if (gameData.sliderBall) {
        gameData.sliderBall.remove();
      }
      if (gameData.animationId) {
        cancelAnimationFrame(gameData.animationId);
      }

      if (gameData.isGameOver) return;

      // 创建小球元素
      gameData.sliderBall = $("<div>").addClass("slider-ball").css({
        width: gameData.sliderBallSize,
        height: gameData.sliderBallSize
      });
      sliderGame.append(gameData.sliderBall);

      // 初始位置和速度
      gameData.ballX =
        Math.random() * (gameData.containerWidth - gameData.sliderBallSize);
      gameData.ballY = gameData.containerHeight * 0.3; // 从上部30%位置开始

      var speeds = calculateSpeed();
      gameData.ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * speeds.x;
      gameData.ballSpeedY = speeds.y;

      gameData.lastTime = performance.now();
      animateBall();
    }

    // 鼠标移动事件 - 处理手柄控制
    sliderGame.on("mousemove touchmove", function (e) {
      if (gameData.isGameOver || gameData.showOriginal) return;

      // 获取相对于容器的坐标
      var clientX =
        e.type === "touchmove" ? e.originalEvent.touches[0].clientX : e.clientX;
      var containerOffset = sliderGame.offset();
      var mouseX = clientX - containerOffset.left;

      // 计算手柄位置 (居中于鼠标)
      var handleLeft = mouseX - gameData.sliderHandleWidth / 2;

      // 限制手柄移动范围
      handleLeft = Math.max(
        0,
        Math.min(
          handleLeft,
          gameData.containerWidth - gameData.sliderHandleWidth
        )
      );

      sliderHandle.css("left", handleLeft + "px");
    });

    // 检测碰撞
    function checkCollisions() {
      // 边界碰撞 (只检测左右和上边界)
      if (gameData.ballX <= 0) {
        gameData.ballX = 0;
        gameData.ballSpeedX = Math.abs(gameData.ballSpeedX);
      } else if (
        gameData.ballX >=
        gameData.containerWidth - gameData.sliderBallSize
      ) {
        gameData.ballX = gameData.containerWidth - gameData.sliderBallSize;
        gameData.ballSpeedX = -Math.abs(gameData.ballSpeedX);
      }

      if (gameData.ballY <= 0) {
        gameData.ballY = 0;
        gameData.ballSpeedY = Math.abs(gameData.ballSpeedY);
      }

      // 底部边界检测 (游戏失败)
      if (
        gameData.ballY >=
        gameData.containerHeight - gameData.sliderBallSize
      ) {
        gameData.sliderBall.remove();
        setTimeout(createNewBall, 1000);
        return true;
      }

      // 手柄碰撞检测
      var handleLeft = parseInt(sliderHandle.css("left")) || 0;
      var handleRight = handleLeft + gameData.sliderHandleWidth;
      var handleTop = gameData.containerHeight - gameData.sliderHandleHeight;

      if (
        gameData.ballY + gameData.sliderBallSize >= handleTop &&
        gameData.ballX + gameData.sliderBallSize >= handleLeft &&
        gameData.ballX <= handleRight
      ) {
        gameData.ballY = handleTop - gameData.sliderBallSize;
        gameData.ballSpeedY = -Math.abs(gameData.ballSpeedY);
      }

      // 砖块碰撞检测 - 只标记碰撞到的砖块，不改变小球方向
      var col = Math.floor(gameData.ballX / gameData.maskWidth);
      var row = Math.floor(gameData.ballY / gameData.maskHeight);
      var index = row * 10 + col;

      if (
        index >= 0 &&
        index < 90 &&
        gameData.masks[index] &&
        gameData.masks[index].isActive
      ) {
        var maskRect = {
          left: col * gameData.maskWidth,
          top: row * gameData.maskHeight,
          right: (col + 1) * gameData.maskWidth,
          bottom: (row + 1) * gameData.maskHeight
        };

        // 检测碰撞
        if (
          gameData.ballX + gameData.sliderBallSize > maskRect.left &&
          gameData.ballX < maskRect.right &&
          gameData.ballY + gameData.sliderBallSize > maskRect.top &&
          gameData.ballY < maskRect.bottom
        ) {
          // 标记砖块为已消除 (通过添加CSS类)
          gameData.masks[index].isActive = false;
          gameData.masks[index].element.addClass("disappear");

          // 检查是否所有砖块都消除了
          checkAllMasksDisappeared();
        }
      }

      return false;
    }

    // 小球动画
    function animateBall() {
      if (gameData.isGameOver || gameData.showOriginal) return;

      var currentTime = performance.now();
      var deltaTime = (currentTime - gameData.lastTime) / 1000; // 转换为秒
      gameData.lastTime = currentTime;

      // 更新位置
      gameData.ballX += gameData.ballSpeedX * deltaTime;
      gameData.ballY += gameData.ballSpeedY * deltaTime;

      // 检测碰撞
      var gameOver = checkCollisions();
      if (gameOver) return;

      // 更新小球位置
      gameData.sliderBall.css({
        left: gameData.ballX + "px",
        top: gameData.ballY + "px"
      });

      gameData.animationId = requestAnimationFrame(animateBall);
    }

    // 窗口大小变化处理
    $(window).on("resize", function () {
      if (gameData.showOriginal) return;

      sliderGame.css({
        width: sliderImage.width(),
        height: sliderImage.height()
      });

      // 延迟确保尺寸更新
      setTimeout(function () {
        updateGameDimensions();

        // 如果游戏正在进行，重新定位小球
        if (gameData.sliderBall) {
          gameData.ballX = Math.min(
            gameData.ballX,
            gameData.containerWidth - gameData.sliderBallSize
          );
          gameData.ballY = Math.min(
            gameData.ballY,
            gameData.containerHeight - gameData.sliderBallSize
          );
          gameData.sliderBall.css({
            left: gameData.ballX + "px",
            top: gameData.ballY + "px"
          });
        }
      }, 100);
    });

    // 开始游戏
    initGame();
  }
};

window.SliderGame = SliderGame;

// 正确的初始化调用方式
$(document).ready(function () {
  // 隐藏无JS提示
  $(".slider-game-no-js").hide();

  // 初始化所有滑块游戏实例
  $(".slider-game").each(function () {
    SliderGame.init($(this));
  });
});