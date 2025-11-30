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
            '{{#dpl:' + conditions + printColumn + parametersTemp + '}}' +
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