$(function () {
    $('.ntn-copy-code').on('click', function () {
        var button = $(this);
        var code = button
            .closest('div')
            .find('.ntn-code-value')
            .first()
            .text()
            .trim();

        if (!code) {
            return;
        }

        navigator.clipboard.writeText(code).then(function () {
            button.text('COPIED');

            setTimeout(function () {
                button.text('COPY');
            }, 1200);
        });
    });
});