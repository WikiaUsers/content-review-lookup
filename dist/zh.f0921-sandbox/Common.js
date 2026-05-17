/* 你知道的，这个页面在大部分人眼里相当于滚木 */
$(function() {
  // 给标题绑定点击事件
  $("#fold-title").click(function(e) {
    e.preventDefault();  // 阻止默认行为（比如标题带链接时避免跳转）
    $("#fold-content").toggle();  // 切换内容的显示/隐藏
  });
  $("#ft").click(function(e){
  	e.preventDefault();
  	$("#fc").toggle();
  })
});