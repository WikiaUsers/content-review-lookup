/* ===== Pokédex Opening Intro (with robust scroll unlock) ===== */
window.RLQ = window.RLQ || [];
window.RLQ.push(function () {

  function unlock(){
    document.body.classList.remove('pdx-lock');
  }

  function lock(){
    document.body.classList.add('pdx-lock');
  }

  function hide(el){
    if (!el) return;

    /*
     * Remove the animation state first.
     * Then immediately remove the element from the page so
     * the covers cannot reset to their closed position onscreen.
     */
    el.classList.remove('is-playing','is-visible');
    el.setAttribute('aria-hidden','true');
    el.style.display = 'none';

    unlock();
  }

  function play(el){

    if (!el) return;

    /*
     * Make sure the intro starts from its original state.
     */
    el.classList.remove('is-playing','is-visible');
    el.setAttribute('aria-hidden','false');
    el.style.display = 'none';

    /*
     * Force a layout refresh so the animation always starts
     * from the beginning.
     */
    void el.offsetWidth;

    /*
     * Show the intro.
     */
    el.style.display = 'flex';
    el.classList.add('is-visible');
    lock();

    /*
     * Start the opening animation on the next frame.
     */
    requestAnimationFrame(function(){
      el.classList.add('is-playing');
    });

    var finished = false;

    function finish(){
      if (finished) return;
      finished = true;

      /*
       * Completely hide the intro once the animation is finished.
       */
      hide(el);
    }

    /*
     * The overlay fade is the final animation.
     */
    function onEnd(e){
      if (e.animationName === 'pdx-overlay-fade'){
        el.removeEventListener('animationend', onEnd);
        finish();
      }
    }

    el.addEventListener('animationend', onEnd);

    /*
     * Safety fallback.
     *
     * Animation timing:
     * 0.15s delay
     * 1.10s door animation
     * 1.25s overlay fade delay
     * 0.35s overlay fade
     *
     * Total ≈ 1.60 seconds.
     */
    setTimeout(function(){
      finish();
    }, 1800);

    /*
     * Skip button.
     */
    var skip = el.querySelector('.pdx-skip');

    if (skip){

      skip.addEventListener('click', function(){
        finish();
      });

      skip.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          finish();
        }
      });
    }

    /*
     * Escape key.
     */
    function onEsc(e){
      if (e.key === 'Escape'){
        finish();
        window.removeEventListener('keydown', onEsc);
      }
    }

    window.addEventListener('keydown', onEsc);
  }

  function init(root){

    unlock();

    var el = (root || document).querySelector('#pokedex-intro');

    if (!el) return;

    /*
     * Prevent the same intro from being initialized twice
     * during the same page render.
     */
    if (el.dataset.pdxInit === '1') return;

    el.dataset.pdxInit = '1';

    /*
     * Always play once when the Main Page loads.
     */
    play(el);
  }

  /*
   * Initial page load.
   */
  init(document);

  /*
   * Fandom page navigation / SPA renders.
   */
  if (mw && mw.hook){
    mw.hook('wikipage.content').add(function($content){

      unlock();

      var node = $content && (
        $content.get ? $content.get(0) : $content[0]
      );

      init(node || document);
    });
  }

  /*
   * Extra safety.
   */
  document.addEventListener('visibilitychange', function(){
    unlock();
  });

  window.addEventListener('beforeunload', function(){
    unlock();
  });

});