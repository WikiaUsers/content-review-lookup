var h;
var system = {tv:{}}; // 辣鸡 真辣鸡
var cacheKey = {lastPostListKey: 'lastPostList', lastActiveKey: 'lastActive'};


function initContent(){
    // 4.绿色引用串显示
    $("font[color='#789922']")
        .filter(function () {
            return /^((>>No\.)|(>>)|(>))\d+$/.test($(this).text());
        })
        .on('mouseenter', function (e) {
            var self = this;
            var tid = /\d+/.exec($(this).text())[0];
            $.get('/Home/Forum/ref?id='+tid)
                .done(function(data){
                    if(data.indexOf('<!DOCTYPE html><html><head>')>=0){
						console.log('ref tid ' + tid + ' return false');
                        return false;
                    }

                    $("#h-ref-view").off().html(data).css({
                        top:$(self).offset().top,
                        left:$(self).offset().left
                    }).fadeIn(100).one('mouseleave',function(){
                        $(this).fadeOut(100);
                    })
                });
        });

    // 5.主站视频引用
    $('.h-threads-content').each(function(){
        return;
        var html = $(this).html();
        var contentIdRegExp = /ac(\d{2,8})/g;
        var codeRegExp = /```\<br\>(.*?)```/g;
        var hideenRegExp = /\[h\](.*?)\[\/h\]/g;
        var isChanged = false;

        if(contentIdRegExp.test(html)){
            isChanged = true;
            html = html.replace(contentIdRegExp,'<a href="http://www.acfun.tv/v/ac$1" data-acfun-contentId="$1" target="_blank">ac$1</a>');
        }

        if(codeRegExp.test(html)  && typeof forum == 'object' && ['技术宅'].indexOf(forum.name) >= 0){
            isChanged = true;
            html = html.replace(codeRegExp,'<pre>$1</pre>').replace(/\<font color\=\"#789922\"\>(.*?)\<\/font\>/g,"$1");
        }

        if(hideenRegExp.test(html) && typeof forum == 'object' && ['动画','漫画'].indexOf(forum.name) >= 0){
            isChanged = true;
            html = html.replace(hideenRegExp,'<span class="h-hidden-text">$1</span>');
        }

        if(isChanged){
            $(this).html(html);
        }
    });

    $('a[data-acfun-contentid]').on({

        'mouseenter': function(e){
            var self = this;
            $.getScript('http://api.acfun.tv/apiserver/content/info?cd=1&contentId='+$(this).attr('data-acfun-contentid'))
                .done(function(){

                    if(system.tv.status != 200){
                        return false;
                    }

                    var data = system.tv.data.fullContent;

                    $('.h-acfun-preview-cover').attr('src',data.cover);
                    $('.h-acfun-preview-title').text(data.title).attr('href','http://www.acfun.tv/v/ac'+data.contentId);
                    $('.h-acfun-preview-desc').text(data.description);
                    $('.h-acfun-preivew-user').text(data.user.username).attr('href','http://www.acfun.tv/u/'+data.user.userId+'.aspx');
                    $('.h-acfun-preview-href').text('http://www.acfun.tv/v/ac'+data.contentId).attr('href','http://www.acfun.tv/v/ac'+data.contentId);

                    $("#h-acfun-preview").off().css({
                        top:$(self).offset().top,
                        left:$(self).offset().left
                    }).fadeIn(100).one('mouseleave',function(){
                        $(this).fadeOut(100);
                    })
                });
        }
    });

    // $(() => {Array.from(document.getElementsByClassName("h-threads-item-index")).filter(element => {
    //     return (100 * element.clientHeight / window.innerHeight) < 95
    // }).forEach(element => {
    //     element.style.setProperty('overflow-y', 'inherit')
    //     element.style.setProperty('max-height', '100%')
    // })})
}