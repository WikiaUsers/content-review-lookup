window.statWheelStrings =  {
        'damage-tooltip': 'Da�o - La habilidad del campe�n de infligir da�o.',
        'toughness-tooltip': 'Dureza - La habilidad del campe�n de absorber da�o.',
        'control-tooltip': 'Control - La habilidad del campe�n de deshabilitar o interrumpir enemigos.',
        'mobility-tooltip': 'Movilidad - La habilidad del campe�n de moverse r�pidamente alrededor del mapa.',
        'utility-tooltip': 'Utilidad - La habilidad del campe�n de otorgar efectos beneficiosos a su aliado o proveer visi�n.',
        'center-tooltip': 'N�tese que el cliente califica a los campeones en escalas de 1-3 y los campeones que cuentan con Nada y Bajo en una fortaleza particular son marcados por igual. Por el contrario, esta Wikia usa una escala de 0-3 para Dureza, Control, Movilidad y Utilidad. Oficialmente, cualquier campe�n listado con un 0 puede ser considerado un 1.',
        'compact-tooltip': 'Da�o: %damage% / 3\nDureza: %toughness% / 3\nControl: %control% / 3\nMovilidad: %mobility% / 3\nUtilidad: %utility% / 3\n',
    }; // Cadena de caracteres localizados para el StatWheel

importArticles({
    type: "script",
    articles: [
      "u:pl.lol:MediaWiki:StatWheel.js",     // StatWheel code import from polish LoL wiki
      "MediaWiki:Common.js/ChampionInfo.js", // Needs to be imported after StatWheel.js
    ]
});