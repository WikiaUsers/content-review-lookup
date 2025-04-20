(function ($) {
  $(".rotating-puzzle-no-js").hide();

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

    // 记录用户操作步骤
    // 平移操作记录为 [fromPieceId, toPieceId]
    // 旋转操作记录记录为 [pieceId, newRotation]
    this.moveSteps = [];
    // 保存初始打乱状态（保存所有碎片基本数据）
    this.initialShuffledState = null;

    // 记录图片尺寸
    this.imageWidth = 0;
    this.imageHeight = 0;

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
      // 设置标记，表示自动求解模式下结束后不弹出 winMessage
      this.suppressWinMessage = true;
      this.isSolving = true;
      this.isQuickSolving = false;
      this.$solveBtn.prop("disabled", true);
      this.$quickSolveBtn.prop("disabled", true);
      this.autoSolveStep(false);
    },

    quickSolve: function () {
      if (this.isSolving || this.isQuickSolving) return;
      // 设置标记，表示快速求解模式下结束后不弹出 winMessage
      this.suppressWinMessage = true;
      this.isSolving = false;
      this.isQuickSolving = true;
      this.$solveBtn.prop("disabled", true);
      this.$quickSolveBtn.prop("disabled", true);
      this.autoSolveStep(true);
    },

    autoSolveStep: function (isQuick) {
      var self = this;
      var unsolved = this.$container
        .find(".rotating-puzzle-piece:not(.fixed)")
        .toArray();

      if (unsolved.length === 0) {
        self.isSolving = false;
        self.isQuickSolving = false;
        self.$solveBtn.prop("disabled", false);
        self.$quickSolveBtn.prop("disabled", false);
        return;
      }

      if (isQuick) {
        // 快速求解模式下，直接将所有未固定碎片调整到正确状态
        for (var i = 0; i < unsolved.length; i++) {
          var $piece = $(unsolved[i]);
          var correctPos = $piece.data("correctPos");
          $piece.css({
            "--bg-pos-x": correctPos.x + "px",
            "--bg-pos-y": correctPos.y + "px",
            rotate: "0deg",
            "transition-duration": self.config.quickSolveDuration / 1000 + "s"
          });
          $piece.data("originalPos", correctPos);
          $piece.data("rotation", 0);
        }
        // 经过 quickSolveDuration 后继续调用 autoSolveStep 以便确认全部固定
        this.autoSolveTimeout = setTimeout(function () {
          self.autoSolveStep(isQuick);
        }, self.config.quickSolveDuration);
        return;
      }

      // 以下为非快速求解模式逻辑
      var $pieceA = $(unsolved[0]);
      var correctPos = $pieceA.data("correctPos");
      var currentPos = $pieceA.data("originalPos");
      var currentRotation = $pieceA.data("rotation");

      if (
        currentPos.x === correctPos.x &&
        currentPos.y === correctPos.y &&
        currentRotation !== 0
      ) {
        self.rotatePiece($pieceA, isQuick, true);
        this.autoSolveTimeout = setTimeout(function () {
          self.autoSolveStep(isQuick);
        }, 300);
        return;
      }

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
        if (!$pieceB && unsolved.length > 1) {
          $pieceB = $(unsolved[1]);
        }
        if ($pieceB) {
          this.swapPieces($pieceA, $pieceB, true);
        }
      }

      this.autoSolveTimeout = setTimeout(function () {
        self.autoSolveStep(isQuick);
      }, 300);
    },

    rotatePiece: function ($piece, isQuick, booleanv) {
      var currentRotation = $piece.data("rotation");
      var rotationStep = this.config.isCovered ? 180 : 90;
      var newRotation = (currentRotation + rotationStep) % 360;
      if (!isQuick && !this.isSolving && !this.isQuickSolving) {
        this.moveSteps.push([$piece.data("pieceId"), newRotation]);
      }
      if (isQuick) {
        $piece
          .css({ rotate: newRotation + "deg", transition: "none" })
          .data("rotation", newRotation);
        this.checkPiecePosition($piece);
        return;
      }
      $piece
        .css({ transition: "rotate 0.3s ease", rotate: newRotation + "deg" })
        .data("rotation", newRotation);
      if (currentRotation === 270 && newRotation === 0) {
        $piece.css({ transition: "rotate 0.15s ease", rotate: "0deg" });
      }
      this.checkPiecePosition($piece, booleanv);
    },

    setContainerSize: function () {
      var img = new Image();
      var self = this;
      img.onload = function () {
        var totalWidth = img.width,
          totalHeight = img.height;
        self.imageWidth = totalWidth;
        self.imageHeight = totalHeight;
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
      for (var i = 1; i <= this.config.rows; i++) {
        for (var j = 1; j <= this.config.cols; j++) {
          this.createPiece(i, j, totalWidth, totalHeight);
        }
      }
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
      for (var i = 0; i < allPieces.length; i++) {
        this.checkPiecePosition($(allPieces[i]));
      }
      // 保存初始打乱状态（存所有碎片信息，后续转换为相对格式）
      var initialState = [];
      this.$container.find(".rotating-puzzle-piece").each(function () {
        var $piece = $(this);
        initialState.push({
          pieceId: $piece.data("pieceId"),
          rotation: parseInt($piece.data("rotation"), 10),
          originalPos: $piece.data("originalPos"),
          translateX: $piece.data("translateX"),
          translateY: $piece.data("translateY")
        });
      });
      this.initialShuffledState = initialState;
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
        if (!this.isSolving && !this.isQuickSolving) {
          this.moveSteps.push([
            this.selectedPiece.data("pieceId"),
            $piece.data("pieceId")
          ]);
        }
        this.swapPieces(this.selectedPiece, $piece);
        this.selectedPiece.removeClass("selected");
        this.selectedPiece = null;
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
        if (!this.isSolving && !this.isQuickSolving) {
          this.moveSteps.push([
            this.selectedPiece.data("pieceId"),
            $piece.data("pieceId")
          ]);
        }
        this.swapPieces(this.selectedPiece, $piece);
        this.selectedPiece.removeClass("selected");
        this.selectedPiece = null;
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

    swapPieces: function ($piece1, $piece2, booleanv) {
      var self = this;
      var piece1Data = $.extend(true, {}, $piece1.data());
      var piece2Data = $.extend(true, {}, $piece2.data());
      $piece1.css({
        transition: "translate 0.3s ease",
        translate: piece2Data.translateX + "px " + piece2Data.translateY + "px"
      });
      $piece2.css({
        transition: "translate 0.3s ease",
        translate: piece1Data.translateX + "px " + piece1Data.translateY + "px"
      });
      setTimeout(function () {
        $piece1.css("transition", "none");
        $piece2.css("transition", "none");
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
        setTimeout(function () {
          $piece1.css("transition", "all 0.3s ease");
          $piece2.css("transition", "all 0.3s ease");
        }, 300);
        self.checkPiecePosition($piece1, booleanv);
        self.checkPiecePosition($piece2, booleanv);
      }, 300);
    },

    quickSwapPieces: function ($piece1, $piece2) {
      requestAnimationFrame(
        function () {
          var tempBgPosX = $piece1.css("--bg-pos-x");
          var tempBgPosY = $piece1.css("--bg-pos-y");
          $piece1.css({
            "--bg-pos-x": $piece2.css("--bg-pos-x"),
            "--bg-pos-y": $piece2.css("--bg-pos-y")
          });
          $piece2.css({ "--bg-pos-x": tempBgPosX, "--bg-pos-y": tempBgPosY });
          var tempOriginalPos = $piece1.data("originalPos");
          $piece1.data("originalPos", $piece2.data("originalPos"));
          $piece2.data("originalPos", tempOriginalPos);
          $piece1.data("rotation", 0).css("rotate", "0deg");
          $piece2.data("rotation", 0).css("rotate", "0deg");
          this.checkPiecePosition($piece1);
          this.checkPiecePosition($piece2);
        }.bind(this)
      );
    },

    checkPiecePosition: function ($piece, booleanv) {
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
      } else {
        $piece.removeClass("fixed");
      }

      if (!booleanv) {
        this.checkGameCompletion();
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
      console.log("游戏完成，显示弹出框");
      this.$container.addClass("rotating-puzzle-game-over");
      var winMsg = $("<div>").addClass("win-message").text("拼图完成!");
      var restartBtn = $("<button>").addClass("restart-btn").text("再玩一次");
      var saveRecordBtn = $("<button>")
        .addClass("save-game-btn")
        .text("保存记录")
        .on("click", $.proxy(this.saveGameData, this));
      var showOriginalBtn = $("<button>")
        .addClass("show-original-btn")
        .text("显示原图");
      this.$winPopup = $("<div>")
        .addClass("win-popup")
        .append(winMsg)
        .append(restartBtn)
        .append(saveRecordBtn)
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
      // 重置自动求解标记，使手动操作结束后可正常弹出 winMessage
      this.suppressWinMessage = false;
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
        self.moveSteps = [];
        self.initialShuffledState = null;
        self.setContainerSize();
      }, 300);
    },

    // 保存游戏数据，同时转换碎片数据为紧凑格式
    saveGameData: function () {
      var username = mw.config.get("wgUserName");
      if (!username) {
        mw.notify("请先登录以保存记录", { type: "warn" });
        return;
      }

      var rows = this.config.rows,
        cols = this.config.cols;
      var relativePieces = new Array(rows * cols);

      for (var i = 0; i < rows * cols; i++) {
        // 计算目标坑的行列号，按行优先（1-based）
        var r = Math.floor(i / cols) + 1,
          c = (i % cols) + 1;

        // 对于非覆盖模式下固定边缘坑，直接用空数组占位
        if (
          !this.config.isCovered &&
          (r === 1 || r === rows || c === 1 || c === cols)
        ) {
          relativePieces[i] = [];
        } else {
          // 得到正确应在该坑的碎片 id，例如 "2-2"
          var expectedId = r + "-" + c;
          var pieceData = null;
          // 从初始打乱状态中查找该碎片
          for (var k = 0; k < this.initialShuffledState.length; k++) {
            if (this.initialShuffledState[k].pieceId === expectedId) {
              pieceData = this.initialShuffledState[k];
              break;
            }
          }

          if (pieceData) {
            // 遍历所有坑，找到与 pieceData.originalPos 匹配的坑编号
            var foundIndex = -1;
            for (var j = 0; j < rows * cols; j++) {
              var r2 = Math.floor(j / cols) + 1,
                c2 = (j % cols) + 1;
              // 对于非覆盖模式，边缘坑不参与比对
              if (
                !this.config.isCovered &&
                (r2 === 1 || r2 === rows || c2 === 1 || c2 === cols)
              ) {
                continue;
              }
              var expectedBg;
              if (this.config.isCovered) {
                // cover 模式下，均分父容器，预期背景位置为：
                // -(c2-1)*pieceSize, -(r2-1)*pieceSize
                expectedBg = {
                  x: -((c2 - 1) * this.pieceSize),
                  y: -(((r2 - 1) * this.imageHeight) / cols)
                };
              } else {
                // 非覆盖模式下，内侧坑预期背景位置
                expectedBg = {
                  x: -(this.edgePieceWidth + (c2 - 2) * this.pieceSize),
                  y: -(this.edgePieceHeight + (r2 - 2) * this.pieceSize)
                };
              }
              if (
                Math.abs(expectedBg.x - pieceData.originalPos.x) < 1e-4 &&
                Math.abs(expectedBg.y - pieceData.originalPos.y) < 1e-4
              ) {
                foundIndex = j;
                break;
              }
            }
            // 若没有匹配则用空数组占位
            if (foundIndex === -1) {
              relativePieces[i] = [];
            } else {
              // 根据模式，只记录有变化的变量
              if (this.config.mode === "rotate") {
                relativePieces[i] = pieceData.rotation;
              } else if (this.config.mode === "translate") {
                relativePieces[i] = foundIndex;
              } else {
                relativePieces[i] = [pieceData.rotation, foundIndex];
              }
            }
          } else {
            relativePieces[i] = [];
          }
        }
      }

      var saveData = {
        timestamp: new Date().toISOString(),
        cover: this.config.isCovered,
        mode: this.config.mode,
        imageName:
          this.$image.attr("data-image-name") ||
          this.$image.attr("src").split("/").pop(),
        imageSize: { width: this.imageWidth, height: this.imageHeight },
        moveSteps: this.moveSteps,
        page: mw.config.get("wgPageName"),
        rows: rows,
        cols: cols,
        relativePieces: relativePieces
      };

      var pageTitle = "User:" + username + "/RotatingPuzzle/Data";
      var api = new mw.Api();

      // 先检查是否已有相同数据（忽略 timestamp 字段）
      api
        .get({
          action: "query",
          prop: "revisions",
          rvprop: "content",
          titles: pageTitle,
          format: "json"
        })
        .done(
          function (data) {
            var pages = data.query.pages;
            var pageId = Object.keys(pages)[0];
            var existingContent = {};

            if (pages[pageId].revisions) {
              try {
                existingContent = JSON.parse(pages[pageId].revisions[0]["*"]);
              } catch (e) {
                existingContent = {};
              }
            }

            var isDuplicate = Object.keys(existingContent).some(function (key) {
              var record = existingContent[key];

              var recordWithoutTimestamp = {
                cover: record.cover,
                mode: record.mode,
                pieceSize: record.pieceSize,
                imageName: record.imageName,
                imageSize: record.imageSize,
                moveSteps: record.moveSteps,
                page: record.page,
                rows: record.rows,
                cols: record.cols,
                relativePieces: record.relativePieces
              };

              var saveDataWithoutTimestamp = {
                cover: saveData.cover,
                mode: saveData.mode,
                pieceSize: saveData.pieceSize,
                imageName: saveData.imageName,
                imageSize: saveData.imageSize,
                moveSteps: saveData.moveSteps,
                page: saveData.page,
                rows: saveData.rows,
                cols: saveData.cols,
                relativePieces: saveData.relativePieces
              };

              return (
                JSON.stringify(recordWithoutTimestamp) ===
                JSON.stringify(saveDataWithoutTimestamp)
              );
            });

            if (isDuplicate) {
              mw.notify("已有相同数据，不重复保存", { type: "warn" });
              return;
            }

            var recordId = "record_" + Date.now();
            existingContent[recordId] = saveData;

            api
              .postWithEditToken({
                action: "edit",
                title: pageTitle,
                text: JSON.stringify(existingContent, null, 2),
                summary:
                  "在页面[[" +
                  saveData.page +
                  "]]上以" +
                  this.moveSteps.length +
                  "步的成绩完成了图为[[File:" +
                  saveData.imageName +
                  "]]的 " +
                  rows * cols +
                  "格拼图。",
                format: "json",
                contentmodel: "json"
              })
              .done(function () {
                mw.notify("游戏记录已保存！", { type: "success" });
              })
              .fail(function (error) {
                console.error("保存失败:", error);
                mw.notify("保存失败: " + error, { type: "error" });
              });
          }.bind(this)
        )
        .fail(function (error) {
          console.error("获取现有数据失败:", error);
          mw.notify("保存失败: " + error, { type: "error" });
        });
    }
  };
  // 确保用户主页存在
  function ensureUserPageExists(username) {
    var userPageTitle = "User:" + username + "/RotatingPuzzle";
    var api = new mw.Api();

    api
      .get({
        action: "query",
        prop: "info",
        titles: userPageTitle,
        format: "json"
      })
      .done(function (data) {
        var pages = data.query.pages;
        var pageId = Object.keys(pages)[0];

        if (pageId === "-1") {
          // 页面不存在，创建它
          api
            .postWithEditToken({
              action: "edit",
              title: userPageTitle,
              text: '<div class="rotating-puzzle--demo-container"></div>',
              summary: "创建拼图游戏展示页",
              format: "json",
              createonly: true
            })
            .fail(function (error) {
              console.error("创建用户页面失败:", error);
            });
        }
      });
  }
  
  window.RotatingPuzzleGame = RotatingPuzzleGame;
  
  $(document).ready(function () {
    $(".rotating-puzzle").each(function () {
      var game = new RotatingPuzzleGame($(this));
      game.init();
    });
  });
})(jQuery);

