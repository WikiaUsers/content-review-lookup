/**
 * 书籍信息弹窗模块 (支持懒加载图片完整版)
 */
(function(global, $) {
    // 主功能函数
    function setupBookInfoButtons() {
        var $volumeTables = $('table.volume-table');
        
        $volumeTables.each(function() {
            var $table = $(this);
            var volumes = extractVolumeData($table);
            
            if (volumes.length === 0) {
                console.warn('无法提取书籍信息的表格:', $table);
                return;
            }
            
            // 创建唯一的容器元素
            var $container = $('<div class="book-info-wrapper"></div>');
            
            // 创建按钮元素
            var $button = $('<button>')
                .addClass('book-info-button cdx-button')
                .text('显示简介')
                .css('display', 'block');
            
            // 在表格前插入容器和按钮
            $table.before($container);
            $container.append($button);
            
            // 创建弹窗内容
            var popupContent = createPopupContent(volumes);
            
            // 创建弹窗实例
            var popup = PopupGenerator.createPopup({
                introText: $button,
                headerText: '书籍详细信息',
                content: popupContent,
                appendTo: $container,
                mode: 'add'
            });
            
            // 存储卷次数据到弹窗容器
            popup.popupElement.find('.book-info-container')
                .data('volumes', volumes);
            
            // 设置初始卷次点击事件
            setTimeout(function() {
                var $firstItem = popup.popupElement.find('.volume-list-item:first');
                if ($firstItem.length) {
                    $firstItem.trigger('click');
                }
            }, 50);
            
            // 存储弹窗实例到容器
            $container.data('popup-instance', popup);
        });
    }
    
    // 创建弹窗内容
    function createPopupContent(volumes) {
        var html = ['<div class="book-info-container">'];
        
        html.push('<div class="volume-list">');
        volumes.forEach(function(vol, index) {
            html.push('<div class="volume-list-item" data-index="', index, '">', vol.name, '</div>');
        });
        html.push('</div>');
        
        html.push('<div class="volume-details">',
                 '<div class="volume-details-content"></div>',
                 '</div>',
                 '</div>');
        
        return html.join('');
    }
    
    // 从表格中提取卷次数据 (更新图片URL提取逻辑)
    function extractVolumeData($table) {
        var volumes = [];
        var $rows = $table.find('tr');
        
        var volumeRow = findRowByHeader($rows, '卷次');
        var coverRow = findRowByHeader($rows, '封面');
        var jpDateRow = findRowByHeader($rows, '日文出版日');
        
        if (!volumeRow || !coverRow || !jpDateRow) {
            console.error('无法找到必要的行:', {volumeRow: volumeRow, coverRow: coverRow, jpDateRow: jpDateRow});
            return volumes;
        }
        
        $(volumeRow).find('td').each(function(index) {
            try {
                var $coverCell = $(coverRow).find('td').eq(index);
                var $dateCell = $(jpDateRow).find('td').eq(index);
                
                // 获取封面HTML并修复懒加载图片
                var coverHtml = fixLazyLoadedImages($coverCell.html());
                
                volumes.push({
                    name: $(this).text().trim(),
                    coverHtml: coverHtml,
                    jpDate: $dateCell.text().trim(),
                    coverUrl: extractCoverUrl($coverCell)
                });
            } catch (e) {
                console.error('处理卷次数据时出错:', e);
            }
        });
        
        return volumes;
    }
    
    // 修复懒加载图片 - 将data-src替换为src
    function fixLazyLoadedImages(html) {
        if (!html) return html;
        
        // 创建一个临时div来操作DOM
        var $temp = $('<div>').html(html);
        
        // 处理所有img标签
        $temp.find('img').each(function() {
            var $img = $(this);
            var dataSrc = $img.attr('data-src');
            
            if (dataSrc) {
                // 如果data-src存在，替换src属性
                $img.attr('src', dataSrc);
                
                // 移除懒加载相关属性
                $img.removeAttr('data-src');
                $img.removeClass('lazyload');
            }
        });
        
        // 处理作为背景图的情况
        $temp.find('[data-src]').not('img').each(function() {
            var $elem = $(this);
            var dataSrc = $elem.attr('data-src');
            
            if (dataSrc && $elem.css('background-image').match(/none|url\(['"]?data:/)) {
                $elem.css('background-image', 'url("' + dataSrc + '")');
                $elem.removeAttr('data-src');
            }
        });
        
        return $temp.html();
    }
    
    // 从单元格中提取封面URL (优先使用data-src)
    function extractCoverUrl($cell) {
        try {
            var $img = $cell.find('img');
            if ($img.length) {
                // 优先使用data-src，回退到src
                return $img.attr('data-src') || $img.attr('src') || '';
            }
            return '';
        } catch (e) {
            console.error('提取封面URL时出错:', e);
            return '';
        }
    }
    
    // 其余辅助函数保持不变...
    function findRowByHeader($rows, headerText) {
        var foundRow = null;
        
        $rows.each(function() {
            var $headerCell = $(this).find('th:first');
            if ($headerCell.length && $headerCell.text().trim() === headerText) {
                foundRow = this;
                return false;
            }
        });
        
        return foundRow;
    }
    
    function loadVolumeDetails(volume, $detailsContainer) {
        if (!$detailsContainer || !$detailsContainer.length) {
            console.error('无效的详细信息容器');
            return;
        }
        
        $detailsContainer.empty().html('<div class="book-info-loading">加载中...</div>');
        
        var imageName = extractImageName(volume.coverUrl);
        if (!imageName) {
            $detailsContainer.html('<div class="book-info-error">无法获取图片信息</div>');
            return;
        }
        
        var title = imageName.replace(/_/g, ' ').replace(/\.(jpg|png|jpeg|gif)$/i, '');
        
        var detailsHtml = [
            '<div class="volume-detail">',
            '<div class="volume-cover">', volume.coverHtml, '</div>',
            '<h3 class="volume-title">', title, '</h3>',
            '<div class="volume-jp-date"><strong>日文出版日:</strong> ', volume.jpDate, '</div>',
            '<div class="volume-summary">',
            '<span>内容简介</span>',
            '<span class="summary-content book-info-loading-content">加载中...</span>',
            '</div>',
            '<div class="volume-chapters">',
            '<div class="chapters-content book-info-loading-content">加载中...</div>',
            '</div>',
            '</div>'
        ].join('');
        
        $detailsContainer.html(detailsHtml);
        
        // 确保弹窗内的懒加载图片也被正确处理
        $detailsContainer.find('img[data-src]').each(function() {
            var $img = $(this);
            if ($img.attr('data-src')) {
                $img.attr('src', $img.attr('data-src')).removeAttr('data-src');
            }
        });
        
        // 使用mw.loader加载必要资源
        mw.loader.using(['jquery.makeCollapsible', 'mediawiki.util'], function() {
            loadPageSection('File:' + imageName, '内容简介', $detailsContainer.find('.summary-content'));
            loadPageSection('File:' + imageName, '章节列表', $detailsContainer.find('.chapters-content'));
        }, function(error) {
            console.error('资源加载失败:', error);
            $detailsContainer.find('.book-info-loading-content').html('<div class="book-info-error">资源加载失败</div>');
        });
    }
    
    function extractImageName(url) {
        if (!url) return '';
        
        try {
            var matches = url.match(/[^\/]+\.(jpg|png|jpeg|gif)/i);
            return matches && matches[0] ? decodeURIComponent(matches[0]) : '';
        } catch (e) {
            console.error('提取图片名称时出错:', e);
            return '';
        }
    }
    
    function loadPageSection(pageTitle, sectionTitle, $container) {
        if (!$container || !$container.length) return;
        
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                action: 'parse',
                page: pageTitle,
                prop: 'sections',
                format: 'json'
            },
            dataType: 'json',
            success: function(data) {
                if (data.parse && data.parse.sections) {
                    var targetSection = null;
                    for (var i = 0; i < data.parse.sections.length; i++) {
                        if (data.parse.sections[i].line === sectionTitle) {
                            targetSection = data.parse.sections[i];
                            break;
                        }
                    }
                    
                    if (targetSection) {
                        loadSectionContent(pageTitle, targetSection.index, $container);
                    } else {
                        $container.html('<div class="book-info-no-content">未找到"' + sectionTitle + '"内容</div>');
                    }
                } else {
                    $container.html('<div class="book-info-error">无法获取页面信息</div>');
                }
            },
            error: function(xhr, status, error) {
                console.error('加载页面章节时出错:', error);
                $container.html('<div class="book-info-error">加载失败: ' + status + '</div>');
            }
        });
    }
    
    function loadSectionContent(pageTitle, sectionIndex, $container) {
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                action: 'parse',
                page: pageTitle,
                section: sectionIndex,
                prop: 'text',
                format: 'json'
            },
            dataType: 'json',
            success: function(data) {
                if (data.parse && data.parse.text && data.parse.text['*']) {
                    // 修复内容中的懒加载图片
                    var fixedContent = fixLazyLoadedImages(data.parse.text['*']);
                    $container.html(fixedContent);
                    
                    // 初始化mw-collapsible
                    if (typeof $.fn.makeCollapsible === 'function') {
                        $container.find('.mw-collapsible').makeCollapsible();
                    } else {
                        initFallbackCollapsibles($container);
                    }
                } else {
                    $container.html('<div class="book-info-no-content">内容为空</div>');
                }
            },
            error: function(xhr, status, error) {
                console.error('加载章节内容时出错:', error);
                $container.html('<div class="book-info-error">加载失败: ' + status + '</div>');
            }
        });
    }
    
    function initFallbackCollapsibles($container) {
        $container.find('.mw-collapsible').each(function() {
            var $collapsible = $(this);
            var $toggle = $collapsible.find('.mw-collapsible-toggle');
            var $content = $collapsible.find('.mw-collapsible-content');
            
            if (!$toggle.length) {
                $toggle = $('<div class="mw-collapsible-toggle">[折叠]</div>');
                $collapsible.prepend($toggle);
            }
            
            $content.css('display', $collapsible.hasClass('mw-collapsed') ? 'none' : '');
            
            $toggle.off('click').on('click', function() {
                $content.slideToggle(200, function() {
                    $toggle.text($content.is(':visible') ? '[折叠]' : '[展开]');
                });
            });
        });
    }
    
    // 初始化函数
    function init() {
        $(function() {
            // 设置书籍信息按钮
            setupBookInfoButtons();
            
            // 事件委托处理卷次点击
            $(document).on('click', '.volume-list-item', function() {
                var $this = $(this);
                var $container = $this.closest('.book-info-container');
                var volumes = $container.data('volumes');
                var index = $this.data('index');
                
                if (volumes && volumes[index]) {
                    $this.addClass('active').siblings().removeClass('active');
                    loadVolumeDetails(volumes[index], $container.find('.volume-details-content'));
                }
            });
        });
    }
    
    // 暴露到全局对象
    global.BookInfoPopup = global.BookInfoPopup || { init: init };
    
    // 自动初始化
    init();
})(window, jQuery);