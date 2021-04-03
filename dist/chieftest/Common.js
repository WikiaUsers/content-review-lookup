/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
var button = document.querySelectorAll("button")[0];
button.addEventListener('click', function() {
  if (button.getAttribute("data-text-swap") == button.innerHTML) {
    button.innerHTML = button.getAttribute("data-text-original");
  } else {
    button.setAttribute("data-text-original", button.innerHTML);
    button.innerHTML = button.getAttribute("data-text-swap");
  }
}, false);
 
//var bureaucrats = [
  //'Spottra'
  //];
 
//var admins = [
   //'Tparry'
//];
 
//var moderators = [
//   'Stan890',
//];
 
var founder = [
   'ChiefDrewClash',
];
 
(function (bureaucrats, admins, moderators, founder) {
   if (!bureaucrats.length && !admins.length && !moderators.length && !founder.length) return;
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
 
   for (var i = 0; i < founder.length; i ++)
      bRegex.push(founder[i].replace(/[\[\]{}()*+?.,\\^$|#\s-]/g, "\\$&"));
 
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
 
      if (bRegex) {
         var regex = new RegExp('^(?:' + bRegex + ')$', 'i');
 
         $('ul.comments li')
         .filter(function() {
            return regex.test(
               $(this).attr('data-user')
            );
         }).addClass('founder');
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
         .addClass('founder');
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
 
    if (bRegex) {
         var regex = new RegExp('(?:' + bRegex + ')(?:/|$)', 'i');
 
         if (regex.test(wgTitle))
            $('.masthead-avatar').addClass('founder');
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
         .addClass('founder');
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
 
}(bureaucrats, admins, moderators, founder));
 
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
            var testElem = parentWithProperty($(this).get(0), 'tagname', 'blockquote', 'elements')[0];
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
 
 
 
      // Privileged users (defined above) automatically added
 
       // Add any non-privileged users here
      var auth = [
         'ASDF',
      ];
 
      auth = auth.concat(bureaucrats, admins, moderators, founder);
 
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
 
// Most heroic wiki user
$.get("/wiki/Most_Heroic_Contributors?action=raw").done(function(data) {
    var tbl;
 
    if (data.substr(0, 1) !== '\n')
        data = '\n' + data;
 
    arrTbl = data.split('\n{|');
    arrTbl.shift();
 
    for (var i = 0; i < arrTbl.length; i ++) {
        arrTbl[i] = arrTbl[i].split('\n|}')[0];
 
        if (arrTbl[i].search('id="most-heroic-contributors"') >= 0) {
            tbl = arrTbl[i];
            break;
        }
    }
 
    if (typeof tbl === 'undefined')
        return;
 
    arrTbl = tbl.split('\n|-');
 
    if (arrTbl[0].substr(0, 1) !== '|' && arrTbl[0].substr(0, 1) !== '!') {
        var idx  = arrTbl[0].search('\\|');
        var idx2 = arrTbl[0].search('!');
 
        if (idx < 0 || (idx2 >= 0 && idx2 < idx))
            idx = idx2;
 
        arrTbl[0] = arrTbl[0].substr(idx);
    }
 
    arrTbl[0] = ('\n' + arrTbl[0]).split('\n!');
    arrTbl[0].shift();
 
    for (var i = 0; i < arrTbl[0].length; i ++)
        arrTbl[0][i] = arrTbl[0][i].trim();
 
    for (var i = 1; i < arrTbl.length; i ++) {
        arrTbl[i] = arrTbl[i].split('\n|');
        arrTbl[i].shift();
 
        if (arrTbl[i].length != arrTbl[0].length)
            return;
 
        for (var j = 0; j < arrTbl[i].length; j ++)
            arrTbl[i][j] = arrTbl[i][j].trim();
    }
 
    var recipient = arrTbl[0].indexOf('Recipient');
    var period    = arrTbl[0].indexOf('Period');
 
    if (recipient < 0 || period < 0)
        return;
 
    var pageName = wgPageName.replace(/ /g, '_');
    var link = '[[' + pageName + '|' + pageName.split(':')[1] + ']]';
    link = link.replace('Message_Wall:', 'User:');
 
    for (var i = 1; i < arrTbl.length; i ++) {
        if (arrTbl[i][recipient].replace(/ /g, '_') === link)
            addMostHeroicWikiUser(arrTbl[i][period]);
 
        var tmp      = arrTbl[i][recipient].split(/\[\[|\]\]/);
        var username = [];
 
        for (var j = 0; j < tmp.length; j ++) {
            if (tmp[j].length > 0)
                username.push(tmp[j]);
        }
 
        if (username.length > 1)
            continue;
 
        try {
            var usr  = username[0].split('User:')[1].split('|')[0];
 
            if (i === 1)
                createFlameElement(usr.replace(/ /g, '_'));
 
            var tags = window.UserTagsJS.modules.custom[usr];
 
            if (Array.isArray(tags)) {
               if (tags.indexOf('heroicuser') < 0)
                  tags.push('heroicuser');
            }
            else
               window.UserTagsJS.modules.custom[usr] = ['heroicuser'];
        }
        catch(e) {}
    }
});
 
function addMostHeroicWikiUser(period) {
    var rail = document.getElementById('WikiaRail');
 
    var box  = document.createElement('div');
    var upperbox = document.createElement('div');
    box.appendChild(upperbox);
 
    var color1 = '#edeae1';
    var color2 = '#cdc8b5';
 
    $(box).css({
        'position': 'relative',
        'width': '290px',
        'height': '180px',
        'margin-left': '5px',
        'margin-bottom': '10px',
        'border-top': '2px solid #fff',
        'border-radius': '20px',
        'background-color': color1,
        'background': color1,
        'background': '-moz-linear-gradient(top, ' + color1 + ' 0%, ' + color2 + ' 100%)',
        'background': '-webkit-gradient(linear, left top, left bottom, color-stop(0%, ' + color1 + '), color-stop(100%, ' + color2 + '))',
        'background': '-webkit-linear-gradient(top, ' + color1 + ' 0%, ' + color2 + ' 100%)',
        'background': '-o-linear-gradient(top, ' + color1 + ' 0%, ' + color2 + ' 100%)',
        'background': '-ms-linear-gradient(top, ' + color1 + ' 0%, ' + color2 + ' 100%)',
        'background': 'linear-gradient(to bottom, ' + color1 + ' 0%, ' + color2 + ' 100%)',
        'text-align': 'center',
        'box-shadow': 
            '0 5px 2px 3px rgba(158, 158, 158, 0.4), ' +
            '0 3px 5px #B7B6B6, ' +
            '0 0 0 2px #BBB7AE, ' +
            'inset 0 -3px 1px 2px rgba(186, 178, 165, 0.5), ' +
            'inset 0 3px 1px 2px rgba(246, 245, 241, 0.3)',
    });
 
    var imgCenter = document.createElement('img');
//    imgCenter.src = 'http://img2.wikia.nocookie.net/__cb20140527054106/clashofclans/images/4/47/GorillaMan.png';
    imgCenter.src = 'http://img1.wikia.nocookie.net/__cb20131130030326/clashofclans/images/5/55/Clash_logo.png';
    box.appendChild(imgCenter);
 
    $(imgCenter).css({
        'position': 'absolute',
        'width': '150px',
        'left': '70px',
        'top': '3px',
    });
 
    var imgCenter2 = document.createElement('img');
    imgCenter2.src = 'http://img2.wikia.nocookie.net/__cb20140703180154/clashofclans/images/b/bc/Wiki.png';
    box.appendChild(imgCenter2);
 
    $(imgCenter2).css({
        'position': 'absolute',
        'width': '70px',
        'left': '110px',
        'top': '70px',
    });
 
    var imgLeft = document.createElement('img');
    imgLeft.src = 'http://img4.wikia.nocookie.net/__cb20140527060656/clashofclans/images/0/0e/Wizard_6.png';
    box.appendChild(imgLeft);
 
    $(imgLeft).css({
        'position': 'absolute',
        'width': '76px',
        'left': '8px',
        'top': '10px',
    });
 
    var imgRight = document.createElement('img');
    imgRight.src = 'http://img4.wikia.nocookie.net/__cb20140527060656/clashofclans/images/0/0e/Wizard_6.png';
    box.appendChild(imgRight);
 
    $(imgRight).css({
        'position': 'absolute',
        'width': '76px',
        'right': '8px',
        'top': '10px',
        '-webkit-transform': 'scaleX(-1)',
        '-moz-transform': 'scaleX(-1)',
        'transform': 'scaleX(-1)',
    });
 
    var lowerbox = document.createElement('div');
    box.appendChild(lowerbox);
 
    var upperp = document.createElement('p');
    upperp.innerHTML = 'Most Heroic Wiki Contributor';
    lowerbox.appendChild(upperp);
 
    var lowerp = document.createElement('p');
    lowerp.innerHTML = period;
    lowerbox.appendChild(lowerp);
 
    $(lowerbox).css({
        'position': 'relative',
        'text-align': 'center',
        'font-family': 'ClashofClans, Verdana, Arial, Helvetica, sans-serif',
        'font-weight': 'bold',
        'padding': '1px',
    });
 
    $(upperp).css({
        'position': 'absolute',
        'top': '5px',
        'width': '90%',
        'left': '5%',
        'color': 'white',
        'font-size': '16px',
        'text-shadow': '0px 4px #000, 2px 3px #000, -2px 3px #000, 2px 2px #000, -2px -2px #000, 2px -2px #000, -2px 2px #000'
    });
 
    $(lowerp).css({
        'font-family': 'Lobster',
        'font-size': '24px',
        'margin-top': '55px'
    });
 
    $(upperbox).css({
        'position': 'relative',
        'top': '5%',
        'height': '50%',
    });
 
    rail.insertBefore(box, rail.getElementsByClassName('AchievementsModule')[0]);
}
 
// 'Heroic contributor' - enclose in <span class="suppress"> to prevent icon from appearing
function createFlameElement(username) {
   var sheet = (function() {
      var style = document.createElement("style");
      style.appendChild(document.createTextNode(""));
      document.head.appendChild(style);
      return style.sheet;
   })();
 
   var selector1 = 
     'a[href$="/wiki/User_blog:'             + username + '"]:not(.extiw):not(.external):not(.subtle)::before,' +
     'a[href$="/wiki/Special:Contributions/' + username + '"]:not(.extiw):not(.external):not(.subtle)::before,' +
     'a[href$="/wiki/User:'                  + username + '"]:not(.extiw):not(.external):not(.subtle)::before,' +
     'a[href$="/wiki/Message_Wall:'          + username + '"]:not(.extiw):not(.external):not(.subtle)::before';
 
   addCSSRule(sheet, selector1, 'content: url("http://img1.wikia.nocookie.net/__cb20140523183558/clashofclans/images/thumb/a/ae/Fireball.png/8px-Fireball.png")');
 
   var selector2 = 
      '.suppress a[href$="/wiki/User_blog:'             + username +
         '"]:not(.extiw):not(.external):not(.subtle)::before,' +
      '.suppress a[href$="/wiki/Special:Contributions/' + username +
         '"]:not(.extiw):not(.external):not(.subtle)::before,' +
      '.suppress a[href$="/wiki/User:'                  + username +
         '"]:not(.extiw):not(.external):not(.subtle)::before,' +
      '.suppress a[href$="/wiki/Message_Wall:'          + username +
         '"]:not(.extiw):not(.external):not(.subtle)::before,' +
      '.speech-bubble-avatar a[href$="/wiki/User_blog:'             + username +
         '"]:not(.extiw):not(.external):not(.subtle)::before,' +
      '.speech-bubble-avatar a[href$="/wiki/Special:Contributions/' + username +
         '"]:not(.extiw):not(.external):not(.subtle)::before,' +
      '.speech-bubble-avatar a[href$="/wiki/User:'                  + username +
         '"]:not(.extiw):not(.external):not(.subtle)::before,' +
      '.speech-bubble-avatar a[href$="/wiki/Message_Wall:'          + username +
         '"]:not(.extiw):not(.external):not(.subtle)::before';
 
   addCSSRule(sheet, selector2, 'display: none;');
}
 
function addCSSRule(sheet, selector, rules, index) {
   if (sheet.insertRule)
      sheet.insertRule(selector + "{" + rules + "}", index);
   else
      sheet.addRule(selector, rules, index);
}