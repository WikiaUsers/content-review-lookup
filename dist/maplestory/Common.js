//INACTIVETAG
InactiveUsers = { 
    months: 1
};

// Embed YouTube thumbnails for videos using Template:YouTube.

document.querySelectorAll('.youtube-embed-image').forEach(function(element) {
  var id = element.getAttribute('data-id');
  // Check it is a valid YouTube ID
  if (/^[a-zA-Z0-9_-]{11}$/g.test(id)) {
    var img = document.createElement('img');
    img.src = 'https://img.youtube.com/vi/' + id + '/mqdefault.jpg';
    element.appendChild(img);
  }
});