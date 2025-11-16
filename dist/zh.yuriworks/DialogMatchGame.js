// 配置参数
var config = {
    containerId: 'hexIceGrid',
    containerWidth: 1200,
    containerHeight: 700,
    rows: 3,
    columns: 6,
    rowHexCounts: [4, 5, 4, 5],
    hexWidth: 150,
    hexMargin: 4,
    backgroundColor: 'linear-gradient(145deg, #6e8efb, #a777e3)',
    iceOverlayColor: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(255, 255, 255, 0.02) 60%, rgba(255, 255, 255, 0.1) 100%)',
    iceBorderColor: 'linear-gradient(135deg, rgba(200, 230, 255, 0.7) 0%, rgba(170, 220, 255, 0.5) 25%, rgba(140, 210, 255, 0.3) 50%, rgba(170, 220, 255, 0.5) 75%, rgba(200, 230, 255, 0.7) 100%)',
    iceBorderWidth: 1,
    iceBorderColorValue: 'rgba(255, 255, 255, 0.3)',
    reflectionColor: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)',
    reflectionOpacity: 0.4
};

// 状态变量
var connectionState = {
    active: false,
    selectedHex: null,
    lineElement: null,
    path: null,
    glowPath: null
};

var matchedPairs = {};
var imageUrlCache = {}; // 缓存图片URL

// 从文件名提取名称（不含扩展名）
function getFileNameFromPath(path) {
    var filename = path.split('/').pop();
    var match = filename.match(/配对题([A-Z])\.png$/);
    if (match && match[1]) {
        return match[1];
    }
    var baseName = filename.split('.')[0];
    return baseName.charAt(baseName.length - 1);
}

// 获取文件URL - 使用MediaWiki API
function getFileUrl(filename, callback) {
    // 检查缓存
    if (imageUrlCache[filename]) {
        callback(imageUrlCache[filename]);
        return;
    }
    
    var api = new mw.Api();
    api.get({
        action: 'query',
        titles: 'File:' + filename,
        prop: 'imageinfo',
        iiprop: 'url',
        format: 'json'
    }).done(function(data) {
        var pages = data.query.pages;
        var pageId = Object.keys(pages)[0];
        
        if (pages[pageId].imageinfo) {
            var imageUrl = pages[pageId].imageinfo[0].url;
            imageUrlCache[filename] = imageUrl; // 缓存URL
            callback(imageUrl);
        } else {
            console.error('无法获取图片URL:', filename);
            callback('');
        }
    }).fail(function(error) {
        console.error('获取图片URL失败:', filename, error);
        callback('');
    });
}

// 批量获取图片URL
function getImageUrls(filenames, callback) {
    var results = {};
    var count = 0;
    var total = filenames.length;
    
    if (total === 0) {
        callback(results);
        return;
    }
    
    filenames.forEach(function(filename) {
        getFileUrl(filename, function(url) {
            results[filename] = url;
            count++;
            if (count === total) {
                callback(results);
            }
        });
    });
}

// 显示连线
function showConnectionLine() {
    var lineElement = document.getElementById('connection-line');
    if (!lineElement) {
        lineElement = document.createElement('div');
        lineElement.id = 'connection-line';
        lineElement.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1000;display:none;';
        lineElement.innerHTML = '<svg width="100%" height="100%"><path class="connection-glow"></path><path class="connection-path"></path></svg>';
        document.body.appendChild(lineElement);
    }
    
    lineElement.style.display = 'block';
    var paths = lineElement.querySelectorAll('path');
    connectionState.path = paths[1];
    connectionState.glowPath = paths[0];
    connectionState.lineElement = lineElement;
}

// 更新连线
function updateConnectionLine(startX, startY, endX, endY) {
    if (!connectionState.path || !connectionState.glowPath) return;
    
    var d = "M " + startX + " " + startY + " L " + endX + " " + endY;
    connectionState.path.setAttribute("d", d);
    connectionState.glowPath.setAttribute("d", d);
}

// 隐藏连线
function hideConnectionLine() {
    if (connectionState.lineElement) {
        connectionState.lineElement.style.display = 'none';
        connectionState.path = null;
        connectionState.glowPath = null;
    }
}

// 处理冰块点击
function handleHexClick(hexId, fileName, event) {
    if (connectionState.active || matchedPairs[hexId]) return;
    
    $('.hexagon-container.selected').removeClass('selected');
    
    var hexElement = document.getElementById(hexId);
    hexElement.classList.add('selected');
    
    connectionState.active = true;
    connectionState.selectedHex = {
        id: hexId,
        fileName: fileName,
        element: hexElement
    };
    
    showConnectionLine();
    $(document).on('mousemove.connection', handleMouseMove);
}

// 处理鼠标移动
function handleMouseMove(event) {
    if (!connectionState.active) return;
    
    var hexRect = connectionState.selectedHex.element.getBoundingClientRect();
    var startX = hexRect.left + hexRect.width / 2;
    var startY = hexRect.top + hexRect.height / 2;
    
    updateConnectionLine(startX, startY, event.clientX, event.clientY);
}

