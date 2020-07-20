<!--{if !isset($wgBilibili) || !$wgBilibili}-->
<!--{assign var="wgBilibili" value=true scope="global"}-->
<style>
.bilibili-video-container {
    border: 1px solid rgba(170,170,170,0.37);
    max-width: 100%;
}
.bilibili-video-container.exec {
    display: table;
}
.bilibili-iframe-container,
.bilibili-video-container {
    display: none;
}
.bilibili-video-container,
.bilibili-video-container div,
.bilibili-video-container .bilibili-widescreen,
.bilibili-video-container iframe {
    max-width: 100%;
    background-color: #fff!important;
}
.bilibili-title {
    padding: .2em 6.5em .2em 1em;
    position: relative;
}
.bilibili-title a {
    word-break: break-word;
}
.bilibili-widescreen {
    position: absolute;
    display: none;
    width: 1em;
    right: -2rem;
    border: 1px solid rgba(170,170,170,0.37);
    padding: .25rem .5rem;
    line-height: 1.5em;
    top: -1px;
    user-select: none;
    cursor: pointer;
}
.onshow .bilibili-widescreen{
    display: block;
}
.bilibili-toggle {
    position: absolute;
    top: calc(50% - .5em);
    right: .7em;
    line-height: 1em;
    cursor: pointer;
    padding-left: 1em;
    background-image: url(/skins/Vector/images/search-ltr.png?39f97);
    background-image: linear-gradient(transparent,transparent), url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2213%22%3E%3Cg%20stroke-width%3D%222%22%20stroke%3D%22%236c6c6c%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M11.29%2011.71l-4-4%22%2F%3E%3Ccircle%20cx%3D%225%22%20cy%3D%225%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E);
    background-image: linear-gradient(transparent,transparent), url(/skins/Vector/images/search-ltr.svg?07752)!ie;
    background-image: -o-linear-gradient(transparent,transparent), url(/skins/Vector/images/search-ltr.png?39f97);
    background-position: left center;
    background-repeat: no-repeat;
}
.bilibili-toggle:hover {
    color: #36b;
}
.bilibili-video-button,
.bilibili-video-button:visited {
    display: inline-block;
    margin: 4px 5px;
    padding: 10px 25px;
    font-size: 14px;
    text-align: center;
    color: #fff;
    background: #de698c;
    border-radius: 4px;
}
.bilibili-iframe-container {
    padding: 6px 6px 0!important;
    position: relative;
    border: 0 solid rgba(170,170,170,0.37);
    border-top-width: 1px;
    max-width: calc(100% - 12px)!important;
}
.onshow .bilibili-iframe-container {
    max-height: calc(100% - 27px)!important;
}
.bilibili-video-container textarea {
    background: white;
    color: black;
    width: 80%;
    margin: auto;
}
.bilibili-iframe-overlay {
    width: 0;
    height: 0;
    padding-top: 30%;
    text-align: center;
    box-sizing: border-box;
    background: rgb(167, 215, 249);
    position: absolute;
    top: 3px;
    left: 6px;
    z-index: 2;
}
.bilibili-iframe-retry-link {
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
    background: white;
    padding: 0px 0.5em;
}
</style><script>
window.RLQ.push(function() {
    $(function() {
        'use strict';
        var isNaN = Number.isNaN || window.isNaN;
        if (mw.config.get('skin') === 'minerva') $('.bilibili-video-container:not(.bilibili-video-initialized)').each(function() {
            var element = $(this),
                dataset = this.dataset;
            element.addClass("bilibili-video-initialized");
            var id = dataset.aid.replace('av', ''),
                title = dataset.title,
                pagename = dataset.pagename,
                page = parseInt(dataset.page),
                t = parseInt(dataset.t),
                tIsInvalid = isNaN(t) || t <= 0,
                subtitle = dataset.subtitle === 'true' ? true : false;
            $.ajax({
                url: 'https://mgwbcprd.azureedge.net/BilibiliMeta/Index/' + encodeURIComponent('av' + id),
                type: 'GET',
                success: function(data) {
                    var list = data.VideoEntities
                        .map(function(e, i) {
                            e.page = i + 1;
                            e.title = e.Title.replace(/^\d+、/, '');
                            return e;
                        }),
                        _page = 1,
                        name = title || (data.Title ? data.Title : 'av' + id),
                        index,
                        length;
                    if (pagename) {
                        for (index = 0, length = list.length; index < length; index++) {
                            if (list[index].Title !== pagename && list[index].title !== pagename) continue;
                            _page = list[index].page;
                            break;
                        }
                    } else _page = page;
                    index = _page - 1;
                    var sec = t % 60 + '';
                    if (sec.length === 1) sec = '0' + sec;
                    var time = Math.floor(t / 60) + ':' + sec;
                    var button = $('<a/>').addClass('bilibili-video-button').attr('href', "https://www.bilibili.com/video/av" + id + "/?p=" + _page + (tIsInvalid ? '' : '&t=' + t)).text(name + ' [' + _page + '/' + list.length + ']' + (tIsInvalid ? '' : '[跳转至' + time + ']'));
                    if (list[index] !== undefined && list[index].VideoCid !== undefined && subtitle) {
                        button.append('<br>（' + _page + '、' + list[index].Title + '）');
                    }
                    element.before(button).remove();
                },
                error: function(e) {
                    element.before($('<a/>').addClass('bilibili-video-button').attr('href', link).text((title || 'av' + id) + ([0, 1].indexOf(page) !== -1 && !isNaN(page) ? ' (P' + page + ')' : ''))).remove();
                },
            });
        });
        else {
            var global_element = $('#mw-content-text');
            window.widget = window.widget || {};
            window.widget.bilibili = {
                iframes: new(window.Map || mw.Map)(),
            };
            var EPSILON = 2.220446049250313e-16,
                rememberWH = function rememberWH(ele) {
                    ele.data({ width: ele.width(), height: ele.height() });
                },
                setTureHeight = function setTureHeight(ele) {
                    var barHeight = ele.data('height') - ele.data('width') * 9 / 16; //计算标题和播放器控制栏高度
                    ele.height(ele.width() * 9 / 16 + barHeight);
                },
                setWH = function setWH(ele) {
                    ele.css({ width: '100%', height: '100%' });
                },
                recallWH = function recallWH(ele) {
                    ele.width(ele.data('width')).height(ele.data('height'));
                },
                setMaxHeight = function setMaxHeight(container, target) {
                    var h = container.outerHeight(true);
                    var t = 0;
                    container.children().each(function() {
                        t += $(this).outerHeight(true);
                    });
                    target.css('max-height', 'calc(100% - ' + parseInt(t - h + 2 - (Number.EPSILON || EPSILON)) + 'px)');
                };
            $('.bilibili-video-container').addClass('exec').each(function() {
                var dataset = this.dataset,
                    id = parseInt(+dataset.aid.replace('av', '')),
                    selfbox = $(this);
                if (isNaN(id) || id <= 0) return;
                var page = parseInt(+(dataset.page || 1)),
                    pagename = dataset.pagename,
                    title = dataset.title,
                    height = +dataset.height || 441,
                    width = +dataset.width || 665,
                    subtitle = dataset.subtitle === 'true' ? true : false,
                    t = parseInt(dataset.t),
                    tIsInvalid = isNaN(t) || t <= 0,
                    iframeContainer = $(this).find('.bilibili-iframe-container'),
                    title_text = $('<a/>').addClass('external text').attr({
                        href: "http://www.bilibili.com/video/av" + id + "/?p=" + page + (tIsInvalid ? '' : '&t=' + t),
                        target: '_blank',
                    }).prependTo($(this).find('.bilibili-title')),
                    iframe = $('<iframe/>').attr({
                        frameborder: 0,
                        scrolling: 'no',
                        src: '',
                        allowfullscreen: true,
                    }).css({
                        width: width,
                        height: height,
                    });
                if (isNaN(page) || page < 1) page = 1;
                if (isNaN(width)) width = 665;
                if (isNaN(height)) height = 441;
                var sec = t % 60 + '';
                if (sec.length === 1) sec = '0' + sec;
                var time = Math.floor(t / 60) + ':' + sec;
                title_text.text((title || 'av' + id) + ([0, 1].indexOf(page) === -1 ? ' (' + page + ')' : '') + (tIsInvalid ? '' : '[视频从' + time + '开始播放]'));
                iframeContainer.css({
                    width: width,
                    height: height,
                }).find('div').css({
                    width: width,
                    height: height,
                }).text('正在加载，请稍候……');
                $.extend(iframe, {
                    execAppend: function execAppend() {
                        var iframe = this,
                            retryLink = $('<a/>').text('重新加载').addClass('bilibili-iframe-retry-link').on('click', function() {
                                var container = $(this).closest('.bilibili-iframe-container'),
                                    iframe = container.find('iframe'),
                                    clone = iframe.clone();
                                window.widget.bilibili.iframes.delete(iframe[0]);
                                iframe.remove();
                                container.append(clone.on('load', function() {
                                    $(this).data('load', 'complete');
                                }));
                                window.widget.bilibili.iframes.set(clone[0], $(this));
                            });
                        iframe.appendTo(iframeContainer.empty()).data('ready', 'appended').on('load', function() {
                            $(this).data('load', 'complete');
                        });
                        window.setTimeout(function() {
                            window.widget.bilibili.iframes.set(iframe[0], retryLink);
                        }, 10000);
                    },
                });
                iframe.data('ready', false);
                window.setTimeout(function() { //异步出去不要卡主线程
                    $.ajax({
                        url: 'https://mgwbcprd.azureedge.net/BilibiliMeta/Index/' + encodeURIComponent('av' + id),
                        type: 'GET',
                        success: function(data) {
                            var list = data.VideoEntities
                                .map(function(e, i) {
                                    e.page = i + 1;
                                    e.title = e.Title.replace(/^\d+、/, '');
                                    return e;
                                }),
                                _page = 1,
                                name = title || (data.Title ? data.Title : 'av' + id),
                                index,
                                length;
                            if (pagename) {
                                for (index = 0, length = list.length; index < length; index++) {
                                    if (list[index].Title !== pagename && list[index].title !== pagename) continue;
                                    _page = list[index].page;
                                    break;
                                }
                            } else _page = page;
                            index = _page - 1;
                            var href = title_text.attr('href');
                            if (list[index] !== undefined && list[index].VideoCid !== undefined) {
                                iframe.attr('src', 'https://www.bilibili.com/blackboard/html5player.html?aid=' + id + '&cid=' + list[index].VideoCid + '&enable_ssl=1&crossDomain=1&as_wide=1' + (tIsInvalid ? '' : '&t=' + t));
                                if (iframeContainer.is(':visible')) iframe.execAppend();
                                else iframe.data('ready', true);
                                title_text.attr('href', href.replace(new RegExp("/\\?p=" + page, 'g'), "/?p=" + _page));
                                title_text.text(name + ' [' + _page + '/' + list.length + ']' + (tIsInvalid ? '' : '[视频从' + time + '开始播放]'));
                                if (subtitle) title_text.append('<br>（' + _page + '、' + list[index].Title + '）');
                            } else {
                                title_text.text(name + (tIsInvalid ? '' : '[视频从' + time + '开始播放]'));
                                iframe.attr('src', 'https://www.bilibili.com/blackboard/player.html?aid=' + id + '&page=' + _page + '&enable_ssl=1&as_wide=1' + (tIsInvalid ? '' : '&t=' + t));
                                if (iframeContainer.is(':visible')) iframe.execAppend();
                                else iframe.data('ready', true);
                            }
                        },
                        error: function(e) {
                            title_text.text((title || 'av' + id) + ([0, 1].indexOf(page) === -1 ? ' (' + page + ')' : '') + (tIsInvalid ? '' : '[视频从' + time + '开始播放]'));
                            if (e && e.responseJSON && e.responseJSON.message && e.responseJSON.message === "Authentication is required for accessing this video.") title_text.parent().append('<sup title="“Bilibili采用会员制，大部分投稿视频会员与游客都可以观看，\n   但部分视频在UP主设定下只有会员才可以观看（这些视频常被称为‘只有会员才知道的世界’）。”\n   - Bilibili#用户制度 @ ZhMoegirl\n在这种情况下我们无法为您解析视频及其分P标题、分P数量等，也不能强制使用H5播放器。\n但如果您已经登录B站并且设置默认播放器为H5播放器时此处仍会是H5播放器。">（只有会员才知道的世界）</sup>');
                            iframe.attr('src', 'https://www.bilibili.com/blackboard/player.html?aid=' + id + '&page=' + page + '&enable_ssl=1&as_wide=1' + (tIsInvalid ? '' : '&t=' + t));
                            if (iframeContainer.is(':visible')) iframe.execAppend();
                            else iframe.data('ready', true);
                        },
                    });
                }, 137);
                //toggle
                selfbox.find('.bilibili-toggle').on('click', function() {
                    selfbox.width(iframeContainer.outerWidth(true));
                    selfbox.toggleClass('onshow');
                    iframeContainer.toggle();
                    if ($(this).text() === '显示视频') {
                        $(this).text('隐藏视频');
                        if (iframe.data('ready') === true) iframe.execAppend();
                        $(window).resize();
                    } else {
                        $(this).text('显示视频');
                        selfbox.removeAttr('style');
                    }
                });
                selfbox.find('.bilibili-widescreen').on('click', function() {
                    if (selfbox.is(':not(.onshow)')) return;
                    if (selfbox.is('.widescreen')) {
                        selfbox.removeClass('widescreen');
                        $(this).text('显示宽屏');
                        recallWH(iframeContainer);
                        recallWH(iframe);
                        recallWH(selfbox);
                    } else {
                        selfbox.addClass('widescreen');
                        $(this).text('退出宽屏');
                        rememberWH(selfbox);
                        selfbox.css('width', selfbox.parent().width() > Math.min(911, global_element.width()) ? '73%' : '100%'); //可以看见按钮的最小宽度 665 的 1/0.73 倍
                        setTureHeight(selfbox);
                        rememberWH(iframe);
                        rememberWH(iframeContainer);
                        setWH(iframe);
                        setWH(iframeContainer);
                        iframeContainer.height(selfbox.height() - title_text.parent().height());
                        setMaxHeight(selfbox, iframeContainer);
                    }
                });
            });
            window.setInterval(function() {
                if (!window.widget.bilibili.iframes || window.widget.bilibili.iframes.size === 0) return;
                window.widget.bilibili.iframes.forEach(function(retryLink, iframe) {
                    if (!retryLink || !retryLink.closest || !iframe || !$(iframe).data) return window.widget.bilibili.iframes.delete(iframe);
                    if (!retryLink.closest('.bilibili-iframe-container')[0]) retryLink.appendTo(iframe.closest('.bilibili-iframe-container'));
                    if ($(iframe).data('load') !== 'complete') retryLink.fadeIn();
                    else retryLink.fadeOut();
                });
            }, 1000);
            $(window).on('resize', function() {
                $('.bilibili-video-container.onshow.widescreen').each(function() {
                    var selfbox = $(this);
                    selfbox.css('width', selfbox.parent().width() > Math.min(911, global_element.width()) ? '73%' : '100%');
                    setTureHeight(selfbox);
                    setMaxHeight(selfbox, selfbox.find('.bilibili-iframe-container'));
                });
            });
        }
    });
});
</script><!--{/if}-->