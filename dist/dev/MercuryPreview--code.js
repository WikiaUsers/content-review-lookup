/**
 * Name : Mercury Preview
 * Authors :
 ** 机智的小鱼君
 ** Laclale (proposed new method of filtering namespaces)
 * Used files :
 ** [[File:Loading.gif]]
 * Logs :
 ** 06:08, March 27, 2019 (UTC): Alpha release
 ** 07:00, March 27, 2019 (UTC): Fixed littile bug caused by Language Path
 ** 07:23, March 27, 2019 (UTC): Fixed littile bug caused by iOS
 ** 10:43, March 27, 2019 (UTC): Clear up unnecessary elements
 ** 03:24, March 28, 2019 (UTC): You should not pass! Nya Haha~☆ Auto clear up unnecessary elements when time out
 ** 10:52, March 29, 2019 (UTC): Lac extended MercuryPreview's range
 ** 14:09, March 29, 2019 (UTC): New Namespace Filter
 **/

require(['jquery', 'mw'], function($, mw) {
    var config = mw.config.get(['wgNamespaceNumber', 'wgPageName']);
 
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:MercuryPreview.css'
    }, {
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
 
    function init(i18n) {
        // 过滤不支持Mercury的名字空间
        var MercuryPreviewSkipNamespace = [-1,1,2,3,4,5,7,8,9,10,11,828,1200,1201,1202];
        if ( $.inArray(config.wgNamespaceNumber , MercuryPreviewSkipNamespace) > -1 ) {
            console.info('不符合MercuryPreview加载条件，MercuryPreview终止');
            return;
        } else {
            console.info('符合MercuryPreview加载条件，MercuryPreview就绪');
        }
        var MercuryPreviewSrc, url = location.href,
            rootreg = /\/\/[^\/]*\/([^\/]+)/,
            rootpath = url.match(rootreg)[1];
 
        if (rootpath === 'wiki') {
            MercuryPreviewSrc = '/wiki/' + config.wgPageName + '?useskin=mercury&mobile-app=true';
        } else {
            MercuryPreviewSrc = '/' + rootpath + '/wiki/' + config.wgPageName + '?useskin=mercury&mobile-app=true';
        }
        $('.wds-community-header__wiki-buttons .wds-dropdown__content .wds-list').append(
        // 添加按钮
        $('<li>').append($('<a>').attr({
            'href': '#',
            'id': 'MercuryPreview'
        }).html(i18n.msg('PreviewBtn').escape()).click(function() {
            console.info('MercuryPreview开始加载');
            // 预览区域的内容
            var MercuryPreviewHeader = i18n.msg('BoxHeader').escape(),
                PreviewLoading = $('<div>').attr('id','MercuryPreviewLoading').css({
                  'position' : 'fixed',
                  'width' : '100%',
                  'height' : '100%',
                  'z-index' : '60000000',
                  'background-color' : 'rgba(255,255,255,0.3)',
                  'background-image' : 'url(https://vignette.wikia.nocookie.net/dev/images/4/42/Loading.gif/revision/latest?cb=20120218000406)',
                  'background-repeat' : 'no-repeat',
                  'background-position' : 'center'
                }),
                MercuryPreviewBody = $('<div>').attr('id', 'MercuryPreviewBody').append($('<iframe>').attr({
                    id: "MercuryPreviewBoxIframe",
                    src: MercuryPreviewSrc
                }).before(PreviewLoading));
            // 调出wds弹窗
            $.showCustomModal(MercuryPreviewHeader, MercuryPreviewBody, {
                id: 'MercuryPreviewBox',
                width: 600,
                buttons: [{
                    id: 'CloseMercuryPreview',
                    message: i18n.msg('CloseBoxBtn').escape(),
                    handler: function() {
                        $('#MercuryPreviewBox').closeModal();
                    }
                }, ]
            });
            // 小屏幕手机响应式优化
            if ($(window).width() < 850) {
                $('#MercuryPreviewBox').css({
                    'width': $(document).width() * 0.8,
                    'height': 'auto'
                }).offset({
                    left: $(document).width() / 10
                });
                $('#MercuryPreviewBoxIframe,#MercuryPreviewBody').css({
                    'width': '90%'
                });
            }
            // 加载完毕，清除不必要元素
            $('#MercuryPreviewBoxIframe').load(function() {
                console.info('MercuryPreview加载完毕');
                ClearElement();
            });
            // 加载超时，强制执行清除任务
            setTimeout(function(){
                console.info('MercuryPreview加载超时，强制执行清理任务');
                ClearElement();
            }, 15000);
 
        })));
    }
    function ClearElement() {
        $('#MercuryPreviewBoxIframe').css('background-image','none');
        $('#MercuryPreviewLoading').remove();
        $('#MercuryPreviewBoxIframe').contents().find('a').removeAttr('href');
    }
 
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('MercuryPreview').then(init);
    });
});