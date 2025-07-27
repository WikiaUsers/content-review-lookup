// Không bắt buộc nếu dùng CSS hover thuần như trên.
// Nhưng nếu CSS không đủ, bạn có thể thêm JS này:
$(document).ready(function() {
  $('.hover-image').hover(function() {
    $(this).find('.tooltip-img').show();
  }, function() {
    $(this).find('.tooltip-img').hide();
  });
});