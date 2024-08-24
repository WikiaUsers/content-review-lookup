window.statWheelStrings =  {
        'damage-tooltip': 'Dano - A capacidade de um campe�o de causar dano.',
        'toughness-tooltip': 'Durabilidade - A capacidade de um campe�o de sobreviver ao foco.',
        'control-tooltip': 'Controle - A capacidade de um campe�o de desativar ou interromper os inimigos.',
        'mobility-tooltip': 'Mobilidade - A capacidade de um campe�o de se mover rapidamente pelo mapa, piscar ou piscar.',
        'utility-tooltip': 'Utilidade - A capacidade do campe�o de conceder efeitos ben�ficos aos seus aliados ou de fornecer vis�o.',
        'center-tooltip': 'Observe que o cliente classifica os campe�es em uma escala de 1-3, com os campe�es que apresentam Nenhum e Baixo em uma for�a espec�fica sendo marcados igualmente. Por outro lado, esta Wikia usa uma escala de 0 a 3 para durabilidade, controle, mobilidade e utilidade. Qualquer campe�o listado como 0 pode ser considerado um 1, oficialmente.',
        'compact-tooltip': 'Dano: %damage% / 3\nDurabilidade: %toughness% / 3\nControle: %control% / 3\nMobilidade: %mobility% / 3\nUtilidade: %utility% / 3\n',
    }; // Localized strings for the StatWheel

importArticles({
    type: "script",
    articles: [
      "u:pl.lol:MediaWiki:StatWheel.js",     // StatWheel code import from polish LoL wiki
      "MediaWiki:Common.js/ChampionInfo.js", // Needs to be imported after StatWheel.js
    ]
});