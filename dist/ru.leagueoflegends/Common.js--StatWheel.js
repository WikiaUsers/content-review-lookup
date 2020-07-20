window.statWheelStrings =  {
        'damage-tooltip': 'Урон - Способность чемпиона наносить урон врагам.',
        'toughness-tooltip': 'Выносливость - Способность чемпиона выдерживать урон от вражеских чемпионов.',
        'control-tooltip': 'Контроль - Способность чемпиона ослаблять вражеских чемпионов.',
        'mobility-tooltip': 'Подвижность - Способность чемпиона стремительно передвигаться по карте с помощью рывков или переносов.',
        'utility-tooltip': 'Поддержка - Способность чемпиона применять различного рода усиливающие умения к союзникам и обеспечивать обзор.',
        'center-tooltip': 'Заметьте, что оценка чемпионов в игровом клиенте производится по шкале от 1 до 3, уравнивая между собой тех, кто имеет Низкий потенциал в выбранном направлении, и тех, кто его НЕ имеет вовсе. В данной Викии используется шкала от 0 до 3, которая подчеркивает эту разницу.',
        'compact-tooltip': 'Урон: %damage% / 3\nВыносливость: %toughness% / 3\nКонтроль: %control% / 3\nПодвижность: %mobility% / 3\nПоддержка: %utility% / 3\n',
    };
 
importArticles({
    type: "script",
    articles: [
      "u:pl.lol:MediaWiki:StatWheel.js",     // StatWheel code import from polish LoL wiki
      "MediaWiki:Common.js/ChampionInfo.js", // Needs to be imported after StatWheel.js
    ]
});