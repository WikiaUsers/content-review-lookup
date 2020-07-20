/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
$(".NavFrame").each(function(){
var me = this, 
text = ["скрыть","показать"],
body = $(".NavContent", me), hide = (body.css("display")=="none"),
link = $('<span style="float:right;font-size:smaller;font-weight:normal;right:11px;top:0;">[<a href="javascript:void(0);">'+text[+hide]+'</a>]</span>')
;

$(".NavHead", me).prepend(link);
$("a",link).click(function(){
hide = !hide;
$(this).text(text[+hide]);
body.css("display", hide ? "none" : "block");
});

});