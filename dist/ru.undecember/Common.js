//Custom lib
(function($)
{
  var oM = {};
  $.first = function(aSel)
  {
    return $(document.querySelector(aSel));
  };
  $.awaitSelector = function(aSel, aFunc)
  {
    var nmTimerId = setTimeout(function tick()
    {
      if ($(aSel).length != 0)
      {
        clearTimeout(nmTimerId);
        aFunc();
      } else
        {
          nmTimerId = setTimeout(tick, 200);
        }
    }, 200);
  };
  $.fn.nstrim = function()
  {
    var sVal = this.val() || this.text();
    return sVal.trim() !== '' ? sVal.trim() : '';
  };
})(jQuery);
//Custom jQuery class
(function($)
{
  var oM = {
    'Om_convert': function(aName, aRes, aTmpData, aStatic)
    {
      if (aStatic === undefined) aStatic = false;
      var sPublicField = '',
      sPrivateField = '',
      sPublicMethod = '',
      sPrivateMethod = '',
      sTmpName = '',
      sTmpData = '',
      bPrivate = false,
      bFunction = false;
      Object.keys(aTmpData).reduce(function(_, aKey)
      {
        bPrivate = new RegExp(/^\#.+$/).test(aKey);
        bFunction = oM.Om_isFunction(aTmpData[aKey]);
        switch(oM.Om_fieldTypeSpecifier(bPrivate, bFunction))
        {
          case 'pvF': {
            sTmpData = (!aStatic ? '' : 'const ')+aKey.replace(new RegExp(/^\#(.+)$/), '$1')+' = '+aTmpData[aKey]+';';
            sPrivateField += (sPrivateField == '' ? sTmpData : '\n'+sTmpData);
          } break;
          case 'pvM': {
            sTmpName = aKey.replace(new RegExp(/^\#(.+)$/), '$1');
            sTmpData = (!aStatic ? '' : 'const ')+sTmpName+' = '+aTmpData[aKey].toString().replace(new RegExp(/^(function)\s*(\(.*\)\r*\n*\s*\{(?:\r*\n*.*){1,}\})$/), '$1 '+sTmpName+'$2')+';';
            sPrivateMethod += (sPrivateMethod == '' ? sTmpData : '\n'+sTmpData);
          } break;
          case 'pbF': {
            sTmpData = aName+(!aStatic ? '.prototype.' : '.')+aKey+' = '+aTmpData[aKey]+';';
            sPublicField += (sPublicField == '' ? sTmpData : '\n'+sTmpData);
          } break;
          case 'pbM': {
            sTmpData = aName+(!aStatic ? '.prototype.' : '.')+aKey+' = '+aTmpData[aKey].toString().replace(new RegExp(/^(function)\s*(\(.*\)\r*\n*\s*\{(?:\r*\n*.*){1,}\})$/), '$1 '+aKey+'$2')+';';
            sPublicMethod += (sPublicMethod == '' ? sTmpData : '\n'+sTmpData);
          } break;
        }
        if (!aStatic) delete aTmpData[aKey];
      }, 0);
      sTmpName = undefined;
      sTmpData = undefined;
      bPrivate = undefined;
      bFunction = undefined;
      return (!aStatic ? aRes.replace(new RegExp(/^(function\s+.+\(.*\)\r*\n*\s*\{)((?:\r*\n*.*){1,})(\})$/), '$1\n'+sPrivateField+'$2\n'+sPrivateMethod+'\n$3')+'\n'+sPublicField+'\n'+sPublicMethod : aRes+'\n(function(){\n'+sPrivateField+'\n'+sPrivateMethod+'\n'+sPublicField+'\n'+sPublicMethod+'\n})();');
    },
    'Om_fieldTypeSpecifier': function(aPrivate, aFunction)
    {
      if (aPrivate && !aFunction) return 'pvF';
      if (aPrivate && aFunction) return 'pvM';
      if (!aPrivate && !aFunction) return 'pbF';
      if (!aPrivate && aFunction) return 'pbM';
    },
    'Om_isFunction': function(aFuncName)
    {
      return Boolean(typeof aFuncName === 'function' && {}.toString.call(aFuncName) === '[object Function]');
    }
  };
  $.class = function(aName, aData)
  {
    var sRes = (aData.hasOwnProperty('constructor') ? aData.constructor.toString().replace(new RegExp(/^(function)\s*(\(.*\)\r*\n*\s*\{(?:\r*\n*.*){1,}\})$/), '$1 '+aName+'$2') : 'function '+aName+'(){}');
    var oTmpData = Object.assign({}, aData);
    if (oTmpData.hasOwnProperty('constructor')) delete oTmpData.constructor;
    if (oTmpData.hasOwnProperty('static')) delete oTmpData.static;
    if (Object.keys(oTmpData).length != 0) sRes = oM.Om_convert(aName, sRes, oTmpData);
    oTmpData = undefined;
    if (aData.hasOwnProperty('static') && Object.keys(aData.static).length != 0) sRes = oM.Om_convert(aName, sRes, aData.static, true);
    eval(sRes);
    return eval(aName);
  };
})(jQuery);
//Custom Database
//https://undecember.fandom.com/ru/wiki/Модуль:ItemDatabase?action=edit
$(function()
{
  if (mw.config.get('wgPageName') == 'Модуль:ItemDatabase' && mw.config.get('wgAction') == 'edit')
  {
    importArticle({
      type: 'script',
      article: 'u:dev:MediaWiki:Modal.js'
    });
  	var oM = {
  	  //Original: https://github.com/StuDocu/Laravel-Slug/blob/master/index.js
  	  'Om_CreateAlias': function(aTxt, aOpt)
      {
        var s = String(aTxt),
        opt = Object(aOpt),
        defaults = {
          'delimiter': '-',
          'limit': undefined,
          'lowercase': true,
          'replacements': {},
          'transliterate': true,
        };
        for (var aKey in defaults)
        {
          if (!opt.hasOwnProperty(aKey)) opt[aKey] = defaults[aKey];
        }
        var char_map = {
          'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C',
          'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
          'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ő': 'O',
          'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ű': 'U', 'Ý': 'Y', 'Þ': 'TH',
          'ß': 'ss',
          'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c',
          'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
          'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ő': 'o',
          'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u', 'ý': 'y', 'þ': 'th',
          'ÿ': 'y',
          '©': '(c)',
          'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': '8',
          'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': '3', 'Ο': 'O', 'Π': 'P',
          'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W',
          'Ά': 'A', 'Έ': 'E', 'Ί': 'I', 'Ό': 'O', 'Ύ': 'Y', 'Ή': 'H', 'Ώ': 'W', 'Ϊ': 'I',
          'Ϋ': 'Y',
          'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': '8',
          'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3', 'ο': 'o', 'π': 'p',
          'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'x', 'ψ': 'ps', 'ω': 'w',
          'ά': 'a', 'έ': 'e', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ή': 'h', 'ώ': 'w', 'ς': 's',
          'ϊ': 'i', 'ΰ': 'y', 'ϋ': 'y', 'ΐ': 'i',
          'Ş': 'S', 'İ': 'I', 'Ç': 'C', 'Ü': 'U', 'Ö': 'O', 'Ğ': 'G',
          'ş': 's', 'ı': 'i', 'ç': 'c', 'ü': 'u', 'ö': 'o', 'ğ': 'g',
          'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
          'З': 'Z', 'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
          'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C',
          'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
          'Я': 'Ya',
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
          'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
          'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
          'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
          'я': 'ya',
          'Є': 'Ye', 'І': 'I', 'Ї': 'Yi', 'Ґ': 'G',
          'є': 'ye', 'і': 'i', 'ї': 'yi', 'ґ': 'g',
          'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T', 'Ů': 'U',
          'Ž': 'Z',
          'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u',
          'ž': 'z',
          'Ą': 'A', 'Ć': 'C', 'Ę': 'e', 'Ł': 'L', 'Ń': 'N', 'Ó': 'o', 'Ś': 'S', 'Ź': 'Z',
          'Ż': 'Z',
          'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z',
          'ż': 'z',
          'Ā': 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'i', 'Ķ': 'k', 'Ļ': 'L', 'Ņ': 'N',
          'Š': 'S', 'Ū': 'u', 'Ž': 'Z',
          'ā': 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l', 'ņ': 'n',
          'š': 's', 'ū': 'u', 'ž': 'z',
        };
        for (var aKey in opt.replacements)
        {
          s = s.replace(RegExp(aKey, 'g'), opt.replacements[aKey]);
        }
        if (opt.transliterate)
        {
          for (var aKey in char_map)
          {
            s = s.replace(RegExp(aKey, 'g'), char_map[aKey]);
          }
        }
        s = s.replace(RegExp('[^a-z0-9]+', 'ig'), opt.delimiter).replace(RegExp('[' + opt.delimiter + ']{2,}', 'g'), opt.delimiter).substring(0, opt.limit).replace(RegExp('(^' + opt.delimiter + '|' + opt.delimiter + '$)', 'g'), '');
        return (opt.lowercase ? s.toLowerCase() : s);
      },
  	  'Om_LuaToObj' : function(aLua)
  	  {
        var sJSON = aLua.replace(/(\r\n|\n|\r)/gm, '').replace(/\s*\"\s*/gm, '"').replace(/local\sdata\s*\=\s*(.+)\s*return\sdata/gm, '$1').replace(/(\s*\=\s*)/gm, ':').replace(/\{(\s*\"\S+\"\,*)\s*\}/gm, '[$1]').replace(/(\{|\,)(\s*)([^"0-9]\S+)(\:)/gm, '$1"$3"$4');
        return oM.Om_jsonToObj(sJSON);
  	  },
  	  'Om_ObjToLua': function(aObj)
  	  {
  	    return 'local data = '+JSON.stringify(aObj).replace(/(\s*\:\s*)/gm, ' = ')+'\n\nreturn data\n';
  	  },
  	  'Om_jsonToObj': function (aJSON)
      {
        return new Function('return ['+aJSON+'];')()[0];
      }
  	};
    $.awaitSelector('.wikiEditor-ui', function()
    {
      $('.wikiEditor-ui').before($('<div>', {'class': 'wikiEditor-ItemDatabase'}));
      var sLua = ($('.mw-editfont-default').nstrim() != '' ? $('.mw-editfont-default').nstrim() : 'local data = {\n}\n\nreturn data\n'),
      oTable = oM.Om_LuaToObj(sLua);
      if (Object.keys(oTable).length == 0)
      {
      	$('.wikiEditor-ItemDatabase').append($('<button>',
      	{
      	  'type': 'button',
      	  'class': 'fline f-jc-cnt f-ai-cnt no-select wikiEditor-ItemButton wikiEditor-AddColButton',
      	  'text': 'Добавить колонку'
      	}));
        var modal = new window.dev.modal.Modal({
          id: 'AddColButtonModal',
          title: 'Создание',
          content: '<label for="wikiEditor-AddColInput">Введите название колонки</label><input type="text" id="wikiEditor-AddColInput" class="wikiEditor-ItemInput">'
        });
        modal.create();
        $('#AddColButtonModal .oo-ui-window-foot .oo-ui-processDialog-actions-other').addClass('f-jc-cnt').append($('<button>',
      	{
      	  'type': 'button',
      	  'class': 'fline f-jc-cnt f-ai-cnt no-select wikiEditor-ItemButton wikiEditor-AddColSaveButton',
      	  'text': 'Сохранить'
      	}));
        $('.wikiEditor-AddColButton').on('click', function()
        {
          modal.show();
        });
        $('.wikiEditor-AddColSaveButton').on('click', function()
        {
          var sInputText = $('#wikiEditor-AddColInput').nstrim(),
          sAlias = oM.Om_CreateAlias(sInputText);
          oTable[sAlias] = {'_name': sInputText};
          console.log(oTable);
          console.log(JSON.stringify(oTable));
          //$('.mw-editfont-default').textSelection('setContents', oM.Om_ObjToLua(oTable));
          //modal.close();
        });
      } else
        {
          //Кнопка "Добавить колонку" + выгрузить уже добавленное в таблицу
        }
    });
  }
});
//AdminDashboard JS-Button
//Original: https://dev.fandom.com/wiki/MediaWiki:AdminDashboard_JS-Button/code.js
$(function()
{
  if (mw.config.get('wgCanonicalSpecialPageName') == 'AdminDashboard')
  {
    var AdminDashboardJSButton = {
      init: function(i18n)
      {
        this.$control = $('<li>',
        {
          'class': 'control',
          'data-tooltip': i18n.msg('tooltip').plain()
        }).append($('<a>',
           {
             'class': 'set',
             'href': mw.util.getUrl('MediaWiki:Common.js')
           }).append($('<span>',
              {
                'class': 'representation AdminDashboardJSButton'
              }).append($('<span>',
                 {
                   'aria-disabled': false,
                   'class': 'oo-ui-widget oo-ui-widget-enabled oo-ui-iconElement-icon oo-ui-icon-code oo-ui-iconElement oo-ui-labelElement-invisible oo-ui-iconWidget'
                 })), i18n.msg('text').plain())).hover($.proxy(this.hover, this), $.proxy(this.unhover, this));
        $('.control a[data-tracking="special-css"]').parent().after(this.$control);
        this.$tooltip = $('.control-section.wiki > header > .dashboard-tooltip');
      },
      hover: function(e)
      {
        this.$tooltip.text(this.$control.data('tooltip'));
      },
      unhover: function(e)
      {
        this.$tooltip.text('');
      },
      hook: function(i18n)
      {
        i18n.loadMessages('AdminDashboard_JS-Button').then($.proxy(this.init, this));
      }
    };
    mw.hook('dev.i18n').add($.proxy(AdminDashboardJSButton.hook, AdminDashboardJSButton));
    importArticle({
      type: 'script',
      article: 'u:dev:MediaWiki:I18n-js/code.js'
    },
    {
      type: 'style',
      article: 'u:dev:MediaWiki:AdminDashboardJSButton.css'
    });
  }
});