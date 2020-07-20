function timeStamp_Usernames_js() {
   return "2018.06.22 11:20 (UTC+3)";
}

var bureaucrats = [
   'FaceBound',
];

var admins = [
   'Simon_Pikalov',
   'Kofirs2634',
];

var moderators = [
   '1',
];
   
var threadmoderators = [
   '2',
];

(function (bureaucrats, admins, moderators, threadmoderators, imageeditors) {
   if (!bureaucrats.length && !admins.length && !moderators.length && !threadmoderators.length && !imageeditors.length) return;
   if ('view' !== ($.getUrlVar('action') || 'view')) return;

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

      if (mRegex) {
         var regex = new RegExp('^(?:' + mRegex + ')$', 'i');

         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).attr('data-user')
            );
         }).addClass('moderator');
      }
      
      if (tmRegex) {
         var regex = new RegExp('^(?:' + tmRegex + ')$', 'i');

         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).attr('data-user')
            );
         }).addClass('threadmoderator');
      }
      
      if (ieRegex) {
         var regex = new RegExp('^(?:' + ieRegex + ')$', 'i');

         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).attr('data-user')
            );
         }).addClass('imageeditor');
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

      if (mRegex) {
         var tmpRegex = path + mRegex.split('|').join('|' + path);
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
      
      if (tmRegex) {
         var tmpRegex = path + tmRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');

         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).children('.speech-bubble-avatar')
               .children('a').attr('href')
            );
         })
         .addClass('threadmoderator');
      }
      
      if (ieRegex) {
         var tmpRegex = path + ieRegex.split('|').join('|' + path);
         var regex    = new RegExp('^(?:' + tmpRegex + ')$', 'i');

         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).children('.speech-bubble-avatar')
               .children('a').attr('href')
            );
         })
         .addClass('imageeditor');
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

      if (mRegex) {
         var regex = new RegExp('(?:' + mRegex + ')(?:/|$)', 'i');

         if (regex.test(wgTitle))
            $('.masthead-avatar').addClass('moderator');
      }
      
      if (tmRegex) {
         var regex = new RegExp('(?:' + tmRegex + ')(?:/|$)', 'i');

         if (regex.test(wgTitle))
            $('.masthead-avatar').addClass('threadmoderator');
      }
      
      if (ieRegex) {
         var regex = new RegExp('(?:' + ieRegex + ')(?:/|$)', 'i');

         if (regex.test(wgTitle))
            $('.masthead-avatar').addClass('imageeditor');
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

      if (mRegex) {
         var regexes = mRegex.split('|');
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
      
      if (tmRegex) {
         var regexes = tmRegex.split('|');
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
         .addClass('threadmoderator');
      }
      
      if (ieRegex) {
         var regexes = ieRegex.split('|');
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
         .addClass('imageeditor');
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
 
}(bureaucrats, admins, moderators, threadmoderators, imageeditors));

function UserNameReplace() {
   // Allow individual users to disable it globally if desired
   if ((typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace) || wgUserName == null)
      return;

   // Change this to true to enable restrictions on USERNAME template
   var enableUsernameReplaceControls = true;

   // If we haven't enabled restrictions, just change them all
   if (!enableUsernameReplaceControls) {
      $('span.insertusername').html(wgUserName);
      return;
   }

   // Check for use in restricted areas
   $('span.insertusername').each(function(index) {
      // Assume it is okay to replace unless we specifically find a reason not to
      var failed = false;

      // Page comments
      if (wgCanonicalNamespace === '') {
         try {
            var testElem = parentWithProperty($(this).get(0), 'class', 'WikiaArticle article-comm-text', 'elements')[0];
            testElem     = parentWithProperty(testElem, 'class', 'speech-bubble-message', 'elements');
            testElem     = testElem[testElem.length - 1].parentNode.childNodes[1];

            if (testElem.tagName === 'DIV' && hasClass(testElem, 'speech-bubble-avatar')) {
               var anchor = testElem.childNodes[1];

               if (anchor.tagName === 'A' && anchor.href.length > 0) {
                  if (anchor.href.search('/wiki/User:') > -1)
                     var userName = anchor.href.split('/wiki/User:')[1];
                  else
                     var userName = anchor.href.split('/wiki/Message_Wall:')[1];

                  if (userName && !userNameAuthorized(userName))
                     failed = true;
               }
            }
         }
         catch(e) {
            // Default to allowing it
            failed = false;
         }
      }

      // Message wall and forum posts
      if (wgCanonicalNamespace === 'Message_Wall' ||
          wgCanonicalNamespace === 'Thread') {
         try {
            // Sub-messages have one more level to traverse
            var testElem = parentWithProperty($(this).get(0), 'class', 'speech-bubble-message', 'elements')[0];
            testElem = testElem.parentNode;

            if (hasClass(testElem, 'message-1'))
               var liIdx = 0;
            else
               var liIdx = 1;

            testElem = parentWithProperty($(this).get(0), 'tagname', 'li', 'elements')[liIdx];
            testElem = testElem.childNodes[1];

            if (testElem.tagName === 'DIV' && hasClass(testElem, 'speech-bubble-avatar')) {
               var anchor = testElem.childNodes[1];

               if (anchor.tagName === 'A' && anchor.href.length > 0) {
                  if (anchor.href.search('/wiki/User:') > -1)
                     var userName = anchor.href.split('/wiki/User:')[1];
                  else
                     var userName = anchor.href.split('/wiki/Message_Wall:')[1];

                  if (userName && !userNameAuthorized(userName))
                     failed = true;
               }
            }
         }
         catch(e) {
            // Default to allowing it
            failed = false;
         }
      }

      // If we haven't previously failed the authorization, make the substitution
      if (!failed)
         $(this).html(wgUserName);
   });

   function userNameAuthorized(name) {
      // Add any non-privileged users here
      var auth = [
         'ClashOfClansOfficial',
      ];

      // Privileged users (defined above) automatically added
      auth = auth.concat(bureaucrats, admins, moderators, threadmoderators, imageeditors);

      return (auth.indexOf(name) !== -1);
   }
}

addOnloadHook(UserNameReplace);

function parentWithProperty(element, strProperty, strTest, strReturnValue) {
   if (typeof(element) !== 'object' || !strProperty || !strTest) {
      switch (strReturnValue) {
         case 'count':
            return count;
         case 'element':
            return (found ? parent : null);
         default:
            return found;
      }
   }

   var parent = element.parentNode;
   var found  = false;
   var count  = 0;
   var elems  = [];

   while (parent !== null && !found) {
      var test = false;

      if (strProperty.tolower === 'name')
         test = (typeof(parent.name) !== 'undefined' && parent.name === strTest);
      else if (strProperty === 'class') {
         var classes = strTest.split(' ');
         test = true; // Set this just so our initial test won't auto-fail

         for (var i = 0; i < classes.length; i ++)
            test = (test && hasClass(parent, classes[i]));
      }
      else if (strProperty === 'id')
         test = (typeof(parent.id) !== 'undefined' && parent.id === strTest);
      else if (strProperty === 'tagname')
         test = (typeof(parent.tagName) !== 'undefined' &&
            parent.tagName.toLowerCase() === strTest.toLowerCase());

      if (test) {
         if (strReturnValue === 'count' || strReturnValue === 'elements') {
            count ++;
            elems.unshift(parent);
         }
         else
            found = true;
      }

      parent = parent.parentNode;
   }

   switch (strReturnValue) {
      case 'count':
         return count;
      case 'elements':
         return elems;
      default:
         return found;
   }
}