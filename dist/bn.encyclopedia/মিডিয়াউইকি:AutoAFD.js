//<pre>

//Auto AFD script

//Please include the two following lines
//Modified version of AutoVFD script to work with AFD
//Script Modified by User:Jtkiefer
//Further modified to work with [[WP:AFDC]] by [[User:ais523]]


// This needs to change depending on skin used.
function add_link(url, name)
{
  var na = document.createElement('a');
  na.setAttribute('href', url);
  na.appendChild(document.createTextNode(name));

  var li = document.createElement('li');
  li.appendChild(na);

  var tabs = document.getElementById('p-cactions').getElementsByTagName('ul')[0];
  tabs.appendChild(li);
}

function strip_namespace(target)
{
  var colon = target.indexOf(':');
  if (colon != -1)
    {
      var spaces = new Array('User', 'Wikipedia', 'Image', 'MediaWiki', 'Template', 'Help', 'Category');
      var ns = target.substring(0, colon);
      if (ns == '' || ns == 'Talk')
        return target.substring(colon + 1);
      else
        for (var i = 0; i < spaces.length; ++i)
          {
            if (ns == spaces[i]
                || ns == spaces[i] + '_talk')
              return target.substring(colon + 1);
          }
    }

  return target;
}

function afd()
{
  document.editform.wpTextbox1.value = '{{' + 'subst:afd}}\n' + document.editform.wpTextbox1.value;
  document.editform.wpSummary.value = 'afd';

  var target = document.editform.action;
  target = target.substring(target.indexOf('title=') + 6,
                            target.lastIndexOf('&action=submit'));

  var months = new Array('জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর');
  var date = new Date();
  date = date.getUTCFullYear() + '_' + months[date.getUTCMonth()];

  var pagename = strip_namespace(target);

  window.open('/w/index.php?title=উইকিপিডিয়া:নিবন্ধ_অপসারণের_প্রস্তাবনা/' + pagename + '&action=edit&fakeaction=afdsub&faketarget=' + target,
              'Afd ' + unescape(target),
              'status,toolbar,location,menubar,directories,resizeable,scrollbars');
  window.open('/w/index.php?title=উইকিপিডিয়া:নিবন্ধ_অপসারণের_প্রস্তাবনা/' + date + '&action=edit&fakeaction=afdlist&faketarget=' + pagename,
              'AfdLog ' + unescape(target),
              'status,toolbar,location,menubar,directories,resizeable,scrollbars');
}

function autoafd()
{
  if (document.title.indexOf('Editing ') == 0)
    {
      var action = '';
      var target = '';
      if (location.search)
        {
          var l = location.search.substring(1).split('&');
          for (var i = 0; i < l.length; ++i)
            {
              var eq = l[i].indexOf('=');
              var name = l[i].substring(0, eq);
              if (name == 'fakeaction')
                action = l[i].substring(eq + 1);
              else if (name == 'faketarget')
                target = unescape(l[i].substring(eq + 1)).replace(/_/g, ' ');
            }
        }

      if (action == 'afdlist')
        {
          document.editform.wpTextbox1.value += '{{' + 'উইকিপিডিয়া:নিবন্ধ অপসারণের প্রস্তাবনা/' + target + '}}\n';
          document.editform.wpSummary.value = '[[উইকিপিডিয়া:নিবন্ধ অপসারণের প্রস্তাবনা/' + target + ']]';
        }
      else if (action == 'afdsub')
        {
          if (document.editform.wpTextbox1.value.length > 0)
            {
              target = document.editform.action;
              target = unescape(target.substring(target.indexOf('title=') + 6, target.lastIndexOf('&action=submit'))).replace(/_/g, ' ');
              window.alert("There's an old afd at the default location already.\n\n" +
                           'Please either move it out of the way (and update existing links to it), or file the Afd by hand in another location (যেমন [[' + target + ' (২)]])।');
            }
          else
            document.editform.wpTextbox1.value += '===[[' + target + ']]===\n' +
              '{{'+'REMOVE THIS TEMPLATE WHEN '+'CLOSING THIS AfD|>>এখানে বিষয়শ্রেণী যোগ করুন<<}}\n'+
              ':{{la|' + target + '}} – <includeonly>([[উইকিপিডিয়া:নিবন্ধ অপসারণের প্রস্তাবনা/' + target + '|অপসারণের প্রস্তাবনা দেখুন]])</includeonly>\n'+
              'মনোনয়ন করার কারণ। ~~' + '~~\n*\n*\n*\n';
        }
      else
        add_link('javascript:afd()', 'Afd');
    }
}

addOnloadHook(autoafd);

//</pre>

// <noinclude>[[Category:Wikipedia scripts]]</noinclude>