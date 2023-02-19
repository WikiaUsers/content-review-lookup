/* Add wobbly text animation to a specific class */

mw.loader.using(['jquery.ui'], function() {
  var wobblyText = function() {
    $('.wobbly-text').css({
      'font-size': '48px',
      'font-weight': 'bold',
      'animation': 'wobble 1s infinite'
    });
  };
  mw.hook('wikipage.content').add(wobblyText);
});

/* Define the wobble animation */

mw.util.addCSS('@keyframes wobble { 0% { transform: rotate(0deg); } 15% { transform: rotate(-5deg); } 30% { transform: rotate(5deg); } 45% { transform: rotate(-5deg); } 60% { transform: rotate(5deg); } 75% { transform: rotate(-5deg); } 90% { transform: rotate(5deg); } 100% { transform: rotate(0deg); } }');