/* All JavaScript here will be loaded for users of the mobile site */

$(function () {
    $(document).on('click', '.ntn-copy-code', function () {
        var button = $(this);
        var container = button.closest('tr');

        if (!container.length) {
            container = button.parent().closest('div');
        }

        var code = container
            .find('.ntn-code-value')
            .first()
            .text()
            .trim();

        if (!code) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(function () {
                button.text('COPIED');

                setTimeout(function () {
                    button.text('COPY');
                }, 1200);
            });
        }
    });
});