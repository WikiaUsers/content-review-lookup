/* ChatIMG */
// SakuraRemake custom ver. @author SSR //
document.querySelector("body").addEventListener("DOMNodeInserted", function() {
        var message = document.querySelector("body").querySelectorAll('.message')[document.querySelector("body").querySelectorAll('.message').length - 1].querySelector('a'); 
        if (typeof message_save == 'undefined') {
            message_save = [];
        } else {
            message_save.push(message);
            if (message_save > 4) {
                message_save.shift();
            }
        }
        if (message !== null && message_save[message_save.length - 1] != message_save[message_save.length - 2]) {
            if (message.innerText.split('|').length == message.href.split('%7C').length == 1 && message.innerText && message.href.substr(location.origin.length + 6).replace(/\:/g, '%3A') != encodeURIComponent(message.innerText.replace(/\s/g, '_'))) {
            message.href += encodeURIComponent('|' + message.innerText);
            }
            var link = {
                href: message.href,
                target: message.href.substr(location.origin.length + 6)
            };
           if (/^(?:%20)*(?:File|Image|Fichier|Файл|Archivo|Datei|Plik|Выява)\:(.+)\.(?:png|gif|jpeg|tiff|jpg)(?:%20)*$/i.test(link.target.split('%7C')[0] ) ) {
               message.innerHTML = '<img src="https://images.wikia.nocookie.net/__cb1467284395/common/skins/common/images/ajax.gif" alt="' + RegExp.$1 + '" title="' + RegExp.$1 +'" width="50" height="50">';
               var image = new XMLHttpRequest();
               image.open('GET', link.href.split('%7C')[0]);
               image.send(null);
               image.addEventListener('readystatechange', function() {
                   if (image.readyState == 4 && image.status == 200) {
                       var img = image.responseText;
                       img = img.substring(img.indexOf('id="file"'), img.indexOf('</a>', img.indexOf('id="file"') ) );
                       img = img.substring(img.indexOf('src=') + 5, img.indexOf('"', img.indexOf('src=') + 5) ).replace(/&amp;/g, '&');
                       message.querySelector('img').setAttribute('src', img);
                       var alt = decodeURIComponent(link.target),
                        title = decodeURIComponent(link.target),
                        width = '175',
                        height = '175';
                       if (link.href.split('%7C').length > 1) {
                           for (var i = 0; i < link.href.split('%7C').length; i++) {
                               if (!/\d+\s*px\s*$/i.test(decodeURIComponent(link.href.split('%7C')[i]) ) ) {
                                   if (!/^\s*(center|left|right)\s*$/.test(decodeURIComponent(link.href.split('%7C')[i]) )) {
                                       alt = (decodeURIComponent(link.href.split('%7C')[i]) !== undefined) ? decodeURIComponent(link.href.split('%7C')[i]).replace(/_/g, ' ').trim() : alt;
                                   title = alt;
                                   } else {
                                        switch (RegExp.$1) {
                                            case 'left':
                                                message.querySelector('img').style.float = 'left';
                                                break;
                                            case 'right':
                                                message.querySelector('img').style.float = 'right';
                                                break;
                                            case 'center':
                                                message.style.display = 'block';
                                                message.style.textAlign = 'center';
                                                break;
                                        }
                                   }
                               } else {
                                   width = (/^(\d{1,4})\s*px$/i.test(decodeURIComponent(link.href.split('%7C')[i]).replace(/_/g, ' ').trim() ) ) ? RegExp.$1 : width;
                                   height = (parseInt(width) * 3/4);
                                   if (/^(\d{1,4})\s*x\s*(\d{1,4})\s*px$/i.test(decodeURIComponent(link.href.split('%7C')[i]).replace(/_/g, ' ').trim() ) ) {
                                       width = RegExp.$1;
                                       height = RegExp.$2;
                                   }
                               }
                           }
                       }
                       message.querySelector('img').alt = alt;
                       message.querySelector('img').title = title;
                       message.querySelector('img').width = width;
                       message.querySelector('img').height = height;
                   } else if (image.readyState == 4 && image.status == 404) {
                       if (typeof wgUserLanguage == 'undefined') {
                            wgUserLanguage = 'en';
                        }
                       switch (wgUserLanguage) {
                                case 'zh':
                               message.innerHTML = '檔案遺失';
                                break;
                                case '':
                               message.innerHTML = '';
                                break;
                            default:
                            message.innerHTML = 'Missing file';
                            break;
                       }
                       message.innerHTML = message.innerHTML.fontcolor('red');
                   } else if (image.readyState == 4) {
                       message.innerHTML = 'Hello world! I\'m the error ' + image.status + '! (something wrong has appened)'.fontcolor('red'); 
                   }
               });
           }
        }
    });