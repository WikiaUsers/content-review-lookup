/* 此处的JavaScript将加载于所有用户每一个页面。 */
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js'
    ]
});

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
wgPageName === '題庫/搜尋' && importScript('MediaWiki:Search.js');
wgPageName === '題庫搜尋器' && importScript('MediaWiki:Search.js');
wgPageName === '卡片資料/編輯' && importScript('MediaWiki:Cardedit.js');
wgPageName === '題庫/新增/四選一' && importScript('MediaWiki:create4select.js');
wgPageName === '題庫/新增/排序' && importScript('MediaWiki:createorder.js');
wgPageName === '題庫/新增/每日' && importScript('MediaWiki:createdaily.js');
wgPageName === '進化素材紀錄器' && importScript('MediaWiki:LoadCardFromWiki.js');
wgPageName === '進化素材紀錄器' && importScript('MediaWiki:CardEvo.js');
wgPageName === '進化素材紀錄器' && importScript('MediaWiki:Taffy-min.js');
wgPageName === '代表搜尋器' && importScript('MediaWiki:LeaderRegister.js');
wgPageName === '代表搜尋器' && importScript('MediaWiki:LeaderFinder.js');
wgPageName === '問答RPG_魔法使與黑貓維茲_維基' && importScript('MediaWiki:LeaderRandom.js');


// Page contains some keywords

wgPageName.indexOf('任務') && importScript('MediaWiki:WizDialog.js');

//Tabs

