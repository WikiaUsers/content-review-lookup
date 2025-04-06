(function() {
    /* 游戏配置 - 从HTML属性读取或使用默认值5 */
    var RotatingPuzzleConfig = {
        rows: Math.max(3, Math.min(8, parseInt($('.rotating-puzzle').attr('data-row')) || 5)),
        cols: Math.max(3, Math.min(8, parseInt($('.rotating-puzzle').attr('data-col')) || 5))
    };

    /* 游戏主对象 */
    var RotatingPuzzleGame = {
        init: function() {
            // 隐藏无JS提示
            $('.rotating-puzzle-no-js').hide();
            
            // 初始化变量
            this.$container = $('.rotating-puzzle');
            this.$imageContainer = $('.rotating-puzzle-img');
            this.$image = $('.rotating-puzzle-img img');
            
            this.originalPositions = {};
            this.selectedPiece = null;
            this.$winPopup = null;
            
            // 创建新的碎片容器
            this.$piecesContainer = $('<div>').addClass('rotating-puzzle-piece-container');
            this.$container.append(this.$piecesContainer);
            
            this.setContainerSize();
        },
        
        setContainerSize: function() {
            var img = new Image();
            var self = this;
            img.onload = function() {
                self.$container.css({
                    width: img.width + 'px',
                    height: img.height + 'px'
                });
                self.onImageReady(img.width, img.height);
            };
            img.src = this.$image.attr('src');
        },
        
        onImageReady: function(imgWidth, imgHeight) {
            this.calculatePieceSizes(imgWidth, imgHeight);
            this.createPuzzlePieces();
            this.shuffleAndRotatePieces();
        },
        
        createPuzzlePieces: function() {
            var totalWidth = this.$container.width();
            var totalHeight = this.$container.height();
            var imageUrl = this.$image.attr('src');
            
            this.$piecesContainer.css({
                'grid-template-columns': this.generateGridTemplate(RotatingPuzzleConfig.cols, totalWidth, 'width'),
                'grid-template-rows': this.generateGridTemplate(RotatingPuzzleConfig.rows, totalHeight, 'height')
            });
            
            // 创建所有碎片
            for (var i = 1; i <= RotatingPuzzleConfig.rows; i++) {
                for (var j = 1; j <= RotatingPuzzleConfig.cols; j++) {
                    var isEdge = i === 1 || i === RotatingPuzzleConfig.rows || 
                                j === 1 || j === RotatingPuzzleConfig.cols;
                    
                    var $piece = $('<div>').addClass('rotating-puzzle-piece')
                        .css('grid-column', j)
                        .css('grid-row', i);
                    
                    var width = this.calculatePieceDimension(j, RotatingPuzzleConfig.cols, totalWidth, 'width');
                    var height = this.calculatePieceDimension(i, RotatingPuzzleConfig.rows, totalHeight, 'height');
                    
                    $piece.css({
                        width: width + 'px',
                        height: height + 'px'
                    });
                    
                    var bgPos = this.calculateBackgroundPosition(i, j, width, height, totalWidth, totalHeight);
                    $piece.css({
                        'background-image': 'url(' + imageUrl + ')',
                        'background-position': bgPos.x + 'px ' + bgPos.y + 'px',
                        'background-size': totalWidth + 'px ' + totalHeight + 'px'
                    });
                    
                    var pieceId = i + '-' + j;
                    this.originalPositions[pieceId] = {
                        bgPosX: bgPos.x,
                        bgPosY: bgPos.y,
                        row: i,
                        col: j
                    };
                    
                    if (isEdge) {
                        $piece.addClass('edge fixed');
                    } else {
                        $piece.on('click', $.proxy(this.onPieceLeftClick, this));
                        $piece.on('contextmenu', $.proxy(this.onPieceRightClick, this));
                    }
                    
                    $piece.data({
                        rotation: 0,
                        originalPos: bgPos,
                        correctPos: bgPos,
                        pieceId: pieceId,
                        isInOriginalPos: true
                    });
                    
                    this.$piecesContainer.append($piece);
                }
            }
        },
        
        shuffleAndRotatePieces: function() {
            var movablePieces = $('.rotating-puzzle-piece:not(.edge)').toArray();
            var positions = [];
            
            // 收集所有正确位置
            for (var i = 0; i < movablePieces.length; i++) {
                positions.push($(movablePieces[i]).data('correctPos'));
            }
            
            // Fisher-Yates 洗牌算法
            for (var i = positions.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                [positions[i], positions[j]] = [positions[j], positions[i]];
            }
            
            // 应用打乱后的位置
            for (var i = 0; i < movablePieces.length; i++) {
                var $piece = $(movablePieces[i]);
                var newPos = positions[i];
                
                $piece.css('background-position', newPos.x + 'px ' + newPos.y + 'px');
                $piece.data('originalPos', newPos);
                $piece.data('isInOriginalPos', 
                    newPos.x === $piece.data('correctPos').x && 
                    newPos.y === $piece.data('correctPos').y);
            }
            
            // 随机旋转非边缘碎片
            var rotations = [0, 90, 180, 270];
            for (var i = 0; i < movablePieces.length; i++) {
                var $piece = $(movablePieces[i]);
                var randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
                $piece.data('rotation', randomRotation)
                     .css('transform', 'rotate(' + randomRotation + 'deg)');
            }
        },
        
        onPieceLeftClick: function(e) {
            e.preventDefault();
            var $piece = $(e.currentTarget);
            
            if ($piece.hasClass('fixed')) return;
            
            if (this.selectedPiece) {
                if (this.selectedPiece.data('pieceId') === $piece.data('pieceId')) {
                    this.selectedPiece.removeClass('selected');
                    this.selectedPiece = null;
                    return;
                }
                
                // 交换背景位置
                var tempBgPos = this.selectedPiece.css('background-position');
                this.selectedPiece.css('background-position', $piece.css('background-position'));
                $piece.css('background-position', tempBgPos);
                
                // 交换原始位置数据
                var tempOriginalPos = this.selectedPiece.data('originalPos');
                this.selectedPiece.data('originalPos', $piece.data('originalPos'));
                $piece.data('originalPos', tempOriginalPos);
                
                // 交换旋转角度
                var tempRotation = this.selectedPiece.data('rotation');
                this.selectedPiece.data('rotation', $piece.data('rotation'));
                $piece.data('rotation', tempRotation);
                
                // 应用旋转角度
                this.selectedPiece.css('transform', 'rotate(' + this.selectedPiece.data('rotation') + 'deg)');
                $piece.css('transform', 'rotate(' + $piece.data('rotation') + 'deg)');
                
                // 检查位置状态
                this.checkPiecePosition(this.selectedPiece);
                this.checkPiecePosition($piece);
                
                this.selectedPiece.removeClass('selected');
                this.selectedPiece = null;
                this.checkGameCompletion();
            } else {
                this.selectedPiece = $piece;
                $piece.addClass('selected');
            }
        },
        
        onPieceRightClick: function(e) {
            e.preventDefault();
            var $piece = $(e.currentTarget);
            
            if ($piece.hasClass('fixed')) return;
            
            if (this.selectedPiece) {
                this.selectedPiece.removeClass('selected');
                this.selectedPiece = null;
            }
            
            var currentRotation = $piece.data('rotation');
            var newRotation = (currentRotation + 90) % 360;
            
            // 处理从270°到0°的特殊情况
            if (currentRotation === 270 && newRotation === 0) {
                $piece.css({
                    'transition': 'transform 0.3s ease',
                    'transform': 'rotate(360deg)'
                });
                
                var self = this;
                setTimeout(function() {
                    $piece.css({
                        'transition': 'transform 0s',
                        'transform': 'rotate(0deg)'
                    });
                    
                    requestAnimationFrame(function() {
                        $piece.css('transition', 'transform 0.3s ease');
                    });
                    
                    $piece.data('rotation', 0);
                    self.checkPiecePosition($piece);
                    
                    if ($piece.hasClass('fixed')) {
                        $piece.addClass('highlight');
                        setTimeout(function() {
                            $piece.removeClass('highlight');
                            self.checkGameCompletion();
                        }, 500);
                    }
                }, 300);
            } else {
                $piece.data('rotation', newRotation)
                     .css('transform', 'rotate(' + newRotation + 'deg)');
                
                this.checkPiecePosition($piece);
                
                if ($piece.hasClass('fixed')) {
                    $piece.addClass('highlight');
                    var self = this;
                    setTimeout(function() {
                        $piece.removeClass('highlight');
                        self.checkGameCompletion();
                    }, 500);
                }
            }
        },
        
        checkPiecePosition: function($piece) {
            var currentPos = $piece.data('originalPos');
            var correctPos = $piece.data('correctPos');
            
            var isInOriginalPos = (currentPos.x === correctPos.x && currentPos.y === correctPos.y);
            $piece.data('isInOriginalPos', isInOriginalPos);
            
            if (isInOriginalPos && $piece.data('rotation') === 0) {
                if (!$piece.hasClass('fixed')) {
                    $piece.addClass('fixed');
                    this.showPieceCelebration($piece);
                }
            } else if ($piece.hasClass('fixed') && !$piece.hasClass('edge')) {
                $piece.removeClass('fixed');
            }
        },
        
        checkGameCompletion: function() {
            var allCorrect = true;
            var movablePieces = $('.rotating-puzzle-piece:not(.edge)');
            
            movablePieces.each(function() {
                if (!$(this).hasClass('fixed')) {
                    allCorrect = false;
                    return false;
                }
            });
            
            if (allCorrect) {
                this.showWinMessage();
            }
        },
        
        showWinMessage: function() {
            this.$container.addClass('rotating-puzzle-game-over');
            
            var winMsg = $('<div>').addClass('win-message').text('拼图完成!');
            var restartBtn = $('<button>').addClass('restart-btn').text('再玩一次');
            var showOriginalBtn = $('<button>').addClass('show-original-btn').text('显示原图');
            
            this.$winPopup = $('<div>').addClass('win-popup')
                .append(winMsg)
                .append(restartBtn)
                .append(showOriginalBtn);
            
            this.$container.append(this.$winPopup);
            
            var self = this;
            restartBtn.on('click', function() {
                self.resetGame();
            });
            
            showOriginalBtn.on('click', function() {
                self.$container.children().not(self.$imageContainer).hide();
                self.$container.removeClass('rotating-puzzle-game-over');
            });
        },
        
        resetGame: function() {
            // 添加淡出动画
            this.$container.addClass('fade-out');
            
            var self = this;
            setTimeout(function() {
                self.$container.removeClass('fade-out rotating-puzzle-game-over');
                
                // 清除所有事件监听
                $('.rotating-puzzle-piece').off('click contextmenu');
                
                // 重置状态
                self.$piecesContainer.empty();
                self.originalPositions = {};
                self.selectedPiece = null;
                
                if (self.$winPopup) {
                    self.$winPopup.remove();
                    self.$winPopup = null;
                }
                
                // 重新初始化
                self.init();
            }, 300);
        },
        
        showPieceCelebration: function($piece) {
            var pieceWidth = $piece.width();
            var pieceHeight = $piece.height();
            var particleCount = 24;
            
            var $firework = $('<div>').css({
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                pointerEvents: 'none'
            });
            
            for (var i = 0; i < particleCount; i++) {
                var angle = (Math.PI * 2) * (i / particleCount);
                var distance = 15 + Math.random() * 30;
                var tx = Math.cos(angle) * distance;
                var ty = Math.sin(angle) * distance;
                var delay = Math.random() * 0.3;
                var size = 3 + Math.random() * 3;
                
                $('<div>').addClass('firework-particle')
                    .css({
                        '--tx': tx + 'px',
                        '--ty': ty + 'px',
                        'left': '50%',
                        'top': '50%',
                        'animation-delay': delay + 's',
                        'transform': 'translate(-50%, -50%)',
                        'width': size + 'px',
                        'height': size + 'px'
                    })
                    .appendTo($firework);
            }
            
            $piece.append($firework);
            
            setTimeout(function() {
                $firework.remove();
            }, 1300);
        },
        
        /* 辅助方法 */
        calculatePieceSizes: function(totalWidth, totalHeight) {
            this.criticalWidth = totalWidth / RotatingPuzzleConfig.cols;
            this.criticalHeight = totalHeight / RotatingPuzzleConfig.rows;
            this.pieceSize = Math.min(this.criticalWidth, this.criticalHeight);
            
            this.edgePieceWidth = (totalWidth - this.pieceSize * (RotatingPuzzleConfig.cols - 2)) / 2;
            this.edgePieceHeight = (totalHeight - this.pieceSize * (RotatingPuzzleConfig.rows - 2)) / 2;
        },
        
        generateGridTemplate: function(count, totalSize, type) {
            var sizes = [];
            for (var i = 1; i <= count; i++) {
                if (i === 1 || i === count) {
                    sizes.push(type === 'width' ? this.edgePieceWidth + 'px' : this.edgePieceHeight + 'px');
                } else {
                    sizes.push(this.pieceSize + 'px');
                }
            }
            return sizes.join(' ');
        },
        
        calculatePieceDimension: function(position, total, containerSize, type) {
            if (position === 1 || position === total) {
                return type === 'width' ? this.edgePieceWidth : this.edgePieceHeight;
            }
            return this.pieceSize;
        },
        
        calculateBackgroundPosition: function(row, col, width, height, totalWidth, totalHeight) {
            var x = 0, y = 0;
            
            if (col === 1) {
                x = 0;
            } else if (col === RotatingPuzzleConfig.cols) {
                x = totalWidth - width;
            } else {
                x = this.edgePieceWidth + (col-2) * this.pieceSize;
            }
            
            if (row === 1) {
                y = 0;
            } else if (row === RotatingPuzzleConfig.rows) {
                y = totalHeight - height;
            } else {
                y = this.edgePieceHeight + (row-2) * this.pieceSize;
            }
            
            return { x: -x, y: -y };
        }
    };

    /* 初始化游戏 */
    $(document).ready(function() {
        RotatingPuzzleGame.init();
    });

})();