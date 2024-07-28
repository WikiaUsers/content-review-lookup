document.addEventListener('DOMContentLoaded', function() {
  var hoverbox = document.getElementById('hoverbox');
  if (hoverbox) {
    hoverbox.addEventListener('mouseover', function() {
      document.getElementById('image1').classList.add('hidden');
      document.getElementById('image2').classList.remove('hidden');
    });

    hoverbox.addEventListener('mouseout', function() {
      // Do nothing on mouse out to keep the second image visible
    });
  }
});