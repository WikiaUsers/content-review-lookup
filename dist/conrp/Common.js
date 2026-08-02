function loadConRPStats() {
  fetch('https://conrp-stats-bot-production.up.railway.app/api/stats')
    .then(res => res.json())
    .then(data => {
      const discordEl = document.getElementById('conrp-discord-stats');
      const youtubeEl = document.getElementById('conrp-youtube-stats');

      // Optional extra spans — only populated if you've added them to the
      // infobox. Nothing breaks if they don't exist yet.
      const viewsEl = document.getElementById('conrp-youtube-views');
      const videosEl = document.getElementById('conrp-youtube-videos');

      if (discordEl) {
        if (data.discord.humans !== null && data.discord.humansOnline !== null) {
          discordEl.textContent = data.discord.humansOnline + ' online / ' + data.discord.humans + ' total';
        } else {
          // Fallback if DISCORD_HUMAN_ROLE_ID isn't set on the bot yet.
          discordEl.textContent = data.discord.online + ' online / ' + data.discord.total + ' total';
        }
      }

      if (youtubeEl) {
        youtubeEl.textContent = data.youtube.subscribers + ' subscribers';
      }

      if (viewsEl) {
        viewsEl.textContent = Number(data.youtube.views).toLocaleString('en-US') + ' views';
      }

      if (videosEl) {
        videosEl.textContent = data.youtube.videos + ' videos';
      }
    })
    .catch(err => console.error('ConRP stats fetch failed:', err));
}

if (
  document.getElementById('conrp-discord-stats') ||
  document.getElementById('conrp-youtube-stats') ||
  document.getElementById('conrp-youtube-views') ||
  document.getElementById('conrp-youtube-videos')
) {
  loadConRPStats();
  setInterval(loadConRPStats, 10 * 60 * 1000); // refresh every 10 minutes, matching the API's cache
}

/* =========================================================
   CONQUEST OF NATIONS — Auto Flag Icons
   Adds a small flag before every link to a country's page,
   anywhere on the wiki, except on that country's own page.
   Paste into MediaWiki:Common.js
   ========================================================= */