// 处理对话点击
function handleDialogClick(dialogId, event) {
    if (!connectionState.active) return;
    
    var dialogIndex = parseInt(dialogId.split('-')[1]) - 1;
    var expectedFileName = window.matchingData[dialogIndex];
    var selectedFileName = connectionState.selectedHex.fileName;
    
    var dialogElement = document.getElementById(dialogId);
    var hexElement = connectionState.selectedHex.element;
    
    if (expectedFileName === selectedFileName) {
        addStatusIcon(hexElement, 'check');
        addStatusIcon(dialogElement, 'check');
        
        $(hexElement).addClass('matched');
        $(dialogElement).addClass('matched');
        
        matchedPairs[connectionState.selectedHex.id] = dialogId;
        
        $(hexElement).removeClass('selected');
        hideConnectionLine();
        connectionState.active = false;
        $(document).off('mousemove.connection');
    } else {
        var errorIcon = addStatusIcon(dialogElement, 'error');
        $(dialogElement).addClass('mismatched');
        
        setTimeout(function() {
            if (errorIcon) {
                $(errorIcon).addClass('fade-out');
                setTimeout(function() {
                    $(errorIcon).remove();
                }, 1000);
            }
            $(dialogElement).removeClass('mismatched');
            
            $(hexElement).removeClass('selected');
            hideConnectionLine();
            connectionState.active = false;
            $(document).off('mousemove.connection');
        }, 1000);
    }
}

// 添加状态图标
function addStatusIcon(element, type) {
    $(element).find('.status-icon').remove();
    
    var icon = document.createElement('div');
    icon.className = 'status-icon ' + (type === 'check' ? 'check-icon' : 'error-icon');
    
    if (type === 'error') {
        setTimeout(function() {
            icon.style.opacity = '1';
        }, 10);
    }
    
    element.appendChild(icon);
    return icon;
}

// 创建对话区域
function createDialogsGrid(dialogsData) {
    var dialogsGrid = document.getElementById('dialogsGrid');
    dialogsGrid.innerHTML = '';
    
    for (var i = 0; i < dialogsData.length; i++) {
        var dialogItem = document.createElement('div');
        dialogItem.className = 'dialog-item';
        dialogItem.id = 'dialog-' + (i + 1);
        dialogItem.setAttribute('data-number', (i + 1).toString());
        dialogItem.textContent = dialogsData[i];
        
        (function(dialogId) {
            dialogItem.addEventListener('click', function(event) {
                handleDialogClick(dialogId, event);
            });
        })(dialogItem.id);
        
        dialogsGrid.appendChild(dialogItem);
    }
}

