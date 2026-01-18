mw.loader.using(['mediawiki.api', 'jquery']).then(function() {
    // DOM加载完成后立即执行 / Execute immediately after DOM is ready
    $(fetchAndInsertCredits);
});

function fetchAndInsertCredits() {
    var pageName = mw.config.get('wgPageName'); // 自动获取当前页面名称 / Automatically get current page name
    if (!pageName) {
        console.log('无法获取页面名称 / Unable to get page name');
        return;
    }
    
    console.log('正在处理页面: ' + pageName + ' / Processing page: ' + pageName);
    
    // 通过API获取credits页面的HTML内容 / Get credits page HTML content via API
    new mw.Api().get({
        action: 'parse',
        page: pageName,
        prop: 'text',
        section: 0,
        disableeditsection: true,
        disabletoc: true
    }).done(function(data) {
        if (data.parse && data.parse.text && data.parse.text['*']) {
            // 创建临时DOM元素来解析HTML / Create temporary DOM element to parse HTML
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = data.parse.text['*'];
            
            // 查找#mw-credits元素 / Find #mw-credits element
            var creditsElement = tempDiv.querySelector('#mw-credits');
            
            if (creditsElement) {
                var creditsHtml = creditsElement.innerHTML;
                console.log('找到编辑者信息，准备插入到右侧栏 / Found editor information, ready to insert into right rail');
                
                // 立即尝试插入到指定位置 / Immediately try to insert to specified position
                insertCreditsToRightRail(creditsHtml);
            } else {
                // 如果当前页面不是credits视图，尝试直接获取credits页面的完整HTML / If current page is not credits view, try to get complete credits page HTML directly
                fetchCreditsPageDirectly(pageName);
            }
        }
    }).fail(function(error) {
        console.log('API请求失败，尝试备用方案 / API request failed, trying fallback:', error);
        // 备用方案：直接获取credits页面 / Fallback: Get credits page directly
        fetchCreditsPageDirectly(pageName);
    });
}

// 备用方案：直接获取credits页面的完整HTML / Fallback: Get complete credits page HTML directly
function fetchCreditsPageDirectly(pageName) {
    // 构建credits页面的完整URL / Construct complete URL for credits page
    var creditsUrl = mw.util.wikiScript() + '?title=' + encodeURIComponent(pageName) + '&action=credits';
    
    // 使用jQuery AJAX获取credits页面 / Use jQuery AJAX to get credits page
    $.ajax({
        url: creditsUrl,
        dataType: 'html'
    }).done(function(html) {
        // 从完整的credits页面HTML中提取#mw-credits内容 / Extract #mw-credits content from complete credits page HTML
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        var creditsElement = tempDiv.querySelector('#mw-credits');
        if (creditsElement) {
            console.log('通过备用方案找到编辑者信息 / Found editor information through fallback');
            insertCreditsToRightRail(creditsElement.innerHTML);
        } else {
            console.log('备用方案也未找到#mw-credits元素 / Fallback also did not find #mw-credits element');
        }
    }).fail(function() {
        console.log('备用方案请求失败 / Fallback request failed');
    });
}

// 检查并插入到指定位置 / Check and insert to specified position
function insertCreditsToRightRail(contentHtml) {
    // 检查是否已经插入过（避免重复插入） / Check if already inserted (avoid duplicate insertion)
    if ($('.mw-credits-inserted').length > 0) {
        console.log('编辑者信息已存在，跳过插入 / Editor information already exists, skipping insertion');
        return;
    }
    
    // 检查目标元素是否存在 / Check if target elements exist
    var rightRailWrapper = $('.right-rail-wrapper');
    var wikiaRail = $('#WikiaRail');
    
    // 两个元素都存在才能插入 / Both elements must exist for insertion
    if (rightRailWrapper.length > 0 && wikiaRail.length > 0) {
        console.log('找到目标元素，立即插入编辑者信息 / Found target elements, inserting editor information immediately');
        
        // 创建内容容器，添加指定的类名 / Create content container with specified class name
        var creditsContainer = $('<div>')
            .addClass('WikiaRail-railModule mw-credits-inserted')
            .css({
                'opacity': '0',
                'transform': 'translateY(-10px)',
                'transition': 'opacity 0.3s ease, transform 0.3s ease'
            })
            .html(contentHtml);
        
        // 在WikiaRail元素之前插入 / Insert before WikiaRail element
        creditsContainer.insertBefore(wikiaRail);
        console.log('编辑者信息已成功插入到right-rail-wrapper内，WikiaRail上方 / Editor information successfully inserted into right-rail-wrapper, above WikiaRail');
        
        // 延迟一小段时间后触发动画，让浏览器有时间渲染初始状态 / Delay for a short time before triggering animation, giving browser time to render initial state
        setTimeout(function() {
            creditsContainer.css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 10); // 10ms延迟确保过渡生效 / 10ms delay ensures transition works
    } else {
        console.log('目标元素不存在，立即放弃插入 / Target elements do not exist, giving up immediately:');
        console.log('- .right-rail-wrapper: ' + (rightRailWrapper.length > 0 ? '存在 / exists' : '不存在 / does not exist'));
        console.log('- #WikiaRail: ' + (wikiaRail.length > 0 ? '存在 / exists' : '不存在 / does not exist'));
    }
}