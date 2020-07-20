(function ($, mw) {
    $('a').click(function (event) {
        if ($(this).html() == "diff") {
            event.preventDefault();
            getdiffcontent($(this).attr('href'));
        }
    });

    function PreviewDiff(content) {
        if (content == '<img src="https://images.wikia.nocookie.net/common/skins/common/progress-wheel.gif"> Loading, please wait...') {
            var ajaxform = '\
  <form method="" name="" class="WikiaForm "> \
    <div id="DiffView" style="width:975px; border:3px solid black; word-wrap: break-word;"/> \
  </form>';
            $.showCustomModal('Diff Preview', ajaxform, {
                id: 'page-viewer',
                width: 1000,
                buttons: [{
                    message: 'Return',
                    handler: function () {
                        $('#page-viewer').closeModal();
                    }
                }]
            });
        }
        $('#DiffView').html(content);
        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:DiffAnchored.css'
        });
    }

    function getdiffcontent(url) {
        PreviewDiff('<img src="https://images.wikia.nocookie.net/common/skins/common/progress-wheel.gif"> Loading, please wait...');
        $.ajax({
            type: "GET",
            url: wgServer + url,
            success: function (content) {
                content = $(content).find('table.diff').html();
                PreviewDiff(content);
            },
            error: function (data) {
                alert('Error : ' + data.error.info);
            }
        });
    }
}(jQuery, mediaWiki));