// 初始化六边形冰块网格
function initHexIceGrid(imageSources, imageUrls) {
    var container = document.getElementById(config.containerId);
    container.innerHTML = '';
    
    var hexCount = 0;
    var hexWidth = config.hexWidth;
    var hexHeight = config.hexWidth * 2 / Math.sqrt(3);
    var margin = config.hexMargin;
    
    var rowSpacing = hexHeight * 0.75 + margin * Math.sqrt(3);
    
    var rows, columnsPerRow;
    if (config.rowHexCounts && config.rowHexCounts.length > 0) {
        rows = config.rowHexCounts.length;
        columnsPerRow = config.rowHexCounts;
    } else {
        rows = config.rows;
        columnsPerRow = [];
        for (var i = 0; i < rows; i++) {
            columnsPerRow.push(config.columns);
        }
    }
    
    var maxColumns = Math.max.apply(null, columnsPerRow);
    var calculatedWidth = maxColumns * (hexWidth + margin * 2) + (hexWidth * 2);
    var calculatedHeight = rows * rowSpacing + hexHeight * 0.25;
    
    container.style.width = calculatedWidth + 'px';
    container.style.height = calculatedHeight + 'px';
    
    var containerCenter = calculatedWidth / 2;
    
    for (var row = 0; row < rows; row++) {
        var columns = columnsPerRow[row];
        
        for (var col = 0; col < columns; col++) {
            var top = row * rowSpacing;
            var left;
            
            var k = col + 1;
            var n = columns;
            var w = hexWidth;
            var b = margin * 2;
            
            if (n % 2 === 0) {
                if (row % 2 == 0) {
                    left = containerCenter - w / 2 + (k - 1 - n / 2) * (w + b);
                } else {
                    left = containerCenter + b / 2 + (k - 1 - n / 2) * (w + b);
                }
            } else {
                if (row % 2 == 0) {
                    left = containerCenter - w / 2 + (k - (n + 1) / 2) * (w + b);
                } else {
                    left = containerCenter - w - b / 2 + (k - (n + 1) / 2) * (w + b);
                }
            }
            
            var hexContainer = document.createElement('div');
            hexContainer.className = 'hexagon-container';
            hexContainer.id = 'img-' + getFileNameFromPath(imageSources[hexCount]);
            hexContainer.style.width = hexWidth + 'px';
            hexContainer.style.height = hexHeight + 'px';
            hexContainer.style.top = top + 'px';
            hexContainer.style.left = left + 'px';
            
            (function(hexId, fileName) {
                hexContainer.addEventListener('click', function(event) {
                    handleHexClick(hexId, fileName, event);
                });
            })(hexContainer.id, getFileNameFromPath(imageSources[hexCount]));
            
            var hexBg = document.createElement('div');
            hexBg.className = 'hexagon hexagon-bg';
            hexBg.style.background = config.backgroundColor;
            
            var hexImage = document.createElement('div');
            hexImage.className = 'hexagon hexagon-image';
            var img = document.createElement('img');
            var imgSrc = imageUrls[imageSources[hexCount % imageSources.length]] || '';
            img.src = imgSrc;
            img.alt = '六边形图片 ' + (hexCount + 1);
            img.onerror = function() {
                console.error('图片加载失败:', this.src);
            };
            hexImage.appendChild(img);
            
            var iceOverlay = document.createElement('div');
            iceOverlay.className = 'ice-overlay';
            iceOverlay.style.background = config.iceOverlayColor;
            iceOverlay.style.border = config.iceBorderWidth + 'px solid ' + config.iceBorderColorValue;
            
            var iceBorder = document.createElement('div');
            iceBorder.className = 'ice-border';
            iceBorder.style.background = config.iceBorderColor;
            
            var reflection = document.createElement('div');
            reflection.className = 'reflection';
            reflection.style.background = config.reflectionColor;
            reflection.style.opacity = config.reflectionOpacity;
            
            var filenameLabel = document.createElement('div');
            filenameLabel.className = 'filename-label';
            filenameLabel.textContent = getFileNameFromPath(imageSources[hexCount]);
            
            hexContainer.appendChild(hexBg);
            hexContainer.appendChild(hexImage);
            hexContainer.appendChild(iceOverlay);
            hexContainer.appendChild(iceBorder);
            hexContainer.appendChild(reflection);
            hexContainer.appendChild(filenameLabel);
            
            container.appendChild(hexContainer);
            
            hexCount++;
        }
    }
}

// 从JSON页面加载数据
function loadDataFromPage() {
    var container = document.querySelector('.container[data-source]');
    var pageName = container ? container.getAttribute('data-source') : '';
    
    if (!pageName) {
        console.error('未找到data-source属性');
        return;
    }
    
    // 添加加载提示
    var loadingHtml = '<div style="text-align: center; padding: 20px; color: white; font-size: 18px;">正在加载匹配游戏数据...</div>';
    $('#hexIceGrid').html(loadingHtml);
    $('#dialogsGrid').html('');
    
    // 使用API获取原始内容
    var api = new mw.Api();
    
    api.get({
        action: 'query',
        prop: 'revisions',
        rvprop: 'content',
        titles: pageName,
        format: 'json'
    }).done(function(data) {
        var pages = data.query.pages;
        var pageId = Object.keys(pages)[0];
        
        if (!pages[pageId].revisions) {
            $('#hexIceGrid').html('<div style="text-align: center; padding: 20px; color: white;">数据页面不存在或为空</div>');
            return;
        }
        
        var content = pages[pageId].revisions[0]['*'];
        
        try {
            // 解析JSON内容
            var jsonData = JSON.parse(content);
            
            // 设置全局变量
            window.imageSources = jsonData.imageSources || [];
            window.dialogsData = jsonData.dialogs || [];
            window.matchingData = jsonData.matching || [];
            
            // 先创建对话区域
            createDialogsGrid(window.dialogsData);
            
            // 批量获取图片URL，然后初始化冰块网格
            $('#hexIceGrid').html('<div style="text-align: center; padding: 20px; color: white; font-size: 18px;">正在加载图片...</div>');
            
            getImageUrls(window.imageSources, function(imageUrls) {
                initHexIceGrid(window.imageSources, imageUrls);
            });
            
        } catch (e) {
            console.error('解析JSON数据失败:', e);
            $('#hexIceGrid').html('<div style="text-align: center; padding: 20px; color: white;">解析数据失败，请检查JSON格式</div>');
        }
    }).fail(function(error) {
        console.error('加载数据页面失败:', error);
        $('#hexIceGrid').html('<div style="text-align: center; padding: 20px; color: white;">加载数据失败，请检查页面名称</div>');
    });
}

// 页面加载完成后初始化
$(document).ready(function() {
    // 确保mw API可用
    if (typeof mw === 'undefined' || !mw.Api) {
        console.error('MediaWiki API不可用');
        $('#hexIceGrid').html('<div style="text-align: center; padding: 20px; color: white;">MediaWiki环境不可用</div>');
        return;
    }
    
    loadDataFromPage();
});