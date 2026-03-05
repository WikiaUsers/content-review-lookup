/* 全局游戏对象引用 - 确保已加载的游戏对象 */
var HuarongGame = window.HuarongGame || {
    init: function() { console.error("HuarongGame 未加载"); }
};

var SliderGame = window.SliderGame || {
    init: function() { console.error("SliderGame 未加载"); }
};

/* 全局游戏菜单配置 */
var GameMenuConfig = {
    // 配置数组
    configs: [
        {
            appendTo: '#filetoc',
            elementType: 'li',
            displayText: '<a href="#">小游戏</a>',
            imageSelector: '.fullImageLink img'
        },
        {
            appendTo: '.toolbar',
            elementType: 'li',
            displayText: '<a href="#">小游戏</a>',
            imageSelector: '.modalContent img'
        }
    ],
    
    // 游戏列表
    games: [
        {
            name: '华容道',
            type: 'huarong',
            rows: 3,
            cols: 3
        },
        {
            name: '滑块拼图',
            type: 'slider'
        },
        {
            name: '旋转拼图',
            type: 'rotating',
            rows: 6,
            cols: 6
        }
    ],
    
    // 初始化方法
    init: function() {
        var self = this;
        $(document).ready(function() {
            // 确保游戏对象已加载
                self.setupMenus();
        });
    },
    
    // 设置所有菜单
    setupMenus: function() {
        for (var i = 0; i < this.configs.length; i++) {
            this.setupGameMenu(this.configs[i]);
        }
        this.autoInitGames();
    },
    
    // 自动初始化页面上的游戏
    autoInitGames: function() {
        // 华容道
        if (typeof HuarongGame.init === 'function') {
            $('.huarong').each(function() {
                HuarongGame.init($(this));
            });
        }
        
        // 滑块拼图
        if (typeof SliderGame.init === 'function') {
            $('.slider-game').each(function() {
                SliderGame.init($(this));
            });
        }
        
        // 旋转拼图
        if (typeof RotatingPuzzleGame === 'function') {
            $('.rotating-puzzle').each(function() {
                try {
                    var gameInstance = new RotatingPuzzleGame($(this));
                    if (gameInstance.init) {
                        gameInstance.init();
                    }
                } catch (e) {
                    console.error('初始化旋转拼图失败:', e);
                }
            });
        }
    },
    
    // 设置游戏菜单
    setupGameMenu: function(config) {
        var $target = $(config.appendTo);
        if (!$target.length) return;
        
        // 生成游戏菜单HTML
        var gamesHTML = '';
        for (var j = 0; j < this.games.length; j++) {
            var game = this.games[j];
            gamesHTML += '<li><a href="#" class="game-link" ' +
                'data-game-type="' + game.type + '" ' +
                (game.rows ? 'data-rows="' + game.rows + '" ' : '') +
                (game.cols ? 'data-cols="' + game.cols + '" ' : '') +
                '>' + game.name + '</a></li>';
        }
        
        // 创建菜单元素
        var $menuItem = $('<' + config.elementType + '>').html(
            '<span class="custom-dropdown custom-dropdown-bottom">' +
                '<span class="wds-dropdown">' +
                    '<span class="wds-dropdown__toggle">' + config.displayText + '</span>' +
                    '<span class="wds-is-not-scrollable wds-dropdown__content">' +
                        '<ul class="games-menu">' + gamesHTML + '</ul>' +
                    '</span>' +
                '</span>' +
            '</span>'
        );
        
        $target.append($menuItem);
        
        // 绑定点击事件
        var self = this;
        $menuItem.on('click', '.game-link', function(e) {
            e.preventDefault();
            var $link = $(this);
            self.launchGame(
                $link.data('game-type'), 
                $link.data('rows'), 
                $link.data('cols'),
                $(config.imageSelector).first()
            );
        });
    },
    
    // 启动游戏
    launchGame: function(gameType, rows, cols, $imgElement) {
        
        // 获取图片名称
        var filename = this.getImageFilename($imgElement);
        
        if (!filename) {
            console.error('无法确定图片文件名');
            mw.notify('无法获取图片文件名', {type: 'error'});
            return;
        }
        
        // 计算屏幕80%的尺寸
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        var targetWidth = Math.floor(screenWidth * 0.8);
        var targetHeight = Math.floor(screenHeight * 0.8);
        
        // 使用弹窗生成器
        var popup = PopupGenerator.createPopup({
            headerText: this.getGameTitle(gameType, rows, cols) + ' - ' + filename,
            content: '<div class="game-loading">加载中...</div>',
            mode: "create",
            onOpen: function() {
                GameMenuConfig.loadGameContent(
                    popup, filename, gameType, rows, cols, targetWidth, targetHeight
                );
            }
        });
        
        popup.open();
    },
    
    // 获取游戏标题
    getGameTitle: function(gameType, rows, cols) {
        switch(gameType) {
            case 'huarong': return rows + '×' + cols + '华容道';
            case 'slider': return '滑块拼图';
            case 'rotating': return rows + '×' + cols + '旋转拼图';
            default: return '小游戏';
        }
    },
    
    // 获取图片文件名
    getImageFilename: function($imgElement) {
        if (!$imgElement || !$imgElement.length) {
            return mw.config.get('wgTitle');
        }
        
        // 1. 尝试从data属性获取
        var filename = $imgElement.attr('data-image-name') || $imgElement.attr('data-file-name');
        
        // 2. 如果data属性为空，则从src中提取
        if (!filename && $imgElement.attr('src')) {
            var src = $imgElement.attr('src');
            var lastSlashIndex = src.lastIndexOf('/');
            if (lastSlashIndex !== -1) {
                filename = src.substring(lastSlashIndex + 1);
                var questionMarkIndex = filename.indexOf('?');
                if (questionMarkIndex !== -1) {
                    filename = filename.substring(0, questionMarkIndex);
                }
                try {
                    filename = decodeURIComponent(filename);
                } catch (e) {
                    console.warn('解码文件名失败:', e);
                }
            }
        }
        
        return filename || mw.config.get('wgTitle');
    },
    
    // 加载游戏内容
    loadGameContent: function(popup, filename, gameType, rows, cols, width, height) {
        var api = new mw.Api();
        
        api.get({
            action: 'query',
            titles: 'File:' + filename,
            prop: 'imageinfo',
            iiprop: 'url',
            iiurlwidth: width,
            iiurlheight: height,
            format: 'json'
        }).done(function(data) {
            var pages = data.query.pages;
            var pageId = Object.keys(pages)[0];
            var imageInfo = pages[pageId].imageinfo[0];
            var imageUrl = imageInfo.thumburl || imageInfo.url;
            
            var gameHtml;
            switch(gameType) {
                case 'huarong':
                    gameHtml = '<div class="huarong" data-row="' + rows + '" data-col="' + cols + '">' +
                        '<div class="huarong-no-js">您的浏览器不支持JavaScript或已禁用，无法显示华容道游戏。</div>' +
                        '<div class="huarong-img"><img src="' + imageUrl + '" data-image-name="' + filename + '"></div>' +
                        '</div>';
                    popup.contentElement.html(gameHtml);
                    if (typeof HuarongGame.init === 'function') {
                        HuarongGame.init(popup.contentElement.find('.huarong'));
                    } else {
                        console.error('HuarongGame.init 不是函数');
                    }
                    break;
                    
                case 'slider':
                    gameHtml = '<div class="slider-game">' +
                        '<div class="slider-game-no-js">您的浏览器不支持JavaScript或已禁用，无法显示滑块游戏。</div>' +
                        '<div class="slider-image"><img src="' + imageUrl + '" data-image-name="' + filename + '"></div>' +
                        '<div class="slider-handle"></div>' +
                        '</div>';
                    popup.contentElement.html(gameHtml);
                    if (typeof SliderGame.init === 'function') {
                        SliderGame.init(popup.contentElement.find('.slider-game'));
                    } else {
                        console.error('SliderGame.init 不是函数');
                    }
                    break;
                    
                case 'rotating':
                    gameHtml = '<div class="rotating-puzzle" data-row="' + rows + '" data-col="' + cols + '">' +
                        '<div class="rotating-puzzle-no-js">您的浏览器不支持JavaScript或已禁用，无法显示旋转拼图游戏。</div>' +
                        '<div class="rotating-puzzle-img"><img src="' + imageUrl + '" data-image-name="' + filename + '"></div>' +
                        '</div>';
                    popup.contentElement.html(gameHtml);
                    
                    // 修改为构造函数式初始化
                    try {
                        var $gameContainer = popup.contentElement.find('.rotating-puzzle');
                        if (typeof RotatingPuzzleGame === 'function') {
                            // 创建新实例并初始化
                            var gameInstance = new RotatingPuzzleGame($gameContainer);
                            if (gameInstance.init) {
                                gameInstance.init();
                            } else {
                                console.error('RotatingPuzzleGame 实例缺少 init 方法');
                            }
                        } else {
                            console.error('RotatingPuzzleGame 不是构造函数');
                        }
                    } catch (e) {
                        console.error('初始化旋转拼图失败:', e);
                        popup.contentElement.html('<div class="game-error">旋转拼图初始化失败</div>');
                    }
                    break;
                    
                default:
                    popup.contentElement.html('<div class="game-error">未知游戏类型</div>');
            }
            
            // 调整弹窗大小
            popup.popupElement.find('.popup-box').css({
                'width': width + 40 + 'px',
                'max-width': 'none',
                'max-height': height + 100 + 'px',
                'overflow-y': 'auto'
            });
        }).fail(function(error) {
            popup.contentElement.html('<div class="game-error">加载图片失败: ' + error + '</div>');
        });
    }
};

// 初始化游戏菜单
GameMenuConfig.init();