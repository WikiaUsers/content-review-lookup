window.ArticleRatesExcludePages = ["首页", "百合作品 Wiki", "百合作品_Wiki"];
$(function(){
    $(".release-table-caption-mid a").click(function(){
        var release_date = $(this).attr("href");
        if ($(release_date).html()) {console.log(release_date + ": true")}
        else {alert("本日无发售相关书籍或无数据记录");}
    });
});