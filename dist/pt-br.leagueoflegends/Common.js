/* Scripts importados via [[MediaWiki:ImportJS]]
Mediawiki:Common.js/DynamicStats.js
Mediawiki:Common.js/gridfiltering.js
Mediawiki:Common.js/itemGridfiltering.js
Mediawiki:Common.js/avatarGridfiltering.js
Mediawiki:Common.js/esportsGridfiltering.js
Mediawiki:Common.js/levelselect.js
Mediawiki:Common.js/StatWheel.js
Mediawiki:Common.js/StickyHeader.js
Mediawiki:Common.js/DynamicFontSize.js
Mediawiki:Common.js/Banner.js
Mediawiki:Common.js/rosterFilter.js
Mediawiki:Common.js/CustomTab.js
dev:DiscordModule/code.js
dev:InputUsername/code.js
dev:OggPlayer.js
dev:RCStats.js
dev:Tooltips.js
dev:TabViewEditLinks/code.js
dev:WikiManager_Nameplate.js
*/

mw.loader.using( ['mediawiki.util', 'jquery.client'], function () {
/* Início do mw.loader.using retorno de chamada */

    /* Config para [[MediaWiki:Common.js/gridfiltering.js]] */
    gridContainer = '#champion-grid';
    gridFilters = {
        'search': 'search',
        'jogo': ['- Jogo -',
            ['LOL','League of Legends'],
            ['TFT','Teamfight Tactics'],
            ['TFT1','• Setor 1 - Guerras das Facções'],
            ['TFT2','• Setor 2 - A Ascensão dos Elementos'],
            ['TFT3','• Set 3 - Galáxias'],
            ['LOR','Legends of Runeterra'],
            ['WR','Wild Rift']
        ],
        'função': ['- Função -',
            ['Suporte','Suporte'],
            ['Disruptor','• Disruptor'],
            ['Encantador','• Encantador'],
            ['Lutador','Lutador'],
            ['Investidor','• Investidor'],
            ['Colosso','• Colosso'],
            ['Mago','Mago'],
            ['Artilharia','• Artilharia'],
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
        'tipo': ['- Tipodeataque -',
            ['Corpo a corpo','Corpo a corpo'],
            ['À distância','À distância']
        ]
    };
    
    /* Config para [[MediaWiki:Common.js/itemGridfiltering.js]] */
    itemGridContainer = '#item-grid';
    itemGridFilters = {
        'pesquisa': 'pesquisa',
        'modos' : ['- Modos de Jogo - ',
            ['Clássico 5v5', '• Clássico 5v5'],
            ['ARAM', '• ARAM'],
            ['FGM', '• FGM Exclusivo']
        ]
    };
    
    /* Config para [[MediaWiki:Common.js/avatarGridfiltering.js]] */
    avatarGridContainer = '#avatar-grid';
    avatarGridFilters = {
        'search': 'search',
        'disponibilidade': ['- Disponibilidade -',
            ['Disponível','• Disponível'],
            ['Legado','• Legado'],
            ['Indisponível','• Indisponível'],
            ['Temporário','• Temporário'],
            ['Desbloqueado','• Criação de Conta'],
            ['Não Lançado','• Não Lançado']
        ],
        'pesquisa': ['- Pesquisa -',
            ['Loja','• Loja do Cliente'],
            ['Riot','• Distribuição da Riot'],
            ['Missões','• Missões'],
            ['Pacote','• Pacotes'],
            ['Código','• Código de Redenção'],
            ['Criação de Conta','• Criação de Conta'],
            ['Loja de Mercadorias','• Loja de Mercadorias']
        ],
        'lançamento': ['- Ano -',
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
        'search': 'search',
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
                ['CO','• ColÔmbia'],
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
                ['Worlds','• World Championship'],
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

/* Dicas de ferramentas personalizadas para uso com o Dicas de ferramentas/code.js */
var tooltips_list = [
    {   classname: 'ability-icon',
        parse: '{'+'{Dicas de ferramentas/Habilidade|champion=<#champion#>|ability=<#ability#>}}'},
    {   classname: 'buff-icon', 
        parse: '{'+'{Dicas de ferramentas/Buff|<#param#>}}'},
    {   classname: 'champion-icon',
        parse: '{'+'{Dicas de ferramentas/Campeão|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>}}'},
    {   classname: 'glossary',
        parse: '{'+'{Dicas de ferramentas/Glossário|<#param#>}}'},
    {   classname: 'item-icon', 
        parse: '{'+'{Dicas de ferramentas/Item|<#param#>}}'},
    {   classname: 'mastery-icon', 
        parse: '{'+'{Dicas de ferramentas/Maestria|<#param#>}}'},
    {   classname: 'pp-tooltip',
        parse: '{'+'{Dicas de ferramentas/Pp|<#size#>|<#values#>|values1=<#values1#>|values2=<#values2#>|label1=<#label1#>|label2=<#label2#>|displayformula=<#displayformula#>|useformula=<#useformula#>|key1=<#key1#>|key2=<#key2#>|start1=<#start1#>|start2=<#start2#>|end1=<#end1#>|end2=<#end2#>|round1=<#round1#>|round2=<#round2#>}}'},
    {   classname: 'pp-tooltip2',
        parse: '{'+'{Dicas de ferramentas/Pp2|bot_values=<#bot_values#>|top_values=<#top_values#>|start=<#start#>|finish=<#finish#>|bot_label=<#bot_label#>|top_label=<#top_label#>|displayformula=<#displayformula#>|useformula=<#useformula#>|bot_key=<#bot_key#>|top_key=<#top_key#>|bot_round=<#bot_round#>|top_round=<#top_round#>|top_fill=<#top_fill#>}}'},
    {   classname: 'rune-icon', 
        parse: '{'+'{Dicas de ferramentas/Runa|<#param#>}}'},
    {   classname: 'skin-icon', 
        parse: '{'+'{Dicas de ferramentas/Skin|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>}}'},
    {   classname: 'skinloading-icon', 
        parse: '{'+'{Dicas de ferramentas/Skin/Carregamento|champion=<#champion#>|skin=<#skin#>|variant=<#variant#>}}'},
    {   classname: 'chroma-icon', 
        parse: '{'+'{Dicas de ferramentas/Croma|champion=<#champion#>|skin=<#skin#>|chromas=<#chromas#>}}'},
    {   classname: 'avatar-icon', 
        parse: '{'+'{Dicas de ferramentas/Ícone|<#param#>}}'},
    {   classname: 'esports-icon', 
        parse: '{'+'{Dicas de ferramentas/Ícone|<#param#>}}'},
    {   classname: 'ward-icon', 
        parse: '{'+'{Dicas de ferramentas/Sentinela|<#param#>}}'},
    {   classname: 'spell-icon', 
        parse: '{'+'{Dicas de ferramentas/Feitiço|<#param#>}}'},
    {   classname: 'sandbox-tooltip', 
        parse: '{'+'{Dicas de ferramentas/Sandbox|<#v0#>|<#v1#>|<#v2#>|<#v3#>|<#v4#>|<#v5#>|<#v6#>|<#v7#>|<#v8#>|<#v9#>|<#v10#>|<#v11#>|<#v12#>}}'},
    {   classname: 'tft-icon', 
        parse: '{'+'{Dicas de ferramentas/TFT|<#param#>|set=<#set#>|type=<#type#>}}'},
    {   classname: 'rp-icon', 
        parse: '{'+'{Dicas de ferramentas/RP|<#param#>}}'},
    {   classname: 'lor-tooltip', 
        parse: '{'+'{Dicas de ferramentas/LOR|<#param#>}}'}
];
 
var tooltips_config = {
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

/* DO NOT ADD CODE BELOW THIS LINE */