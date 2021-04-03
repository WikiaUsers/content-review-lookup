mw.loader.using('mediawiki.util').then(function(){
var bureaucrats = [
   'E12Dragon',
];

var admins = [

];

var moderators = [
];
   
var threadmoderators = [
];

var imageeditors = [
];

(function (bureaucrats, admins, moderators, threadmoderators, imageeditors) {
   if (!bureaucrats.length && !admins.length && !moderators.length && !threadmoderators.length && !imageeditors.length) return;
   if ('view' !== (mw.util.getParamValue('action') || 'view')) return;

   /* Regex arrays for: */
   var bRegex = [],  /* bureaucrats */
       aRegex = [],  /* admins */
       mRegex = [],  /* moderators */
       tmRegex = [], /* threadmoderators */
       ieRegex = []; /* imageeditors */

   for (var i = 0; i < bureaucrats.length; i ++)
      bRegex.push(bureaucrats[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));

   for (var i = 0; i < admins.length; i ++)
      aRegex.push(admins[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));

   for (var i = 0; i < moderators.length; i ++)
      mRegex.push(moderators[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
      
   for (var i = 0; i < threadmoderators.length; i ++)
      tmRegex.push(threadmoderators[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
      
   for (var i = 0; i < imageeditors.length; i ++)
      ieRegex.push(imageeditors[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));

   bRegex = (bRegex.length ? bRegex.join('|') : 0);
   aRegex = (aRegex.length ? aRegex.join('|') : 0);
   mRegex = (mRegex.length ? mRegex.join('|') : 0);
   tmRegex = (tmRegex.length ? tmRegex.join('|') : 0);
   ieRegex = (ieRegex.length ? ieRegex.join('|') : 0);

   function addClassToWall() {
      var path     = wgServer + '/wiki/Message_Wall:';

      if (bRegex) {
         var tmpRegex = path + bRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');

         $('.Reply')
         .filter(function() {
            return regex.test(
               $(this).children('.wds-avatar.EntityHeader_avatar__2TDnq')
               .children('a').attr('href')
            );
         })
         .addClass('bureaucrat');
      }

      if (aRegex) {
         var tmpRegex = path + aRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');

         $('.Reply')
         .filter(function() {
            return regex.test(
               $(this).children('.wds-avatar.EntityHeader_avatar__2TDnq')
               .children('a').attr('href')
            );
         })
         .addClass('admin');
      }

      if (mRegex) {
         var tmpRegex = path + mRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');

         $('.Reply')
         .filter(function() {
            return regex.test(
               $(this).children('.wds-avatar.EntityHeader_avatar__2TDnq')
               .children('a').attr('href')
            );
         })
         .addClass('moderator');
      }
      
      if (tmRegex) {
         var tmpRegex = path + tmRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');

         $('.Reply')
         .filter(function() {
            return regex.test(
               $(this).children('.wds-avatar.EntityHeader_avatar__2TDnq')
               .children('a').attr('href')
            );
         })
         .addClass('threadmoderator');
      }
      
      if (ieRegex) {
         var tmpRegex = path + ieRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');

         $('.Reply')
         .filter(function() {
            return regex.test(
               $(this).children('.wds-avatar.EntityHeader_avatar__2TDnq')
               .children('a').attr('href')
            );
         })
         .addClass('imageeditor');
      }
   }
}(bureaucrats, admins, moderators, threadmoderators, imageeditors));
});