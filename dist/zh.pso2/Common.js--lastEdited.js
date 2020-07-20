/* 此处的JavaScript将加载于所有用户每一个页面。 */
// <syntaxhighlight lang="javascript">
/**
 * lastEdited.js
 * 
 * Adds last edited details to the page
 * @author: [[w:User:Reasno]] Based on [[w:User:Fubuki風吹]]
 */
var getMyDate = function(date){
    return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日 ' + date.getHours() + ':' + date.getMinutes();
}

var toInt = function(str){
    var hash = 0, i, chr, len;
    if (str.length == 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    if (hash<0){
        hash = 0-hash;
    }
    return hash;
}
var getRank = function(numberofedits , id){
    switch(true){
        case numberofedits < 5  :
            switch (id % 2){
                case 0:
                    return  "马僮";
                case 1:
                    return  "帮厨小弟";
                default:
                    return "平民";
            }
        case numberofedits < 10 :
            switch (id % 3){
                case 0:
                    return  "戏子";
                case 1:
                    return  "酒馆招待";
                default:
                    return "侍酒";
            }
        case numberofedits < 20 :
            switch (id % 4){
                case 0:
                    return  "酒馆老板";
                case 1:
                    return  "铁匠学徒";
                case 2:
                    return  "歌手";
                default:
                    return "侍从";
            }
        case numberofedits < 40 :
            switch (id % 5){
                case 0:
                    return  "兽舍掌管";
                case 1:
                    return  "马房总管";
                case 2:
                    return  "助理学士";
                case 3:
                    return  "铁匠";
                default:
                    return "自由骑手";
            }
        case numberofedits < 80 :
            switch (id % 6){
                case 0:
                    return  "修士";
                case 1:
                    return  "学士";
                case 2:
                    return  "炼金术士";
                case 3:
                    return  "易形者";
                case 4:
                    return  "卫兵";
                case 5:
                    return  "狱卒";
                default:
                    return "流亡骑士";
            }
        case numberofedits < 140 :
            switch (id % 7){
                case 0:
                    return "金袍子";
                case 1: 
                    return "战士之子";
                case 2: 
                    return "临冬城总管";
                case 3: 
                    return "铁舰队";
                case 4:
                    return "次子团";
                case 5: 
                    return "风吹团";
                case 6: 
                    return "暴鸦团";
                default:
                    return "雇佣骑士";
            }
        case numberofedits < 250 :
            switch (id % 8){
                case 0:
                    return "御林兄弟会";
                case 1: 
                    return "无旗兄弟会";
                case 2: 
                    return "黄金团";
                case 3: 
                    return "鸦齿卫";
                case 4:
                    return "守夜人";
                case 5: 
                    return "首席剑客";
                case 6: 
                    return "教头";
                case 7: 
                    return "贴身护卫";
                default:
                    return "效忠骑士";
            }
        case numberofedits < 450 :
            switch (id % 9){
                case 0:
                    return "红袍祭祀";
                case 1:
                    return "红堡教头";
                case 2:
                    return "代理城主";
                case 3:
                    return "缚影士";
                case 4:
                    return "海盗船长";
                case 5:
                    return "御前执法官";
                case 6:
                    return "学城博士";
                case 7:
                    return "血盟卫";
                case 8:
                    return "浪鸦";
                default:
                    return "有产骑士";
            }
        case numberofedits < 750 :
            switch (id % 10){
                case 0:
                    return "马格拿";
                case 1: 
                    return "闪电大王";
                case 2: 
                    return "黄金团团长";
                case 3: 
                    return "总主教";
                case 4:
                    return "守夜人总司令";
                case 5: 
                    return "战士之子指挥官";  
                case 6: 
                    return "都城守备队队长"; 
                case 7:
                    return "血门骑士";
                case 8:
                    return "微笑骑士";
                case 9:
                    return "慈祥的人";
                default:
                    return "比武冠军";
            } 
        case numberofedits < 1250 :
            switch (id % 11){
                case 0:
                    return "拥王者";
                case 1:
                    return "龙骑士";
                case 2:
                    return "弑君者";
                case 3:
                    return "拂晓神剑";
                case 4:
                    return "彩虹护卫";
                case 5:
                    return "百花骑士";
                case 6:
                    return "镜盾";
                case 7:
                    return "白牛";
                case 8:
                    return "绿橡树";
                case 9:
                    return "睡狮";
                case 10:
                    return "无畏的";
                default:
                    return "御林铁卫";
            }
        case numberofedits < 1900 :
            switch (id % 12){
                case 0:
                    return "公义者同盟";
                case 1: 
                    return "鹰身女妖之子";
                case 2: 
                    return "绿党";
                case 3: 
                    return "黑党";
                case 4:
                    return "后党";
                case 5: 
                    return "王党";
                case 6: 
                    return "王党";
                case 7: 
                    return "海盐王";
                case 8: 
                    return "磐岩王";
                case 9: 
                    return "临冬城亲王";
                case 10: 
                    return "秃鹫王";
                case 11: 
                    return "潘托斯总督";
                default:
                    return "贵族";  
            }
        case numberofedits < 2800 :
            switch (id % 13){
                case 0:
                    return "白刃河守护";
                case 1:
                    return "兰尼斯港之盾";
                case 2:
                    return "盛夏厅亲王";
                case 3:
                    return "血之贵胄";
                case 4:
                    return "旧镇之音";
                case 5:
                    return "暮之星";
                case 6:
                    return "南疆大元帅";
                case 7:
                    return "狭海舰队司令";
                case 8:
                    return "绿先知";
                case 9:
                    return "海风之子";
                case 10:
                    return "石路守护";
                case 11:
                    return "亲王隘口守护";
                case 12:
                    return "河渡口领主";
                default:
                    return "伯爵";  
            }
        case numberofedits < 3800 :
            switch (id % 14){
                case 0:
                    return "北境守护";
                case 1:
                    return "西境守护";
                case 2:
                    return "南境守护";
                case 3:
                    return "东境守护";
                case 4:
                    return "临冬城公爵";
                case 5:
                    return "凯岩城公爵";
                case 6:
                    return "龙石岛亲王";
                case 7:
                    return "多恩亲王";
                case 8:
                    return "高庭公爵";
                case 9:
                    return "风息堡公爵";
                case 10:
                    return "奔流城公爵";
                case 11:
                    return "鹰巢城公爵";
                case 12:
                    return "狂笑风暴";
                case 13:
                    return "铁群岛大王";
                default:
                    return "公爵"; 
            }
        case numberofedits < 5000 :
            switch (id % 15){
               case 0:
                    return "海军上将";
                case 1:
                    return "法务大臣";
                case 2:
                    return "情报总管";
                case 3:
                    return "财政大臣";
                case 4:
                    return "大学士";
                case 5:
                    return "御林铁卫队长";
                case 6:
                    return "摄政";
                case 7:
                    return "国王之手";
                case 8:
                    return "国库经理";
                case 9:
                    return "裁判法官";
                case 10:
                    return "海政大臣";
                case 11:
                    return "全境守护者";
                case 12:
                    return "海军司令";
                case 13:
                    return "女王铁卫队长";
                case 14:
                    return "王储";
                default:
                    return "御前会议成员"; 
            }
        case numberofedits < 6500 :
            switch (id % 16){
                case 0:
                    return "北境之王";
                case 1:
                    return "山脉和谷地之王";
                case 2:
                    return "河湾王";
                case 3:
                    return "风暴王";
                case 4:
                    return "群岛与河流之王";
                case 5:
                    return "多恩王";
                case 6:
                    return "凯岩王";
                case 7:
                    return "群岛与河流之王";
                case 8:
                    return "群屿与北境之王";
                case 9:
                    return "北境和三叉戟河之王";
                case 10:
                    return "河流与山丘之王";
                case 11:
                    return "塞外之王";
                case 12:
                    return "狮鹫王";
                case 13:
                    return "布拉佛斯海王";
                case 14:
                    return "狭海与石阶列岛之王";
                case 15:
                    return "至高王";
                default:
                    return "安达尔人国王"; 
            }
        case numberofedits < 8500 :
            switch (id % 17){
                case 0:
                    return "征服者";
                case 1:
                    return "龙王";
                case 2:
                    return "少龙王";
                case 3:
                    return "残酷的";
                case 4:
                    return "人瑞王";
                case 5:
                    return "仲裁者";
                case 6:
                    return "睿智的";
                case 7:
                    return "庸王";
                case 8:
                    return "龙祸";
                case 9:
                    return "王国之光";
                case 10:
                    return "篡夺者";
                case 11:
                    return "贤王";
                case 12:
                    return "不该成王的王";
                case 13:
                    return "疯王";
                case 14:
                    return "风暴降生";
                case 15:
                    return "不焚者";
                case 16:
                    return "乞丐王";
                default:
                    return "坦格利安国王";
            }
        case numberofedits < 11000 :
            switch (id % 18){
                case 0:
                    return "筑城者";
                case 1:
                    return "造船者";
                case 2:
                    return "飞鹰骑士";
                case 3:
                    return "风暴王";
                case 4:
                    return "裹尸布大王";
                case 5:
                    return "被神憎恨的";
                case 6:
                    return "机灵的";
                case 7:
                    return "星眼";
                case 8:
                    return "灰海王";
                case 9:
                    return "丘陵之王";
                case 10:
                    return "夜王";
                case 11:
                    return "吟游诗人";
                case 12:
                    return "最后的英雄";
                case 13:
                    return "阿莱莎之泪";
                case 14:
                    return "晨光";
                case 15:
                    return "冰斧";
                case 16:
                    return "焚船者";
                case 17:
                    return "冰眼";  
                default:
                    return "历史人物";          
            }
        case numberofedits < 15000 :
            switch (id % 18){
                case 0:
                    return "拉赫洛";
                case 1:
                    return "至高牧神";
                case 2:
                    return "娜迦";
                case 4:
                    return "七神";
                case 5:
                    return "旧神";
                case 6:
                    return "淹神";
                case 7:
                    return "风暴神";
                case 8:
                    return "河中老人";
                case 9:
                    return "千面之神";
                case 10:
                    return "夜狮";
                case 11:
                    return "骑乘世界的骏马";
                case 12:
                    return "寒神";
                case 13:
                    return "异鬼";
                case 14:
                    return "森林之子";
                case 15:
                    return "巨人";
                case 16:
                    return "三眼乌鸦";
                case 17:
                    return "迷宫营造者";  
                default:
                    return "非自然"; 
            }
        default:
            return "冰与火之歌";
    }
}
$(function() {
    var lastEdited = $.extend({
        size: false,
        diff: true,
        comment: true,
        time: true,
        avatar: true,
        isBot: false,
        editCount: true
    }, window.lastEdited);
    if (mw.config.get('wgNamespaceNumber') ==2 ||mw.config.get('wgNamespaceNumber') ==500||mw.config.get('wgNamespaceNumber') ==1200|| mw.config.get('wgNamespaceNumber') ==-1){
        var rank = getRank($('.UserProfileMasthead .tally em').html().replace(/\,/g,''),toInt($('h1[itemprop="name"]').html()));
        $('.UserProfileMasthead .masthead-info hgroup').append('<span class="tag">'+rank+'<span>');
    } 

    if (!$.getUrlVar('diff') && !$.getUrlVar('oldid') && 
       (mw.config.get('wgNamespaceNumber') ==0 ||  mw.config.get('wgNamespaceNumber') ==114)
       ) {
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: mw.config.get('wgPageName'),
            prop: 'revisions',
            rvprop: 'timestamp|user|size|parsedcomment|userid',
            rvdiffto: 'prev',
            format: 'json'
        }, function(data) {
            for (var i in data.query.pages) break;
            var rv = data.query.pages[i].revisions[0],
                sel,
                action = 'append';
            if(rv.user=="黑死神贝勒里恩"||rv.user=="瓦格哈尔"||rv.user=="米拉西斯" ) //exclude our bot account
            {
                $.get(mw.util.wikiScript('api'), {
                    action: 'query',
                    titles: mw.config.get('wgPageName'),
                    prop: 'revisions',
                    rvprop: 'timestamp|user|size|parsedcomment|userid',
                    format: 'json',
                    rvdir: 'newer'
                }, function(data) {
                    lastEdited.diff = false;
                    lastEdited.isBot = true;
                    lastEdited.comment = false;
                    var rv = data.query.pages[i].revisions[0],
                        sel,
                        action = 'append';
                    prepareHtml(lastEdited, rv);
                });
            }else{
                prepareHtml(lastEdited, rv);
            }

        });
    }
});

