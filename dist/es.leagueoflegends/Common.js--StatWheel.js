window.statWheelStrings =  {
        'damage-tooltip': 'Daño - La habilidad del campeón de infligir daño.',
        'toughness-tooltip': 'Dureza - La habilidad del campeón de absorber daño.',
        'control-tooltip': 'Control - La habilidad del campeón de deshabilitar o interrumpir enemigos.',
        'mobility-tooltip': 'Movilidad - La habilidad del campeón de moverse rápidamente alrededor del mapa.',
        'utility-tooltip': 'Utilidad - La habilidad del campeón de otorgar efectos beneficiosos a su aliado o proveer visión.',
        'center-tooltip': 'Nótese que el cliente califica a los campeones en escalas de 1-3 y los campeones que cuentan con Nada y Bajo en una fortaleza particular son marcados por igual. Por el contrario, esta Wikia usa una escala de 0-3 para Dureza, Control, Movilidad y Utilidad. Oficialmente, cualquier campeón listado con un 0 puede ser considerado un 1.',
        'compact-tooltip': 'Daño: %damage% / 3\nDureza: %toughness% / 3\nControl: %control% / 3\nMovilidad: %mobility% / 3\nUtilidad: %utility% / 3\n',
    }; // Cadena de caracteres localizados para el StatWheel

importArticles({
    type: "script",
    articles: [
      "u:pl.lol:MediaWiki:StatWheel.js",     // StatWheel code import from polish LoL wiki
      "MediaWiki:Common.js/ChampionInfo.js", // Needs to be imported after StatWheel.js
    ]
});