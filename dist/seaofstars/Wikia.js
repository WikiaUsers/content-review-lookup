if($('#moon-page').length){
	$('link[rel="shortcut icon"]').attr('href', 'https://vignette.wikia.nocookie.net/seaofstars/images/a/a7/Valere_Head.png/revision/latest?cb=20200621202523');
        importArticle({
            type: 'style',
            article: 'MediaWiki:MoonPage.css'
        });
}
else if($('#sun-page').length){
	$('link[rel="shortcut icon"]').attr('href', 'https://vignette.wikia.nocookie.net/seaofstars/images/3/3e/Zale_Head.png/revision/latest?cb=20200621202434');
        importArticle({
            type: 'style',
            article: 'MediaWiki:SunPage.css'
        });
}