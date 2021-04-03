importArticles({
    type: "script",
    articles: [
		"MediaWiki:Common.js/Avatars.js",
		"MediaWiki:Common.js/Masthead.js",
		"MediaWiki:Common.js/HeroSkins.js",
		"MediaWiki:Common.js/Walkthrough.js",
    ]
});

$(function () {
var bureaucrats = [
   'Brady55',
   'Spottra',
   'MagamHound',
   'GorillaMan'
];

var administrators = [
   'King_Dragonhoff',
   'E12Dragon'
];

var contentmoderators = [
   'Pkukiss',
];

	var bRegex = [];
	var aRegex = [];
	var cmRegex = [];
	
	for (var i = 0; i < bureaucrats.length; i ++)
      bRegex.push(bureaucrats[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));

   for (i = 0; i < administrators.length; i ++)
      aRegex.push(administrators[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));

   for (i = 0; i < contentmoderators.length; i ++)
      cmRegex.push(contentmoderators[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));

   bRegex = (bRegex.length ? bRegex.join('|') : 0);
   aRegex = (aRegex.length ? aRegex.join('|') : 0);
   cmRegex = (cmRegex.length ? cmRegex.join('|') : 0);
	
$(function addClassToLinks() {
	var interval = setInterval(function () {
    var paths = [
         '/wiki/Special:Contributions/',
         '/wiki/Special:UserProfileActivity/',
         '/wiki/User:',
         '/wiki/Message_Wall:',
         '/wiki/User_Blog:',
      ];
    var tab = [
    	'?tab=posts',
    	'?tab=messages',
    	'?tab=comments'
    	];
	if (bRegex) {
         var regexes = bRegex.split('|');
         var exprs   = [];

         for (var i = 0; i < regexes.length; i ++) 
            exprs[i] = [];
         for (var d = 0; d < tab.length; d ++) {
            tab[d] = [];

            for (var j = 0; j < paths.length; j ++)
               exprs[i].push(paths[j] + regexes[i], conf = mw.config.get('wgServer'), + paths[j] + regexes[i], paths[j] + regexes[i]+ tab[d]);

            exprs[i] = exprs[i].join('|');
         }

         exprs     = exprs.join('|');
         var regex = new RegExp('^(?:' + exprs + ')$', 'i');

         $('a')
         .filter(function() {
            return regex.test(
               $(this).attr('href')
            );
         })
         .addClass('bureaucrat');
      }

      if (aRegex) {
         var regexes = aRegex.split('|');
         var exprs   = [];

         for (var i = 0; i < regexes.length; i ++)
            exprs[i] = [];
         for (var d = 0; d < tab.length; d ++) {
            tab[d] = [];

            for (var j = 0; j < paths.length; j ++)
               exprs[i].push(paths[j] + regexes[i], mw.config.get('wgServer') + paths[j] + regexes[i], paths[j] + regexes[i] + tab[d]);

            exprs[i] = exprs[i].join('|');
         }

         exprs = exprs.join('|');
         console.log(exprs);

         var regex = new RegExp('^(?:' + exprs + ')$', 'i');

         $('a')
         .filter(function() {
            return regex.test(
               $(this).attr('href')
            );
         })
         .addClass('administrator');
      }

      if (cmRegex) {
         var regexes = cmRegex.split('|');
         var exprs   = [];

         for (var i = 0; i < regexes.length; i ++)
            exprs[i] = [];
         for (var d = 0; d < tab.length; d ++) {
            tab[d] = [];

            for (var j = 0; j < paths.length; j ++)
               exprs[i].push(paths[j] + regexes[i], mw.config.get('wgServer') + paths[j] + regexes[i], paths[j] + regexes[i]+ tab[d]);

            exprs[i] = exprs[i].join('|');
         }

         exprs = exprs.join('|');
         console.log(exprs);

         var regex = new RegExp('^(?:' + exprs + ')$', 'i');

         $('a')
         .filter(function() {
            return regex.test(
               $(this).attr('href')
            );
         })
         .addClass('contentmoderator');
      }
	}, 100 );
});
});