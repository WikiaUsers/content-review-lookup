addOnloadHook(function(){
    if($('.settings').length !== 0) {
        if($('.settings[data-tags]').length !== -1 && $('.settings').data('tags')) {
            console.log($('.settings[data-tags]'),$('.settings').data('tags'));
            $('.article-categories#articleCategories').css({'background-color':'transparent','background-image':'none'});
            $('.article-categories#articleCategories ul').addClass('tags');
        }
        else {
            console.log('Tags are disabled');
        }
    }
    else {
            console.warn('UI Element not found: Tags');
    }
});