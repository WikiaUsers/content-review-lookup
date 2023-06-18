$(document).ready(function() {
    $('.skin-container:not([data-mode])').attr('data-mode', 'preview').find('.models > div:first-child').addClass('active');

    $('.skin-icon').click(function() {
        var skin = $(this).attr('data-name');

        $(this).closest('.skin-container').find('.skin-icon, .preview').removeClass('active').end()
            .find('.preview[data-name="' + skin + '"]').addClass('active');

        $(this).addClass('active');
        $(this).closest('.skin-container').find('.skin-title').text(skin);
    });

    importArticle({
        type: 'style',
        article: 'MediaWiki:Skins.css'
    });
});