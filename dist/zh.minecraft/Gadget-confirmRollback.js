/* by Xiaoyujun */

mw.loader.using(['oojs-ui-windows', 'oojs-ui-core'],
function() {
  $('.mw-rollback-link a').each(function() {
    var href = $(this).attr('href');
    $(this).click(function(e) {
      e.preventDefault();
      OO.ui.confirm('确定要回退此编辑吗？').done(function(confirmed) {
        if (confirmed) {
          location.href = href;
        }
      });
    });
  });
});