(function () {
  // Every known name a country might be linked by — formal titles,
  // informal short names, and any redirect-likely variants. Multiple
  // keys can point to the same flag file; that's intentional.
  var COUNTRY_FLAGS = {
    'Byzantium': 'Flag-vizantii-2-1.png',

    'Antland': 'Antland.jpeg',
    'Confederacy of Antland': 'Antland.jpeg',

    'Bristovia': 'Bristovia.png',
    'Republic of Bristovia': 'Bristovia.png',

    'Lenonadia': 'Lenonadia flag - Hissy.png',
    "Foxes' Republic of Lenonadia": 'Lenonadia flag - Hissy.png',

    'Midgegi': 'Midgegi.png',
    'Smol Thingey Midgegi': 'Midgegi.png',

    'Vroitsia': 'CoaMaker 39 28.png',
    'Military Workers State of Vroitsia': 'CoaMaker 39 28.png',

    "O'kasis": "O'kasis flag.png",
    "Kingdom of O'kasis": "O'kasis flag.png",

    'Mugla': 'RepublicofMugla.png',
    'Muğla': 'RepublicofMugla.png',
    'Republic of Muğla': 'RepublicofMugla.png',

    'Pulukalia': 'Image0.jpg',
    'Republic of Pulukalia': 'Image0.jpg',

    'Regnum': 'Regnum.png',

    'Arabia': 'Arabia.png',
    'Kingdom of Arabia': 'Arabia.png',

    'New Francia': 'Newfrancia.webp',
    "The Workers' Republic of New Francia": 'Newfrancia.webp',

    'Angrania': 'Angrania.webp',
    'The Democratic Republic of Angrania': 'Angrania.webp',

    'Oushinam': 'Oushinam.png',

    'Hundsburg': 'Hundsburg.png',
    'Archduchy Of Hundsburg': 'Hundsburg.png',
    'Archduchy of Hundsburg': 'Hundsburg.png',

    'Fłøßħ': 'Flag of Fłøßħ.png',

    'Naton': 'Naton.png',

    'Ogadan': 'Ogadouflag.png',
    'Ogadou': 'Ogadouflag.png',
    'State of Ogadan': 'Ogadouflag.png',

    'ATMB': 'ATMB.webp',
    'Agarthan Triplemogus Matcha-Blackrock': 'ATMB.webp',

    'Choclat': 'Untitled175_20260722123516.png',

    'Snail': 'Snailflag.webp',
    'Republic of Snail': 'Snailflag.webp'
  };

  function normalizeTitle(rawTitle) {
    try {
      return decodeURIComponent(rawTitle).replace(/_/g, ' ');
    } catch (e) {
      return rawTitle.replace(/_/g, ' ');
    }
  }

  function getPageTitleFromHref(href) {
    // Matches both /wiki/Page_Title and /wiki/Page_Title?query
    var match = href.match(/\/wiki\/([^?#]+)/);
    if (!match) {
      return null;
    }
    return normalizeTitle(match[1]);
  }

  function run() {
    var content = document.querySelector('.mw-parser-output');
    if (!content) {
      return;
    }

    var currentPageTitle = normalizeTitle(mw.config.get('wgPageName'));
    var links = content.querySelectorAll('a[href*="/wiki/"]');

    // First pass: find which links need a flag, and which filenames
    // we'll need to resolve to real image URLs.
    var linksNeedingFlags = [];
    var neededFiles = {};

    links.forEach(function (link) {
      var linkedTitle = getPageTitleFromHref(link.getAttribute('href'));
      if (!linkedTitle) {
        return;
      }

      var flagFile = COUNTRY_FLAGS[linkedTitle];
      if (!flagFile) {
        return;
      }

      // Exception: don't add a flag next to self-references on the
      // country's own page.
      if (linkedTitle === currentPageTitle) {
        return;
      }

      // Skip links already preceded by a flag we've inserted (in case
      // this ever runs more than once on the same page).
      if (link.previousSibling && link.previousSibling.classList &&
          link.previousSibling.classList.contains('conrp-flag-icon')) {
        return;
      }

      linksNeedingFlags.push({ link: link, file: flagFile });
      neededFiles[flagFile] = true;
    });

    if (linksNeedingFlags.length === 0) {
      return;
    }

    var fileTitles = Object.keys(neededFiles).map(function (name) {
      return 'File:' + name;
    });

    var apiUrl = mw.config.get('wgServer') + mw.config.get('wgScriptPath') +
      '/api.php?action=query&prop=imageinfo&iiprop=url&format=json&origin=*&titles=' +
      encodeURIComponent(fileTitles.join('|'));

    fetch(apiUrl)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var resolvedUrls = {};
        var pages = data.query && data.query.pages;
        if (!pages) {
          return;
        }

        Object.keys(pages).forEach(function (pageId) {
          var page = pages[pageId];
          var title = page.title.replace(/^File:/, '');
          if (page.imageinfo && page.imageinfo[0]) {
            resolvedUrls[title] = page.imageinfo[0].url;
          }
        });

        linksNeedingFlags.forEach(function (entry) {
          var url = resolvedUrls[entry.file];
          if (!url) {
            return; // File couldn't be resolved — skip rather than break the page.
          }

          var img = document.createElement('img');
          img.src = url;
          img.className = 'conrp-flag-icon';
          img.alt = '';
          img.style.height = '1.1em';
          img.style.width = 'auto';
          img.style.marginRight = '3px';
          img.style.verticalAlign = '-0.15em';
          img.style.borderRadius = '2px';
          img.style.display = 'inline-block';

          entry.link.parentNode.insertBefore(img, entry.link);
        });
      })
      .catch(function (err) {
        console.error('ConRP flag icons: could not resolve flag images', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();