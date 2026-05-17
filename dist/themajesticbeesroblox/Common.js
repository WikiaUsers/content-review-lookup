$(function () {
    $(document).on('click', '.bee-tab-btn', function () {
        var tab = $(this).data('tab');
        $('.bee-tab-btn').removeClass('active');
        $(this).addClass('active');
        $('.bee-tab-content').hide();
        $('#bee-tab-' + tab).show();
    });

    $(document).on('mouseenter', '.bee-card', function () {
        var name = $(this).data('name');
        var desc = $(this).data('desc');
        var panel = $(this).closest('.bee-tab-content').find('.bee-desc-panel');

        $('.bee-card').removeClass('selected');
        $(this).addClass('selected');

        panel.removeClass('empty').html(
            '<div class="bee-desc-panel-name">' + name + '</div>' +
            '<div class="bee-desc-panel-text">' + desc + '</div>'
        );
    });

    $(document).on('mouseleave', '.bee-rarity-grid', function () {
        $('.bee-card').removeClass('selected');
        $(this).closest('.bee-tab-content').find('.bee-desc-panel')
            .addClass('empty')
            .html('Hover over a bee to see its description.');
    });
});