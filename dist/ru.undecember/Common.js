//Custom lib
(function($)
{
  var m = {};
  $.first = function(sel)
  {
    return $(document.querySelector(sel));
  };
  $.awaitSelector = function(sel, func)
  {
    var timerId = setTimeout(function tick()
    {
      if ($(sel).length != 0)
      {
        clearTimeout(timerId);
        func();
      } else
        {
          timerId = setTimeout(tick, 200);
        }
    }, 200);
  };
  $.fn.nstrim = function()
  {
    var val = this.val() || this.text();
    return val.trim() !== '' ? val.trim() : '';
  };
})(jQuery);
//Custom Database
//https://undecember.fandom.com/ru/wiki/Модуль:ItemDatabase?action=edit
$(function()
{
  if (mw.config.get('wgPageName') == 'Модуль:ItemDatabase' && mw.config.get('wgAction') == 'edit')
  {
  	const weui = '.wikiEditor-ui';
    $.awaitSelector(weui, function()
    {
      $(weui).before($('<div>', {'class': 'wikiEditor-ItemDatabase'}));
    });
  }
});
//AdminDashboard JS-Button
//Original: https://dev.fandom.com/wiki/MediaWiki:AdminDashboard_JS-Button/code.js
$(function()
{
  if (mw.config.get('wgCanonicalSpecialPageName') == 'AdminDashboard')
  {
    const AdminDashboardJSButton = {
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