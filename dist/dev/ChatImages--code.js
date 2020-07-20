/**
 * ChatImages
 * @version 2.2
 * @author [[User:Houmgaor]]
 **/
var cImg = {
    // Here are the translations, when updated, please add +0.1 to the version (above)
    trans: {
        // Please add your language code with the translation
        miss: {
            be : 'Файл не знойдзены',
            en : 'File not found',
            es : 'Archivo no encontrado',
            fr : 'Fichier introuvable',
            ja : 'そのファイルは存在しません',
            pl : 'Plik nie istnieje',
            'pt-br' : 'Arquivo não encontrado',
            ru : 'Файл не найден',
            tr : 'Dosya bulunamadı',
            uk : 'Файл не знайдено',
            zh : '未找到文件',
            'zh-hans' : '未找到文件',
            'zh-hant' : '未找到檔案',
            'zh-hk' : '未找到檔案',
            'zh-tw' : '未找到檔案',
        },
        //  File name in different language
        file : ['File', 'Image', 'Fichier', 'Файл', 'Archivo', 'Datei', 'Plik', 'Dosya', 'Выява', 'ファイル']
    },

    main: function (m) {
        // Tries to find and load a file
        cImg.elt = {};
        var i, a = $(m).children('a');
        // We check if we know a translation for errors in either wiki's language, if not, we add the 'File' namespace correctly translated
        if (typeof(wgContentLanguage) == "undefined")
            wgContentLanguage = mw.config.get("wgContentLanguage");
        if (cImg.trans.miss[wgContentLanguage] === undefined) {
            // We add the "file" namespace to the list
            cImg.trans.file.push(mw.Title.newFromText( 'Random', mw.config.get( 'wgNamespaceIds' ).file ).getNamespacePrefix().replace(/:$/, ''));
            // We avoid to repeat this operation more than once, please note that it is independant from the users's language
            cImg.trans.miss[wgContentLanguage] = '';
        }
        for (i = 0; i < a.length; i++) {
            cImg.elt.href = decodeURIComponent(a[i].href)
                            .replace(location.origin + '/wiki/', '');
            if (!a[i].innerText.includes('|')&& !cImg.elt.href.endsWith(a[i].innerText) )
                cImg.elt.href += '|' + a[i].innerText;
            // We try to determine if the link contains an image or an audio 
            if (!(new RegExp('^\\s*(?:' 
            + cImg.trans.file.join('|') + ')\\s*:\\s*([^\\|\\.]+)\\.(' 
            + cImg.img.concat(cImg.aud).join('|') + ')\\s*', 'i'))
            .test(cImg.elt.href) ) 
                return;
            cImg.elt.alt = RegExp.$1;
            cImg.elt.ext = RegExp.$2;
            cImg.elt.title = 'File:' + cImg.elt.alt + '.' + cImg.elt.ext;
            // We split the URI to get all the image informations
            cImg.elt.href.split('|').forEach(cImg.proceed_url);
            cImg.a = a[i];
            // We ask for the file URL on his page
            $.ajax({
                url: '/api.php',
                type: 'GET',
                data : {
                    action: 'query',
                    titles: cImg.elt.title,
                    prop: 'imageinfo',
                    iiprop: 'url',
                    format: 'json'
                },
                success: cImg.proceed_response
            });
        }
    },

    proceed_url: function (item, i) {
        //  In href parts, tries to find meaningfull parts
        if (i === 0) {
            return;
        } else if (cImg.pos.includes(item)) {
            cImg.elt.pos = item;
        } else if (/^\s*title\s*=\s*(.+)\s*$/i.test(item)) {
            cImg.elt.title = RegExp.$1;
        } else if (/^\s*(\d{1,3})\s*(px)?\s*$/i.test(item)) {
            cImg.elt.width = cImg.elt.height = RegExp.$1;
        } else if (/^\s*(\d{1,3})\s*x\s*(\d{1,3})\s*(px)?\s*$/i.test(item)) {
            cImg.elt.width = RegExp.$1;
            cImg.elt.height = RegExp.$2;
        } else if (/^\s*link\s*=\s*(.+)\s*/i.test(item) ) {
            // We avoid to modify the original list while proceeding it
            if (i + 1 == cImg.elt.href.split('|').length) {
                cImg.elt.href = RegExp.$1;
            } else
                cImg.elt.href += '|link=' + RegExp.$1;
        } else {
            cImg.elt.alt = cImg.elt.title = item;            
        }
    },
     
    proceed_response: function (r) {
        // Proceeds the response from the server
        var j, f;
        for (j in r.query.pages) break;
        if (j == '-1') {
            // If the file dos not exist
            f = document.createElement('span');
            f.style.color = 'red';
            if (cImg.trans.miss[wgUserLanguage]) {
                f.innerText = cImg.trans.miss[wgUserLanguage];
            } else 
                f.innerText = (cImg.trans.miss.en + ', your language "' 
                + wgUserLanguage + '" is not referenced yet.\
You can add it at https://dev.wikia.com/wiki/ChatImages');
        } 
        else {
            // If the file exists
            cImg.elt.src = r.query.pages[j].imageinfo['0'].url;
            f = document.createElement(cImg.img.includes(cImg.elt.ext) ? 'img' : 'audio');
            ['width', 'height', 'title', 'alt', 'src'].forEach(function (item) {
                if (cImg.elt[item]) f[item] = cImg.elt[item];
            });
            switch (cImg.elt.pos) {
                case 'left' :
                case 'right' :
                    f.style.float = cImg.elt.pos;
                    break;
                case 'center' :
                    cImg.a.style.display = 'block';
                    cImg.a.style.textAlign = 'center';
                    break;          
            }
            if (cImg.aud.includes(cImg.elt.ext) ) {
                f.setAttribute('controls', '');
                f.setAttribute('type', 'audio/' + cImg.elt.ext);
                f.innerHTML = "Your browser does not support the <code>audio</code> element.";
            }
        }
        cImg.a.href = mw.util.getUrl(cImg.elt.href.split('|')[0]);
        cImg.a.innerHTML = f.outerHTML;
    },
    
    // Useful varibales
    pos: ['left', 'center', 'right'],
    img: ['png', 'gif', 'jpg', 'jpeg', 'ico', 'svg'],
    aud: ['ogg', 'ogv', 'oga']
};

window.mainRoom.socket.bind('chat:add', function() {
    // Try to fin a file in last message sent
    cImg.main($('#WikiaPage .Chat ul li:last-child .message')[0]);
});

$('#WikiaPage .Chat ul li').click(function (tar) {
    // Ties to find an image in clicked element
    cImg.main(tar.currentTarget.querySelector('.message'));
});