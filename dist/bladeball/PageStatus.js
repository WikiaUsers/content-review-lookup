/*Icon to View Page Status (Up to Date, In Progress or Outdated)*/
$(document).ready(function () {

    var status = $('.page-status-image').first();

    if (!status.length) return;

    var target = $('.page-header__actions').first();

    if (!target.length) return;

    target.prepend(status);

});