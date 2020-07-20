var resetButton = '<a class="wikia-button" id="reset-button">Reset Sandbox</a>';

$('.reset-container').append(resetButton).click(function () {
    var token = mw.user.tokens.values.editToken;
    var text = '{{Sandbox}}';
    var url = wgServer + '/api.php?action=edit&title=Project:Sandbox&text=' + encodeURIComponent(text) + '&token=' + encodeURIComponent(token);
    $.post(url, function () {
        alert("Page Cleaned");
        location.reload();
    });
});