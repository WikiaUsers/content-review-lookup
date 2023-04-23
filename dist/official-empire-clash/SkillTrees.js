var iframe = document.createElement('iframe');
iframe.width = '768';
iframe.height = '432';
iframe.src = 'https://miro.com/app/live-embed/uXjVMQAgBSQ=/?moveToViewport=-2048,-519,3433,1951&embedId=529610589428';
iframe.frameBorder = '0';
iframe.scrolling = 'no';
iframe.allow = 'fullscreen; clipboard-read; clipboard-write';

var container = document.querySelector('.civilian-tree');
container.appendChild(iframe);