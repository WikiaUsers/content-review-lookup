function test(){
    var a = $('<input type="button" style="vertical-align:top;margin-top:3px" value="\u66f4\u65b0\u9801\u9762" />');
    $("#test").children("a.comments").after(a);
    a.click(function() {
    location.href = "/wiki/" + wgPageName + "?action=purge";
    });
}