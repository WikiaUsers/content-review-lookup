/* Scripts importados via [[MediaWiki:ImportJS]]
Mediawiki:Common.js/DynamicStats.js
Mediawiki:Common.js/gridfiltering.js
Mediawiki:Common.js/itemGridfiltering.js
Mediawiki:Common.js/writemGridfiltering.js
Mediawiki:Common.js/avatarGridfiltering.js
Mediawiki:Common.js/esportsGridfiltering.js
Mediawiki:Common.js/levelselect.js
Mediawiki:Common.js/StatWheel.js
Mediawiki:Common.js/StickyHeader.js
Mediawiki:Common.js/DynamicFontSize.js
Mediawiki:Common.js/Banner.js
Mediawiki:Common.js/rosterFilter.js
Mediawiki:Common.js/CustomTab.js
dev:InactiveUsers/code.js
dev:InputUsername/code.js
dev:OggPlayer.js
dev:Tooltips.js
//dev:DiscordModule/code.js //
dev:EditorColorPicker.js
Common.js/OggPlayerDownload.js
*/

mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Início do mw.loader.using retorno de chamada */

    /* Config para [[MediaWiki:Common.js/gridfiltering.js]] */
    gridContainer = '#champion-grid';
    gridFilters = {
        'pesquisar': 'pesquisar',
        'jogo': ['- Jogo -',
            ['LOL','League of Legends'],
            ['TFT','Teamfight Tactics'],
            ['TFT1','• Conjunto 1 - Guerras das Facções'],
            ['TFT2','• Conjunto 2 - Ascensão dos Elementos'],
            ['TFT3','• Conjunto 3 - Galáxias'],
            ['TFT3.5','• Conjunto 3.5 - Galáxias II'],
            ['TFT4','• Conjunto 4 - Destinos'],
            ['LOR','Legends of Runeterra'],
            ['WR','Wild Rift']
        ],
        'função': ['- Função -',
            ['Controlador','Controlador'],
            	['Disruptor','• Disruptor'],
            	['Encantador','• Encantador'],
            ['Lutador','Lutador'],
            	['Lutador de Investida','• Lutador de Investida'],
            	['Colosso','• Colosso'],
            ['Mago','Mago'],
            	['Mago de Artilharia','• Mago de Artilharia'],
            	['Mago de Batalha','• Mago de Batalha'],
            	['Obliterador','• Obliterador'],
            ['Atirador','Atirador'],
            ['Retalhador','Retalhador'],
            	['Assassino','• Assassino'],
            	['Duelista','• Duelista'],
            	['Especialista','Especialista'],
            ['Tanque','Tanque'],
            	['Vanguarda','• Vanguarda'],
            	['Protetor','• Protetor']
        ],
        'tipo': ['- Tipo de ataque -',
            ['Corpo-a-corpo','Corpo-a-corpo'],
            ['À distância','À distância']
        ]
    };
    
    /* Config para [[MediaWiki:Common.js/itemGridfiltering.js]] */
    itemGridContainer = '#item-grid';
    itemGridFilters = {
        'pesquisar': 'pesquisar',
        'modos' : ['- Modos de Jogo - ',
            ['Clássico 5v5', '• Clássico 5v5'],
            ['ARAM', '• ARAM'],
            ['MJR', '• Exclusivo de MJR']
        ]
    };
    
    /* Config para [[MediaWiki:Common.js/writemGridfiltering.js]] */
    writemGridContainer = '#writem-grid';
    writemGridFilters = {
        'pesquisar': 'pesquisar'
    };
    
    /* Config para [[MediaWiki:Common.js/avatarGridfiltering.js]] */
    avatarGridContainer = '#avatar-grid';
    avatarGridFilters = {
        'pesquisar': 'pesquisar',
        'disponibilidade': ['- Disponibilidade -',
            ['Disponível','• Disponível'],
            ['Legado','• Legado'],
            ['Indisponível','• Indisponível'],
            ['Temporário','• Temporário'],
            ['Desbloqueado','• Criação de Conta'],
            ['Não Lançado','• Não Lançado']
        ],
        'fonte': ['- Fonte -',
            ['Loja','• Loja do Cliente'],
            ['Riot','• Distribuição da Riot'],
            ['Missões','• Missões'],
            ['Pacote','• Pacotes'],
            ['Código','• Código de Redenção'],
            ['Criação de Conta','• Criação de Conta'],
            ['Loja de Merch','• Loja de Merch']
        ],
        'lançamento': ['- Ano -',
            ['2021lançamento', '• 2021'],
            ['2020lançamento', '• 2020'],
            ['2019lançamento', '• 2019'],
            ['2018lançamento', '• 2018'],
            ['2017lançamento', '• 2017'],
            ['2016lançamento', '• 2016'],
            ['2015lançamento', '• 2015'],
            ['2014lançamento', '• 2014'],
            ['2013lançamento', '• 2013'],
            ['2012lançamento', '• 2012'],
            ['2011lançamento', '• 2011'],
            ['2010lançamento', '• 2010'],
            ['2009lançamento', '• 2009']
        ]
    };
    
    /* Config para [[MediaWiki:Common.js/esportsGridfiltering.js]] */
    esportsGridContainer = '#esports-grid';
    esportsGridFilters = {
        'pesquisar': 'pesquisar',
        'região': ['- Região -',
            ['INT','Equipe Internacional'],
            ['NA','América do Norte'],
                ['US','• América do Norte'],
            ['EU','Europa'],
                ['DK','• Dinamarca'],
                ['DE','• Alemanha'],
                ['FR','• França'],
                ['LT','• Lituânia'],
                ['ES','• Espanha'],
                ['SW','• Suécia'],
                ['UA','• Ucrânia'],
                ['UK','• Reino Unido'],
            ['BR','Brasil'],
            ['CN','China'],
            ['KR','Coréia do Sul'],
            ['LAN','América Latina do Norte'],
                ['CO','• Colômbia'],
                ['CR','• Costa Rica'],
                ['MX','• México'],
                ['PE','• Peru'],
            ['LAS','América Latina do Sul'],
                ['AR','• Argentina'],
                ['CL','• Chile'],
            ['OCE','Oceania'],
                ['AU','• Austrália'],
            ['JP','Japão'],
            ['RU','Rússia'],
            ['SEA','Sudeste da Ásia'],
                ['ID','• Indonésia'],
                ['HK','• Hong Kong'],
                ['MY','• Malásia'],
                ['PH','• Filipinas'],
                ['SG','• Cingapura'],
                ['TH','• Tailândia'],
                ['TW','• Taiwan'],
                ['VN','• Vietnã'],
            ['TR','Turquia']
        ],
        'competição': ['- Competição -',
            ['Internacional','Internacional'],
                ['MSI','• Mid-Season Invitational'],
                ['Mundial','• Campeonato Mundial'],
                ['All-Star','• All-Stars'],
                ['Rift Rivals','• Rift Rivals'],
            ['Regional','Regional'],
                ['NALCS','• NA Championship Series'],
                ['EULCS','• EU Championship Series'],
                ['CBLOL','• CBLoL - Campeonato Brasileiro'],
                ['CLS','• CLS - Copa Latinoamérica Sur'],
                ['CNC','• CNC - Circuito Nacional Chile'],
                ['GPL','• GPL - Garena Premier League'],
                ['LAN','• LAN - Latin America Cup'],
                ['LCK','• LCK - Champions Korea'],
                ['LCL','• LCL - Continental League (RU)'],
                ['LJL','• LJL - Japan League'],
                ['LMS','• LMS - Master Series (SEA)'],
                ['LPL','• LPL - Pro League (China)'],
                ['LLN','• LLN - Liga Latinoamérica Norte'],
                ['OPL','• OPL - Oceanic Pro League'],
                ['TCL','• TCL - Turkey Champions League'],
                ['VCS','• VCS - Vietnam Championship Series'],
            ['Especial','Especial'],
                ['OGN','• OGN Invitational (KR)'],
                ['SLTV','• SLTV Star Series (RU)'],
        ]
    };
    
