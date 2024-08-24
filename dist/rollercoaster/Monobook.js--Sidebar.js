/* Any JavaScript here will be loaded for users using the MonoBook skin */
/*<pre>
Thank you to Tardis Wiki, who in turn say thank you to the Spanish Pokemon Wiki.So that is why half of it is in Spanish. We didn't make any of it.
 
Aviso: Esto es c�digo JavaScript. Si hay alg�n tipo de error de sintaxis en este c�digo el men� del sidebar dejar� de funcionar. Aseg�rate que no rompes nada.
Cada elemento de wgSidebar es el texto (despu�s del |) del elemento en [[MediaWiki:Sidebar]]
Los men�s son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submen�, donde la clave (antes de los : ) es el propio elemento y el valor (despu�s de los : ) es una lista [ ... ] con el contenido del submen�.
Para cada elemento, ser� tanto el enlace como el texto. Si se pone una barra | lo que haya antes ser� el enlace y lo de despu�s el texto.
*/
wgSidebar['Roller coasters'] = [
                 {'Find a coaster|Find a coaster': [
                         'Category:Roller coasters|A-Z',
                         'Category:Track materials|By track material',
                         'Category:Types of Roller Coasters|By type',
                         'Category:Roller coasters by manufacturer|By manufacturer',
                         'Category:Roller coasters by designer|By designer',
                         'Category:Roller coasters by model|By mass-produced model',
                         'Category:Roller coasters by height|By height',
                         'Category:Roller coasters by track layour|By track layout',
                         'Category:Year|By opening year',
                         ]},
                 'Inversions|Thrill elements',
                 {'Elements|Other elements': [
                        'Station',
                        'Transfer Track',
                        'Pre-Drop',
                        'Brakes',
                        ]},

];

wgSidebar['Amusement parks'] = [
                 'Category:Amusement parks|A-Z',
                 'Category:Amusement parks by operator or owner|By operator/owner',
                 'Category:Amusement parks by location|By location',

];
 
wgSidebar['Companies|Companies'] = [
                 'Category:Manufacturers|Ride manufacturers',
                 'Category:Amusement parks operators and owners|Park operators and owners',
                 'Category:People|People'

];
 
wgSidebar['People|People']
 
wgSidebar['Forums'] = [
        'Forum:Tech notes|Tech notes',
	'Forum:Panopticon|Panopticon',
	'Forum:Reference desk|Reference desk',
	'Forum:Discontinuity index|Discontinuity index',
        'Forum:Timey-wimey detector|Timey-wimey detector',
	'Howling:The Howling|Howling *SPOILERS*'
];
 
wgSidebar['help'] = [
	'Help:Avatars|Avatars',
	'Help:Bypass your cache|Bypass your cache',
	'Help:Chat|Chat',
	'Help:Files|Files',
	'Help:Logging in|Logging in',
        'Help:Magic words|Magic Words',
        'Help:Preloadable formats|Preloadable formats',
        'Help:Signatures|Signatures',
        'Help:Wiki markup|Wiki markup'
];
 
/* Llamada al c�digo para inicializar esto */
$(MonobookSidebar.init);
 
/*</pre>*/