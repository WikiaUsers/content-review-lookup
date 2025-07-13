$(function() {
  var table = $('.sortable').first();
  if (table.length) {
    var thAsc = table.find('th.default-sort-ascending');
    var thDesc = table.find('th.default-sort-descending');
    var targetTh;

    if (thAsc.length) {
      targetTh = thAsc.first();

      targetTh.trigger('click');
    } else if (thDesc.length) {
      targetTh = thDesc.first();

      targetTh.trigger('click').trigger('click');
    }
  }
});