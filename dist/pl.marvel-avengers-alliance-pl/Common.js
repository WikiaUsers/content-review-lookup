/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Konfiguracja dla [[w:c:dev:Tooltips/code.js]] */
var tooltips_list = [
    {
        classname: 'effect-icon',
        parse: '{'+'{Tooltip/Efekt/<#param#>}}',
    },
]
var tooltips_config = {
    waitForImages: true,
}

/* Import skryptów */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Tooltips/code.js", /* Dymki podpowiedzi */
        "w:c:dev:Countdown/code.js"
    ]
});