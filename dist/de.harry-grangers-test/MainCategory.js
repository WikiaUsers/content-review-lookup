if($('.settings').length !== 0) {
    console.log('Pagesettings',$('.settings'));
    if($('.settings[data-maincategory]').length !== 0) {
        console.log('mainCategory',$('.settings').data('maincategory'),'a',typeof $('.settings').data('maincategory'));
        if($('.settings').data('maincategory')) {
            console.log('CategoryTree',$('.article-categories#articleCategories ul'));
            $('.article-categories#articleCategories ul li:first-child').removeClass('normal').addClass('label label-default').css({'padding': '5px', 'margin': '2px'});
            $('.article-categories#articleCategories ul li:first-child a').css('color','white');
        }
        /*
        //more settings
        else if (){
            
        }*/
    }
}