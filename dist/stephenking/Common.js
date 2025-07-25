//Test
// Google Analytics Integration
(function() {
  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-QQBWS7FHKL';
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-QQBWS7FHKL');
})();

function initializeGTag(trackingId) {
  // Add the gtag script dynamically
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  // Initialize the gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  // Configure gtag
  gtag('js', new Date());
  gtag('config', trackingId);
}
initializeGTag('G-QQBWS7FHKL');

//MarkForDeletion Config
window.MarkForDeletion = {
    promptedDeleteReason: "This page is not needed/is vandalistic and/or spam",
    replace: true,
};

// Animation snow
if (mw.config.get('wgPageName') === 'User:Moonwatcher_x_Qibli' && mw.config.get('wgAction') !== 'edit') {
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:SnowStorm.js',
        ]
    });
}

// Enablement of Google forms on articles
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.googleforms').each(function() {
        var $this = $(this),
            id = $this.attr('data-forms-id'),
            widget = $this.attr('data-widget') || true,
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://docs.google.com/forms/d/e/' + id + '/viewform?embedded=true&hl=' + mw.config.get('wgUserLanguage'),
                css: css
            })
        );
    });
});

// Automatic daily purge of listed pages
(function DailyPurge(window, $, mw) {
    "use strict";
    /*add pages to be purged every 24 hours directly below*/
    const pagesList = [
        'Blog:Staff Blog Posts',
        'Category:Staff Blog Posts',
        'Special:Community'
    ].map(function(string) {
        return string.replaceAll(' ', '_');
    });
    if (!pagesList.includes(mw.config.get('wgPageName'))) return;

    mw.loader.using('mediawiki.api').then(function() {
        try {
            const lastPurgeTimestamp =
                mw.config.get('wgPageParseReport')
                .cachereport
                .timestamp;

            const lastPurgeTimeParts = lastPurgeTimestamp.match(/(....)(..)(..)(..)(..)(..)/);
            const lastPurgeTime = new Date(Date.UTC(
                lastPurgeTimeParts[1],
                lastPurgeTimeParts[2] - 1,
                lastPurgeTimeParts[3],
                lastPurgeTimeParts[4],
                lastPurgeTimeParts[5],
                lastPurgeTimeParts[6]
            ));

            if (Date.now() - lastPurgeTime.valueOf() <= 24 * 60 * 60 * 1000) return;

        } catch (e) {
            return;
        }

        (new mw.Api()).post({
            action: 'purge',
            titles: mw.config.get('wgPageName')
        });
    });

})(window, jQuery, mediaWiki);

// Only import these scripts for content mods and admins so we don't waste the
// bandwidth of users who can't actually use them.
if (
    mw.config.get("wgUserGroups").includes("content-moderator") ||
    mw.config.get("wgUserGroups").includes("sysop")
) {
    importArticles({
        type: "script",
        articles: [
        'u:dev:MediaWiki:WHAM/code.2.js',
        'u:dev:MediaWiki:MassCategorization/code.js',
        'u:dev:MediaWiki:ImportJSPage/code.js',
        'u:dev:MediaWiki:QuickPurge.js',
        'u:dev:MediaWiki:QQX/code.js',
        'u:dev:MediaWiki:User Admin Tools.js',
        'u:dev:MediaWiki:MassProtect/code.js',
        'u:dev:MediaWiki:MassEdit/code.js',
        'u:dev:MediaWiki:AutoCreateUserPages.js',
        'u:dev:MediaWiki:Stella.js',
        'u:dev:MediaWiki:Matrix.js',
        'u:dev:MediaWiki:Rollback/code.js',
        'u:dev:MediaWiki:ThemeToggler.js',
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
        'u:dev:MediaWiki:UserBlockNotification.js',
        'u:dev:MediaWiki:MassNullEdit/code.js',
        'u:dev:MediaWiki:UserAndIPTools.js',
        'u:dev:MediaWiki:RestoreRevButton.js',
        'u:dev:MediaWiki:AjaxBatchDelete.js',
        'u:dev:MediaWiki:MessageBlock/code.js',
        ],
    });
}

// Update S:Community
document.querySelector('.community-page-module-additional-text.no-community-manager').innerHTML = "This wiki does not have a dedicated Community Manager. However, in the absence of <a href='https://stephenking.fandom.com/wiki/Special:ListAdmins'>local administrators</a>, you can contact <a href='https://community.fandom.com/wiki/Community_Central:Staff'>Fandom Staff</a> for help by using <a href='https://support.fandom.com/hc/en-us/requests/new'>Zendesk</a> or the Fandom community with <a href='https://community.fandom.com/wiki/Discord'>Discord</a> (<a href='https://discord.com/invite/fandom'>join</a>).";