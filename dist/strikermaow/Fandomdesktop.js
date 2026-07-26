$(function() {
    $('.local-checkbox').off('click').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('checked');
        return false;
    });
});