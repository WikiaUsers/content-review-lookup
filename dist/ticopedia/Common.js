/* C�digos */
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
CAMBIO DE CSS O JS EN CIERTAS P�GINAS
-------------------------------------

A�ade a la lista siguiente la p�gina que hay que cambiar comillas incluidas:
<code><nowiki>"<Nombre del espacio>:<Nombre p�gina>": "<Nombre skin>",</nowiki></code>

<big>'''Atenci�n:  LAS �LTIMAS DE LA LISTAS NO TIENEN COMA AL FINAL'''</big>

*'''<Nombre del espacio>:<Nombre p�gina>''': Es el nombre completo de la p�gina SIN sustituir los espacios por caracteres de subrayado.
*'''<Nombre skin>''': Se trata del nombre un archivo MediaWiki:Skin/<Nombre skin> que contiene es CSS o el JS dependiendo del arraycon las modificaciones. En caso de ser vacio ("") entonces <Nombre skin> = <Nombre del espacio>:<Nombre p�gina>
*No es para usar en las p�ginas de usuario ni en cada p�gina de Inciclopedia. S�lo para casos excepcionales.

Si no existe <code><nowiki>MediaWiki:Skin/<Nombre skin>.css</nowiki></code> (o js) simplemente creal� y modif�calo.
*/

SkinPersonalidadas = {
    "Ticopedia:Portada": "Portada.css"

/*   EL �LTIMO NO LLEVA COMA AL FINAL  */
}