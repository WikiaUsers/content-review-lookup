if (document.getElementById('homepagepolls')) {
    // document.getElementById('homepagepolls').getElementsByClassName('header')[0].innerHTML = "Which among if this female pets, do you think the cutest? Put your mouseover to the character's name to see their appearances or click the character's name to go on her page."

    for (i = 0; i < document.getElementById('ajax-poll-area').getElementsByTagName('label').length; i++) {
        var addLink = document.createElement('a');
        addLink.style.textDecoration = 'none';
        addLink.style.color = '#006cb0';
        var nameLink = document.getElementById('ajax-poll-area').getElementsByTagName('label')[i].children[0].nextSibling.textContent;
        //console.log('nameLink: ' + nameLink)
        nameLink = nameLink.substr(0, nameLink.length - 3);
        nameLink = nameLink.replace(' ', '_');
        addLink.href = 'http://www.lps2012.wikia.com/wiki/' + nameLink;
        nameLink = nameLink.replace('_', ' ');
        addLink.innerHTML = nameLink;
        document.getElementById('ajax-poll-area').getElementsByTagName('label')[i].children[0].nextSibling.remove();
        document.getElementById('ajax-poll-area').getElementsByTagName('label')[i].appendChild(addLink);
    }

    var charactersName = [
        "penny ling",
        "minka mark",
        "pepper clark",
        "zoe trent",
        "buttercream sunday",
        "sugar sprinkles",
        "madame pom",
        "scout kerry",
        "gail trent",
        "olive shellstein",
        "shea butter",
        "lemonface",
        "lazy susan",
        "bearded lady",
        "cairo",
        "ling jun",
        "jun ling",
        "mushroom",
        "delilah",
        "russell ferguson",
        "sunil nevla",
        "vinnie terrio",
        "captain cuddles",
        "mary frances",
        "shahrukh",
        "tootsie",
        "genghis",
        "baa baa lou",
        "old bananas",
        "digby",
        "wiggles mcsunbask",
        "esteban banderas",
        "sweet cheeks",
        "canine cop",
        "ling pen",
        "steve",
        "jebbie",
        "dolores",
        "princess stori jameson",
        "shivers",
        "poodles",
        "benson detwyler",
        "sam u.l.",
        "juan jorge josé",
        "the littlest pet shop pets",
        "dance like you know you can",
        "bff's",
        "i'm sorry song",
        "fun being fun",
        "be yourself / just like you",
        "crush",
        "if you're a guy",
        "gotta get to the studio",
        "superstar life",
        "listen up!",
        "the sweet shop song",
        "humanarian",
        "miss anna t, if you please",
        "wolf-i-fied",
        "my new tail",
        "lost and found box",
        "stay here forever",
        "it won't be long",
        "f.u.n. song",
        "we're havin' a party, party",
        "two times as cute",
        "i-guana rhumba",
        "dino-pets",
        "pet friendly skies",
        "come to the littlest pet shop",
        "chez paris",
        "el cobra cabra",
        "dance fu fighting",
        "biskit twins rhapsody",
        "two for one",
        "song of brazil",
        "just unplug",
        "cyril mcflip",
        "all around the world",
        "won't have to look too far",
        "hangin' by a thread",
        "secret cupid song",
        "a perfect day",
        "treasure out of trash",
        "my biggest secret",
        "chase away the winter blues",
        "dance party",
        "girl time",
        "everything you do is my pet peeve",
        "fabulous song",
        "boys don't care about clothes",
        "josh sharp",
        "blythe baxter",
        "sue patterson",
        "yongmee song",
        "jasper jones",
        "roger baxter",
        "brittany and whittany biskit",
        "fisher biskit",
        "anna twombly",
        "parker",
        "weber",
        "kora dixon",
        "aunt mo",
        "professor shuperman",
        "cheep-cheep",
        "file:a skunk_is_a_skunk.png",
        "file:a skunk_is_a_skunk_3.jpg",
        "file:a skunk_is_a_skunk_2.jpg",
        "mitzi",
        "bat camper",
        "heidi",
        "basil",
        "cashmere and velvet",
        "buster howe",
        "wagger hobbs",
        "tiger",
        "tangier",
        "kittery banter",
        "lucky browne",
        "desi",
        "captain russell",
        "terriers and tiaras",
        "mona autumn",
        "mr. von fuzzlebutt",
        "goldy",
        "jerry ferguson"
    ];
    var charactersImg = [
        "https://images.wikia.nocookie.net/__cb20140206165116/lps2012/images/6/6a/Penny_Ling_pure_cuteness.png",
        "https://images.wikia.nocookie.net/__cb20140226211140/lps2012/images/3/34/Minka-mark.png",
        "https://images.wikia.nocookie.net/__cb20130109023029/lps2012/images/8/84/Pepper_eye_shadow.png",
        "https://images.wikia.nocookie.net/__cb20141120101115/lps2012/images/1/13/S01E08_-_I_am_Zoe.JPG",
        "https://images.wikia.nocookie.net/__cb20130610142146/lps2012/images/thumb/2/2b/Butters_7911.png/143px-Butters_7911.png",
        "https://images.wikia.nocookie.net/__cb20130606225445/lps2012/images/thumb/9/99/Sprinkles.png/150px-Sprinkles.png",
        "https://images.wikia.nocookie.net/__cb20130108200012/lps2012/images/thumb/3/30/Madame_Pom.png/320px-Madame_Pom.png",
        "https://images.wikia.nocookie.net/__cb20130804231240/lps2012/images/thumb/a/a5/Kerry-littlest-pet-shop-on-the-hub-33640498-262-317.png/150px-Kerry-littlest-pet-shop-on-the-hub-33640498-262-317.png",
        "https://images.wikia.nocookie.net/__cb20130805234940/lps2012/images/thumb/4/44/Gail_.jpg/150px-Gail_.jpg",
        "https://images.wikia.nocookie.net/__cb20130226030954/lps2012/images/thumb/a/a0/Olive_Shellstein.png/320px-Olive_Shellstein.png",
        "https://images.wikia.nocookie.net/__cb20130402144235/lps2012/images/thumb/a/a1/Tumblr_mk8j8jB8Ht1s008vgo1_400.png/150px-Tumblr_mk8j8jB8Ht1s008vgo1_400.png",
        "https://images.wikia.nocookie.net/__cb20130212073030/lps2012/images/thumb/c/cb/Tumblr_mgztk1pC0K1s008vgo7_400.png/150px-Tumblr_mgztk1pC0K1s008vgo7_400.png",
        "https://images.wikia.nocookie.net/__cb20130212072756/lps2012/images/thumb/c/cf/Tumblr_mgztk1pC0K1s008vgo3_400.png/150px-Tumblr_mgztk1pC0K1s008vgo3_400.png",
        "https://images.wikia.nocookie.net/__cb20130212072949/lps2012/images/thumb/1/14/Tumblr_mgztk1pC0K1s008vgo6_400.png/150px-Tumblr_mgztk1pC0K1s008vgo6_400.png",
        "https://images.wikia.nocookie.net/__cb20140221015223/lps2012/images/thumb/3/35/Cairo.png/320px-Cairo.png",
        "https://images.wikia.nocookie.net/__cb20140314023622/lps2012/images/thumb/8/89/Ling_Jung.jpg/150px-Ling_Jung.jpg",
        "https://images.wikia.nocookie.net/__cb20140314024206/lps2012/images/thumb/a/af/Jun_Ling.jpg/150px-Jun_Ling.jpg",
        "https://images.wikia.nocookie.net/__cb20140318030825/lps2012/images/thumb/8/8c/Mushroom.png/320px-Mushroom.png",
        "https://images.wikia.nocookie.net/__cb20140420021631/lps2012/images/thumb/6/6f/Delilah_at_Pet_Fashion_Expo.png/271px-Delilah_at_Pet_Fashion_Expo.png",
        "https://images.wikia.nocookie.net/__cb20140327144117/lps2012/images/7/7f/Blythes_Big_Adventure_Part_100054.jpg",
        "https://vignette.wikia.nocookie.net/lps2012/images/8/81/ScreenCapture_25.04.14_17-14-57.jpg/revision/latest?cb=20140425223453",
        "https://images.wikia.nocookie.net/__cb20140226211025/lps2012/images/b/bc/Vinnie-terrio.png",
        "https://images.wikia.nocookie.net/__cb20140214185429/lps2012/images/thumb/2/29/Captain_Cuddles.png/1000px-Captain_Cuddles.png",
        "https://images.wikia.nocookie.net/__cb20121226202336/lps2012/images/b/b9/Mary_Frances.png",
        "https://images.wikia.nocookie.net/__cb20130811073517/lps2012/images/3/3d/Tumblr_mkujbciYWS1rvul6to2_500.png",
        "https://images.wikia.nocookie.net/__cb20130806002001/lps2012/images/f/ff/ThCATDKBZS.jpg",
        "https://images.wikia.nocookie.net/__cb20140316184812/lps2012/images/3/38/Genghis_crop.png",
        "https://images.wikia.nocookie.net/__cb20140624001519/lps2012/images/thumb/d/d1/Baa_Baa_Lou.png/1000px-Baa_Baa_Lou.png",
        "https://images.wikia.nocookie.net/__cb20130401192614/lps2012/images/a/a0/Old_Bananas.png",
        "https://images.wikia.nocookie.net/__cb20130207014701/lps2012/images/d/d6/Digby_smiling_at_Zoe.png",
        "https://vignette.wikia.nocookie.net/lps2012/images/f/f7/Wiggles_McSunbask.png/revision/latest?cb=20150319040827",
        "https://images.wikia.nocookie.net/__cb20121225030252/lps2012/images/5/54/Esteban_Banderas.png",
        "https://images.wikia.nocookie.net/__cb20131124162316/lps2012/images/0/0f/Sweetcheeks.png",
        "https://images.wikia.nocookie.net/__cb20140329235018/lps2012/images/7/72/Canine_Cop_crop.jpg",
        "https://images.wikia.nocookie.net/__cb20140314023034/lps2012/images/9/94/Lin_Pang.jpg",
        "https://images.wikia.nocookie.net/__cb20131119010108/lps2012/images/6/6d/Steve_crop.jpg",
        "https://images.wikia.nocookie.net/__cb20140706175546/lps2012/images/4/40/Jebbie.jpg",
        "https://images.wikia.nocookie.net/__cb20140818032200/lps2012/images/e/ed/Dolores.png",
        "https://images.wikia.nocookie.net/__cb20130325174729/lps2012/images/5/53/Princess_Stori.png",
        "https://images.wikia.nocookie.net/__cb20140621155052/lps2012/images/5/59/Shivers1.png",
        "https://images.wikia.nocookie.net/__cb20140327011341/lps2012/images/a/a2/S2E05_Poodles_close_up.jpg",
        "https://images.wikia.nocookie.net/__cb20140327144210/lps2012/images/f/fd/Blythes_Big_Adventure_Part_100095.jpg",
        "https://images.wikia.nocookie.net/__cb20130412063448/lps2012/images/7/70/Tumblr_mk8j1199LL1s008vgo10_400.png",
        "https://images.wikia.nocookie.net/__cb20140406001031/lps2012/images/e/e0/Juan.png",
        "https://images.wikia.nocookie.net/__cb20141108165629/lps2012/images/7/78/20141107_195039.JPG",
        "https://images.wikia.nocookie.net/__cb20140325144816/lps2012/images/a/ac/Gailbreak_00139.jpg",
        "https://images.wikia.nocookie.net/__cb20141209063653/lps2012/images/0/09/BFF_Song.JPG",
        "https://images.wikia.nocookie.net/__cb20130313081252/lps2012/images/b/bc/Sadness.png",
        "https://images.wikia.nocookie.net/__cb20141208080220/lps2012/images/1/11/Fun_being_fun.JPG",
        "https://images.wikia.nocookie.net/__cb20141208080539/lps2012/images/5/5c/Be_yourself.JPG",
        "https://images.wikia.nocookie.net/__cb20141120101115/lps2012/images/1/13/S01E08_-_I_am_Zoe.JPG",
        "https://images.wikia.nocookie.net/__cb20141208080859/lps2012/images/5/50/If_you%27re_a_guy.JPG",
        "https://images.wikia.nocookie.net/__cb20141208081412/lps2012/images/5/51/Gotta_Get_To_The_Studio.JPG",
        "https://images.wikia.nocookie.net/__cb20130130204215/lps2012/images/5/51/Lights%2C_Camera%2C_Mongoose_promo_image-1-.jpg",
        "https://images.wikia.nocookie.net/__cb20141208094703/lps2012/images/0/02/Listen_up!.JPG",
        "https://images.wikia.nocookie.net/__cb20130212204646/lps2012/images/3/37/Pet_Shop_girls_sweet_shop_song.png",
        "https://images.wikia.nocookie.net/__cb20130313130607/lps2012/images/c/cd/Humanarian.jpg",
        "https://images.wikia.nocookie.net/__cb20140429090334/lps2012/images/f/f3/S1E22KungfooQuilting.png",
        "https://images.wikia.nocookie.net/__cb20130406014456/lps2012/images/1/1c/Door-Jammed_promo_by_The_Hub.jpg",
        "https://images.wikia.nocookie.net/__cb20140729145526/lps2012/images/1/11/Frenemies_00276.jpg",
        "https://images.wikia.nocookie.net/__cb20141208082721/lps2012/images/e/e8/Lost_and_Found_Box.JPG",
        "https://images.wikia.nocookie.net/__cb20141208083028/lps2012/images/4/46/Stay_Here_Forever.JPG",
        "https://images.wikia.nocookie.net/__cb20141208085248/lps2012/images/d/df/It_Won%27t_Be_Long.JPG",
        "https://images.wikia.nocookie.net/__cb20140112001351/lps2012/images/0/0d/F.U.N._Song.png",
        "https://images.wikia.nocookie.net/__cb20131226205929/lps2012/images/9/9a/What%2C_Meme_Worry_We%27re_Havin%27_a_Party%2C_Party.png",
        "https://images.wikia.nocookie.net/__cb20131222211218/lps2012/images/f/f9/What%2C_Meme_Worry_Two_Times_as_Cute.png",
        "https://images.wikia.nocookie.net/__cb20131218020512/lps2012/images/d/df/The_Big_Feathered_Parade_I-Guana_Rhumba.png",
        "https://images.wikia.nocookie.net/__cb20131226032434/lps2012/images/c/c5/A_Day_at_the_Museum_Dino_Pets.png",
        "https://images.wikia.nocookie.net/__cb20140130232844/lps2012/images/c/c1/Pet_Friendly_Skies.png",
        "https://images.wikia.nocookie.net/__cb20140119020256/lps2012/images/0/0c/Come_to_the_Littlest_Pet_Shop.png",
        "https://images.wikia.nocookie.net/__cb20140130210821/lps2012/images/a/a9/Chez_Paris.png",
        "https://images.wikia.nocookie.net/__cb20140610213234/lps2012/images/2/29/El_Cobra_Cabra.png",
        "https://images.wikia.nocookie.net/__cb20140217181525/lps2012/images/f/f2/Dance_Fu_Fighting.png",
        "https://images.wikia.nocookie.net/__cb20140224225347/lps2012/images/0/08/Biskit_Twins_Rhapsody.png",
        "https://images.wikia.nocookie.net/__cb20140303225153/lps2012/images/8/88/Two_For_One.png",
        "https://images.wikia.nocookie.net/__cb20140313021618/lps2012/images/e/e6/Song_of_Brazil.png",
        "https://images.wikia.nocookie.net/__cb20140317224259/lps2012/images/9/9f/Just_Unplug.png",
        "https://images.wikia.nocookie.net/__cb20140325002913/lps2012/images/3/3f/Cyril_McFlip.png",
        "https://images.wikia.nocookie.net/__cb20140414214432/lps2012/images/1/1c/All_Around_The_World.png",
        "https://images.wikia.nocookie.net/__cb20140414214742/lps2012/images/1/1e/Won%27t_Have_To_Look_Too_Far.png",
        "https://images.wikia.nocookie.net/__cb20140602230033/lps2012/images/9/9f/Hangin%27_by_a_Thread.png",
        "https://images.wikia.nocookie.net/__cb20140627191019/lps2012/images/9/94/ScreenCapture_26.06.14_9-42-29.jpg",
        "https://images.wikia.nocookie.net/__cb20140707222517/lps2012/images/b/bd/A_Perfect_Day.png",
        "https://images.wikia.nocookie.net/__cb20140824134917/lps2012/images/1/1a/20140823_174146.JPG",
        "https://images.wikia.nocookie.net/__cb20140826200714/lps2012/images/2/2b/3x13_-_The_Secret_Recipe.png",
        "https://images.wikia.nocookie.net/__cb20141109110958/lps2012/images/9/9f/20141108_140245.jpg",
        "https://images.wikia.nocookie.net/__cb20140601071522/lps2012/images/8/80/L-Zard_crew_shake_their_tails_off.png",
        "https://images.wikia.nocookie.net/__cb20140614003641/lps2012/images/2/2a/The_Ladies_of_LPS_Song.png",
        "https://images.wikia.nocookie.net/__cb20140627224448/lps2012/images/b/ba/Everything_You_Do_is_my_Peeve.png",
        "https://images.wikia.nocookie.net/__cb20140823000551/lps2012/images/6/63/The_Fire_Hydrant_Song_Song.png",
        "https://images.wikia.nocookie.net/__cb20141004230241/lps2012/images/e/e0/Boys_Don%27t_Care_About_Clothes.png",
        "https://vignette.wikia.nocookie.net/lps2012/images/4/4a/Josh_Sharp.png/revision/latest?cb=20121225030147",
        "https://vignette.wikia.nocookie.net/lps2012/images/0/07/Lps-character-blythe_570x420.jpg/revision/latest?cb=20121125231747",
        "https://images.wikia.nocookie.net/__cb20130208021000/lps2012/images/e/e1/Sue_Patterson.png",
        "https://vignette.wikia.nocookie.net/lps2012/images/0/05/Youngmee_Song.png/revision/latest?cb=20130208021046",
        "https://images.wikia.nocookie.net/__cb20130208020900/lps2012/images/8/86/Jasper_Jones.png",
        "https://vignette.wikia.nocookie.net/lps2012/images/0/01/Roger_Baxter.jpg/revision/latest?cb=20121127195712",
        "https://vignette.wikia.nocookie.net/lps2012/images/f/f9/What%2C_Meme_Worry_Two_Times_as_Cute.png/revision/latest?cb=20131222211218",
        "https://vignette.wikia.nocookie.net/lps2012/images/7/7f/Fisher_Biskit.png/revision/latest?cb=20130318201827",
        "https://vignette.wikia.nocookie.net/lps2012/images/2/27/Mrs_Twombly.jpg/revision/latest?cb=20121127195750",
        "https://vignette.wikia.nocookie.net/lps2012/images/e/e2/Parker.jpg/revision/latest?cb=20141213201543",
        "https://vignette.wikia.nocookie.net/lps2012/images/b/bb/20150110_212549.JPG/revision/latest?cb=20150111183533",
        "https://vignette.wikia.nocookie.net/lps2012/images/8/8e/BunnyHat.png/revision/latest?cb=20150112225903",
        "https://vignette.wikia.nocookie.net/lps2012/images/8/84/AuntMo.png/revision/latest?cb=20150125172856",
        "https://vignette.wikia.nocookie.net/lps2012/images/b/b1/Professor_Shuperman.Png/revision/latest?cb=20150125210202",
        "https://vignette.wikia.nocookie.net/lps2012/images/2/20/Cheep-Cheep.png/revision/latest?cb=20150118011528",
        "https://vignette.wikia.nocookie.net/lps2012/images/0/04/A_Skunk_is_a_Skunk.png/revision/latest?cb=20150217175205",
        "https://vignette.wikia.nocookie.net/lps2012/images/b/bf/A_skunk_is_a_skunk_3.JPG/revision/latest?cb=20150220072326",
        "https://vignette.wikia.nocookie.net/lps2012/images/3/34/A_skunk_is_a_skunk_2.JPG/revision/latest?cb=20150220072311",
        "https://vignette.wikia.nocookie.net/lps2012/images/d/d9/Mitzi.png/revision/latest?cb=20150217163910",
        "https://vignette.wikia.nocookie.net/lps2012/images/6/6c/Bat_Camper.png/revision/latest?cb=20150228182242",
        "https://vignette.wikia.nocookie.net/lps2012/images/2/2f/Heidi.png/revision/latest?cb=20150307184241",
        "https://vignette.wikia.nocookie.net/lps2012/images/6/6e/Basil.png/revision/latest?cb=20150208001844",
        "https://vignette.wikia.nocookie.net/lps2012/images/e/e4/Cashmere_and_Velvet.png/revision/latest?cb=20140721205608",
        "https://vignette.wikia.nocookie.net/lps2012/images/c/c1/S1E02_Corgi_crop.png/revision/latest?cb=20140329235104",
        "https://vignette.wikia.nocookie.net/lps2012/images/5/51/S1E01_Pug_crop.png/revision/latest?cb=20140329235142",
        "https://vignette.wikia.nocookie.net/lps2012/images/9/9c/Char_85661.jpg/revision/latest?cb=20130804003945",
        "https://vignette.wikia.nocookie.net/lps2012/images/3/35/S3E03_Tangier_crop.png/revision/latest?cb=20140614164508",
        "https://vignette.wikia.nocookie.net/lps2012/images/3/31/Kittery_Banter_ID.png/revision/latest?cb=20140613011618",
        "https://vignette.wikia.nocookie.net/lps2012/images/1/16/Lucky_Browne_ID.png/revision/latest?cb=20140521015030",
        "https://vignette.wikia.nocookie.net/lps2012/images/0/07/Desi_headdress.png/revision/latest?cb=20131222031421",
        "https://vignette.wikia.nocookie.net/lps2012/images/d/d7/PetTrek.png/revision/latest?cb=20150203232913",
        "https://vignette.wikia.nocookie.net/lps2012/images/f/f1/LPS_021_13_570x420.jpg/revision/latest?cb=20130714201814",
        "https://vignette.wikia.nocookie.net/lps2012/images/7/7f/Mona_Autumn.png/revision/latest?cb=20140616233459",
        "https://vignette.wikia.nocookie.net/lps2012/images/9/9e/Otto_Von_Fuzzlebutt.png/revision/latest?cb=20140603004416",
        "https://vignette.wikia.nocookie.net/lps2012/images/e/e2/Goldy.png/revision/latest?cb=20140809232419",
        "https://vignette.wikia.nocookie.net/lps2012/images/5/55/SD_20.png/revision/latest?cb=20151121193947"
    ];

    document.getElementById('ajax-poll-area').addEventListener('mouseover', function (evt) {
        if (evt.target.tagName == 'A') {
            var petName = evt.target.textContent;
            petName = petName.toLowerCase();

            //highlight
            evt.target.style.backgroundColor = 'purple';
            evt.target.style.borderRadius = '5px';
            evt.target.style.fontWeight = 'bold';
            evt.target.style.padding = '0 3px';
            evt.target.style.color = 'orange';

            var imgPop = document.createElement('div');
            imgPop.id = 'preview';
            imgPop.style.backgroundImage = 'url(' + charactersImg[charactersName.indexOf(petName)] + ')';
            imgPop.style.backgroundSize = 'auto 180px';
            imgPop.style.backgroundRepeat = 'no-repeat';
            imgPop.style.width = 320 + 'px';
            imgPop.style.height = 180 + 'px';
            imgPop.style.position = 'absolute';
            imgPop.style.zIndex = '10000000';
            imgPop.style.left = evt.pageX + 10 + 'px';
            imgPop.style.top = evt.pageY + 10 + 'px';
            /*imgPop.innerHTML = '<img src = ' + charactersImg[charactersName.indexOf(petName)] + '>';*/
            document.body.appendChild(imgPop);


            evt.target.addEventListener('mouseout', function removeImg(moEvt) {
                document.getElementById('preview').remove();
                evt.target.removeEventListener('mouseout', removeImg, false);

                //remove highlight
                evt.target.style.backgroundColor = '';
                evt.target.style.borderRadius = '';
                evt.target.style.fontWeight = '';
                evt.target.style.padding = '';
                evt.target.style.color = '#006cb0';

            }, false);

            evt.target.addEventListener('mousemove', function (mmEvt) {
                imgPop.style.left = mmEvt.pageX + 10 + 'px';
                imgPop.style.top = mmEvt.pageY + 10 + 'px';
            }, false);
        }
    }, false);
}