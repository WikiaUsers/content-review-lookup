(function(mw, $, mainRoom, config){
    function ChatImages(){
        this.pos = ['left', 'center', 'right'];
        this.img = ['png', 'gif', 'jpg', 'jpeg', 'ico', 'svg'];
        this.audio = ['ogg', 'ogv', 'oga', 'mp3'];
        this.video = ['mp4', 'wmv', 'flv', 'avi', 'webm', 'gifv'];
        this.sizeLimit = config.sizeLimit || 400;
        this.i18n = {
            notFound: {
                be: 'Файл не знойдзены',
                en: 'File not found',
                es: 'Archivo no encontrado',
                fr: 'Fichier introuvable',
                ja: 'そのファイルは存在しません',
                pl: 'Plik nie istnieje',
                'pt-br': 'Arquivo não encontrado',
                ru: 'Файл не найден',
                uk: 'Файл не знайдено'
            },
            file: ['File', 'Image', 'Fichier', 'Файл', 'Archivo', 'Datei', 'Plik', 'Выява', 'ファイル']
        };
    }
 
    ChatImages.prototype.main = function($el){
        this.imgObj = {};
        var i = 0, a = $($el).children('a');
        for (i; i < a.length; i++){
            this.imgObj.link = decodeURIComponent(a[i].href)
                .replace(location.origin + '/wiki/', '');
            if (
                !(a[i].innerText.includes('|'))
                && this.imgObj.link.endsWith(a[i].innerText)
            ){
                this.imgObj.link += '|' + a[i].innerText;
            }
            var pattern = new RegExp('^\\s*(?:' + this.i18n.file.join('|') + ')\\s*:\\s*([^\\|\\.]+)\\.(' + this.img.concat(this.audio).concat(this.video).join('|') + ')\\s*', 'i');
            if (!pattern.test(this.imgObj.link)) return;
            var attrs = pattern.exec(this.imgObj.link);
            this.imgObj.alt = attrs[1];
            this.imgObj.ext = attrs[2];
            this.imgObj.title = 'File:' + this.imgObj.alt + '.' + this.imgObj.ext;
            this.imgObj.link.split('|').forEach($.proxy(this.processURL, this));
            this.a = a[i];
            var api = new mw.Api();
            api.get({
                action: 'query',
                titles: this.imgObj.title,
                prop: 'imageinfo',
                iiprop: 'url',
                format: 'json'
            }).done($.proxy(this.processResponse, this));
        }
    };
 
    ChatImages.prototype.processURL = function(item, index){
        var patterns = [
            /^\s*title\s*=\s*(.+)\s*$/i,
            /^\s*(\d{1,3})\s*(px)?\s*$/i,
            /^\s*(\d{1,3})\s*x\s*(\d{1,3})\s*(px)?\s*$/i,
            /^\s*link\s*=\s*(.+)\s*/i
        ];
        if (index === 0) return;
        else if (this.pos.includes(item)){
            this.imgObj.pos = item;
        } else if (patterns[0].test(item)){
            this.imgObj.title = patterns[0].exec(item)[1];
        } else if (patterns[1].test(item)){
            ['width', 'height'].forEach($.proxy(function(elem){
                var size = Number(patterns[1].exec(item)[1]);
                if (size > this.sizeLimit) size = this.sizeLimit;
                this.imgObj[elem] = patterns[1].exec(item)[1];
            }, this));
        } else if (patterns[2].test(item)){
            var sizes = [patterns[2].exec(item)[1], patterns[2].exec(item)[2]];
            sizes = sizes.map($.proxy(function(size){
                size = Number(size);
                if (size > this.sizeLimit) size = this.sizeLimit;
                return size;
            }, this));
            this.width = sizes[0];
            this.height = sizes[1];
        } else if (patterns[3].test(item)){
            if (i + 1 == this.imgObj.link.split('|').length){
                this.imgObj.link = patterns[2].exec(item)[1];
            } else {
                this.imgObj.link = '|link=' + patterns[2].exec(item)[1];
            }
        } else {
            ['alt', 'title'].forEach($.proxy(function(elem){
                this.imgObj[elem] = item;
            }, this));
        }
    };
 
    ChatImages.prototype.processResponse = function(response){
        var pageIndex, $elem,
            lang = mw.config.get('wgUserLanguage');
        for (pageIndex in response.query.pages) break;
        if (pageIndex === '-1'){
            $elem = $('<span />');
            $elem.css('color', 'red');
            if (this.i18n.notFound[lang]){
                $elem.text(this.i18n.notFound[lang]);
            } else {
                $elem.text(this.i18n.en + ', your language "' + lang + '" is not defined yet.');
            }
        } else {
            this.imgObj.src = response.query.pages[pageIndex].imageinfo['0'].url;
            if (this.img.includes(this.imgObj.ext)){
                $elem = $('<img />');
            } else if (this.audio.includes(this.imgObj.ext)){
                $elem = $('<audio />');
            } else if (this.video.includes(this.imgObj.ext)){
                $elem = $('<video />');
            } else return;
            ['width', 'height', 'title', 'alt', 'src'].forEach($.proxy(function(item){
                if (this.imgObj[item])
                    $elem.prop(item, this.imgObj[item]);
            }, this));
            switch (this.imgObj.pos){
                case 'left':
                case 'right':
                    $elem.css('float', this.imgObj.pos);
                    break;
                case 'center':
                    $elem.css({
                        'text-align': 'center',
                        'display': 'block'
                    });
                    break;
            }
            if (this.audio.includes(this.imgObj.ext)){
                $elem.attr('controls', '');
                $elem.attr('type', 'audio/' + this.imgObj.ext);
                $elem.html('Your browser does not support the <code>&lt;audio&gt;</code> element.');
            } else if (this.video.includes(this.imgObj.ext)){
                $elem.attr('controls', '');
                $elem.attr('type', 'video/' + this.imgObj.ext);
                $elem.html('Your browser does not support the <code>&lt;video&gt;</code> element.');
            }
        }
        this.a.href = mw.util.getUrl(this.imgObj.link.split('|')[0]);
        this.a.innerHTML = $elem.prop('outerHTML');
    };
 
    mw.loader.load('mediawiki.api');
    mw.loader.using('mediawiki.api', function(){
        var chatImages = new ChatImages();
        mainRoom.socket.bind('chat:add', function(){
            $('#WikiaPage #Chat_' + mainRoom.roomId + ' ul li').each(function(){
                chatImages.main($(this).find('.message')[0]);
            });
        });
 
        $('#WikiaPage #Chat_' + mainRoom.roomId + ' ul li').click(function(event){
            chatImages.main(event.currentTarget.querySelector('.message'));
        });
    });
}(mediaWiki, jQuery, mainRoom, $.extend(window.chatImagesConfig, {})));