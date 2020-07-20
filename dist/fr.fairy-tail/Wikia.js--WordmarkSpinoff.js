$(document).ready(function(){
    var config = mw.config.get([
        'wgCategories',
        'wgNamespaceNumber'
    ]);
    if(config.wgNamespaceNumber === 0) {
                var i = 0;
                var l = config.wgCategories.length;
                var found = false;
                while(i < l && !found) {
                    found = true;
                    switch (config.wgCategories[i]) {
                        case 'Blue Mistral':
                            $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/fairy-tail/images/2/21/Blue_Mistral_Logo.png/revision/latest?cb=20141123161515&path-prefix=fr');
                            break;
                        case 'Fairy Tail Zero':
                            $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/fairy-tail/images/e/e0/Fairy_Tail_Zero_Logo.png/revision/latest?cb=20140901162347&path-prefix=fr');
                            break;
                        case 'Ice Trail':
                            $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/fairy-tail/images/f/f5/Ice_Trail_Logo.png/revision/latest?cb=20140901162208&path-prefix=fr');
                            break;
                        case 'Fairy Girls':
                            $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/fairy-tail/images/5/5d/Fairy_Girls_Logo.png/revision/latest?cb=20150106211130&path-prefix=fr');
                            break;
                        case "Hero's":
                            $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/fairy-tail/images/5/5c/Hero%27s_logo.png/revision/latest?cb=20191112113750&path-prefix=fr');
                            break;
                        case 'Fairy Tail City Hero':
                            $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/fairy-tail/images/3/32/Fairy_Tail_City_Hero_Logo.png/revision/latest?cb=20200330090626&path-prefix=fr');
                            break;
                        case 'Les Dragons Jumeaux de Saber Tooth':
                            $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/fairy-tail/images/5/5f/Les_Dragons_Jumeaux_de_Saber_Tooth_Logo.png/revision/latest?cb=20161102161111&path-prefix=fr');
                            break;
                        case 'Road Knight':
                            $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/fairy-tail/images/d/d5/Logo_Road_Knight.png/revision/latest?cb=20170416200201&path-prefix=fr');
                            break;
                        case "L'Éclair de la Grande Foudre":
                            $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/fairy-tail/images/7/7f/Logo_Eclair_de_la_Grande_Foudre.png/revision/latest?cb=20160509083709&path-prefix=fr');
                            break;
                        case 'La Grande Aventure de Happy':
                            $('.wds-community-header__wordmark img').attr('src', 'https://vignette.wikia.nocookie.net/fairy-tail/images/c/c3/Fairy_Tail_-_La_Grande_Aventure_de_Happy_Logo.png/revision/latest?cb=20190724113955&path-prefix=fr');
                            break;
                        default:
                            found = false;
                    }
                    i++;
                }
    }
});