$(document).ready(function() {
  // 从URL解析用户名
  function getTargetUsername() {
    var pageName = mw.config.get('wgPageName');
    var parts = pageName.split('/');
    if (parts.length >= 2 && parts[0].startsWith('User:')) {
      return parts[0].substring(5);
    }
    return null;
  }

  // 显示旋转拼图记录
  function displayRotatingRecords(username) {
    var pageTitle = 'User:' + username + '/RotatingPuzzle/Data';
    var api = new mw.Api();
    
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
        $('#mw-content-text').html('<div class="no-records">用户 ' + username + ' 暂无旋转拼图游戏记录</div>');
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

  // 渲染记录页面
  function renderRecordsPage(recordsData, username) {
    $('#mw-content-text').empty();
    
    // 统计信息
    var recordCount = 0;
    var minSteps = Infinity;
    var maxDifficulty = 0;
    var recordsList = [];
    var currentHighlightRecord = null;

    // 处理每条记录
    for (var recordId in recordsData) {
      if (recordsData.hasOwnProperty(recordId)) {
        var record = recordsData[recordId];
        recordCount++;
        
        // 计算最少步数
        if (record.moveSteps && record.moveSteps.length < minSteps) {
          minSteps = record.moveSteps.length;
        }
        
        // 计算难度（考虑覆盖模式）
        var difficulty = !record.cover ? 
          (record.rows - 2) * (record.cols - 2) : 
          record.rows * record.cols;
        
        if (difficulty > maxDifficulty) {
          maxDifficulty = difficulty;
        }
        
        recordsList.push({
          id: recordId,
          timestamp: record.timestamp,
          page: record.page || '未知页面',
          steps: record.moveSteps ? record.moveSteps.length : 0,
          imageName: record.imageName || '未知图片',
          rows: record.rows,
          cols: record.cols,
          imageSize: record.imageSize || { width: 400, height: 300 },
          mode: record.mode || 'default',
          cover: record.cover || false,
          moveSteps: record.moveSteps || [],
          relativePieces: record.relativePieces || []
        });
      }
    }

    if (recordCount === 0) {
      $('#mw-content-text').html('<div class="no-records">暂无旋转拼图游戏记录</div>');
      return;
    }

    // 按时间倒序排序
    recordsList.sort(function(a, b) {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    // 渲染统计面板
    var $panel = $(
      '<div class="rotating-puzzle-panel">' +
      '<span>这个用户已经完成了<span class="rotating-puzzle-panel-num">' + recordCount + '</span>次拼图小游戏</span>' +
      '<span>其中</span>' + 
      '<span>最少步数<span class="rotating-puzzle-panel-num">' + (minSteps === Infinity ? 0 : minSteps) + '</span>步</span>' +
      '<span>最高难度<span class="rotating-puzzle-panel-num">' + maxDifficulty + '</span>格</span>' +
      '</div>'
    );
    $('#mw-content-text').append($panel);

    // 渲染记录列表
    var $list = $('<div class="rotating-puzzle-list timeline with-time"></div>');

    // 演示区域容器
    var $demoContainer = $('<div class="rotating-puzzle-demo-container"></div>');
    $('#mw-content-text').append($list).append($demoContainer);

    // 添加记录项
    recordsList.forEach(function(record, index) {
      var difficulty = !record.cover ? 
        (record.rows - 2) * (record.cols - 2) : 
        record.rows * record.cols;
      
      var timestamp = new Date(record.timestamp).toLocaleString();
      var pageDisc = record.page === '未知页面' ? '未知页面' : 
        '页面<a href="/wiki/' + encodeURIComponent(record.page) + '">' + record.page + '</a>';
      
      var $li = $(
        '<div class="timeline-item" data-record-id="' + record.id + '">' +
        '<div class="timeline-item">' +
        '<div class="chevron-out">' +
        '<div class="chevron-in-left"><div>' + timestamp + '</div></div>' +
        '<div class="chevron-in-right"></div></div>' +
        '<div><div class="timeline-text">在' + pageDisc + '上以' +
        '<span class="rotating-puzzle-record-steps">' + record.steps + '</span>步完成' +
        '<a href="/wiki/File:' + encodeURIComponent(record.imageName) + '">' + record.imageName + '</a>的' +
        '<span class="rotating-puzzle-record-difficulty">' + difficulty + '</span>格拼图' +
        (record.cover ? '(边缘固定)' : '') + '</div></div></div>'
      );
      
      // 默认选中第一条
      if (index === 0) {
        $li.addClass('highlight');
        currentHighlightRecord = record;
        loadDemoGame(record, $demoContainer);
      }
      
      $li.on('click', function(e) {
        if (e.target.tagName === 'A') return;
        $list.find('.timeline-item').removeClass('highlight');
        $li.addClass('highlight');
        currentHighlightRecord = record;
        loadDemoGame(record, $demoContainer);
      });
      
      $list.append($li);
    });
  }

  // 加载演示游戏
  function loadDemoGame(record, $container) {
    $container.empty().html('<div class="loading">加载游戏中...</div>');
    
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
        renderDemoGame(record, pages[pageId].imageinfo[0].thumburl, $container);
      } else {
        $container.html('<div class="error">无法获取图片URL</div>');
      }
    }).fail(function(error) {
      $container.html('<div class="error">加载游戏图片失败</div>');
    });
  }

  // 渲染演示游戏
  function renderDemoGame(record, imageUrl, $container) {
    $container.empty();
    
    // 创建游戏结构
    var $game = $(
      '<div class="rotating-puzzle" ' + 
      'data-row="' + record.rows + '" ' +
      'data-col="' + record.cols + '" ' +
      'data-mode="' + record.mode + '" ' +
      'data-cover="' + record.cover + '">' +
      '<div class="rotating-puzzle-img">' +
      '<img src="' + imageUrl + '" ' +
      'width="' + record.imageSize.width + '" ' +
      'height="' + record.imageSize.height + '" ' +
      'data-image-name="' + record.imageName + '">' +
      '</div>' +
      '</div>'
    );
    
    // 添加控制按钮
    var $controls = $(
      '<div class="rotating-puzzle-controls">' +
      '<button class="demo-btn cdx-button">开始演示</button>' +
      '</div>'
    );
    
    $container.append($controls).append($game);
    initDemoGame($game, record);
  }

  // 初始化演示游戏
  function initDemoGame($game, record) {
    // 初始化游戏实例
    var game = new RotatingPuzzleGame($game);
    game.init();
    
    // 禁用用户交互
    $game.find(".rotating-puzzle-piece").off("click contextmenu");
    
    // 转换并应用初始状态
    var convertedPieces = convertRelativePieces(record, game);
    applyInitialState(game, convertedPieces, record);
    
    // 绑定演示按钮
    var isDemoing = false;
    var demoTimeout = null;
    var $demoBtn = $game.parent().find('.demo-btn');
    
    $demoBtn.on('click', function() {
      if (isDemoing) {
        resetDemo();
      } else {
        startDemo();
      }
    });
    
    function startDemo() {
      if (isDemoing || !record.moveSteps || record.moveSteps.length === 0) return;
      
      isDemoing = true;
      $demoBtn.text('演示中...').prop('disabled', true);
      
      var steps = convertMoveSteps(record.moveSteps);
      var currentStep = 0;
      
      function executeStep() {
        if (currentStep >= steps.length) {
          endDemo();
          return;
        }
        
        var step = steps[currentStep++];
        var $piece, $target;
        
        if (step.type === 'rotate') {
          $piece = game.$container.find('[data-piece-id="' + step.pieceId + '"]');
          if ($piece.length) {
            game.rotatePiece($piece, false);
          }
        } else {
          $piece = game.$container.find('[data-piece-id="' + step.piece1 + '"]');
          $target = game.$container.find('[data-piece-id="' + step.piece2 + '"]');
          if ($piece.length && $target.length) {
            game.swapPieces($piece, $target);
          }
        }
        
        demoTimeout = setTimeout(executeStep, 300);
      }
      
      executeStep();
    }
    
    function endDemo() {
      clearTimeout(demoTimeout);
      isDemoing = false;
      $demoBtn.text('重置演示').prop('disabled', false);
    }
    
    function resetDemo() {
      clearTimeout(demoTimeout);
      isDemoing = false;
      game.resetGame();
      var converted = convertRelativePieces(record, game);
      applyInitialState(game, converted, record);
      $demoBtn.text('开始演示').prop('disabled', false);
    }
  }

  // RotatingPuzzleGame 类
  function RotatingPuzzleGame($container) {
    this.$container = $container;
    this.config = {
      rows: parseInt($container.attr('data-row')) || 3,
      cols: parseInt($container.attr('data-col')) || 3,
      mode: $container.attr('data-mode') || 'default',
      isCovered: $container.attr('data-cover') === 'true',
      quickSolveDuration: 1000
    };
    this.$piecesContainer = null;
    this.$image = $container.find('img');
    this.pieceWidth = 0;
    this.pieceHeight = 0;
    this.imageWidth = 0;
    this.imageHeight = 0;
  }

  RotatingPuzzleGame.prototype = {
    init: function() {
      this.$piecesContainer = $('<div class="rotating-puzzle-piece-container"></div>');
      this.$container.append(this.$piecesContainer);
      this.setContainerSize();
    },
    
    setContainerSize: function() {
      var img = new Image();
      var self = this;
      img.onload = function() {
        self.imageWidth = img.width;
        self.imageHeight = img.height;
        
        if (self.config.isCovered) {
          self.pieceWidth = self.imageWidth / self.config.cols;
          self.pieceHeight = self.imageHeight / self.config.rows;
        } else {
          var criticalWidth = self.imageWidth / self.config.cols;
          var criticalHeight = self.imageHeight / self.config.rows;
          var pieceSize = Math.min(criticalWidth, criticalHeight);
          self.pieceWidth = pieceSize;
          self.pieceHeight = pieceSize;
        }
        
        self.$container.css({
          width: self.imageWidth + 'px',
          height: self.imageHeight + 'px'
        });
        
        self.createPuzzlePieces();
      };
      img.src = this.$image.attr('src');
    },
    
    createPuzzlePieces: function() {
      var totalWidth = this.imageWidth;
      var totalHeight = this.imageHeight;
      
      for (var row = 1; row <= this.config.rows; row++) {
        for (var col = 1; col <= this.config.cols; col++) {
          this.createPiece(row, col, totalWidth, totalHeight);
        }
      }
    },
    
    createPiece: function(row, col, totalWidth, totalHeight) {
      var isEdge = !this.config.isCovered && 
                  (row === 1 || row === this.config.rows || 
                   col === 1 || col === this.config.cols);
      
      var $piece = $('<div class="rotating-puzzle-piece"></div>');
      var pieceId = row + '-' + col;
      
      // 计算位置
      var translateX, translateY;
      if (this.config.isCovered) {
        translateX = (col - 1) * this.pieceWidth;
        translateY = (row - 1) * this.pieceHeight;
      } else {
        translateX = col === 1 ? 0 : 
                   (col === this.config.cols ? totalWidth - this.pieceWidth : 
                   ((col - 2) * this.pieceWidth + this.pieceWidth/2));
        translateY = row === 1 ? 0 : 
                   (row === this.config.rows ? totalHeight - this.pieceHeight : 
                   ((row - 2) * this.pieceHeight + this.pieceHeight/2));
      }
      
      // 背景位置
      var bgPosX = -(col - 1) * this.pieceWidth;
      var bgPosY = -(row - 1) * this.pieceHeight;
      
      $piece.css({
        '--bg-pos-x': bgPosX + 'px',
        '--bg-pos-y': bgPosY + 'px',
        'transform': 'translate(' + translateX + 'px, ' + translateY + 'px)',
        'width': this.pieceWidth + 'px',
        'height': this.pieceHeight + 'px'
      }).data({
        pieceId: pieceId,
        correctPos: { x: bgPosX, y: bgPosY },
        originalPos: { x: bgPosX, y: bgPosY },
        rotation: 0
      });
      
      if (!isEdge) {
        $piece.on("click", $.proxy(this.onPieceClick, this));
      } else {
        $piece.addClass('edge fixed');
      }
      
      this.$piecesContainer.append($piece);
    },
    
    onPieceClick: function() {
      // 演示模式下禁用交互
      return false;
    },
    
    rotatePiece: function($piece, isQuick, callback) {
      var currentRotation = $piece.data('rotation') || 0;
      var rotationStep = this.config.isCovered ? 180 : 90;
      var newRotation = (currentRotation + rotationStep) % 360;
      
      $piece.css({
        'transition': isQuick ? 'none' : 'rotate 0.3s ease',
        'rotate': newRotation + 'deg'
      }).data('rotation', newRotation);
      
      if (callback) {
        setTimeout(callback, isQuick ? 0 : 300);
      }
    },
    
    swapPieces: function($piece1, $piece2, callback) {
      var self = this;
      
      // 交换背景位置
      var bgPos1 = $piece1.css('--bg-pos-x') + ' ' + $piece1.css('--bg-pos-y');
      var bgPos2 = $piece2.css('--bg-pos-x') + ' ' + $piece2.css('--bg-pos-y');
      
      $piece1.css({
        'transition': 'all 0.3s ease',
        '--bg-pos-x': bgPos2.split(' ')[0],
        '--bg-pos-y': bgPos2.split(' ')[1]
      });
      
      $piece2.css({
        'transition': 'all 0.3s ease',
        '--bg-pos-x': bgPos1.split(' ')[0],
        '--bg-pos-y': bgPos1.split(' ')[1]
      });
      
      // 交换数据
      var tempPos = $piece1.data('originalPos');
      $piece1.data('originalPos', $piece2.data('originalPos'));
      $piece2.data('originalPos', tempPos);
      
      if (callback) {
        setTimeout(callback, 300);
      }
    },
    
    checkPiecePosition: function($piece, suppressCheck) {
      var currentPos = $piece.data('originalPos');
      var correctPos = $piece.data('correctPos');
      var isCorrect = currentPos.x === correctPos.x && currentPos.y === correctPos.y;
      var rotation = parseInt($piece.data('rotation'), 10) % 360;
      
      if (isCorrect && rotation === 0) {
        $piece.addClass('fixed');
      } else {
        $piece.removeClass('fixed');
      }
    },
    
    resetGame: function() {
      this.$piecesContainer.empty();
      this.init();
    }
  };

  // 数据转换：relativePieces => 游戏状态
  function convertRelativePieces(record, game) {
    var converted = [];
    var rows = record.rows;
    var cols = record.cols;
    
    game.$container.find('.rotating-puzzle-piece').each(function() {
      var $piece = $(this);
      var pieceId = $piece.data('pieceId');
      var pos = pieceId.split('-');
      var r = parseInt(pos[0]), c = parseInt(pos[1]);
      var index = (r-1)*cols + (c-1);
      
      // 跳过边缘碎片（非覆盖模式）
      if (!record.cover && (r === 1 || r === rows || c === 1 || c === cols)) {
        converted[index] = null;
        return;
      }
      
      var storedData = record.relativePieces[index];
      if (!storedData || storedData.length === 0) {
        converted[index] = null;
        return;
      }
      
      // 根据模式转换数据
      var convertedData = {
        rotation: 0,
        targetIndex: index
      };
      
      if (record.mode === 'rotate') {
        convertedData.rotation = storedData;
      } else if (record.mode === 'translate') {
        convertedData.targetIndex = storedData;
      } else {
        convertedData.rotation = storedData[0];
        convertedData.targetIndex = storedData[1];
      }
      
      converted[index] = convertedData;
    });
    
    return converted;
  }

  // 数据转换：moveSteps => 演示步骤
  function convertMoveSteps(moveSteps) {
    return (moveSteps || []).map(function(step) {
      return typeof step[1] === 'number' ? 
        { type: 'rotate', pieceId: step[0], rotation: step[1] } : 
        { type: 'swap', piece1: step[0], piece2: step[1] };
    });
  }

  // 应用初始状态
function applyInitialState(game, convertedPieces, record) {
    var cols = record.cols;
    
    // 首先重置所有碎片到正确位置
    game.$container.find('.rotating-puzzle-piece').each(function() {
        var $piece = $(this);
        var pieceId = $piece.data('pieceId');
        var pos = pieceId.split('-');
        var r = parseInt(pos[0]), c = parseInt(pos[1]);
        var index = (r-1)*cols + (c-1);
        
        // 重置到正确位置
        var correctPos = $piece.data('correctPos');
        $piece.css({
            '--bg-pos-x': correctPos.x + 'px',
            '--bg-pos-y': correctPos.y + 'px'
        }).data('originalPos', correctPos);
    });
    
    // 然后应用打乱状态
    convertedPieces.forEach(function(data, index) {
        if (!data) return; // 保持边缘碎片不变
        
        var r = Math.floor(index / cols) + 1;
        var c = (index % cols) + 1;
        var pieceId = r + '-' + c;
        var $piece = game.$container.find('[data-piece-id="' + pieceId + '"]');
        
        // 应用旋转
        if (data.rotation !== 0) {
            $piece.css('rotate', data.rotation + 'deg')
                 .data('rotation', data.rotation);
        }
        
        // 应用平移
        if (data.targetIndex !== index) {
            var targetR = Math.floor(data.targetIndex / cols) + 1;
            var targetC = (data.targetIndex % cols) + 1;
            var $target = game.$container.find('[data-piece-id="' + targetR + '-' + targetC + '"]');
            
            if ($target.length) {
                // 交换背景位置
                var tempBgX = $piece.css('--bg-pos-x');
                var tempBgY = $piece.css('--bg-pos-y');
                $piece.css({
                    '--bg-pos-x': $target.css('--bg-pos-x'),
                    '--bg-pos-y': $target.css('--bg-pos-y')
                });
                $target.css({
                    '--bg-pos-x': tempBgX,
                    '--bg-pos-y': tempBgY
                });
                
                // 交换数据
                var tempPos = $piece.data('originalPos');
                $piece.data('originalPos', $target.data('originalPos'));
                $target.data('originalPos', tempPos);
            }
        }
        
        game.checkPiecePosition($piece, true);
    });
}
  // 页面初始化
  var targetUsername = getTargetUsername();
  if (targetUsername && mw.config.get('wgPageName') === 'User:' + targetUsername + '/RotatingPuzzle') {
    displayRotatingRecords(targetUsername);
  }
});