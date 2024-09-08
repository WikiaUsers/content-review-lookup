/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/*CGs's de personajes

!function( $, mw ) {
    var pages_arr = [
        'Kamikaze', 'Asakaze', 'Harukaze', 'Matsukaze', 'Mutsuki',
        'Kisaragi', 'Yayoi', 'Uzuki', 'Satsuki', 'Minazuki',
        'Fumizuki', 'Nagatsuki', 'Kikuzuki', 'Mikazuki', 'Mochizuki',
        'Fubuki', 'Shirayuki', 'Hatsuyuki', 'Miyuki', 'Murakumo',
        'Isonami', 'Uranami', 'Ayanami', 'Shikinami', 'Oboro',
        'Akebono', 'Sazanami', 'Ushio', 'Akatsuki', 'Hibiki',
        'Ikazuchi', 'Inazuma', 'Hatsuharu', 'Nenohi', 'Wakaba',
        'Hatsushimo', 'Shiratsuyu', 'Shigure', 'Murasame', 'Yuudachi',
        'Harusame', 'Umikaze', 'Yamakaze', 'Kawakaze', 'Samidare',
        'Suzukaze', 'Asashio', 'Ooshio', 'Michishio', 'Arashio',
        'Arare', 'Asagumo', 'Yamagumo', 'Kasumi', 'Kagerou',
        'Shiranui', 'Kuroshio', 'Oyashio', 'Hatsukaze', 'Yukikaze',
        'Amatsukaze', 'Tokitsukaze', 'Urakaze', 'Isokaze', 'Hamakaze',
        'Tanikaze', 'Nowaki', 'Arashi', 'Hagikaze', 'Maikaze',
        'Akigumo', 'Yuugumo', 'Makigumo', 'Kazagumo', 'Naganami',
        'Takanami', 'Fujinami', 'Okinami', 'Asashimo', 'Hayashimo',
        'Kiyoshimo', 'Akizuki', 'Teruzuki', 'Hatsuzuki', 'Shimakaze',
        'Libeccio', 'Z1', 'Z3', 'Tenryuu', 'Tatsuta',
        'Kuma', 'Tama', 'Kiso', 'Ooi', 'Kitakami',
        'Nagara', 'Isuzu', 'Natori', 'Yuura', 'Kinu',
        'Abukuma', 'Sendai', 'Jintsuu', 'Naka', 'Agano',
        'Noshiro', 'Yahagi', 'Sakawa', 'Yuubari', 'Ooyodo',
        'Katori', 'Kashima', 'Furutaka', 'Kako', 'Aoba',
        'Kinugasa', 'Myoukou', 'Nachi', 'Ashigara', 'Haguro',
        'Takao', 'Atago', 'Maya', 'Choukai', 'Mogami',
        'Mikuma', 'Suzuya', 'Kumano', 'Tone', 'Chikuma',
        'Zara', 'Pola', 'Prinz_Eugen', 'Kongou', 'Hiei',
        'Haruna', 'Kirishima', 'Ise', 'Hyuuga', 'Fusou',
        'Yamashiro', 'Nagato', 'Mutsu', 'Yamato', 'Musashi',
        'Bismarck', 'Warspite', 'Littorio', 'Roma', 'Iowa',
        'Houshou', 'Ryuujou', 'Taigei', 'Shouhou', 'Zuihou',
        'Hiyou', 'Junyou', 'Chitose', 'Chiyoda', 'Akagi',
        'Kaga', 'Souryuu', 'Hiryuu', 'Unryuu', 'Amagi',
        'Katsuragi', 'Shoukaku', 'Zuikaku', 'Saratoga', 'Graf_Zeppelin',
        'Aquila', 'Taihou', 'Mizuho', 'Akitsushima', 'Commandant_Test',
        'Akashi', 'Hayasui', 'Akitsu_Maru', 'I-19', 'I-26',
        'I-168', 'I-58', 'I-8', 'U-511', 'Maru_Yu', 'I-13', 'I-14', 
        'I-401', 'Kamoi', 'Shimushu', 'Kunashiri', 'Kasuga_Maru', 'Etorofu',
        'Gangut', 'Hatakaze', 'Richelieu', 'Ark_Royal', 'Sagiri', 'Amagiri',
        'Matsuwa','Luigi_Torelli','Sado','Tsushima','I-400','Suzutsuki',
        'Hiburi','Gambier_Bay','Daitou','Jervis','Hamanami','Tashkent',
        'Intrepid','Samuel_B._Roberts'
    ],
    page = mw.config.get( 'wgPageName' );

    if ( pages_arr.indexOf( page ) === -1 ) return;

    $( '#WikiaRail' ).prepend(
        $( '<section class="module" />').load( '/index.php?action=render&title=Template:CG_' + page )
    );
}( jQuery, mediaWiki );*/


/*Top Editores*/
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:MediaWiki/TopEditors/code.js'
    ]
});
//Actualizado: 23-04-2018 (20:32:30)