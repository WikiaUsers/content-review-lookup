/* Any JavaScript here will be loaded for all users on every page load. */
(function () {
  var myElement = document.getElementById('mw-hello-world');
  //myElement.innerHTML = '<html>Hello World!!!</html>';
  // remove any content inside tag elements named 'noscript' unless Javascript is disabled (e.g. mercury skin)
  var noscriptElements = document.getElementsByName('mw-helloworld');
  myElement.innerHTML = '<html>'+noscriptElements.length+'</html>';
  for (index = 0; index < noscriptElements.length; index++) {
      noscriptElements[index].innerHTML = '<html>Hello World by name</html>';
  }
}());