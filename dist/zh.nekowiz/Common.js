/* 此处的JavaScript将加载于所有用户每一个页面。 */
// importArticles({
//     type: 'script',
//     articles: [
//         'u:dev:FloatingToc/code.js'
//     ]
// });

$(function() {
    /*
    var script  = document.createElement("script");
    script.type = "text/javascript";
    script.src  = "http://www.telize.com/jsonip?callback=checkIp";
    document.getElementsByTagName("head")[0].appendChild(script);
    */
    
    //createLeftMeun(); -- This element is not permitted
    moveCardPoll();
    
    if (isExisted(".cardBoxSenzaiDetail"))
        cardBoxSenzaiDetail_Init();
});

function createLeftMeun() {
	var div = document.createElement("div");
	$(div).attr("class", "leftMenu");
	$("#mw-content-text").prepend(div);
	
	var handBookDiv = document.createElement("div");
	$(handBookDiv).attr("class", "handbook");
	$(handBookDiv).appendTo(div);
	
	var questDiv = document.createElement("div");
	$(questDiv).attr("class", "quest");
	$(questDiv).appendTo(div);
	
	var friendDiv = document.createElement("div");
	$(friendDiv).attr("class", "friend");
	$(friendDiv).appendTo(div);
	
	getMenuImage("精靈圖鑑.png", "精靈圖鑑", "handbook");
	getMenuImage("題庫搜尋.png", "題庫搜尋器", "quest");
	getMenuImage("好友搜尋.png", "代表搜尋器", "friend");
}

function getMenuImage(fileName, link, node) {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%5B%5Bfile%3A' + fileName + '%7Clink=' + link + '%5D%5D')
	}, function (data) {
		var content = $(data.parse.text['*']).children();
		$(content).children().attr('width', '').attr('height', '');
		$("div.leftMenu ." + node).append(content);
	}, 'json');
}

function moveCardPoll(){
    $("#WikiaRail").prepend($("#card_poll"));
}

function cardBoxSenzaiDetail_Init() {
    var msDuration = 500;

    $(".cardBoxSenzaiDetail").append(
        $("<a>").prop({
            "href": "javascript: void(0);",
            "id": "cardBoxSenzaiDetailBtnOK"
        }).
        
        click(function() {
            var theWidth  = $(".cardBoxSenzaiDetail").css("width");
            var theHeight = $(".cardBoxSenzaiDetail").css("height");

            $(".cardBoxSenzaiDetail").animate({
                width: 0,
                height: 0,
                opacity: 0
            },
                msDuration,
                function() {
                    $(".cardBoxSenzaiDetail").css({
                        width: theWidth,
                        height: theHeight,
                        display: "none"
                    });
            });
        })
    );

    $(".cardBoxSenzaiData").click(function() {
        var theHeight = $(".cardBoxSenzaiDetail").css("height");

        $(".cardBoxSenzaiDetail").css({
            height: 0,
            opacity: 0
        }).show();
        $(".cardBoxSenzaiDetail").animate({
            height: theHeight,
            opacity: 1
        },
            msDuration
        );
    });
}

function isExisted(jQuerySelector) {
    return 0 !== $(jQuerySelector).length;
}


// tooltip
window.texttip = function(){
    var tt = $('.tt-text'),tl;
    tt.removeAttr('title').on('mouseenter touchstart',function(){
        var o = $(this).offset(), w = document.body.clientWidth, b = $(this).hasClass('bottom'), l = $(this).hasClass('line');
        var p = b ? {top: o.top+$(this).outerHeight()+5} : {bottom: document.body.clientHeight-o.top-$(this).outerHeight()};
        if(o.left<w/2) p.left = b ? o.left : o.left+$(this).outerWidth()+5;
        else p.right = b ? w-o.left-$(this).outerWidth() : w-o.left+5;
        tl = l ?'tt-tip-stage':'tt-tip';
        $('<div>').addClass(tl).css(p).html($(this).data('texttip')).appendTo('body');
    })
    .on('mouseleave touchend',function(){$('.' + tl).remove();}).parent('a').removeAttr('title');
    tt.children('a').removeAttr('title');
};
texttip();



// Pages need to import script
console.log(mw.config.values.wgPageName);
window.scriptMap = {
	'題庫/搜尋': ['MediaWiki:Search.js'],
	'題庫搜尋器': ['MediaWiki:Search.js'],
	'卡片資料/編輯': ['MediaWiki:Cardedit.js'],
	'題庫/新增/四選一': ['MediaWiki:create4select.js'],
	'題庫/新增/排序': ['MediaWiki:createorder.js'],
	'題庫/新增/每日': ['MediaWiki:createdaily.js'],
	'進化素材紀錄器': ['MediaWiki:LoadCardFromWiki.js', 'MediaWiki:CardEvo.js', 'MediaWiki:Taffy-min.js'],
	'代表搜尋器': ['MediaWiki:LeaderRegister.js', 'MediaWiki:LeaderFinder.js'],
	'問答RPG_魔法使與黑貓維茲_維基': ['MediaWiki:LeaderRandom.js']
};
// Use timeout to check importScript is exist after some time
setTimeout(function () {
window.scriptMap[mw.config.values.wgPageName].forEach(function (script) {
    importScript(script);
});
}, 100);


// Page contains some keywords

if (mw.config.values.wgPageName.indexOf('任務') >= 0) {
	importScript('MediaWiki:WizDialog.js');
}