!function( $ ) {
    if ( !$( '.journal-nav' ).length ) return;

    function fill_journal( ind ) {
        for ( var i = 0; i <= 8; i++ ) {
            var new_ind = ind + i;
            $( '.body-' + i ).html( '' );

            if ( typeof data_arr[ new_ind ] === 'undefined' ) continue;
            $( '.body-' + i ).append(
                '<a href="/ru/wiki/' + data_arr[ new_ind ][ 1 ] + '" target="_blank">' +
                    '<img src="' + data_arr[ new_ind ][ 0 ] + '" width="50" />' +
                '</a>'
            );
        }
    }

    var data_arr = [
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/2/25/HJ_Crawlid.png',
            'Ползун'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/b/bd/HJ_Vengefly.png',
            'Мстекрыл'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/8/89/HJ_Vengefly_King.png',
            'Король_мстекрылов'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/6/64/HJ_Gruzzer.png',
            'Жужжалка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/39/HJ_Gruz_Mother.png',
            'Матка_Жужж'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/3e/HJ_Tiktik.png',
            'Топтун'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/f/fe/HJ_Aspid_Hunter.png',
            'Охотничий_аспид'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/0c/HJ_Aspid_Mother.png',
            'Матка_аспидов'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/d/d0/HJ_Aspid_Hatchling.png',
            'Молодняк_аспида'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/d/d6/HJ_Goam.png',
            'Жрун'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/08/HJ_Wandering_Husk.png',
            'Неприкаянная_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/f/f0/HJ_Husk_Hornhead.png',
            'Рогатая_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/0c/HJ_Leaping_Husk.png',
            'Прыгучая_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/2/24/HJ_Husk_Bully.png',
            'Задиристая_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/7/70/HJ_Husk_Warrior.png',
            'Воинственная_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/d/d4/HJ_Husk_Guard.png',
            'Оболочка_стражника'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/c1/HJ_Entombed_Husk.png',
            'Мумифицированная_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/4/47/HJ_False_Knight.png',
            'Ложный_Рыцарь'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/f/f8/HJ_Maggot.png',
            'Опарыш'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/e/ef/HJ_Menderbug.png',
            'Починжук'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/7/71/HJ_Lifeseed.png',
            'Живень'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/3f/HJ_Baldur.png',
            'Бальдр'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/b/b4/HJ_Elder_Baldur.png',
            'Древний_бальдр'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/b/bd/HJ_Mosscreep.png',
            'Мшистик'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/8/80/HJ_Mossfly.png',
            'Мшекрыл'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/b/b5/HJ_Mosskin.png',
            'Лишайник'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/a/ad/HJ_Volatile_Mosskin.png',
            'Взрывной_лишайник'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/54/HJ_Fool_Eater.png',
            'Пожиратель_глупцов'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/b/b1/HJ_Squit.png',
            'Жалень'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/0e/HJ_Obble.png',
            'Круглан'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/33/HJ_Gulka.png',
            'Гулка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/c9/HJ_Maskfly.png',
            'Маскокрыл'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/1/15/HJ_Moss_Charger.png',
            'Мшистый_громила'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/c5/HJ_Massive_Moss_Charger.png',
            'Массивный_мшистый_громила'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/0e/HJ_Moss_Knight.png',
            'Мшистый_рыцарь'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/1/1a/HJ_Mossy_Vagabond.png',
            'Мшистый_скиталец'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/0f/HJ_Durandoo.png',
            'Дюранду'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/a/a7/HJ_Duranda.png',
            'Дюранда'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/51/HJ_Aluba.png',
            'Алюба'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/55/HJ_Charged_Lumafly.png',
            'Заряженная_светомуха'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/a/a0/HJ_Uoma.png',
            'Юма'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/d/dd/HJ_Ooma.png',
            'Ума'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/0f/HJ_Uumuu.png',
            'Ууму'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/1/1e/HJ_Ambloom.png',
            'Шипогриб'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/2/21/HJ_Fungling.png',
            'Споринка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/1/10/HJ_Fungoon.png',
            'Спорун'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/8/86/HJ_Sporg.png',
            'Спорень'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/f/f4/HJ_Fungified_Husk.png',
            'Грибная_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/e/e0/HJ_Shrumeling.png',
            'Грибочек'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/6/69/HJ_Shrumal_Warrior.png',
            'Грибной_воин'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/e/e7/HJ_Shrumal_Ogre.png',
            'Грибной_великан'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/9/9f/HJ_Mantis_Youth.png',
            'Богомолий_отрок'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/9/93/HJ_Mantis_Warrior.png',
            'Воин_богомолов'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/4/4e/HJ_Mantis_Lords.png',
            'Лорды_богомолов'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/2/2f/HJ_Husk_Sentry.png',
            'Оболочка_часового'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/9/97/HJ_Heavy_Sentry.png',
            'Тяжёлый_часовой'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/b/b3/HJ_Winged_Sentry.png',
            'Крылатый_часовой'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/e/e1/HJ_Lance_Sentry.png',
            'Часовой_пикинёр'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/4/49/HJ_Mistake.png',
            'Просчёт'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/05/HJ_Folly.png',
            'Блажь'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/1/17/HJ_Soul_Twister.png',
            'Искажатель_душ'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/8/86/HJ_Soul_Warrior.png',
            'Воин_душ'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/0c/HJ_Soul_Master.png',
            'Мастер_душ'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/1/1a/HJ_Husk_Dandy.png',
            'Модная_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/c4/HJ_Cowardly_Husk.png',
            'Трусливая_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/4/4c/HJ_Gluttonous_Husk.png',
            'Прожорливая_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/8/8a/HJ_Gorgeous_Husk.png',
            'Шикарная_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/cd/HJ_Great_Husk_Sentry.png',
            'Оболочка_Великого_часового'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/54/HJ_Watcher_Knight.png',
            'Рыцарь-хранитель'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/6/61/HJ_The_Collector.png',
            'Коллекционер'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/1/1d/HJ_Belfly.png',
            'Звонокрыл'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/4/48/HJ_Pilflip.png',
            'Перевёртыш'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/4/47/HJ_Hwurmp.png',
            'Бульк'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/31/HJ_Bluggsac.png',
            'Тухляк'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/cd/HJ_Dung_Defender.png',
            'Навозный_защитник'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/7/76/HJ_White_Defender.png',
            'Белый_защитник'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/b/bf/HJ_Flukefey.png',
            'Тремокрыл'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/2/23/HJ_Flukemon.png',
            'Тремомон'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/2/2b/HJ_Flukemunga.png',
            'Треможор'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/c0/HJ_Flukemarm.png',
            'Тремоматка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/4/48/HJ_Shardmite.png',
            'Осколик'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/7/74/HJ_Glimback.png',
            'Светожук'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/1/1e/HJ_Crystal_Hunter.png',
            'Кристаллический_охотник'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/f/f9/HJ_Crystal_Crawler.png',
            'Кристаллический_ползун'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/1/1b/HJ_Husk_Miner.png',
            'Оболочка_шахтёра'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/b/b9/HJ_Crystallised_Husk.png',
            'Кристаллизованная_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/5d/HJ_Crystal_Guardian.png',
            'Кристаллический_страж'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/52/HJ_Furious_Vengefly.png',
            'Яростный_мстекрыл'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/c7/HJ_Volatile_Gruzzer.png',
            'Взрывная_жужжалка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/ce/HJ_Violent_Husk.png',
            'Неистовая_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/c6/HJ_Slobbering_Husk.png',
            'Масляная_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/58/HJ_Dirtcarver.png',
            'Грязекоп'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/f/f4/HJ_Carver_Hatcher.png',
            'Матка_грязекопов'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/54/HJ_Garpede.png',
            'Гарпида'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/51/HJ_Corpse_Creeper.png',
            'Трупонос'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/5f/HJ_Deepling.png',
            'Глубень'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/4/42/HJ_Deephunter.png',
            'Глубинный_охотник'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/38/HJ_Little_Weaver.png',
            'Маленький_ткач'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/0a/HJ_Stalking_Devout.png',
            'Преследующий_верующий'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/01/HJ_Nosk.png',
            'Носк'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/7/73/HJ_Shadow_Creeper.png',
            'Теневой_ползун'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/c2/HJ_Lesser_Mawlek.png',
            'Низший_чревень'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/d/d6/HJ_Mawlurk.png',
            'Чревосид'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/b/b5/HJ_Brooding_Mawlek.png',
            'Задумчивый чревень'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/5f/HJ_Lightseed.png',
            'Светик'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/9/90/HJ_Infected_Balloon.png',
            'Заражённый_пузырь'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/e/ef/HJ_Broken_Vessel.png',
            'Разбитый_Сосуд'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/51/HJ_Boofly.png',
            'Пухляш'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/c8/HJ_Primal_Aspid.png',
            'Первобытный_аспид'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/31/HJ_Hopper.png',
            'Прыгун'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/2/24/HJ_Great_Hopper.png',
            'Великий_прыгун'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/c4/HJ_Grub_Mimic.png',
            'Лжегусеничка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/6/6e/HJ_Hiveling.png',
            'Пчёлка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/32/HJ_Hive_Soldier.png',
            'Солдат_Улья'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/2/20/HJ_Hive_Guardian.png',
            'Страж_Улья'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/a/ad/HJ_Husk_Hive.png',
            'Оболочка_с_ульем'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/0e/HJ_HiveKnight.png',
            'Рыцарь_Улья'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/04/HJ_Spiny_Husk.png',
            'Колючая_оболочка'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/f/fc/HJ_Loodle.png',
            'Шипоскок'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/9/93/HJ_Mantis_Petra.png',
            'Богомол_Петра'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/d/df/HJ_Mantis_Traitor.png',
            'Богомолий_предатель'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/b/bc/HJ_Traitor_Lord.png',
            'Предавший_лорд'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/5c/HJ_Sharp_Baldur.png',
            'Укреплённый_бальдр'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/33/HJ_Armoured_Squit.png',
            'Бронированный_жалень'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/34/HJ_Battle_Obble.png',
            'Боевой_круглан'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/8/81/HJ_Oblobble.png',
            'Закруглан'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/b/b0/HJ_Shielded_Fool.png',
            'Защищённый_глупец'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/2/28/HJ_Sturdy_Fool.png',
            'Крепкий_глупец'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/6/63/HJ_Winged_Fool.png',
            'Крылатый_глупец'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/a/ad/HJ_Heavy_Fool.png',
            'Тяжёлый_глупец'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/d/d9/HJ_Death_Loodle.png',
            'Смертоносный_шипоскок'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/7/76/HJ_Volt_Twister.png',
            'Искажатель_электричества'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/9/92/HJ_God_Tamer.png',
            'Божья_укротительница'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/7/71/HJ_Pale_Lurker.png',
            'Бледный_соглядатай'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/2/27/HJ_Zote.png',
            'Зот_Могучий'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/5d/HJ_Grey_Prince_Zote.png',
            'Серый_принц_Зот'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/a/a1/HJ_Winged_Zoteling.png',
            'Крылатый_зотлинг'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/7/70/HJ_Hopping_Zoteling.png',
            'Прыгучий_зотлинг'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/1/15/HJ_Volatile_Zoteling.png',
            'Взрывной_зотлинг'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/5/5d/HJ_Xero-0.png',
            'Ксеро'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/9/9d/HJ_Gorb-0.png',
            'Горб'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/d/dc/HJ_Elder_Hu-0.png',
            'Старейшина_Ху'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/9/94/HJ_Marmu-0.png',
            'Марму'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/f/f1/HJ_No_Eyes-0.png',
            'Незрячая'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/39/HJ_Galien2.png',
            'Гальен'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/2/2c/HJ_Markoth-0.png',
            'Маркот'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/4/4b/HJ_Flamebearer01.png',
            'Мрачный_ученик'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/e/e3/HJ_Flamebearer02.png',
            'Мрачный_мастер'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/ca/HJ_Flamebearer03.png',
            'Мрачный_кошмар'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/6/6c/HJ_Grimm.png',
            'Гримм'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/a/ab/HJ_Nightmare_King.png',
            'Король_кошмара'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/1/1a/HJ_Brothers_Oro_%26_Mato.png',
            'Мастера гвоздя Оро и Мато'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/4/44/HJ_Paintmaster_Sheo.png',
            'Мастер кисти Шео'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/35/HJ_Great_Nailsage_Sly.png',
            'Великий гуру гвоздей Слай'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/c4/HJ_Wingmould.png',
            'Крылень'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/f/fd/HJ_Royal_Retainer.png',
            'Королевский_слуга'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/2/22/HJ_Kingsmould.png',
            'Каролинг'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/d/d8/HJ_Sibling.png',
            'Родственная_душа'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/d/dc/HJ_Void_Tendrils.png',
            'Щупальца_пустоты'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/f/f2/HJ_Hornet.png',
            'Хорнет'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/c/c2/HJ_Hollow_Knight.png',
            'Полый_рыцарь'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/0/08/HJ_Pure_Vessel.png',
            'Чистый Сосуд'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/3/3d/HJ_Radiance.png',
            'Лучезарность'
        ],
        [
            'https://vignette.wikia.nocookie.net/hollowknight/images/9/96/HJ_Shade.png',
            'Тень'
        ]
    ];

    var current = 0,
        max_current = data_arr.length;

    fill_journal( 0 );

    $( '.arrow-style' ).click( function() {
        var new_current;

        if ( $( this ).hasClass( 'arrow-left' ) ) {
            new_current = current - 8;

            if ( new_current <= 0 ) {
                $( '.arrow-left' ).css( 'visibility', 'hidden' );
            } else if ( new_current < max_current ) {
                $( '.arrow-right' ).css( 'visibility', 'visible' );
            } else if ( new_current < 8 ) {
                $( '.arrow-left' ).css( 'visibility', 'hidden' );
                return;
            } else 
            current;

            current = current - 8;
        } else {
            new_current = current + 8;

            if ( new_current >= max_current ) {
                $( '.arrow-right' ).css( 'visibility', 'hidden' );
                return;
            } else if ( new_current >= max_current - 8 ) { 
                $( '.arrow-right' ).css( 'visibility', 'hidden' );
            } else if ( new_current >= 8 ) {
                $( '.arrow-left' ).css( 'visibility', 'visible' );
            }
            current;

            current = current + 8;
        }

        fill_journal( current );
    });
}( jQuery );