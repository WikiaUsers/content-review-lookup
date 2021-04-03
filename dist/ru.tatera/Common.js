var cat = mw.config.get('wgCategories')
if(cat.includes('Exquisita voces wiki')){
        importArticle({
            type: 'style',
            article: 'MediaWiki:Exquisita.css'
        });
        $('.wds-community-header__sitename > a').text('Exquisita voces wiki');
        $('.wds-community-header__wordmark img').attr('src', 'none');
}

var cat = mw.config.get('wgCategories')
if(cat.includes('Caeruleum pallide vitae wiki')){
        importArticle({
            type: 'style',
            article: 'MediaWiki:Taraxacum.css'
        });
        $('.wds-community-header__sitename > a').text('Caeruleum pallide vitae wiki');
        $('.wds-community-header__wordmark img').attr('src', 'none');
}