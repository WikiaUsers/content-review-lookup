/* Any JavaScript here will be loaded for all users on every page load. */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.iparents = ['.infobox', '#514'];
/*Popup Fixes */
$(document).ready(function() {
    $('.unified-search__result__title').each(function() {
        var title = $(this).text();
        var images = {
            'Patrik Trilety': 'https://earth-55021.fandom.com/wiki/File:Patrik_Trilety_picture.jpg',
            'Linus Juhlin': 'https://earth-55021.fandom.com/wiki/File:Linus_Juhlin_picture.jpeg'
        };
        var descriptions = {
            'Patrik Trilety': 'President of Sweden from 2184 to 2188',
            'Linus Juhlin': 'President of Sweden since 2228'
        };

        if (images[title]) {
            $(this).before('<img src="' + images[title] + '" style="width:40px;height:40px;margin-right:8px;">');
        }
        if (descriptions[title]) {
            $(this).after('<div class="custom-description">' + descriptions[title] + '</div>');
        }
    });
});