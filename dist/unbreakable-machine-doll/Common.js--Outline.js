//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝【Background】＝＝＝＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
;(function() {
    var defaultset = ['http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Edge_Hill_Station_Wikia_Background.jpg', 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Lime_Street_Station_Wikia_Background_I.jpg', 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Lime_Street_Station_Wikia_Background_II.jpg', 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Liverpool_Wikia_Background_I.jpg', 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Liverpool_Wikia_Background_II.jpg', 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Walpurgis_Royal_Academy_of_Machinart_Wikia_Background_I.jpg', 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Central_Auditorium_Wikia_Background.jpg', 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Gryphon_Dormitory_Wikia_Background_I.jpg', 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Gryphon_Dormitory_Wikia_Background_II.jpg', 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Faculty_of_Science_Wikia_Background_I.jpg', 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Walpurgis_Royal_Academy_of_Machinart_Wikia_Background_II.jpg'],
        imageset1 = ['http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Cogwheel_Wikia_Background_II.jpg', 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Cogwheel_Wikia_Background_III.jpg'],
        imageset2 = ['http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Cogwheel_Wikia_Background_III.jpg'];
    $('body').css('background-image', function() {
        var url;
        switch (mw.config.get('wgPageName')) {
            
//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// This is the page-specific part. Whatever value url will have will   //
// be the background image for "pagename". Repeat for any              //
// page-specific backgrounds.                                          //
//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
            case 'Unbreakable_Machine-Doll_Wiki':
                url = 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Cogwheel Wikia Background I.jpg';
                break;
                
//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
// This is for page-specific random backgrounds. all urls are defined  // // above.                                                              //
//―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
            case 'Unbreakable_Machine-Doll':
         // case 'Gene_Metalica:_Unbreakable_Machine-Doll_Re:Acta': //
            case 'Unbreakable_Machine-Doll_Light_Novel':
            case 'Unbreakable_Machine-Doll_Manga':
            case 'Gene_Metalica:_Unbreakable_Machine-Doll_Re:Acta_Manga':
            case 'Unbreakable_Machine-Doll_Anime':
            case 'Unbreakable_Machine-Doll_Facing_"Burnt_Red"':
                url = imageset1[Math.floor(Math.random() * imageset1.length)];
                break;
         // case 'Magnus': //
         // case 'page5': //
         // case 'page6': //
                url = imageset2[Math.floor(Math.random() * imageset2.length)];
                break;
            default:
                url = defaultset[Math.floor(Math.random() * defaultset.length)];
        }
        if (!url) return;
        return 'url(' + url + ')';
    });
})();

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//