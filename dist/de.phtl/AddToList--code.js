// Add to list tool
mw.loader.using('wikia.jquery.ui').then(function() {
    console.log('Add to list tool has been loaded.');

    importArticles({
        type: 'style',
        articles: ['u:de.hobbit-fragen:MediaWiki:AddToList/code.css']
    });

    var list = '<ul class="wds-list wds-is-linked" >';
    var textareas = '<div id="atl-list-container" ><div id="atl-switches" >';

    $.each(atl.lists, function(i, val) {
        list += '<li class="atl-tool-option" data-list="' + i + '" ><a href="#" >' + val + '</a></li>';
        textareas += '<a href="#" class="atl-switch wds-button" data-switch="' + i + '" >' + val + '</a>';
    });
    textareas += '<a href="#" class="atl-switch wds-button" data-switch="-1" >Alle ausblenden</a></div><div id="atl-lists" >';
    $.each(atl.lists, function(i, val) {
        textareas += '<textarea class="atl-list" data-switch="' + i + '" data-list="' + i + '" >' + i + '</textarea>';
    });
    list += '</ul>';
    textareas += '</div></div>';

    if (mw.config.get('wgCanonicalNamespace') == 'Category' && (atl.hasOwnProperty('categorynames') === false || atl.categorynames === null || atl.categorynames.includes(mw.config.get('wgTitle')))) {
        var atlPage = '';
        $('.category-page__members').before($('.category-page__total-number').clone().html('Listen')).before(textareas);
        $('#WikiaPage').before('<div id="atl-tool-selector" draggable="true" class="wds-dropdown wds-has-shadow" ><div id="atl-tool-selector-inner" class="wds-dropdown__content" ><span>Für: <span id="atl-tool-for" ></span></span><br />' + list + '</div></div>');
        $('#atl-tool-selector').draggable();
        $('#WikiaArticle .category-page__member').each(function() {
            $(this).append(' <span class="atl-tool-openselect" >+</span>');
        });
        $('.atl-switch').on('click', function() {
            $('#atl-lists').find('.atl-list').each(function() {
                $(this).hide();
            });
            if ($(this).attr('data-switch') !== -1) {
                $('#atl-lists').find('.atl-list[data-switch="' + $(this).attr('data-switch') + '"]').show();
            }
            return false;
        });
        $(document).click(function() {
            $('#atl-tool-selector').hide();
        });
        $('#atl-tool-selector').on('click', function(e) {
            e.stopPropagation();
        });
        $('.atl-tool-openselect').on('click', function(e) {
            e.stopPropagation();
            atlPage = $(this).parents('.category-page__member').find('.category-page__member-link').text();
            $('#atl-tool-selector').show().css('position', 'absolute').animate({
                top:  e.pageY - 20,
                left: e.pageX
            }, 100).find('#atl-tool-for').text(atlPage);
            $(this).addClass('current');
        });
        $('#atl-tool-selector-inner .atl-tool-option').on('click', function() {
            if (atlPage !== null) {
                $('#atl-lists').find('.atl-list[data-list="' + $(this).attr('data-list') + '"]').append("\r\n" + atlPage);
            } else {
                alert('An error occured. Please reload the page to try again.');
                $('.atl-tool-openselect').each(function() {
                    $(this).remove();
                });
            }
            $('#atl-tool-selector').toggle();
            atlPage = '';
            $('.atl-tool-openselect.current').css('background', 'rgba(5, 143, 49, 0.3)').removeClass('current');
            return false;
        });
    }
});