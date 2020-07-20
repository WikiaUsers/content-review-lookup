;(function(mw, $, mainRoom){
    $.ajax({
        method: 'GET',
        dataType: 'text',
        url: mw.util.wikiScript('index'),
        data: {
            title: 'User:' + wgUserName + '/Emoticons',
            action: 'raw',
            ctype: 'text/plain'
        }
    }).done(function(data){
        var mapping = new EmoticonMapping();
        mapping.loadFromWikiText(data);
        $(function(){
            var $elem = $('.Chat li[data-user]');
            $elem.each(function(){
                var $msg = $(this).find('.message'),
                    $emoticon = $msg.find('img[src]'),
                    txt = $msg.html();
                $.each(mapping._settings, function(image_src, value){
                    var rg = new RegExp('(' + (Array.prototype.map.call(value, function(v, i){
                            return v.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                        })).join('|') + ')', 'gi'),
                        img = '<img src="' + image_src + '" alt="$1" title="$1" width="19" height="19" />';
                    if ($emoticon.length > 0){
                        $emoticon.each(function(index){
                            var $img = $(this),
                                img_src = $(this).attr('src'),
                                img_alt = $(this).attr('alt');
                            if (rg.test(img_alt)){
                                img_src = img_src.replace(rg, img);
                            }
                            $img.replaceWith($('<img />').attr({
                                'src': img_src,
                                'alt': img_alt,
                                'title': img_alt,
                                'width': '19',
                                'height': '19'
                            }));
                        });
                    } else {
                        txt = txt.replace(rg, img);
                    }
                });
                if ($emoticon.length === 0) $msg.html(txt);
            });
        });
 
        mainRoom.model.chats.bind('afteradd', function(child){
            var $elem = $('.Chat li#entry-' + child.cid),
                $msg = $elem.find('.message'),
                $emoticon = $msg.find('img[src]'),
                txt = $msg.html();
            $.each(mapping._settings, function(image_src, value){
                var rg = new RegExp('(' + (Array.prototype.map.call(value, function(v, i){
                            return v.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                        })).join('|') + ')', 'gi'),
                    img = '<img src="' + image_src + '" alt="$1" title="$1", width="19" height="19" />';
                if ($emoticon.length > 0){
                    $emoticon.each(function(index){
                        var $img = $(this),
                            img_src = $(this).attr('src'),
                            img_alt = $(this).attr('alt');
                        if (rg.test(img_alt)){
                            img_src = img_src.replace(rg, img);
                        }
                        $img.replaceWith($('<img />').attr({
                            'src': img_src,
                            'alt': img_alt,
                            'title': img_alt,
                            'width': '19',
                            'height': '19'
                        }));
                    });
                } else {
                    txt = txt.replace(rg, img);
                }
            });
            if ($emoticon.length === 0) $msg.html(txt);
        });
    });
})(this.mediaWiki, this.jQuery, this.mainRoom);