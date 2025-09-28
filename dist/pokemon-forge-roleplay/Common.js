/* ===== Pokédex Opening Intro (with robust scroll unlock) ===== */
window.RLQ = window.RLQ || [];
window.RLQ.push(function () {
  var KEY = 'pokedexIntroPlayed';

  function get(k){ try{ return sessionStorage.getItem(k); }catch(e){ return null; } }
  function set(k,v){ try{ sessionStorage.setItem(k,v); }catch(e){} }

  function unlock(){ document.body.classList.remove('pdx-lock'); }
  function lock(){ document.body.classList.add('pdx-lock'); }

  function hide(el, persist){
    el.classList.remove('is-playing','is-visible');
    el.setAttribute('aria-hidden','true');
    unlock();                             // <-- always unlock here
    if (persist) set(KEY,'1');
  }

  function play(el, force){
    // Anti-flash
    el.style.display = 'flex';
    el.classList.add('is-visible');
    lock();

    // Kick animations next frame
    requestAnimationFrame(function(){ el.classList.add('is-playing'); });

    var done = false;
    function finish(persist){
      if (done) return;
      done = true;
      hide(el, persist);
    }

    // End on overlay fade
    function onEnd(e){
      if (e.animationName === 'pdx-overlay-fade'){
        el.removeEventListener('animationend', onEnd);
        finish(!force); // persist unless forced
      }
    }
    el.addEventListener('animationend', onEnd);

    // Safety: force unlock even if animationend never fires
    setTimeout(function(){ finish(!force); }, 3000);

    // Skip + ESC
    var skip = el.querySelector('.pdx-skip');
    if (skip) skip.addEventListener('click', function(){ finish(true); });
    function onEsc(e){ if (e.key === 'Escape'){ finish(true); window.removeEventListener('keydown', onEsc); } }
    window.addEventListener('keydown', onEsc);
  }

  function init(root){
    // Belt-and-suspenders: ALWAYS unlock when a new page render starts
    unlock();

    var el = (root || document).querySelector('#pokedex-intro');
    if (!el) return;                        // template not on this page
    if (el.dataset.pdxInit === '1') return;
    el.dataset.pdxInit = '1';

    var force = (location.hash || '').indexOf('forceIntro') !== -1;
    if (!force && get(KEY) === '1') return; // once per session

    play(el, force);
  }

  // Run on initial render + SPA navigations; also unlock before init each time
  if (mw && mw.hook){
    mw.hook('wikipage.content').add(function ($content) {
      unlock();  // in case prior page left it locked
      var node = $content && ($content.get ? $content.get(0) : $content[0]);
      init(node || document);
    });
  }
  // Also try once on load
  init(document);

  // Extra safety: unlock on visibility changes or beforeunload
  document.addEventListener('visibilitychange', unlock);
  window.addEventListener('beforeunload', unlock);
});