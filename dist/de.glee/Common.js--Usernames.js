/* Any JavaScript here will be loaded for all users on every page load. */

function timeStamp_Usernames_js() {
   return "2014.01.11 12:23 (UTC-8)";
}
 
var bureaucrats = [
   'Turk_Turklten',
   'XChisuka',
];
 
var admins = [
   'FinchelLivesOnForever',
   'Nabiri',
   'Nιcкι',
];
 
 
(function (bureaucrats, admins, rollbacks) {
   if (!bureaucrats.length && !admins.length && !rollbacks.length) return;
   if ('view' !== ($.getUrlVar('action') || 'view')) return;
 
   var bRegex = [];
   var aRegex = [];
   var rRegex = [];
 
   for (var i = 0; i < bureaucrats.length; i ++)
      bRegex.push(bureaucrats[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
 
   for (i = 0; i < admins.length; i ++)
      aRegex.push(admins[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
 
   for (var i = 0; i < rollbacks.length; i ++)
      rRegex.push(rollbacks[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
 
   bRegex = (bRegex.length ? bRegex.join('|') : 0);
   aRegex = (aRegex.length ? aRegex.join('|') : 0);
   rRegex = (rRegex.length ? rRegex.join('|') : 0);
 
   function addClassToComments() {
      if (bRegex) {
         var regex = new RegExp('^(?:' + bRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).attr('data-user')
            );
         }).addClass('bureaucrat');
      }
 
      if (aRegex) {
         var regex = new RegExp('^(?:' + aRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).attr('data-user')
            );
         }).addClass('admin');
      }
 
      if (rRegex) {
         var regex = new RegExp('^(?:' + rRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).attr('data-user')
            );
         }).addClass('rollback');
      }
   }
 
   function addClassToWall() {
      var path     = wgServer + '/wiki/Nachrichtenseite:';
 
      if (bRegex) {
         var tmpRegex = path + bRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).children('.speech-bubble-avatar')
               .children('a').attr('href')
            );
         })
         .addClass('bureaucrat');
      }
 
      if (aRegex) {
         var tmpRegex = path + aRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).children('.speech-bubble-avatar')
               .children('a').attr('href')
            );
         })
         .addClass('admin');
      }
 
      if (rRegex) {
         var tmpRegex = path + rRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).children('.speech-bubble-avatar')
               .children('a').attr('href')
            );
         })
         .addClass('rollback');
      }
   }
 
   function addClassToProfilePage() {
      if (bRegex) {
         var regex = new RegExp('(?:' + bRegex + ')(?:/|$)', 'i');
 
         if (regex.test(wgTitle))
            $('.masthead-avatar').addClass('bureaucrat');
      }
 
      if (aRegex) {
         var regex = new RegExp('(?:' + aRegex + ')(?:/|$)', 'i');
 
         if (regex.test(wgTitle))
            $('.masthead-avatar').addClass('admin');
      }
 
      if (rRegex) {
         var regex = new RegExp('(?:' + rRegex + ')(?:/|$)', 'i');
 
         if (regex.test(wgTitle))
            $('.masthead-avatar').addClass('rollback');
      }
   }
 
   function addClassToLinks() {
      var paths = [
         '/wiki/Spezial:Beiträge',
         '/wiki/Benutzer:',
         '/wiki/Nachrichtenseite:',
         '/wiki/Benutzer_Blog:',
      ];
 
      if (bRegex) {
         var regexes = bRegex.split('|');
         var exprs   = [];
 
         for (var i = 0; i < regexes.length; i ++) {
            exprs[i] = [];
 
            for (var j = 0; j < paths.length; j ++)
               exprs[i].push(wgServer + paths[j] + regexes[i]);
 
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
 
         for (var i = 0; i < regexes.length; i ++) {
            exprs[i] = [];
 
            for (var j = 0; j < paths.length; j ++)
               exprs[i].push(wgServer + paths[j] + regexes[i]);
 
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
         .addClass('admin');
      }
 
      if (rRegex) {
         var regexes = rRegex.split('|');
         var exprs   = [];
 
         for (var i = 0; i < regexes.length; i ++) {
            exprs[i] = [];
 
            for (var j = 0; j < paths.length; j ++)
               exprs[i].push(wgServer + paths[j] + regexes[i]);
 
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
         .addClass('rollback');
      }
   }
 
   $(function() {
      if (wgCanonicalNamespace == "Diskussionsfaden" ||
          wgCanonicalNamespace == "Nachrichtenseite")
         addClassToWall();
      else if ($('ul.comments li').length)
         addClassToComments();
 
      if ($('#UserProfileMasthead').length)
         addClassToProfilePage();
 
      // Works, but unfortunately has some limitations..using CSS instead
      // addClassToLinks();
    });
 
}(bureaucrats, admins, rollbacks));