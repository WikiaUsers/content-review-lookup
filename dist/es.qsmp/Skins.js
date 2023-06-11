$(document).ready(function() {
    $('.Skins:not([data-mode])').attr('data-mode', 'Preview').find('.Models > div:first-child').addClass('active');

    $('.SkinIcon').click(function() {
        var skin = $(this).attr('data-name');

        $(this).closest('.Skins').find('.SkinIcon, .Load, .Theme, .Preview').removeClass('active').end()
            .find('.Preview[data-name="' + skin + '"]').addClass('active');

        $(this).addClass('active');
        $(this).closest('.Skins').find('.Title').text(skin);
    });

    importArticle({
        type: 'style',
        article: 'MediaWiki:Skins.css'
    });
});