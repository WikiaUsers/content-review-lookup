/* Disable redirect to MyHome (code by Ciencia Al Poder) */
if( skin == 'monaco' && wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'MyHome' && window.location.toString().indexOf('redirect=no') == -1 ) {
	window.location = wgServer + wgArticlePath.replace('$1',(window.wgMainpage||window.wgMainPageTitle));
}

function alterMyHomeLink(link) {
   if (link != null && link != undefined)
   {
      if (link.href.indexOf('/wiki/Special:MyHome') > -1)
      {
         link.href = link.href + "?redirect=no";
      }
   }
}

function replaceMyHomeLinks() {
   var MyHomeButtons;
   var MyHomeTab;
   var MyHomeWidget = document.getElementById("community-widget-action-button");
   alterMyHomeLink(MyHomeWidget);

   var myHomeDiv = document.getElementById("header_myhome");
   if(typeof myHomeDiv!="undefined") {
      var MyHomeHeader = document.getElementById("header_myhome").getElementsByTagName("a")[0];
      
      alterMyHomeLink(MyHomeHeader);

      if (wgNamespaceNumber == -1 && wgCanonicalSpecialPageName == 'MyHome') {
//         MyHomeButtons = document.getElementById("myhome-feed-switch").getElementsByTagName("a")[0];
//         alterMyHomeLink(MyHomeButtons);
      }
      if (wgNamespaceNumber == 2 || wgNamespaceNumber == 3 || wgNamespaceNumber == 500 || wgCanonicalSpecialPageName == 'Contributions') {
         MyHomeTab = document.getElementById("user_masthead_tabs").getElementsByTagName("li")[0].getElementsByTagName("a")[0];
         alterMyHomeLink(MyHomeTab);
      }
   }
}

if (skin == 'monaco' && wgUserName != null) {
  addOnloadHook (replaceMyHomeLinks);
}
/* Admin Dashboard JS button, adapted from https://dev.fandom.com/wiki/AdminDashboard_JS-Button except removes the feature from when you press it automatically makes you edit*/
(function($, mw) {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' ||
        window.AdminDashboardJSButtonLoaded
    ) {
        return;
    }
    window.AdminDashboardJSButtonLoaded = true;
    var AdminDashboardJSButton = {
        init: function(i18n) {
            console.log(i18n);
            this.$control = $('<li>', {
                'class': 'control',
                'data-tooltip': i18n.msg('tooltip').plain()
            }).append(
                $('<a>', {
                    'class': 'set',
                    href: mw.util.getUrl('MediaWiki:Common.js')
                }).append(
                    $('<span>', {
                        'class': 'representation AdminDashboardJSButton'
                    }).append(
                        $('<span>', {
                            text: 'JS_'
                        })
                    ),
                    i18n.msg('text').plain()
                )
            ).hover(this.hover.bind(this), this.unhover.bind(this));
            $('.control a[data-tracking="special-css"]').parent().after(this.$control);
            this.$tooltip = $('.control-section.wiki > header > .dashboard-tooltip');
        },
        hover: function(e) {
            this.$tooltip.text(this.$control.data('tooltip'));
        },
        unhover: function(e) {
            this.$tooltip.text('');
        },
        hook: function(i18n) {
            i18n.loadMessages('AdminDashboard_JS-Button')
                .then(this.init.bind(this));
        }
    };
    mw.hook('dev.i18n').add(AdminDashboardJSButton.hook.bind(AdminDashboardJSButton));
    importArticles(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:AdminDashboardJSButton.css'
        }
    );
})(window.jQuery, window.mediaWiki);