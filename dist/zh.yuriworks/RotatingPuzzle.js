(function ($) {
  $(".rotating-puzzle-no-js").css("display", "none");

  var RotatingPuzzleGame = function ($container) {
    this.config = {
      rows: Math.max(3, parseInt($container.attr("data-row")) || 5),
      cols: Math.max(3, parseInt($container.attr("data-col")) || 5),
      mode: $container.attr("data-mode") || "default",
      isCovered: $container.attr("data-cover") === "true",
      quickSolveDuration: 2000
    };

    this.$container = $container;
    this.$imageContainer = $container.find(".rotating-puzzle-img");
    this.$image = $container.find(".rotating-puzzle-img img");

    this.originalPositions = {};
    this.selectedPiece = null;
    this.$winPopup = null;
    this.$piecesContainer = null;
    this.isSolving = false;
    this.isQuickSolving = false;
    this.autoSolveTimeout = null;

    this.criticalWidth = 0;
    this.criticalHeight = 0;
    this.pieceSize = 0;
    this.edgePieceWidth = 0;
    this.edgePieceHeight = 0;
  };

  RotatingPuzzleGame.prototype = {
    init: function () {
      this.$container.find(".rotating-puzzle-no-js").hide();

      if (!this.$container.prev(".rotating-puzzle-controls").length) {
        this.createControls();
      } else {
        this.$solveBtn = this.$container
          .prev(".rotating-puzzle-controls")
          .find(".auto-solve-btn");
        this.$quickSolveBtn = this.$container
          .prev(".rotating-puzzle-controls")
          .find(".quick-solve-btn");
      }

      this.$piecesContainer = $("<div>").addClass(
        "rotating-puzzle-piece-container"
      );
      this.$container.append(this.$piecesContainer);

      this.setContainerSize();
    },

    createControls: function () {
      var $controls = $('<div class="rotating-puzzle-controls"></div>');

      var $hintBtn = $('<button class="cdx-button">提示</button>')
        .on("mousedown", $.proxy(this.showHint, this))
        .on("mouseup mouseleave", $.proxy(this.hideHint, this));

      this.$solveBtn = $(
        '<button class="cdx-button auto-solve-btn">自动求解</button>'
      ).on("click", $.proxy(this.autoSolve, this));

      this.$quickSolveBtn = $(
        '<button class="cdx-button quick-solve-btn">快速求解</button>'
      ).on("click", $.proxy(this.quickSolve, this));

      var $resetBtn = $('<button class="cdx-button">重置游戏</button>').on(
        "click",
        $.proxy(this.resetGame, this)
      );

      $controls.append(
        $hintBtn,
        this.$solveBtn,
        this.$quickSolveBtn,
        $resetBtn
      );
      this.$container.before($controls);
    },

    showHint: function () {
      this.$container.addClass("show-hint");
    },

    hideHint: function () {
      this.$container.removeClass("show-hint");
    },

    autoSolve: function () {
      if (this.isSolving || this.isQuickSolving) return;
      this.isSolving = true;
      this.isQuickSolving = false;
      this.$solveBtn.prop("disabled", true);
      this.$quickSolveBtn.prop("disabled", true);
      this.autoSolveStep(false);
    },

    quickSolve: function () {
      if (this.isSolving || this.isQuickSolving) return;
      this.isSolving = false;
      this.isQuickSolving = true;
      this.$solveBtn.prop("disabled", true);
      this.$quickSolveBtn.prop("disabled", true);
      this.autoSolveStep(true);
    },

    autoSolveStep: function (isQuick) {
      var self = this;

      // 取得所有未固定的碎片
      var unsolved = this.$container
        .find(".rotating-puzzle-piece:not(.fixed)")
        .toArray();

      // 如果所有碎片均已正确，则结束求解
      if (unsolved.length === 0) {
        self.isSolving = false;
        self.isQuickSolving = false;
        self.$solveBtn.prop("disabled", false);
        self.$quickSolveBtn.prop("disabled", false);
        self.showWinMessage();
        return;
      }

      // 对于快速求解模式，直接强制将所有未固定碎片调整到正确状态
      if (isQuick) {
        for (var i = 0; i < unsolved.length; i++) {
          var $piece = $(unsolved[i]);
          var correctPos = $piece.data("correctPos");
          $piece.css({
            "--bg-pos-x": correctPos.x + "px",
            "--bg-pos-y": correctPos.y + "px",
            rotate: "0deg",
            "transition-duration": this.config.quickSolveDuration / 1000 + "s"
          });
          $piece.data("originalPos", correctPos);
          $piece.data("rotation", 0);
          self.checkPiecePosition($piece);
        }
        this.autoSolveTimeout = setTimeout(function () {
          self.autoSolveStep(isQuick);
        }, this.config.quickSolveDuration);
        return;
      }

      // 以下为非快速求解模式，使用原有交换/旋转动画逻辑
      var $pieceA = $(unsolved[0]);
      var correctPos = $pieceA.data("correctPos");
      var currentPos = $pieceA.data("originalPos");
      var currentRotation = $pieceA.data("rotation");

      // 如果当前碎片已经在正确位置，但旋转角度不对，则执行旋转修正
      if (
        currentPos.x === correctPos.x &&
        currentPos.y === correctPos.y &&
        currentRotation !== 0
      ) {
        self.rotatePiece($pieceA, isQuick);
        this.autoSolveTimeout = setTimeout(function () {
          self.autoSolveStep(isQuick);
        }, 300);
        return;
      }

      // 如果当前碎片位置不正确，则寻找交换目标
      if (currentPos.x !== correctPos.x || currentPos.y !== correctPos.y) {
        var $pieceB = null;
        for (var i = 1; i < unsolved.length; i++) {
          var $tmp = $(unsolved[i]);
          var tmpPos = $tmp.data("originalPos");
          if (tmpPos.x === correctPos.x && tmpPos.y === correctPos.y) {
            $pieceB = $tmp;
            break;
          }
        }

        // 如果没有找到精准匹配的候选碎片，则取第二个未固定的碎片作为交换目标
        if (!$pieceB && unsolved.length > 1) {
          $pieceB = $(unsolved[1]);
        }

        if ($pieceB) {
          this.swapPieces($pieceA, $pieceB);
        }
      }

      this.autoSolveTimeout = setTimeout(function () {
        self.autoSolveStep(isQuick);
      }, 300);
    },

    rotatePiece: function ($piece, isQuick) {
      var currentRotation = $piece.data("rotation");
      var rotationStep = this.config.isCovered ? 180 : 90;
      var newRotation = (currentRotation + rotationStep) % 360;

      // 快速模式直接设置不带动画
      if (isQuick) {
        $piece
          .css({
            rotate: newRotation + "deg",
            transition: "none"
          })
          .data("rotation", newRotation);
        this.checkPiecePosition($piece);
        return;
      }

      // 标准模式处理
      $piece
        .css({
          transition: "rotate 0.3s ease",
          rotate: newRotation + "deg"
        })
        .data("rotation", newRotation);

      // 特殊处理270°→0°的情况（不再使用360°过渡）
      if (currentRotation === 270 && newRotation === 0) {
        // 直接设置为0°，添加短暂动画
        $piece.css({
          transition: "rotate 0.15s ease",
          rotate: "0deg"
        });
      }

      this.checkPiecePosition($piece);
    },

    setContainerSize: function () {
      var img = new Image();
      var self = this;

      img.onload = function () {
        var totalWidth = img.width;
        var totalHeight = img.height;

        if (self.config.isCovered) {
          self.pieceSize = Math.min(
            totalWidth / self.config.cols,
            totalHeight / self.config.rows
          );
          self.edgePieceWidth = self.pieceSize;
          self.edgePieceHeight = self.pieceSize;
        } else {
          self.criticalWidth = totalWidth / self.config.cols;
          self.criticalHeight = totalHeight / self.config.rows;
          self.pieceSize = Math.min(self.criticalWidth, self.criticalHeight);
          self.edgePieceWidth =
            (totalWidth - self.pieceSize * (self.config.cols - 2)) / 2;
          self.edgePieceHeight =
            (totalHeight - self.pieceSize * (self.config.rows - 2)) / 2;
        }

        self.$container.css({
          width: totalWidth + "px",
          height: totalHeight + "px",
          "--piece-width": self.pieceSize + "px",
          "--piece-height": self.pieceSize + "px",
          "--edge-piece-width": self.edgePieceWidth + "px",
          "--edge-piece-height": self.edgePieceHeight + "px",
          "--rotating-puzzle-piece-img-source":
            "url('" + self.$image.attr("src") + "')",
          "--bg-size": totalWidth + "px " + totalHeight + "px"
        });

        self.onImageReady(totalWidth, totalHeight);
      };

      img.src = this.$image.attr("src");
    },

    createPiece: function (row, col, totalWidth, totalHeight) {
      var isEdge =
        !this.config.isCovered &&
        (row === 1 ||
          row === this.config.rows ||
          col === 1 ||
          col === this.config.cols);

      var $piece = $("<div>").addClass("rotating-puzzle-piece");

      var width, height, translateX, translateY;

      if (this.config.isCovered) {
        // cover 模式下，直接等分父容器，不要求正方形
        width = totalWidth / this.config.cols;
        height = totalHeight / this.config.rows;
        translateX = (col - 1) * width;
        translateY = (row - 1) * height;
      } else {
        width = isEdge ? this.edgePieceWidth : this.pieceSize;
        height = isEdge ? this.edgePieceHeight : this.pieceSize;
        translateX =
          col === 1
            ? 0
            : col === this.config.cols
            ? totalWidth - width
            : this.edgePieceWidth + (col - 2) * this.pieceSize;
        translateY =
          row === 1
            ? 0
            : row === this.config.rows
            ? totalHeight - height
            : this.edgePieceHeight + (row - 2) * this.pieceSize;
      }

      var bgPos = this.calculateBackgroundPosition(
        row,
        col,
        width,
        height,
        totalWidth,
        totalHeight
      );

      // 如果是 cover 模式，则设置专用的 CSS 自定义属性覆盖默认尺寸
      if (this.config.isCovered) {
        $piece.css({
          "--bg-pos-x": bgPos.x + "px",
          "--bg-pos-y": bgPos.y + "px",
          translate: translateX + "px " + translateY + "px",
          width: width + "px",
          height: height + "px"
        });
      } else {
        $piece.css({
          "--bg-pos-x": bgPos.x + "px",
          "--bg-pos-y": bgPos.y + "px",
          translate: translateX + "px " + translateY + "px",
          width:
            "var(" + (isEdge ? "--edge-piece-width" : "--piece-width") + ")",
          height:
            "var(" + (isEdge ? "--edge-piece-height" : "--piece-height") + ")"
        });
      }

      var pieceId = row + "-" + col;
      this.originalPositions[pieceId] = {
        bgPosX: bgPos.x,
        bgPosY: bgPos.y,
        translateX: translateX,
        translateY: translateY
      };

      if (isEdge) {
        $piece.addClass("edge fixed");
      } else {
        $piece.on("click", $.proxy(this.onPieceLeftClick, this));
        $piece.on("contextmenu", $.proxy(this.onPieceRightClick, this));
      }

      $piece.data({
        rotation: 0,
        originalPos: bgPos,
        correctPos: bgPos,
        pieceId: pieceId,
        isInOriginalPos: true,
        translateX: translateX,
        translateY: translateY
      });

      this.$piecesContainer.append($piece);
    },

    onImageReady: function (imgWidth, imgHeight) {
      this.calculatePieceSizes(imgWidth, imgHeight);
      this.createPuzzlePieces();
      this.shuffleAndRotatePieces();
    },

    calculatePieceSizes: function (totalWidth, totalHeight) {
      if (this.config.isCovered) {
        this.pieceSize = Math.min(
          totalWidth / this.config.cols,
          totalHeight / this.config.rows
        );
        this.edgePieceWidth = this.pieceSize;
        this.edgePieceHeight = this.pieceSize;
      } else {
        this.criticalWidth = totalWidth / this.config.cols;
        this.criticalHeight = totalHeight / this.config.rows;
        this.pieceSize = Math.min(this.criticalWidth, this.criticalHeight);
        this.edgePieceWidth =
          (totalWidth - this.pieceSize * (this.config.cols - 2)) / 2;
        this.edgePieceHeight =
          (totalHeight - this.pieceSize * (this.config.rows - 2)) / 2;
      }
    },

    createPuzzlePieces: function () {
      var totalWidth = this.$container.width();
      var totalHeight = this.$container.height();
      var imageUrl = this.$image.attr("src");

      for (var i = 1; i <= this.config.rows; i++) {
        for (var j = 1; j <= this.config.cols; j++) {
          this.createPiece(i, j, totalWidth, totalHeight, imageUrl);
        }
      }
    },

    calculatePieceDimension: function (position, total, containerSize, type) {
      if (this.config.isCovered) {
        return type === "width" ? containerSize / total : containerSize / total;
      }
      if (position === 1 || position === total) {
        return type === "width" ? this.edgePieceWidth : this.edgePieceHeight;
      }
      return this.pieceSize;
    },

    calculateBackgroundPosition: function (
      row,
      col,
      width,
      height,
      totalWidth,
      totalHeight
    ) {
      var x = 0,
        y = 0;

      if (this.config.isCovered) {
        x = (col - 1) * width;
        y = (row - 1) * height;
      } else {
        if (col === 1) {
          x = 0;
        } else if (col === this.config.cols) {
          x = totalWidth - width;
        } else {
          x = this.edgePieceWidth + (col - 2) * this.pieceSize;
        }

        if (row === 1) {
          y = 0;
        } else if (row === this.config.rows) {
          y = totalHeight - height;
        } else {
          y = this.edgePieceHeight + (row - 2) * this.pieceSize;
        }
      }

      return { x: -x, y: -y };
    },

    calculateBackgroundPosition: function (
      row,
      col,
      width,
      height,
      totalWidth,
      totalHeight
    ) {
      var x = 0,
        y = 0;

      if (this.config.isCovered) {
        x = (col - 1) * width;
        y = (row - 1) * height;
      } else {
        if (col === 1) {
          x = 0;
        } else if (col === this.config.cols) {
          x = totalWidth - width;
        } else {
          x = this.edgePieceWidth + (col - 2) * this.pieceSize;
        }

        if (row === 1) {
          y = 0;
        } else if (row === this.config.rows) {
          y = totalHeight - height;
        } else {
          y = this.edgePieceHeight + (row - 2) * this.pieceSize;
        }
      }

      return { x: -x, y: -y };
    },

    shuffleAndRotatePieces: function () {
      var movablePieces = this.config.isCovered
        ? this.$container.find(".rotating-puzzle-piece").toArray()
        : this.$container.find(".rotating-puzzle-piece:not(.edge)").toArray();

      if (this.config.mode !== "rotate") {
        var positions = [];
        for (var i = 0; i < movablePieces.length; i++) {
          positions.push($(movablePieces[i]).data("correctPos"));
        }

        for (var i = positions.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = positions[i];
          positions[i] = positions[j];
          positions[j] = temp;
        }

        for (var i = 0; i < movablePieces.length; i++) {
          var $piece = $(movablePieces[i]);
          var newPos = positions[i];
          $piece.css({
            "--bg-pos-x": newPos.x + "px",
            "--bg-pos-y": newPos.y + "px"
          });
          $piece.data("originalPos", newPos);
          $piece.data(
            "isInOriginalPos",
            newPos.x === $piece.data("correctPos").x &&
              newPos.y === $piece.data("correctPos").y
          );
        }
      }

      if (this.config.mode !== "translate") {
        var rotations = this.config.isCovered ? [0, 180] : [0, 90, 180, 270];
        for (var i = 0; i < movablePieces.length; i++) {
          var $piece = $(movablePieces[i]);
          var randomRotation =
            rotations[Math.floor(Math.random() * rotations.length)];
          $piece
            .data("rotation", randomRotation)
            .css("rotate", randomRotation + "deg");
        }
      }

      var allPieces = this.$container.find(".rotating-puzzle-piece").toArray();
      for (var i = 0; i < allPieces.length; i++) {
        this.checkPiecePosition($(allPieces[i]));
      }

      // 打乱后统一检查所有碎片状态
      var allPieces = this.$container.find(".rotating-puzzle-piece").toArray();
      for (var i = 0; i < allPieces.length; i++) {
        this.checkPiecePosition($(allPieces[i]));
      }
    },

    onPieceLeftClick: function (e) {
      e.preventDefault();
      var $piece = $(e.currentTarget);
      if ($piece.hasClass("fixed") || this.isSolving || this.isQuickSolving)
        return;
      switch (this.config.mode) {
        case "translate":
          this.handleTranslateModeClick($piece);
          break;
        case "rotate":
          this.handleRotateModeClick($piece);
          break;
        default:
          this.handleDefaultModeClick($piece);
      }
    },

    onPieceRightClick: function (e) {
      e.preventDefault();
      var $piece = $(e.currentTarget);
      if ($piece.hasClass("fixed") || this.isSolving || this.isQuickSolving)
        return;
      if (this.config.mode === "translate") {
        this.handleTranslateModeClick($piece);
      } else if (this.config.mode === "rotate") {
        this.handleRotateModeClick($piece);
      } else {
        if (this.selectedPiece) {
          this.selectedPiece.removeClass("selected");
          this.selectedPiece = null;
        }
        this.rotatePiece($piece, false);
      }
    },

    handleDefaultModeClick: function ($piece) {
      if (this.selectedPiece) {
        if (this.selectedPiece.data("pieceId") === $piece.data("pieceId")) {
          this.selectedPiece.removeClass("selected");
          this.selectedPiece = null;
          return;
        }
        this.swapPieces(this.selectedPiece, $piece);
        this.selectedPiece.removeClass("selected");
        this.selectedPiece = null;
        this.checkGameCompletion();
      } else {
        this.selectedPiece = $piece;
        $piece.addClass("selected");
      }
    },

    handleTranslateModeClick: function ($piece) {
      if (this.selectedPiece) {
        if (this.selectedPiece.data("pieceId") === $piece.data("pieceId")) {
          this.selectedPiece.removeClass("selected");
          this.selectedPiece = null;
          return;
        }
        // 使用与自动求解中相同的动画效果：swapPieces 函数
        this.swapPieces(this.selectedPiece, $piece);
        this.selectedPiece.removeClass("selected");
        this.selectedPiece = null;
        // 为了保证游戏完成检查能在动画完成后执行，延时调用 checkGameCompletion
        var self = this;
        setTimeout(function () {
          self.checkGameCompletion();
        }, 300);
      } else {
        this.selectedPiece = $piece;
        $piece.addClass("selected");
      }
    },

    handleRotateModeClick: function ($piece) {
      if (this.selectedPiece) {
        this.selectedPiece.removeClass("selected");
        this.selectedPiece = null;
      }
      this.rotatePiece($piece, false);
    },

    swapPieces: function ($piece1, $piece2) {
      var self = this;

      // 深度拷贝所有相关数据
      var piece1Data = $.extend(true, {}, $piece1.data());
      var piece2Data = $.extend(true, {}, $piece2.data());

      // 1. 执行平移动画
      $piece1.css({
        transition: "translate 0.3s ease",
        translate: piece2Data.translateX + "px " + piece2Data.translateY + "px"
      });

      $piece2.css({
        transition: "translate 0.3s ease",
        translate: piece1Data.translateX + "px " + piece1Data.translateY + "px"
      });

      // 2. 动画完成后瞬间完成数据交换和位置重置
      setTimeout(function () {
        // 移除过渡效果
        $piece1.css("transition", "none");
        $piece2.css("transition", "none");

        // 回到原来的位置
        $piece1.css({
          translate:
            piece1Data.translateX + "px " + piece1Data.translateY + "px"
        });
        $piece2.css({
          translate:
            piece2Data.translateX + "px " + piece2Data.translateY + "px"
        });

        var tempBgPosX = $piece1.css("--bg-pos-x");
        var tempBgPosY = $piece1.css("--bg-pos-y");
        $piece1.css({
          "--bg-pos-x": $piece2.css("--bg-pos-x"),
          "--bg-pos-y": $piece2.css("--bg-pos-y")
        });
        $piece2.css({
          "--bg-pos-x": tempBgPosX,
          "--bg-pos-y": tempBgPosY
        });

        var tempOriginalPos = $piece1.data("originalPos");
        $piece1.data("originalPos", $piece2.data("originalPos"));
        $piece2.data("originalPos", tempOriginalPos);

        var tempRotation = $piece1.data("rotation");
        $piece1.data("rotation", $piece2.data("rotation"));
        $piece2.data("rotation", tempRotation);

        $piece1.css("rotate", $piece1.data("rotation") + "deg");
        $piece2.css("rotate", $piece2.data("rotation") + "deg");

        // 恢复过渡效果
        setTimeout(function () {
          $piece1.css("transition", "all 0.3s ease");
          $piece2.css("transition", "all 0.3s ease");
        }, 300);

        // 检查位置状态
        self.checkPiecePosition($piece1);
        self.checkPiecePosition($piece2);
      }, 300);
    },

    quickSwapPieces: function ($piece1, $piece2) {
      // 使用requestAnimationFrame确保DOM更新
      requestAnimationFrame(
        function () {
          // 交换背景位置
          var tempBgPosX = $piece1.css("--bg-pos-x");
          var tempBgPosY = $piece1.css("--bg-pos-y");
          $piece1.css({
            "--bg-pos-x": $piece2.css("--bg-pos-x"),
            "--bg-pos-y": $piece2.css("--bg-pos-y")
          });
          $piece2.css({
            "--bg-pos-x": tempBgPosX,
            "--bg-pos-y": tempBgPosY
          });

          // 交换数据
          var tempOriginalPos = $piece1.data("originalPos");
          $piece1.data("originalPos", $piece2.data("originalPos"));
          $piece2.data("originalPos", tempOriginalPos);

          // 强制重置旋转状态
          $piece1.data("rotation", 0).css("rotate", "0deg");
          $piece2.data("rotation", 0).css("rotate", "0deg");

          // 立即检查状态
          this.checkPiecePosition($piece1);
          this.checkPiecePosition($piece2);
        }.bind(this)
      );
    },

    checkPiecePosition: function ($piece) {
      var currentPos = $piece.data("originalPos");
      var correctPos = $piece.data("correctPos");

      var isInOriginalPos =
        parseInt(currentPos.x, 10) === parseInt(correctPos.x, 10) &&
        parseInt(currentPos.y, 10) === parseInt(correctPos.y, 10);
      $piece.data("isInOriginalPos", isInOriginalPos);

      var rotation = parseInt($piece.data("rotation"), 10) % 360;
      if (rotation < 0) rotation += 360;

      if (isInOriginalPos && rotation === 0) {
        $piece.addClass("fixed");
      } else if (!isInOriginalPos || rotation !== 0) {
        $piece.removeClass("fixed");
      }
    },

    checkGameCompletion: function () {
      var allCorrect = true;
      var piecesToCheck = this.config.isCovered
        ? this.$container.find(".rotating-puzzle-piece")
        : this.$container.find(".rotating-puzzle-piece:not(.edge)");

      piecesToCheck.each(function () {
        if (!$(this).hasClass("fixed")) {
          allCorrect = false;
          return false;
        }
      });
      if (allCorrect) {
        this.showWinMessage();
      }
    },

    showWinMessage: function () {
      this.$container.addClass("rotating-puzzle-game-over");
      var winMsg = $("<div>").addClass("win-message").text("拼图完成!");
      var restartBtn = $("<button>").addClass("restart-btn").text("再玩一次");
      var showOriginalBtn = $("<button>")
        .addClass("show-original-btn")
        .text("显示原图");
      this.$winPopup = $("<div>")
        .addClass("win-popup")
        .append(winMsg)
        .append(restartBtn)
        .append(showOriginalBtn);
      this.$container.append(this.$winPopup);
      var self = this;
      restartBtn.on("click", function () {
        self.resetGame();
      });
      showOriginalBtn.on("click", function () {
        self.$container.children().not(self.$imageContainer).hide();
        self.$container.removeClass("rotating-puzzle-game-over");
      });
    },

    resetGame: function () {
      if (this.autoSolveTimeout) {
        clearTimeout(this.autoSolveTimeout);
        this.autoSolveTimeout = null;
      }

      this.isSolving = false;
      this.isQuickSolving = false;
      if (this.$solveBtn) {
        this.$solveBtn.prop("disabled", false);
      }
      if (this.$quickSolveBtn) {
        this.$quickSolveBtn.prop("disabled", false);
      }

      this.$container.addClass("fade-out");

      var self = this;
      setTimeout(function () {
        self.$container.removeClass(
          "fade-out rotating-puzzle-game-over show-hint"
        );

        self.$container.find(".rotating-puzzle-piece").off("click contextmenu");

        if (self.$piecesContainer) {
          self.$piecesContainer.empty().remove();
        }

        self.originalPositions = {};
        self.selectedPiece = null;
        self.isSolving = false;
        self.isQuickSolving = false;

        if (self.$winPopup) {
          self.$winPopup.remove();
          self.$winPopup = null;
        }

        self.$piecesContainer = $("<div>").addClass(
          "rotating-puzzle-piece-container"
        );
        self.$container.append(self.$piecesContainer);

        self.setContainerSize();
      }, 300);
    }
  };

  $(document).ready(function () {
    $(".rotating-puzzle").each(function () {
      var game = new RotatingPuzzleGame($(this));
      game.init();
    });
  });
})(jQuery);