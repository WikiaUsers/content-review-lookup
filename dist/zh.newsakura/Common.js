/* 回到頂端按鈕 */
window.BackToTopText = "回到頂端";
window.BackToTopStart = 100;

/* 編輯摘要 */
window.dev = window.dev || {};

/* 用戶名群組加亮 */
highlight = {
    selectAll: false,
    users: {
        '星ノ雨 夢奈': '#5081ea'
    }
};

/* 劇透隱蔽 */
SpoilerAlert = {
    pages: ["落櫻散華抄_RE_Wikia"],
    back: true
};

$(function() {
  if ($('#gamepv').length) {
    $('#gamepv').html(
      '<iframe width="700" height="394" ' +
      'src="https://www.youtube.com/embed/t1QuUp-xlP8?rel=0" ' +
      'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
      'allowfullscreen></iframe>'
    );
  }
});