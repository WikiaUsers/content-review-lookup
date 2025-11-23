
/*mw.loader.using('mediawiki.util', function() {
  $(function() {
    const cardname = [
      '战车', '恶魔','死神','皇帝','女皇','愚者','倒吊人','隐者','女祭司','审判','正义',
      '恋人','魔术师','月亮','教皇','太阳','星星','力量','节制','世界','命运之轮','塔',
    ];

    $('#drawTarotButton').on('click', function() {
      const randomIndex = Math.floor(Math.random() * cardname.length);
      const selectedCard = cardname[randomIndex];
      const imageUrl = mw.config.get('wgServer') + mw.config.get('wgArticlePath').replace('$1', 'File:' + encodeURIComponent(selectedCard + '-塔罗牌.png'));
      $('#cardImage').attr('src', imageUrl).show();
    });
  });
});
const cardname = [
            '战车', '恶魔','死神','皇帝','女皇','愚者','倒吊人','隐者','女祭司','审判','正义',
            '恋人','魔术师','月亮','教皇','太阳','星星','力量','节制','世界','命运之轮','塔',
 
        ];
        
 
        function drawTarotCard() {
            // 随机选择一张塔罗牌
            const randomIndex = Math.floor(Math.random() * cardname.length);
            const selectedCard = cardname[randomIndex];
            // 获取图片的URL
            const imageUrl = mw.wikiApi.getImageUrl(selectedCard + '-塔罗牌.png');
            // 更新图片的src属性
            const cardImageElement = document.getElementById('cardImage');
            cardImageElement.src = imageUrl;
            cardImageElement.style.display = 'block';
        }*/
        function drawTarotCard() {
    const cardname = ['战车', '恶魔', '死神', '皇帝', '女皇', '愚者', '倒吊人', '隐者', '女祭司', '审判', '正义', '恋人', '魔术师', '月亮', '教皇', '太阳', '星星', '力量', '节制', '世界', '命运之轮', '塔'];
    const randomIndex = getRandomNumber(0, cardname.length - 1); // Use the function
    const selectedCard = cardname[randomIndex];
    const imageFileName = 'File:' + selectedCard + '-塔罗牌.png';
    // Rest of your API logic to fetch and display the image
    const api = new mw.Api();
    api.get({
        action: 'query',
        titles: imageFileName,
        prop: 'imageinfo',
        iiprop: 'url',
        format: 'json'
    }).done(function(data) {
        const cardImageElement = document.getElementById('cardImage');
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId !== '-1' && pages[pageId].imageinfo && pages[pageId].imageinfo[0].url) {
            cardImageElement.src = pages[pageId].imageinfo[0].url;
            cardImageElement.style.display = 'block';
        } else {
            cardImageElement.src = 'https://huiji-public.huijistatic.com/nikkiup2u/uploads/b/ba/%E5%8D%A1%E8%83%8C-%E5%A1%94%E7%BD%97%E7%89%8C.png';
            cardImageElement.alt = '卡背（图片未找到）';
        }
    });
}




/*function generateNumber() {
    var randomNum = Math.floor(Math.random() * 22) + 1;
    document.getElementById("result").innerText = "Random Number: " + randomNum;
}*/

document.addEventListener('click', function(event) {
	if (event.target.classList.contains('mw-customtoggle-random')) {
        var randomNum = Math.floor(Math.random() * 22) + 1;
        document.getElementById('number').innerText = randomNum;
    }
});



/*********___________________***********/
var params = new URLSearchParams(window.location.search);
if (params.get('lang') === 'zh') {
    document.body.classList.add('lang-zh');
} else {
    document.body.classList.add('lang-en');
}


