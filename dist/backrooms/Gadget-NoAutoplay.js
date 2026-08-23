const autopause = setInterval(() => $('audio').get().forEach(e => e.pause()), 4);
setTimeout(() => clearInterval(autopause), 5000);