function tabs() {
    var defaultStyle = {
        purple: {
            labelColor: " ", //anti check
            labelBackgroundColor: "#9070c0",
            labelBorderColor: "#b090e0 #7050a0 #9070c0 #b090e0",
            labelPadding: ".2em .3em .2em .3em",
            textBorderColor: "#9070c0",
            textBackgroundColor: "#f0edf5",
            textPadding: "1em",
        },
        green: {
            labelColor: " ",
            labelBackgroundColor: "#75c045",
            labelBorderColor: "#90d060 #60b030 #75c045 #90d060",
            labelPadding: ".2em .3em .2em .3em",
            textBorderColor: "#75c045 #60b030 #60b030 #75c045",
            textBackgroundColor: "#f5fffa",
            textPadding: "1em",
        },
        red: {
            labelColor: " ",
            labelBackgroundColor: "#FF0000",
            labelBorderColor: "#FF8888 #CC0000 #FF0000 #FF8888",
            labelPadding: ".2em .3em .2em .3em",
            textBorderColor: "#FF0000 #CC0000 #CC0000 #FF0000",
            textBackgroundColor: "#fffafa",
            textPadding: "1em",
        },
        blue: {
            labelColor: " ",
            labelBackgroundColor: "#5b8dd6",
            labelBorderColor: "#88abde #3379de #5b8dd6 #88abde",
            labelPadding: ".2em .3em .2em .3em",
            textBackgroundColor: "#f0f8ff",
            textBorderColor: "#5b8dd6 #3379de #3379de #5b8dd6",
            textPadding: "1em",
        },
        yellow: {
            labelColor: " ",
            labelBackgroundColor: "#ffe147",
            labelBorderColor: "#ffe977 #ffd813 #ffe147 #ffe977",
            labelPadding: ".2em .3em .2em .3em",
            textBackgroundColor: "#fffce8",
            textBorderColor: "#ffe147 #ffd813 #ffd813 #ffe147",
            textPadding: "1em",
        },
        orange: {
            labelColor: " ",
            labelBackgroundColor: "#ff9d42",
            labelBorderColor: "#ffac5d #ff820e #ff9d42 #ffac5d",
            labelPadding: ".2em .3em .2em .3em",
            textBackgroundColor: "#ffeedd",
            textBorderColor: "#ff9d42 #ff820e #ff820e #ff9d42",
            textPadding: "1em",
        },
        black: {
            labelColor: " ",
            labelBackgroundColor: "#7f7f7f",
            labelBorderColor: "#999999 #4c4c4c #7f7f7f #999999",
            labelPadding: ".2em .3em .2em .3em",
            textBackgroundColor: "#e5e5e5",
            textBorderColor: "#7f7f7f #4c4c4c #4c4c4c #7f7f7f",
            textPadding: "1em",
        },
    };
    $("body").addClass("tab");
    // A Class
    function StyleSheet() { }
    StyleSheet.prototype.getOwnPropertyNamesLength = function getOwnPropertyNamesLength() {
        return Object.getOwnPropertyNames(this).length;
    };
    String.prototype.toLowerFirstCase = function toLowerFirstCase() {
        return this[0].toLowerCase() + this.substring(1);
    };
    $(".Tabs").each(function () {
        if ($(this).children(".TabLabel")[0]) { return true; }
        var self = $(this),
            classList = Array.from(this.classList).filter(function (n) { return n in defaultStyle; }),
            data = $.extend({
                labelPadding: null,
                labelBorderColor: null,
                labelColor: null,
                labelBackgroundColor: $("#content").css("background-color"),
                textPadding: null,
                textBorderColor: null,
                textBackgroundColor: null,
                defaultTab: 1,
            }, classList[0] ? defaultStyle[classList[0]] || {} : {}, this.dataset || {}),
            tabLabel = self.append('<div class="TabLabel"></div>').children(".TabLabel"),
            tabContent = self.append('<div class="TabContent"></div>').children(".TabContent"),
            labelPadding = data.labelPadding,
            labelColor = data.labelColor,
            styleSheet = {
                label: new StyleSheet(),
                text: new StyleSheet(),
            },
            defaultTab = parseInt(data.defaultTab);
        self.children(".Tab").each(function () {
            if ($(this).children(".TabLabelText").text().replace(/\s/g, "").length || $(this).children(".TabLabelText").children().length) {
                $(this).children(".TabLabelText").appendTo(tabLabel);
                $(this).children(".TabContentText").appendTo(self.children(".TabContent"));
            }
            $(this).remove();
        });
        if (isNaN(defaultTab) || defaultTab <= 0 || defaultTab > tabLabel.children(".TabLabelText").length) { defaultTab = 1; }
        tabLabel.children(".TabLabelText").on("click", function () {
            var label = $(this);
            label.addClass("selected").siblings().removeClass("selected").css({
                "border-color": "#aaa",
                "background-color": "inherit",
            });
            tabContent.children(".TabContentText").eq(tabLabel.children(".TabLabelText").index(label)).addClass("selected").siblings().removeClass("selected").removeAttr("style");
            if (styleSheet.label.getOwnPropertyNamesLength()) { label.css(styleSheet.label); }
            if (label.is(":visible")) { tabLabel.height(label.outerHeight(true)); }
            else { tabLabel.removeAttr("style"); }
        }).eq(defaultTab - 1).click();
        if (labelPadding) { tabLabel.children(".TabLabelText").css("padding", labelPadding); }
        ["labelBorderColor", "labelBackgroundColor", "textPadding", "textBorderColor", "textBackgroundColor"].forEach(function (n) {
            var target = /^label/.test(n) ? "label" : "text",
                key = n.replace(target, "").toLowerFirstCase();
            styleSheet[target][key] = data[n];
        });
        if (labelColor) { styleSheet.label.borderTopColor = labelColor; }
        else if (styleSheet.label.borderColor) { styleSheet.label.borderTopColor = "green"; }
        tabLabel.find(".selected").click();
        if (styleSheet.text.getOwnPropertyNamesLength()) { tabContent.css(styleSheet.text); }
        if (data.autoWidth === "yes") { self.css("display", "inline-block"); }
    });
}

// Tabs执行
if ($(".Tabs")[0]) { tabs(); }

/* tabs功能引自萌娘百科(https://zh.moegirl.org)，文字内容默認使用《知識共享 署名-非商業性使用-相同方式共享 3.0》協議。
/* 閱讀更多：https://zh.moegirl.org/MediaWiki:Common.js */