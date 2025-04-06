$(document).ready(function () {
  // 隐藏无JS提示
  $('.huarong-no-js').hide();
  // 初始化所有华容道游戏实例
  $(".huarong").each(function () {
    initHuarongGame($(this));
  });

  function initHuarongGame($container) {
    // 获取配置
    var rows = parseInt($container.attr("data-row")) || 3;
    var cols = parseInt($container.attr("data-col")) || 3;
    var gameId =
      $container.attr("data-id") ||
      "huarong-" + Math.random().toString(36).substr(2, 9);
    var $imgElement = $container.find(".huarong-img img");

    // 创建游戏元素，重置与自动求解按钮样式保持一致
    $container.append(
      '\
      <div class="huarong-controls">\
        <div class="huarong-moves" id="' +
        gameId +
        '-moves">步数: 0</div>\
        <button class="huarong-solve-btn cdx-button has-ripple">自动求解</button>\
        <button class="huarong-reset-btn cdx-button has-ripple">重置游戏</button>\
      </div>\
      <div class="huarong-game" id="' +
        gameId +
        '-game"></div>\
    '
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
      moveHistory: [] // 记录所有移动步骤（打乱时 + 用户操作）
    };

    gameState.ctx = gameState.canvas.getContext("2d");

    // 初始化游戏：加载图片、设置尺寸、打乱拼图
    function initGame() {
      $gameContainer.empty();
      gameState.moves = 0;
      gameState.moveHistory = [];
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

      var srcBlockWidth = Math.floor(gameState.originalImage.width / cols);
      var srcBlockHeight = Math.floor(gameState.originalImage.height / rows);

      // 初始有序数组
      var numbers = Array.from({ length: rows * cols - 1 }, function (_, i) {
        return i;
      });

      // 根据初始状态创建拼图块
      var solvedState = createBlocksFromNumbers(numbers, true);
      gameState.blocks = solvedState.blocks;
      gameState.emptyPos = solvedState.emptyPos;

      // 随机打乱拼图，同时记录每一步移动到 moveHistory
      var shuffleSteps = 20 + Math.floor(Math.random() * 21);
      shufflePuzzle(shuffleSteps);

      // 显示自动求解按钮（重置时启用）
      $solveBtn
        .show()
        .prop("disabled", false)
        .off("click")
        .on("click", startAutoSolve);
    }

    // 根据数字数组创建拼图块，返回块数组和初始空格位置
    function createBlocksFromNumbers(numbers, isSolved) {
      if (isSolved === undefined) {
        isSolved = false;
      }
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
            '\
            <div class="huarong-block" \
                 data-x="' +
              x +
              '" \
                 data-y="' +
              y +
              '" \
                 data-original-x="' +
              originalX +
              '" \
                 data-original-y="' +
              originalY +
              '" \
                 data-number="' +
              number +
              '" \
                 style="width:' +
              (gameState.blockWidth - 2) +
              "px; height:" +
              (gameState.blockHeight - 2) +
              "px; left:" +
              x * gameState.blockWidth +
              "px; top:" +
              y * gameState.blockHeight +
              'px;">\
              <img src="' +
              croppedImageUrl +
              '">\
            </div>\
          '
          );

          $block.on("click", function () {
            if (!gameState.isPlaying || gameState.isAnimating) return;
            var $this = $(this);
            tryMoveBlock(
              parseInt($this.attr("data-x")),
              parseInt($this.attr("data-y"))
            );
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
        '\
        <div class="huarong-empty" \
             style="width:' +
          (gameState.blockWidth - 2) +
          "px; height:" +
          (gameState.blockHeight - 2) +
          "px; left:" +
          emptyPos.x * gameState.blockWidth +
          "px; top:" +
          emptyPos.y * gameState.blockHeight +
          'px;">\
        </div>\
      '
      );
      $gameContainer.append($emptySpace);

      return { blocks: blocks, emptyPos: emptyPos };
    }

    // 随机打乱拼图，同时记录每一步移动到 moveHistory
    function shufflePuzzle(steps) {
      var lastDirection = null;

      for (var i = 0; i < steps; i++) {
        var directions = [];
        var x = gameState.emptyPos.x;
        var y = gameState.emptyPos.y;

        if (x > 0 && lastDirection !== "right")
          directions.push(["left", x - 1, y]);
        if (x < cols - 1 && lastDirection !== "left")
          directions.push(["right", x + 1, y]);
        if (y > 0 && lastDirection !== "down")
          directions.push(["up", x, y - 1]);
        if (y < rows - 1 && lastDirection !== "up")
          directions.push(["down", x, y + 1]);

        if (directions.length === 0) continue;

        var direction =
          directions[Math.floor(Math.random() * directions.length)];
        lastDirection = direction[0];

        var blockIndex = gameState.blocks.findIndex(function (b) {
          return b.x === direction[1] && b.y === direction[2];
        });
        if (blockIndex === -1) continue;

        var block = gameState.blocks[blockIndex];
        // 记录打乱时的移动：将该方块从当前位置移动到空格处
        gameState.moveHistory.push({
          number: block.number,
          fromX: block.x,
          fromY: block.y,
          toX: gameState.emptyPos.x,
          toY: gameState.emptyPos.y
        });

        // 执行移动：更新方块位置，空格位置更新为目标位置
        block.element
          .attr({
            "data-x": gameState.emptyPos.x,
            "data-y": gameState.emptyPos.y
          })
          .css({
            left: gameState.emptyPos.x * gameState.blockWidth + "px",
            top: gameState.emptyPos.y * gameState.blockHeight + "px"
          });

        var oldX = block.x,
          oldY = block.y;
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

    // 剪切图片，返回 dataURL
    function cropImage(img, x, y, width, height) {
      gameState.canvas.width = width;
      gameState.canvas.height = height;
      gameState.ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
      return gameState.canvas.toDataURL();
    }

    // 尝试移动方块
    // 不论用户操作还是自动求解，都将该移动记录到 moveHistory（便于逆向回放）
    function tryMoveBlock(x, y, isAuto) {
      if (isAuto === undefined) {
        isAuto = false;
      }
      if (!isAuto && (!gameState.isPlaying || gameState.isAnimating)) return;

      if (
        (Math.abs(x - gameState.emptyPos.x) === 1 &&
          y === gameState.emptyPos.y) ||
        (Math.abs(y - gameState.emptyPos.y) === 1 && x === gameState.emptyPos.x)
      ) {
        var blockIndex = gameState.blocks.findIndex(function (b) {
          return b.x === x && b.y === y;
        });
        if (blockIndex === -1) return;

        gameState.isAnimating = true;
        var block = gameState.blocks[blockIndex];
        var $block = block.element;
        var oldX = block.x,
          oldY = block.y;
        var emptyX = gameState.emptyPos.x,
          emptyY = gameState.emptyPos.y;

        // 记录移动（无论用户操作还是自动求解）
        gameState.moveHistory.push({
          number: block.number,
          fromX: oldX,
          fromY: oldY,
          toX: emptyX,
          toY: emptyY
        });

        // 更新方块位置到空格处
        $block
          .attr({
            "data-x": emptyX,
            "data-y": emptyY
          })
          .css({
            left: emptyX * gameState.blockWidth + "px",
            top: emptyY * gameState.blockHeight + "px"
          });

        // 更新状态：空格回到原来位置
        block.x = emptyX;
        block.y = emptyY;
        gameState.emptyPos.x = oldX;
        gameState.emptyPos.y = oldY;

        $gameContainer.find(".huarong-empty").css({
          left: gameState.emptyPos.x * gameState.blockWidth + "px",
          top: gameState.emptyPos.y * gameState.blockHeight + "px"
        });

        // 累加步数并更新显示
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
        // 不再使用 alert，而是显示自定义 win popup
        showWinPopup();
      }
    }

    // 更新步数显示
    function updateMovesDisplay() {
      $movesDisplay.text("步数: " + gameState.moves);
    }

    // 显示游戏结束弹窗，样式参考给出的 CSS
    function showWinPopup() {
      var $popup = $('<div class="win-popup"></div>');
      var $message = $('<div class="win-message"></div>').text(
        "游戏完成！步数: " + gameState.moves
      );
      var $restart = $('<button class="restart-btn">再玩一次</button>');
      var $showOriginal = $(
        '<button class="show-original-btn">返回游戏</button>'
      );

      $popup.append($message).append($restart).append($showOriginal);
      $container.append($popup);

      $restart.on("click", function () {
        resetGame();
        $popup.remove();
      });

      $showOriginal.on("click", function () {
        $popup.remove();
      });
    }

    // 自动求解功能：将整个 moveHistory 数组逆向回放
    // 点击自动求解后按钮立即禁用，直到重置游戏后恢复
    function startAutoSolve() {
      $solveBtn.prop("disabled", true);
      var solution = gameState.moveHistory.slice().reverse();
      animateSolution(solution);
    }

    // 动画演示求解步骤（逆向回放 moveHistory 中记录的所有步骤）
    function animateSolution(solution) {
      var step = 0;
      function nextStep() {
        if (step >= solution.length) {
          gameState.isPlaying = true;
          // 此处不再恢复自动求解按钮可点击，只有重置游戏时恢复
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
          setTimeout(nextStep, 300);
        }
      }
      nextStep();
    }

    // 重置游戏：清空当前状态并重新初始化，同时恢复自动求解按钮可点击
    function resetGame() {
      // 若有自动求解定时器，则取消
      if (gameState.autoSolveTimer) {
        clearTimeout(gameState.autoSolveTimer);
        gameState.autoSolveTimer = null;
      }
      gameState.blocks = [];
      gameState.emptyPos = { x: cols - 1, y: rows - 1 };
      gameState.moves = 0;
      gameState.moveHistory = [];
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
});