/* Fim do mw.loader.using retorno da chamada */
});

/* Tooltips personalizadas para uso com o Tooltips/code.js */
window.tooltips_list = [
    {   classname: 'ability-icon',
        parse: '{'+'{Tooltip/Habilidade|champion=<#champion#>|habilidade=<#habilidade#>|variante=<#variante#>|jogo=<#jogo#>}}'},
    {   classname: 'buff-icon', 
        parse: '{'+'{Tooltip/Fortalecimento|<#param#>|fortalecimento=<#fortalecimento#>|variante=<#variante#>|jogo=<#jogo#>}}'},
    {   classname: 'champion-icon',
        parse: '{'+'{Tooltip/Campeão|champion=<#champion#>|skin=<#skin#>|variante=<#variante#>|jogo=<#jogo#>}}'},
    {   classname: 'glossário',
        parse: '{'+'{Tooltip/Glossário|<#param#>|tip=<#tip#>|jogo=<#jogo#>}}'},
    {   classname: 'item-icon', 
        parse: '{'+'{Tooltip/Item|item=<#item#>|encantamento=<#encantamento#>|variante=<#variante#>|jogo=<#jogo#>}}'},
    {   classname: 'mastery-icon', 
        parse: '{'+'{Tooltip/Talento|<#param#>|talento=<#talento#>|variante=<#variante#>}}'},
    {   classname: 'pp-tooltip',
        parse: '{'+'{Tooltip/Pp|bot_values=<#bot_values#>|top_values=<#top_values#>|start=<#start#>|finish=<#finish#>|bot_label=<#bot_label#>|top_label=<#top_label#>|displayformula=<#displayformula#>|useformula=<#useformula#>|bot_key=<#bot_key#>|top_key=<#top_key#>|bot_round=<#bot_round#>|top_round=<#top_round#>|top_fill=<#top_fill#>}}'},
    {   classname: 'rune-icon', 
        parse: '{'+'{Tooltip/Runa|<#param#>|runa=<#runa#>|variante=<#variante#>|jogo=<#jogo#>}}'},
    {   classname: 'skin-icon', 
        parse: '{'+'{Tooltip/Skin|champion=<#champion#>|skin=<#skin#>|variante=<#variante#>|jogo=<#jogo#>}}'},
    {   classname: 'skinloading-icon', 
        parse: '{'+'{Tooltip/Skin/Carregamento|champion=<#champion#>|skin=<#skin#>|variante=<#variante#>|jogo=<#jogo#>}}'},
    {   classname: 'chroma-icon', 
        parse: '{'+'{Tooltip/Croma|champion=<#champion#>|skin=<#skin#>|cromas=<#cromas#>|jogo=<#jogo#>}}'},
    {   classname: 'avatar-icon', 
        parse: '{'+'{Tooltip/Ícone|<#param#>|ícone=<#ícone#>}}'},
    {   classname: 'esports-icon', 
        parse: '{'+'{Tooltip/Ícone|<#param#>|ícone=<#ícone#>}}'},
    {   classname: 'ward-icon', 
        parse: '{'+'{Tooltip/Sentinela|<#param#>|sentinela=<#sentinela#>}}'},
    {   classname: 'spell-icon', 
        parse: '{'+'{Tooltip/Feitiço|spell=<#spell#>|variante=<#variante#>|jogo=<#jogo#>}}'},
    {   classname: 'sandbox-tooltip', 
        parse: '{'+'{Tooltip/Sandbox|<#v0#>|<#v1#>|<#v2#>|<#v3#>|<#v4#>|<#v5#>|<#v6#>|<#v7#>|<#v8#>|<#v9#>|<#v10#>|<#v11#>|<#v12#>}}'},
    {   classname: 'tft-icon', 
        parse: '{'+'{Tooltip/TFT|<#param#>|set=<#set#>|type=<#type#>}}'},
    {   classname: 'rp-icon', 
        parse: '{'+'{Tooltip/RP|<#param#>|rp=<#rp#>}}'},
    {   classname: 'wc-icon', 
        parse: '{'+'{Tooltip/WC|wc=<#wc#>}}'},
    {   classname: 'lor-tooltip', 
        parse: '{'+'{Tooltip/LOR|<#param#>}}'}
];
 
