//========================================== // Personalizzazioni dell'interfaccia //==========================================   //==================================== // Immagine casuale //==================================== /* Mostra un'immagine casuale nella */ /* barra laterale (Oasis) */   /* Lista immagini */ var WikiaRailImageArray = new Array(); WikiaRailImageArray[0] = "<img src='http://images3.wikia.nocookie.net/onepiece/it/images/thumb/7/76/Rufy_Color_Walk_4.jpg/300px-Rufy_Color_Walk_4.jpg' alt='Monkey D. Rufy'>"; WikiaRailImageArray[1] = "<img src='http://images4.wikia.nocookie.net/__cb20120215165423/onepiece/it/images/thumb/3/33/Zoro_Color_Walk_4.jpg/300px-Zoro_Color_Walk_4.jpg' alt='Roronoa Zoro'>"; WikiaRailImageArray[2] = "<img src='http://images4.wikia.nocookie.net/__cb20120215165423/onepiece/it/images/thumb/0/0f/Nami_Color_Walk_4.jpg/300px-Nami_Color_Walk_4.jpg' alt='Nami'>"; WikiaRailImageArray[3] = "<img src='http://images2.wikia.nocookie.net/__cb20120215165424/onepiece/it/images/thumb/f/ff/Usop_Color_Walk_4.jpg/300px-Usop_Color_Walk_4.jpg' alt='Usop'>"; WikiaRailImageArray[4] = "<img src='http://images1.wikia.nocookie.net/__cb20120215165424/onepiece/it/images/thumb/2/29/Sanji_Color_Walk_4.jpg/300px-Sanji_Color_Walk_4.jpg' alt='Sanji'>"; WikiaRailImageArray[5] = "<img src='http://images4.wikia.nocookie.net/__cb20120215165424/onepiece/it/images/thumb/2/2f/Chopper_Color_Walk_4.jpg/300px-Chopper_Color_Walk_4.jpg' alt='TonyTony Chopper'>"; WikiaRailImageArray[6] = "<img src='http://images4.wikia.nocookie.net/__cb20120215165425/onepiece/it/images/thumb/4/4a/Robin_Color_Walk_4.jpg/300px-Robin_Color_Walk_4.jpg' alt='Nico Robin'>"; WikiaRailImageArray[7] = "<img src='http://images4.wikia.nocookie.net/__cb20120215165425/onepiece/it/images/thumb/e/e9/Franky_Color_Walk_4.jpg/300px-Franky_Color_Walk_4.jpg' alt='Franky'>"; WikiaRailImageArray[8] = "<img src='http://images1.wikia.nocookie.net/onepiece/it/images/thumb/b/b7/Bibi_Color_Walk_3.jpg/300px-Bibi_Color_Walk_3.jpg' alt='Nefertari Bibi'>";   /* Scelta immagine */ var chosenWikiaRailImage = Math.round(Math.random() * (WikiaRailImageArray.length - 1));   /* Inserimento immagine */ $('#WikiaRail').append(WikiaRailImageArray[chosenWikiaRailImage]);   //================================== // Strumenti aggiuntivi //================================== /* Aggiunta link aggiuntivi */ /* nel menù di modifica (oasis) */ $(function () { $(($( '.UserProfileActionButton' ).length ? '.UserProfileActionButton' : '#WikiaPageHeader') + ' > .wikia-menu-button > ul').append('<li><a href="/wiki/'+ wgPageName +'?useskin=monobook" title="Vedi in Monobook">Vedi in Monobook</a></li><li><a href="/wiki/'+ wgPageName +'?useskin=wikiamobile" title="Vedi in Wikia Mobile">Vedi in Wikia Mobile</a></li><li><a href="/wiki/Speciale:PuntanoQui/'+ wgPageName +'" title="Puntano qui">Puntano qui</a></li><li><a href="/wiki/Speciale:Prefissi/'+ wgPageName +'" title="Sottopagine">Sottopagine</a></li>'); });

Leggi il resto a: http://it.onepiece.wikia.com/wiki/MediaWiki:Wikia.js/customInterface.js#ixzz2LfWW6w1B 
Under Creative Commons License: Attribution Share Alike