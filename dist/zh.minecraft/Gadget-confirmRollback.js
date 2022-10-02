/* by Xiaoyujun */

mw.loader.using(['oojs-ui-windows', 'oojs-ui-core'],
function() {
  $('.mw-rollback-link a').each(function() {
    var href = $(this).attr('href');
    $(this).click(function(e) {
      e.preventDefault();
      OO.ui.confirm(wgULS('确定要回退此编辑吗？', '確定要回退此編輯嗎？')).done(function(confirmed) {
        if (confirmed) {
          location.href = href;
        }
      });
    });
  });
});