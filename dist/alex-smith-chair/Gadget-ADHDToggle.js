$(function() {
  // list of your videos
  const vids = [
    "https://www.youtube.com/embed/7ghSziUQnhs?autoplay=1&mute=1&loop=1&playlist=7ghSziUQnhs",
    "https://www.youtube.com/embed/u7kdVe8q5zs?autoplay=1&mute=1&loop=1&playlist=u7kdVe8q5zs"
  ];
  const vid = vids[Math.floor(Math.random() * vids.length)];

  // create container
  const box = $('<div>')
    .css({
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      width: '300px',
      height: '180px',
      zIndex: 9999,
      textAlign: 'center',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '12px',
      padding: '6px',
      backdropFilter: 'blur(5px)'
    })
    .append('<div style="color:white;font-weight:bold;margin-bottom:4px;">for ADHD readers</div>')
    .append(`<iframe width="280" height="157" src="${vid}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);

  $('body').append(box);
});