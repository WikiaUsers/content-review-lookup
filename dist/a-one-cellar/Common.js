(function(){
  function randomizeBeam(card){
    var x = Math.round(Math.random() * 100);
    var y = -(20 + Math.round(Math.random() * 40));
    card.style.setProperty('--beam-x', x + '%');
    card.style.setProperty('--beam-y', y + '%');
  }

  function init(){
    var cards = document.querySelectorAll('.aoc-nav-card');
    cards.forEach(function(card){
      card.addEventListener('mouseenter', function(){ randomizeBeam(card); });
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();