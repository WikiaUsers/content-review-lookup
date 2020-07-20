/* Any JavaScript here will be loaded for all users on every page load. */
switch( wgPageName){
    case 'Enhance':
        importArticles({type: "script",debug: true,
            articles: ["MediaWiki:EnhanceCalculator.js"]
        });
    break;
    case 'Disassemble':
         importArticles({type: "script",debug: true,
            articles: ["MediaWiki:DisassembleCalculator.js"]
        });
    break;
    case 'Equipments':
         importArticles({type: "style",debug: true,
            articles: ["MediaWiki:PhotoCss.css"]
        });
        importArticles({type: "script",debug: true,
            articles: ["MediaWiki:EquipmentCalculator.js"]
        });
    break;
    case 'The_King_of_Towers_Wiki': case 'Server_Time':
        importArticles({type: "script", debug: true,
            articles: ["MediaWiki:GameTimer.js"]
        });
    break;
}