var prepareHtml = function(lastEdited, rv){
    var html = '<div class="lastEdited"><table style="width:100%"><trstyle="vertical-align: middle">';
    if (lastEdited.avatar){
        if (rv.userid == 0){
            html += '<td style="width:10%"><div class="contributorAvatar avatar-container anon-avatar-placeholder"></div></td>'
        }else{
            html += '<td style="width:10%"><div class="contributorAvatar avatar-container"></div></td>';
        }
    }
    if(lastEdited.isBot){
        html += '<td><a class="name" href="/wiki/User:' + encodeURIComponent(rv.user) + '">' + rv.user + '</a>'+'是这个词条的创立者';
    }else{
        html += '<td><a class="name" href="/wiki/User:' + encodeURIComponent(rv.user) + '">' + rv.user + '</a>'+'进行了最后一次编辑';
    }
    if (lastEdited.time) {
        html += ', 时间是' + getMyDate(new Date(rv.timestamp)); 
    }
    //html += '<div class="wikia-button secondary bdlikebutton" id="bdlikebutton" style="display:inline-table"></div><script id="bdlike_shell"></script><script>var bdShare_config = {"type":"small","color":"orange","uid":"565741","likeText":"赞","likedText":"已赞过","share":"no"};</script>';

    if (lastEdited.diff && rv.diff.from) {
        html += ' <a class="lastEdited-diff">(变动)</a>';
    }
    if (lastEdited.comment && rv.parsedcomment) {
        html += '<p class="editSummary">TA说: “' + rv.parsedcomment+'”</p>';
    }
    if (lastEdited.size) {
        html += '<br>Current size: ' + rv.size + ' bytes';
    }
    html+= '</td>'
    if (lastEdited.editCount){
        if (rv.userid == 0){
            html += '<td style="width:20%"><div class="editCount">无面者</div></td>';
        }else{
            html += '<td style="width:20%"><div class="editCount"></div></td>';
        }
    }
    html += '</div>';
    switch (mw.config.get('wgNamespaceNumber')) {
        case 2:
        case 3:
            sel = '.UserProfileActionButton';
            action = 'after';
            // mw.util.addCSS('.lastEdited {font-size:14px; font-color:747F8C; padding-bottom: 5px;border-bottom: 1px solid #ccc;}');
            break;
        default:
            sel = '#WikiaArticleFooter';
    }
    // if (action == 'after') {
    //     $(sel).after(html);
    // } else {
    //     $(sel).append(html);
    // }
    $(sel).before(html);
    if (lastEdited.avatar || lastEdited.editCount) {
        $.ajax({
            url: '/api/v1/User/Details',
            data: {ids:rv.userid, size:'36'},
            success: function(data) {
                var ud = data.items[0];
                var avatarImage = document.createElement("img");
                avatarImage.src = ud.avatar;
                avatarImage.width ="36";
                avatarImage.height ="36";
                avatarImage.className = 'avatar';
                $('.contributorAvatar').append(avatarImage);
                $('.editCount').append(getRank(ud.numberofedits, toInt(ud.title.replace(/\_/g,' '))));
            },
            dataType: "json"
        });

    }
    // try{
    //     document.getElementById("bdlikebutton").setAttribute('data','{\'url\':\'http://zh.asoiaf.wikia.com/index.php?curid='+wgArticleId+'\',\'wbuid\':2628248563}');
    //     document.getElementById("bdlike_shell").src="http://bdimg.share.baidu.com/static/js/like_shell.js?t=" + new Date().getHours();
    // }catch(err){}

    mw.loader.using(['mediawiki.action.history.diff'], function() {
        $('.lastEdited-diff').on('click', function() {
            $.showCustomModal('Changes: ' + mw.config.get('wgPageName').replace(/_/g, ' '), rv.diff['*'], {
                id: 'lastEdited-diff',
                width: 650,
                buttons: [{
                    message: 'Link',
                    defaultButton: true,
                    handler: function() {
                        $('#lastEdited-diff').closeModal();
                        window.open('/?diff=' + rv.diff.to, '_blank');
                    }
                }, {
                    message: 'Undo',
                    handler: function() {
                        $('#lastEdited-diff').closeModal();
                        window.open('/wiki/' + mw.config.get('wgPageName') + '?action=edit&undoafter=' + rv.diff.from + '&undo=' + rv.diff.to, '_blank');
                    }
                }, {
                    message: 'Cancel',
                    handler: function() {
                        $('#lastEdited-diff').closeModal();
                    }
                }]
            });
        });
    });
}


// </syntaxhighlight>