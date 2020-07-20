//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//＝＝＝＝＝＝＝＝＝＝【Page Specific Background】＝＝＝＝＝＝＝＝＝＝//
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//
//$( function () {
//     var images = [];
//    $( 'body.mediawiki' ).css( 'background-image', 'url(' + images[ Math.floor( Math.random() * images.length ) ] + ')' );
//} );

;(function() {
//    var imageset1 = ['http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Walpurgis_Night_Chat_Background.png'],
//        imageset2 = [];
        // and so on
    $('body').css('background-image', function() {
        var url;
        switch (mw.config.get('wgPageName')) {
            // this is the page-specific part
            // whatever value url will have will be the background image for "pagename"
            // repeat for any page-specific backgrounds
            case 'Unbreakable_Machine-Doll_Light_Novel_Volume_01':
            case 'Unbreakable_Machine-Doll_Light_Novel_Volume 02':
            case 'Unbreakable_Machine-Doll_Light_Novel_Volume 03':
            case 'Unbreakable_Machine-Doll_Light_Novel_Volume 01/Prologue':
            case 'Unbreakable_Machine-Doll_Light_Novel_Volume 01/Chapter 1':
            case 'Unbreakable_Machine-Doll_Light_Novel_Volume 01/Chapter 2':
            case 'Unbreakable_Machine-Doll_Light_Novel_Volume 01/Chapter 3':
            case 'Unbreakable_Machine-Doll_Light_Novel_Volume 01/Chaper 4':
            case 'Unbreakable_Machine-Doll_Light_Novel_Volume 01/Chapter 5':
            case 'Unbreakable_Machine-Doll_Light_Novel_Volume 01/Chapter 6':
            case 'Unbreakable_Machine-Doll_Light_Novel_Volume 01/Chapter 7':
            case 'Unbreakable_Machine-Doll_Light_Novel_Volume 01/Epilogue':
            case 'Unbreakable_Machine-Doll_Manga_Volume_01':
            case 'Unbreakable_Machine-Doll_Manga_Volume_02':
            case 'Unbreakable_Machine-Doll_Manga_Volume_03':
            case 'Unbreakable_Machine-Doll_Manga_Volume_04':
            case 'Unbreakable_Machine-Doll_Manga_Volume_05':
            case 'Unbreakable_Machine-Doll_Manga_Volume_06':
            case 'Unbreakable_Machine-Doll_Manga_Volume_07':
            case 'Unbreakable_Machine-Doll_Manga_Volume_08':
            case 'Unbreakable_Machine-Doll_Manga_Volume_09':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_001':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_002':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_003':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_004':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_005':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_006':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_007':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_008':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_009':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_010':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_011':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_012':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_013':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_014':
            case 'Unbreakable_Machine-Doll_Manga_Chapter_015':
            case 'Unbreakable_Machine-Doll_Anime_Episode_01':
            case 'Unbreakable_Machine-Doll_Anime_Episode_02':
            case 'Unbreakable_Machine-Doll_Anime_Episode_03':
            case 'Unbreakable_Machine-Doll_Anime_Episode_04':
                url = 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Cogwheel_Wiki_Background_II.jpg';
                break;
            case 'Raishin_Akabane':
            case 'Charlotte_Belew':
            case 'Magnus':
            case 'Felix_Kingsfort':
            case 'Frey':
            case 'Loki':
            case 'Cedric_Granville':
            case 'Alice_Bernstein':
                url = 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Kimberly.png';
                break;
            case 'Shouko_Karyuusai':
                url = '';
                break;
            case 'Kimberly':
                url = '';
                break;
            case 'Edward_Rutherford':
                url = '';
                break;
            case 'Zeth':
                url = '';
                break;
            case 'Tortoise_Dormitory\'s_Boarding_Master':
                url = 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Kimberly.png';
                break;
            case 'Nadeshiko_Akabane':
                url = '';
                break;
            case 'Tenzen_Akabane':
                url = '';
                break;
            case 'Akabane_Clan_Head':
                url = '';
                break;
            case 'Akabane_Clan_Head\'s_Wife':
                url = '';
                break;
            case 'Lisette_Norden':
                url = '';
                break;
            case 'Walter_Kingsfort':
                url = '';
                break;
            case 'Ten_Benchwarmers\'_Leader':
            case 'Ten_Benchwarmers\'_Silver-haired_Member':
            case 'Ten_Benchwarmers\'_Dark_Brown-haired_Member':
                url = 'Walpurgis Royal Academy of Machinart Wikia Background II.jpg';
                break;
            case 'Elder_Sister':
            case 'Younger_Sister':
                url = 'Lime_Street_Station_Wiki_Background_II.jpg';
                break;
            case 'Train_Conductor':
                url = 'Edge_Hill_Station_Wiki_Background.jpg';
                break;
            case 'Yaya':
                url = '';
                break;
            case 'Irori':
                url = '';
                break;
            case 'Komurasaki':
                url = '';
                break;
            case 'Sigmund':
                url = '';
                break;
            default:
                url = 'http://unbreakable-machine-doll.wikia.com/wiki/Special:FilePath?file=Cogwheel_Wiki_Background.jpg';//false;
        }
        if (!url) return;
        return 'url(' + url + ')';
    });
})();

//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――//