codeLoad.definitions = {
    "AjaxBatchDelete": {
        "title": "Apagar Lote",
        "description": "Permitir a exclus�o de uma lista de p�ginas em um formul�rio e proteg�-las, se necess�rio. Esta ferramenta � acess�vel atrav�s de 'My Tools' na Wikia Toolbar.",
        "group": "sysop",
        "articles": [
            "dev:AjaxBatchDelete.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "enabled": true,
            "batchDeleteDelay": 1000,
        }
    },
    "ajaxrc": {
    "title": "AjaxRC",
    "description": "Atualiza��o autom�tica avan�ada para p�ginas especiais ([[w:c:dev:AjaxRC|mais informa��es]]).",
    "group": "extras",
    "articles": [
        "dev:AjaxRC/code.js"
    ],
    "preferences": {
        "enabled": true,
        "requiresGlobalPrefs": true,
        "AjaxRCRefreshText": "Auto-refresh",
        "ajaxRefresh": 60000,
        "AjaxRCRefreshHoverText": 'Automatically refresh the page',
        "ajaxIndicator": "https://vignette.wikia.nocookie.net/sonic/images/7/7c/AjaxRC.gif/revision/latest?cb=20170917141821",
        "ajaxPages": [
    "Especial:RecentChanges",
    "Especial:Watchlist",
    "Especial:WikiActivity",
    "Especial:Log",
    "Especial:Contributions"
    ]
}
    },
   "clock": {
        "title": "Rel�gio de cabe�alho de p�gina",
        "description": "Adiciona um rel�gio UTC ao cabe�alho da p�gina.",
        "group": "extras",
        "articles": [
            "dev:UTCClock/code.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "globalPrefNamespace": "DisplayClockJS",
            "enabled": false,
            "format": "%2H:%2M:%2S %p %2d %B %Y (UTC)"
        }
    },
    "Toolbarclock": {
        "title": "Rel�gio da barra de ferramentas",
        "description": "Adiciona um rel�gio de exibi��o UTC com a fun��o de edi��o purgar + nulo na barra de ferramentas.",
        "group": "extras",
        "articles": [
            "dev:DisplayTimer/code.js"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "discussionsactivity": {
        "title": "Atividade de Discuss�o",
        "description": "Cria um feed de 'Atividade recente da Wiki' para as �ltimas mensagens de discuss�o. ",
        "group": "extras",
        "articles": [
            "dev:DiscussionsActivity.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "enabled": false,
            "rdaRefreshInterval": 60000
        }
    },
    "ModernWikiActivity": {
        "title": "Atividade moderna de wiki",
        "description": "Esta folha de estilo moderniza a apar�ncia da p�gina [[Especial:WikiActivity]]",
        "group": "design",
        "articles": [
            "ModernWikiActivity.css"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "refreshthreads": {
        "title": "Atualizar t�picos",
        "description": "Periodically checks for new thread replies on the 'Thread' namespace using AJAX. ",
        "group": "extras",
        "articles": [
            "dev:RefreshThreads/code.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "enabled": true,
            "interval": 15000,
            "auto_add": true
        }
    },
    "snow": {
        "title": "Neve",
        "description": "Cria uma suave nevasca de inverno no fundo da wiki.",
        "group": "extras",
        "articles": [
            "dev:SnowStorm.js"
        ],
        "preferences": {
            "requiresGlobalPrefs": true,
            "enabled": false,
            "flakesMax": 135,
            "flakesMaxActive": 85,
            "followMouse": false,
            "useMeltEffect": true,
            "useTwinkleEffect": false,
            "usePositionFixed": true,
            "animationInterval": 35
        }
    },
    "SeeMoreActivityButton": {
        "title": "Bot�o Veja Mais Atividade",
        "description": "Adiciona um link para a atividade recente do wiki ou altera��es recentes no Rail.",
        "group": "extras",
        "articles": [
            "dev:SeeMoreActivityButton/code.js"
        ],
        "preferences": {
           "requiresGlobalPrefs": true,
           "enabled": true,
           "SeeMoreActivityButtonRC": false
        }
    },
    "hiderail": {
        "title": "HideRail",
        "description": "Expande os artigos para 100% de largura por meio do bot�o da barra de ferramentas Expandir conte�do.",
        "group": "extras",
        "articles": [
            "dev:HideRail/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "editorvisualminimal": {
        "title": "EditorVisualMinimal",
        "description": "Um redesign para o editor visual.",
        "group": "design",
        "articles": [
            "dev:MediaWiki:EditorVisualMinimal/code.css"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "editorsourceminimal": {
        "title": "EditorSourceMinimal",
        "description": "Um novo design para o editor de c�digo-fonte",
        "group": "design",
        "articles": [
            "dev:MediaWiki:EditorSourceMinimal/light.css"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "lastedited": {
        "title": "�ltima edi��o",
        "description": "Adiciona detalhes sobre a �ltima edi��o da p�gina atual.",
        "group": "extras",
        "articles": [
            "dev:LastEdited/code.js"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "quickdiff": {
        "title": "QuickDiff",
        "description": "Permite visualizar rapidamente qualquer link de compara��o em um wiki (al�m de recursos extras para administradores).",
        "group": "extras",
    "articles": [
            "dev:QuickDiff/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "noimagelightbox": {
        "title": "NoImageLightbox",
        "description": "Mata o carregador Lightbox da Wikia para imagens, de forma que clicar em uma imagem leva voc� diretamente para a p�gina 'Arquivo:'.",
        "group": "extras",
        "articles": [
            "dev:NoImageLightbox/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "pseudomonobook": {
        "title": "PseudoMonobook",
        "description": "Apresenta as dicas do design visual do Monobook para o Oasis.",
        "group": "design",
        "articles": [
            "dev:MediaWiki:PseudoMonobook.css"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "backtotopbutton": {
        "title": "Bot�o Voltar ao topo",
        "description": "Adiciona um bot�o no canto direito da barra de ferramentas que o leva de volta ao topo da p�gina.",
        "group": "extras",
        "articles": [
            "dev:BackToTopButton/code.js"
        ],
        "preferences": {
           "requiresGlobalPrefs": true,
           "enabled": false,
           "BackToTopModern": true,
           "BackToTopText": "De volta ao topo",
           "BackToTopSpeed": "600"
        }
    },
    "FileUsageAuto-update": {
        "title": "FileUsageAuto-update",
        "description": "Atualiza automaticamente os links de arquivos em todo o wiki ao renomear uma imagem ou atualiza��es de link de arquivo de fila para executar atualiza��es em lote.",
        "group": "sysop",
        "articles": [
            "dev:FileUsageAuto-update/code.js"
        ],
        "preferences": {
           "requiresGlobalPrefs": true,
           "enabled": true,
           "editSummary": "Atualizando links de arquivos (autom�tico)",
           "delay": 5000
        },
        "requirements": {
            "usergroups": "content-moderator|sysop"
        }
    },
    "FileLogs": {
        "title": "Logs de arquivos",
        "description": "Mostra extratos de log em p�ginas de arquivo.",
        "group": "extras",
        "articles": [
            "dev:FileLogs.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "WhatLinksHere": {
        "title": "O que liga aqui",
        "description": "Adiciona um link para [[Especial:P�ginas afluentes]] no menu suspenso do bot�o 'Editar''.",
        "group": "extras",
        "articles": [
            "dev:WhatLinksHere/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "NullEditButton": {
        "title": "Edi��o Nula",
        "description": "Adiciona a op��o de Edi��o Nula ao menu suspenso do bot�o 'Editar'.",
        "group": "extras",
        "articles": [
            "dev:NullEditButton/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "ParentPageEdit": {
        "title": "Editar P�gina Parental",
        "description": "Adiciona bot�es para editar p�ginas base e raiz em subp�ginas.",
        "articles": [
            "dev:ParentPageEdit.js"
        ],
        "preferences": {
           "requiresGlobalPrefs": true,
           "enabled": false,
           "EditBasePageText": "Editar p�gina de base",
           "EditRootPageText": "Editar p�gina raiz"
        }
    },
     "ViewSource": {
        "title": "Ver Fonte",
        "description": "Adiciona uma op��o 'Visualizar fonte' ao menu suspenso do bot�o 'Editar'",
        "group": "extras",
        "articles": [
            "dev:View Source/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
};
codeLoad.groups = {
    "extras": "Melhorias no site",
    "design": "Estilo do site",
    "sysop": "Ferramentas apenas para moderadores",
};
codeLoad.prefDescriptions = {
    "batchDeleteDelay": "Determina a taxa da exclus�o. Por padr�o, � 1000 milissegundos (1 segundo) para excluir um artigo.",
    "AjaxRCRefreshText": "Texto exibido ao lado da caixa de sele��o na p�gina.",
    "ajaxRefresh": "Intervalo no qual a p�gina � atualizada automaticamente (em milissegundos).",
    "AjaxRCRefreshHoverText": "Texto exibido ao passar o mouse sobre o texto",
    "ajaxIndicator": "Imagem do indicador de progresso",
    "format": "Exibir formata��o",
    "rdaRefreshInterval": "Especifica o intervalo em milissegundos no qual as postagens ser�o recarregadas.",
    "interval":"Tempo entre pedidos AJAX (em ms).",
    "auto_add": "Se novas respostas devem ser adicionadas automaticamente ou manualmente usando um bot�o solicitando que o usu�rio atualize.",
    "flakesMax": "Faz flocos max",
    "flakesMaxActive": "Flocos max caindo",
    "followMouse": "A neve interage com o mouse",
    "useMeltEffect": "A neve derrete ao cair",
    "useTwinkleEffect": "Cintila��o de neve",
    "usePositionFixed": "Neve fixa ao rolar",
    "animationInterval": "Milissegundos te�ricos por medi��o de quadro.",
    "SeeMoreActivityButtonRC": "Marque a caixa de sele��o para alterar o destino do link para [[Especial:Mudan�as recentes]] em vez disso.",
    "BackToTopModern": "Seja para mostrar o bot�o como um bot�o de texto ou como um bot�o de seta.",
    "BackToTopText": "Se voc� escolher o bot�o de texto, aqui voc� pode especificar seu texto.",
    "BackToTopSpeed": "Isso determina a velocidade de rolagem do bot�o.",
    "editSummary": "Isso especifica o resumo de edi��o das p�ginas nas quais os links s�o atualizados."
};