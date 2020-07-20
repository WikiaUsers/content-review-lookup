/* vertical tabs */
$(function() {
    if (!$('#vertical-tabs').length) return;
    $('#vertical-tabs .tab-nav > ul > li').on('click', function() {
        if ($(this).siblings().hasClass('active')) {
            $(this).siblings().removeClass('active');
        }
        $(this).addClass('active');
        $('#vertical-tabs .tab-container')
            .attr('id', $(this).data('id'))
            .html('<div>' + $(this).find('.tab-content').html() + '</div>');
    });
});