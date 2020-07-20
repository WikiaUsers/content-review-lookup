self.addEventListener('message', function(e) {
  self.postMessage(JSON.stringify(e));
}, false);