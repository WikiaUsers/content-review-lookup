function timeStamp_Usernames_js() {
   return "2015.05.04 20:41 (UTC-7)";
}
 
var bureaucrats = [
   'Stan890',
   'Awesome_Yoyo',
 
var admins = [
   'No_One',
];
 
var moderators = [
   'Firedragon_III',
   'ShadowWolf171',
   'Zazme_Yakuza',
];
 
(function (bureaucrats, admins, moderators) {
   if (!bureaucrats.length && !admins.length && !moderators.length) return;
   if ('view' !== ($.getUrlVar('action') || 'view')) return;
 
   var bRegex = [];
   var aRegex = [];
   var rRegex = [];
 
   for (var i = 0; i < bureaucrats.length; i ++)
      bRegex.push(bureaucrats[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
 
   for (i = 0; i < admins.length; i ++)
      aRegex.push(admins[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
 
   for (var i = 0; i < moderators.length; i ++)
      rRegex.push(moderators[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
 
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
         }).addClass('moderator');
      }
   }
 
   function addClassToWall() {
      var path     = wgServer + '/wiki/Message_Wall:';
 
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
         .addClass('moderator');
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
            $('.masthead-avatar').addClass('moderator');
      }
   }
 
   function addClassToLinks() {
      var paths = [
         '/wiki/Special:Contributions/',
         '/wiki/User:',
         '/wiki/Message_Wall:',
         '/wiki/User_Blog:',
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
         .addClass('moderator');
      }
   }
 
   $(function() {
      if (wgCanonicalNamespace == "Thread" ||
          wgCanonicalNamespace == "Message_Wall")
         addClassToWall();
      else if ($('ul.comments li').length)
         addClassToComments();
 
      if ($('#UserProfileMasthead').length)
         addClassToProfilePage();
 
      // Works, but unfortunately has some limitations..using CSS instead
      // addClassToLinks();
    });
 
}(bureaucrats, admins, moderators));