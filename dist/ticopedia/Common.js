/* Códigos */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Botones.js',
        'MediaWiki:Tablas.js',
        'MediaWiki:Miscelanea.js'
    ]
});

/*
-------------------------------------
CAMBIO DE CSS O JS EN CIERTAS PÁGINAS
-------------------------------------

Añade a la lista siguiente la página que hay que cambiar comillas incluidas:
<code><nowiki>"<Nombre del espacio>:<Nombre página>": "<Nombre skin>",</nowiki></code>

<big>'''Atención:  LAS ÚLTIMAS DE LA LISTAS NO TIENEN COMA AL FINAL'''</big>

*'''<Nombre del espacio>:<Nombre página>''': Es el nombre completo de la página SIN sustituir los espacios por caracteres de subrayado.
*'''<Nombre skin>''': Se trata del nombre un archivo MediaWiki:Skin/<Nombre skin> que contiene es CSS o el JS dependiendo del arraycon las modificaciones. En caso de ser vacio ("") entonces <Nombre skin> = <Nombre del espacio>:<Nombre página>
*No es para usar en las páginas de usuario ni en cada página de Inciclopedia. Sólo para casos excepcionales.

Si no existe <code><nowiki>MediaWiki:Skin/<Nombre skin>.css</nowiki></code> (o js) simplemente crealó y modifícalo.
*/

SkinPersonalidadas = {
    "Ticopedia:Portada": "Portada.css"

/*   EL ÚLTIMO NO LLEVA COMA AL FINAL  */
}