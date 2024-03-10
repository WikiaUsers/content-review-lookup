/* by Xiaoyujun */
$(function () {
  $('.mw-rollback-link a').each(function () {
    var href = $(this).attr('href');
    $(this).on('click', function (e) {
      e.preventDefault();
      OO.ui.confirm(wgULS('确定要回退此编辑吗？', '確定要回退此編輯嗎？')).then(function (confirmed) {
        if (confirmed) {
          location.href = href;
        }
      });
    });
  });
});