importScriptPage("User:Quynny/BreedingCalculator.js", "dev");
importScriptPage("User:Quynny/BreedingCalculatorData.js", "dev");
importScriptPage("User:Quynny/BreedingResultsLinker", "dev");
importScriptPage("User:Quynny/BreedingResultsLinker.js", "dev");
importScriptPage("User:Quynny/BreedingResultsLinkerData.js", "dev");
// === Load dependencies ===
mw.loader.using(['mediawiki.api', 'mediawiki.util', 'jquery.tablesorter'], function () {

    var submitBtnId = "queryDataBtn";
    var tableHeader = ("").replace("{ |", "{|");
    var tableFooter = "&ensp;" || '\n|}';
    var defaultSearch = "true";
    var conditions  = "";
    var printColumn = paramsFormmatter("名称", "|?");
    var parameters = paramsFormmatter(
        ("template:衣服图鉴,headers:hide,format:template,link:none,named args:1,sort:修改日期,order:desc")
        .replace(/:/g, "="), 
        "|"
    );
    var limit = 100;
    var count = 0;
    var defaultParams = "";

    // === INIT ===
    function init() {
        bindClickEvents();
        defaultParams = getQueryParams();
        if (defaultSearch === "true" || defaultSearch === "1") {
            queryData();
        }
    }

    // === CLICK EVENTS ===
    function bindClickEvents() {
        $("body").on("click", ".btn.queryParams", function(){
            var isSelected = $(this).hasClass("selected");
            if(!isSelected && $(this).data("type") === "radio") {
                $("[data-group='"+$(this).data("group")+"']").removeClass("selected");
            }
            $(this)[isSelected ? "removeClass" : "addClass"]("selected");

        }).on("click", "#" + submitBtnId, function(){
            queryData();

        }).on("click", "#clearParamBtn", function(){
            $(".selected").removeClass("selected");

        }).on("click", ".gridPageBtn, .gridFirstPageBtn, .gridLastPageBtn", function(){
            if($(this).hasClass("hide") || $(this).hasClass("active")) return false;
            var page = $(this).attr("data-page") || $(this).text();
            getPageData(limit, refreshPager(count, limit, page));
        });
    }

    // === QUERY COUNT ===
    function queryData(){
        conditions = getQueryParams() || defaultParams;

        new mw.Api().get({
            action: 'parse',
            format: 'json',
            text: '{{#ask:' + conditions + '|format=count}}',
            contentmodel: 'wikitext'
        }).done(function (data) {
            count = parseInt($(data.parse.text["*"]).text(), 10);
            $("#queryCount").text(count);
            $("#queryLimit").text(limit);
            refreshPager(count, limit, 1);
            getPageData(limit, 1);
        });
    }

    // === QUERY PAGE DATA ===
    function getPageData(limit, page){
        limit = Number(limit);
        page  = Number(page);

        var parametersTemp = parameters + "|limit=" + limit + "|offset=" + (page - 1) * limit;
        var queryText = tableHeader +
            '{{#ask:' + conditions + printColumn + parametersTemp + '}}' +
            tableFooter;

        new mw.Api().get({
            action: 'parse',
            format: 'json',
            text: queryText,
            contentmodel: 'wikitext'
        }).done(function (data) {
            $("#queryDataGrid").html(data.parse.text["*"]);
            $(".sortable").tablesorter();
        });
    }

    // === PAGER ===
    function refreshPager(count, limit, page){
        var sumPage = Math.min(Math.ceil(Number(count) / Number(limit)));
        page = Number(page);
        page = page === 0 ? 1 : page;
        page = page < 0 ? sumPage : page;

        var pageStart = Math.max(1, page - 2);
        var pageEnd = Math.min(Math.ceil(count / limit), pageStart + 4);
        pageStart = pageEnd <= 5 ? 1 : pageStart;

        var $a = $("<a>").attr({href: "javascript:void(0);"});
        var btnArray = [];

        for (var i = pageStart; i <= pageEnd; i++) {
            btnArray.push(
                $("<li>")
                    .addClass("gridPageBtn" + (page === i ? " active" : ""))
                    .append($a.clone().text(i))
            );
        }

        $(".gridPageBtn").remove();
        $(".pagination li:first-child").after(btnArray);

        $(".gridFirstPageBtn")[page === 1 ? "addClass" : "removeClass"]("hide");
        $(".gridLastPageBtn")[page === sumPage || pageEnd === 1 ? "addClass" : "removeClass"]("hide");

        document.body.scrollTop = $("#queryDataGrid").offset().top - 100;
        return page;
    }

    // === PARAM PARSER ===
    function getQueryParams(){
        var conditions = {}, query = [], str = "";

        $(".btn.queryParams.selected").each(function(){ 
            var key = $(this).parents("tr").attr("data-ask-key");
            if(key === "") { 
                str += $(this).attr("data-conditions");
                return true;
            }
            if(conditions[key] === undefined) conditions[key] = [];
            conditions[key].push($(this).attr("data-conditions"));
        });

        $.each(conditions, function(key, valArr){
            query.push('[[' + key + valArr.join("||") + ']]');
        });

        return query.join("") + str;
    }

    // === FORMATTER ===
    function paramsFormmatter(param, connector){
        return ("," + param).split(",").join(connector);
    }

    // === Run when page ready ===
    mw.hook('wikipage.content').add(function () {
        init();
    });

});





















