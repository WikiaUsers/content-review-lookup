function toggleObjectVisibility(objectId) {
  var styleObject = document.getElementById(objectId);
  if (styleObject) {
    if (styleObject.style.display == 'block') {
      styleObject.style.display = "none";
    } else {
      styleObject.style.display = "block";
    }
  }
  return false;
}