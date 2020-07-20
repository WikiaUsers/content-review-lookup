window.statWheelStrings =  {
        'damage-tooltip': 'Damage - A champion\'s ability to deal damage.',
        'toughness-tooltip': 'Toughness - A champion\'s ability to survive being focused.',
        'control-tooltip': 'Control - A champion\'s ability to disable or disrupt enemies.',
        'mobility-tooltip': 'Mobility - A champion\'s ability to move quickly around the map, blink or dash.',
        'utility-tooltip': 'Utility - A champion\'s ability to grant beneficial effects to their allies or to provide vision.',
        'center-tooltip': 'Note that the client rates champions on a scale of 1-3, with champions that feature both None and Low in a particular strength being marked equally. In contrast, this Wikia uses a 0-3 scale for Toughness, Control, Mobility and Utility. Any champions listed as 0 can be considered a 1, officially.',
        'compact-tooltip': 'Damage: %damage% / 3\nToughness: %toughness% / 3\nControl: %control% / 3\nMobility: %mobility% / 3\nUtility: %utility% / 3\n',
    }; // Localized strings for the StatWheel
 
importArticles({
    type: "script",
    articles: [
      "u:pl.lol:MediaWiki:StatWheel.js",     // StatWheel code import from polish LoL wiki
      "MediaWiki:Common.js/ChampionInfo.js", // Needs to be imported after StatWheel.js
    ]
});