// 可以用es6，且此时必定已有jquery
console.log(`globalSearcher.js is loaded.`)

function loadGlobalSearcher() {
    // 目前用的是warframe的entry。
	const dbEntry = "/index.php?title=MediaWiki:Gadget-Ornaments.json&action=raw&ctype=application/json";
    $('#globalSearcher').children('.gs-formcontainer').html('')
    $('#globalSearcher').children('.gs-formcontainer').append($('<form>').attr('id', 'gs-form'));
    const formbox = $('#globalSearcher').children('.gs-formcontainer').children('#gs-form')
    formbox.submit(function (event) {
        //阻止form因为回车而提交
        event.preventDefault()
    })
    const logbox = $('#globalSearcher').children('.gs-infocontainer')[0]
    const resultbox = $('#globalSearcher').children('.gs-resultcontainer')[0]
    const paginatorbox = $('#globalSearcher').children('.gs-paginator')
    const validCompTypes = [
        "text",
        "dropbox",
        "checkbox",
        "radio",
        "hidden"
    ]
    const config = JSON.parse($('#globalSearcher').find('.gs-config').attr('data-gsconfig'))
    // const config = {
    //     forms: [
    //         { type: 'hidden', model: 'data_type', value: 'item' },
    //         { type: 'text', model: 'item_name', placeholder: '输入名称', title: '物品名称', bindSubmit: true, caseSensitive: false },
    //         {
    //             type: 'dropbox',
    //             model: 'item_type',
    //             options: [
    //                 { value: '', text: '全部' },
    //                 { value: '0', text: '杂物', default: true },
    //                 { value: '1', text: '装备' },
    //                 { value: '2', text: '消耗品' },
    //                 { value: '3', text: '商品' },
    //                 { value: '8', text: '战斗道具' },
    //                 { value: '9', text: '补给品' },
    //                 { value: '11', text: '宝石' },
    //             ],
    //             title: '类型'
    //         },
    //         { type: 'checkbox', model: 'fixable', text: '可修理', },
    //         {
    //             type: 'radio',
    //             model: 'rarity',
    //             options: [
    //                 { value: '', text: '全部' },
    //                 { value: '0', text: '白色', default: true },
    //                 { value: '1', text: '绿色' },
    //                 { value: '2', text: '蓝色' },
    //                 { value: '3', text: '橙色' },
    //             ],
    //             title: '品质'
    //         }
    //     ],
    //     resultTemplate: 'ItemListEntry',
    //     class: 'itemlist',
    // }
    $('#globalSearcher').addClass(config.class)
    for (let compCfg of config.forms) {
        if (!validCompTypes.includes(compCfg.type)) {
            console.error(`不支持的组件类型: ${compCfg.type}`)
            continue
        }
        let comp = null
        switch (compCfg.type) {
            // 根据comCfg输出元素。
            // 表单元素必须有name属性，且值为model属性。
            case 'text': // 文本框
                comp = $('<input>')
                    .attr('type', 'text')
                    .attr('placeholder', compCfg.placeholder)
                    .attr('model', compCfg.model)
                    .attr('name', compCfg.model)
                    .attr('data-gs-bindsubmit', compCfg.bindSubmit)
                break;
            case 'hidden': // 隐藏域
                comp = $('<input>')
                    .attr('type', 'hidden')
                    .attr('model', compCfg.model)
                    .attr('name', compCfg.model)
                    .val(compCfg.value)
                break;
            case 'dropbox': // 下拉框
                comp = $('<select>')
                    .attr('model', compCfg.model)
                    .attr('name', compCfg.model);
                for (let option of compCfg.options) {
                    let opt = $('<option>')
                        .attr('value', option.value)
                        .text(option.text)
                    if (option.default) {
                        opt.attr('selected', 'selected')
                    }
                    comp.append(opt)
                }
                break;
            case 'checkbox': // 复选框
                comp = $('<div>').addClass('checkbox-group')
                let checkbox = $('<input>')
                    .attr('type', 'checkbox')
                    .attr('model', compCfg.model)
                    .attr('reverse', compCfg.reverse)
                    .attr('name', compCfg.model)
                if (compCfg.checked) {
                    checkbox.attr('checked', 'checked')
                }
                let label = $('<label>').append(checkbox).append(compCfg.text)
                comp.append(label)
                break;
            case 'radio': // 单选框
                comp = $('<div>').addClass('radio-group')
                for (let option of compCfg.options) {
                    let opt = $('<input>')
                        .attr('type', 'radio')
                        .attr('model', compCfg.model)
                        .attr('value', option.value)
                        .attr('name', compCfg.model)
                    if (option.default) {
                        opt.attr('checked', 'checked')
                    }
                    let label = $('<label>').text(option.text)
                    comp.append(opt).append(label)
                }
                break;
        }
        if (!compCfg.title) {
            compCfg.title = ''
        }
        comp.attr('data-gs-comptitle', compCfg.title)
            .attr('data-gs-comptype', compCfg.type)
        if (comp.attr('data-gs-bindsubmit') == 'true' && compCfg.type == 'text') {
            comp.keypress(function (event) {
                //        console.log(event.keyCode)
                let keycode = (event.keyCode ? event.keyCode : event.which)
                if (keycode == '13') {
                    sendQuery(1)
                }
            })
        }
        //  console.log(comp)
        comp.appendTo(formbox)
    }
    // 增加控件组标题
    formbox.children().each(function () {
        if ($(this).attr('type') == 'hidden') { return }
        $(this).wrap('<div class="gs-formgroup"></div>')
        $(this).wrap('<div class="gs-formgroup-content"></div>')
        $(this).parent().before($('<div class="gs-formgroup-title">' + $(this).attr('data-gs-comptitle') + '</div>'))
    })
    // 按钮
    let submitBtn = $('<button>').addClass('gs-submit btn btn-primary').text('提交')
    let currentQuery = parseQuery(formbox.serializeArray())
    // 查询事件
    function sendQuery(p = 1) {
        if (!($.cookie('gs-timer'))) {
            // 首次使用，初始化定时器
            $.cookie('gs-timer', new Date().getTime())
        } else {
            // 此前使用过
            let timer = $.cookie('gs-timer')
            let now = new Date().getTime()
            let timeThreshold = 1000
            if (now - timer < timeThreshold) {
                // 过于频繁时
                console.warn('too frequent')
                $(logbox).html(`查询过于频繁，请稍后再试。(查询间隔小于${timeThreshold}ms)`)
                return
            } else {
                // 不频繁时，更新定时器
                $.cookie('gs-timer', new Date().getTime())
            }
        }
        $(paginatorbox).html('')
        $(resultbox).html('')
        console.log('query sent')
        $(logbox).html(`正在查询……`)
        currentQuery = parseQuery(formbox.serializeArray())
        currentQuery = Object.assign(currentQuery, { page: p })
        //  console.log('currentQuery:')
        //  console.log(currentQuery)
        let result = $.ajax(dbEntry, {
            data: currentQuery,
        })
        result.done((data) => {
            // console.log('query finished.')
            // (data)
            $(logbox).html(`找到${data._size}个结果，当前显示第${(currentQuery.page - 1) * config.pagesize + 1}-${(currentQuery.page - 1) * config.pagesize + data._returned}个结果。`)
            if (data._size > 0) {
                renderData(data, resultbox, currentQuery)
            }
            if (data._size > data._returned) {
                console.log('rendering paginator...')
                renderPaginator({
                    currentPage: currentQuery.page,
                    totalPage: data._total_pages,
                    action: sendQuery
                })
            }
        })
        result.fail((req, status, err) => {
            $(logbox).html(`查询失败，错误编号：${status};信息：${err}`)
        })

    }
    submitBtn.click(function () {
        sendQuery(1)
    })
    submitBtn.appendTo(formbox)
    // let resetBtn = $('<input>').attr('type', 'reset')
    // resetBtn.appendTo(formbox)
    //  console.log({ formbox, resultbox, config })

    // 当searchOnLoad为True时，自动发起一次查询。
    if (config.searchOnLoad) {
        sendQuery(1)
    }

    function parseQuery(options) {
        // 将表单数据转换为查询参数
        let compCfg = {}
        for (let cfg of config.forms) {
            // 设法合并控件定义和表单数据。compCfg每个节点为一个comp的原始定义。
            if (cfg.model) {
                compCfg[cfg.model] = cfg
            }
        }
        let param = {
            filter: {},

            count: true,
            pagesize: config.pagesize,
        }
        if (config.sortkeys) { param.sort_by = config.sortkeys }
        for (let option of options) {
            if (option.value !== '') {
                let optionVal = null
                let flag = compCfg[option.name].flag

                if (flag) {
                    switch (flag) {
                        case 'i':
                            optionVal = {
                                $regex: option.value,
                                $options: 'i'
                            }
                            break;
                        case 'number':
                            optionVal = parseInt(option.value)
                            break;
                        case 'boolean':
                            if (['on', 'true'].includes(option.value)) { // 输入值由sealizeArray()方法决定，目前出现了true和on两种值。
                                optionVal = { $in: [true, 1, "true", "ture", "是"] } // 输出查询语句
                            }
                            break;

                    }

                } else { optionVal = option.value }

                param.filter[option.name] = optionVal
            } else { continue }
        }
        // 将参数处理成一层
        let parsedParam = {}
        for (let key of Object.keys(param)) {
            parsedParam[key] = JSON.stringify(param[key])
        }
        return parsedParam
    }

    function renderData(data, container, queryParams) {

        $(container).html('已获得结果，正在渲染……')
        let output = ''
        let mwApi = new mw.Api();
        let paramStr = JSON.stringify(queryParams)
        if (data._embedded.length == 0) {
            output = '没有找到结果'
        } else {
            // 有一个或多个结果时，扁平化处理结果
            let flatResult = []
            for (let item of data._embedded) {
                let singleEntry = {}
                for (let key of Object.keys(item)) {
                    if (typeof item[key] == 'object' || typeof item[key] == 'array') {

                        continue
                    } else {
                        singleEntry[key] = item[key]
                        if (!(typeof singleEntry[key] == 'string')) {
                            singleEntry[key] = singleEntry[key].toString()
                        }
                    }
                }

                flatResult.push(singleEntry)
            }
            // console.log(flatResult)
            let renderStr = ''
            for (let item of flatResult) {
                let singleResultStr = ``
                singleResultStr = `{{${config.resultTemplate}`
                for (let key of Object.keys(item)) {
                    let value = item[key]
                    value = value.replace(/\n/g, '<br />')
                        .replaceAll('|', '{{!}}')
                    singleResultStr += `|${key}=${value}`
                }
                singleResultStr += '}}'
                renderStr += singleResultStr
            }
            // 将renderStr传递给html模板
            let cache = localStorage.getItem(paramStr)
            if (cache && cache !== '') {
                let cacheData = JSON.parse(cache)
                let now = new Date().getTime()
                if (now - cacheData.updateTime <= 60000) {
                    // 如果小于6000则直接使用缓存
                    console.log('renderData(): using render cache at ' + now)
                    $(container).html(cacheData.data.parse.text['*'])
                } else {
                    // 如果已经超过60000则重新请求
                    console.log('renderData(): render cache expired. sending request...')
                    sendPost()
                }

            } else {
                // 无效的cache
                console.log('renderData(): no cache or cache invalid. sending request...')
                sendPost()
            }

            function sendPost() {
                mwApi.post({
                    action: 'parse',
                    text: renderStr,
                    format: 'json',
                    utf8: 1,
                    prop: 'text',
                    contentmodel: 'wikitext',
                    maxage: 60,
                    smaxage: 60
                }).done(function (data) {
                    //      console.log(data)
                    $(container).html(data.parse.text['*'])
                    localStorage.setItem(paramStr, JSON.stringify({
                        updateTime: new Date().getTime(),
                        data: data
                    }))

                })
            }

        }
    }

    function renderPaginator(option) {
        // option.totalPage: 总页数
        // option.currentPage: 当前页
        // option.action: 分页按钮点击事件
        $(paginatorbox).html('')
        //  console.log('renderPaginator options')
        //   console.log(option)
        for (let i = 1; i <= option.totalPage; i++) {
            if (i >= option.currentPage + 5 || i <= option.currentPage - 5) {
                // 避免渲染过多的paginator
                continue
            }
            let pageBtn = $('<button class="btn btn-secondary gs-paginator-page">').text(i)
            if (i == option.currentPage) {
                pageBtn.addClass('active').attr('disabled', 'disabled')
            } else {
                pageBtn.click(function () {
                    option.action(i)
                })
            }
            pageBtn.appendTo(paginatorbox)
        }
        // 输出第一页和最后一页按钮
        let firstPageBtn = $('<button class="btn btn-secondary gs-paginator-first">').text('首页')
        if (option.currentPage == 1) {
            firstPageBtn.attr('disabled', 'disabled')
        }
        let lastPageBtn = $('<button class="btn btn-secondary gs-paginator-last">').text('尾页')
        if (option.currentPage == option.totalPage) {
            lastPageBtn.attr('disabled', 'disabled')
        }
        firstPageBtn.click(function () {
            option.action(1)
        })
        lastPageBtn.click(function () {
            option.action(option.totalPage)
        })
        firstPageBtn.prependTo(paginatorbox)
        lastPageBtn.appendTo(paginatorbox)
        let paginatorInfo = $('<div class="gs-paginator-info">').text(`当前第${option.currentPage}页，共${option.totalPage}页`)
        paginatorInfo.appendTo(paginatorbox)



    }
}
$(document).ready(() => {
    loadGlobalSearcher()
})
























