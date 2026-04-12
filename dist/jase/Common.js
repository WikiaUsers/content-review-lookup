/* ============================================================
   Luma Video Launcher for jase.fandom.com
   Player: https://luma-player-bxli8v2u1-fandom-projects.vercel.app
   API:    https://luma-2qw8yyhic-fandom-projects.vercel.app
   ============================================================ */

// ── Page-specific rail injection ─────────────────────────────
if (mw.config.get('wgPageName') === 'Video_Overlay_Test_Page') {
  mw.hook('wikipage.content').add(function ($content) {
    var rail = document.createElement('div');
    rail.setAttribute('data-luma-game', 'valorant');
    rail.setAttribute('data-luma-tags', 'clutch,ace');
    rail.setAttribute('data-luma-limit', '4');

    $content.find('h2').each(function () {
      if ($(this).text().indexOf('Highlight Clips') !== -1) {
        $(this).after(rail);
      }
    });
  });
}

// ── Luma Launcher IIFE ───────────────────────────────────────
(function () {
  'use strict';

  var PLAYER_BASE = 'https://luma-player-bxli8v2u1-fandom-projects.vercel.app';
  var API_BASE    = 'https://luma-2qw8yyhic-fandom-projects.vercel.app';

  // ── State ──────────────────────────────────────────────────
  var overlayContainer = null;
  var hoverPreview     = null;
  var hoverTimeout     = null;

  // ── Utilities ──────────────────────────────────────────────
  function formatDuration(ms) {
    var totalSec = Math.round(ms / 1000);
    var min = Math.floor(totalSec / 60);
    var sec = totalSec % 60;
    return min + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function fetchVideos(params) {
    var qs = [];
    if (params.tags)  qs.push('tags='  + encodeURIComponent(params.tags));
    if (params.game)  qs.push('game='  + encodeURIComponent(params.game));
    if (params.limit) qs.push('limit=' + encodeURIComponent(params.limit));
    var url = API_BASE + '/v1/overwolf/videos' + (qs.length ? '?' + qs.join('&') : '');
    return fetch(url).then(function (r) { return r.json(); });
  }

  // ── Overlay ────────────────────────────────────────────────
  function openOverlay(video) {
    if (overlayContainer) closeOverlay();

    var params = new URLSearchParams();
    params.set('src', video.srcUrl || video.src || '');
    if (video.title)                        params.set('title',    video.title);
    if (video.game)                         params.set('game',     video.game);
    if (video.playerName || video.player)   params.set('player',   video.playerName || video.player);
    if (video.durationMs || video.duration) params.set('duration', String(video.durationMs || video.duration));
    if (video.posterUrl  || video.poster)   params.set('poster',   video.posterUrl  || video.poster);
    params.set('theme', 'wiki');

    var iframeSrc = PLAYER_BASE + '/overlay?' + params.toString();

    overlayContainer = document.createElement('div');
    overlayContainer.className = 'luma-overlay-container';
    overlayContainer.innerHTML =
      '<div class="luma-overlay-scrim"></div>' +
      '<iframe class="luma-overlay-iframe" src="' + iframeSrc + '" ' +
        'allow="autoplay; fullscreen; picture-in-picture" ' +
        'allowfullscreen frameborder="0"></iframe>';

    document.body.appendChild(overlayContainer);
    document.body.style.overflow = 'hidden';

    overlayContainer.querySelector('.luma-overlay-scrim')
      .addEventListener('click', closeOverlay);

    requestAnimationFrame(function () {
      overlayContainer.classList.add('luma-overlay-visible');
    });
  }

  function closeOverlay() {
    if (!overlayContainer) return;
    overlayContainer.classList.remove('luma-overlay-visible');
    overlayContainer.classList.add('luma-overlay-exiting');
    var container = overlayContainer;
    overlayContainer = null;
    document.body.style.overflow = '';
    setTimeout(function () {
      if (container.parentNode) container.parentNode.removeChild(container);
    }, 300);
  }

  window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'luma:overlay-close') closeOverlay();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlayContainer) closeOverlay();
  });

  // ── Video Cards ────────────────────────────────────────────
  function renderCard(video) {
    var card = document.createElement('button');
    card.className = 'luma-card';
    card.type = 'button';

    var posterHtml = video.posterUrl
      ? '<img class="luma-card-poster" src="' + video.posterUrl + '" alt="" loading="lazy" />'
      : '<div class="luma-card-poster luma-card-poster--placeholder"></div>';

    card.innerHTML =
      '<div class="luma-card-media">' +
        posterHtml +
        '<span class="luma-card-duration">' + formatDuration(video.durationMs) + '</span>' +
        '<div class="luma-card-play-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></div>' +
      '</div>' +
      '<div class="luma-card-meta">' +
        '<span class="luma-card-title">' + video.title + '</span>' +
        '<span class="luma-card-info">' +
          '<span class="luma-card-player">' + (video.playerName || '') + '</span>' +
          '<span class="luma-card-game">'   + (video.game || '')       + '</span>' +
        '</span>' +
      '</div>';

    card.addEventListener('click', function () { openOverlay(video); });
    return card;
  }

  function populateRails() {
    var rails = document.querySelectorAll('[data-luma-game], [data-luma-tags]');
    for (var i = 0; i < rails.length; i++) {
      (function (rail) {
        if (rail.getAttribute('data-luma-loaded')) return;
        rail.setAttribute('data-luma-loaded', '1');

        fetchVideos({
          game:  rail.getAttribute('data-luma-game')  || '',
          tags:  rail.getAttribute('data-luma-tags')  || '',
          limit: rail.getAttribute('data-luma-limit') || '6',
        }).then(function (response) {
          var videos = (response && response.data) || [];
          if (!videos.length) return;
          var grid = document.createElement('div');
          grid.className = 'luma-card-grid';
          for (var j = 0; j < videos.length; j++) grid.appendChild(renderCard(videos[j]));
          rail.appendChild(grid);
        }).catch(function (err) {
          console.warn('[LumaLauncher] fetch failed:', err);
        });
      })(rails[i]);
    }
  }

  // ── Direct Triggers ────────────────────────────────────────
  function bindTriggers() {
    var triggers = document.querySelectorAll('[data-luma-video][data-luma-src]');
    for (var i = 0; i < triggers.length; i++) {
      (function (el) {
        if (el.getAttribute('data-luma-bound')) return;
        el.setAttribute('data-luma-bound', '1');
        el.style.cursor = 'pointer';
        el.addEventListener('click', function (e) {
          e.preventDefault();
          openOverlay({
            srcUrl:     el.getAttribute('data-luma-src')      || '',
            title:      el.getAttribute('data-luma-title')    || '',
            game:       el.getAttribute('data-luma-game')     || '',
            playerName: el.getAttribute('data-luma-player')   || '',
            durationMs: parseInt(el.getAttribute('data-luma-duration') || '0', 10),
            posterUrl:  el.getAttribute('data-luma-poster')   || null,
          });
        });
      })(triggers[i]);
    }
  }

  // ── Hover Previews ─────────────────────────────────────────
  function createHoverPreview() {
    if (hoverPreview) return hoverPreview;
    hoverPreview = document.createElement('div');
    hoverPreview.className = 'luma-hover-preview';
    hoverPreview.style.display = 'none';
    document.body.appendChild(hoverPreview);
    return hoverPreview;
  }

  function showHoverPreview(el, video) {
    var preview = createHoverPreview();
    var rect = el.getBoundingClientRect();

    preview.innerHTML =
      (video.posterUrl
        ? '<img class="luma-hover-poster" src="' + video.posterUrl + '" alt="" />'
        : '<div class="luma-hover-poster luma-hover-poster--placeholder"></div>') +
      '<div class="luma-hover-info">' +
        '<span class="luma-hover-title">'  + (video.title || '')  + '</span>' +
        '<span class="luma-hover-detail">' +
          (video.game      ? '<span class="luma-hover-game">'     + video.game                    + '</span>' : '') +
          (video.durationMs ? '<span class="luma-hover-duration">' + formatDuration(video.durationMs) + '</span>' : '') +
        '</span>' +
      '</div>';

    preview.style.display = '';
    preview.style.top  = (rect.top + window.scrollY - preview.offsetHeight - 8) + 'px';
    preview.style.left = Math.max(8, rect.left + (rect.width / 2) - (preview.offsetWidth / 2)) + 'px';
  }

  function hideHoverPreview() {
    if (hoverPreview) hoverPreview.style.display = 'none';
  }

  function bindHoverPreviews() {
    var hovers = document.querySelectorAll('[data-luma-hover]');
    for (var i = 0; i < hovers.length; i++) {
      (function (el) {
        if (el.getAttribute('data-luma-hover-bound')) return;
        el.setAttribute('data-luma-hover-bound', '1');

        var cachedVideo = null;

        el.addEventListener('mouseenter', function () {
          clearTimeout(hoverTimeout);

          if (el.getAttribute('data-luma-hover-src') || el.getAttribute('data-luma-hover-title')) {
            cachedVideo = {
              srcUrl:     el.getAttribute('data-luma-hover-src')      || '',
              title:      el.getAttribute('data-luma-hover-title')    || '',
              game:       el.getAttribute('data-luma-hover-game')     || '',
              durationMs: parseInt(el.getAttribute('data-luma-hover-duration') || '0', 10),
              posterUrl:  el.getAttribute('data-luma-hover-poster')   || null,
            };
            showHoverPreview(el, cachedVideo);
            return;
          }

          if (cachedVideo) { showHoverPreview(el, cachedVideo); return; }

          var tags = el.getAttribute('data-luma-hover-tags') || '';
          var game = el.getAttribute('data-luma-hover-game') || '';
          if (!tags && !game) return;

          fetchVideos({ tags: tags, game: game, limit: '1' }).then(function (response) {
            var videos = (response && response.data) || [];
            if (videos.length) { cachedVideo = videos[0]; showHoverPreview(el, cachedVideo); }
          });
        });

        el.addEventListener('mouseleave', function () {
          hoverTimeout = setTimeout(hideHoverPreview, 150);
        });

        el.addEventListener('click', function (e) {
          if (!cachedVideo || !cachedVideo.srcUrl) return;
          e.preventDefault();
          openOverlay(cachedVideo);
        });
      })(hovers[i]);
    }
  }

  // ── Init ───────────────────────────────────────────────────
  function init() {
    populateRails();
    bindTriggers();
    bindHoverPreviews();
  }

  // ── Public API ─────────────────────────────────────────────
  window.LumaLauncher = {
    open:           function (video)              { openOverlay(video); },
    close:          function ()                   { closeOverlay(); },
    fetchAndRender: function (container, params)  {
      return fetchVideos(params).then(function (response) {
        var videos = (response && response.data) || [];
        var grid = document.createElement('div');
        grid.className = 'luma-card-grid';
        for (var j = 0; j < videos.length; j++) grid.appendChild(renderCard(videos[j]));
        container.appendChild(grid);
        return videos;
      });
    },
    init: init,
  };

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run init when MediaWiki finishes rendering page content
  mw.hook('wikipage.content').add(function () { init(); });

})();