/** JS auf dieser Seite wirkt sich auf alle Skins aus und wird priorisiert vor anderen JS-Seiten ausgef�hrt **/

//===============================//
//==========Rail-Modul===========//
//===============================//
window.AddRailModule = [
    {page: 'Vorlage:RailErscheinend', prepend: true, maxAge: 0},
    {page: 'Vorlage:RailApp', prepend: true, maxAge: 86400},
];