codeLoad.definitions = {
    "AjaxBatchDelete": {
        "title": "Apagar Lote",
        "description": "Permitir a exclusão de uma lista de páginas em um formulário e protegê-las, se necessário. Esta ferramenta é acessível através de 'My Tools' na Wikia Toolbar.",
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
    "description": "Atualização automática avançada para páginas especiais ([[w:c:dev:AjaxRC|mais informações]]).",
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
        "title": "Relógio de cabeçalho de página",
        "description": "Adiciona um relógio UTC ao cabeçalho da página.",
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
        "title": "Relógio da barra de ferramentas",
        "description": "Adiciona um relógio de exibição UTC com a função de edição purgar + nulo na barra de ferramentas.",
        "group": "extras",
        "articles": [
            "dev:DisplayTimer/code.js"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "discussionsactivity": {
        "title": "Atividade de Discussão",
        "description": "Cria um feed de 'Atividade recente da Wiki' para as últimas mensagens de discussão. ",
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
        "description": "Esta folha de estilo moderniza a aparência da página [[Especial:WikiActivity]]",
        "group": "design",
        "articles": [
            "ModernWikiActivity.css"
        ],
        "preferences": {
            "enabled": false
        }
    },
    "refreshthreads": {
        "title": "Atualizar tópicos",
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
        "title": "Botão Veja Mais Atividade",
        "description": "Adiciona um link para a atividade recente do wiki ou alterações recentes no Rail.",
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
        "description": "Expande os artigos para 100% de largura por meio do botão da barra de ferramentas Expandir conteúdo.",
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
        "description": "Um novo design para o editor de código-fonte",
        "group": "design",
        "articles": [
            "dev:MediaWiki:EditorSourceMinimal/light.css"
        ],
        "preferences": {
            "enabled": true
        }
    },
    "lastedited": {
        "title": "Última edição",
        "description": "Adiciona detalhes sobre a última edição da página atual.",
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
        "description": "Permite visualizar rapidamente qualquer link de comparação em um wiki (além de recursos extras para administradores).",
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
        "description": "Mata o carregador Lightbox da Wikia para imagens, de forma que clicar em uma imagem leva você diretamente para a página 'Arquivo:'.",
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
        "title": "Botão Voltar ao topo",
        "description": "Adiciona um botão no canto direito da barra de ferramentas que o leva de volta ao topo da página.",
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
        "description": "Atualiza automaticamente os links de arquivos em todo o wiki ao renomear uma imagem ou atualizações de link de arquivo de fila para executar atualizações em lote.",
        "group": "sysop",
        "articles": [
            "dev:FileUsageAuto-update/code.js"
        ],
        "preferences": {
           "requiresGlobalPrefs": true,
           "enabled": true,
           "editSummary": "Atualizando links de arquivos (automático)",
           "delay": 5000
        },
        "requirements": {
            "usergroups": "content-moderator|sysop"
        }
    },
    "FileLogs": {
        "title": "Logs de arquivos",
        "description": "Mostra extratos de log em páginas de arquivo.",
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
        "description": "Adiciona um link para [[Especial:Páginas afluentes]] no menu suspenso do botão 'Editar''.",
        "group": "extras",
        "articles": [
            "dev:WhatLinksHere/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "NullEditButton": {
        "title": "Edição Nula",
        "description": "Adiciona a opção de Edição Nula ao menu suspenso do botão 'Editar'.",
        "group": "extras",
        "articles": [
            "dev:NullEditButton/code.js"
        ],
        "preferences": {
           "enabled": false
        }
    },
    "ParentPageEdit": {
        "title": "Editar Página Parental",
        "description": "Adiciona botões para editar páginas base e raiz em subpáginas.",
        "articles": [
            "dev:ParentPageEdit.js"
        ],
        "preferences": {
           "requiresGlobalPrefs": true,
           "enabled": false,
           "EditBasePageText": "Editar página de base",
           "EditRootPageText": "Editar página raiz"
        }
    },
     "ViewSource": {
        "title": "Ver Fonte",
        "description": "Adiciona uma opção 'Visualizar fonte' ao menu suspenso do botão 'Editar'",
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
    "batchDeleteDelay": "Determina a taxa da exclusão. Por padrão, é 1000 milissegundos (1 segundo) para excluir um artigo.",
    "AjaxRCRefreshText": "Texto exibido ao lado da caixa de seleção na página.",
    "ajaxRefresh": "Intervalo no qual a página é atualizada automaticamente (em milissegundos).",
    "AjaxRCRefreshHoverText": "Texto exibido ao passar o mouse sobre o texto",
    "ajaxIndicator": "Imagem do indicador de progresso",
    "format": "Exibir formatação",
    "rdaRefreshInterval": "Especifica o intervalo em milissegundos no qual as postagens serão recarregadas.",
    "interval":"Tempo entre pedidos AJAX (em ms).",
    "auto_add": "Se novas respostas devem ser adicionadas automaticamente ou manualmente usando um botão solicitando que o usuário atualize.",
    "flakesMax": "Faz flocos max",
    "flakesMaxActive": "Flocos max caindo",
    "followMouse": "A neve interage com o mouse",
    "useMeltEffect": "A neve derrete ao cair",
    "useTwinkleEffect": "Cintilação de neve",
    "usePositionFixed": "Neve fixa ao rolar",
    "animationInterval": "Milissegundos teóricos por medição de quadro.",
    "SeeMoreActivityButtonRC": "Marque a caixa de seleção para alterar o destino do link para [[Especial:Mudanças recentes]] em vez disso.",
    "BackToTopModern": "Seja para mostrar o botão como um botão de texto ou como um botão de seta.",
    "BackToTopText": "Se você escolher o botão de texto, aqui você pode especificar seu texto.",
    "BackToTopSpeed": "Isso determina a velocidade de rolagem do botão.",
    "editSummary": "Isso especifica o resumo de edição das páginas nas quais os links são atualizados."
};