window.tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true
};

/* Flip Text */
(function() {
    function addHook() {
        $(".flipText1").show();
        $(".flipText2").hide();
        $(".flipText1, .flipText2").off();
        $(".flipText1, .flipText2").click(function(e) {
           $(e.target).closest('span#container.container').children().toggle();
        });
    }
    $(addHook);
    mw.hook('wikipage.content').add(addHook);
}());

/* Toggleable skill tabs */
mw.hook('wikipage.content').add(function(elem) {
    $(elem).find('.skill-tabs:not(.made-skill-tabs)').each(function() {
        var tabs = $(this).addClass('made-skill-tabs');
        var dts = $(this).find('> dt');
        if(dts.length === 2) tabs.addClass('toggle-tabs');
        dts.each(function(i) {
            var dt = $(this);
            if(i > 0) {
                dt.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                dt.prepend($('<span class="prev-tab" title="Click to cycle through the information.">«</span>').mousedown(function(e) {
                    e.preventDefault();
                }).click(function() {
                    dts.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                    $(dts[i-1]).removeClass('hidden-tab').find('+ dd').removeClass('hidden-tab');
                }));
            }
            if(i < dts.length-1) {
                dt.append($('<span class="next-tab" title="Click to cycle through the information.">»</span>').mousedown(function(e) {
                    e.preventDefault();
                }).click(function() {
                    dts.addClass('hidden-tab').find('+ dd').addClass('hidden-tab');
                    $(dts[i+1]).removeClass('hidden-tab').find('+ dd').removeClass('hidden-tab');
                }));
            }
        });
    });
});

/* NÃO ADICIONE CÓDIGO ABAIXO DESSA LINHA */