$(function () {
    console.log("DPL dropdown filter loaded.");

    // Define your dropdown options
    const options = [
        ["", "– none –"],
        ["sweet", "Sweet"],
        ["savory", "Savory"],
        ["spicy", "Spicy"],
        ["sour", "Sour"]
    ];

    // Number of parameters ({{{1}}}…{{{5}}})
    const totalParams = 5;

    const $container = $("#dpl-filters");
    const $result = $("#dpl-result");

    // Create dropdowns
    for (let i = 1; i <= totalParams; i++) {
        const $select = $("<select>")
            .attr("id", `param${i}`)
            .css({ margin: "4px" });

        options.forEach(([value, label]) => {
            $select.append($("<option>").val(value).text(label));
        });

        $container.append(`Param ${i}: `).append($select).append("<br>");
    }

    // Auto-fill template when user changes any dropdown
    $("select", $container).on("change", function () {
        let params = [];

        for (let i = 1; i <= totalParams; i++) {
            let val = $(`#param${i}`).val();
            if (val) val = "|" + val; // this becomes |sweet, |savory, etc.
            params.push(val || "");
        }

        // Build the final DPL template call
        const wikitext =
`{{#dpl:
|categorymatch=${params[0]} ${params[1]} ${params[2]} ${params[3]} ${params[4]}
|namespace=Main
}}`;

        $result.text(wikitext);
    });
});