/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

/* ── Calendário da Home — CDAnjos ─────────────────── */
function anosDesde(ano) {
  var agora = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  var diff = agora.getFullYear() - ano;
  if (diff === 1) return '1 ano';
  return diff + ' anos';
}

function anosDesdeTexto(ano) {
  var agora = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  var diff = agora.getFullYear() - ano;
  if (diff === 0) return 'exatamente 1 ano';
  if (diff === 1) return '1 ano';
  return diff + ' anos';
}
mw.hook('wikipage.content').add(function () {
  var el = document.getElementById('cda-hoje-widget');
  if (!el) return;

  var EVT = {
  	'01-07': [
  	  { ico: '🎂', txt: 'Feliz aniversário, <b>Mila Collins</b>!' },
  	 ],
  	'01-16': [
  	  {ico: '🎂', txt: 'Feliz aniversário, <b>Margot Benson</b>!' },	
  		],
  	'01-27': [
  	{ ico: '🎂', txt: 'Feliz aniversário, <b>Hinata Yukimura</b>!'},
  	  ],
  	'01-31': [
  	{ ico: '🎂', txt: 'Feliz aniversário, <b>Ryder Sadick</b>!' },
  	],
  	'02-13': [
  	{ico: '🎂', txt: 'Feliz aniversário, <b>Carina Castellani</b>!' },
  	{ico: '🎮', txt: 'Feliz aniversário, <b>bellsvsg_</b>!' },
  	],
  	'02-16': [
  	{ico: '🎂', txt: 'Feliz aniversário, <b>Melina Caspel</b>!' }, 
  	{ico: '🎮', txt: 'Feliz aniversário, <b>Giully Senna</b>!' },
  	],
  	'03-05': [
  	  {ico: '⭐', txt: 'Há ' + anosDesdeTexto(2026)+ ', <b>Kate Higanbana</b> virou 01 da <b>Meraki</b>!' },
    ],
     '03-06': [
      {ico: '⭐', txt: 'Há ' + anosDesde(2023)+ ', <b>Quinn Tsukuroi</b> criava a <b>Nekutai</b>!' },
    ],
    '03-17': [
      { ico: '🎂', txt: 'Feliz aniversário, <b>Cristal Giorno</b>!' },
      { ico: '🎮', txt: 'Feliz aniversário, <b>funBABE</b>!' },
    ],
     '03-29': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Akira Higanbana</b>!' },
    		{ ico: '🎮', txt: 'Feliz aniversário, <b>Akiranve</b>!' },
    ],
      '04-09': [
      { ico: '🎂', txt: 'Feliz aniversário, <b>Manuela Ferrari</b>!' },
      { ico: '🎮', txt: 'Feliz aniversário, <b>Laysamdsn</b>!'},
    ],
    '04-13': [
      { ico: '🎂', txt: 'Feliz aniversário, <b>Kate Higanbana</b>!' },
      { ico: '🎮', txt: 'Feliz aniversário, <b>Soukateh</b>!'},
      { ico: '🎂', txt: 'Feliz aniversário, <b>Himaru Black</b>!' },
    ],
    '04-20': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Lívia Martini</b>!' },
    	],
    '05-04': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Mabel Lansky</b>!' },
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Hadassa Higanbana</b>!' },
    	],
    '06-28': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Hori Khalid</b>!' },
    	{ ico: '🎮', txt: 'Feliz aniversário, <b>Giovana Vittoria</b>!'},
    	],
    '07-16': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Zack Vecchi</b>!' },
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Elisangela Bueno</b>!' },
    	],
    '07-21': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Antoine Giroud</b>!' }, 
    	{ ico: '🎮', txt: 'Feliz aniversário, <b>YogiOh</b>!' },
    	],
    '07-24': [
       { ico: '🎂', txt: 'Feliz aniversário, <b>Mai Suzuki</b>!' },
       ],
    '07-26': [
      { ico: '⭐', txt:'Há ' + anosDesde(2024)+ ', <b>Quinn Tsukuroi</b> e <b>Marina Tsukuroi</b> se casavam!' }
    ],
    '09-03':[
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Beatriz Orlando</b>!' },
    	],
    '10-03': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Ariel Hoshizaki</b>!' },
    	],
    '10-08': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Summer Nagy</b>!' },
    	],
    '10-10': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Noah Delah</b>!' },
    	],
    '10-14': [
        { ico: '🎂', txt: 'Aniversário da wiki!' }
    ],
    '10-19': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Minerva</b>!' },
    	],
    '11-27': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Mariane Mackenzie</b>!' },
    	],
    '12-02': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Dianne Nayar</b>!' },
    	],
    '12-05': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Renata Moretti</b>!' },
    	],
    '12-14': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Eduarda Miller</b>!' },
    	],
    '12-21': [
    	{ ico: '🎂', txt: 'Feliz aniversário, <b>Theo Piromalli</b>!' },
    	],
         '12-27': [
      { ico: '🎂', txt: 'Feliz aniversário, <b>Cecília Lepavlov</b>!' },
      { ico: '🎮', txt: 'Feliz aniversário, <b>AmandaSncx</b>!' },
    ],
     
  };

  var MESES = [
    'janeiro','fevereiro','março','abril','maio','junho',
    'julho','agosto','setembro','outubro','novembro','dezembro'
  ];
  var DIAS_SEMANA = [
    'Domingo','Segunda-feira','Terça-feira','Quarta-feira',
    'Quinta-feira','Sexta-feira','Sábado'
  ];

  var agora     = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  var dia       = agora.getDate();
  var mes       = agora.getMonth() + 1;
  var semana    = DIAS_SEMANA[agora.getDay()];
  var chave     = String(mes).padStart(2,'0') + '-' + String(dia).padStart(2,'0');
  var eventos   = EVT[chave] || [];
  var dataTexto = dia + ' de ' + MESES[mes - 1];

  var itens = eventos.length
    ? eventos.map(function(e) {
        return '<li>' + e.ico + ' ' + e.txt + '</li>';
      }).join('')
    : '<div style="padding:8px 0 4px;font-size:12px;color:rgba(232,232,232,.35);font-style:italic">Nenhum evento registrado para hoje.</div>';

  var lista = eventos.length
    ? '<div style="padding:8px 14px 10px"><ul style="margin:0;padding:0;list-style:none">' + itens + '</ul></div>'
    : itens;

  el.innerHTML =
    '<div style="border:1px solid rgba(212,152,26,.25);border-radius:10px;overflow:hidden;margin-bottom:14px">' +
      '<div style="background:rgba(212,152,26,.12);border-bottom:1px solid rgba(212,152,26,.18);padding:9px 14px;display:flex;align-items:center;gap:8px">' +
        '<span style="font-size:15px;line-height:1">📅</span>' +
        '<span style="font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#D4981A">Hoje</span>' +
      '</div>' +
      '<div style="padding:10px 14px 6px;font-size:17px;font-weight:700;color:#e8e8e8;border-bottom:1px solid rgba(255,255,255,.06)">' +
        dataTexto +
        '<span style="font-size:11px;font-weight:400;color:rgba(232,232,232,.45);margin-left:6px">' + semana + '</span>' +
      '</div>' +
      lista +
      '<div style="padding:7px 14px;border-top:1px solid rgba(212,152,26,.12);font-size:11px">' +
        '<a href="/pt-br/wiki/CDAnjos:Calendário" style="color:#D4981A;text-decoration:none;font-weight:600">Ver todos os eventos →</a>' +
      '</div>' +
    '</div>';
});
/* ── fim Calendário da Home ─────────────────────── */