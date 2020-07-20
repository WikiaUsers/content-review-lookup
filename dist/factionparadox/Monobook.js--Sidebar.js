/*<pre>
Shamelessly taken from [[w:c:es.pokemon]]

Aviso: Esto es código JavaScript. Si hay algún tipo de error de sintaxis en este código el menú del sidebar dejará de funcionar. Asegúrate que no rompes nada.
Cada elemento de wgSidebar es el texto (después del |) del elemento en [[MediaWiki:Sidebar]]
Los menús son listas [ ... ]. Un string ' ... ' es un elemento. Un objeto { ... } es un elemento con un submenú, donde la clave (antes de los : ) es el propio elemento y el valor (después de los : ) es una lista [ ... ] con el contenido del submenú.
Para cada elemento, será tanto el enlace como el texto. Si se pone una barra | lo que haya antes será el enlace y lo de después el texto.
*/
wgSidebar['Audios'] = [
	{'Category:BBV audio stories|The Faction Paradox Protocols': [
   'The Eleven-Day Empire (audio story)|The Eleven-Day Empire',
   'The Shadow Play (audio story)|The Shadow Play',
   'Sabbath Dei (audio story)|Sabbath Dei',
   'In the Year of the Cat (audio story)|In the Year of the Cat',
   'Movers (audio story)|Movers',
   'A Labyrinth of Histories (audio stories)|A Labyrinth of Histories',
                       ]},
	{'Category:MB audio stories|The True History of Faction Paradox': [
   'Coming to Dust (audio story)|Coming to Dust',
   'The Ship of a Billion years (audio story)|The Ship of a Billion Years',
   'Body Politic (audio story)|Body Politic',
   'Words from Nine Divinities (audio story)|Words from Nine Divinities',
   'Ozymandias (audio story)|Ozymandias',
   'The Judgment of Sutekh (audio story)|The Judgment of Sutekh',
                       ]},
];

wgSidebar['Books'] = [
	{'Category:MNP books|Mad Norwegian': [
      'The Book of the War (novel)|The Book of the War',
     'This Town Will Never Let Us Go (novel)|This Town Will Never Let Us Go',
     'Of the City of the Saved... (novel)|Of the City of the Saved...',
     'Warlords of Utopia (novel)|Warlords of Utopia',
     'Warring States (novel)|Warring States',
     'Erasing Sherlock (novel)|Erasing Sherlock', 
                       ]},
	{'Category:RS books|Random Shock': [
     'Newton\'s Sleep (novel)|Newton\'s Sleep',
                       ]},
	{'Category:OB books|Obverse Books': [
    'A Romance in Twelve Parts|A Romance in Twelve Parts',
    'Tales of the City|Tales of the City',
    'Against Nature|Against Nature',
    'The Brakespeare Voyage|The Brakespeare Voyage',
    'The Moontree Women|The Moontree Women',
    'Opus Majus|Opus Majus',
    'Burning with Optimism\'s Flames|Burning with Optimism\'s Flames',
                       ]},
];

wgSidebar['Comics'] = [
        'Faction Paradox (2003)',
	'FP 1|Faction Paradox #1',
	'FP 2|Faction Paradox #2',
];

wgSidebar['Characters'] = [
     'Justine|Justine',
     'Eliza|Eliza',
     'Lolita|Lolita',
     'War King|War King',
     'Grandfather Paradox|Grandfather Paradox',
     'Morbius|Morbius', 
];
 
wgSidebar['Forums'] = [
        'Forum:Tech notes|Tech notes',
	'Forum:Homeworld|The Homeworld',
	'Forum:Reference desk|Reference desk',
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
        'Help:Wiki markup|Wiki markup',
];
 
/* Llamada al código para inicializar esto */
$(MonobookSidebar.init);
 
/*</pre>*/